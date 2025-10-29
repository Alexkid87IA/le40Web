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
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1600'
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
      'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1600'
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
      'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/3321793/pexels-photo-3321793.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1600'
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
      'Vue panoramique 360° sur Paris',
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
      'https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1600'
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
      'https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=1600'
    ],
    gradient: 'from-rose-600 to-pink-600',
    accentColor: 'rose',
    icon: Coffee,
    disponibilites: ['Heure', 'Demi-journée', 'Soirée']
  }
];
