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

async function findProducts() {
  const query = `
    query {
      products(first: 10, query: "tag:studio") {
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

  const data = await shopifyRequest(query);
  return data.products.edges.map((e: any) => e.node);
}

async function addToCollection(productIds: string[], collectionId: string) {
  const mutation = `
    mutation collectionAddProducts($id: ID!, $productIds: [ID!]!) {
      collectionAddProducts(id: $id, productIds: $productIds) {
        collection {
          id
          title
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyRequest(mutation, {
    id: collectionId,
    productIds,
  });

  if (data.collectionAddProducts.userErrors.length > 0) {
    console.error('Erreurs:', data.collectionAddProducts.userErrors);
    throw new Error('Failed to add products to collection');
  }

  return data.collectionAddProducts.collection;
}

async function main() {
  console.log('🔍 Recherche des produits Studios...\n');

  const products = await findProducts();

  console.log(`✅ Trouvé ${products.length} produits:\n`);
  products.forEach((p: any) => {
    console.log(`  - ${p.title} (${p.handle})`);
  });

  const collectionId = 'gid://shopify/Collection/663906550099';
  const productIds = products.map((p: any) => p.id);

  console.log(`\n📦 Ajout à la collection Studios Location...\n`);

  await addToCollection(productIds, collectionId);

  console.log('✅ SUCCÈS ! Tous les produits ont été ajoutés à la collection.\n');
}

main().catch(console.error);
