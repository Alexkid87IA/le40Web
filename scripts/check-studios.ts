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

async function checkStudios() {
  const query = `
    query {
      collection(id: "gid://shopify/Collection/663906550099") {
        id
        title
        handle
        products(first: 10) {
          edges {
            node {
              id
              title
              handle
              variants(first: 10) {
                edges {
                  node {
                    id
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

  const data = await shopifyRequest(query);
  const collection = data.collection;

  console.log(`\n📦 Collection: ${collection.title}`);
  console.log(`🔗 Handle: ${collection.handle}`);
  console.log(`📊 Produits: ${collection.products.edges.length}\n`);

  collection.products.edges.forEach((p: any) => {
    const product = p.node;
    console.log(`✅ ${product.title}`);
    console.log(`   Handle: ${product.handle}`);
    console.log(`   Variants:`);
    product.variants.edges.forEach((v: any) => {
      console.log(`     - ${v.node.title}: ${v.node.price}€`);
    });
    console.log('');
  });
}

checkStudios();
