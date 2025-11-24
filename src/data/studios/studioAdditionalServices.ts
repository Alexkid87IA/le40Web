import { Film, Monitor, Camera, Radio, Car, Scissors, Image, FileVideo, Subtitles, Palette, Wand2, Sparkles, Video, Headphones, Zap, FileText, TrendingUp, Target, LineChart, Megaphone, PenTool, Lightbulb, Users, Award, Crown, LucideIcon } from 'lucide-react';

export interface StudioAdditionalService {
  id: string;
  name: string;
  description: string;
  details: string;
  price: number;
  unit: string;
  displayPrice: string;
  icon: LucideIcon;
  gradient: string;
  features: string[];
  popular?: boolean;
  category: 'post-production' | 'equipement' | 'services' | 'expert';
}

export const studioAdditionalServices: StudioAdditionalService[] = [
  {
    id: 'montage-basique',
    name: 'Montage Basique',
    description: 'Simple et efficace',
    details: 'Cuts simples, exports standards. Idéal pour contenu simple sans effets.',
    price: 49,
    unit: '/h de rush',
    displayPrice: '49€/h de rush',
    icon: Scissors,
    gradient: 'from-zinc-600 to-gray-600',
    features: [
      'Cuts simples',
      'Assemblage de séquences',
      'Export standard HD/4K',
      'Livraison 5-7 jours',
      'Format au choix',
      '1 révision mineure'
    ],
    category: 'post-production'
  },
  {
    id: 'montage-standard',
    name: 'Montage Standard',
    description: 'Pour YouTube/Podcast',
    details: 'Montage pro avec transitions, titres, ajustements audio basiques. Parfait pour contenu régulier.',
    price: 79,
    unit: '/h de rush',
    displayPrice: '79€/h de rush',
    icon: Film,
    gradient: 'from-blue-600 to-cyan-600',
    features: [
      'Cuts et transitions',
      'Titres et sous-titres',
      'Correction audio basique',
      'Color grading léger',
      '2 révisions incluses',
      'Livraison 5 jours',
      'Formats optimisés réseaux',
      'Miniature YouTube incluse'
    ],
    popular: true,
    category: 'post-production'
  },
  {
    id: 'montage-premium',
    name: 'Montage Premium',
    description: 'Qualité cinématique',
    details: 'Montage avancé avec effets visuels, motion design, color grading pro, mixage audio complet.',
    price: 120,
    unit: '/h de rush',
    displayPrice: '120€/h de rush',
    icon: Sparkles,
    gradient: 'from-rose-600 to-fuchsia-600',
    features: [
      'Montage avancé multi-caméras',
      'Motion design et animations',
      'Color grading professionnel',
      'Mixage audio complet',
      'Effets visuels sur mesure',
      '3 révisions incluses',
      'Livraison 3-5 jours',
      'Formats multiples + miniatures'
    ],
    popular: true,
    category: 'post-production'
  },
  {
    id: 'derushage',
    name: 'Dérushage',
    description: 'Sélection des meilleurs moments',
    details: 'Visionnage complet et sélection des meilleures prises. Export des séquences retenues.',
    price: 35,
    unit: '/h de rush',
    displayPrice: '35€/h de rush',
    icon: FileVideo,
    gradient: 'from-amber-600 to-orange-600',
    features: [
      'Visionnage complet',
      'Sélection des meilleurs plans',
      'Marquage des timecodes',
      'Notes et commentaires',
      'Export séquences sélectionnées',
      'Gain de temps montage',
      'Livraison 48h'
    ],
    category: 'post-production'
  },
  {
    id: 'editorialisation',
    name: 'Éditorialisation',
    description: 'Structure et storytelling',
    details: 'Restructuration narrative, storytelling, rythme optimisé pour engagement maximal.',
    price: 89,
    unit: '/vidéo',
    displayPrice: '89€/vidéo',
    icon: Wand2,
    gradient: 'from-violet-600 to-purple-600',
    features: [
      'Analyse du contenu brut',
      'Restructuration narrative',
      'Optimisation du rythme',
      'Hooks et accroches',
      'Storytelling optimisé',
      'Conseils éditoriaux',
      'Livraison 3 jours'
    ],
    category: 'post-production'
  },
  {
    id: 'sous-titrage',
    name: 'Sous-titrage (SST)',
    description: 'Français ou Anglais',
    details: 'Sous-titres synchronisés professionnels. Formats SRT, VTT ou burn-in.',
    price: 45,
    unit: '/h de vidéo',
    displayPrice: '45€/h',
    icon: Subtitles,
    gradient: 'from-green-600 to-emerald-600',
    features: [
      'Transcription complète',
      'Synchronisation précise',
      'Corrections orthographiques',
      'Format SRT/VTT/Burn-in',
      'Français ou Anglais',
      '1 révision incluse',
      'Livraison 48-72h'
    ],
    category: 'post-production'
  },
  {
    id: 'miniatures',
    name: 'Pack Miniatures',
    description: '3 propositions créatives',
    details: 'Design de miniatures YouTube professionnelles. 3 variations créatives avec révisions.',
    price: 39,
    unit: '/pack de 3',
    displayPrice: '39€/pack',
    icon: Image,
    gradient: 'from-pink-600 to-rose-600',
    features: [
      '3 miniatures créatives',
      'Design professionnel',
      'Formats YouTube optimisés',
      'Typographie impactante',
      'Couleurs accrocheuses',
      '2 révisions par miniature',
      'Livraison 24-48h',
      'Fichiers sources inclus'
    ],
    popular: true,
    category: 'post-production'
  },
  {
    id: 'clipping-shorts',
    name: 'Pack Clipping Shorts',
    description: 'Contenu court optimisé',
    details: 'Extraction et optimisation de 5-10 clips courts pour TikTok/Reels/Shorts depuis votre contenu long.',
    price: 149,
    unit: '/pack',
    displayPrice: '149€/pack',
    icon: Video,
    gradient: 'from-fuchsia-600 to-pink-600',
    features: [
      '5-10 clips courts (30-60s)',
      'Sélection des meilleurs moments',
      'Format vertical 9:16',
      'Sous-titres auto inclus',
      'Hooks optimisés',
      'Transitions dynamiques',
      'Miniatures pour chaque clip',
      'Livraison 3-5 jours'
    ],
    popular: true,
    category: 'post-production'
  },
  {
    id: 'incrustation-graphics',
    name: 'Incrustations Graphiques',
    description: 'Lower thirds, logos, etc.',
    details: 'Création et intégration de packages graphiques sur mesure. Lower thirds, logos, transitions.',
    price: 79,
    unit: '/package',
    displayPrice: '79€/package',
    icon: Palette,
    gradient: 'from-cyan-600 to-blue-600',
    features: [
      'Lower thirds animés',
      'Logo et watermark',
      'Transitions graphiques',
      'Templates réutilisables',
      'Charte graphique respectée',
      'Animations fluides',
      '2 révisions incluses',
      'Livraison 48h'
    ],
    category: 'post-production'
  },
  {
    id: 'mixage-audio',
    name: 'Mixage Audio Pro',
    description: 'Son professionnel',
    details: 'Nettoyage audio, égalisation, compression, réduction de bruit, mixage stéréo/5.1.',
    price: 55,
    unit: '/h de vidéo',
    displayPrice: '55€/h',
    icon: Headphones,
    gradient: 'from-indigo-600 to-purple-600',
    features: [
      'Nettoyage et réduction bruit',
      'Égalisation professionnelle',
      'Compression dynamique',
      'Normalisation des niveaux',
      'Mixage stéréo ou 5.1',
      'Mastering final',
      '1 révision incluse',
      'Livraison 48h'
    ],
    category: 'post-production'
  },
  {
    id: 'stabilisation-tracking',
    name: 'Stabilisation & Tracking',
    description: 'Vidéos ultra-stables',
    details: 'Stabilisation avancée des plans tremblants, tracking d\'objets et caméra pour effets spéciaux.',
    price: 65,
    unit: '/h de rush',
    displayPrice: '65€/h',
    icon: Zap,
    gradient: 'from-yellow-600 to-orange-600',
    features: [
      'Stabilisation warp avancée',
      'Tracking de points précis',
      'Correction de perspectives',
      'Suppression de rolling shutter',
      'Masquage intelligent',
      'Export haute qualité',
      '1 révision incluse',
      'Livraison 3-5 jours'
    ],
    category: 'post-production'
  },
  {
    id: 'teleprompter',
    name: 'Téléprompter',
    description: 'Essentiel formations',
    details: 'Téléprompter 15" avec iPad pour des présentations fluides',
    price: 15,
    unit: '/h',
    displayPrice: '15€/h',
    icon: Monitor,
    gradient: 'from-fuchsia-600 to-purple-600',
    features: [
      'Écran 15 pouces',
      'iPad avec app dédiée',
      'Vitesse ajustable',
      'Télécommande incluse',
      'Installation comprise',
      'Placement optimal',
      'Support technique',
      'Script pré-chargé'
    ],
    category: 'equipement'
  },
  {
    id: 'camera-extra',
    name: 'Caméra Extra',
    description: 'Angle supplémentaire',
    details: 'Caméra Sony FX3 supplémentaire pour angle additionnel',
    price: 25,
    unit: '/h',
    displayPrice: '25€/h',
    icon: Camera,
    gradient: 'from-purple-600 to-violet-600',
    features: [
      'Sony FX3 4K',
      'Angle supplémentaire',
      'Synchronisation automatique',
      'Opérateur inclus',
      'Stabilisation intégrée',
      'Objectif adapté',
      'Enregistrement simultané',
      'Post-production facilitée'
    ],
    category: 'equipement'
  },
  {
    id: 'live-switch',
    name: 'Live-Switch ATEM',
    description: 'Diffusion multi-plateformes',
    details: 'ATEM Mini Pro pour diffusion simultanée sur Twitch, YouTube et LinkedIn',
    price: 35,
    unit: '/h',
    displayPrice: '35€/h',
    icon: Radio,
    gradient: 'from-pink-600 to-rose-600',
    features: [
      'ATEM Mini Pro',
      'Multi-streaming',
      'Twitch + YouTube + LinkedIn',
      'Régie temps réel',
      'Incrustations graphiques',
      'Chat overlay',
      'Technicien dédié',
      'Bande passante garantie'
    ],
    popular: true,
    category: 'equipement'
  },
  {
    id: 'transport-gare',
    name: 'Navette Gare',
    description: 'Saint-Charles ↔ Studio',
    details: 'Transport aller-retour depuis la gare Saint-Charles',
    price: 20,
    unit: 'A/R',
    displayPrice: '20€ A/R',
    icon: Car,
    gradient: 'from-violet-600 to-fuchsia-600',
    features: [
      'Depuis gare Saint-Charles',
      'Aller-retour inclus',
      'Véhicule confortable',
      'Chauffeur professionnel',
      'Ponctualité garantie',
      'Aide bagages/matériel',
      'Climatisation',
      'Réservation flexible'
    ],
    category: 'services'
  },
  {
    id: 'script-writing',
    name: 'Rédaction Script Vidéo',
    description: 'Script professionnel optimisé',
    details: 'Script structuré avec hooks, storytelling et CTAs optimisés pour téléprompter',
    price: 149,
    unit: '/script',
    displayPrice: '149€/script',
    icon: FileText,
    gradient: 'from-cyan-600 to-blue-600',
    features: [
      'Structure narrative complète (intro, corps, outro)',
      'Hooks accrocheurs',
      'CTAs optimisés',
      'Format téléprompter inclus',
      '2 révisions incluses',
      'Conseils de présentation',
      'Livraison 48h',
      'Templates réutilisables'
    ],
    popular: true,
    category: 'expert'
  },
  {
    id: 'copywriting-youtube',
    name: 'Copywriting Description YouTube',
    description: 'Description SEO optimisée',
    details: 'Description complète optimisée pour le référencement YouTube avec CTAs stratégiques',
    price: 79,
    unit: '/vidéo',
    displayPrice: '79€/vidéo',
    icon: PenTool,
    gradient: 'from-red-600 to-pink-600',
    features: [
      'Description optimisée SEO',
      'Timestamps structurés',
      'Liens et CTAs stratégiques',
      'Hashtags pertinents',
      'Checklist optimisation',
      'Keywords intégrés',
      'Format complet',
      'Livraison 24h'
    ],
    category: 'expert'
  },
  {
    id: 'titles-pack',
    name: 'Pack Titres Optimisés',
    description: '10 variations testées',
    details: 'Pack de 10 variations de titres optimisés pour maximiser le CTR',
    price: 49,
    unit: '/pack de 10',
    displayPrice: '49€/pack',
    icon: Sparkles,
    gradient: 'from-yellow-600 to-orange-600',
    features: [
      '10 variations de titres',
      'A/B testing recommandé',
      'Optimisation CTR',
      'Emojis stratégiques',
      'Analyse mots-clés',
      'Psychologie persuasive',
      'Format court et long',
      'Livraison immédiate'
    ],
    category: 'expert'
  },
  {
    id: 'content-strategy',
    name: 'Consultation Stratégie Contenu',
    description: 'Session stratégique 2h',
    details: 'Audit complet et plan stratégique personnalisé avec un expert contenu',
    price: 299,
    unit: '/session 2h',
    displayPrice: '299€/session',
    icon: Target,
    gradient: 'from-violet-600 to-purple-600',
    features: [
      'Audit de votre chaîne/contenu',
      'Analyse de la concurrence',
      'Plan éditorial 30 jours',
      'Recommandations personnalisées',
      'Calendrier de publication',
      'Objectifs SMART définis',
      'Session Zoom/présentiel',
      'Support 7 jours post-session'
    ],
    popular: true,
    category: 'expert'
  },
  {
    id: 'editorial-calendar',
    name: 'Calendrier Éditorial 90 jours',
    description: 'Plan de contenu complet',
    details: '90 jours de contenu planifié avec thèmes, sujets et briefings détaillés',
    price: 499,
    unit: '/90 jours',
    displayPrice: '499€',
    icon: Lightbulb,
    gradient: 'from-amber-600 to-yellow-600',
    features: [
      '90 jours de contenu planifié',
      'Thèmes et sujets définis',
      'Saisonnalité intégrée',
      'Trending topics identifiés',
      'Format Notion/Trello/Asana',
      'Briefing pour chaque contenu',
      'Calendrier visuel',
      'Mises à jour mensuelles'
    ],
    category: 'expert'
  },
  {
    id: 'performance-analysis',
    name: 'Analyse de Performance',
    description: 'Rapport mensuel détaillé',
    details: 'Dashboard analytics personnalisé avec KPIs, insights et recommandations actionnables',
    price: 199,
    unit: '/mois',
    displayPrice: '199€/mois',
    icon: LineChart,
    gradient: 'from-green-600 to-emerald-600',
    features: [
      'Dashboard analytics personnalisé',
      'Rapport mensuel détaillé',
      'Recommandations d\'optimisation',
      'Tracking KPIs clés',
      'Insights actionnables',
      'Comparatifs période',
      'Réunion mensuelle 1h',
      'Alertes opportunités'
    ],
    category: 'expert'
  },
  {
    id: 'seo-youtube',
    name: 'Optimisation SEO YouTube',
    description: 'Référencement complet',
    details: 'Optimisation complète de votre vidéo pour maximiser sa visibilité sur YouTube',
    price: 179,
    unit: '/vidéo',
    displayPrice: '179€/vidéo',
    icon: TrendingUp,
    gradient: 'from-red-600 to-orange-600',
    features: [
      'Recherche mots-clés avancée',
      'Titre optimisé SEO',
      'Description complète',
      'Tags stratégiques (30+)',
      'Miniature A/B testée',
      'Cards & End screens',
      'Chapitres optimisés',
      'Playlist recommendations'
    ],
    popular: true,
    category: 'expert'
  },
  {
    id: 'multi-platform-distribution',
    name: 'Distribution Multi-Plateforme',
    description: 'Présence maximale',
    details: 'Adaptation et distribution de votre contenu sur 5+ plateformes avec optimisations natives',
    price: 149,
    unit: '/contenu',
    displayPrice: '149€/contenu',
    icon: Megaphone,
    gradient: 'from-fuchsia-600 to-pink-600',
    features: [
      'Adaptation TikTok, Reels, Shorts, LinkedIn',
      'Textes personnalisés par plateforme',
      'Hashtags optimisés',
      'Programmation automatique',
      'Formats adaptés (9:16, 1:1, 16:9)',
      '5+ plateformes',
      'Analytics centralisés',
      'Best times to post'
    ],
    popular: true,
    category: 'expert'
  },
  {
    id: 'cross-promotion',
    name: 'Campagne Cross-Promotion',
    description: 'Amplification virale',
    details: 'Stratégie complète de cross-promotion pour maximiser la portée de votre contenu',
    price: 299,
    unit: '/campagne',
    displayPrice: '299€/campagne',
    icon: Users,
    gradient: 'from-blue-600 to-cyan-600',
    features: [
      'Stratégie cross-promo',
      'Posts engageants (5+)',
      'Stories/Reels de teasing',
      'Community management',
      'Réponses aux commentaires 48h',
      'Newsletter si applicable',
      'Collaboration influenceurs',
      'Reporting détaillé'
    ],
    category: 'expert'
  },
  {
    id: 'youtube-ads-setup',
    name: 'Setup Campagne YouTube Ads',
    description: 'Lancement publicitaire',
    details: 'Configuration complète de votre première campagne YouTube Ads avec audience targeting',
    price: 399,
    unit: 'one-time',
    displayPrice: '399€',
    icon: Target,
    gradient: 'from-red-600 to-rose-600',
    features: [
      'Création compte publicitaire',
      'Audience targeting avancé',
      '3 variations créatives',
      'Budget optimization',
      'Tracking & pixels',
      'Formation 1h incluse',
      'Guide complet',
      'Support 30 jours'
    ],
    category: 'expert'
  },
  {
    id: 'ads-management',
    name: 'Gestion Ads Mensuelle',
    description: 'Expert dédié',
    details: 'Gestion complète de vos campagnes publicitaires avec optimisation quotidienne',
    price: 499,
    unit: '/mois + budget ads',
    displayPrice: '499€/mois',
    icon: Crown,
    gradient: 'from-purple-600 to-fuchsia-600',
    features: [
      'Gestion complète multi-plateformes',
      'Tests A/B continus',
      'Optimisation quotidienne',
      'Rapport hebdomadaire',
      'Scaling stratégique',
      'ROI tracking transparent',
      'Réunion mensuelle',
      'Expert dédié'
    ],
    popular: true,
    category: 'expert'
  },
  {
    id: 'tiktok-meta-ads',
    name: 'Campagne TikTok/Meta Ads',
    description: 'Multi-plateformes',
    details: 'Setup et gestion de campagnes sur TikTok et Meta (Facebook/Instagram)',
    price: 599,
    unit: 'setup + 399€/mois',
    displayPrice: '599€ + 399€/mois',
    icon: Sparkles,
    gradient: 'from-pink-600 to-rose-600',
    features: [
      'Setup multi-plateformes',
      'Audiences lookalike',
      'Retargeting pixels',
      'Créatives adaptées',
      'Budget allocation smart',
      'Reporting transparent',
      'Tests créatifs',
      'Scaling automatique'
    ],
    category: 'expert'
  },
  {
    id: 'camera-coaching',
    name: 'Coaching Caméra & Présence',
    description: 'Confiance face caméra',
    details: 'Session intensive pour développer votre aisance et votre présence à l\'écran',
    price: 249,
    unit: '/session 2h',
    displayPrice: '249€/session',
    icon: Video,
    gradient: 'from-indigo-600 to-purple-600',
    features: [
      'Techniques de présentation',
      'Langage corporel',
      'Confiance face caméra',
      'Élocution et rythme',
      'Exercices pratiques',
      'Enregistrement feedback',
      'Plan d\'amélioration personnalisé',
      'Support 14 jours'
    ],
    category: 'expert'
  },
  {
    id: 'brand-identity',
    name: 'Brand Identity Package',
    description: 'Identité visuelle complète',
    details: 'Package complet d\'identité de marque pour votre chaîne/business',
    price: 799,
    unit: '/package',
    displayPrice: '799€',
    icon: Award,
    gradient: 'from-rose-600 to-pink-600',
    features: [
      'Logo professionnel',
      'Charte graphique complète',
      'Templates réseaux sociaux (20+)',
      'Intro/Outro vidéo animée',
      'Lower thirds brandés',
      'Style guide complet',
      'Fichiers sources',
      '3 révisions majeures'
    ],
    popular: true,
    category: 'expert'
  },
  {
    id: 'ghostwriting-newsletter',
    name: 'Ghostwriting Newsletter',
    description: 'Rédaction hebdomadaire',
    details: 'Rédaction professionnelle de votre newsletter hebdomadaire avec storytelling',
    price: 299,
    unit: '/mois (4 newsletters)',
    displayPrice: '299€/mois',
    icon: FileText,
    gradient: 'from-blue-600 to-indigo-600',
    features: [
      'Rédaction hebdomadaire',
      'Storytelling engageant',
      'CTAs optimisés',
      'Design template',
      'Intégration Beehiiv/Substack',
      'Gestion communauté',
      'Analytics mensuel',
      'Stratégie growth'
    ],
    category: 'expert'
  },
  {
    id: 'podcast-to-blog',
    name: 'Podcast-to-Blog Conversion',
    description: 'Contenu réutilisé',
    details: 'Transformation de votre podcast en article de blog optimisé SEO',
    price: 149,
    unit: '/épisode',
    displayPrice: '149€/épisode',
    icon: FileVideo,
    gradient: 'from-purple-600 to-violet-600',
    features: [
      'Transcription complète',
      'Article de blog SEO (1500+ mots)',
      'Citations extraites',
      'Images illustratives (3+)',
      'Meta descriptions',
      'Partage social ready',
      'Internal linking',
      'CTA intégrés'
    ],
    category: 'expert'
  }
];
