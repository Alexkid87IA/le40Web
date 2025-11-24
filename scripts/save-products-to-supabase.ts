import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { ALL_PRODUCTS, SHOPIFY_CONFIG } from './config/products-config.js';

const SHOPIFY_STORE = process.env.VITE_SHOPIFY_STORE || 'renaissance-9581.myshopify.com';
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN || '';
const SHOPIFY_API_VERSION = SHOPIFY_CONFIG.apiVersion;

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function shopifyREST(endpoint: string) {
  const url = `https://${SHOPIFY_STORE}/admin/api/${SHOPIFY_API_VERSION}/${endpoint}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Shopify REST Error: ${response.status} - ${error}`);
  }

  return response.json();
}

async function getAllShopifyProducts() {
  console.log('\n📦 Fetching all products from Shopify...');
  const result = await shopifyREST('products.json?limit=250');
  console.log(`   Found ${result.products.length} products`);
  return result.products;
}

function matchProductByTitle(shopifyProduct: any, configProducts: any[]) {
  const shopifyTitle = shopifyProduct.title.toLowerCase();

  for (const config of configProducts) {
    const configTitle = config.title.toLowerCase();
    if (shopifyTitle === configTitle || shopifyTitle.includes(config.id)) {
      return config;
    }
  }

  return null;
}

async function saveProductsToSupabase() {
  console.log('\n🚀 Starting Supabase Products Sync...\n');
  console.log('═'.repeat(60));

  const shopifyProducts = await getAllShopifyProducts();

  const results = {
    saved: 0,
    errors: 0,
  };

  console.log('\n💾 Saving products to Supabase...\n');

  for (const shopifyProduct of shopifyProducts) {
    const config = matchProductByTitle(shopifyProduct, ALL_PRODUCTS);

    if (!config) {
      console.log(`⊘ ${shopifyProduct.title} - No config match, skipping`);
      continue;
    }

    console.log(`\n🔨 ${shopifyProduct.title}`);
    console.log(`   Local ID: ${config.id}`);
    console.log(`   Shopify ID: ${shopifyProduct.id}`);

    try {
      const { error } = await supabase.from('shopify_products').upsert(
        {
          local_id: config.id,
          shopify_product_id: shopifyProduct.id.toString(),
          shopify_gid: `gid://shopify/Product/${shopifyProduct.id}`,
          title: shopifyProduct.title,
          handle: shopifyProduct.handle,
          product_type: shopifyProduct.product_type,
          vendor: shopifyProduct.vendor,
          tags: shopifyProduct.tags,
          variants: shopifyProduct.variants,
          images: shopifyProduct.images,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'local_id',
        }
      );

      if (error) {
        console.error(`   ❌ Error:`, error.message);
        results.errors++;
      } else {
        console.log(`   ✅ Saved to Supabase`);
        results.saved++;
      }
    } catch (error) {
      console.error(`   ❌ Error:`, error);
      results.errors++;
    }
  }

  console.log('\n\n📊 SUMMARY');
  console.log('═'.repeat(60));
  console.log(`✅ Saved: ${results.saved}`);
  console.log(`❌ Errors: ${results.errors}`);

  console.log('\n📝 Next Steps:\n');
  console.log('  1. Generate calendar slots:');
  console.log('     npm run shopify:generate-calendar');

  return results;
}

saveProductsToSupabase()
  .then(() => {
    console.log('\n✨ Supabase sync complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Fatal error:', error);
    process.exit(1);
  });

export { saveProductsToSupabase };
