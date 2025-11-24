import 'dotenv/config';

const SHOPIFY_STORE = process.env.VITE_SHOPIFY_STORE || 'renaissance-9581.myshopify.com';
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN || '';
const SHOPIFY_API_VERSION = '2024-10';

interface AdditionalService {
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

const ADDITIONAL_SERVICES: AdditionalService[] = [
  {
    title: 'Color Grading Cinéma Professionnel',
    body_html: `<h2>Color grading cinématique pour vos vidéos premium</h2>
<p>Service de color grading professionnel non inclus dans nos offres de montage standard. Pour un rendu visuel exceptionnel.</p>

<h3>🎨 Inclus :</h3>
<ul>
  <li>Analyse de votre vidéo et direction artistique</li>
  <li>Color grading professionnel sur DaVinci Resolve</li>
  <li>Création de LUTs personnalisées</li>
  <li>Harmonisation des couleurs multi-caméras</li>
  <li>Export en qualité maximale (ProRes 422 HQ)</li>
  <li>2 révisions incluses</li>
  <li>Livraison sous 3-5 jours</li>
</ul>

<h3>✅ Idéal pour :</h3>
<ul>
  <li>Clips musicaux et courts-métrages</li>
  <li>Vidéos corporate premium</li>
  <li>Documentaires professionnels</li>
  <li>Contenus nécessitant identité visuelle forte</li>
</ul>

<h3>📊 Spécifications techniques :</h3>
<ul>
  <li>Support de tous les formats (H.264, ProRes, RAW)</li>
  <li>HDR et SDR</li>
  <li>Export 4K jusqu'à 60fps</li>
  <li>Fichiers LUT fournis (.cube)</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Service Additionnel',
    tags: ['service', 'color-grading', 'post-production', 'cinema', 'video', 'premium'],
    images: [
      { src: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      {
        title: 'Color Grading 1 vidéo',
        price: '149.00',
        sku: 'ADDON-COLOR-GRADING',
      },
    ],
    metafields: {
      delivery_time: '3-5 jours',
      revisions_included: 2,
    },
  },
  {
    title: 'Mixage Audio Avancé & Mastering',
    body_html: `<h2>Mixage et mastering audio professionnel pour podcasts et voiceover</h2>
<p>Service de mastering audio avancé non inclus dans le montage standard. Pour une qualité sonore broadcast.</p>

<h3>🎧 Inclus :</h3>
<ul>
  <li>Nettoyage audio professionnel (bruits de fond, clics, pops)</li>
  <li>Égalisation et compression multi-bande</li>
  <li>De-essing et réduction de résonances</li>
  <li>Normalisation LUFS pour plateformes</li>
  <li>Mastering final pour broadcast</li>
  <li>Export multi-formats (WAV, MP3, AAC)</li>
  <li>2 révisions incluses</li>
  <li>Livraison sous 48h</li>
</ul>

<h3>✅ Idéal pour :</h3>
<ul>
  <li>Podcasts professionnels</li>
  <li>Voiceover et narration</li>
  <li>Audiobooks</li>
  <li>Contenus audio nécessitant qualité maximale</li>
</ul>

<h3>📊 Standards techniques :</h3>
<ul>
  <li>Conformité LUFS (YouTube: -14 LUFS, Podcast: -16 LUFS)</li>
  <li>Fréquence d'échantillonnage jusqu'à 96 kHz</li>
  <li>Profondeur 24-bit</li>
  <li>Export stéréo ou multi-pistes</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Service Additionnel',
    tags: ['service', 'audio', 'mixage', 'mastering', 'podcast', 'voiceover', 'premium'],
    images: [
      { src: 'https://images.pexels.com/photos/164829/pexels-photo-164829.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      {
        title: 'Mixage 1 épisode',
        price: '99.00',
        sku: 'ADDON-AUDIO-MASTERING',
      },
    ],
    metafields: {
      delivery_time: '48h',
      revisions_included: 2,
    },
  },
  {
    title: 'Sous-titrage Multi-Langues (FR + EN + ES)',
    body_html: `<h2>Sous-titres professionnels en 3 langues</h2>
<p>Service de sous-titrage professionnel pour vos vidéos. Transcription + traduction + synchronisation parfaite.</p>

<h3>🌍 Inclus :</h3>
<ul>
  <li>Transcription française professionnelle</li>
  <li>Traduction anglaise par traducteur natif</li>
  <li>Traduction espagnole par traducteur natif</li>
  <li>Synchronisation précise au frame près</li>
  <li>Formatage SRT, VTT, et burn-in</li>
  <li>Révision et correction incluses</li>
  <li>Export dans tous les formats standards</li>
  <li>Livraison sous 5 jours</li>
</ul>

<h3>✅ Idéal pour :</h3>
<ul>
  <li>Contenus internationaux</li>
  <li>Vidéos YouTube multilingues</li>
  <li>Formation en ligne accessible</li>
  <li>Webinaires et conférences</li>
</ul>

<h3>📄 Formats fournis :</h3>
<ul>
  <li>SRT (SubRip)</li>
  <li>VTT (WebVTT)</li>
  <li>Burn-in vidéo si nécessaire</li>
  <li>Compatible YouTube, Vimeo, LinkedIn</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Service Additionnel',
    tags: ['service', 'sous-titres', 'subtitles', 'traduction', 'multilangue', 'accessibilite'],
    images: [
      { src: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      {
        title: 'Sous-titrage 1 vidéo (FR+EN+ES)',
        price: '79.00',
        sku: 'ADDON-SUBTITLES-3LANG',
      },
    ],
    metafields: {
      delivery_time: '5 jours',
      languages: 'FR, EN, ES',
    },
  },
  {
    title: 'Coaching Présentation & Media Training',
    body_html: `<h2>Session de coaching pour améliorer votre présence caméra</h2>
<p>Coaching personnalisé de 1h avec feedback vidéo pour perfectionner votre communication face caméra.</p>

<h3>🎯 Inclus :</h3>
<ul>
  <li>Session coaching 1h en studio</li>
  <li>Analyse de votre posture et communication</li>
  <li>Travail sur la voix et l'élocution</li>
  <li>Gestion du stress face caméra</li>
  <li>Techniques de storytelling</li>
  <li>Enregistrement de la session pour analyse</li>
  <li>Feedback détaillé personnalisé</li>
  <li>Plan d'amélioration sur-mesure</li>
</ul>

<h3>✅ Idéal pour :</h3>
<ul>
  <li>Créateurs débutants face caméra</li>
  <li>Entrepreneurs pour pitch investisseurs</li>
  <li>Formateurs en ligne</li>
  <li>Porte-parole d'entreprise</li>
</ul>

<h3>👨‍🏫 Votre coach :</h3>
<ul>
  <li>10+ ans d'expérience en média training</li>
  <li>Formation de présentateurs TV</li>
  <li>Coaching de +500 entrepreneurs</li>
  <li>Expert communication digitale</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Service Additionnel',
    tags: ['service', 'coaching', 'media-training', 'presentation', 'camera', 'communication'],
    images: [
      { src: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      {
        title: 'Session 1h',
        price: '199.00',
        sku: 'ADDON-COACHING-PRES',
      },
    ],
    metafields: {
      calendar_sync_required: true,
      duration_hours: 1,
    },
  },
  {
    title: 'Shooting Photo Produits E-Commerce (50 photos)',
    body_html: `<h2>Session photo professionnelle pour vos produits e-commerce</h2>
<p>Shooting photo complet avec 50 photos retouchées pour booster vos ventes en ligne.</p>

<h3>📸 Inclus :</h3>
<ul>
  <li>Session shooting 2h en studio</li>
  <li>50 photos produits HD retouchées</li>
  <li>Fond blanc professionnel</li>
  <li>Éclairage studio 3 points</li>
  <li>Photos multi-angles de chaque produit</li>
  <li>Détourage et retouche photo pro</li>
  <li>Formats optimisés web (JPG + PNG)</li>
  <li>Livraison sous 5 jours</li>
</ul>

<h3>✅ Idéal pour :</h3>
<ul>
  <li>E-commerçants Shopify/WooCommerce</li>
  <li>Marques lançant nouveaux produits</li>
  <li>Artisans et créateurs</li>
  <li>Catalogue produits professionnel</li>
</ul>

<h3>📦 Produits acceptés :</h3>
<ul>
  <li>Objets jusqu'à 50 cm</li>
  <li>Vêtements et accessoires</li>
  <li>Électronique et gadgets</li>
  <li>Cosmétiques et beauté</li>
  <li>Jusqu'à 25 produits différents</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Service Additionnel',
    tags: ['service', 'photo', 'produits', 'ecommerce', 'shopify', 'packshot'],
    images: [
      { src: 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      {
        title: '50 photos produits',
        price: '299.00',
        sku: 'ADDON-PHOTO-ECOM-50',
      },
    ],
    metafields: {
      calendar_sync_required: true,
      duration_hours: 2,
      delivery_time: '5 jours',
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

async function createService(service: AdditionalService) {
  try {
    const shopifyProduct: any = {
      title: service.title,
      body_html: service.body_html,
      vendor: service.vendor,
      product_type: service.product_type,
      tags: service.tags.join(', '),
      status: 'active',
      published: true,
      variants: service.variants.map((v) => ({
        option1: v.title,
        price: v.price,
        sku: v.sku,
        inventory_management: null,
        inventory_policy: 'continue',
        fulfillment_service: 'manual',
        requires_shipping: false,
      })),
    };

    if (service.images && service.images.length > 0) {
      shopifyProduct.images = service.images.map((img) => ({ src: img.src }));
    }

    const response = await shopifyRequest('products.json', 'POST', { product: shopifyProduct });

    if (service.metafields && response.product?.id) {
      await createMetafields(response.product.id, service.metafields);
    }

    console.log(`✅ Service créé: ${service.title}`);
    return { status: 'created', id: response.product.id };
  } catch (error) {
    console.error(`❌ Failed: ${service.title} - ${error}`);
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
  console.log('🛠️  Création des Services Additionnels sur Shopify\n');

  if (!SHOPIFY_ADMIN_TOKEN) {
    console.error('❌ SHOPIFY_ADMIN_TOKEN missing in .env');
    process.exit(1);
  }

  let successCount = 0;
  let failedCount = 0;

  for (const service of ADDITIONAL_SERVICES) {
    const result = await createService(service);

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
  console.log(`\n✅ Services créés: ${successCount}/${ADDITIONAL_SERVICES.length}`);
  console.log(`❌ Échecs: ${failedCount}/${ADDITIONAL_SERVICES.length}`);

  console.log('\n💡 Prochaines étapes:');
  console.log('   1. Vérifier les services dans votre admin Shopify');
  console.log('   2. Créer une collection "Services Additionnels"');
  console.log('   3. Les ajouter en upsells dans le tunnel de commande');
  console.log('\n✨ Terminé!\n');
}

main().catch(console.error);
