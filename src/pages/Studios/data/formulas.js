import { Camera, Film, Sparkles } from 'lucide-react';

export const formulas = [
  {
    id: 'studio',
    name: 'Studio',
    description: 'Tournage brut',
    longDescription: 'Accès au studio équipé avec technicien',
    priceMultiplier: 1,
    priceAddition: 0,
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
    priceAddition: 0,
    displayPrice: '+42% du prix studio',
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
    priceAddition: 0,
    displayPrice: '+150% du prix studio',
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