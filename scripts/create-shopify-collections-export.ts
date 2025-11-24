import 'dotenv/config';

const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const SHOPIFY_STORE = 'renaissance-9581.myshopify.com';
const API_VERSION = '2024-10';

interface CollectionConfig {
  title: string;
  handle: string;
  body_html: string;
  rules: Array<{
    column: string;
    relation: string;
    condition: string;
  }>;
  sort_order: string;
}

const COLLECTIONS: CollectionConfig[] = [
  {
    title: 'Studios Créatifs',
    handle: 'studios-creatifs',
    body_html: `<p>Nos studios professionnels pour créateurs de contenu : YouTube, podcast, streaming, et bien plus.</p>
    <p><strong>Offre de lancement : jusqu'à -40% sur tous les studios !</strong></p>`,
    rules: [
      {
        column: 'type',
        relation: 'equals',
        condition: 'Studio Créatif',
      },
    ],
    sort_order: 'manual',
  },
  {
    title: 'Salles de Réunion',
    handle: 'salles-de-reunion',
    body_html: `<p>Des salles de réunion équipées pour toutes vos sessions professionnelles, de 2 à 80 personnes.</p>`,
    rules: [
      {
        column: 'type',
        relation: 'equals',
        condition: 'Salle de Réunion',
      },
    ],
    sort_order: 'manual',
  },
  {
    title: 'Espaces Événementiels',
    handle: 'espaces-evenementiels',
    body_html: `<p>Terrasse panoramique, lounge café et salles de conférence pour vos événements d'entreprise.</p>`,
    rules: [
      {
        column: 'type',
        relation: 'equals',
        condition: 'Espace Événementiel',
      },
    ],
    sort_order: 'manual',
  },
  {
    title: 'Salles de Conférence',
    handle: 'salles-de-conference',
    body_html: `<p>Grande salle équipée pour conférences, séminaires et événements jusqu'à 80 personnes.</p>`,
    rules: [
      {
        column: 'type',
        relation: 'equals',
        condition: 'Salle de Conférence',
      },
    ],
    sort_order: 'manual',
  },
  {
    title: 'Services de Post-Production',
    handle: 'post-production',
    body_html: `<p>Montage vidéo, clipping, et services professionnels pour finaliser vos contenus.</p>`,
    rules: [
      {
        column: 'type',
        relation: 'equals',
        condition: 'Service Post-Production',
      },
    ],
    sort_order: 'manual',
  },
  {
    title: 'Location Équipement',
    handle: 'location-equipement',
    body_html: `<p>Équipements additionnels : téléprompter, caméras extras, régie live et plus.</p>`,
    rules: [
      {
        column: 'type',
        relation: 'equals',
        condition: 'Location Équipement',
      },
    ],
    sort_order: 'manual',
  },
  {
    title: 'Offres de Lancement',
    handle: 'offres-de-lancement',
    body_html: `<p><strong>🎉 Jusqu'à -40% sur nos studios créatifs !</strong></p>
    <p>Profitez de nos prix de lancement exceptionnels pour tester nos équipements professionnels.</p>`,
    rules: [
      {
        column: 'tag',
        relation: 'equals',
        condition: 'offre-lancement',
      },
    ],
    sort_order: 'best-selling',
  },
  {
    title: 'Les Plus Populaires',
    handle: 'populaires',
    body_html: `<p>Les espaces et services les plus réservés par nos clients.</p>`,
    rules: [
      {
        column: 'tag',
        relation: 'equals',
        condition: 'populaire',
      },
    ],
    sort_order: 'best-selling',
  },
];

async function createSmartCollection(collection: CollectionConfig) {
  try {
    const response = await fetch(
      `https://${SHOPIFY_STORE}/admin/api/${API_VERSION}/smart_collections.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN!,
        },
        body: JSON.stringify({
          smart_collection: {
            title: collection.title,
            handle: collection.handle,
            body_html: collection.body_html,
            rules: collection.rules,
            disjunctive: false,
            sort_order: collection.sort_order,
            published: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to create collection ${collection.title}: ${error}`);
    }

    const data = await response.json();
    return { success: true, collection: data.smart_collection };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function createAllCollections() {
  console.log('\n✨ Création des collections Shopify...\n');

  const results = {
    success: [] as any[],
    errors: [] as any[],
  };

  for (const collection of COLLECTIONS) {
    const result = await createSmartCollection(collection);

    if (result.success) {
      console.log(`✅ Collection créée: ${collection.title}`);
      results.success.push({ title: collection.title, ...result });
    } else {
      console.error(`❌ Erreur: ${collection.title} - ${result.error}`);
      results.errors.push({ title: collection.title, error: result.error });
    }

    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n📊 Collections: ${results.success.length} créées, ${results.errors.length} erreurs\n`);

  return results;
}
