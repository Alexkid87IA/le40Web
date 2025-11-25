import 'dotenv/config';

const SHOPIFY_ADMIN_API_URL = `https://${process.env.VITE_SHOPIFY_STORE_DOMAIN}/admin/api/2024-10/graphql.json`;
const SHOPIFY_ADMIN_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || process.env.SHOPIFY_ADMIN_TOKEN;

async function shopifyRequest(query: string) {
  const response = await fetch(SHOPIFY_ADMIN_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ADMIN_ACCESS_TOKEN!,
    },
    body: JSON.stringify({ query }),
  });

  const result = await response.json();
  return result.data;
}

async function checkAllCollections() {
  const query = `
    query {
      collections(first: 50) {
        edges {
          node {
            id
            title
            handle
            productsCount
          }
        }
      }
    }
  `;

  const data = await shopifyRequest(query);

  console.log('\n📦 TOUTES LES COLLECTIONS SHOPIFY\n');
  console.log('='.repeat(60) + '\n');

  data.collections.edges.forEach((c: any) => {
    const collection = c.node;
    console.log(`✅ ${collection.title}`);
    console.log(`   Handle: ${collection.handle}`);
    console.log(`   Produits: ${collection.productsCount}`);
    console.log(`   ID: ${collection.id}\n`);
  });

  console.log('='.repeat(60));
  console.log(`\nTotal: ${data.collections.edges.length} collections\n`);
}

checkAllCollections();
