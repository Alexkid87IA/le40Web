/**
 * Shopify Variant Mappings
 * Centralized mapping of product names to Shopify variant IDs
 *
 * IMPORTANT: These IDs must match your Shopify store configuration
 * Update these when products/variants are added or modified in Shopify
 */

// ============================================================
// TYPES
// ============================================================

export interface VariantMapping {
  [duration: string]: string;
}

export interface ProductMapping {
  [productName: string]: VariantMapping;
}

// ============================================================
// SALLES DE RÉUNION
// ============================================================

export const SALLES_VARIANTS: ProductMapping = {
  'Salle Focus - 2-4 personnes': {
    '1 heure': 'gid://shopify/ProductVariant/52464320381267',
    'Heure': 'gid://shopify/ProductVariant/52464320381267',
    'Demi-journée (4h)': 'gid://shopify/ProductVariant/52464320414035',
    'Demi-journée': 'gid://shopify/ProductVariant/52464320414035',
    'Journée complète (8h)': 'gid://shopify/ProductVariant/52464320446803',
    'Journée': 'gid://shopify/ProductVariant/52464320446803',
  },
  'Salle Créative - 6-8 personnes': {
    '1 heure': 'gid://shopify/ProductVariant/52464320610643',
    'Heure': 'gid://shopify/ProductVariant/52464320610643',
    'Demi-journée (4h)': 'gid://shopify/ProductVariant/52464320643411',
    'Demi-journée': 'gid://shopify/ProductVariant/52464320643411',
    'Journée complète (8h)': 'gid://shopify/ProductVariant/52464320676179',
    'Journée': 'gid://shopify/ProductVariant/52464320676179',
  },
  "Salle de Conférence - Jusqu'à 80 personnes": {
    '1 heure': 'gid://shopify/ProductVariant/52464320905555',
    'Heure': 'gid://shopify/ProductVariant/52464320905555',
    'Demi-journée (4h)': 'gid://shopify/ProductVariant/52464320938323',
    'Demi-journée': 'gid://shopify/ProductVariant/52464320938323',
    'Journée complète (8h)': 'gid://shopify/ProductVariant/52464320971091',
    'Journée': 'gid://shopify/ProductVariant/52464320971091',
  },
};

// ============================================================
// ESPACES ÉVÉNEMENTIELS
// ============================================================

export const ESPACES_VARIANTS: ProductMapping = {
  'Terrasse Panoramique - 300 m²': {
    '2 heures': 'gid://shopify/ProductVariant/52464321298771',
    '4 heures': 'gid://shopify/ProductVariant/52464321331539',
    'Soirée complète (6h)': 'gid://shopify/ProductVariant/52464321364307',
    'Soirée complète': 'gid://shopify/ProductVariant/52464321364307',
    'Soirée': 'gid://shopify/ProductVariant/52464321364307',
  },
  'Lounge & Café - 60 m²': {
    '1 heure': 'gid://shopify/ProductVariant/52464321495379',
    'Heure': 'gid://shopify/ProductVariant/52464321495379',
    'Demi-journée (4h)': 'gid://shopify/ProductVariant/52464321528147',
    'Demi-journée': 'gid://shopify/ProductVariant/52464321528147',
    'Soirée (6h)': 'gid://shopify/ProductVariant/52464321560915',
    'Soirée': 'gid://shopify/ProductVariant/52464321560915',
  },
};

// ============================================================
// STUDIOS CRÉATIFS
// ============================================================

export const STUDIOS_VARIANTS: ProductMapping = {
  'Studio Face-Cam Solo - YouTube/Formation/Vlog': {
    '1 heure': 'gid://shopify/ProductVariant/52464321626451',
    'Heure': 'gid://shopify/ProductVariant/52464321626451',
    '3 heures (Recommandé)': 'gid://shopify/ProductVariant/52464321659219',
    '3 heures': 'gid://shopify/ProductVariant/52464321659219',
    'Demi-journée (4h)': 'gid://shopify/ProductVariant/52464321691987',
    'Demi-journée': 'gid://shopify/ProductVariant/52464321691987',
  },
  'Studio Podcast Audio - 2-4 voix': {
    '1 heure': 'gid://shopify/ProductVariant/52464321986899',
    'Heure': 'gid://shopify/ProductVariant/52464321986899',
    '2 heures (Recommandé)': 'gid://shopify/ProductVariant/52464322019667',
    '2 heures': 'gid://shopify/ProductVariant/52464322019667',
    '4 heures': 'gid://shopify/ProductVariant/52464322052435',
  },
  'Studio Live Twitch/YouTube - Multi-plateformes': {
    '1 heure': 'gid://shopify/ProductVariant/52464322249043',
    'Heure': 'gid://shopify/ProductVariant/52464322249043',
    '2 heures': 'gid://shopify/ProductVariant/52464322281811',
    '4 heures': 'gid://shopify/ProductVariant/52464322314579',
  },
  'Studio Émission/Talk-Show - Grand plateau 50m²': {
    '1 heure': 'gid://shopify/ProductVariant/52464322445651',
    'Heure': 'gid://shopify/ProductVariant/52464322445651',
    '3 heures (Recommandé)': 'gid://shopify/ProductVariant/52464322478419',
    '3 heures': 'gid://shopify/ProductVariant/52464322478419',
    'Demi-journée (4h)': 'gid://shopify/ProductVariant/52464322511187',
    'Demi-journée': 'gid://shopify/ProductVariant/52464322511187',
  },
  'Studio Interview Intimiste - Setup cosy': {
    '1 heure': 'gid://shopify/ProductVariant/52464322642259',
    'Heure': 'gid://shopify/ProductVariant/52464322642259',
    '2 heures (Recommandé)': 'gid://shopify/ProductVariant/52464322675027',
    '2 heures': 'gid://shopify/ProductVariant/52464322675027',
    '4 heures': 'gid://shopify/ProductVariant/52464322707795',
  },
  'Studio Vertical Social - TikTok/Reels/Shorts': {
    '1 heure (Recommandé)': 'gid://shopify/ProductVariant/52464323002707',
    '1 heure': 'gid://shopify/ProductVariant/52464323002707',
    'Heure': 'gid://shopify/ProductVariant/52464323002707',
    '2 heures': 'gid://shopify/ProductVariant/52464323035475',
    '3 heures': 'gid://shopify/ProductVariant/52464323068243',
  },
};

// ============================================================
// DOMICILIATION
// ============================================================

export const DOMICILIATION_VARIANTS: ProductMapping = {
  'STARTER': {
    'monthly': 'gid://shopify/ProductVariant/52464442310995',
    'month': 'gid://shopify/ProductVariant/52464442310995',
    'Abonnement Mensuel': 'gid://shopify/ProductVariant/52464442310995',
    'annual': 'gid://shopify/ProductVariant/52464442343763',
    'year': 'gid://shopify/ProductVariant/52464442343763',
    'Abonnement Annuel': 'gid://shopify/ProductVariant/52464442343763',
  },
  'BUSINESS': {
    'monthly': 'gid://shopify/ProductVariant/52464442376531',
    'month': 'gid://shopify/ProductVariant/52464442376531',
    'Abonnement Mensuel': 'gid://shopify/ProductVariant/52464442376531',
    'annual': 'gid://shopify/ProductVariant/52464442409299',
    'year': 'gid://shopify/ProductVariant/52464442409299',
    'Abonnement Annuel': 'gid://shopify/ProductVariant/52464442409299',
  },
  'SCALE-UP': {
    'monthly': 'gid://shopify/ProductVariant/52464442442067',
    'month': 'gid://shopify/ProductVariant/52464442442067',
    'Abonnement Mensuel': 'gid://shopify/ProductVariant/52464442442067',
    'annual': 'gid://shopify/ProductVariant/52464442474835',
    'year': 'gid://shopify/ProductVariant/52464442474835',
    'Abonnement Annuel': 'gid://shopify/ProductVariant/52464442474835',
  },
};

// ============================================================
// ÉQUIPEMENTS
// ============================================================

export const EQUIPEMENTS_VARIANTS: ProductMapping = {
  "Téléprompter - Écran 15\" avec iPad": {
    '1 heure': 'gid://shopify/ProductVariant/52464323363155',
    '4 heures': 'gid://shopify/ProductVariant/52464323395923',
    'Journée': 'gid://shopify/ProductVariant/52464323428691',
  },
  'Caméra Extra - Sony FX3 + Opérateur': {
    '1 heure': 'gid://shopify/ProductVariant/52464323461459',
    '4 heures': 'gid://shopify/ProductVariant/52464323494227',
    'Journée': 'gid://shopify/ProductVariant/52464323526995',
  },
  'Live-Switch ATEM - Multi-streaming': {
    '1 heure': 'gid://shopify/ProductVariant/52464323559763',
    '4 heures': 'gid://shopify/ProductVariant/52464323592531',
    'Journée': 'gid://shopify/ProductVariant/52464323625299',
  },
};

// ============================================================
// COMBINED MAPPINGS
// ============================================================

export const ALL_VARIANTS: ProductMapping = {
  ...SALLES_VARIANTS,
  ...ESPACES_VARIANTS,
  ...STUDIOS_VARIANTS,
  ...DOMICILIATION_VARIANTS,
  ...EQUIPEMENTS_VARIANTS,
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Find a variant ID by product name and duration
 * Returns null if not found
 */
export function findVariantId(productName: string, duration: string): string | null {
  // Exact match first
  const product = ALL_VARIANTS[productName];
  if (product && product[duration]) {
    return product[duration];
  }

  // Fuzzy match on product name
  const matchingProduct = Object.entries(ALL_VARIANTS).find(([name]) =>
    productName.toLowerCase().includes(name.toLowerCase()) ||
    name.toLowerCase().includes(productName.toLowerCase())
  );

  if (matchingProduct) {
    const [, variants] = matchingProduct;
    // Try exact duration match
    if (variants[duration]) {
      return variants[duration];
    }
    // Try normalized duration match
    const normalizedDuration = normalizeDuration(duration);
    if (variants[normalizedDuration]) {
      return variants[normalizedDuration];
    }
  }

  return null;
}

/**
 * Normalize duration strings for better matching
 */
function normalizeDuration(duration: string): string {
  const normalized = duration.toLowerCase().trim();

  if (normalized.includes('heure') && normalized.includes('1')) return '1 heure';
  if (normalized.includes('heure') && normalized.includes('2')) return '2 heures';
  if (normalized.includes('heure') && normalized.includes('3')) return '3 heures';
  if (normalized.includes('heure') && normalized.includes('4')) return '4 heures';
  if (normalized.includes('demi')) return 'Demi-journée';
  if (normalized.includes('journée') || normalized.includes('jour')) return 'Journée';
  if (normalized.includes('soirée') || normalized.includes('soir')) return 'Soirée';
  if (normalized.includes('hour')) return 'Heure';
  if (normalized.includes('half')) return 'Demi-journée';
  if (normalized.includes('day') || normalized.includes('full')) return 'Journée';

  return duration;
}

/**
 * Find domiciliation variant by plan name and billing period
 */
export function findDomiciliationVariant(planName: string, billingPeriod: 'monthly' | 'annual'): string | null {
  const normalizedPlan = planName.toUpperCase();

  for (const [plan, variants] of Object.entries(DOMICILIATION_VARIANTS)) {
    if (normalizedPlan.includes(plan)) {
      return variants[billingPeriod] || null;
    }
  }

  return null;
}

/**
 * Find studio variant by studio name and duration
 */
export function findStudioVariant(studioName: string, duration: string): string | null {
  for (const [name, variants] of Object.entries(STUDIOS_VARIANTS)) {
    if (studioName.toLowerCase().includes(name.split(' - ')[0].toLowerCase())) {
      return variants[duration] || variants['Heure'] || Object.values(variants)[0] || null;
    }
  }
  return null;
}

/**
 * Find salle variant by room name and duration
 */
export function findSalleVariant(roomName: string, duration: string): string | null {
  for (const [name, variants] of Object.entries(SALLES_VARIANTS)) {
    if (roomName.toLowerCase().includes(name.split(' - ')[0].toLowerCase())) {
      return variants[duration] || variants['Heure'] || Object.values(variants)[0] || null;
    }
  }
  return null;
}
