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

      case 'subscription_contracts/create':
        await handleSubscriptionCreated(supabase, webhookData);
        break;

      case 'subscription_contracts/update':
        await handleSubscriptionUpdated(supabase, webhookData);
        break;

      case 'subscription_billing_attempts/success':
        await handleBillingSuccess(supabase, webhookData);
        break;

      case 'subscription_billing_attempts/failure':
        await handleBillingFailure(supabase, webhookData);
        break;

      case 'subscription_contracts/cancel':
        await handleSubscriptionCancelled(supabase, webhookData);
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

async function handleSubscriptionCreated(supabase: any, subscription: any) {
  console.log('Subscription created:', subscription.id);

  const customer = subscription.customer;
  const lineItems = subscription.lines?.edges || [];

  for (const edge of lineItems) {
    const line = edge.node;
    const productId = line.product_id;
    const variantId = line.variant_id;

    const planType = extractPlanType(line.title);
    const billingInterval = extractBillingInterval(line.title);

    const subscriptionData = {
      shopify_subscription_id: subscription.id,
      shopify_customer_id: customer.id,
      customer_email: customer.email,
      customer_name: `${customer.first_name || ''} ${customer.last_name || ''}`.trim(),
      product_id: `domiciliation-${planType}`,
      shopify_product_id: productId,
      shopify_variant_id: variantId,
      plan_type: planType,
      billing_interval: billingInterval,
      price: parseFloat(line.price),
      currency: subscription.currency_code || 'EUR',
      status: subscription.status || 'active',
      next_billing_date: subscription.next_billing_date,
      created_at: subscription.created_at,
      updated_at: subscription.updated_at,
    };

    const { error } = await supabase
      .from('shopify_subscriptions')
      .insert(subscriptionData);

    if (error) {
      console.error('Error inserting subscription:', error);
    } else {
      console.log('Subscription created in database:', subscription.id);
    }
  }
}

async function handleSubscriptionUpdated(supabase: any, subscription: any) {
  console.log('Subscription updated:', subscription.id);

  const updateData = {
    status: subscription.status,
    next_billing_date: subscription.next_billing_date,
    updated_at: subscription.updated_at || new Date().toISOString(),
  };

  const { error } = await supabase
    .from('shopify_subscriptions')
    .update(updateData)
    .eq('shopify_subscription_id', subscription.id);

  if (error) {
    console.error('Error updating subscription:', error);
  } else {
    console.log('Subscription updated in database:', subscription.id);
  }
}

async function handleBillingSuccess(supabase: any, billingAttempt: any) {
  console.log('Billing success:', billingAttempt.id);

  const subscriptionId = billingAttempt.subscription_contract_id;

  const { data: subscription } = await supabase
    .from('shopify_subscriptions')
    .select('id')
    .eq('shopify_subscription_id', subscriptionId)
    .maybeSingle();

  if (subscription) {
    const billingData = {
      subscription_id: subscription.id,
      shopify_billing_attempt_id: billingAttempt.id,
      amount: parseFloat(billingAttempt.total_price),
      currency: billingAttempt.currency_code || 'EUR',
      status: 'success',
      attempted_at: billingAttempt.created_at,
    };

    const { error } = await supabase
      .from('shopify_subscription_billing_attempts')
      .insert(billingData);

    if (error) {
      console.error('Error recording billing attempt:', error);
    }

    await supabase
      .from('shopify_subscriptions')
      .update({
        last_billing_date: billingAttempt.created_at,
        next_billing_date: billingAttempt.next_billing_date,
      })
      .eq('id', subscription.id);
  }
}

async function handleBillingFailure(supabase: any, billingAttempt: any) {
  console.log('Billing failed:', billingAttempt.id);

  const subscriptionId = billingAttempt.subscription_contract_id;

  const { data: subscription } = await supabase
    .from('shopify_subscriptions')
    .select('id')
    .eq('shopify_subscription_id', subscriptionId)
    .maybeSingle();

  if (subscription) {
    const billingData = {
      subscription_id: subscription.id,
      shopify_billing_attempt_id: billingAttempt.id,
      amount: parseFloat(billingAttempt.total_price),
      currency: billingAttempt.currency_code || 'EUR',
      status: 'failed',
      error_message: billingAttempt.error_message || 'Payment failed',
      attempted_at: billingAttempt.created_at,
      next_retry_at: billingAttempt.next_billing_date,
    };

    const { error } = await supabase
      .from('shopify_subscription_billing_attempts')
      .insert(billingData);

    if (error) {
      console.error('Error recording failed billing:', error);
    }
  }
}

async function handleSubscriptionCancelled(supabase: any, subscription: any) {
  console.log('Subscription cancelled:', subscription.id);

  const { error } = await supabase
    .from('shopify_subscriptions')
    .update({
      status: 'cancelled',
      cancelled_at: new Date().toISOString(),
      cancellation_reason: subscription.cancellation_reason || 'Customer request',
      updated_at: new Date().toISOString(),
    })
    .eq('shopify_subscription_id', subscription.id);

  if (error) {
    console.error('Error cancelling subscription:', error);
  } else {
    console.log('Subscription cancelled in database:', subscription.id);
  }
}

function extractPlanType(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes('starter')) return 'starter';
  if (lower.includes('business')) return 'business';
  if (lower.includes('scale-up') || lower.includes('scaleup')) return 'scaleup';
  return 'starter';
}

function extractBillingInterval(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes('annuel') || lower.includes('annual') || lower.includes('year')) {
    return 'year';
  }
  return 'month';
}
