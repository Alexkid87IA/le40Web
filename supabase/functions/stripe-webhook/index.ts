import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "npm:stripe@14.10.0";
import { createClient } from "jsr:@supabase/supabase-js@2";

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "https://le40coworking.fr",
  "https://www.le40coworking.fr",
  "https://le40web.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

const getCorsHeaders = (origin: string | null) => {
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey, stripe-signature",
    "Access-Control-Max-Age": "86400",
  };
};

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!stripeKey || !webhookSecret || !supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing required environment variables");
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify webhook signature
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      throw new Error("Missing stripe-signature header");
    }

    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    console.log(`📥 Webhook received: ${event.type}`);

    // Handle different event types
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`✅ Payment succeeded: ${paymentIntent.id}`);

        // Update order status
        const { data: order, error: fetchError } = await supabase
          .from("orders")
          .select("*")
          .eq("payment_intent_id", paymentIntent.id)
          .single();

        if (fetchError || !order) {
          console.error("Order not found:", fetchError);
          break;
        }

        const { error: updateError } = await supabase
          .from("orders")
          .update({
            payment_status: "paid",
            status: "confirmed",
            payment_date: new Date().toISOString(),
            payment_method: paymentIntent.payment_method_types?.[0] || "card",
          })
          .eq("id", order.id);

        if (updateError) {
          console.error("Failed to update order:", updateError);
          break;
        }

        console.log(`✅ Order ${order.order_number} marked as paid`);

        // Get order items for email
        const { data: items } = await supabase
          .from("order_items")
          .select("*")
          .eq("order_id", order.id);

        // Send confirmation email
        const emailResponse = await fetch(
          `${supabaseUrl}/functions/v1/send-order-confirmation`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${supabaseServiceKey}`,
            },
            body: JSON.stringify({
              orderNumber: order.order_number,
              customerName: order.customer_name,
              customerEmail: order.customer_email,
              totalTTC: order.total_ttc,
              items: items || [],
            }),
          }
        );

        if (!emailResponse.ok) {
          console.error("Failed to send confirmation email");
        } else {
          console.log(`📧 Confirmation email sent to ${order.customer_email}`);
        }

        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`❌ Payment failed: ${paymentIntent.id}`);

        // Update order status
        const { error } = await supabase
          .from("orders")
          .update({
            payment_status: "failed",
            status: "cancelled",
          })
          .eq("payment_intent_id", paymentIntent.id);

        if (error) {
          console.error("Failed to update order:", error);
        }

        break;
      }

      case "payment_intent.canceled": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`🚫 Payment canceled: ${paymentIntent.id}`);

        // Update order status
        const { error } = await supabase
          .from("orders")
          .update({
            payment_status: "failed",
            status: "cancelled",
          })
          .eq("payment_intent_id", paymentIntent.id);

        if (error) {
          console.error("Failed to update order:", error);
        }

        break;
      }

      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        console.log(`💰 Refund processed: ${charge.payment_intent}`);

        // Update order status
        const { error } = await supabase
          .from("orders")
          .update({
            payment_status: "refunded",
          })
          .eq("payment_intent_id", charge.payment_intent as string);

        if (error) {
          console.error("Failed to update order:", error);
        }

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(
      JSON.stringify({ received: true }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Webhook error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Webhook handler failed" }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
