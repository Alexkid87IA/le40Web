import { Camera, Film, Sparkles } from 'lucide-react';

export const formulas = [
  {
    id: 'studio',
    name: 'Studio',
    description: 'Tournage brut',
    longDescription: 'Accès au studio équipé avec technicien',
    priceMultiplier: 1,
    displayPrice: 'Prix de base',
    icon: Camera,
    features: [
      'Plateau équipé complet',
      'Technicien sur place',
      'Transfert des rushs',
      'Installation incluse'
    ]
  },
  {
    id: 'postprod',
    name: 'Post-Prod',
    description: 'Tournage + montage',
    longDescription: 'Production complète avec montage professionnel',
    priceMultiplier: 1.42,
    displayPrice: '+42%',
    icon: Film,
    features: [
      'Tout le pack Studio',
      'Montage professionnel',
      'Colorimétrie de base',
      'Exports optimisés',
      '1 révision incluse'
    ],
    popular: true
  },
  {
    id: 'expert',
    name: 'Expert',
    description: 'Création complète',
    longDescription: 'Solution clé en main avec stratégie créative',
    priceMultiplier: 2.5,
    displayPrice: '+150%',
    icon: Sparkles,
    features: [
      'Tout le pack Post-Prod',
      'Stratégie créative',
      'SEO & optimisation',
      'Distribution multi-plateformes',
      'Analytics & suivi'
    ]
  }
];

export const durations = [
  { id: '1h', label: '1 heure', hours: 1, multiplier: 1 },
  { id: '3h', label: '3 heures', hours: 3, multiplier: 2.76, discount: '-8%', popular: true },
  { id: '7h', label: 'Journée', hours: 7, multiplier: 5.03, discount: '-28%' }
];
