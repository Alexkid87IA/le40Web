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

async function getProductByHandle(handle: string) {
  const query = `
    query {
      productByHandle(handle: "${handle}") {
        id
        title
        variants(first: 5) {
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
  `;

  const data = await shopifyRequest(query);
  return data.productByHandle;
}

async function deleteVariant(variantId: string) {
  const mutation = `
    mutation productVariantDelete($productId: ID!, $id: ID!) {
      productVariantDelete(productId: $productId, id: $id) {
        deletedProductVariantId
        userErrors {
          field
          message
        }
      }
    }
  `;

  const productIdFromVariant = variantId.replace(/VariantId/, 'ProductId').split('/')[4];
  await shopifyRequest(mutation, {
    productId: `gid://shopify/Product/${productIdFromVariant}`,
    id: variantId
  });
}

async function createVariant(productId: string, title: string, price: string) {
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
      title,
      price,
      inventoryPolicy: 'CONTINUE',
    },
  });

  if (data.productVariantCreate.userErrors.length > 0) {
    console.error('Erreurs:', data.productVariantCreate.userErrors);
    throw new Error('Failed to create variant');
  }

  return data.productVariantCreate.productVariant;
}

const studiosConfig = {
  'studio-podcast-le-40': [
    { title: '2 heures', price: '80.00' },
    { title: '4 heures', price: '140.00' },
    { title: '8 heures', price: '250.00' },
  ],
  'studio-video-le-40': [
    { title: '2 heures', price: '120.00' },
    { title: '4 heures', price: '220.00' },
    { title: '8 heures', price: '400.00' },
  ],
  'studio-photo-le-40': [
    { title: '2 heures', price: '100.00' },
    { title: '4 heures', price: '180.00' },
    { title: '8 heures', price: '320.00' },
  ],
};

async function main() {
  console.log('🎬 AJOUT DES VARIANTS AUX STUDIOS\n');
  console.log('='.repeat(50) + '\n');

  for (const [handle, variants] of Object.entries(studiosConfig)) {
    console.log(`\n📦 Traitement de ${handle}...`);

    const product = await getProductByHandle(handle);

    if (!product) {
      console.log(`  ❌ Produit non trouvé`);
      continue;
    }

    console.log(`  ✅ Produit trouvé: ${product.title}`);
    console.log(`  ➕ Création des variants:`);
    for (const variant of variants) {
      const created = await createVariant(product.id, variant.title, variant.price);
      console.log(`     - ${created.title}: ${created.price}€`);
      await new Promise(r => setTimeout(r, 200));
    }

    console.log(`  ✅ ${handle} terminé`);
  }

  console.log('\n\n✅ SUCCÈS ! Tous les variants ont été ajoutés.\n');
}

main().catch(console.error);
