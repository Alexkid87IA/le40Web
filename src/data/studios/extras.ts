/**
 * Extras Data
 * Add-on services for studio bookings
 */

import {
  Package, Scissors, Camera, Sparkles, Car, Coffee,
  Music, Palette, Heart, Smartphone, FileText, Mic, Radio, Zap
} from 'lucide-react';
import type { Extra, ExtraCategory } from './types';

// ============================================================
// CATEGORIES
// ============================================================

export const EXTRAS_CATEGORIES: ExtraCategory[] = [
  { id: 'all', name: 'Tout', icon: Package },
  { id: 'post-production', name: 'Post-Prod', icon: Scissors },
  { id: 'equipement', name: 'Équipement', icon: Camera },
  { id: 'beauty', name: 'Beauty', icon: Sparkles },
  { id: 'transport', name: 'Transport', icon: Car },
  { id: 'catering', name: 'Catering', icon: Coffee },
  { id: 'technique', name: 'Technique', icon: Music },
  { id: 'decoration', name: 'Déco', icon: Palette },
  { id: 'wellness', name: 'Wellness', icon: Heart },
];

// ============================================================
// EXTRAS DATA
// ============================================================

export const EXTRAS: Extra[] = [
  // POST-PRODUCTION
  {
    id: 'montage-standard',
    name: 'Montage Standard',
    category: 'post-production',
    price: 79,
    unit: '/h rush',
    description: 'Montage pro avec transitions et titres',
    icon: Scissors,
    includes: [
      'Dérushage et sélection des meilleures prises',
      'Montage dynamique avec transitions fluides',
      'Ajout de titres et lower thirds',
      'Synchronisation audio',
      'Export HD optimisé pour YouTube'
    ],
  },
  {
    id: 'montage-premium',
    name: 'Montage Premium',
    category: 'post-production',
    price: 120,
    unit: '/h rush',
    description: 'Montage cinématique avec motion design',
    icon: Scissors,
    includes: [
      'Tout le montage standard',
      'Motion design et animations personnalisées',
      'Effets visuels et transitions cinématiques',
      'Color grading basique inclus',
      'Sound design et ambiances sonores',
      'Jusqu\'à 2 révisions incluses'
    ],
  },
  {
    id: 'clipping-shorts',
    name: 'Pack Clipping Shorts',
    category: 'post-production',
    price: 149,
    unit: '/pack',
    description: '5-10 clips optimisés TikTok/Reels',
    icon: Smartphone,
    includes: [
      '5 à 10 clips courts optimisés',
      'Format vertical 9:16',
      'Sous-titres dynamiques',
      'Hooks d\'accroche',
      'Export TikTok, Reels, Shorts'
    ],
  },
  {
    id: 'miniatures',
    name: 'Pack Miniatures (3)',
    category: 'post-production',
    price: 39,
    unit: '/pack',
    description: '3 miniatures YouTube optimisées CTR',
    icon: Camera,
    includes: [
      '3 miniatures haute résolution',
      'Design optimisé pour le CTR',
      'Texte accrocheur intégré',
      'Livraison en PNG et PSD'
    ],
  },
  {
    id: 'sous-titrage',
    name: 'Sous-titrage FR/EN',
    category: 'post-production',
    price: 45,
    unit: '/h vidéo',
    description: 'Sous-titres pro incrustés',
    icon: FileText,
  },
  {
    id: 'mixage-audio',
    name: 'Mixage Audio Pro',
    category: 'post-production',
    price: 55,
    unit: '/h vidéo',
    description: 'Nettoyage et mastering audio',
    icon: Music,
  },
  {
    id: 'etalonnage',
    name: 'Étalonnage Cinéma',
    category: 'post-production',
    price: 149,
    unit: '/vidéo',
    description: 'Color grading professionnel',
    icon: Palette,
  },

  // ÉQUIPEMENT
  {
    id: 'teleprompter',
    name: 'Téléprompter 15"',
    category: 'equipement',
    price: 15,
    unit: '/h',
    description: 'Avec iPad et télécommande',
    icon: FileText,
  },
  {
    id: 'camera-extra',
    name: 'Caméra Extra Sony FX3',
    category: 'equipement',
    price: 25,
    unit: '/h',
    description: 'Angle supplémentaire 4K',
    icon: Camera,
  },
  {
    id: 'atem-live',
    name: 'Live-Switch ATEM',
    category: 'equipement',
    price: 35,
    unit: '/h',
    description: 'Régie multi-caméras live',
    icon: Radio,
  },
  {
    id: 'micro-cravate',
    name: 'Micro Cravate HF',
    category: 'equipement',
    price: 15,
    unit: '/h',
    description: 'Sennheiser sans fil',
    icon: Mic,
  },
  {
    id: 'micro-sm7b',
    name: 'Micro Shure SM7B',
    category: 'equipement',
    price: 25,
    unit: '/h',
    description: 'Le micro podcast par excellence',
    icon: Mic,
  },

  // BEAUTY
  {
    id: 'maquillage-pro',
    name: 'Maquillage Pro',
    category: 'beauty',
    price: 89,
    unit: '/pers',
    description: 'Adapté caméra et éclairage',
    icon: Sparkles,
    includes: [
      'Maquillage HD adapté caméra',
      'Teint mat anti-reflets',
      'Correction cernes et imperfections',
      'Durée: environ 45 min'
    ],
  },
  {
    id: 'maquillage-coiffure',
    name: 'Maquillage + Coiffure',
    category: 'beauty',
    price: 149,
    unit: '/pers',
    description: 'Pack complet maquillage et brushing',
    icon: Sparkles,
    includes: [
      'Maquillage pro complet',
      'Brushing ou coiffage',
      'Retouches pendant le tournage',
      'Produits professionnels haut de gamme'
    ],
  },

  // TRANSPORT
  {
    id: 'navette-gare',
    name: 'Navette Gare',
    category: 'transport',
    price: 20,
    unit: 'A/R',
    description: 'Gare Saint-Charles',
    icon: Car,
  },
  {
    id: 'navette-aeroport',
    name: 'Navette Aéroport',
    category: 'transport',
    price: 60,
    unit: 'A/R',
    description: 'Marseille-Provence',
    icon: Car,
  },

  // CATERING
  {
    id: 'coffee-break',
    name: 'Coffee Break',
    category: 'catering',
    price: 12,
    unit: '/pers',
    description: 'Café, thé, viennoiseries',
    icon: Coffee,
  },
  {
    id: 'dejeuner-traiteur',
    name: 'Déjeuner Traiteur',
    category: 'catering',
    price: 25,
    unit: '/pers',
    description: 'Entrée, plat, dessert, boissons',
    icon: Coffee,
  },

  // TECHNIQUE
  {
    id: 'regie-live',
    name: 'Régie Vidéo Live',
    category: 'technique',
    price: 149,
    unit: '/session',
    description: 'Technicien régie multi-caméras',
    icon: Radio,
  },
  {
    id: 'photographe-bts',
    name: 'Photographe BTS',
    category: 'technique',
    price: 299,
    unit: '/session',
    description: 'Behind-the-scenes + portraits',
    icon: Camera,
    includes: [
      'Photographe pro sur place',
      'Photos behind-the-scenes',
      'Portraits professionnels',
      '30+ photos retouchées livrées',
      'Usage réseaux sociaux inclus'
    ],
  },
  {
    id: 'drone',
    name: 'Drone Intérieur/Extérieur',
    category: 'technique',
    price: 399,
    unit: '/session',
    description: 'Prises de vues aériennes',
    icon: Camera,
    includes: [
      'Pilote certifié',
      'Prises de vues intérieures et/ou extérieures',
      'Plans aériens cinématiques',
      'Montage des rushes drone inclus'
    ],
  },

  // DÉCORATION
  {
    id: 'deco-personnalisee',
    name: 'Décoration Personnalisée',
    category: 'decoration',
    price: 299,
    unit: '/setup',
    description: 'Setup déco selon votre univers',
    icon: Palette,
  },
  {
    id: 'setup-gaming',
    name: 'Setup Gaming RGB',
    category: 'decoration',
    price: 249,
    unit: '/setup',
    description: 'Configuration gaming avec LEDs',
    icon: Zap,
  },

  // WELLNESS
  {
    id: 'massage-express',
    name: 'Massage Express',
    category: 'wellness',
    price: 49,
    unit: '/30min',
    description: 'Relaxation avant tournage',
    icon: Heart,
  },
  {
    id: 'yoga-meditation',
    name: 'Yoga/Méditation',
    category: 'wellness',
    price: 119,
    unit: '/session',
    description: 'Se recentrer avant de passer devant la caméra',
    icon: Heart,
  },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Find extra by ID
 */
export function findExtraById(id: string): Extra | undefined {
  return EXTRAS.find(e => e.id === id);
}

/**
 * Get extras by category
 */
export function getExtrasByCategory(categoryId: string): Extra[] {
  if (categoryId === 'all') return EXTRAS;
  return EXTRAS.filter(e => e.category === categoryId);
}

/**
 * Filter extras by search term
 */
export function searchExtras(query: string): Extra[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return EXTRAS;

  return EXTRAS.filter(extra =>
    extra.name.toLowerCase().includes(normalizedQuery) ||
    extra.description.toLowerCase().includes(normalizedQuery)
  );
}

/**
 * Get category by ID
 */
export function getCategoryById(id: string): ExtraCategory | undefined {
  return EXTRAS_CATEGORIES.find(c => c.id === id);
}

/**
 * Calculate total price of selected extras
 */
export function calculateExtrasTotal(extras: Extra[]): number {
  return extras.reduce((sum, extra) => sum + extra.price, 0);
}

/**
 * Get default includes for extras without specific includes
 */
export function getExtraIncludes(extra: Extra): string[] {
  if (extra.includes && extra.includes.length > 0) {
    return extra.includes;
  }
  return [
    extra.description,
    'Service professionnel',
    'Équipe qualifiée'
  ];
}
