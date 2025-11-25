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

async function deleteProduct(productId: string) {
  const mutation = `
    mutation productDelete($input: ProductDeleteInput!) {
      productDelete(input: $input) {
        deletedProductId
        userErrors {
          field
          message
        }
      }
    }
  `;

  await shopifyRequest(mutation, {
    input: { id: productId }
  });
}

async function updateProduct(productId: string, variants: Array<{title: string, price: string}>) {
  const mutation = `
    mutation productUpdate($input: ProductInput!) {
      productUpdate(input: $input) {
        product {
          id
          title
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
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyRequest(mutation, {
    input: {
      id: productId,
      variants: variants.map(v => ({
        price: v.price,
        title: v.title,
        inventoryPolicy: 'CONTINUE',
      })),
    },
  });

  if (data.productUpdate.userErrors.length > 0) {
    console.error('Erreurs:', data.productUpdate.userErrors);
  }

  return data.productUpdate.product;
}

async function main() {
  console.log('🔧 CORRECTION DES STUDIOS LE 40\n');

  const productsToDelete = [
    'gid://shopify/Product/10277743886675',
    'gid://shopify/Product/10277745656147',
    'gid://shopify/Product/10277745688915',
    'gid://shopify/Product/10277745721683',
  ];

  console.log('🗑️  Suppression des doublons...\n');
  for (const id of productsToDelete) {
    await deleteProduct(id);
    console.log(`  ✅ Supprimé: ${id}`);
    await new Promise(r => setTimeout(r, 300));
  }

  const studiosToFix = {
    'gid://shopify/Product/10277743788371': {
      name: 'Studio Podcast Le 40',
      variants: [
        { title: '2 heures', price: '80.00' },
        { title: '4 heures', price: '140.00' },
        { title: '8 heures', price: '250.00' },
      ],
    },
    'gid://shopify/Product/10277743821139': {
      name: 'Studio Vidéo Le 40',
      variants: [
        { title: '2 heures', price: '120.00' },
        { title: '4 heures', price: '220.00' },
        { title: '8 heures', price: '400.00' },
      ],
    },
    'gid://shopify/Product/10277743853907': {
      name: 'Studio Photo Le 40',
      variants: [
        { title: '2 heures', price: '100.00' },
        { title: '4 heures', price: '180.00' },
        { title: '8 heures', price: '320.00' },
      ],
    },
  };

  console.log('\n➕ Ajout des variants avec prix...\n');
  for (const [productId, config] of Object.entries(studiosToFix)) {
    console.log(`📦 ${config.name}...`);
    const updated = await updateProduct(productId, config.variants);
    console.log(`  ✅ Variants ajoutés:`);
    updated.variants.edges.forEach((v: any) => {
      console.log(`     - ${v.node.title}: ${v.node.price}€`);
    });
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('\n✅ SUCCÈS ! Studios Le 40 correctement configurés.\n');
}

main().catch(console.error);
