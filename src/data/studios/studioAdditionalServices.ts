import { Film, Monitor, Camera, Radio, Car, LucideIcon } from 'lucide-react';

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
}

export const studioAdditionalServices: StudioAdditionalService[] = [
  {
    id: 'montage-pro',
    name: 'Montage Pro',
    description: 'Livraison sous 5 jours',
    details: 'Montage professionnel avec cuts, transitions, titres, colorimétrie basique. 1 révision incluse.',
    price: 39,
    unit: 'fixe',
    displayPrice: '39€',
    icon: Film,
    gradient: 'from-rose-600 to-fuchsia-600',
    features: [
      'Montage professionnel',
      'Cuts et transitions',
      'Titres et sous-titres',
      'Colorimétrie basique',
      '1 révision incluse',
      'Livraison sous 5 jours',
      'Formats optimisés',
      'Miniatures incluses'
    ],
    popular: true
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
    ]
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
    ]
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
    popular: true
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
    ]
  }
];
