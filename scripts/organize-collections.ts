/**
 * Script pour organiser les collections Shopify
 * - Studios + Domiciliation + Salles + Bureaux + Events
 */

import 'dotenv/config';

const SHOPIFY_STORE = process.env.VITE_SHOPIFY_STORE_DOMAIN || '';
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN || '';
const SHOPIFY_API_VERSION = '2024-01';

// ============================================================
// TOUTES LES COLLECTIONS À CRÉER
// ============================================================

const ALL_COLLECTIONS = [
  // ========== STUDIOS ==========
  {
    title: 'Studios - Tous les Services',
    handle: 'studios-services',
    description: 'Tous les services disponibles pour les studios',
    rules: [{ column: 'tag', relation: 'equals', condition: 'upsell' }],
  },
  {
    title: 'Studios - Post-Production',
    handle: 'studios-post-production',
    description: 'Montage, sous-titrage, clipping, miniatures...',
    rules: [{ column: 'tag', relation: 'equals', condition: 'post-production' }],
  },
  {
    title: 'Studios - Équipement',
    handle: 'studios-equipement',
    description: 'Téléprompter, caméras, micros, ATEM...',
    rules: [{ column: 'tag', relation: 'equals', condition: 'equipement' }],
  },
  {
    title: 'Studios - Services Expert',
    handle: 'studios-expert',
    description: 'Stratégie, coaching, SEO, ads...',
    rules: [{ column: 'tag', relation: 'equals', condition: 'expert' }],
  },
  {
    title: 'Studios - Beauty & Maquillage',
    handle: 'studios-beauty',
    description: 'Maquillage pro, coiffure, artistique...',
    rules: [{ column: 'tag', relation: 'equals', condition: 'beauty' }],
  },
  {
    title: 'Studios - Transport',
    handle: 'studios-transport',
    description: 'Navettes gare, aéroport, chauffeur...',
    rules: [{ column: 'tag', relation: 'equals', condition: 'transport' }],
  },
  {
    title: 'Studios - Catering',
    handle: 'studios-catering',
    description: 'Coffee break, déjeuner, cocktail...',
    rules: [{ column: 'tag', relation: 'equals', condition: 'catering' }],
  },
  {
    title: 'Studios - Technique',
    handle: 'studios-technique',
    description: 'Régie, ingé son, photographe, drone...',
    rules: [{ column: 'tag', relation: 'equals', condition: 'technique' }],
  },
  {
    title: 'Studios - Décoration',
    handle: 'studios-decoration',
    description: 'Setup personnalisé, scénographie...',
    rules: [{ column: 'tag', relation: 'equals', condition: 'decoration' }],
  },
  {
    title: 'Studios - Wellness',
    handle: 'studios-wellness',
    description: 'Massage, yoga, coach sportif...',
    rules: [{ column: 'tag', relation: 'equals', condition: 'wellness' }],
  },
  {
    title: 'Studios - Location Matériel',
    handle: 'studios-location-materiel',
    description: 'Gimbal, LED RGB, slider, green screen...',
    rules: [{ column: 'tag', relation: 'equals', condition: 'location' }],
  },
  {
    title: 'Studios - Formules',
    handle: 'studios-formules',
    description: 'Autonome, Assisté, Full Service',
    rules: [{ column: 'tag', relation: 'equals', condition: 'formule' }],
  },
  {
    title: 'Studios - Packs & Bundles',
    handle: 'studios-packs',
    description: 'Packs créateur, entrepreneur, corporate...',
    rules: [{ column: 'tag', relation: 'equals', condition: 'pack' }],
  },
  
  // ========== DOMICILIATION ==========
  {
    title: 'Domiciliation - Toutes les Offres',
    handle: 'domiciliation-offres',
    description: 'Toutes les formules de domiciliation',
    rules: [{ column: 'type', relation: 'equals', condition: 'Domiciliation' }],
  },
  {
    title: 'Domiciliation - Formules',
    handle: 'domiciliation-formules',
    description: 'Essentiel, Business, Premium',
    rules: [{ column: 'tag', relation: 'equals', condition: 'domiciliation-formule' }],
  },
  {
    title: 'Domiciliation - Services Additionnels',
    handle: 'domiciliation-services',
    description: 'Options supplémentaires pour domiciliation',
    rules: [{ column: 'tag', relation: 'equals', condition: 'domiciliation-service' }],
  },
  
  // ========== SALLES DE RÉUNION ==========
  {
    title: 'Salles de Réunion',
    handle: 'salles-reunion',
    description: 'Toutes nos salles de réunion',
    rules: [{ column: 'type', relation: 'equals', condition: 'Salle' }],
  },
  
  // ========== BUREAUX PRIVÉS ==========
  {
    title: 'Bureaux Privés',
    handle: 'bureaux-prives',
    description: 'Location de bureaux privés',
    rules: [{ column: 'type', relation: 'equals', condition: 'Bureau' }],
  },
  
  // ========== ÉVÉNEMENTS ==========
  {
    title: 'Événements & Formations',
    handle: 'evenements-formations',
    description: 'Événements, workshops, formations',
    rules: [{ column: 'type', relation: 'equals', condition: 'Événement' }],
  },
  
  // ========== ABONNEMENTS ==========
  {
    title: 'Abonnements Le 40 Club',
    handle: 'abonnements-club',
    description: 'Abonnements communauté Le 40',
    rules: [{ column: 'type', relation: 'equals', condition: 'Abonnement' }],
  },
  
  // ========== COLLECTIONS MARKETING ==========
  {
    title: 'Les Plus Populaires',
    handle: 'populaires',
    description: 'Nos services les plus demandés',
    rules: [{ column: 'tag', relation: 'equals', condition: 'populaire' }],
  },
  {
    title: 'Recommandés',
    handle: 'recommandes',
    description: 'Nos recommandations',
    rules: [{ column: 'tag', relation: 'equals', condition: 'recommande' }],
  },
  {
    title: 'Offres de Lancement',
    handle: 'offres-lancement',
    description: 'Offres spéciales lancement',
    rules: [{ column: 'tag', relation: 'equals', condition: 'offre-lancement' }],
  },
];

// ============================================================
// FONCTIONS API SHOPIFY
// ============================================================

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

async function getAllCollections(): Promise<any[]> {
  const [smart, custom] = await Promise.all([
    shopifyRequest('smart_collections.json?limit=250'),
    shopifyRequest('custom_collections.json?limit=250'),
  ]);
  
  return [
    ...smart.smart_collections.map((c: any) => ({ ...c, type: 'smart' })),
    ...custom.custom_collections.map((c: any) => ({ ...c, type: 'custom' })),
  ];
}

async function cleanupCollections() {
  console.log('\n🧹 NETTOYAGE DES COLLECTIONS\n');
  
  const collections = await getAllCollections();
  
  const titleCount: { [key: string]: any[] } = {};
  collections.forEach(c => {
    const title = c.title.toLowerCase();
    if (!titleCount[title]) titleCount[title] = [];
    titleCount[title].push(c);
  });
  
  const toDelete: any[] = [];
  
  // Supprimer les doublons
  Object.entries(titleCount).forEach(([title, cols]) => {
    if (cols.length > 1) {
      const sorted = cols.sort((a, b) => (b.products_count || 0) - (a.products_count || 0));
      console.log(`\n📁 "${sorted[0].title}" (${cols.length} doublons)`);
      console.log(`   ✓ Garde: ID ${sorted[0].id} (${sorted[0].products_count || 0} produits)`);
      
      sorted.slice(1).forEach(c => {
        console.log(`   ✗ Supprime: ID ${c.id} (${c.products_count || 0} produits)`);
        toDelete.push(c);
      });
    }
  });
  
  // Supprimer les collections vides "Studios Location"
  collections.forEach(c => {
    if (c.title === 'Studios Location' && (c.products_count || 0) === 0 && !toDelete.includes(c)) {
      console.log(`   ✗ Supprime vide: "${c.title}" ID ${c.id}`);
      toDelete.push(c);
    }
  });
  
  console.log(`\n🗑️  ${toDelete.length} collections à supprimer`);
  
  for (const col of toDelete) {
    try {
      const endpoint = col.type === 'smart' 
        ? `smart_collections/${col.id}.json`
        : `custom_collections/${col.id}.json`;
      await shopifyRequest(endpoint, 'DELETE');
      console.log(`   ✅ Supprimé: ${col.title}`);
    } catch (err) {
      console.log(`   ❌ Erreur: ${col.title}`);
    }
    await new Promise(r => setTimeout(r, 300));
  }
  
  return toDelete.length;
}

async function createAllCollections() {
  console.log('\n📦 CRÉATION DES COLLECTIONS\n');
  
  const existing = await getAllCollections();
  const existingHandles = existing.map(c => c.handle);
  
  let created = 0;
  let skipped = 0;
  
  for (const col of ALL_COLLECTIONS) {
    if (existingHandles.includes(col.handle)) {
      console.log(`   ⏭️  Existe: ${col.title}`);
      skipped++;
      continue;
    }
    
    try {
      await shopifyRequest('smart_collections.json', 'POST', {
        smart_collection: {
          title: col.title,
          handle: col.handle,
          body_html: `<p>${col.description}</p>`,
          published: true,
          disjunctive: false,
          rules: col.rules,
        },
      });
      console.log(`   ✅ Créé: ${col.title}`);
      created++;
    } catch (err) {
      console.log(`   ❌ Erreur: ${col.title} - ${err}`);
    }
    
    await new Promise(r => setTimeout(r, 500));
  }
  
  console.log(`\n   📊 ${created} créées, ${skipped} existantes`);
  return created;
}

async function main() {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('   🏷️  ORGANISATION DES COLLECTIONS SHOPIFY - LE 40');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log('   Collections prévues:');
  console.log('   - 13 pour Studios');
  console.log('   - 3 pour Domiciliation');
  console.log('   - 5 autres (Salles, Bureaux, Events, Abonnements, Marketing)');
  console.log('');

  if (!SHOPIFY_ADMIN_TOKEN || !SHOPIFY_STORE) {
    console.error('❌ Variables .env manquantes');
    process.exit(1);
  }

  const args = process.argv.slice(2);
  
  if (args.includes('--cleanup') || args.includes('--all')) {
    await cleanupCollections();
  }
  
  if (args.includes('--create') || args.includes('--all')) {
    await createAllCollections();
  }
  
  if (args.length === 0) {
    console.log('Usage:');
    console.log('  --cleanup  : Supprime les collections en double/vides');
    console.log('  --create   : Crée toutes les collections');
    console.log('  --all      : Fait les deux');
    console.log('');
    console.log('Exemple: npx tsx scripts/organize-collections.ts --all');
  }
  
  console.log('\n✨ Terminé !\n');
}

main().catch(console.error);