import { Camera, Film, Sparkles } from 'lucide-react';

export const formulas = [
  {
    id: 'studio',
    name: 'Studio',
    description: 'Tournage brut',
    longDescription: 'Vous filmez, on assure la logistique technique',
    tagline: 'Parfait pour les créateurs autonomes',
    priceMultiplier: 1,
    displayPrice: 'Prix de base',
    icon: Camera,
    useCases: [
      'Podcasts en autonomie',
      'Lives et streaming',
      'Tournages rapides avec votre équipe'
    ],
    features: [
      'Plateau équipé complet',
      'Technicien sur place',
      'Transfert des rushs',
      'Installation incluse'
    ],
    detailedDescription: 'Vous gérez entièrement votre tournage : cadrage, son, lumière. Notre technicien assure l\'installation, le bon fonctionnement du matériel et vous remet vos fichiers bruts à la fin.'
  },
  {
    id: 'postprod',
    name: 'Post-Prod',
    description: 'Tournage + montage',
    longDescription: 'Vous filmez, on transforme en contenu prêt à publier',
    tagline: 'Idéal pour gagner du temps',
    priceMultiplier: 1.42,
    displayPrice: '+42%',
    icon: Film,
    useCases: [
      'Vidéos YouTube éditées',
      'Contenus réseaux sociaux',
      'Interviews montées pro'
    ],
    features: [
      'Tout le pack Studio',
      'Montage professionnel',
      'Colorimétrie de base',
      'Exports optimisés',
      '1 révision incluse'
    ],
    detailedDescription: 'Concentrez-vous sur la création. Après votre tournage, notre équipe monte, nettoie le son, applique une correction colorimétrique et livre un contenu finalisé avec exports adaptés à vos plateformes.',
    popular: true
  },
  {
    id: 'expert',
    name: 'Expert',
    description: 'Création complète',
    longDescription: 'De l\'idée à la diffusion, on pilote tout',
    tagline: 'Clé en main pour les marques',
    priceMultiplier: 2.5,
    displayPrice: '+150%',
    icon: Sparkles,
    useCases: [
      'Campagnes de marque',
      'Lancements produit',
      'Contenus stratégiques multi-canaux'
    ],
    features: [
      'Tout le pack Post-Prod',
      'Stratégie créative',
      'SEO & optimisation',
      'Distribution multi-plateformes',
      'Analytics & suivi'
    ],
    detailedDescription: 'Service premium tout compris : nous définissons avec vous la stratégie créative, gérons la production de A à Z, optimisons pour le référencement, diffusons sur vos canaux et suivons les performances avec un reporting détaillé.'
  }
];

export const durations = [
  { id: '1h', label: '1 heure', hours: 1, multiplier: 1 },
  { id: '3h', label: '3 heures', hours: 3, multiplier: 2.76, discount: '-8%', popular: true },
  { id: '7h', label: 'Journée', hours: 7, multiplier: 5.03, discount: '-28%' }
];
