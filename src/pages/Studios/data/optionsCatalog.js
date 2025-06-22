import { Layers, Camera, Monitor, Palette, Zap, Film, Image, Calendar, Utensils, Car, Coffee, Shield } from 'lucide-react';

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
    icon: Camera
  },
  'teleprompter': { 
    name: 'Téléprompteur + iPad', 
    price: 25, 
    unit: '/h',
    icon: Monitor
  },
  'color-grading': { 
    name: 'Color grading cinéma', 
    price: 99, 
    unit: 'fixe',
    icon: Palette
  },
  'subtitles': { 
    name: 'Sous-titres dynamiques', 
    price: 49, 
    unit: 'fixe',
    icon: Monitor
  },
  'shorts-pack': { 
    name: 'Pack 3 Shorts', 
    price: 149, 
    unit: 'fixe',
    icon: Zap,
    popular: true
  },
  'motion-podcast': { 
    name: 'Habillage motion', 
    price: 99, 
    unit: '/min',
    icon: Film
  },
  'thumbnail': { 
    name: 'Miniature YouTube', 
    price: 35, 
    unit: 'fixe',
    icon: Image
  },
  'calendar': { 
    name: 'Calendrier 30j', 
    price: 299, 
    unit: 'fixe',
    icon: Calendar
  },
  'tiktok-boost': { 
    name: 'Boost TikTok 50k', 
    price: 219, 
    unit: 'fixe',
    icon: Zap
  },
  'dashboard': { 
    name: 'Dashboard analytics', 
    price: 99, 
    unit: '/mois',
    icon: Monitor
  },
  'extra-backdrop': { 
    name: 'Fond supplémentaire', 
    price: 10, 
    unit: 'fixe',
    icon: Image
  },
  'retouching': { 
    name: 'Retouche pro', 
    price: 5, 
    unit: '/photo',
    icon: Palette
  },
  'buffet': { 
    name: 'Buffet journée', 
    price: 99, 
    unit: 'fixe',
    icon: Utensils
  },
  'transport-gare': { 
    name: 'Navette Gare', 
    price: 25, 
    unit: 'A/R',
    icon: Car
  },
  'transport-airport': { 
    name: 'Navette Aéroport', 
    price: 49, 
    unit: 'A/R',
    icon: Car
  }
};