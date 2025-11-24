import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey, X-Shopify-Topic, X-Shopify-Hmac-Sha256, X-Shopify-Shop-Domain',
};

interface ShopifyOrder {
  id: number;
  name: string;
  email: string;
  phone?: string;
  customer?: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
  };
  total_price: string;
  currency: string;
  financial_status: string;
  fulfillment_status?: string;
  line_items: Array<{
    id: number;
    title: string;
    variant_id?: number;
    quantity: number;
    price: string;
    properties?: Array<{ name: string; value: string }>;
  }>;
  created_at: string;
  updated_at: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const topic = req.headers.get('X-Shopify-Topic');
    const hmac = req.headers.get('X-Shopify-Hmac-Sha256');
    const shopDomain = req.headers.get('X-Shopify-Shop-Domain');

    if (!topic || !hmac) {
      return new Response(
        JSON.stringify({ error: 'Missing required Shopify headers' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const rawBody = await req.text();
    const webhookData = JSON.parse(rawBody);

    console.log('Shopify webhook received:', topic, 'Shop:', shopDomain);

    switch (topic) {
      case 'orders/create':
      case 'orders/updated':
        await handleOrderWebhook(supabase, webhookData, topic === 'orders/create');
        break;

      case 'orders/cancelled':
        await handleOrderCancellation(supabase, webhookData);
        break;

      case 'checkouts/create':
      case 'checkouts/update':
        await handleCheckoutWebhook(supabase, webhookData);
        break;

      default:
        console.log('Unhandled webhook topic:', topic);
    }

    return new Response(
      JSON.stringify({ success: true, topic }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Webhook processing error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

async function handleOrderWebhook(
  supabase: any,
  order: ShopifyOrder,
  isNew: boolean
) {
  const customerName = order.customer
    ? `${order.customer.first_name} ${order.customer.last_name}`
    : 'Guest';
  const customerEmail = order.customer?.email || order.email;
  const customerPhone = order.customer?.phone || order.phone;

  const orderData = {
    shopify_order_id: order.id.toString(),
    shopify_order_number: order.name,
    customer_email: customerEmail,
    customer_name: customerName,
    customer_phone: customerPhone,
    total_price: parseFloat(order.total_price),
    currency: order.currency,
    status: order.financial_status === 'paid' ? 'paid' : 'pending',
    financial_status: order.financial_status,
    fulfillment_status: order.fulfillment_status || 'unfulfilled',
    line_items: order.line_items,
    metadata: {},
    created_at: order.created_at,
    updated_at: order.updated_at,
    synced_at: new Date().toISOString(),
  };

  const { data: existingOrder, error: fetchError } = await supabase
    .from('shopify_orders')
    .select('id')
    .eq('shopify_order_id', order.id.toString())
    .maybeSingle();

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Error fetching order:', fetchError);
    throw fetchError;
  }

  if (existingOrder) {
    const { error: updateError } = await supabase
      .from('shopify_orders')
      .update(orderData)
      .eq('id', existingOrder.id);

    if (updateError) {
      console.error('Error updating order:', updateError);
      throw updateError;
    }
  } else {
    const { error: insertError } = await supabase
      .from('shopify_orders')
      .insert(orderData);

    if (insertError) {
      console.error('Error inserting order:', insertError);
      throw insertError;
    }
  }

  if (order.financial_status === 'paid') {
    await confirmCalendarBookings(supabase, order);
  }
}

async function confirmCalendarBookings(supabase: any, order: ShopifyOrder) {
  for (const lineItem of order.line_items) {
    const properties = lineItem.properties || [];
    const holdId = properties.find((p) => p.name === 'hold_id')?.value;

    if (holdId) {
      const { error } = await supabase
        .from('shopify_inventory_calendar')
        .update({
          is_available: false,
          is_temporary_hold: false,
          hold_expires_at: null,
          shopify_order_id: order.id.toString(),
          customer_email: order.customer?.email || order.email,
          customer_name: order.customer
            ? `${order.customer.first_name} ${order.customer.last_name}`
            : 'Guest',
          updated_at: new Date().toISOString(),
        })
        .eq('id', holdId);

      if (error) {
        console.error('Error confirming booking:', error);
      } else {
        console.log('Confirmed booking:', holdId);
      }
    }
  }
}

async function handleOrderCancellation(supabase: any, order: ShopifyOrder) {
  const { error: updateError } = await supabase
    .from('shopify_orders')
    .update({
      status: 'cancelled',
      updated_at: new Date().toISOString(),
      synced_at: new Date().toISOString(),
    })
    .eq('shopify_order_id', order.id.toString());

  if (updateError) {
    console.error('Error updating cancelled order:', updateError);
  }

  const { error: releaseError } = await supabase
    .from('shopify_inventory_calendar')
    .update({
      is_available: true,
      is_temporary_hold: false,
      shopify_order_id: null,
      updated_at: new Date().toISOString(),
    })
    .eq('shopify_order_id', order.id.toString());

  if (releaseError) {
    console.error('Error releasing calendar slots:', releaseError);
  } else {
    console.log('Released calendar slots for cancelled order:', order.id);
  }
}

async function handleCheckoutWebhook(supabase: any, checkout: any) {
  console.log('Checkout webhook received:', checkout.id);
}
