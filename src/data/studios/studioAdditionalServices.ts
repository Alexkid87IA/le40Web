import { Film, Monitor, Camera, Radio, Car, Scissors, Image, FileVideo, Subtitles, Palette, Wand2, Sparkles, Video, Headphones, Zap, LucideIcon } from 'lucide-react';

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
  category: 'post-production' | 'equipement' | 'services';
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
  }
];
