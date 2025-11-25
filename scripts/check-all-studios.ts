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
  if (result.errors) throw new Error(JSON.stringify(result.errors));
  return result.data;
}

async function checkProducts(collectionHandle: string) {
  const query = `
    query($handle: String!) {
      collectionByHandle(handle: $handle) {
        title
        handle
        products(first: 50) {
          edges {
            node {
              id
              title
              handle
              variants(first: 10) {
                edges {
                  node {
                    title
                    price
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyRequest(query, { handle: collectionHandle });
  const collection = data.collectionByHandle;
  
  if (!collection) {
    console.log(`❌ Collection "${collectionHandle}" non trouvée\n`);
    return;
  }

  console.log(`\n📦 ${collection.title}`);
  console.log(`🔗 Handle: ${collectionHandle}`);
  console.log(`📊 ${collection.products.edges.length} produits\n`);

  collection.products.edges.forEach((p: any) => {
    const product = p.node;
    console.log(`  ✅ ${product.title}`);
    console.log(`     Handle: ${product.handle}`);
    console.log(`     Variants:`);
    product.variants.edges.forEach((v: any) => {
      console.log(`       - ${v.node.title}: ${v.node.price}€`);
    });
    console.log('');
  });
}

async function main() {
  console.log('\n🔍 AUDIT COMPLET DES COLLECTIONS PRINCIPALES\n');
  console.log('='.repeat(70));

  const collectionsToCheck = [
    'studios-location',
    'salles-de-reunion',
    'domiciliation',
    'evenements-formations',
    'bundles-packs',
    'le-40-club',
    'services-expert'
  ];

  for (const handle of collectionsToCheck) {
    await checkProducts(handle);
  }

  console.log('='.repeat(70));
  console.log('\n✅ AUDIT TERMINÉ\n');
}

main().catch(console.error);
