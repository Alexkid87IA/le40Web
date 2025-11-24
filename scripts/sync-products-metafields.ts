import 'dotenv/config';
import { ALL_PRODUCTS, SHOPIFY_CONFIG } from './config/products-config.js';

const SHOPIFY_STORE = process.env.VITE_SHOPIFY_STORE || 'renaissance-9581.myshopify.com';
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN || '';
const SHOPIFY_API_VERSION = SHOPIFY_CONFIG.apiVersion;

async function shopifyGraphQL(query: string, variables?: any) {
  const url = `https://${SHOPIFY_STORE}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Shopify GraphQL Error: ${response.status} - ${error}`);
  }

  const result = await response.json();

  if (result.errors) {
    throw new Error(`GraphQL Errors: ${JSON.stringify(result.errors, null, 2)}`);
  }

  return result.data;
}

async function shopifyREST(endpoint: string, method: string = 'GET') {
  const url = `https://${SHOPIFY_STORE}/admin/api/${SHOPIFY_API_VERSION}/${endpoint}`;

  const response = await fetch(url, {
    method,
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

async function updateProductMetafields(productId: string, productGid: string, metafields: any[]) {
  const mutation = `
    mutation UpdateProductMetafields($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields {
          id
          namespace
          key
          value
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const input = {
    metafields: metafields.map((mf) => ({
      ownerId: productGid,
      namespace: mf.namespace,
      key: mf.key,
      value: mf.value,
      type: mf.type,
    })),
  };

  const data = await shopifyGraphQL(mutation, input);

  if (data.metafieldsSet.userErrors.length > 0) {
    console.error(`   ⚠️  Errors:`, data.metafieldsSet.userErrors);
    return { success: false, errors: data.metafieldsSet.userErrors };
  }

  return { success: true, metafields: data.metafieldsSet.metafields };
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

async function syncAllProductsMetafields() {
  console.log('\n🚀 Starting Product Metafields Synchronization...\n');
  console.log('═'.repeat(60));

  const shopifyProducts = await getAllShopifyProducts();

  const results = {
    synced: 0,
    errors: 0,
    skipped: 0,
  };

  console.log('\n🔄 Syncing metafields...\n');

  for (const shopifyProduct of shopifyProducts) {
    const config = matchProductByTitle(shopifyProduct, ALL_PRODUCTS);

    if (!config || !config.metafields) {
      console.log(`⊘ ${shopifyProduct.title} - No config found, skipping`);
      results.skipped++;
      continue;
    }

    console.log(`\n🔨 ${shopifyProduct.title}`);
    console.log(`   Product ID: ${shopifyProduct.id}`);

    const metafields = [];

    if (config.metafields.calendar_sync_required !== undefined) {
      metafields.push({
        namespace: 'custom',
        key: 'calendar_sync_required',
        value: config.metafields.calendar_sync_required.toString(),
        type: 'boolean',
      });
    }

    if (config.metafields.resource_name) {
      metafields.push({
        namespace: 'custom',
        key: 'resource_name',
        value: config.metafields.resource_name,
        type: 'single_line_text_field',
      });
    }

    if (config.metafields.resource_type) {
      metafields.push({
        namespace: 'custom',
        key: 'resource_type',
        value: config.metafields.resource_type,
        type: 'single_line_text_field',
      });
    }

    if (config.metafields.capacity) {
      metafields.push({
        namespace: 'custom',
        key: 'capacity',
        value: config.metafields.capacity,
        type: 'single_line_text_field',
      });
    }

    if (config.metafields.gradient) {
      metafields.push({
        namespace: 'custom',
        key: 'gradient',
        value: config.metafields.gradient,
        type: 'single_line_text_field',
      });
    }

    if (config.metafields.recommended_duration) {
      metafields.push({
        namespace: 'custom',
        key: 'recommended_duration',
        value: config.metafields.recommended_duration,
        type: 'single_line_text_field',
      });
    }

    if (config.metafields.launch_offer !== undefined) {
      metafields.push({
        namespace: 'custom',
        key: 'launch_offer',
        value: config.metafields.launch_offer.toString(),
        type: 'boolean',
      });
    }

    if (config.metafields.savings) {
      metafields.push({
        namespace: 'custom',
        key: 'savings',
        value: config.metafields.savings.toString(),
        type: 'number_integer',
      });
    }

    if (metafields.length > 0) {
      const productGid = `gid://shopify/Product/${shopifyProduct.id}`;

      try {
        const result = await updateProductMetafields(
          shopifyProduct.id,
          productGid,
          metafields
        );

        if (result.success) {
          console.log(`   ✅ Updated ${metafields.length} metafields`);
          results.synced++;
        } else {
          console.log(`   ❌ Failed to update metafields`);
          results.errors++;
        }
      } catch (error) {
        console.error(`   ❌ Error:`, error);
        results.errors++;
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
    } else {
      console.log(`   ⊘ No metafields to sync`);
      results.skipped++;
    }
  }

  console.log('\n\n📊 SUMMARY');
  console.log('═'.repeat(60));
  console.log(`✅ Synced: ${results.synced}`);
  console.log(`⊘ Skipped: ${results.skipped}`);
  console.log(`❌ Errors: ${results.errors}`);

  console.log('\n📝 Next Steps:\n');
  console.log('  1. Verify metafields in Shopify Admin:');
  console.log('     https://renaissance-9581.myshopify.com/admin/products');
  console.log('\n  2. Generate calendar slots:');
  console.log('     npm run shopify:generate-calendar');

  return results;
}

syncAllProductsMetafields()
  .then(() => {
    console.log('\n✨ Product metafields sync complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Fatal error:', error);
    process.exit(1);
  });

export { syncAllProductsMetafields };
