import { LucideIcon, Zap, Crown, Rocket } from 'lucide-react';

export interface StudioBundle {
  id: string;
  name: string;
  description: string;
  details: string;
  price: number;
  originalPrice: number;
  savings: number;
  unit: string;
  displayPrice: string;
  icon: LucideIcon;
  gradient: string;
  features: string[];
  includedServices: string[];
  popular?: boolean;
  recommended?: boolean;
}

export const studioBundles: StudioBundle[] = [
  {
    id: 'pack-creator-pro',
    name: 'Pack Créateur Pro',
    description: 'Solution complète pour créateurs',
    details: 'Package tout-en-un pour créateurs de contenu avec tournage, montage et distribution',
    price: 1499,
    originalPrice: 2400,
    savings: 901,
    unit: '/mois',
    displayPrice: '1499€/mois',
    icon: Zap,
    gradient: 'from-violet-600 via-fuchsia-600 to-pink-600',
    features: [
      '4 vidéos tournées/mois',
      'Montage premium pour toutes les vidéos',
      '20 clips courts (TikTok/Reels/Shorts)',
      'Session stratégie mensuelle',
      'Distribution multi-plateforme',
      'Copywriting descriptions YouTube',
      'Pack miniatures (12 designs/mois)',
      'Sous-titrage automatique',
      'Analytics & reporting mensuel',
      'Support prioritaire 7j/7',
      'Calendrier éditorial 30 jours',
      'Accès studios en priorité'
    ],
    includedServices: [
      'studio-session-4x',
      'montage-premium',
      'clipping-shorts',
      'content-strategy',
      'multi-platform-distribution',
      'copywriting-youtube',
      'miniatures',
      'sous-titrage',
      'performance-analysis'
    ],
    popular: true,
    recommended: true
  },
  {
    id: 'pack-growth-accelerator',
    name: 'Pack Growth Accelerator',
    description: 'Croissance explosive garantie',
    details: 'Package premium avec accompagnement complet pour scaler votre audience rapidement',
    price: 2999,
    originalPrice: 5200,
    savings: 2201,
    unit: '/mois',
    displayPrice: '2999€/mois',
    icon: Rocket,
    gradient: 'from-rose-600 via-fuchsia-600 to-purple-600',
    features: [
      '8 vidéos tournées/mois',
      'Tout le Pack Créateur Pro inclus',
      'Coaching hebdomadaire personnalisé',
      'Brand identity complète',
      'Newsletter ghostwriting (4/mois)',
      'Gestion Ads multi-plateformes',
      'Budget ads 500€ offert',
      'Campagne cross-promotion',
      'SEO YouTube avancé',
      'Calendrier éditorial 90 jours',
      'Priorité absolue réservations',
      'Déplacement à domicile possible',
      'Expert dédié 24/7',
      'Growth hacking strategies'
    ],
    includedServices: [
      'studio-session-8x',
      'montage-premium',
      'clipping-shorts',
      'content-strategy',
      'camera-coaching',
      'brand-identity',
      'ghostwriting-newsletter',
      'ads-management',
      'cross-promotion',
      'seo-youtube',
      'editorial-calendar',
      'performance-analysis'
    ],
    popular: true,
    recommended: false
  },
  {
    id: 'pack-podcast-pro',
    name: 'Pack Podcast Pro',
    description: 'Pour podcasters ambitieux',
    details: 'Solution complète pour podcasters avec enregistrement, montage et distribution',
    price: 899,
    originalPrice: 1500,
    savings: 601,
    unit: '/mois',
    displayPrice: '899€/mois',
    icon: Crown,
    gradient: 'from-pink-600 via-purple-600 to-violet-600',
    features: [
      '4 épisodes enregistrés/mois',
      'Studio Podcast Audio premium',
      'Montage audio professionnel',
      'Mixage et mastering',
      'Transcription complète',
      'Conversion podcast-to-blog (4 articles)',
      'Distribution multi-plateforme',
      'Clipping 8-12 shorts/mois',
      'Newsletter mensuelle',
      'SEO et optimisation',
      'Analytics détaillés',
      'Promotion réseaux sociaux'
    ],
    includedServices: [
      'studio-podcast-4x',
      'montage-premium',
      'mixage-audio',
      'sous-titrage',
      'podcast-to-blog',
      'multi-platform-distribution',
      'clipping-shorts',
      'ghostwriting-newsletter',
      'seo-youtube',
      'performance-analysis'
    ],
    popular: false,
    recommended: false
  },
  {
    id: 'pack-entrepreneur',
    name: 'Pack Entrepreneur',
    description: 'Personal branding puissant',
    details: 'Package dédié aux entrepreneurs pour construire leur personal brand',
    price: 1899,
    originalPrice: 3100,
    savings: 1201,
    unit: '/mois',
    displayPrice: '1899€/mois',
    icon: Crown,
    gradient: 'from-amber-600 via-orange-600 to-red-600',
    features: [
      '6 contenus vidéo/mois',
      'Brand identity professionnelle',
      'Stratégie de contenu personnalisée',
      'Ghostwriting LinkedIn (12 posts/mois)',
      'Newsletter hebdomadaire',
      'Campagne Ads LinkedIn/YouTube',
      'SEO et optimisation complète',
      '30 posts réseaux sociaux/mois',
      'Coaching présence caméra (2 sessions)',
      'Analytics et reporting',
      'Community management',
      'Growth consulting mensuel'
    ],
    includedServices: [
      'studio-session-6x',
      'montage-premium',
      'brand-identity',
      'content-strategy',
      'ghostwriting-newsletter',
      'ads-management',
      'seo-youtube',
      'multi-platform-distribution',
      'camera-coaching',
      'performance-analysis',
      'cross-promotion'
    ],
    popular: false,
    recommended: true
  },
  {
    id: 'pack-streaming',
    name: 'Pack Streaming Elite',
    description: 'Pour streamers professionnels',
    details: 'Package complet pour streamers Twitch/YouTube avec support technique',
    price: 799,
    originalPrice: 1300,
    savings: 501,
    unit: '/mois',
    displayPrice: '799€/mois',
    icon: Zap,
    gradient: 'from-fuchsia-600 via-pink-600 to-rose-600',
    features: [
      '8h de studio streaming/mois',
      'Setup ATEM permanent',
      'Overlays et graphics personnalisés',
      'Clipping highlights (20/mois)',
      'Montage best-of mensuel',
      'Distribution YouTube/TikTok',
      'Community management Twitch',
      'Optimisation SEO',
      'Miniatures personnalisées',
      'Analytics streaming',
      'Support technique 7j/7',
      'Régie live pour événements'
    ],
    includedServices: [
      'studio-stream-8h',
      'live-switch',
      'incrustation-graphics',
      'clipping-shorts',
      'montage-premium',
      'multi-platform-distribution',
      'miniatures',
      'seo-youtube',
      'performance-analysis'
    ],
    popular: false,
    recommended: false
  },
  {
    id: 'pack-startup',
    name: 'Pack Startup',
    description: 'Lancement et croissance',
    details: 'Package pour startups qui lancent leur stratégie de content marketing',
    price: 2499,
    originalPrice: 4200,
    savings: 1701,
    unit: '/mois',
    displayPrice: '2499€/mois',
    icon: Rocket,
    gradient: 'from-blue-600 via-cyan-600 to-teal-600',
    features: [
      '10 vidéos professionnelles/mois',
      'Brand identity complète',
      'Stratégie marketing 90 jours',
      'Campagnes Ads multi-plateformes',
      'Budget ads 1000€ inclus',
      '40 clips courts/mois',
      'Newsletter bi-hebdomadaire',
      'SEO et content marketing',
      'Landing pages optimisées',
      'Analytics avancés',
      'Growth hacking',
      'Consultant dédié',
      'Formation équipe (2 sessions)',
      'Support 24/7'
    ],
    includedServices: [
      'studio-session-10x',
      'montage-premium',
      'brand-identity',
      'content-strategy',
      'editorial-calendar',
      'ads-management',
      'tiktok-meta-ads',
      'clipping-shorts',
      'ghostwriting-newsletter',
      'seo-youtube',
      'cross-promotion',
      'performance-analysis'
    ],
    popular: true,
    recommended: true
  }
];

export const getBundleById = (id: string): StudioBundle | undefined => {
  return studioBundles.find(bundle => bundle.id === id);
};

export const getRecommendedBundles = (): StudioBundle[] => {
  return studioBundles.filter(bundle => bundle.recommended);
};

export const getPopularBundles = (): StudioBundle[] => {
  return studioBundles.filter(bundle => bundle.popular);
};

export const calculateBundleSavings = (bundle: StudioBundle): number => {
  return Math.round(((bundle.originalPrice - bundle.price) / bundle.originalPrice) * 100);
};
