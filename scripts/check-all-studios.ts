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

async function checkAllStudios() {
  const query = `
    query {
      products(first: 50, query: "title:Studio Le 40") {
        edges {
          node {
            id
            title
            handle
            status
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
  `;

  const data = await shopifyRequest(query);

  console.log(`\n📊 Produits "Studio Le 40" trouvés: ${data.products.edges.length}\n`);

  data.products.edges.forEach((p: any) => {
    const product = p.node;
    console.log(`\n✅ ${product.title}`);
    console.log(`   ID: ${product.id}`);
    console.log(`   Handle: ${product.handle}`);
    console.log(`   Status: ${product.status}`);
    console.log(`   Variants (${product.variants.edges.length}):`);
    product.variants.edges.forEach((v: any) => {
      console.log(`     - ${v.node.title}: ${v.node.price}€ (${v.node.id})`);
    });
  });
}

checkAllStudios();
