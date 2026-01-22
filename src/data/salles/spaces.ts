import { Monitor, Presentation, Projector, Sun, Coffee, LucideIcon } from 'lucide-react';

export interface Space {
  id: string;
  category: string;
  title: string;
  capacity: string;
  price: number;
  priceUnit: string;
  description: string;
  features: string[];
  images: string[];
  gradient: string;
  accentColor: string;
  icon: LucideIcon;
  popular?: boolean;
  disponibilites: string[];
}

export const spaces: Space[] = [
  {
    id: 'salle-focus',
    category: 'Salles de réunion',
    title: 'Salle Focus',
    capacity: '2-4 personnes',
    price: 40,
    priceUnit: '/heure',
    description: 'Espace intime idéal pour entretiens, visioconférences et sessions de coaching',
    features: [
      'Écran 4K 55"',
      'Tableau blanc digital',
      'Wi-Fi 1 Gb/s dédié',
      'Isolation phonique renforcée',
      'Climatisation individuelle',
      'Éclairage modulable LED',
      'Mobilier ergonomique Herman Miller',
      'Prises USB-C intégrées'
    ],
    images: [
      'https://le40-cdn.b-cdn.net/salles/salle-focus-1.png',
      'https://le40-cdn.b-cdn.net/salles/salle-focus-2.png',
      'https://le40-cdn.b-cdn.net/salles/salle-focus-3.png'
    ],
    gradient: 'from-cyan-600 to-teal-600',
    accentColor: 'cyan',
    icon: Monitor,
    disponibilites: ['Heure', 'Demi-journée', 'Journée']
  },
  {
    id: 'salle-creative',
    category: 'Salles de réunion',
    title: 'Salle Créative',
    capacity: '6-8 personnes',
    price: 60,
    priceUnit: '/heure',
    description: 'Espace dynamique pour ateliers créatifs et sessions de brainstorming',
    features: [
      'TV HD 75" tactile',
      'Paper-board digital interactif',
      'Connectique HDMI/USB-C/DisplayPort',
      'Post-its & matériel créatif illimité',
      'Mobilier modulable sur roulettes',
      'Machine à café Nespresso Pro',
      'Mur d\'écriture magnétique',
      'Système audio Bose'
    ],
    images: [
      'https://le40-cdn.b-cdn.net/salles/salle-creative-1.png',
      'https://le40-cdn.b-cdn.net/salles/salle-creative-2.png',
      'https://le40-cdn.b-cdn.net/salles/salle-creative-3.png'
    ],
    gradient: 'from-emerald-600 to-teal-600',
    accentColor: 'emerald',
    icon: Presentation,
    popular: true,
    disponibilites: ['Heure', 'Demi-journée', 'Journée']
  },
  {
    id: 'salle-conference',
    category: 'Grande Salle',
    title: 'Salle de Conférence',
    capacity: 'Jusqu\'à 80 personnes',
    price: 80,
    priceUnit: '/heure',
    description: 'Espace événementiel premium pour conférences, séminaires et formations',
    features: [
      'Duo vidéoprojecteurs laser 4K',
      'Écrans latéraux synchronisés',
      'Système micro-cravate & HF Sennheiser',
      'Pupitre professionnel ajustable',
      'Estrade modulaire 40m²',
      'Scène éclairée DMX',
      'Régie son + lumière complète',
      'Streaming HD & enregistrement',
      'Cabine de traduction simultanée',
      'Vestiaire 100 places'
    ],
    images: [
      'https://le40-cdn.b-cdn.net/salles/salle-conference-1.png',
      'https://le40-cdn.b-cdn.net/salles/salle-conference-2.png',
      'https://le40-cdn.b-cdn.net/salles/salle-conference-3.png'
    ],
    gradient: 'from-blue-600 to-cyan-600',
    accentColor: 'blue',
    icon: Projector,
    disponibilites: ['Heure', 'Demi-journée', 'Journée']
  },
  {
    id: 'terrasse-panoramique',
    category: 'Espaces événementiels',
    title: 'Terrasse Panoramique',
    capacity: '300 m²',
    price: 200,
    priceUnit: '/heure (min. 2h)',
    description: 'Rooftop exceptionnel avec vue 360° pour réceptions, keynotes et afterworks mémorables',
    features: [
      'Vue panoramique 360° sur Marseille',
      'Lounge extérieur chauffé',
      'Estrade modulable 20m²',
      'Mobilier cocktail design',
      'Wi-Fi mesh outdoor',
      'Bar mobile équipé complet',
      'Éclairage soirée LED RGB',
      'Sonorisation Line Array',
      'Brumisateurs intégrés',
      'Pergola bioclimatique 100m²'
    ],
    images: [
      'https://le40-cdn.b-cdn.net/salles/terrasse-1.png',
      'https://le40-cdn.b-cdn.net/salles/terrasse-2.png',
      'https://le40-cdn.b-cdn.net/salles/terrasse-3.png'
    ],
    gradient: 'from-amber-600 to-orange-600',
    accentColor: 'amber',
    icon: Sun,
    disponibilites: ['2 heures', '4 heures', 'Soirée complète']
  },
  {
    id: 'lounge-cafe',
    category: 'Espaces événementiels',
    title: 'Lounge & Café',
    capacity: '60 m²',
    price: 50,
    priceUnit: '/heure',
    description: 'Espace convivial pour networking, pauses gourmandes et mini-events',
    features: [
      'Canapés Chesterfield',
      'Machine espresso barista professionnelle',
      'Sono d\'ambiance Sonos',
      'Éclairage tamisé variable',
      'Bar équipé avec cave à vin',
      'Mobilier lounge modulable',
      'Écran TV 65" 4K',
      'Espace privatisable',
      'Bibliothèque design',
      'Coin jeux (baby-foot, arcade)'
    ],
    images: [
      'https://le40-cdn.b-cdn.net/salles/lounge-1.png',
      'https://le40-cdn.b-cdn.net/salles/lounge-2.png',
      'https://le40-cdn.b-cdn.net/salles/lounge-3.png'
    ],
    gradient: 'from-rose-600 to-pink-600',
    accentColor: 'rose',
    icon: Coffee,
    disponibilites: ['Heure', 'Demi-journée', 'Soirée']
  }
];
