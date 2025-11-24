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
    title: 'Services de Post-Production',
    handle: 'post-production',
    body_html: `<p>Montage vidéo, clipping, color grading et services professionnels pour finaliser vos contenus.</p>`,
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
    title: 'Services Expert',
    handle: 'services-expert',
    body_html: `<p>Services professionnels pour créateurs : scripts, stratégie contenu, SEO YouTube, gestion ads, branding et distribution multi-plateforme.</p>`,
    rules: [
      {
        column: 'type',
        relation: 'equals',
        condition: 'Service Expert',
      },
    ],
    sort_order: 'manual',
  },
  {
    title: 'Services Beauty & Style',
    handle: 'services-beauty',
    body_html: `<p>Maquillage professionnel et stylisme pour vos tournages et événements.</p>`,
    rules: [
      {
        column: 'type',
        relation: 'equals',
        condition: 'Service Beauty',
      },
    ],
    sort_order: 'manual',
  },
  {
    title: 'Décoration & Scénographie',
    handle: 'decoration-scenographie',
    body_html: `<p>Setup thématique et décoration personnalisée pour vos tournages : e-commerce, interview, gaming, custom.</p>`,
    rules: [
      {
        column: 'type',
        relation: 'equals',
        condition: 'Service Décoration',
      },
    ],
    sort_order: 'manual',
  },
  {
    title: 'Catering & Restauration',
    handle: 'catering-restauration',
    body_html: `<p>Service traiteur complet pour vos tournages et événements : coffee break, déjeuner, snacks.</p>`,
    rules: [
      {
        column: 'type',
        relation: 'equals',
        condition: 'Service Catering',
      },
    ],
    sort_order: 'manual',
  },
  {
    title: 'Support Technique Premium',
    handle: 'support-technique',
    body_html: `<p>Techniciens dédiés pour vos tournages : régie vidéo live, ingénieur son, photographe plateau, drone.</p>`,
    rules: [
      {
        column: 'type',
        relation: 'equals',
        condition: 'Service Technique',
      },
    ],
    sort_order: 'manual',
  },
  {
    title: 'Location Équipement Premium',
    handle: 'location-equipement',
    body_html: `<p>Matériel professionnel haute gamme : gimbal, LED RGB, slider motorisé, kit cinéma RED/ARRI.</p>`,
    rules: [
      {
        column: 'type',
        relation: 'equals',
        condition: 'Location',
      },
    ],
    sort_order: 'manual',
  },
  {
    title: 'Domiciliation d\'Entreprise',
    handle: 'domiciliation',
    body_html: `<p>Adresse professionnelle prestigieuse à Marseille avec scan courrier, réexpédition et attestations administratives.</p>
    <p><strong>Sans engagement - Résiliable en 1 clic</strong></p>`,
    rules: [
      {
        column: 'type',
        relation: 'equals',
        condition: 'Domiciliation',
      },
    ],
    sort_order: 'manual',
  },
  {
    title: 'Événements & Formations',
    handle: 'evenements-formations',
    body_html: `<p>Afterworks networking, masterclass créateurs, conférences et ateliers pour développer vos compétences et votre réseau.</p>`,
    rules: [
      {
        column: 'type',
        relation: 'equals',
        condition: 'Événement',
      },
    ],
    sort_order: 'manual',
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
  {
    title: 'Offres de Lancement',
    handle: 'offres-de-lancement',
    body_html: `<p><strong>Jusqu'à -40% sur nos studios créatifs !</strong></p>
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
    title: 'Pour Créateurs de Contenu',
    handle: 'pour-createurs',
    body_html: `<p>Tous nos espaces et services dédiés aux créateurs : YouTube, podcast, streaming, TikTok.</p>`,
    rules: [
      {
        column: 'tag',
        relation: 'equals',
        condition: 'youtube',
      },
    ],
    sort_order: 'manual',
  },
  {
    title: 'Pack Abonnement',
    handle: 'pack-abonnement',
    body_html: `<p>Formules mensuelles et annuelles pour domiciliation et services récurrents. Économisez jusqu'à 20% avec nos packs annuels.</p>`,
    rules: [
      {
        column: 'tag',
        relation: 'equals',
        condition: 'domiciliation',
      },
    ],
    sort_order: 'price-asc',
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
    console.log(`✅ Collection créée: ${collection.title} (${data.smart_collection.products_count} produits)`);
    return data.smart_collection;
  } catch (error) {
    console.error(`❌ Erreur pour ${collection.title}:`, error);
    throw error;
  }
}

async function listExistingCollections() {
  try {
    const response = await fetch(
      `https://${SHOPIFY_STORE}/admin/api/${API_VERSION}/smart_collections.json?limit=250`,
      {
        headers: {
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN!,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to list collections');
    }

    const data = await response.json();
    return data.smart_collections || [];
  } catch (error) {
    console.error('❌ Erreur listing collections:', error);
    return [];
  }
}

async function deleteCollection(collectionId: number) {
  try {
    const response = await fetch(
      `https://${SHOPIFY_STORE}/admin/api/${API_VERSION}/smart_collections/${collectionId}.json`,
      {
        method: 'DELETE',
        headers: {
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN!,
        },
      }
    );

    if (response.ok) {
      console.log(`🗑️  Collection supprimée: ${collectionId}`);
    }
  } catch (error) {
    console.error(`❌ Erreur suppression collection ${collectionId}:`, error);
  }
}

async function main() {
  console.log('🚀 Création des collections Shopify...\n');

  if (!SHOPIFY_ADMIN_TOKEN) {
    console.error('❌ SHOPIFY_ADMIN_TOKEN manquant dans .env');
    process.exit(1);
  }

  const existingCollections = await listExistingCollections();
  console.log(`📦 ${existingCollections.length} collection(s) existante(s)\n`);

  if (existingCollections.length > 0) {
    console.log('🗑️  Suppression des collections existantes...');
    for (const collection of existingCollections) {
      if (collection.handle !== 'frontpage') {
        await deleteCollection(collection.id);
      }
    }
    console.log('');
  }

  console.log('✨ Création des nouvelles collections...\n');

  let successCount = 0;
  for (const collection of COLLECTIONS) {
    try {
      await createSmartCollection(collection);
      successCount++;
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`❌ Échec: ${collection.title}`);
    }
  }

  console.log('\n✅ Terminé !');
  console.log(`📊 ${successCount}/${COLLECTIONS.length} collections créées avec succès`);
  console.log('\n💡 Les produits sont automatiquement assignés via les règles smart collection');
  console.log('💡 Visitez votre admin Shopify pour vérifier les collections');
}

main().catch(console.error);
