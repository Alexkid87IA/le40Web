import 'dotenv/config';

const SHOPIFY_STORE = process.env.VITE_SHOPIFY_STORE_DOMAIN?.replace('.myshopify.com', '');
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || process.env.SHOPIFY_ADMIN_TOKEN;

const SHOPIFY_REST_API = `https://${SHOPIFY_STORE}.myshopify.com/admin/api/2024-10`;

interface Product {
  id: number;
  title: string;
  variants: Array<{
    id: number;
    title: string;
    price: string;
  }>;
}

async function restRequest(endpoint: string, method: string = 'GET', body?: any) {
  const response = await fetch(`${SHOPIFY_REST_API}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN!,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('API Error:', error);
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

async function getProductByHandle(handle: string): Promise<Product | null> {
  try {
    const data = await restRequest(`/products.json?handle=${handle}`);
    return data.products[0] || null;
  } catch (error) {
    console.error(`Error fetching product ${handle}:`, error);
    return null;
  }
}

async function deleteVariant(variantId: number) {
  try {
    await restRequest(`/variants/${variantId}.json`, 'DELETE');
  } catch (error) {
    console.error(`Error deleting variant ${variantId}:`, error);
  }
}

async function createVariant(productId: number, title: string, price: string) {
  const data = await restRequest(`/products/${productId}/variants.json`, 'POST', {
    variant: {
      title,
      price,
      inventory_policy: 'continue',
      inventory_management: null,
    },
  });
  return data.variant;
}

const studiosConfig: Record<string, Array<{ title: string; price: string }>> = {
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
  console.log('🔧 CORRECTION DES VARIANTS DES STUDIOS LE 40\n');
  console.log('='.repeat(50) + '\n');

  for (const [handle, variants] of Object.entries(studiosConfig)) {
    console.log(`📦 Traitement de ${handle}...`);

    const product = await getProductByHandle(handle);

    if (!product) {
      console.log(`  ❌ Produit non trouvé\n`);
      continue;
    }

    console.log(`  ✅ Produit trouvé: ${product.title} (ID: ${product.id})`);

    console.log(`  ➕ Création des nouveaux variants:`);
    for (const variantConfig of variants) {
      const created = await createVariant(product.id, variantConfig.title, variantConfig.price);
      console.log(`     ✅ ${created.title}: ${created.price}€`);
      await new Promise(r => setTimeout(r, 500));
    }

    console.log(`  🗑️  Suppression du variant par défaut...`);
    for (const variant of product.variants) {
      if (variant.title === 'Default Title' || (parseFloat(variant.price) === 0 && variant.title === 'Default Title')) {
        await deleteVariant(variant.id);
        console.log(`     - Supprimé: ${variant.title}`);
        await new Promise(r => setTimeout(r, 300));
      }
    }

    console.log(`  ✅ ${handle} terminé\n`);
  }

  console.log('✅ SUCCÈS ! Tous les variants ont été configurés.\n');
}

main().catch(console.error);
