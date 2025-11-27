import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { orderNumber, customerName, customerEmail, totalTTC, items } = await req.json();

    if (!orderNumber || !customerEmail) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ec4899 0%, #a855f7 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .order-number { font-size: 24px; font-weight: bold; color: #ec4899; margin: 20px 0; }
            .items { background: white; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .item { padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
            .total { font-size: 20px; font-weight: bold; color: #1f2937; margin-top: 20px; padding-top: 20px; border-top: 2px solid #ec4899; }
            .footer { text-align: center; color: #6b7280; margin-top: 30px; font-size: 14px; }
            .button { display: inline-block; background: linear-gradient(135deg, #ec4899 0%, #a855f7 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✓ Commande confirmée !</h1>
              <p>Merci pour votre réservation</p>
            </div>
            <div class="content">
              <p>Bonjour ${customerName},</p>
              <p>Nous avons bien reçu votre commande et nous vous remercions de votre confiance.</p>
              
              <div class="order-number">
                Commande N° ${orderNumber}
              </div>

              <div class="items">
                <h3>Détails de votre commande :</h3>
                ${items?.map((item: any) => `
                  <div class="item">
                    <strong>${item.service_name}</strong><br>
                    ${item.booking_date ? `📅 ${new Date(item.booking_date).toLocaleDateString('fr-FR')}` : ''}
                    ${item.booking_time ? ` • 🕐 ${item.booking_time}` : ''}<br>
                    Quantité: ${item.quantity} • ${item.total_price_ht}€ HT
                  </div>
                `).join('') || ''}
              </div>

              <div class="total">
                Total TTC : ${totalTTC}€
              </div>

              <p style="margin-top: 30px;">
                <strong>Prochaines étapes :</strong><br>
                1. Vous recevrez un rappel 24h avant votre réservation<br>
                2. En cas de question, contactez-nous au 04 13 25 26 40<br>
                3. Vous pouvez annuler gratuitement jusqu'à 24h avant
              </p>

              <div style="text-align: center;">
                <a href="https://le40-marseille.fr" class="button">Voir mon espace Le 40</a>
              </div>

              <div class="footer">
                <p><strong>Le 40 - Coworking & Studios</strong><br>
                40 Rue Sainte, 13001 Marseille<br>
                04 13 25 26 40 • contact@le40-marseille.fr</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email via Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      console.warn("RESEND_API_KEY not configured, skipping email");
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email service not configured",
          emailPreview: emailHtml
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Le 40 Coworking <reservations@le40coworking.com>",
        to: [customerEmail],
        subject: `Confirmation de commande ${orderNumber} - Le 40`,
        html: emailHtml,
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      console.error(`Resend API error: ${error}`);
      throw new Error(`Failed to send email: ${error}`);
    }

    const result = await emailResponse.json();
    console.log(`✉️ Email envoyé avec succès à ${customerEmail} (ID: ${result.id})`);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email sent successfully",
        emailId: result.id
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});