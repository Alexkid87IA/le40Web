import 'dotenv/config';
import { ALL_PRODUCTS, SHOPIFY_CONFIG } from './config/products-config';

const SHOPIFY_STORE = process.env.VITE_SHOPIFY_STORE || 'renaissance-9581.myshopify.com';
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN || '';
const SHOPIFY_API_VERSION = SHOPIFY_CONFIG.apiVersion;

interface ProductStats {
  total: number;
  created: number;
  skipped: number;
  failed: number;
  byCategory: Record<string, { created: number; skipped: number; failed: number }>;
}

async function shopifyRequest(endpoint: string, method: string = 'GET', body?: any) {
  const url = `https://${SHOPIFY_STORE}/admin/api/${SHOPIFY_API_VERSION}/${endpoint}`;

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Shopify API Error: ${response.status} - ${error}`);
  }

  return response.json();
}

async function getExistingProducts() {
  try {
    console.log('📦 Fetching existing products from Shopify...');
    const data = await shopifyRequest('products.json?limit=250');
    const products = data.products || [];
    console.log(`✅ Found ${products.length} existing products\n`);
    return products;
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    return [];
  }
}

function determineOptionName(productType: string): string {
  if (productType === 'Studio Créatif' || productType === 'Salle de Réunion') {
    return 'Durée';
  }
  if (productType === 'Domiciliation') {
    return 'Abonnement';
  }
  if (productType === 'Événement') {
    return 'Type de billet';
  }
  if (productType.includes('Service')) {
    return 'Formule';
  }
  return 'Option';
}

async function createProduct(product: any, existingProducts: any[]) {
  const exists = existingProducts.find(
    (p) => p.title === product.title || p.variants?.some((v: any) => product.variants.some((pv: any) => pv.sku === v.sku))
  );

  if (exists) {
    console.log(`⏭️  Skipped: ${product.title} (already exists)`);
    return { status: 'skipped' };
  }

  try {
    const optionName = determineOptionName(product.product_type);
    const hasMultipleVariants = product.variants.length > 1;

    const shopifyProduct: any = {
      title: product.title,
      body_html: product.body_html,
      vendor: product.vendor,
      product_type: product.product_type,
      tags: product.tags.join(', '),
      status: 'active',
      published: true,
    };

    if (hasMultipleVariants) {
      shopifyProduct.options = [{ name: optionName }];
      shopifyProduct.variants = product.variants.map((v: any, index: number) => ({
        option1: v.title,
        price: v.price,
        compare_at_price: v.compare_at_price || null,
        sku: v.sku,
        inventory_management: null,
        inventory_policy: 'continue',
        fulfillment_service: 'manual',
      }));
    } else {
      shopifyProduct.variants = [
        {
          price: product.variants[0].price,
          compare_at_price: product.variants[0].compare_at_price || null,
          sku: product.variants[0].sku,
          inventory_management: null,
          inventory_policy: 'continue',
          fulfillment_service: 'manual',
        },
      ];
    }

    if (product.images && product.images.length > 0) {
      shopifyProduct.images = product.images.map((img: any) => ({ src: img.src }));
    }

    const response = await shopifyRequest('products.json', 'POST', { product: shopifyProduct });

    if (product.metafields && response.product?.id) {
      await createMetafields(response.product.id, product.metafields);
    }

    console.log(`✅ Created: ${product.title} (${product.variants.length} variant(s))`);
    return { status: 'created', id: response.product.id };
  } catch (error) {
    console.error(`❌ Failed: ${product.title} - ${error}`);
    return { status: 'failed', error };
  }
}

async function createMetafields(productId: string, metafields: any) {
  try {
    for (const [key, value] of Object.entries(metafields)) {
      if (value === null || value === undefined) continue;

      let metafieldType = 'single_line_text_field';
      let metafieldValue: any = String(value);

      if (typeof value === 'boolean') {
        metafieldType = 'boolean';
        metafieldValue = value;
      } else if (typeof value === 'number') {
        metafieldType = 'number_integer';
        metafieldValue = value;
      }

      const metafield = {
        namespace: 'custom',
        key: key,
        value: metafieldValue,
        type: metafieldType,
      };

      await shopifyRequest(`products/${productId}/metafields.json`, 'POST', { metafield });
    }
  } catch (error) {
    console.error(`⚠️  Warning: Could not create metafields for product ${productId}`);
  }
}

function getCategoryFromProductType(productType: string): string {
  if (productType === 'Salle de Réunion') return 'Meeting Rooms';
  if (productType === 'Studio Créatif') return 'Studios';
  if (productType === 'Service Post-Production') return 'Additional Services';
  if (productType === 'Service Expert') return 'Expert Services';
  if (productType === 'Domiciliation') return 'Domiciliation';
  if (productType === 'Événement') return 'Events';
  if (['Service Beauty', 'Service Décoration', 'Service Catering', 'Service Technique', 'Location'].includes(productType)) {
    return 'Premium Services';
  }
  return 'Other';
}

async function main() {
  console.log('🚀 Creating all products on Shopify\n');
  console.log(`📊 Total products to process: ${ALL_PRODUCTS.length}\n`);

  if (!SHOPIFY_ADMIN_TOKEN) {
    console.error('❌ SHOPIFY_ADMIN_TOKEN missing in .env');
    process.exit(1);
  }

  const existingProducts = await getExistingProducts();

  const stats: ProductStats = {
    total: ALL_PRODUCTS.length,
    created: 0,
    skipped: 0,
    failed: 0,
    byCategory: {},
  };

  console.log('✨ Processing products...\n');

  for (const product of ALL_PRODUCTS) {
    const category = getCategoryFromProductType(product.product_type);

    if (!stats.byCategory[category]) {
      stats.byCategory[category] = { created: 0, skipped: 0, failed: 0 };
    }

    const result = await createProduct(product, existingProducts);

    if (result.status === 'created') {
      stats.created++;
      stats.byCategory[category].created++;
    } else if (result.status === 'skipped') {
      stats.skipped++;
      stats.byCategory[category].skipped++;
    } else {
      stats.failed++;
      stats.byCategory[category].failed++;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 FINAL REPORT');
  console.log('='.repeat(60));
  console.log(`\n✅ Total Created: ${stats.created}/${stats.total}`);
  console.log(`⏭️  Total Skipped: ${stats.skipped}/${stats.total}`);
  console.log(`❌ Total Failed: ${stats.failed}/${stats.total}`);

  console.log('\n📦 By Category:');
  console.log('-'.repeat(60));

  Object.entries(stats.byCategory)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([category, categoryStat]) => {
      const total = categoryStat.created + categoryStat.skipped + categoryStat.failed;
      console.log(`\n${category}:`);
      console.log(`  ✅ Created: ${categoryStat.created}`);
      console.log(`  ⏭️  Skipped: ${categoryStat.skipped}`);
      console.log(`  ❌ Failed: ${categoryStat.failed}`);
      console.log(`  📊 Total: ${total}`);
    });

  console.log('\n' + '='.repeat(60));
  console.log('\n💡 Next steps:');
  console.log('   1. Run: npm run shopify:update-collections');
  console.log('   2. Visit your Shopify Admin to verify products');
  console.log('   3. Check collections to ensure proper organization');
  console.log('\n✨ Done!\n');
}

main().catch(console.error);
