import 'dotenv/config';

const SHOPIFY_ADMIN_API_URL = `https://${process.env.VITE_SHOPIFY_STORE_DOMAIN}/admin/api/2024-10/graphql.json`;
const SHOPIFY_ADMIN_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || process.env.SHOPIFY_ADMIN_TOKEN;

async function shopifyRequest(query: string, variables?: any) {
  const response = await fetch(SHOPIFY_ADMIN_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ADMIN_ACCESS_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
  });

  const result = await response.json();

  if (result.errors) {
    console.error('Shopify API Error:', JSON.stringify(result.errors, null, 2));
    throw new Error('Shopify API request failed');
  }

  return result.data;
}

const studios = [
  {
    title: 'Studio Podcast Le 40',
    description: 'Studio podcast professionnel avec matériel audio haut de gamme',
    handle: 'studio-podcast-le-40',
    type: 'podcast',
    variants: [
      { title: '2 heures', price: '80.00' },
      { title: '4 heures', price: '140.00' },
      { title: '8 heures', price: '250.00' },
    ],
  },
  {
    title: 'Studio Vidéo Le 40',
    description: 'Studio vidéo avec fond vert et éclairage professionnel',
    handle: 'studio-video-le-40',
    type: 'video',
    variants: [
      { title: '2 heures', price: '120.00' },
      { title: '4 heures', price: '220.00' },
      { title: '8 heures', price: '400.00' },
    ],
  },
  {
    title: 'Studio Photo Le 40',
    description: 'Studio photo avec cyclorama et équipement flash professionnel',
    handle: 'studio-photo-le-40',
    type: 'photo',
    variants: [
      { title: '2 heures', price: '100.00' },
      { title: '4 heures', price: '180.00' },
      { title: '8 heures', price: '320.00' },
    ],
  },
];

async function getOrCreateCollection() {
  console.log('📁 Vérification de la collection Studios Location...');

  const query = `
    query {
      collections(first: 1, query: "handle:studios-location") {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }
  `;

  const queryData = await shopifyRequest(query);

  if (queryData.collections.edges.length > 0) {
    const collection = queryData.collections.edges[0].node;
    console.log(`✅ Collection existante trouvée: ${collection.title} (${collection.id})\n`);
    return collection.id;
  }

  console.log('📦 Création de la collection...');

  const mutation = `
    mutation collectionCreate($input: CollectionInput!) {
      collectionCreate(input: $input) {
        collection {
          id
          title
          handle
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyRequest(mutation, {
    input: {
      title: 'Studios Location',
      handle: 'studios-location',
      descriptionHtml: '<p>Louez nos studios créatifs équipés</p>',
    },
  });

  if (data.collectionCreate.userErrors.length > 0) {
    console.error('Erreurs:', data.collectionCreate.userErrors);
    throw new Error('Failed to create collection');
  }

  const collection = data.collectionCreate.collection;
  console.log(`✅ Collection créée: ${collection.title} (${collection.id})\n`);
  return collection.id;
}

async function createProduct(studio: typeof studios[0], collectionId: string) {
  console.log(`🎬 Création de ${studio.title}...`);

  const createMutation = `
    mutation productCreate($input: ProductInput!) {
      productCreate(input: $input) {
        product {
          id
          title
          handle
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const productData = await shopifyRequest(createMutation, {
    input: {
      title: studio.title,
      handle: studio.handle,
      descriptionHtml: `<p>${studio.description}</p>`,
      productType: 'Studio Location',
      vendor: 'Le 40',
      tags: ['studio', `studio-${studio.type}`],
      collectionsToJoin: [collectionId],
    },
  });

  if (productData.productCreate.userErrors.length > 0) {
    console.error('Erreurs:', productData.productCreate.userErrors);
    throw new Error('Failed to create product');
  }

  const product = productData.productCreate.product;
  console.log(`  ✅ Produit créé: ${product.id}`);

  for (const variant of studio.variants) {
    await createVariant(product.id, variant);
  }

  await addToCollection(product.id, collectionId);

  console.log(`  ✅ ${studio.title} terminé\n`);
  return product;
}

async function createVariant(productId: string, variant: { title: string; price: string }) {
  const mutation = `
    mutation productVariantCreate($input: ProductVariantInput!) {
      productVariantCreate(input: $input) {
        productVariant {
          id
          title
          price
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyRequest(mutation, {
    input: {
      productId,
      price: variant.price,
      title: variant.title,
      inventoryPolicy: 'CONTINUE',
    },
  });

  if (data.productVariantCreate.userErrors.length > 0) {
    console.error('Erreurs variant:', data.productVariantCreate.userErrors);
  } else {
    console.log(`    - Variant créé: ${variant.title} (${variant.price}€)`);
  }
}

async function addToCollection(productId: string, collectionId: string) {
  const mutation = `
    mutation collectionAddProducts($id: ID!, $productIds: [ID!]!) {
      collectionAddProducts(id: $id, productIds: $productIds) {
        collection {
          id
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  await shopifyRequest(mutation, {
    id: collectionId,
    productIds: [productId],
  });
}

async function main() {
  console.log('🚀 CRÉATION DES STUDIOS SUR SHOPIFY\n');
  console.log('='.repeat(50) + '\n');

  try {
    const collectionId = await getOrCreateCollection();

    for (const studio of studios) {
      await createProduct(studio, collectionId);
      await new Promise(r => setTimeout(r, 500));
    }

    console.log('\n✅ SUCCÈS ! Tous les studios ont été créés.');
    console.log('\n🔗 Vérifie sur: https://' + process.env.VITE_SHOPIFY_STORE_DOMAIN + '/admin/collections');
  } catch (error) {
    console.error('\n❌ ERREUR:', error);
    process.exit(1);
  }
}

main();
