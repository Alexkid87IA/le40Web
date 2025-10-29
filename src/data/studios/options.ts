import { Layers, Camera, Monitor, Palette, Zap, Film, Image, Calendar, Utensils, Car } from 'lucide-react';

export const optionsCatalog = {
  'live-switch': {
    name: 'Live-Switch ATEM',
    price: 149,
    unit: '/h',
    description: 'Master monté en direct',
    icon: Layers,
    recommended: true
  },
  'extra-cameras': {
    name: '2 caméras supplémentaires',
    price: 98,
    unit: '/h',
    description: 'Angles additionnels',
    icon: Camera
  },
  'teleprompter': {
    name: 'Téléprompteur + iPad',
    price: 25,
    unit: '/h',
    description: 'Pour discours fluide',
    icon: Monitor
  },
  'color-grading': {
    name: 'Color grading cinéma',
    price: 99,
    unit: 'fixe',
    description: 'Look professionnel',
    icon: Palette
  },
  'subtitles': {
    name: 'Sous-titres dynamiques',
    price: 49,
    unit: 'fixe',
    description: 'Style viral',
    icon: Monitor
  },
  'shorts-pack': {
    name: 'Pack 3 Shorts',
    price: 149,
    unit: 'fixe',
    description: 'Formats courts optimisés',
    icon: Zap,
    popular: true
  },
  'motion-podcast': {
    name: 'Habillage motion',
    price: 99,
    unit: '/min',
    description: 'Intro/outro animés',
    icon: Film
  },
  'thumbnail': {
    name: 'Miniature YouTube',
    price: 35,
    unit: 'fixe',
    description: 'Design clickable',
    icon: Image
  },
  'calendar': {
    name: 'Calendrier 30j',
    price: 299,
    unit: 'fixe',
    description: 'Planification contenu',
    icon: Calendar
  },
  'tiktok-boost': {
    name: 'Boost TikTok 50k',
    price: 219,
    unit: 'fixe',
    description: 'Promotion ciblée',
    icon: Zap
  },
  'dashboard': {
    name: 'Dashboard analytics',
    price: 99,
    unit: '/mois',
    description: 'Suivi performance',
    icon: Monitor
  },
  'extra-backdrop': {
    name: 'Fond supplémentaire',
    price: 10,
    unit: 'fixe',
    description: 'Changement décor',
    icon: Image
  },
  'retouching': {
    name: 'Retouche pro',
    price: 5,
    unit: '/photo',
    description: 'Post-traitement',
    icon: Palette
  },
  'buffet': {
    name: 'Buffet journée',
    price: 99,
    unit: 'fixe',
    description: 'Restauration équipe',
    icon: Utensils
  },
  'transport-gare': {
    name: 'Navette Gare',
    price: 25,
    unit: 'A/R',
    description: 'Transport inclus',
    icon: Car
  },
  'transport-airport': {
    name: 'Navette Aéroport',
    price: 49,
    unit: 'A/R',
    description: 'Transport inclus',
    icon: Car
  }
};
