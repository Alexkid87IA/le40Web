import 'dotenv/config';
import { EVENTS } from './config/products-config';

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

async function createEventsProducts() {
  console.log('\n🎉 ========================================');
  console.log('🎫 CRÉATION DES ÉVÉNEMENTS SUR SHOPIFY');
  console.log('========================================\n');

  console.log(`🏪 Store: ${SHOPIFY_STORE}`);
  console.log(`📅 API Version: ${SHOPIFY_API_VERSION}`);
  console.log(`🎭 Événements à créer: ${EVENTS.length}\n`);

  const results = {
    created: 0,
    errors: 0,
    events: [] as any[],
  };

  for (const event of EVENTS) {
    try {
      console.log(`\n🎫 Création: ${event.title}`);
      console.log(`   Catégorie: ${event.metafields.category}`);
      console.log(`   Date: ${event.metafields.event_date}`);
      console.log(`   Places: ${event.metafields.max_attendees}`);
      console.log(`   Variantes: ${event.variants.length} (Membre/Non-Membre)`);

      const shopifyProduct = {
        product: {
          title: event.title,
          body_html: event.body_html,
          vendor: event.vendor,
          product_type: event.product_type,
          tags: event.tags.join(', '),
          options: [
            {
              name: 'Type de ticket',
              values: event.variants.map(v => v.title)
            }
          ],
          variants: event.variants.map((v, index) => ({
            option1: v.title,
            price: v.price,
            sku: v.sku,
            inventory_quantity: v.inventory_quantity,
            inventory_management: 'shopify',
            requires_shipping: false,
            position: index + 1,
          })),
          images: event.images?.map(img => ({ src: img.src })) || [],
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
              value: event.metafields.resource_type,
              type: 'single_line_text_field',
            },
            {
              namespace: 'custom',
              key: 'event_date',
              value: event.metafields.event_date,
              type: 'single_line_text_field',
            },
            {
              namespace: 'custom',
              key: 'event_duration',
              value: event.metafields.event_duration.toString(),
              type: 'number_integer',
            },
            {
              namespace: 'custom',
              key: 'max_attendees',
              value: event.metafields.max_attendees.toString(),
              type: 'number_integer',
            },
            {
              namespace: 'custom',
              key: 'category',
              value: event.metafields.category,
              type: 'single_line_text_field',
            },
            {
              namespace: 'custom',
              key: 'difficulty_level',
              value: event.metafields.difficulty_level,
              type: 'single_line_text_field',
            },
          ],
        },
      };

      const response = await shopifyAdminRequest('products.json', 'POST', shopifyProduct);

      if (response.product) {
        console.log(`   ✅ Créé avec succès!`);
        console.log(`   🆔 Shopify ID: ${response.product.id}`);
        console.log(`   💰 Prix Membre: ${event.variants[0].price}€`);
        console.log(`   💰 Prix Non-Membre: ${event.variants[1].price}€`);
        console.log(`   🎟️  Inventory: ${event.variants[0].inventory_quantity + event.variants[1].inventory_quantity} tickets`);

        results.created++;
        results.events.push({
          id: event.id,
          shopify_id: response.product.id,
          title: event.title,
          category: event.metafields.category,
          date: event.metafields.event_date,
          max_attendees: event.metafields.max_attendees,
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
  console.log(`✅ Événements créés: ${results.created}/${EVENTS.length}`);
  console.log(`❌ Erreurs: ${results.errors}`);

  if (results.created > 0) {
    console.log('\n🎉 Événements créés sur Shopify:\n');

    const byCategory = results.events.reduce((acc, event) => {
      if (!acc[event.category]) acc[event.category] = [];
      acc[event.category].push(event);
      return acc;
    }, {} as Record<string, any[]>);

    Object.entries(byCategory).forEach(([category, events]) => {
      console.log(`\n📂 ${category}:`);
      events.forEach(event => {
        console.log(`   • ${event.title}`);
        console.log(`     ID: ${event.shopify_id}`);
        console.log(`     Date: ${new Date(event.date).toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}`);
        console.log(`     Places: ${event.max_attendees}`);
        console.log('');
      });
    });

    console.log('\n📝 PROCHAINES ÉTAPES:\n');
    console.log('1. ✅ Vérifier les événements dans Shopify Admin');
    console.log('   👉 https://renaissance-9581.myshopify.com/admin/products');
    console.log('   👉 Filtrer par type "Événement"\n');

    console.log('2. 📦 Créer une collection "Événements"');
    console.log('   - Automatiser avec tag "event"');
    console.log('   - Afficher sur le storefront\n');

    console.log('3. 📧 Configurer emails de confirmation');
    console.log('   - Order confirmation avec détails événement');
    console.log('   - Rappel 7 jours avant l\'événement');
    console.log('   - Rappel 1 jour avant l\'événement\n');

    console.log('4. 📊 Analytics à suivre:');
    console.log('   - Taux de remplissage par événement');
    console.log('   - Ratio Membre/Non-Membre');
    console.log('   - Revenus par catégorie');
    console.log('   - Événements les plus populaires\n');

    console.log('5. 🎫 Intégrer sur le site:');
    console.log('   - Utiliser useShopifyProducts() pour charger');
    console.log('   - Filtrer par product_type = "Événement"');
    console.log('   - Afficher places restantes en temps réel\n');

    const totalTickets = results.events.reduce((sum, e) => sum + e.max_attendees, 0);
    const totalRevenuePotential = results.events.reduce((sum, event) => {
      const eventData = EVENTS.find(e => e.id === event.id);
      if (!eventData) return sum;
      const avgPrice = (parseFloat(eventData.variants[0].price) + parseFloat(eventData.variants[1].price)) / 2;
      return sum + (avgPrice * event.max_attendees);
    }, 0);

    console.log('📈 POTENTIEL REVENUE:\n');
    console.log(`   📊 Total places disponibles: ${totalTickets} tickets`);
    console.log(`   💰 Revenu potentiel (prix moyen): ${totalRevenuePotential.toFixed(2)}€`);
    console.log(`   🎯 Objectif remplissage: 80% = ${(totalRevenuePotential * 0.8).toFixed(2)}€\n`);
  }

  if (results.errors > 0) {
    console.log('\n⚠️  ATTENTION: Certains événements n\'ont pas pu être créés.');
    console.log('Vérifiez les erreurs ci-dessus et réessayez si nécessaire.\n');
  }

  console.log('========================================\n');
}

createEventsProducts()
  .then(() => {
    console.log('✅ Script terminé avec succès!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Erreur fatale:', error);
    process.exit(1);
  });
