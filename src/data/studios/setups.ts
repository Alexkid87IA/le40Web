import { Camera, Mic, Radio, Zap, Headphones, Image, Clapperboard, Monitor } from 'lucide-react';

export const studioSetups = [
  {
    id: 'full-show',
    name: 'Full Show',
    subtitle: 'Talk-show & émissions',
    capacity: '4-8 personnes',
    description: 'Grand plateau 50m² avec décors premium pour émissions professionnelles',
    usage: 'Talk-show, table ronde, émission, quiz',
    basePrice: 119,
    recommendedDuration: '3h',
    popular: true,
    gradient: 'from-blue-600 via-cyan-500 to-blue-600',
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Radio,
    equipment: {
      cameras: '4-6 caméras Sony FX3',
      audio: '8 micros Shure SM7B',
      light: 'Éclairage 3 points + RGB',
      extras: 'Table modulable, décors NV Gallery'
    },
    relevantOptions: ['live-switch', 'extra-cameras', 'buffet', 'transport-gare']
  },
  {
    id: 'intimiste',
    name: 'Intimiste',
    subtitle: 'Interview & podcast vidéo',
    capacity: '2-3 personnes',
    description: 'Setup cosy avec canapé et éclairage cinéma pour interviews intimes',
    usage: 'Interview, podcast vidéo, conversation',
    basePrice: 119,
    recommendedDuration: '1h',
    gradient: 'from-emerald-600 via-teal-500 to-emerald-600',
    image: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Mic,
    equipment: {
      cameras: '2 caméras Sony FX3',
      audio: '3 micros SM7B ou lavaliers',
      light: 'Éclairage doux cinéma',
      extras: 'Canapé design, décor cosy'
    },
    relevantOptions: ['teleprompter', 'color-grading', 'transport-gare']
  },
  {
    id: 'face-cam',
    name: 'Face-cam Solo',
    subtitle: 'YouTube & masterclass',
    capacity: '1 personne',
    description: 'Configuration solo optimisée pour créateurs de contenu',
    usage: 'Vidéo YouTube, cours en ligne, vlog',
    basePrice: 119,
    recommendedDuration: '1h',
    popular: true,
    gradient: 'from-purple-600 via-violet-500 to-purple-600',
    image: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Camera,
    equipment: {
      cameras: '1 caméra Sony FX3 4K',
      audio: '1 micro SM7B sur perche',
      light: 'Key light + rim light',
      extras: 'Fond modulable'
    },
    relevantOptions: ['teleprompter', 'subtitles', 'shorts-pack']
  },
  {
    id: 'tiktok',
    name: 'TikTok Studio',
    subtitle: 'Contenu vertical',
    capacity: '1-2 personnes',
    description: 'Studio optimisé pour formats courts verticaux',
    usage: 'TikTok, Reels, Shorts',
    basePrice: 119,
    recommendedDuration: '1h',
    gradient: 'from-cyan-600 via-blue-500 to-cyan-600',
    image: 'https://images.pexels.com/photos/9786304/pexels-photo-9786304.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Zap,
    equipment: {
      cameras: '1 FX3 montée verticale',
      audio: 'Micro cravate sans fil',
      light: 'Ring light 18" + LED RGB',
      extras: 'Fonds colorés'
    },
    relevantOptions: ['shorts-pack', 'calendar', 'tiktok-boost']
  },
  {
    id: 'podcast-audio',
    name: 'Podcast Audio',
    subtitle: 'Enregistrement pro',
    capacity: '2-4 voix',
    description: 'Studio dédié podcast avec acoustique traitée',
    usage: 'Podcast audio, voix-off, audiobook',
    basePrice: 119,
    recommendedDuration: '1h',
    gradient: 'from-emerald-600 via-teal-500 to-emerald-600',
    image: 'https://images.pexels.com/photos/3784324/pexels-photo-3784324.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Headphones,
    equipment: {
      cameras: 'Vidéo optionnelle (+2 FX3)',
      audio: '4 SM7B → RØDECaster Pro II',
      light: 'Éclairage d\'ambiance',
      extras: 'Table ronde, isolation acoustique'
    },
    relevantOptions: ['motion-podcast', 'thumbnail', 'transport-gare']
  },
  {
    id: 'stream',
    name: 'Stream/Webinaire',
    subtitle: 'Live multi-plateformes',
    capacity: '1-3 personnes',
    description: 'Configuration streaming avec régie live intégrée',
    usage: 'Twitch, webinaire, live YouTube',
    basePrice: 119,
    recommendedDuration: '1h',
    gradient: 'from-violet-600 via-purple-500 to-violet-600',
    image: 'https://images.pexels.com/photos/7129713/pexels-photo-7129713.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Radio,
    equipment: {
      cameras: '2 FX3 + 1 PTZ',
      audio: 'Micro broadcast + retour',
      light: 'Éclairage streaming',
      extras: 'ATEM Mini Pro, OBS'
    },
    relevantOptions: ['live-switch', 'dashboard', 'transport-gare']
  },
  {
    id: 'photo',
    name: 'Studio Photo',
    subtitle: 'Portraits & packshot',
    capacity: '1-4 personnes',
    description: 'Studio photo avec cyclo et éclairage modulable',
    usage: 'Portrait, packshot e-commerce, lookbook',
    basePrice: 119,
    recommendedDuration: '1h',
    gradient: 'from-blue-600 via-indigo-500 to-blue-600',
    image: 'https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Image,
    equipment: {
      cameras: 'Sony A7IV ou FX3',
      audio: 'N/A',
      light: '2 softbox + strip light',
      extras: 'Cyclo blanc/gris/vert'
    },
    relevantOptions: ['extra-backdrop', 'retouching', 'transport-gare']
  },
  {
    id: 'green-screen',
    name: 'Green Screen',
    subtitle: 'VFX & effets spéciaux',
    capacity: '1-4 personnes',
    description: 'Fond vert professionnel avec éclairage uniforme pour incrustation',
    usage: 'VFX, météo, formation, télévision',
    basePrice: 119,
    recommendedDuration: '2h',
    popular: true,
    gradient: 'from-emerald-600 via-green-500 to-emerald-600',
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: Clapperboard,
    equipment: {
      cameras: '2-3 caméras Sony FX3',
      audio: 'Micros HF + perche',
      light: 'Éclairage uniforme fond + sujet',
      extras: 'Cyclo vert 6x4m, prompteur'
    },
    relevantOptions: ['teleprompter', 'extra-cameras', 'color-grading', 'transport-gare']
  }
];
