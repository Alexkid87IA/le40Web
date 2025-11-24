import 'dotenv/config';

const SHOPIFY_STORE = process.env.VITE_SHOPIFY_STORE || 'renaissance-9581.myshopify.com';
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN || '';
const SHOPIFY_API_VERSION = '2024-10';

interface BundleProduct {
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  tags: string[];
  variants: Array<{
    title: string;
    price: string;
    compare_at_price: string;
    sku: string;
  }>;
  images?: Array<{ src: string }>;
  metafields?: Record<string, any>;
}

const BUNDLES: BundleProduct[] = [
  {
    title: 'Pack Creator Starter - Studio + Montage + Script',
    body_html: `<h2>Le pack parfait pour démarrer votre chaîne YouTube</h2>
<p><strong>Économisez 36€ avec ce pack complet</strong></p>

<h3>🎬 Ce pack comprend :</h3>
<ul>
  <li><strong>Studio Face-Cam Solo 3h</strong> - Tournage professionnel avec Sony FX3 4K</li>
  <li><strong>Montage Vidéo Standard</strong> - Montage pro avec transitions et color grading</li>
  <li><strong>Script Vidéo Professionnel</strong> - Rédaction complète avec hooks optimisés</li>
</ul>

<h3>💰 Économie :</h3>
<ul>
  <li>Prix séparé : 485€</li>
  <li>Prix pack : 449€</li>
  <li><strong>Vous économisez : 36€ (-7%)</strong></li>
</ul>

<h3>✅ Idéal pour :</h3>
<ul>
  <li>Créateurs YouTube qui démarrent</li>
  <li>Formateurs en ligne</li>
  <li>Vloggers professionnels</li>
  <li>Entrepreneurs souhaitant du contenu qualité</li>
</ul>

<h3>📦 Détail du pack :</h3>
<ul>
  <li>3h de tournage en studio équipé</li>
  <li>Montage professionnel jusqu'à 2h de rush</li>
  <li>Script structuré avec intro, corps, outro</li>
  <li>2 révisions incluses pour le montage</li>
  <li>2 révisions incluses pour le script</li>
  <li>Livraison sous 7 jours</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Bundle',
    tags: ['bundle', 'pack', 'youtube', 'creator', 'economie', 'populaire', 'studio', 'montage', 'script'],
    images: [
      { src: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      {
        title: 'Pack Complet',
        price: '449.00',
        compare_at_price: '485.00',
        sku: 'BUNDLE-CREATOR-STARTER',
      },
    ],
    metafields: {
      bundle_contents: 'Studio Face-Cam 3h + Montage Standard 2h + Script 1 vidéo',
      savings_amount: 36,
      savings_percent: 7,
    },
  },
  {
    title: 'Pack Podcast Launch - Studio + Montage Premium + SEO',
    body_html: `<h2>Lancez votre podcast avec un pack professionnel complet</h2>
<p><strong>Économisez 55€ avec ce pack premium</strong></p>

<h3>🎙️ Ce pack comprend :</h3>
<ul>
  <li><strong>Studio Podcast Audio 2h</strong> - 4 micros Shure SM7B + RØDECaster Pro II</li>
  <li><strong>Montage Vidéo Premium</strong> - Montage cinématique avec motion design</li>
  <li><strong>Optimisation SEO YouTube</strong> - Référencement complet pour 1 vidéo</li>
</ul>

<h3>💰 Économie :</h3>
<ul>
  <li>Prix séparé : 554€</li>
  <li>Prix pack : 499€</li>
  <li><strong>Vous économisez : 55€ (-10%)</strong></li>
</ul>

<h3>✅ Idéal pour :</h3>
<ul>
  <li>Podcasters qui veulent la qualité pro</li>
  <li>Interviews longue durée</li>
  <li>Talk-shows et débats</li>
  <li>Contenus nécessitant visibilité maximale</li>
</ul>

<h3>📦 Détail du pack :</h3>
<ul>
  <li>2h de studio podcast avec acoustique traitée</li>
  <li>Montage premium avec effets visuels</li>
  <li>Color grading professionnel</li>
  <li>Titre, description, tags optimisés SEO</li>
  <li>Miniature A/B testée incluse</li>
  <li>3 révisions montage incluses</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Bundle',
    tags: ['bundle', 'pack', 'podcast', 'audio', 'economie', 'populaire', 'seo', 'youtube'],
    images: [
      { src: 'https://images.pexels.com/photos/3784324/pexels-photo-3784324.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      {
        title: 'Pack Complet',
        price: '499.00',
        compare_at_price: '554.00',
        sku: 'BUNDLE-PODCAST-LAUNCH',
      },
    ],
    metafields: {
      bundle_contents: 'Studio Podcast 2h + Montage Premium 2h + SEO YouTube 1 vidéo',
      savings_amount: 55,
      savings_percent: 10,
    },
  },
  {
    title: 'Pack Streaming Pro - Studio Live + ATEM + Support Technique',
    body_html: `<h2>Setup streaming professionnel clé en main</h2>
<p><strong>Économisez 66€ avec ce pack streaming complet</strong></p>

<h3>🎮 Ce pack comprend :</h3>
<ul>
  <li><strong>Studio Live Twitch/YouTube 4h</strong> - 3 caméras + régie live intégrée</li>
  <li><strong>Live-Switch ATEM 4h</strong> - Multi-streaming sur toutes plateformes</li>
  <li><strong>Support Technique Premium</strong> - Régie vidéo live avec technicien</li>
</ul>

<h3>💰 Économie :</h3>
<ul>
  <li>Prix séparé : 715€</li>
  <li>Prix pack : 649€</li>
  <li><strong>Vous économisez : 66€ (-9%)</strong></li>
</ul>

<h3>✅ Idéal pour :</h3>
<ul>
  <li>Streamers professionnels</li>
  <li>Gaming et esports</li>
  <li>Événements live</li>
  <li>Webinaires et conférences en ligne</li>
</ul>

<h3>📦 Détail du pack :</h3>
<ul>
  <li>4h de streaming en studio équipé</li>
  <li>Diffusion simultanée multi-plateformes</li>
  <li>Régie vidéo live professionnelle</li>
  <li>Technicien dédié pendant 4h</li>
  <li>Chat overlay temps réel</li>
  <li>Bande passante dédiée garantie</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Bundle',
    tags: ['bundle', 'pack', 'streaming', 'live', 'twitch', 'youtube', 'economie', 'gaming'],
    images: [
      { src: 'https://images.pexels.com/photos/7129713/pexels-photo-7129713.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      {
        title: 'Pack Complet',
        price: '649.00',
        compare_at_price: '715.00',
        sku: 'BUNDLE-STREAMING-PRO',
      },
    ],
    metafields: {
      bundle_contents: 'Studio Live 4h + ATEM 4h + Régie Vidéo Live',
      savings_amount: 66,
      savings_percent: 9,
    },
  },
  {
    title: 'Pack Premium Complet - Studio Show + Makeup + Décoration + Catering',
    body_html: `<h2>Le package ultime pour productions professionnelles</h2>
<p><strong>Économisez 138€ avec ce pack tout inclus</strong></p>

<h3>⭐ Ce pack comprend :</h3>
<ul>
  <li><strong>Studio Émission/Talk-Show 3h</strong> - Grand plateau 50m² avec 6 caméras</li>
  <li><strong>Team Maquillage Professionnel</strong> - Maquilleuse dédiée pour 4 personnes</li>
  <li><strong>Pack Décoration Custom</strong> - Décoration personnalisée du studio</li>
  <li><strong>Catering Journée Complète</strong> - Restauration pour 4 personnes</li>
</ul>

<h3>💰 Économie :</h3>
<ul>
  <li>Prix séparé : 1,337€</li>
  <li>Prix pack : 1,199€</li>
  <li><strong>Vous économisez : 138€ (-10%)</strong></li>
</ul>

<h3>✅ Idéal pour :</h3>
<ul>
  <li>Émissions TV et web-séries</li>
  <li>Talk-shows professionnels</li>
  <li>Tables rondes premium</li>
  <li>Productions nécessitant qualité broadcast</li>
</ul>

<h3>📦 Détail du pack :</h3>
<ul>
  <li>3h sur notre plus grand plateau (50m²)</li>
  <li>6 caméras Sony FX3 professionnelles</li>
  <li>Décors NV Gallery sur mesure</li>
  <li>Maquillage professionnel avec retouches illimitées</li>
  <li>Coffee break + déjeuner traiteur + snacks</li>
  <li>Régie complète son + vidéo</li>
</ul>`,
    vendor: 'Le 40',
    product_type: 'Bundle',
    tags: ['bundle', 'pack', 'premium', 'show', 'emission', 'tv', 'economie', 'vip'],
    images: [
      { src: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    ],
    variants: [
      {
        title: 'Pack Complet',
        price: '1199.00',
        compare_at_price: '1337.00',
        sku: 'BUNDLE-PREMIUM-COMPLETE',
      },
    ],
    metafields: {
      bundle_contents: 'Studio Show 3h + Makeup Team + Décoration Custom + Catering 4 personnes',
      savings_amount: 138,
      savings_percent: 10,
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

async function createBundle(bundle: BundleProduct) {
  try {
    const shopifyProduct: any = {
      title: bundle.title,
      body_html: bundle.body_html,
      vendor: bundle.vendor,
      product_type: bundle.product_type,
      tags: bundle.tags.join(', '),
      status: 'active',
      published: true,
      variants: bundle.variants.map((v) => ({
        option1: v.title,
        price: v.price,
        compare_at_price: v.compare_at_price,
        sku: v.sku,
        inventory_management: null,
        inventory_policy: 'continue',
        fulfillment_service: 'manual',
      })),
    };

    if (bundle.images && bundle.images.length > 0) {
      shopifyProduct.images = bundle.images.map((img) => ({ src: img.src }));
    }

    const response = await shopifyRequest('products.json', 'POST', { product: shopifyProduct });

    if (bundle.metafields && response.product?.id) {
      await createMetafields(response.product.id, bundle.metafields);
    }

    console.log(`✅ Bundle créé: ${bundle.title}`);
    return { status: 'created', id: response.product.id };
  } catch (error) {
    console.error(`❌ Failed: ${bundle.title} - ${error}`);
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
  console.log('🎁 Création des Bundles sur Shopify\n');

  if (!SHOPIFY_ADMIN_TOKEN) {
    console.error('❌ SHOPIFY_ADMIN_TOKEN missing in .env');
    process.exit(1);
  }

  let successCount = 0;
  let failedCount = 0;

  for (const bundle of BUNDLES) {
    const result = await createBundle(bundle);

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
  console.log(`\n✅ Bundles créés: ${successCount}/${BUNDLES.length}`);
  console.log(`❌ Échecs: ${failedCount}/${BUNDLES.length}`);

  console.log('\n💡 Prochaines étapes:');
  console.log('   1. Vérifier les bundles dans votre admin Shopify');
  console.log('   2. Créer une collection "Bundles & Packs"');
  console.log('   3. Tester l\'ajout au panier');
  console.log('\n✨ Terminé!\n');
}

main().catch(console.error);
