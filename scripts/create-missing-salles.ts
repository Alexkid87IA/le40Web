import 'dotenv/config';

const SHOPIFY_STORE = process.env.VITE_SHOPIFY_STORE_DOMAIN?.replace('.myshopify.com', '');
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || process.env.SHOPIFY_ADMIN_TOKEN;
const SHOPIFY_REST_API = `https://${SHOPIFY_STORE}.myshopify.com/admin/api/2024-10`;

async function restRequest(endpoint: string, method: string = 'GET', body?: any) {
  const response = await fetch(`${SHOPIFY_REST_API}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN!,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('API Error:', error);
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

async function getCollectionByHandle(handle: string) {
  try {
    const data = await restRequest(`/custom_collections.json`);
    const collection = data.custom_collections.find((c: any) => c.handle === handle);
    if (collection) return collection;

    const smartData = await restRequest(`/smart_collections.json`);
    return smartData.smart_collections.find((c: any) => c.handle === handle) || null;
  } catch (error) {
    console.error('Error fetching collection:', error);
    return null;
  }
}

const missingSalles = [
  {
    title: 'Salle de Conférence - Jusqu\'à 80 personnes',
    handle: 'salle-conference-80-personnes',
    description: `<div class="space-y-6">
  <h2 class="text-2xl font-bold">Espace événementiel premium</h2>
  <p class="text-lg">Espace événementiel premium pour conférences, séminaires et formations avec équipement professionnel complet.</p>

  <h3 class="text-xl font-bold mt-6">Équipements inclus</h3>
  <ul class="list-disc pl-5 space-y-2">
    <li>Duo vidéoprojecteurs laser 4K</li>
    <li>Écrans latéraux synchronisés</li>
    <li>Système micro-cravate & HF Sennheiser</li>
    <li>Pupitre professionnel ajustable</li>
    <li>Estrade modulaire 40m²</li>
    <li>Scène éclairée DMX</li>
    <li>Régie son + lumière complète</li>
    <li>Streaming HD & enregistrement</li>
    <li>Cabine de traduction simultanée</li>
    <li>Vestiaire 100 places</li>
  </ul>
</div>`,
    variants: [
      { title: '1 heure', price: '80.00' },
      { title: 'Demi-journée (4h)', price: '300.00' },
      { title: 'Journée complète (8h)', price: '560.00' },
    ],
    images: [
      'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    tags: ['salle', 'conference', 'grande-capacite', 'streaming', 'pro'],
  },
  {
    title: 'Terrasse Panoramique - 300m² avec vue',
    handle: 'terrasse-panoramique-300m2',
    description: `<div class="space-y-6">
  <h2 class="text-2xl font-bold">Rooftop exceptionnel</h2>
  <p class="text-lg">Rooftop exceptionnel avec vue 360° pour réceptions, keynotes et afterworks mémorables.</p>

  <h3 class="text-xl font-bold mt-6">Équipements inclus</h3>
  <ul class="list-disc pl-5 space-y-2">
    <li>Vue panoramique 360° sur Marseille</li>
    <li>Lounge extérieur chauffé</li>
    <li>Estrade modulable 20m²</li>
    <li>Mobilier cocktail design</li>
    <li>Wi-Fi mesh outdoor</li>
    <li>Bar mobile équipé complet</li>
    <li>Éclairage soirée LED RGB</li>
    <li>Sonorisation Line Array</li>
    <li>Brumisateurs intégrés</li>
    <li>Pergola bioclimatique 100m²</li>
  </ul>

  <p class="text-sm text-gray-500 mt-4">Minimum 2 heures de location</p>
</div>`,
    variants: [
      { title: '2 heures', price: '400.00' },
      { title: '4 heures', price: '750.00' },
      { title: 'Soirée complète (8h)', price: '1400.00' },
    ],
    images: [
      'https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    tags: ['terrasse', 'rooftop', 'evenement', 'afterwork', 'reception', 'vue'],
  },
  {
    title: 'Lounge & Café - 60m² convivial',
    handle: 'lounge-cafe-60m2',
    description: `<div class="space-y-6">
  <h2 class="text-2xl font-bold">Espace convivial</h2>
  <p class="text-lg">Espace convivial pour networking, pauses gourmandes et mini-events dans une ambiance chaleureuse.</p>

  <h3 class="text-xl font-bold mt-6">Équipements inclus</h3>
  <ul class="list-disc pl-5 space-y-2">
    <li>Canapés Chesterfield</li>
    <li>Machine espresso barista professionnelle</li>
    <li>Sono d'ambiance Sonos</li>
    <li>Éclairage tamisé variable</li>
    <li>Bar équipé avec cave à vin</li>
    <li>Mobilier lounge modulable</li>
    <li>Écran TV 65" 4K</li>
    <li>Espace privatisable</li>
    <li>Bibliothèque design</li>
    <li>Coin jeux (baby-foot, arcade)</li>
  </ul>
</div>`,
    variants: [
      { title: '1 heure', price: '50.00' },
      { title: 'Demi-journée (4h)', price: '180.00' },
      { title: 'Soirée (6h)', price: '280.00' },
    ],
    images: [
      'https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    tags: ['lounge', 'cafe', 'networking', 'cosy', 'afterwork'],
  },
];

async function main() {
  console.log('🏢 CRÉATION DES SALLES MANQUANTES\n');
  console.log('='.repeat(60) + '\n');

  const collection = await getCollectionByHandle('salles-de-reunion');
  if (!collection) {
    console.log('❌ Collection "salles-de-reunion" non trouvée');
    return;
  }

  console.log(`✅ Collection trouvée: ${collection.title} (ID: ${collection.id})\n`);

  for (const salle of missingSalles) {
    console.log(`📦 Création: ${salle.title}...`);

    const productData = {
      product: {
        title: salle.title,
        handle: salle.handle,
        body_html: salle.description,
        vendor: 'Le 40 Coworking',
        product_type: 'Salle de Réunion',
        tags: salle.tags.join(', '),
        published: true,
        options: [{ name: 'Durée' }],
        variants: salle.variants.map(v => ({
          option1: v.title,
          price: v.price,
          inventory_policy: 'continue',
          inventory_management: null,
        })),
        images: salle.images.map(url => ({ src: url })),
      },
    };

    try {
      const result = await restRequest('/products.json', 'POST', productData);
      console.log(`   ✅ Produit créé: ${result.product.id}`);

      await new Promise(r => setTimeout(r, 500));

      console.log(`   🔗 Ajout à la collection...`);
      await restRequest('/collects.json', 'POST', {
        collect: {
          product_id: result.product.id,
          collection_id: collection.id,
        },
      });
      console.log(`   ✅ Ajouté à la collection\n`);

      await new Promise(r => setTimeout(r, 500));
    } catch (error) {
      console.error(`   ❌ Erreur:`, error);
    }
  }

  console.log('='.repeat(60));
  console.log('\n✅ TERMINÉ ! 3 salles créées\n');
}

main().catch(console.error);
