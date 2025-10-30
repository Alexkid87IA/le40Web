import { Film, Monitor, Camera, Car } from 'lucide-react';

export const optionsCatalog = {
  'montage-pro': {
    name: 'Montage Pro',
    price: 39,
    unit: 'fixe',
    description: 'Livraison sous 5 jours',
    details: 'Montage professionnel avec cuts, transitions, titres, colorimétrie basique. 1 révision incluse.',
    icon: Film,
    popular: true
  },
  'teleprompter': {
    name: 'Téléprompter',
    price: 15,
    unit: '/h',
    description: 'Essentiel formations',
    details: 'Téléprompter 15" avec iPad pour des présentations fluides',
    icon: Monitor
  },
  'camera-extra': {
    name: 'Caméra extra',
    price: 25,
    unit: '/h',
    description: 'Angle supplémentaire',
    details: 'Caméra Sony FX3 supplémentaire pour angle additionnel',
    icon: Camera
  },
  'live-switch': {
    name: 'Live-Switch ATEM',
    price: 35,
    unit: '/h',
    description: 'Diffusion multi-plateformes',
    details: 'ATEM Mini Pro pour diffusion simultanée sur Twitch, YouTube et LinkedIn',
    icon: Monitor,
    popular: true
  },
  'transport-gare': {
    name: 'Navette Gare',
    price: 20,
    unit: 'A/R',
    description: 'Saint-Charles ↔ Studio',
    details: 'Transport aller-retour depuis la gare Saint-Charles',
    icon: Car
  }
};
