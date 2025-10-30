import { Camera, Mic, Radio, Zap, Headphones, Smartphone, Tv, Users } from 'lucide-react';

export const studioSetups = [
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
    recommendedDuration: '3h',
    popular: true,
    badge: 'Le plus réservé',
    gradient: 'from-cyan-500 via-blue-500 to-teal-500',
    image: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Camera,
    equipment: {
      cameras: '1 caméra Sony FX3 4K 120fps',
      audio: '1 micro Shure SM7B sur perche',
      light: 'Key light + rim light',
      extras: 'Fond modulable, moniteur de contrôle'
    },
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
    recommendedDuration: '2h',
    gradient: 'from-emerald-500 via-teal-500 to-green-500',
    image: 'https://images.pexels.com/photos/3784324/pexels-photo-3784324.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Mic,
    equipment: {
      cameras: 'Vidéo optionnelle (+2 FX3)',
      audio: '4 micros Shure SM7B + RØDECaster Pro II',
      light: 'Éclairage d\'ambiance',
      extras: 'Table ronde, isolation acoustique'
    },
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
    badge: 'Multi-plateformes',
    gradient: 'from-cyan-500 via-blue-500 to-teal-500',
    image: 'https://images.pexels.com/photos/7129713/pexels-photo-7129713.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Radio,
    equipment: {
      cameras: '2 Sony FX3 + 1 PTZ robotisée',
      audio: 'Micro broadcast + retour',
      light: 'Éclairage streaming RGB',
      extras: 'ATEM Mini Pro, OBS configuré'
    },
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
    recommendedDuration: '3h',
    gradient: 'from-cyan-500 via-blue-500 to-teal-500',
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Tv,
    equipment: {
      cameras: '4-6 caméras Sony FX3',
      audio: '8 micros Shure SM7B',
      light: 'Éclairage 3 points + RGB',
      extras: 'Table modulable, décors NV Gallery'
    },
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
    recommendedDuration: '2h',
    gradient: 'from-emerald-500 via-teal-500 to-green-500',
    image: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Users,
    equipment: {
      cameras: '2 caméras Sony FX3',
      audio: '3 micros SM7B ou lavaliers',
      light: 'Éclairage doux cinéma',
      extras: 'Canapé design, décor cosy'
    },
    perfectFor: ['Interviews', 'Podcasts vidéo', 'Conversations'],
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
    badge: 'Express',
    recommendedDuration: '1h',
    gradient: 'from-cyan-500 via-blue-500 to-teal-500',
    image: 'https://images.pexels.com/photos/9786304/pexels-photo-9786304.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Smartphone,
    equipment: {
      cameras: '1 Sony FX3 montée verticale',
      audio: 'Micro cravate sans fil',
      light: 'Ring light 18" Neewer + LED RGB',
      extras: 'Fonds colorés modulables'
    },
    perfectFor: ['TikTok', 'Instagram Reels', 'YouTube Shorts', 'Stories'],
    relevantOptions: ['montage-pro', 'camera-extra', 'transport-gare']
  },
];

export const launchOfferConfig = {
  totalSlots: 50,
  remainingSlots: 37,
  discountPercentage: 40,
  expiryDate: null,
  isActive: true
};

export const degressivePricing = [
  { hours: 1, discount: 0, label: '1h' },
  { hours: 2, discount: 0.08, label: '2h' },
  { hours: 3, discount: 0.10, label: '3h', recommended: true },
  { hours: 4, discount: 0.16, label: '4h' },
  { hours: 8, discount: 0.26, label: 'Journée (8h)' }
];

export const equipmentShowcase = [
  {
    category: 'Caméras',
    icon: 'Camera',
    items: [
      { name: 'Sony FX3 4K 120fps', value: 4500, description: 'Le standard des créateurs pro' }
    ],
    description: 'PTZ robotisées pour streams'
  },
  {
    category: 'Audio',
    icon: 'Mic',
    items: [
      { name: 'Shure SM7B (x8)', value: 450, description: 'La voix des plus grands podcasts' },
      { name: 'RØDECaster Pro II', value: 699, description: 'Console broadcast professionnelle' }
    ]
  },
  {
    category: 'Lumières',
    icon: 'Lightbulb',
    items: [
      { name: 'Softbox ARRI', value: 800, description: 'Éclairage cinéma professionnel' },
      { name: 'LED RGB Aputure', value: 650 },
      { name: 'Ring Light 18" Neewer', value: 200 }
    ]
  },
  {
    category: 'Régie',
    icon: 'Monitor',
    items: [
      { name: 'ATEM Mini Pro', value: 495, description: 'Diffusion broadcast en direct' },
      { name: 'Téléprompter 15"', value: 350 },
      { name: 'Moniteurs de contrôle', value: 400 }
    ]
  }
];
