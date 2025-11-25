/**
 * Script COMPLET - Audit et création de TOUS les upsells Studios
 * 
 * 77 services individuels + 12 packs = 89 options
 * 
 * Usage: npx ts-node scripts/create-all-studio-upsells.ts
 * 
 * Options:
 *   --audit    : Liste ce qui existe vs ce qui manque (sans créer)
 *   --create   : Crée les produits manquants
 *   --all      : Crée TOUS les produits (écrase les existants)
 */

import 'dotenv/config';

const SHOPIFY_STORE = process.env.VITE_SHOPIFY_STORE_DOMAIN || '';
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN || '';
const SHOPIFY_API_VERSION = '2024-01';

// ============================================================
// CONFIGURATION COMPLÈTE DES 77 UPSELLS + 12 PACKS
// ============================================================

interface UpsellProduct {
  id: string;
  title: string;
  category: string;
  price: string;
  unit: string;
  description: string;
  popular?: boolean;
  recommande?: boolean;
  variants?: { title: string; price: string; sku: string }[];
  tags: string[];
}

// ============================================================
// 1. POST-PRODUCTION (11 services)
// ============================================================
const POST_PRODUCTION: UpsellProduct[] = [
  {
    id: 'montage-basique',
    title: 'Montage Basique',
    category: 'Post-Production',
    price: '49.00',
    unit: '/h de rush',
    description: 'Montage simple avec cuts et transitions basiques. Idéal pour des vidéos rapides.',
    tags: ['upsell', 'post-production', 'montage'],
    variants: [
      { title: '1h de rush', price: '49.00', sku: 'MONTAGE-BASE-1H' },
      { title: '2h de rush', price: '89.00', sku: 'MONTAGE-BASE-2H' },
      { title: '4h de rush', price: '169.00', sku: 'MONTAGE-BASE-4H' },
    ],
  },
  {
    id: 'montage-standard',
    title: 'Montage Standard',
    category: 'Post-Production',
    price: '79.00',
    unit: '/h de rush',
    description: 'Montage professionnel avec transitions, titres, musique et colorimétrie basique.',
    popular: true,
    tags: ['upsell', 'post-production', 'montage', 'populaire'],
    variants: [
      { title: '1h de rush', price: '79.00', sku: 'MONTAGE-STD-1H' },
      { title: '2h de rush', price: '149.00', sku: 'MONTAGE-STD-2H' },
      { title: '4h de rush', price: '279.00', sku: 'MONTAGE-STD-4H' },
    ],
  },
  {
    id: 'montage-premium',
    title: 'Montage Premium',
    category: 'Post-Production',
    price: '120.00',
    unit: '/h de rush',
    description: 'Montage cinématique avec motion design, color grading avancé et effets.',
    popular: true,
    tags: ['upsell', 'post-production', 'montage', 'premium', 'populaire'],
    variants: [
      { title: '1h de rush', price: '120.00', sku: 'MONTAGE-PREM-1H' },
      { title: '2h de rush', price: '220.00', sku: 'MONTAGE-PREM-2H' },
      { title: '4h de rush', price: '420.00', sku: 'MONTAGE-PREM-4H' },
    ],
  },
  {
    id: 'derushage',
    title: 'Dérushage',
    category: 'Post-Production',
    price: '35.00',
    unit: '/h de rush',
    description: 'Sélection et organisation des meilleures prises. Gain de temps pour le montage.',
    tags: ['upsell', 'post-production', 'derushage'],
    variants: [
      { title: '1h de rush', price: '35.00', sku: 'DERUSH-1H' },
      { title: '2h de rush', price: '65.00', sku: 'DERUSH-2H' },
      { title: '4h de rush', price: '120.00', sku: 'DERUSH-4H' },
    ],
  },
  {
    id: 'editorialisation',
    title: 'Éditorialisation',
    category: 'Post-Production',
    price: '89.00',
    unit: '/vidéo',
    description: 'Restructuration narrative de votre contenu pour maximiser l\'engagement.',
    tags: ['upsell', 'post-production', 'editorial'],
    variants: [
      { title: 'Par vidéo', price: '89.00', sku: 'EDIT-VIDEO' },
    ],
  },
  {
    id: 'sous-titrage',
    title: 'Sous-titrage FR/EN',
    category: 'Post-Production',
    price: '45.00',
    unit: '/h de vidéo',
    description: 'Sous-titres professionnels incrustés, français ou anglais.',
    tags: ['upsell', 'post-production', 'sous-titres', 'accessibilite'],
    variants: [
      { title: 'Jusqu\'à 30 min', price: '45.00', sku: 'SUBS-30' },
      { title: 'Jusqu\'à 1h', price: '79.00', sku: 'SUBS-60' },
      { title: 'Jusqu\'à 2h', price: '149.00', sku: 'SUBS-120' },
    ],
  },
  {
    id: 'pack-miniatures',
    title: 'Pack Miniatures YouTube (3)',
    category: 'Post-Production',
    price: '39.00',
    unit: '/pack',
    description: '3 miniatures professionnelles optimisées pour le CTR YouTube.',
    popular: true,
    tags: ['upsell', 'post-production', 'miniatures', 'youtube', 'populaire'],
    variants: [
      { title: 'Pack de 3', price: '39.00', sku: 'THUMB-3' },
      { title: 'Pack de 6', price: '69.00', sku: 'THUMB-6' },
      { title: 'Pack de 10', price: '99.00', sku: 'THUMB-10' },
    ],
  },
  {
    id: 'clipping-shorts',
    title: 'Pack Clipping Shorts (5-10 clips)',
    category: 'Post-Production',
    price: '149.00',
    unit: '/pack',
    description: 'Extraction de 5-10 clips courts optimisés TikTok/Reels/Shorts.',
    popular: true,
    tags: ['upsell', 'post-production', 'clipping', 'shorts', 'tiktok', 'populaire'],
    variants: [
      { title: '5-10 clips', price: '149.00', sku: 'CLIP-PACK' },
    ],
  },
  {
    id: 'incrustations-graphiques',
    title: 'Incrustations Graphiques',
    category: 'Post-Production',
    price: '79.00',
    unit: '/package',
    description: 'Lower thirds, logos animés, transitions graphiques sur mesure.',
    tags: ['upsell', 'post-production', 'graphics', 'motion'],
    variants: [
      { title: 'Package basique', price: '79.00', sku: 'GRAPH-BASE' },
      { title: 'Package complet', price: '149.00', sku: 'GRAPH-FULL' },
    ],
  },
  {
    id: 'mixage-audio',
    title: 'Mixage Audio Pro',
    category: 'Post-Production',
    price: '55.00',
    unit: '/h de vidéo',
    description: 'Nettoyage, égalisation, compression et mastering audio professionnel.',
    tags: ['upsell', 'post-production', 'audio', 'mixage'],
    variants: [
      { title: '1h de vidéo', price: '55.00', sku: 'MIX-1H' },
      { title: '2h de vidéo', price: '99.00', sku: 'MIX-2H' },
    ],
  },
  {
    id: 'stabilisation-tracking',
    title: 'Stabilisation & Tracking',
    category: 'Post-Production',
    price: '65.00',
    unit: '/h de vidéo',
    description: 'Stabilisation avancée et tracking pour effets spéciaux.',
    tags: ['upsell', 'post-production', 'stabilisation', 'vfx'],
    variants: [
      { title: '1h de vidéo', price: '65.00', sku: 'STAB-1H' },
    ],
  },
];

// ============================================================
// 2. ÉQUIPEMENT (3 services + MICROS ajoutés)
// ============================================================
const EQUIPEMENT: UpsellProduct[] = [
  {
    id: 'teleprompter',
    title: 'Téléprompter 15"',
    category: 'Équipement',
    price: '15.00',
    unit: '/h',
    description: 'Téléprompter professionnel 15" avec iPad et télécommande.',
    popular: true,
    tags: ['upsell', 'equipement', 'teleprompter', 'populaire'],
    variants: [
      { title: 'Par heure', price: '15.00', sku: 'TELE-H' },
      { title: 'Demi-journée (4h)', price: '50.00', sku: 'TELE-4H' },
      { title: 'Journée (8h)', price: '90.00', sku: 'TELE-8H' },
    ],
  },
  {
    id: 'camera-extra',
    title: 'Caméra Extra (Sony FX3)',
    category: 'Équipement',
    price: '25.00',
    unit: '/h',
    description: 'Caméra Sony FX3 4K supplémentaire pour angle additionnel.',
    tags: ['upsell', 'equipement', 'camera'],
    variants: [
      { title: 'Par heure', price: '25.00', sku: 'CAM-H' },
      { title: 'Demi-journée (4h)', price: '80.00', sku: 'CAM-4H' },
      { title: 'Journée (8h)', price: '150.00', sku: 'CAM-8H' },
    ],
  },
  {
    id: 'live-switch-atem',
    title: 'Live-Switch ATEM Mini Pro',
    category: 'Équipement',
    price: '35.00',
    unit: '/h',
    description: 'Régie ATEM pour diffusion live multi-caméras et multi-plateformes.',
    popular: true,
    tags: ['upsell', 'equipement', 'atem', 'live', 'populaire'],
    variants: [
      { title: 'Par heure', price: '35.00', sku: 'ATEM-H' },
      { title: 'Demi-journée (4h)', price: '120.00', sku: 'ATEM-4H' },
      { title: 'Journée (8h)', price: '220.00', sku: 'ATEM-8H' },
    ],
  },
  // MICROS AJOUTÉS
  {
    id: 'micro-cravate-hf',
    title: 'Micro Cravate HF (Sennheiser)',
    category: 'Équipement',
    price: '15.00',
    unit: '/h',
    description: 'Micro cravate sans fil Sennheiser pour une mobilité totale.',
    popular: true,
    tags: ['upsell', 'equipement', 'micro', 'audio', 'populaire'],
    variants: [
      { title: 'Par heure', price: '15.00', sku: 'MIC-HF-H' },
      { title: 'Demi-journée (4h)', price: '50.00', sku: 'MIC-HF-4H' },
      { title: 'Journée (8h)', price: '90.00', sku: 'MIC-HF-8H' },
    ],
  },
  {
    id: 'micro-main-hf',
    title: 'Micro Main HF (Shure)',
    category: 'Équipement',
    price: '20.00',
    unit: '/h',
    description: 'Micro main sans fil Shure SM58 pour interviews et présentations.',
    tags: ['upsell', 'equipement', 'micro', 'audio'],
    variants: [
      { title: 'Par heure', price: '20.00', sku: 'MIC-MAIN-H' },
      { title: 'Demi-journée (4h)', price: '65.00', sku: 'MIC-MAIN-4H' },
      { title: 'Journée (8h)', price: '120.00', sku: 'MIC-MAIN-8H' },
    ],
  },
  {
    id: 'micro-podcast-sm7b',
    title: 'Micro Podcast Shure SM7B',
    category: 'Équipement',
    price: '25.00',
    unit: '/h',
    description: 'Le micro podcast par excellence. Qualité broadcast.',
    popular: true,
    tags: ['upsell', 'equipement', 'micro', 'podcast', 'populaire'],
    variants: [
      { title: 'Par heure', price: '25.00', sku: 'SM7B-H' },
      { title: 'Demi-journée (4h)', price: '80.00', sku: 'SM7B-4H' },
      { title: 'Journée (8h)', price: '150.00', sku: 'SM7B-8H' },
    ],
  },
  {
    id: 'kit-micro-2hf',
    title: 'Kit 2 Micros Sans-Fil',
    category: 'Équipement',
    price: '69.00',
    unit: '/jour',
    description: 'Kit complet 2 micros HF Sennheiser + récepteur.',
    tags: ['upsell', 'equipement', 'micro', 'kit'],
    variants: [
      { title: 'Journée', price: '69.00', sku: 'KIT-2MIC-J' },
    ],
  },
];

// ============================================================
// 3. SERVICES EXPERTS (16 services)
// ============================================================
const SERVICES_EXPERTS: UpsellProduct[] = [
  {
    id: 'redaction-script',
    title: 'Rédaction Script Vidéo',
    category: 'Services Expert',
    price: '149.00',
    unit: '/script',
    description: 'Script professionnel optimisé pour l\'engagement et vos objectifs.',
    popular: true,
    tags: ['upsell', 'expert', 'script', 'redaction', 'populaire'],
    variants: [
      { title: 'Script court (5-10 min)', price: '149.00', sku: 'SCRIPT-COURT' },
      { title: 'Script long (15-30 min)', price: '249.00', sku: 'SCRIPT-LONG' },
    ],
  },
  {
    id: 'copywriting-youtube',
    title: 'Copywriting Description YouTube',
    category: 'Services Expert',
    price: '79.00',
    unit: '/vidéo',
    description: 'Description optimisée SEO + chapitres + CTA pour YouTube.',
    tags: ['upsell', 'expert', 'copywriting', 'youtube', 'seo'],
    variants: [
      { title: 'Par vidéo', price: '79.00', sku: 'COPY-YT' },
    ],
  },
  {
    id: 'pack-titres',
    title: 'Pack Titres Optimisés (10)',
    category: 'Services Expert',
    price: '49.00',
    unit: '/pack',
    description: '10 titres accrocheurs testés pour maximiser le CTR.',
    tags: ['upsell', 'expert', 'titres', 'copywriting'],
    variants: [
      { title: 'Pack de 10', price: '49.00', sku: 'TITRES-10' },
    ],
  },
  {
    id: 'consultation-strategie',
    title: 'Consultation Stratégie Contenu',
    category: 'Services Expert',
    price: '299.00',
    unit: '/session 2h',
    description: 'Session stratégique pour définir votre ligne éditoriale et calendrier.',
    popular: true,
    tags: ['upsell', 'expert', 'strategie', 'consultation', 'populaire'],
    variants: [
      { title: 'Session 2h', price: '299.00', sku: 'STRAT-2H' },
    ],
  },
  {
    id: 'calendrier-editorial',
    title: 'Calendrier Éditorial 90 jours',
    category: 'Services Expert',
    price: '499.00',
    unit: '/calendrier',
    description: 'Planning complet de contenus sur 3 mois avec idées et scripts.',
    tags: ['upsell', 'expert', 'calendrier', 'planning'],
    variants: [
      { title: '90 jours', price: '499.00', sku: 'CAL-90' },
    ],
  },
  {
    id: 'analyse-performance',
    title: 'Analyse de Performance',
    category: 'Services Expert',
    price: '199.00',
    unit: '/mois',
    description: 'Rapport mensuel détaillé avec recommandations d\'optimisation.',
    tags: ['upsell', 'expert', 'analytics', 'performance'],
    variants: [
      { title: 'Par mois', price: '199.00', sku: 'PERF-MOIS' },
    ],
  },
  {
    id: 'seo-youtube',
    title: 'Optimisation SEO YouTube',
    category: 'Services Expert',
    price: '179.00',
    unit: '/vidéo',
    description: 'Optimisation complète : titre, description, tags, chapitres, end screens.',
    popular: true,
    tags: ['upsell', 'expert', 'seo', 'youtube', 'populaire'],
    variants: [
      { title: 'Par vidéo', price: '179.00', sku: 'SEO-YT' },
    ],
  },
  {
    id: 'distribution-multi',
    title: 'Distribution Multi-Plateforme',
    category: 'Services Expert',
    price: '149.00',
    unit: '/contenu',
    description: 'Adaptation et publication sur YouTube, TikTok, LinkedIn, Instagram.',
    popular: true,
    tags: ['upsell', 'expert', 'distribution', 'multi-plateforme', 'populaire'],
    variants: [
      { title: 'Par contenu', price: '149.00', sku: 'DISTRIB' },
    ],
  },
  {
    id: 'cross-promotion',
    title: 'Campagne Cross-Promotion',
    category: 'Services Expert',
    price: '299.00',
    unit: '/campagne',
    description: 'Stratégie de promotion croisée entre vos différentes plateformes.',
    tags: ['upsell', 'expert', 'promotion', 'marketing'],
    variants: [
      { title: 'Par campagne', price: '299.00', sku: 'CROSS-PROMO' },
    ],
  },
  {
    id: 'youtube-ads-setup',
    title: 'Setup Campagne YouTube Ads',
    category: 'Services Expert',
    price: '399.00',
    unit: 'one-time',
    description: 'Configuration complète de votre première campagne YouTube Ads.',
    tags: ['upsell', 'expert', 'ads', 'youtube'],
    variants: [
      { title: 'Setup initial', price: '399.00', sku: 'YT-ADS-SETUP' },
    ],
  },
  {
    id: 'gestion-ads-mensuelle',
    title: 'Gestion Ads Mensuelle',
    category: 'Services Expert',
    price: '499.00',
    unit: '/mois',
    description: 'Gestion et optimisation mensuelle de vos campagnes publicitaires.',
    popular: true,
    tags: ['upsell', 'expert', 'ads', 'gestion', 'populaire'],
    variants: [
      { title: 'Par mois', price: '499.00', sku: 'ADS-MOIS' },
    ],
  },
  {
    id: 'tiktok-meta-ads',
    title: 'Campagne TikTok/Meta Ads',
    category: 'Services Expert',
    price: '599.00',
    unit: 'setup',
    description: 'Setup campagne TikTok ou Meta Ads + gestion premier mois.',
    tags: ['upsell', 'expert', 'ads', 'tiktok', 'meta'],
    variants: [
      { title: 'Setup + 1 mois', price: '599.00', sku: 'TIKTOK-SETUP' },
      { title: 'Gestion mensuelle', price: '399.00', sku: 'TIKTOK-MOIS' },
    ],
  },
  {
    id: 'coaching-camera',
    title: 'Coaching Caméra & Présence',
    category: 'Services Expert',
    price: '249.00',
    unit: '/session 2h',
    description: 'Coaching personnalisé pour être à l\'aise devant la caméra.',
    tags: ['upsell', 'expert', 'coaching', 'presence'],
    variants: [
      { title: 'Session 2h', price: '249.00', sku: 'COACH-2H' },
    ],
  },
  {
    id: 'brand-identity',
    title: 'Brand Identity Package',
    category: 'Services Expert',
    price: '799.00',
    unit: '/package',
    description: 'Identité visuelle complète : logo, couleurs, typos, templates.',
    popular: true,
    tags: ['upsell', 'expert', 'branding', 'identite', 'populaire'],
    variants: [
      { title: 'Package complet', price: '799.00', sku: 'BRAND-PACK' },
    ],
  },
  {
    id: 'ghostwriting-newsletter',
    title: 'Ghostwriting Newsletter',
    category: 'Services Expert',
    price: '299.00',
    unit: '/mois (4 newsletters)',
    description: 'Rédaction de 4 newsletters mensuelles dans votre voix.',
    tags: ['upsell', 'expert', 'ghostwriting', 'newsletter'],
    variants: [
      { title: '4 newsletters/mois', price: '299.00', sku: 'GHOST-4' },
    ],
  },
  {
    id: 'podcast-to-blog',
    title: 'Podcast-to-Blog Conversion',
    category: 'Services Expert',
    price: '149.00',
    unit: '/épisode',
    description: 'Transformation de votre épisode podcast en article de blog SEO.',
    tags: ['upsell', 'expert', 'podcast', 'blog', 'seo'],
    variants: [
      { title: 'Par épisode', price: '149.00', sku: 'POD-BLOG' },
    ],
  },
];

// ============================================================
// 4. DÉCORATION (5 services)
// ============================================================
const DECORATION: UpsellProduct[] = [
  {
    id: 'deco-personnalisee',
    title: 'Décoration Personnalisée Studio',
    category: 'Décoration',
    price: '299.00',
    unit: '/setup',
    description: 'Setup déco personnalisé selon votre univers et votre marque.',
    popular: true,
    tags: ['upsell', 'decoration', 'setup', 'populaire'],
    variants: [
      { title: 'Setup basique', price: '299.00', sku: 'DECO-BASE' },
      { title: 'Setup premium', price: '499.00', sku: 'DECO-PREM' },
    ],
  },
  {
    id: 'setup-ecommerce',
    title: 'Setup Produits E-commerce',
    category: 'Décoration',
    price: '199.00',
    unit: '/setup',
    description: 'Configuration du studio pour shooting produits e-commerce.',
    tags: ['upsell', 'decoration', 'ecommerce', 'produits'],
    variants: [
      { title: 'Par setup', price: '199.00', sku: 'SETUP-ECOM' },
    ],
  },
  {
    id: 'setup-interview',
    title: 'Setup Interview/Bureau',
    category: 'Décoration',
    price: '149.00',
    unit: '/setup',
    description: 'Aménagement style bureau professionnel ou plateau interview.',
    tags: ['upsell', 'decoration', 'interview', 'bureau'],
    variants: [
      { title: 'Par setup', price: '149.00', sku: 'SETUP-ITW' },
    ],
  },
  {
    id: 'setup-gaming',
    title: 'Setup Gaming/Tech RGB',
    category: 'Décoration',
    price: '249.00',
    unit: '/setup',
    description: 'Configuration gaming avec éclairage RGB et setup tech.',
    popular: true,
    tags: ['upsell', 'decoration', 'gaming', 'tech', 'populaire'],
    variants: [
      { title: 'Par setup', price: '249.00', sku: 'SETUP-GAME' },
    ],
  },
  {
    id: 'scenographie-surmesure',
    title: 'Scénographie Sur-Mesure',
    category: 'Décoration',
    price: '799.00',
    unit: '/projet',
    description: 'Création scénographique complète pour productions exigeantes.',
    tags: ['upsell', 'decoration', 'scenographie', 'premium'],
    variants: [
      { title: 'Par projet', price: '799.00', sku: 'SCENO-CUSTOM' },
    ],
  },
];

// ============================================================
// 5. BEAUTY & MAKEUP (4 services)
// ============================================================
const BEAUTY: UpsellProduct[] = [
  {
    id: 'maquillage-pro',
    title: 'Maquillage Professionnel',
    category: 'Beauty',
    price: '89.00',
    unit: '/personne',
    description: 'Maquillage professionnel adapté caméra et éclairage studio.',
    popular: true,
    tags: ['upsell', 'beauty', 'maquillage', 'populaire'],
    variants: [
      { title: '1 personne', price: '89.00', sku: 'MAQ-1' },
      { title: '2 personnes', price: '159.00', sku: 'MAQ-2' },
      { title: '3 personnes', price: '219.00', sku: 'MAQ-3' },
    ],
  },
  {
    id: 'maquillage-coiffure',
    title: 'Maquillage + Coiffure',
    category: 'Beauty',
    price: '149.00',
    unit: '/personne',
    description: 'Pack complet maquillage et coiffure/brushing.',
    popular: true,
    tags: ['upsell', 'beauty', 'maquillage', 'coiffure', 'populaire'],
    variants: [
      { title: '1 personne', price: '149.00', sku: 'MAQCOIF-1' },
      { title: '2 personnes', price: '269.00', sku: 'MAQCOIF-2' },
    ],
  },
  {
    id: 'maquillage-artistique',
    title: 'Maquillage Artistique',
    category: 'Beauty',
    price: '199.00',
    unit: '/personne',
    description: 'Maquillage créatif et artistique pour productions spéciales.',
    tags: ['upsell', 'beauty', 'maquillage', 'artistique'],
    variants: [
      { title: 'Par personne', price: '199.00', sku: 'MAQ-ART' },
    ],
  },
  {
    id: 'team-maquillage',
    title: 'Team Maquillage (4 pers.)',
    category: 'Beauty',
    price: '399.00',
    unit: '/session',
    description: 'Maquilleur dédié pour équipe de 4 personnes avec retouches.',
    tags: ['upsell', 'beauty', 'maquillage', 'team'],
    variants: [
      { title: 'Session complète', price: '399.00', sku: 'MAQ-TEAM' },
    ],
  },
];

// ============================================================
// 6. TRANSPORT (5 services)
// ============================================================
const TRANSPORT: UpsellProduct[] = [
  {
    id: 'navette-gare',
    title: 'Navette Gare Saint-Charles',
    category: 'Transport',
    price: '20.00',
    unit: 'A/R',
    description: 'Transport aller-retour depuis la gare Saint-Charles.',
    tags: ['upsell', 'transport', 'gare', 'navette'],
    variants: [
      { title: 'Aller simple', price: '12.00', sku: 'NAV-GARE-A' },
      { title: 'Aller-retour', price: '20.00', sku: 'NAV-GARE-AR' },
    ],
  },
  {
    id: 'navette-aeroport',
    title: 'Navette Aéroport Marseille-Provence',
    category: 'Transport',
    price: '60.00',
    unit: 'A/R',
    description: 'Transport aller-retour depuis l\'aéroport Marseille-Provence.',
    popular: true,
    tags: ['upsell', 'transport', 'aeroport', 'navette', 'populaire'],
    variants: [
      { title: 'Aller simple', price: '35.00', sku: 'NAV-AERO-A' },
      { title: 'Aller-retour', price: '60.00', sku: 'NAV-AERO-AR' },
    ],
  },
  {
    id: 'chauffeur-journee',
    title: 'Service Chauffeur Journée',
    category: 'Transport',
    price: '299.00',
    unit: '/8h',
    description: 'Chauffeur privé avec véhicule premium pour la journée.',
    tags: ['upsell', 'transport', 'chauffeur', 'vip'],
    variants: [
      { title: 'Demi-journée (4h)', price: '169.00', sku: 'CHAUF-4H' },
      { title: 'Journée (8h)', price: '299.00', sku: 'CHAUF-8H' },
    ],
  },
  {
    id: 'livraison-materiel',
    title: 'Livraison Matériel',
    category: 'Transport',
    price: '49.00',
    unit: '/trajet',
    description: 'Service de livraison/récupération de votre matériel.',
    tags: ['upsell', 'transport', 'livraison', 'materiel'],
    variants: [
      { title: 'Par trajet', price: '49.00', sku: 'LIV-MAT' },
    ],
  },
  {
    id: 'parking-securise',
    title: 'Parking Sécurisé',
    category: 'Transport',
    price: '0.00',
    unit: 'gratuit',
    description: 'Places de parking sécurisées et vidéosurveillées.',
    tags: ['upsell', 'transport', 'parking', 'gratuit'],
    variants: [
      { title: 'Gratuit', price: '0.00', sku: 'PARK-FREE' },
    ],
  },
];

// ============================================================
// 7. CATERING (6 services)
// ============================================================
const CATERING: UpsellProduct[] = [
  {
    id: 'coffee-break',
    title: 'Coffee Break',
    category: 'Catering',
    price: '12.00',
    unit: '/pers',
    description: 'Café, thé, viennoiseries et fruits frais.',
    popular: true,
    tags: ['upsell', 'catering', 'cafe', 'populaire'],
    variants: [
      { title: '1-5 personnes', price: '12.00', sku: 'COFFEE-5' },
      { title: '6-10 personnes', price: '10.00', sku: 'COFFEE-10' },
    ],
  },
  {
    id: 'dejeuner-traiteur',
    title: 'Déjeuner Traiteur',
    category: 'Catering',
    price: '25.00',
    unit: '/pers',
    description: 'Repas complet : entrée, plat, dessert, boissons.',
    popular: true,
    tags: ['upsell', 'catering', 'dejeuner', 'populaire'],
    variants: [
      { title: 'Par personne', price: '25.00', sku: 'LUNCH' },
    ],
  },
  {
    id: 'cocktail-dejeunatoire',
    title: 'Cocktail Déjeunatoire',
    category: 'Catering',
    price: '35.00',
    unit: '/pers',
    description: 'Assortiment de bouchées salées et sucrées.',
    tags: ['upsell', 'catering', 'cocktail'],
    variants: [
      { title: 'Par personne', price: '35.00', sku: 'COCKTAIL' },
    ],
  },
  {
    id: 'diner-assis',
    title: 'Dîner Assis (3 plats)',
    category: 'Catering',
    price: '45.00',
    unit: '/pers',
    description: 'Menu gastronomique 3 plats avec accord mets-vins possible.',
    tags: ['upsell', 'catering', 'diner', 'gastronomique'],
    variants: [
      { title: 'Par personne', price: '45.00', sku: 'DINER' },
    ],
  },
  {
    id: 'bar-snacks',
    title: 'Bar à Snacks',
    category: 'Catering',
    price: '8.00',
    unit: '/pers',
    description: 'Snacks, fruits secs, barres énergétiques à disposition.',
    tags: ['upsell', 'catering', 'snacks'],
    variants: [
      { title: 'Par personne', price: '8.00', sku: 'SNACKS' },
    ],
  },
  {
    id: 'chef-prive',
    title: 'Chef Privé Sur Place',
    category: 'Catering',
    price: '399.00',
    unit: '/session',
    description: 'Chef cuisinier sur place pour un repas sur mesure.',
    tags: ['upsell', 'catering', 'chef', 'premium'],
    variants: [
      { title: 'Session (jusqu\'à 10 pers)', price: '399.00', sku: 'CHEF' },
    ],
  },
];

// ============================================================
// 8. TECHNIQUE (7 services)
// ============================================================
const TECHNIQUE: UpsellProduct[] = [
  {
    id: 'regie-video-live',
    title: 'Régie Vidéo Live',
    category: 'Technique',
    price: '149.00',
    unit: '/session',
    description: 'Technicien régie pour gestion live multi-caméras.',
    popular: true,
    tags: ['upsell', 'technique', 'regie', 'live', 'populaire'],
    variants: [
      { title: 'Demi-journée', price: '149.00', sku: 'REGIE-4H' },
      { title: 'Journée', price: '269.00', sku: 'REGIE-8H' },
    ],
  },
  {
    id: 'ingenieur-son',
    title: 'Ingénieur Son Dédié',
    category: 'Technique',
    price: '99.00',
    unit: '/h',
    description: 'Ingénieur son professionnel pour mixage live optimal.',
    tags: ['upsell', 'technique', 'son', 'ingenieur'],
    variants: [
      { title: 'Par heure', price: '99.00', sku: 'SON-H' },
      { title: 'Demi-journée', price: '349.00', sku: 'SON-4H' },
    ],
  },
  {
    id: 'photographe-plateau',
    title: 'Photographe Plateau BTS',
    category: 'Technique',
    price: '299.00',
    unit: '/session',
    description: 'Photographe pour behind-the-scenes et portraits.',
    popular: true,
    tags: ['upsell', 'technique', 'photo', 'bts', 'populaire'],
    variants: [
      { title: 'Session', price: '299.00', sku: 'PHOTO-BTS' },
    ],
  },
  {
    id: 'drone',
    title: 'Drone Intérieur/Extérieur',
    category: 'Technique',
    price: '399.00',
    unit: '/session',
    description: 'Prises de vues aériennes avec pilote certifié.',
    tags: ['upsell', 'technique', 'drone', 'aerien'],
    variants: [
      { title: 'Session', price: '399.00', sku: 'DRONE' },
    ],
  },
  {
    id: 'ecran-led-75',
    title: 'Écran Géant LED 75"',
    category: 'Technique',
    price: '199.00',
    unit: '/jour',
    description: 'Écran LED 4K 75" pour présentations ou fond dynamique.',
    tags: ['upsell', 'technique', 'ecran', 'led'],
    variants: [
      { title: 'Par jour', price: '199.00', sku: 'LED-75' },
    ],
  },
  {
    id: 'systeme-son-premium',
    title: 'Système Son Premium',
    category: 'Technique',
    price: '149.00',
    unit: '/jour',
    description: 'Système son concert avec enceintes et console.',
    tags: ['upsell', 'technique', 'son', 'enceintes'],
    variants: [
      { title: 'Par jour', price: '149.00', sku: 'SON-PREM' },
    ],
  },
  {
    id: 'projecteur-4k',
    title: 'Projecteur 4K',
    category: 'Technique',
    price: '99.00',
    unit: '/jour',
    description: 'Vidéoprojecteur 4K haute luminosité + écran.',
    tags: ['upsell', 'technique', 'projecteur', 'video'],
    variants: [
      { title: 'Par jour', price: '99.00', sku: 'PROJ-4K' },
    ],
  },
];

// ============================================================
// 9. WELLNESS (4 services)
// ============================================================
const WELLNESS: UpsellProduct[] = [
  {
    id: 'massage-express',
    title: 'Massage Express',
    category: 'Wellness',
    price: '49.00',
    unit: '/30min',
    description: 'Massage relaxant express pour décompresser avant tournage.',
    tags: ['upsell', 'wellness', 'massage'],
    variants: [
      { title: '30 min', price: '49.00', sku: 'MASS-30' },
      { title: '1h', price: '89.00', sku: 'MASS-60' },
    ],
  },
  {
    id: 'coach-sportif',
    title: 'Coach Sportif',
    category: 'Wellness',
    price: '89.00',
    unit: '/h',
    description: 'Session coaching pour échauffement et énergie.',
    tags: ['upsell', 'wellness', 'sport', 'coaching'],
    variants: [
      { title: 'Par heure', price: '89.00', sku: 'COACH-SPORT' },
    ],
  },
  {
    id: 'yoga-meditation',
    title: 'Yoga/Méditation',
    category: 'Wellness',
    price: '119.00',
    unit: '/session 1h',
    description: 'Session yoga ou méditation pour se recentrer.',
    tags: ['upsell', 'wellness', 'yoga', 'meditation'],
    variants: [
      { title: 'Session 1h', price: '119.00', sku: 'YOGA-1H' },
    ],
  },
  {
    id: 'nutritionniste',
    title: 'Nutritionniste',
    category: 'Wellness',
    price: '149.00',
    unit: '/consultation',
    description: 'Consultation nutrition pour optimiser votre énergie.',
    tags: ['upsell', 'wellness', 'nutrition'],
    variants: [
      { title: 'Consultation', price: '149.00', sku: 'NUTRI' },
    ],
  },
];

// ============================================================
// 10. SERVICES ADDITIONNELS POST-PROD (9 services)
// ============================================================
const SERVICES_ADDITIONNELS: UpsellProduct[] = [
  {
    id: 'transcription-multilingue',
    title: 'Transcription Multilingue FR/EN/ES',
    category: 'Services Additionnels',
    price: '79.00',
    unit: '/h de vidéo',
    description: 'Transcription précise en français, anglais ou espagnol.',
    tags: ['upsell', 'additionnel', 'transcription', 'multilingue'],
    variants: [
      { title: 'Par heure de vidéo', price: '79.00', sku: 'TRANS-H' },
    ],
  },
  {
    id: 'voice-over',
    title: 'Voice-Over Professionnel',
    category: 'Services Additionnels',
    price: '199.00',
    unit: '/vidéo',
    description: 'Voix-off professionnelle pour narration ou doublage.',
    popular: true,
    tags: ['upsell', 'additionnel', 'voiceover', 'narration', 'populaire'],
    variants: [
      { title: 'Jusqu\'à 5 min', price: '199.00', sku: 'VO-5' },
      { title: 'Jusqu\'à 15 min', price: '349.00', sku: 'VO-15' },
    ],
  },
  {
    id: 'animation-logo-3d',
    title: 'Animation Logo 3D',
    category: 'Services Additionnels',
    price: '299.00',
    unit: '/animation',
    description: 'Animation de votre logo en 3D pour intro/outro.',
    tags: ['upsell', 'additionnel', 'animation', '3d', 'logo'],
    variants: [
      { title: 'Animation simple', price: '299.00', sku: 'LOGO-3D' },
      { title: 'Animation premium', price: '499.00', sku: 'LOGO-3D-PREM' },
    ],
  },
  {
    id: 'vfx-sur-devis',
    title: 'Effets Spéciaux VFX',
    category: 'Services Additionnels',
    price: '0.00',
    unit: 'sur devis',
    description: 'Effets spéciaux visuels sur mesure. Tarif selon complexité.',
    tags: ['upsell', 'additionnel', 'vfx', 'effets'],
    variants: [
      { title: 'Sur devis', price: '0.00', sku: 'VFX-DEVIS' },
    ],
  },
  {
    id: 'etalonnage-cinema',
    title: 'Étalonnage Cinéma Pro',
    category: 'Services Additionnels',
    price: '149.00',
    unit: '/vidéo',
    description: 'Color grading cinématographique professionnel.',
    popular: true,
    tags: ['upsell', 'additionnel', 'etalonnage', 'colorgrading', 'populaire'],
    variants: [
      { title: 'Par vidéo', price: '149.00', sku: 'COLOR-CINE' },
    ],
  },
];

// ============================================================
// 11. JURIDIQUE/LEGAL (4 services)
// ============================================================
const JURIDIQUE: UpsellProduct[] = [
  {
    id: 'contrats-talent',
    title: 'Contrats Talent',
    category: 'Juridique',
    price: '99.00',
    unit: '/contrat',
    description: 'Rédaction contrat droit à l\'image et cession de droits.',
    tags: ['upsell', 'juridique', 'contrat', 'talent'],
    variants: [
      { title: 'Par contrat', price: '99.00', sku: 'CONTRACT' },
    ],
  },
  {
    id: 'declarations-sacem',
    title: 'Déclarations SACEM',
    category: 'Juridique',
    price: '49.00',
    unit: '/déclaration',
    description: 'Gestion des déclarations SACEM pour musiques utilisées.',
    tags: ['upsell', 'juridique', 'sacem', 'musique'],
    variants: [
      { title: 'Par déclaration', price: '49.00', sku: 'SACEM' },
    ],
  },
  {
    id: 'assurance-tournage',
    title: 'Assurance Tournage',
    category: 'Juridique',
    price: '79.00',
    unit: '/jour',
    description: 'Assurance responsabilité civile pour votre tournage.',
    tags: ['upsell', 'juridique', 'assurance'],
    variants: [
      { title: 'Par jour', price: '79.00', sku: 'ASSUR-J' },
    ],
  },
  {
    id: 'autorisations-tournage',
    title: 'Autorisations Tournage Extérieur',
    category: 'Juridique',
    price: '149.00',
    unit: '/demande',
    description: 'Gestion des demandes d\'autorisation de tournage.',
    tags: ['upsell', 'juridique', 'autorisation', 'exterieur'],
    variants: [
      { title: 'Par demande', price: '149.00', sku: 'AUTOR' },
    ],
  },
];

// ============================================================
// 12. LOCATION MATÉRIEL PREMIUM (6 services)
// ============================================================
const LOCATION_MATERIEL: UpsellProduct[] = [
  {
    id: 'steadicam-gimbal',
    title: 'Steadicam/Gimbal Pro (DJI Ronin RS3)',
    category: 'Location Matériel',
    price: '99.00',
    unit: '/jour',
    description: 'Stabilisateur professionnel DJI Ronin RS3 Pro.',
    popular: true,
    tags: ['upsell', 'location', 'gimbal', 'steadicam', 'populaire'],
    variants: [
      { title: 'Par jour', price: '99.00', sku: 'GIMBAL-J' },
    ],
  },
  {
    id: 'kit-led-rgb',
    title: 'Kit Éclairage LED RGB (4 projecteurs)',
    category: 'Location Matériel',
    price: '149.00',
    unit: '/jour',
    description: 'Kit 4 projecteurs LED RGB pour ambiances créatives.',
    popular: true,
    tags: ['upsell', 'location', 'led', 'rgb', 'eclairage', 'populaire'],
    variants: [
      { title: 'Par jour', price: '149.00', sku: 'LED-RGB-J' },
    ],
  },
  {
    id: 'slider-motorise',
    title: 'Slider Motorisé 1.5m',
    category: 'Location Matériel',
    price: '79.00',
    unit: '/jour',
    description: 'Slider motorisé 1.5m pour mouvements fluides.',
    tags: ['upsell', 'location', 'slider', 'mouvement'],
    variants: [
      { title: 'Par jour', price: '79.00', sku: 'SLIDER-J' },
    ],
  },
  {
    id: 'kit-micro-hf-2',
    title: 'Kit Micro Sans-Fil (2 HF)',
    category: 'Location Matériel',
    price: '69.00',
    unit: '/jour',
    description: 'Kit 2 micros HF Sennheiser avec récepteur double.',
    tags: ['upsell', 'location', 'micro', 'hf', 'audio'],
    variants: [
      { title: 'Par jour', price: '69.00', sku: 'KIT-HF-2' },
    ],
  },
  {
    id: 'green-screen',
    title: 'Green Screen Portable 3x6m',
    category: 'Location Matériel',
    price: '89.00',
    unit: '/jour',
    description: 'Fond vert professionnel 3x6m avec structure.',
    tags: ['upsell', 'location', 'greenscreen', 'fond'],
    variants: [
      { title: 'Par jour', price: '89.00', sku: 'GREEN-J' },
    ],
  },
  {
    id: 'kit-cinema-red-arri',
    title: 'Kit Cinéma Complet RED/ARRI',
    category: 'Location Matériel',
    price: '499.00',
    unit: '/jour',
    description: 'Kit cinéma professionnel RED ou ARRI selon disponibilité.',
    tags: ['upsell', 'location', 'cinema', 'red', 'arri', 'premium'],
    variants: [
      { title: 'Par jour', price: '499.00', sku: 'CINE-KIT' },
    ],
  },
];

// ============================================================
// 13. LES 3 FORMULES (Autonome, Assisté, Full Service)
// ============================================================
const FORMULES: UpsellProduct[] = [
  {
    id: 'formule-autonome',
    title: 'Formule Autonome - Je gère, vous installez',
    category: 'Formule Studio',
    price: '0.00',
    unit: 'inclus',
    description: 'Vous êtes autonome. Notre tech installe le matos, vous gérez le reste.',
    tags: ['formule', 'autonome', 'basique', 'studio'],
    variants: [
      { title: 'Inclus avec le studio', price: '0.00', sku: 'FORM-AUTO' },
    ],
  },
  {
    id: 'formule-assiste',
    title: 'Formule Assisté - Accompagnement technique',
    category: 'Formule Studio',
    price: '60.00',
    unit: '/h',
    description: 'Tech dédié pendant toute la session. Vous parlez, on gère la technique.',
    popular: true,
    recommande: true,
    tags: ['formule', 'assiste', 'technique', 'studio', 'populaire', 'recommande'],
    variants: [
      { title: '2 heures', price: '120.00', sku: 'FORM-ASSIST-2H' },
      { title: '4 heures (demi-journée)', price: '220.00', sku: 'FORM-ASSIST-4H' },
      { title: '8 heures (journée)', price: '400.00', sku: 'FORM-ASSIST-8H' },
    ],
  },
  {
    id: 'formule-full-service',
    title: 'Formule Full Service - Expertise totale',
    category: 'Formule Studio',
    price: '295.00',
    unit: '/h',
    description: 'On fait TOUT : script, tournage, montage, post-prod. Vidéo clé en main.',
    popular: true,
    tags: ['formule', 'full-service', 'premium', 'studio', 'cle-en-main', 'populaire'],
    variants: [
      { title: '2h tournage + post-prod', price: '590.00', sku: 'FORM-FULL-2H' },
      { title: '4h tournage + post-prod', price: '990.00', sku: 'FORM-FULL-4H' },
      { title: '8h tournage + post-prod', price: '1790.00', sku: 'FORM-FULL-8H' },
    ],
  },
];

// ============================================================
// 14. PACKS/BUNDLES (12 packages)
// ============================================================
const PACKS: UpsellProduct[] = [
  {
    id: 'pack-createur-pro',
    title: 'Pack Créateur Pro',
    category: 'Pack',
    price: '1499.00',
    unit: '/mois',
    description: '4 sessions studio/mois + montage + clipping + miniatures. Économie: 901€',
    popular: true,
    recommande: true,
    tags: ['pack', 'bundle', 'createur', 'mensuel', 'populaire', 'recommande'],
    variants: [
      { title: 'Mensuel', price: '1499.00', sku: 'PACK-CREAT-M' },
      { title: 'Trimestriel (-10%)', price: '4047.00', sku: 'PACK-CREAT-T' },
      { title: 'Annuel (-20%)', price: '14390.00', sku: 'PACK-CREAT-A' },
    ],
  },
  {
    id: 'pack-growth-accelerator',
    title: 'Pack Growth Accelerator',
    category: 'Pack',
    price: '2999.00',
    unit: '/mois',
    description: '8 sessions + stratégie + ads + distribution. Économie: 2201€',
    popular: true,
    tags: ['pack', 'bundle', 'growth', 'marketing', 'populaire'],
    variants: [
      { title: 'Mensuel', price: '2999.00', sku: 'PACK-GROWTH-M' },
    ],
  },
  {
    id: 'pack-podcast-pro',
    title: 'Pack Podcast Pro',
    category: 'Pack',
    price: '899.00',
    unit: '/mois',
    description: '4 épisodes/mois + montage + clipping + blog. Économie: 601€',
    tags: ['pack', 'bundle', 'podcast', 'mensuel'],
    variants: [
      { title: 'Mensuel', price: '899.00', sku: 'PACK-POD-M' },
    ],
  },
  {
    id: 'pack-entrepreneur',
    title: 'Pack Entrepreneur',
    category: 'Pack',
    price: '1899.00',
    unit: '/mois',
    description: 'Sessions illimitées + coaching + branding. Économie: 1201€',
    recommande: true,
    tags: ['pack', 'bundle', 'entrepreneur', 'illimite', 'recommande'],
    variants: [
      { title: 'Mensuel', price: '1899.00', sku: 'PACK-ENTREP-M' },
    ],
  },
  {
    id: 'pack-streaming-elite',
    title: 'Pack Streaming Elite',
    category: 'Pack',
    price: '799.00',
    unit: '/mois',
    description: 'Setup streaming + régie + clipping. Économie: 501€',
    tags: ['pack', 'bundle', 'streaming', 'live'],
    variants: [
      { title: 'Mensuel', price: '799.00', sku: 'PACK-STREAM-M' },
    ],
  },
  {
    id: 'pack-startup',
    title: 'Pack Startup',
    category: 'Pack',
    price: '2499.00',
    unit: '/mois',
    description: 'Contenus illimités + stratégie + formation équipe. Économie: 1701€',
    popular: true,
    recommande: true,
    tags: ['pack', 'bundle', 'startup', 'illimite', 'populaire', 'recommande'],
    variants: [
      { title: 'Mensuel', price: '2499.00', sku: 'PACK-START-M' },
    ],
  },
  {
    id: 'pack-corporate-vip',
    title: 'Pack Corporate VIP',
    category: 'Pack',
    price: '3499.00',
    unit: '/événement',
    description: 'Événement corporate complet : tournage, catering, maquillage. Économie: 2301€',
    popular: true,
    recommande: true,
    tags: ['pack', 'bundle', 'corporate', 'evenement', 'populaire', 'recommande'],
    variants: [
      { title: 'Par événement', price: '3499.00', sku: 'PACK-CORP' },
    ],
  },
  {
    id: 'pack-ecommerce-pro',
    title: 'Pack E-commerce Pro',
    category: 'Pack',
    price: '899.00',
    unit: '/session',
    description: 'Shooting produits + setup + montage. Économie: 601€',
    popular: true,
    tags: ['pack', 'bundle', 'ecommerce', 'produits', 'populaire'],
    variants: [
      { title: 'Par session', price: '899.00', sku: 'PACK-ECOM' },
    ],
  },
  {
    id: 'pack-beauty-wellness',
    title: 'Pack Beauty & Wellness',
    category: 'Pack',
    price: '599.00',
    unit: '/journée',
    description: 'Maquillage + massage + yoga + catering. Économie: 351€',
    tags: ['pack', 'bundle', 'beauty', 'wellness'],
    variants: [
      { title: 'Par journée', price: '599.00', sku: 'PACK-BEAUTY' },
    ],
  },
  {
    id: 'pack-cinema-elite',
    title: 'Pack Cinéma Elite',
    category: 'Pack',
    price: '4999.00',
    unit: '/jour',
    description: 'Kit cinéma RED/ARRI + équipe complète + post-prod. Économie: 3501€',
    popular: true,
    recommande: true,
    tags: ['pack', 'bundle', 'cinema', 'premium', 'populaire', 'recommande'],
    variants: [
      { title: 'Par jour', price: '4999.00', sku: 'PACK-CINE' },
    ],
  },
  {
    id: 'pack-formation-complete',
    title: 'Pack Formation Complète',
    category: 'Pack',
    price: '1299.00',
    unit: '/2 jours',
    description: 'Formation vidéo 2 jours + support + templates. Économie: 801€',
    popular: true,
    recommande: true,
    tags: ['pack', 'bundle', 'formation', 'education', 'populaire', 'recommande'],
    variants: [
      { title: '2 jours', price: '1299.00', sku: 'PACK-FORM' },
    ],
  },
  {
    id: 'pack-tech-review',
    title: 'Pack Tech Review',
    category: 'Pack',
    price: '799.00',
    unit: '/session',
    description: 'Setup tech + unboxing + montage dynamique. Économie: 551€',
    popular: true,
    tags: ['pack', 'bundle', 'tech', 'review', 'populaire'],
    variants: [
      { title: 'Par session', price: '799.00', sku: 'PACK-TECH' },
    ],
  },
];

// ============================================================
// REGROUPEMENT DE TOUS LES PRODUITS
// ============================================================

const ALL_UPSELLS: UpsellProduct[] = [
  ...POST_PRODUCTION,      // 11
  ...EQUIPEMENT,           // 7 (3 + 4 micros)
  ...SERVICES_EXPERTS,     // 16
  ...DECORATION,           // 5
  ...BEAUTY,               // 4
  ...TRANSPORT,            // 5
  ...CATERING,             // 6
  ...TECHNIQUE,            // 7
  ...WELLNESS,             // 4
  ...SERVICES_ADDITIONNELS,// 5
  ...JURIDIQUE,            // 4
  ...LOCATION_MATERIEL,    // 6
  ...FORMULES,             // 3
  ...PACKS,                // 12
];

// Total: 95 produits (77 services + 3 formules + 12 packs + 3 micros ajoutés)

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

async function getAllProducts(): Promise<any[]> {
  let allProducts: any[] = [];
  let pageInfo: string | null = null;
  
  do {
    const endpoint = pageInfo 
      ? `products.json?limit=250&page_info=${pageInfo}`
      : 'products.json?limit=250';
    
    const response = await shopifyRequest(endpoint);
    allProducts = [...allProducts, ...response.products];
    
    // Shopify pagination
    const linkHeader = response.link;
    if (linkHeader && linkHeader.includes('rel="next"')) {
      const match = linkHeader.match(/page_info=([^>&]*)/);
      pageInfo = match ? match[1] : null;
    } else {
      pageInfo = null;
    }
  } while (pageInfo);
  
  return allProducts;
}

async function createProduct(product: UpsellProduct): Promise<{ status: string; id?: string; error?: any }> {
  try {
    const shopifyProduct: any = {
      title: product.title,
      body_html: `<h2>${product.title}</h2><p>${product.description}</p>`,
      vendor: 'Le 40',
      product_type: product.category,
      tags: product.tags.join(', '),
      status: 'active',
      published: true,
      variants: product.variants?.map((v) => ({
        option1: v.title,
        price: v.price,
        sku: v.sku,
        inventory_management: null,
        inventory_policy: 'continue',
        fulfillment_service: 'manual',
        requires_shipping: false,
      })) || [
        {
          option1: 'Default',
          price: product.price,
          sku: product.id.toUpperCase(),
          inventory_management: null,
          inventory_policy: 'continue',
          fulfillment_service: 'manual',
          requires_shipping: false,
        }
      ],
    };

    const response = await shopifyRequest('products.json', 'POST', { product: shopifyProduct });
    
    console.log(`✅ ${product.title}`);
    return { status: 'created', id: response.product.id };
  } catch (error) {
    console.error(`❌ ${product.title} - ${error}`);
    return { status: 'failed', error };
  }
}

// ============================================================
// AUDIT: Comparer ce qui existe vs ce qui manque
// ============================================================

async function auditProducts() {
  console.log('\n🔍 AUDIT DES PRODUITS SHOPIFY\n');
  console.log('Récupération des produits existants...\n');
  
  const existingProducts = await getAllProducts();
  const existingTitles = existingProducts.map((p: any) => p.title.toLowerCase());
  
  const missing: UpsellProduct[] = [];
  const existing: UpsellProduct[] = [];
  
  for (const product of ALL_UPSELLS) {
    const found = existingTitles.some((title: string) => 
      title.includes(product.title.toLowerCase().split(' - ')[0].split(' (')[0]) ||
      product.title.toLowerCase().includes(title.split(' - ')[0].split(' (')[0])
    );
    
    if (found) {
      existing.push(product);
    } else {
      missing.push(product);
    }
  }
  
  console.log('═══════════════════════════════════════════════════════════');
  console.log('   📊 RAPPORT D\'AUDIT');
  console.log('═══════════════════════════════════════════════════════════\n');
  
  console.log(`✅ PRODUITS EXISTANTS (${existing.length}):`);
  console.log('─────────────────────────────────────────');
  
  const existingByCategory: { [key: string]: UpsellProduct[] } = {};
  existing.forEach(p => {
    if (!existingByCategory[p.category]) existingByCategory[p.category] = [];
    existingByCategory[p.category].push(p);
  });
  
  Object.entries(existingByCategory).forEach(([cat, products]) => {
    console.log(`\n📁 ${cat} (${products.length})`);
    products.forEach(p => console.log(`   ✓ ${p.title}`));
  });
  
  console.log(`\n\n❌ PRODUITS MANQUANTS (${missing.length}):`);
  console.log('─────────────────────────────────────────');
  
  const missingByCategory: { [key: string]: UpsellProduct[] } = {};
  missing.forEach(p => {
    if (!missingByCategory[p.category]) missingByCategory[p.category] = [];
    missingByCategory[p.category].push(p);
  });
  
  Object.entries(missingByCategory).forEach(([cat, products]) => {
    console.log(`\n📁 ${cat} (${products.length})`);
    products.forEach(p => console.log(`   ✗ ${p.title} - ${p.price}€ ${p.unit}`));
  });
  
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log(`   TOTAL: ${existing.length} existants / ${missing.length} manquants`);
  console.log('═══════════════════════════════════════════════════════════\n');
  
  return { existing, missing };
}

// ============================================================
// CRÉATION DES PRODUITS MANQUANTS
// ============================================================

async function createMissingProducts(products: UpsellProduct[]) {
  console.log(`\n🚀 CRÉATION DE ${products.length} PRODUITS\n`);
  
  let created = 0;
  let failed = 0;
  
  for (const product of products) {
    const result = await createProduct(product);
    if (result.status === 'created') {
      created++;
    } else {
      failed++;
    }
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n═══════════════════════════════════════════════════════════');
  console.log('   📊 RAPPORT DE CRÉATION');
  console.log('═══════════════════════════════════════════════════════════\n');
  console.log(`   ✅ Créés: ${created}`);
  console.log(`   ❌ Échecs: ${failed}`);
  console.log('\n═══════════════════════════════════════════════════════════\n');
}

// ============================================================
// MAIN
// ============================================================

async function main() {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('   🎬 GESTION DES UPSELLS STUDIOS - LE 40');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('');
  console.log(`   📦 Total prévu: ${ALL_UPSELLS.length} produits`);
  console.log('      - 77 services individuels');
  console.log('      - 3 formules (Autonome/Assisté/Full Service)');
  console.log('      - 12 packs/bundles');
  console.log('      - 4 micros (ajoutés)');
  console.log('');

  if (!SHOPIFY_ADMIN_TOKEN) {
    console.error('❌ SHOPIFY_ADMIN_TOKEN manquant dans .env');
    process.exit(1);
  }

  if (!SHOPIFY_STORE) {
    console.error('❌ VITE_SHOPIFY_STORE_DOMAIN manquant dans .env');
    process.exit(1);
  }

  console.log(`🏪 Store: ${SHOPIFY_STORE}\n`);

  const args = process.argv.slice(2);
  
  if (args.includes('--audit') || args.length === 0) {
    // Mode audit par défaut
    const { missing } = await auditProducts();
    
    if (missing.length > 0 && !args.includes('--audit')) {
      console.log('💡 Pour créer les produits manquants, exécutez:');
      console.log('   npx ts-node scripts/create-all-studio-upsells.ts --create\n');
    }
  }
  
  if (args.includes('--create')) {
    // Créer les produits manquants
    const { missing } = await auditProducts();
    
    if (missing.length === 0) {
      console.log('✨ Tous les produits existent déjà !\n');
    } else {
      console.log(`\n🔨 Création de ${missing.length} produits manquants...\n`);
      await createMissingProducts(missing);
    }
  }
  
  if (args.includes('--all')) {
    // Créer TOUS les produits (attention: peut créer des doublons)
    console.log('⚠️  Mode --all: Création de TOUS les produits (peut créer des doublons)\n');
    await createMissingProducts(ALL_UPSELLS);
  }
}

main().catch(console.error);