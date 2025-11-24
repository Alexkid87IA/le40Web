import 'dotenv/config';

const SHOPIFY_STORE = process.env.VITE_SHOPIFY_STORE || 'renaissance-9581.myshopify.com';
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN || '';
const SHOPIFY_API_VERSION = '2024-10';

interface MetafieldDefinition {
  name: string;
  namespace: string;
  key: string;
  type: string;
  description: string;
  ownerType: 'PRODUCT' | 'PRODUCTVARIANT';
}

const METAFIELD_DEFINITIONS: MetafieldDefinition[] = [
  {
    name: 'Calendar Sync Required',
    namespace: 'custom',
    key: 'calendar_sync_required',
    type: 'boolean',
    description: 'Indique si ce produit nécessite une synchronisation avec le calendrier de réservation',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Resource Name',
    namespace: 'custom',
    key: 'resource_name',
    type: 'single_line_text_field',
    description: 'Nom de la ressource (ex: Salle Alpha, Studio Face-Cam)',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Resource Type',
    namespace: 'custom',
    key: 'resource_type',
    type: 'single_line_text_field',
    description: 'Type de ressource: meeting_room, studio, workspace, service',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Capacity',
    namespace: 'custom',
    key: 'capacity',
    type: 'single_line_text_field',
    description: 'Capacité de la ressource (ex: 2-4 personnes, 80, 300m²)',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Gradient',
    namespace: 'custom',
    key: 'gradient',
    type: 'single_line_text_field',
    description: 'Classes Tailwind CSS du gradient pour l\'UI (ex: from-cyan-600 to-teal-600)',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Recommended Duration',
    namespace: 'custom',
    key: 'recommended_duration',
    type: 'single_line_text_field',
    description: 'Durée recommandée pour la réservation (ex: 3h, 2h)',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Launch Offer',
    namespace: 'custom',
    key: 'launch_offer',
    type: 'boolean',
    description: 'Indique si le produit est en offre de lancement',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Savings',
    namespace: 'custom',
    key: 'savings',
    type: 'number_integer',
    description: 'Pourcentage d\'économie pour l\'offre de lancement (ex: 40 pour -40%)',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Duration Hours',
    namespace: 'custom',
    key: 'duration_hours',
    type: 'number_integer',
    description: 'Durée en heures de cette variante de réservation',
    ownerType: 'PRODUCTVARIANT',
  },
];

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

async function getExistingMetafieldDefinitions(ownerType: 'PRODUCT' | 'PRODUCTVARIANT') {
  const query = `
    query GetMetafieldDefinitions($ownerType: MetafieldOwnerType!) {
      metafieldDefinitions(first: 50, ownerType: $ownerType) {
        edges {
          node {
            id
            name
            namespace
            key
            type {
              name
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyGraphQL(query, { ownerType });
    return data.metafieldDefinitions.edges.map((edge: any) => edge.node);
  } catch (error) {
    console.error(`Error fetching ${ownerType} metafield definitions:`, error);
    return [];
  }
}

async function createMetafieldDefinition(definition: MetafieldDefinition) {
  console.log(`\n🔨 Creating: ${definition.name}`);
  console.log(`   Namespace: ${definition.namespace}.${definition.key}`);
  console.log(`   Type: ${definition.type}`);
  console.log(`   Owner: ${definition.ownerType}`);

  const mutation = `
    mutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
      metafieldDefinitionCreate(definition: $definition) {
        createdDefinition {
          id
          name
          namespace
          key
          type {
            name
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const input = {
    definition: {
      name: definition.name,
      namespace: definition.namespace,
      key: definition.key,
      type: definition.type,
      description: definition.description,
      ownerType: definition.ownerType,
    },
  };

  try {
    const data = await shopifyGraphQL(mutation, input);

    if (data.metafieldDefinitionCreate.userErrors.length > 0) {
      const errors = data.metafieldDefinitionCreate.userErrors;

      const alreadyExists = errors.some((err: any) =>
        err.message.includes('already exists') ||
        err.message.includes('taken')
      );

      if (alreadyExists) {
        console.log(`   ⚠️  Already exists, skipping`);
        return { success: true, skipped: true };
      } else {
        console.error(`   ❌ Errors:`, errors);
        return { success: false, errors };
      }
    }

    const created = data.metafieldDefinitionCreate.createdDefinition;
    console.log(`   ✅ Created: ${created.id}`);
    return { success: true, definition: created };
  } catch (error) {
    console.error(`   ❌ Error:`, error);
    return { success: false, error };
  }
}

async function createAllMetafieldDefinitions() {
  console.log('\n🚀 Starting Metafield Definitions Creation...\n');
  console.log(`📦 Definitions to create: ${METAFIELD_DEFINITIONS.length}`);
  console.log('═'.repeat(60));

  const results = {
    product: { success: 0, skipped: 0, errors: 0 },
    variant: { success: 0, skipped: 0, errors: 0 },
  };

  console.log('\n📋 Checking existing definitions...');
  const existingProductDefs = await getExistingMetafieldDefinitions('PRODUCT');
  const existingVariantDefs = await getExistingMetafieldDefinitions('PRODUCTVARIANT');

  console.log(`   Found ${existingProductDefs.length} existing PRODUCT definitions`);
  console.log(`   Found ${existingVariantDefs.length} existing PRODUCT_VARIANT definitions`);

  console.log('\n🔨 Creating definitions...');

  for (const definition of METAFIELD_DEFINITIONS) {
    const existingDefs = definition.ownerType === 'PRODUCT' ? existingProductDefs : existingVariantDefs;
    const exists = existingDefs.some(
      (def: any) => def.namespace === definition.namespace && def.key === definition.key
    );

    if (exists) {
      console.log(`\n✓ ${definition.name} - Already exists`);
      const category = definition.ownerType === 'PRODUCT' ? 'product' : 'variant';
      results[category].skipped++;
      continue;
    }

    const result = await createMetafieldDefinition(definition);

    const category = definition.ownerType === 'PRODUCT' ? 'product' : 'variant';
    if (result.success) {
      if (result.skipped) {
        results[category].skipped++;
      } else {
        results[category].success++;
      }
    } else {
      results[category].errors++;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log('\n\n📊 SUMMARY');
  console.log('═'.repeat(60));
  console.log('\nProduct Metafields:');
  console.log(`  ✅ Created: ${results.product.success}`);
  console.log(`  ⚠️  Skipped: ${results.product.skipped}`);
  console.log(`  ❌ Errors: ${results.product.errors}`);

  console.log('\nProduct Variant Metafields:');
  console.log(`  ✅ Created: ${results.variant.success}`);
  console.log(`  ⚠️  Skipped: ${results.variant.skipped}`);
  console.log(`  ❌ Errors: ${results.variant.errors}`);

  const totalSuccess = results.product.success + results.variant.success;
  const totalSkipped = results.product.skipped + results.variant.skipped;
  const totalErrors = results.product.errors + results.variant.errors;

  console.log('\nTotal:');
  console.log(`  ✅ Created: ${totalSuccess}`);
  console.log(`  ⚠️  Skipped: ${totalSkipped}`);
  console.log(`  ❌ Errors: ${totalErrors}`);

  console.log('\n📝 Next Steps:\n');
  console.log('  1. Verify definitions in Shopify Admin:');
  console.log('     Settings → Custom data → Products');
  console.log('\n  2. Re-create products with metafield values:');
  console.log('     npm run shopify:create-products');
  console.log('\n  3. Generate calendar slots:');
  console.log('     npm run shopify:generate-calendar');

  return results;
}

createAllMetafieldDefinitions()
  .then(() => {
    console.log('\n✨ Metafield definitions creation complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Fatal error:', error);
    process.exit(1);
  });

export { createAllMetafieldDefinitions, createMetafieldDefinition };
