import 'dotenv/config';

const SHOPIFY_STORE = process.env.VITE_SHOPIFY_STORE || 'renaissance-9581.myshopify.com';
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN || '';
const SHOPIFY_API_VERSION = '2024-10';

interface SubscriptionProduct {
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  tags: string[];
  variants: Array<{
    title: string;
    price: string;
    sku: string;
  }>;
  images?: Array<{ src: string }>;
  metafields?: Record<string, any>;
}

const SUBSCRIPTIONS: SubscriptionProduct[] = [
  {
    title: 'Le 40 Club - Creator (Abonnement Mensuel)',
    body_html: `<h2>Abonnement pour créateurs de contenu réguliers</h2>
<p><strong>L'abonnement parfait pour les créateurs YouTube, TikTok et podcasters</strong></p>

<h3>📦 Inclus chaque mois :</h3>
<ul>
  <li><strong>4 heures de studio au choix</strong> - Face-Cam, Podcast, ou Vertical</li>
  <li><strong>1 montage vidéo standard</strong> - Montage pro de 2h de rush inclus</li>
  <li><strong>Support prioritaire 7j/7</strong> - Réponse garantie sous 2h</li>
  <li><strong>Réservation prioritaire</strong> - Accès aux meilleurs créneaux</li>
  <li><strong>-10% sur tous les services additionnels</strong></li>
</ul>

<h3>💰 Tarif :</h3>
<ul>
  <li>299€/mois</li>
  <li>Sans engagement - Résiliable à tout moment</li>
  <li>Économie de 150€/mois vs achat séparé</li>
</ul>

<h3>✅ Idéal pour :</h3>
<ul>
  <li>YouTubers publiant 1-2 fois par semaine</li>
  <li>Podcasters réguliers</li>
  <li>Créateurs TikTok/Reels professionnels</li>
  <li>Formateurs en ligne avec contenus récurrents</li>
</ul>

<h3>🎁 Avantages membres :</h3>
<ul>
  <li>Accès aux événements networking exclusifs</li>
  <li>Invitations masterclass gratuites</li>
  <li>Communauté privée Slack/Discord</li>
  <li>Storage cloud 50 Go pour vos projets</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Abonnement',
    tags: ['abonnement', 'subscription', 'le-40-club', 'creator', 'youtube', 'podcast', 'recurring', 'populaire'],
    images: [
      { src: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      {
        title: 'Abonnement Mensuel',
        price: '299.00',
        sku: 'CLUB-CREATOR-MONTH',
      },
    ],
    metafields: {
      is_subscription: true,
      billing_type: 'recurring',
      billing_interval: 'month',
      cancellable: true,
      monthly_credits: '4h studio + 1 montage',
      member_tier: 'creator',
    },
  },
  {
    title: 'Le 40 Club - Business (Abonnement Mensuel)',
    body_html: `<h2>Abonnement pour entrepreneurs et PME</h2>
<p><strong>L'offre complète pour votre entreprise en croissance</strong></p>

<h3>📦 Inclus chaque mois :</h3>
<ul>
  <li><strong>8 heures de salles de réunion</strong> - Salle Focus ou Créative au choix</li>
  <li><strong>Domiciliation BUSINESS incluse</strong> - Adresse pro + standard téléphonique</li>
  <li><strong>2 heures de bureau privatif</strong> - Espace dédié pour vos RDV</li>
  <li><strong>Accès coworking illimité</strong> - Espace ouvert 9h-18h</li>
  <li><strong>-15% sur tous les services</strong></li>
</ul>

<h3>💰 Tarif :</h3>
<ul>
  <li>449€/mois</li>
  <li>Sans engagement - Résiliable à tout moment</li>
  <li>Économie de 320€/mois vs achat séparé</li>
</ul>

<h3>✅ Idéal pour :</h3>
<ul>
  <li>SARL et SAS en croissance</li>
  <li>Consultants et freelances</li>
  <li>Équipes réparties 2-5 personnes</li>
  <li>Startups cherchant flexibilité</li>
</ul>

<h3>🎁 Avantages membres :</h3>
<ul>
  <li>Scan courrier en 1h</li>
  <li>Réexpédition quotidienne incluse</li>
  <li>Configuration Google Business Profile</li>
  <li>Accès prioritaire aux événements networking</li>
  <li>Support client prioritaire 7j/7</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Abonnement',
    tags: ['abonnement', 'subscription', 'le-40-club', 'business', 'domiciliation', 'sarl', 'sas', 'recurring', 'populaire'],
    images: [
      { src: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      {
        title: 'Abonnement Mensuel',
        price: '449.00',
        sku: 'CLUB-BUSINESS-MONTH',
      },
    ],
    metafields: {
      is_subscription: true,
      billing_type: 'recurring',
      billing_interval: 'month',
      cancellable: true,
      monthly_credits: '8h salles + domiciliation + 2h bureau + coworking',
      member_tier: 'business',
    },
  },
  {
    title: 'Le 40 Club - Scale (Abonnement Mensuel)',
    body_html: `<h2>Abonnement premium pour scale-ups et entreprises établies</h2>
<p><strong>Le package ultime tout inclus pour votre siège social</strong></p>

<h3>📦 Inclus chaque mois :</h3>
<ul>
  <li><strong>12 heures multi-espaces au choix</strong> - Studios, salles, bureaux privés</li>
  <li><strong>Domiciliation SCALE-UP incluse</strong> - Siège social complet avec secrétariat</li>
  <li><strong>Service concierge dédié</strong> - Assistante attitrée pour gestion administrative</li>
  <li><strong>Accès VIP tous espaces</strong> - Coworking, lounge, terrasse illimités</li>
  <li><strong>-20% sur tous les services premium</strong></li>
</ul>

<h3>💰 Tarif :</h3>
<ul>
  <li>799€/mois</li>
  <li>Sans engagement - Résiliable à tout moment</li>
  <li>Économie de 700€/mois vs achat séparé</li>
</ul>

<h3>✅ Idéal pour :</h3>
<ul>
  <li>Scale-ups en forte croissance</li>
  <li>Entreprises après levée de fonds</li>
  <li>Sociétés internationales (siège FR)</li>
  <li>Groupes nécessitant infrastructure premium</li>
</ul>

<h3>🎁 Avantages membres VIP :</h3>
<ul>
  <li>Secrétariat dédié avec assistante attitrée</li>
  <li>Standard téléphonique premium dédié</li>
  <li>Accueil VIP clients et partenaires</li>
  <li>Gestion administrative complète</li>
  <li>Réception colis illimitée</li>
  <li>Conseiller dédié prioritaire 24/7</li>
  <li>Invitations événements VIP</li>
  <li>Storage cloud 200 Go</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Abonnement',
    tags: ['abonnement', 'subscription', 'le-40-club', 'scale', 'premium', 'vip', 'siege-social', 'recurring'],
    images: [
      { src: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      {
        title: 'Abonnement Mensuel',
        price: '799.00',
        sku: 'CLUB-SCALE-MONTH',
      },
    ],
    metafields: {
      is_subscription: true,
      billing_type: 'recurring',
      billing_interval: 'month',
      cancellable: true,
      monthly_credits: '12h multi-espaces + domiciliation + concierge + VIP access',
      member_tier: 'scale',
    },
  },
];

async function shopifyRequest(endpoint: string, method: string = 'GET', body?: any) {
  const url = `https://${SHOPIFY_STORE}/admin/api/${SHOPIFY_API_VERSION}/${endpoint}`;

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Shopify API Error: ${response.status} - ${error}`);
  }

  return response.json();
}

async function createSubscription(subscription: SubscriptionProduct) {
  try {
    const shopifyProduct: any = {
      title: subscription.title,
      body_html: subscription.body_html,
      vendor: subscription.vendor,
      product_type: subscription.product_type,
      tags: subscription.tags.join(', '),
      status: 'active',
      published: true,
      variants: subscription.variants.map((v) => ({
        option1: v.title,
        price: v.price,
        sku: v.sku,
        inventory_management: null,
        inventory_policy: 'continue',
        fulfillment_service: 'manual',
        requires_shipping: false,
      })),
    };

    if (subscription.images && subscription.images.length > 0) {
      shopifyProduct.images = subscription.images.map((img) => ({ src: img.src }));
    }

    const response = await shopifyRequest('products.json', 'POST', { product: shopifyProduct });

    if (subscription.metafields && response.product?.id) {
      await createMetafields(response.product.id, subscription.metafields);
    }

    console.log(`✅ Abonnement créé: ${subscription.title}`);
    return { status: 'created', id: response.product.id };
  } catch (error) {
    console.error(`❌ Failed: ${subscription.title} - ${error}`);
    return { status: 'failed', error };
  }
}

async function createMetafields(productId: string, metafields: any) {
  try {
    for (const [key, value] of Object.entries(metafields)) {
      if (value === null || value === undefined) continue;

      let metafieldType = 'single_line_text_field';
      let metafieldValue: any = String(value);

      if (typeof value === 'boolean') {
        metafieldType = 'boolean';
        metafieldValue = value;
      } else if (typeof value === 'number') {
        metafieldType = 'number_integer';
        metafieldValue = value;
      }

      const metafield = {
        namespace: 'custom',
        key: key,
        value: metafieldValue,
        type: metafieldType,
      };

      await shopifyRequest(`products/${productId}/metafields.json`, 'POST', { metafield });
    }
  } catch (error) {
    console.error(`⚠️  Warning: Could not create metafields for product ${productId}`);
  }
}

async function main() {
  console.log('🎫 Création des Abonnements Le 40 Club sur Shopify\n');

  if (!SHOPIFY_ADMIN_TOKEN) {
    console.error('❌ SHOPIFY_ADMIN_TOKEN missing in .env');
    process.exit(1);
  }

  let successCount = 0;
  let failedCount = 0;

  for (const subscription of SUBSCRIPTIONS) {
    const result = await createSubscription(subscription);

    if (result.status === 'created') {
      successCount++;
    } else {
      failedCount++;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 RAPPORT FINAL');
  console.log('='.repeat(60));
  console.log(`\n✅ Abonnements créés: ${successCount}/${SUBSCRIPTIONS.length}`);
  console.log(`❌ Échecs: ${failedCount}/${SUBSCRIPTIONS.length}`);

  console.log('\n💡 Prochaines étapes:');
  console.log('   1. Vérifier les abonnements dans votre admin Shopify');
  console.log('   2. Créer une collection "Abonnements Le 40 Club"');
  console.log('   3. Configurer les paiements récurrents (Shopify Subscriptions app)');
  console.log('\n✨ Terminé!\n');
}

main().catch(console.error);
