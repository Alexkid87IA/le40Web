import 'dotenv/config';
import { DOMICILIATION_PACKS } from './config/products-config';

const SHOPIFY_STORE = process.env.VITE_SHOPIFY_STORE || 'renaissance-9581.myshopify.com';
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN || '';
const SHOPIFY_API_VERSION = '2024-10';

async function shopifyAdminRequest(endpoint: string, method: string = 'GET', body?: any) {
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

async function createDomiciliationProducts() {
  console.log('\n🏢 ========================================');
  console.log('📦 CRÉATION DES PRODUITS DOMICILIATION');
  console.log('========================================\n');

  console.log(`🏪 Store: ${SHOPIFY_STORE}`);
  console.log(`📅 API Version: ${SHOPIFY_API_VERSION}`);
  console.log(`📊 Produits à créer: ${DOMICILIATION_PACKS.length}\n`);

  const results = {
    created: 0,
    errors: 0,
    products: [] as any[],
  };

  for (const product of DOMICILIATION_PACKS) {
    try {
      console.log(`\n📦 Création: ${product.title}`);
      console.log(`   Type: ${product.product_type}`);
      console.log(`   Variantes: ${product.variants.length}`);

      const shopifyProduct = {
        product: {
          title: product.title,
          body_html: product.body_html,
          vendor: product.vendor,
          product_type: product.product_type,
          tags: product.tags.join(', '),
          options: [
            {
              name: 'Type d\'abonnement',
              values: product.variants.map(v => v.title)
            }
          ],
          variants: product.variants.map((v, index) => ({
            option1: v.title,
            price: v.price,
            compare_at_price: v.compare_at_price || null,
            sku: v.sku,
            inventory_management: null,
            requires_shipping: false,
            position: index + 1,
          })),
          images: product.images?.map(img => ({ src: img.src })) || [],
          metafields: [
            {
              namespace: 'custom',
              key: 'calendar_sync_required',
              value: 'false',
              type: 'boolean',
            },
            {
              namespace: 'custom',
              key: 'resource_type',
              value: product.metafields.resource_type,
              type: 'single_line_text_field',
            },
            {
              namespace: 'custom',
              key: 'is_subscription',
              value: 'true',
              type: 'boolean',
            },
            {
              namespace: 'custom',
              key: 'billing_type',
              value: product.metafields.billing_type,
              type: 'single_line_text_field',
            },
            {
              namespace: 'custom',
              key: 'cancellable',
              value: 'true',
              type: 'boolean',
            },
            {
              namespace: 'custom',
              key: 'gradient',
              value: product.metafields.gradient,
              type: 'single_line_text_field',
            },
          ],
        },
      };

      if (product.metafields.popular) {
        shopifyProduct.product.metafields.push({
          namespace: 'custom',
          key: 'popular',
          value: 'true',
          type: 'boolean',
        });
      }

      const response = await shopifyAdminRequest('products.json', 'POST', shopifyProduct);

      if (response.product) {
        console.log(`   ✅ Créé avec succès!`);
        console.log(`   🆔 Shopify ID: ${response.product.id}`);
        console.log(`   💰 Prix: ${product.variants.map(v => `${v.price}€`).join(', ')}`);

        results.created++;
        results.products.push({
          id: product.id,
          shopify_id: response.product.id,
          title: product.title,
          plan_type: product.id.replace('domiciliation-', ''),
        });

        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error: any) {
      console.error(`   ❌ Erreur: ${error.message}`);
      results.errors++;
    }
  }

  console.log('\n\n📊 ========================================');
  console.log('RÉSUMÉ DE LA CRÉATION');
  console.log('========================================\n');
  console.log(`✅ Produits créés: ${results.created}/${DOMICILIATION_PACKS.length}`);
  console.log(`❌ Erreurs: ${results.errors}`);

  if (results.created > 0) {
    console.log('\n🎉 Produits domiciliation créés:\n');
    results.products.forEach(p => {
      console.log(`   • ${p.title}`);
      console.log(`     ID Shopify: ${p.shopify_id}`);
      console.log(`     Plan: ${p.plan_type}\n`);
    });

    console.log('\n📝 PROCHAINES ÉTAPES:\n');
    console.log('1. ✅ Vérifier les produits dans Shopify Admin');
    console.log('   👉 https://renaissance-9581.myshopify.com/admin/products\n');

    console.log('2. 📦 Installer Shopify Subscriptions App');
    console.log('   👉 https://apps.shopify.com/subscriptions\n');

    console.log('3. ⚙️  Configurer les plans d\'abonnement');
    console.log('   - Créer selling plan group pour domiciliation');
    console.log('   - Attacher les 3 produits au groupe');
    console.log('   - Configurer billing: mensuel et annuel\n');

    console.log('4. 🔔 Configurer les webhooks d\'abonnement');
    console.log('   - subscription_contracts/create');
    console.log('   - subscription_billing_attempts/success');
    console.log('   - subscription_billing_attempts/failure');
    console.log('   - subscription_contracts/cancel\n');

    console.log('5. 🧪 Tester un abonnement test\n');
  }

  if (results.errors > 0) {
    console.log('\n⚠️  ATTENTION: Certains produits n\'ont pas pu être créés.');
    console.log('Vérifiez les erreurs ci-dessus et réessayez si nécessaire.\n');
  }

  console.log('========================================\n');
}

createDomiciliationProducts()
  .then(() => {
    console.log('✅ Script terminé avec succès!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Erreur fatale:', error);
    process.exit(1);
  });
