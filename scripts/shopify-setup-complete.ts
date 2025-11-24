import 'dotenv/config';
import { createAllProducts } from './create-shopify-products.js';
import { createAllCollections } from './create-shopify-collections-export.js';
import { generateAllCalendarSlots } from './generate-calendar-slots.js';
import { configureAllWebhooks } from './configure-webhooks.js';
import { createClient } from '@supabase/supabase-js';
import * as readline from 'readline';
import * as fs from 'fs';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyEnvironment() {
  console.log('\n🔍 Verifying environment configuration...\n');

  const checks = {
    shopifyStore: !!process.env.VITE_SHOPIFY_STORE,
    shopifyAdminToken: !!process.env.SHOPIFY_ADMIN_TOKEN,
    supabaseUrl: !!process.env.VITE_SUPABASE_URL,
    supabaseKey: !!process.env.VITE_SUPABASE_ANON_KEY,
  };

  console.log('Environment variables:');
  console.log(`  ✓ VITE_SHOPIFY_STORE: ${checks.shopifyStore ? '✅' : '❌'}`);
  console.log(`  ✓ SHOPIFY_ADMIN_TOKEN: ${checks.shopifyAdminToken ? '✅' : '❌'}`);
  console.log(`  ✓ VITE_SUPABASE_URL: ${checks.supabaseUrl ? '✅' : '❌'}`);
  console.log(`  ✓ VITE_SUPABASE_ANON_KEY: ${checks.supabaseKey ? '✅' : '❌'}`);

  const allValid = Object.values(checks).every((v) => v);

  if (!allValid) {
    throw new Error('Missing required environment variables. Please check your .env file.');
  }

  console.log('\n✅ All environment variables are set\n');
  return true;
}

async function verifySupabaseTables() {
  console.log('🔍 Verifying Supabase tables...\n');

  const requiredTables = ['shopify_products', 'shopify_inventory_calendar'];

  for (const table of requiredTables) {
    try {
      const { error } = await supabase.from(table).select('*').limit(1);

      if (error) {
        console.error(`  ❌ Table '${table}' check failed:`, error.message);
        throw new Error(`Table '${table}' does not exist or is not accessible`);
      }

      console.log(`  ✅ Table '${table}' exists`);
    } catch (error) {
      console.error(`  ❌ Error checking table '${table}':`, error);
      throw error;
    }
  }

  console.log('\n✅ All required Supabase tables exist\n');
  return true;
}

async function promptUser(question: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${question} (y/n): `, (answer: string) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

async function main() {
  console.log('\n');
  console.log('═'.repeat(60));
  console.log('🚀  SHOPIFY COMPLETE SETUP');
  console.log('═'.repeat(60));
  console.log('\nThis script will:');
  console.log('  1. Create all products in Shopify (Salles + Studios + Services)');
  console.log('  2. Create smart collections and organize products');
  console.log('  3. Generate calendar slots for 3 months');
  console.log('  4. Configure webhooks');
  console.log('\n⚠️  Warning: This may create duplicate products if run multiple times');
  console.log('═'.repeat(60));

  try {
    await verifyEnvironment();
    await verifySupabaseTables();

    const shouldContinue = await promptUser('\n✅ Ready to start. Continue?');

    if (!shouldContinue) {
      console.log('\n❌ Setup cancelled by user');
      process.exit(0);
    }

    const startTime = Date.now();
    const results: any = {
      products: null,
      collections: null,
      calendar: null,
      webhooks: null,
      duration: 0,
    };

    console.log('\n\n' + '═'.repeat(60));
    console.log('📦 STEP 1/4: Creating Shopify Products');
    console.log('═'.repeat(60));

    results.products = await createAllProducts();

    console.log('\n\n' + '═'.repeat(60));
    console.log('📂 STEP 2/4: Creating Collections');
    console.log('═'.repeat(60));

    results.collections = await createAllCollections();

    console.log('\n\n' + '═'.repeat(60));
    console.log('📅 STEP 3/4: Generating Calendar Slots');
    console.log('═'.repeat(60));

    results.calendar = await generateAllCalendarSlots();

    console.log('\n\n' + '═'.repeat(60));
    console.log('🔗 STEP 4/4: Configuring Webhooks');
    console.log('═'.repeat(60));

    results.webhooks = await configureAllWebhooks();

    const endTime = Date.now();
    results.duration = Math.round((endTime - startTime) / 1000);

    console.log('\n\n' + '═'.repeat(60));
    console.log('✨ SETUP COMPLETE!');
    console.log('═'.repeat(60));
    console.log('\n📊 Final Summary:\n');
    console.log(`Products:`);
    console.log(`  ✅ Created: ${results.products.success.length}`);
    console.log(`  ❌ Errors: ${results.products.errors.length}`);
    console.log('');
    console.log(`Collections:`);
    console.log(`  ✅ Created: ${results.collections.success.length}`);
    console.log(`  ❌ Errors: ${results.collections.errors.length}`);
    console.log('');
    console.log(`Calendar:`);
    console.log(`  ✅ Slots created: ${results.calendar.totalSuccess}`);
    console.log(`  📦 Resources: ${results.calendar.resources.length}`);
    console.log('');
    console.log(`Webhooks:`);
    console.log(`  ✅ Configured: ${results.webhooks.success.length}`);
    console.log(`  ❌ Errors: ${results.webhooks.errors.length}`);
    console.log('');
    console.log(`⏱️  Total duration: ${results.duration}s`);

    console.log('\n📝 Next Steps:\n');
    console.log('  1. Produits: https://renaissance-9581.myshopify.com/admin/products');
    console.log('  2. Collections: https://renaissance-9581.myshopify.com/admin/collections');
    console.log('  3. Webhooks: https://renaissance-9581.myshopify.com/admin/settings/notifications');
    console.log('  4. Testez votre site: http://localhost:5173/boutique');
    console.log('\n');

    const reportPath = `shopify-setup-report-${Date.now()}.json`;
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`📄 Detailed report saved to: ${reportPath}\n`);

    process.exit(0);
  } catch (error) {
    console.error('\n\n💥 FATAL ERROR\n');
    console.error(error);
    console.log('\n❌ Setup failed. Please check the error above and try again.\n');
    process.exit(1);
  }
}

main();

export { main };
