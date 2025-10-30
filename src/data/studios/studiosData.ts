import { Camera, Mic, Radio, Tv, Users, Smartphone, LucideIcon } from 'lucide-react';

export interface Studio {
  id: string;
  name: string;
  subtitle: string;
  capacity: string;
  description: string;
  usage: string;
  basePrice: number;
  launchPrice: number;
  savings: number;
  priceUnit: string;
  recommendedDuration: string;
  popular?: boolean;
  badge?: string;
  gradient: string;
  image: string;
  icon: LucideIcon;
  equipment: {
    cameras: string;
    audio: string;
    light: string;
    extras: string;
  };
  perfectFor: string[];
  features: string[];
  relevantOptions: string[];
}

export const studios: Studio[] = [
  {
    id: 'face-cam',
    name: 'Face-Cam Solo',
    subtitle: 'YouTube • Formation • Vlog',
    capacity: '1 personne',
    description: 'Configuration solo optimisée pour créateurs de contenu',
    usage: 'YouTube, formation, vlog',
    basePrice: 99,
    launchPrice: 59,
    savings: 40,
    priceUnit: '/heure',
    recommendedDuration: '3h',
    popular: true,
    badge: 'Le plus réservé',
    gradient: 'from-rose-500 via-fuchsia-500 to-violet-500',
    image: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Camera,
    equipment: {
      cameras: '1 caméra Sony FX3 4K 120fps',
      audio: '1 micro Shure SM7B sur perche',
      light: 'Key light + rim light',
      extras: 'Fond modulable, moniteur de contrôle'
    },
    features: [
      'Sony FX3 4K 120fps',
      'Micro Shure SM7B',
      'Éclairage 3 points',
      'Fond vert/blanc',
      'Moniteur contrôle',
      'Technicien sur place',
      'Transfert rushs immédiat',
      'Wi-Fi fibre 1Gb/s'
    ],
    perfectFor: ['Vidéos YouTube', 'Formations en ligne', 'Vlogs', 'Présentations'],
    relevantOptions: ['montage-pro', 'teleprompter', 'camera-extra']
  },
  {
    id: 'podcast-audio',
    name: 'Podcast Audio',
    subtitle: 'Podcast • Interview • Voice-over',
    capacity: '2-4 voix',
    description: 'Studio dédié podcast avec acoustique traitée',
    usage: 'Podcast, interview, voice-over',
    basePrice: 89,
    launchPrice: 54,
    savings: 35,
    priceUnit: '/heure',
    recommendedDuration: '2h',
    gradient: 'from-pink-500 via-purple-500 to-violet-600',
    image: 'https://images.pexels.com/photos/3784324/pexels-photo-3784324.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Mic,
    equipment: {
      cameras: 'Vidéo optionnelle (+2 FX3)',
      audio: '4 micros Shure SM7B + RØDECaster Pro II',
      light: 'Éclairage d\'ambiance',
      extras: 'Table ronde, isolation acoustique'
    },
    features: [
      '4 micros Shure SM7B',
      'RØDECaster Pro II',
      'Isolation acoustique premium',
      'Table ronde professionnelle',
      'Caméras optionnelles',
      'Casques monitoring',
      'Enregistrement multi-pistes',
      'Post-production disponible'
    ],
    perfectFor: ['Podcasts audio', 'Interviews', 'Voice-over', 'Audiobooks'],
    relevantOptions: ['montage-pro', 'teleprompter', 'transport-gare']
  },
  {
    id: 'stream',
    name: 'Live Twitch/YouTube',
    subtitle: 'Stream • Webinaire • Live',
    capacity: '1-3 personnes',
    description: 'Configuration streaming avec régie live intégrée',
    usage: 'Stream, webinaire, live',
    basePrice: 129,
    launchPrice: 79,
    savings: 50,
    priceUnit: '/heure',
    badge: 'Multi-plateformes',
    gradient: 'from-fuchsia-600 via-pink-600 to-rose-600',
    image: 'https://images.pexels.com/photos/7129713/pexels-photo-7129713.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Radio,
    equipment: {
      cameras: '2 Sony FX3 + 1 PTZ robotisée',
      audio: 'Micro broadcast + retour',
      light: 'Éclairage streaming RGB',
      extras: 'ATEM Mini Pro, OBS configuré'
    },
    features: [
      '3 caméras multi-angles',
      'ATEM Mini Pro',
      'Régie live intégrée',
      'Streaming multi-plateformes',
      'Chat overlay temps réel',
      'Green screen pro',
      'OBS Studio pré-configuré',
      'Bande passante dédiée'
    ],
    perfectFor: ['Streaming Twitch', 'Lives YouTube', 'Webinaires', 'Events en ligne'],
    relevantOptions: ['live-switch', 'camera-extra', 'transport-gare']
  },
  {
    id: 'full-show',
    name: 'Émission/Talk-Show',
    subtitle: 'Émission • Table ronde • Show',
    capacity: '4-8 personnes',
    description: 'Grand plateau 50m² avec décors premium pour émissions professionnelles',
    usage: 'Émission, table ronde, show',
    basePrice: 199,
    launchPrice: 119,
    savings: 80,
    priceUnit: '/heure',
    recommendedDuration: '3h',
    gradient: 'from-rose-600 via-fuchsia-600 to-purple-600',
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Tv,
    equipment: {
      cameras: '4-6 caméras Sony FX3',
      audio: '8 micros Shure SM7B',
      light: 'Éclairage 3 points + RGB',
      extras: 'Table modulable, décors NV Gallery'
    },
    features: [
      '6 caméras professionnelles',
      '8 micros broadcast',
      'Plateau 50m²',
      'Décors NV Gallery',
      'Éclairage cinéma',
      'Régie complète',
      'Table modulable sur-mesure',
      'Maquillage disponible'
    ],
    perfectFor: ['Émissions TV', 'Talk-shows', 'Tables rondes', 'Shows'],
    relevantOptions: ['live-switch', 'camera-extra', 'montage-pro', 'transport-gare']
  },
  {
    id: 'intimiste',
    name: 'Interview Intimiste',
    subtitle: 'Interview • Podcast vidéo',
    capacity: '2-3 personnes',
    description: 'Setup cosy avec canapé et éclairage cinéma pour interviews intimes',
    usage: 'Interview, podcast vidéo',
    basePrice: 139,
    launchPrice: 84,
    savings: 55,
    priceUnit: '/heure',
    recommendedDuration: '2h',
    gradient: 'from-purple-500 via-violet-500 to-fuchsia-500',
    image: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Users,
    equipment: {
      cameras: '2 caméras Sony FX3',
      audio: '3 micros SM7B ou lavaliers',
      light: 'Éclairage doux cinéma',
      extras: 'Canapé design, décor cosy'
    },
    features: [
      '2 caméras cinéma',
      'Éclairage doux',
      'Canapé design',
      'Décor intimiste',
      'Micros cravate discrets',
      'Ambiance chaleureuse',
      'Table basse modulable',
      'Accessoires déco'
    ],
    perfectFor: ['Interviews', 'Podcasts vidéo', 'Conversations', 'Témoignages'],
    relevantOptions: ['montage-pro', 'teleprompter', 'transport-gare']
  },
  {
    id: 'vertical-social',
    name: 'Vertical Social',
    subtitle: 'TikTok • Reels • Shorts',
    capacity: '1-2 personnes',
    description: 'Studio optimisé pour formats courts verticaux',
    usage: 'TikTok, Reels, Shorts',
    basePrice: 79,
    launchPrice: 49,
    savings: 30,
    priceUnit: '/heure',
    badge: 'Express',
    recommendedDuration: '1h',
    gradient: 'from-fuchsia-500 via-rose-500 to-pink-500',
    image: 'https://images.pexels.com/photos/9786304/pexels-photo-9786304.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Smartphone,
    equipment: {
      cameras: '1 Sony FX3 montée verticale',
      audio: 'Micro cravate sans fil',
      light: 'Ring light 18" Neewer + LED RGB',
      extras: 'Fonds colorés modulables'
    },
    features: [
      'Format vertical natif',
      'Ring light 18"',
      'LED RGB personnalisables',
      'Fonds modulables',
      'Micro cravate',
      'Setup rapide',
      'Export optimisé mobile',
      'Tournage multi-contenus'
    ],
    perfectFor: ['TikTok', 'Instagram Reels', 'YouTube Shorts', 'Stories'],
    relevantOptions: ['montage-pro', 'camera-extra', 'transport-gare']
  }
];

export const launchOfferConfig = {
  totalSlots: 50,
  remainingSlots: 37,
  discountPercentage: 40,
  expiryDate: null,
  isActive: true
};
