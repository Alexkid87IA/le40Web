export interface EnrichedSpaceDetail {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  images: {
    url: string;
    alt: string;
  }[];
  capacity: string;
  surface: string;
  priceFrom: string;
  features: string[];
  equipments: string[];
  tags: string[];
  availability: string;
}

export const enrichedGalleryData: EnrichedSpaceDetail[] = [
  {
    id: 1,
    title: 'Bureau Startup 20m²',
    category: 'Bureau 2-4 personnes',
    description: 'Espace lumineux et fonctionnel pour petites équipes',
    longDescription: 'Idéal pour les startups et petites équipes qui ont besoin d\'un espace privé tout en restant connectées à la communauté. Bureau entièrement équipé avec lumière naturelle abondante et vue dégagée.',
    images: [
      { url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Bureau privé 2-4 personnes - vue principale' },
      { url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Bureau privé 2-4 personnes - postes de travail' },
      { url: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Bureau privé 2-4 personnes - espace réunion' },
      { url: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Bureau privé 2-4 personnes - détail poste' },
      { url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Bureau privé 2-4 personnes - lumière naturelle' }
    ],
    capacity: '2-4 pers.',
    surface: '20m²',
    priceFrom: '699€',
    features: [
      'Bureau fermé et sécurisé avec serrure individuelle',
      '4 postes de travail ergonomiques avec sièges Herman Miller',
      'Lumière naturelle optimale avec grandes fenêtres',
      'Rangements privatifs sécurisés pour chaque poste',
      'Ligne téléphonique dédiée avec numéro fixe',
      'Climatisation et chauffage réglables',
      'Accès 24/7 avec badge personnel',
      'Wifi fibre 1 Gb/s dédié'
    ],
    equipments: [
      'Écran 27" par poste',
      'Bureau réglable',
      'Armoires',
      'Tableau blanc',
      'Café illimité',
      'Imprimante',
      'Vidéo-conférence',
      'Casiers'
    ],
    tags: ['Lumineux', 'Calme', 'Vue dégagée', 'Idéal startup'],
    availability: 'Disponible immédiatement'
  },
  {
    id: 4,
    title: 'Bureau Équipe 50m²',
    category: 'Bureau 5-10 personnes',
    description: 'Espace optimisé pour équipes en croissance',
    longDescription: 'Bureau spacieux parfaitement adapté aux équipes en développement. Configuration flexible permettant d\'évoluer de 5 à 10 personnes. Inclut une zone de réunion informelle et un espace détente privé.',
    images: [
      { url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Bureau 5-10 personnes - open space privé' },
      { url: 'https://images.pexels.com/photos/3184634/pexels-photo-3184634.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Bureau 5-10 personnes - postes multiples' },
      { url: 'https://images.pexels.com/photos/3182746/pexels-photo-3182746.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Bureau 5-10 personnes - espace détente' },
      { url: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Bureau 5-10 personnes - collaboration' },
      { url: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Bureau 5-10 personnes - réunion' },
      { url: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Bureau 5-10 personnes - design intérieur' }
    ],
    capacity: '5-10 pers.',
    surface: '50m²',
    priceFrom: '1 490€',
    features: [
      'Open space privé modulable avec cloisons acoustiques',
      'Jusqu\'à 10 postes de travail ergonomiques',
      'Zone de réunion informelle avec canapés',
      'Espace détente café privé entièrement équipé',
      'Rangements muraux sur mesure',
      'Double ligne téléphonique professionnelle',
      'Système audio pour musique d\'ambiance',
      'Éclairage LED réglable par zone',
      'Accès privatif avec badges personnalisés',
      'Possibilité de personnalisation des couleurs'
    ],
    equipments: [
      'Écrans 27"',
      'Bureaux réglables',
      'Zone lounge',
      'Kitchenette',
      'TV 55"',
      'Sono',
      'Tableau blanc géant',
      'Rangements'
    ],
    tags: ['Modulable', 'Espace détente', 'Évolutif', 'Équipe croissance'],
    availability: '2 bureaux disponibles'
  },
  {
    id: 7,
    title: 'Bureau Entreprise 90m²',
    category: 'Bureau 10-20 personnes',
    description: 'Espace premium pour grandes équipes',
    longDescription: 'Bureau d\'entreprise premium offrant tous les avantages d\'un siège social. Configuration complète avec open space, salle de réunion privée, kitchenette équipée et espace détente. Idéal pour entreprises établies.',
    images: [
      { url: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Bureau entreprise - vue d\'ensemble' },
      { url: 'https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Bureau entreprise - salle de réunion' },
      { url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Bureau entreprise - kitchenette' },
      { url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Bureau entreprise - open space' },
      { url: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Bureau entreprise - équipe collaboration' },
      { url: 'https://images.pexels.com/photos/3182833/pexels-photo-3182833.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Bureau entreprise - concentration' },
      { url: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Bureau entreprise - design premium' }
    ],
    capacity: '10-20 pers.',
    surface: '90m²',
    priceFrom: '2 890€',
    features: [
      'Suite complète avec plusieurs zones distinctes',
      'Open space principal pour 15 postes',
      'Salle de réunion privée équipée pour 12 personnes',
      'Bureau direction séparé avec vue panoramique',
      'Kitchenette complète avec frigo, micro-ondes, lave-vaisselle',
      'Espace détente lounge avec canapés premium',
      'Toilettes privatives avec douche',
      'Vestiaire et casiers personnels pour toute l\'équipe',
      'Système de climatisation et chauffage par zone',
      'Installation électrique renforcée pour serveurs',
      'Triple ligne téléphonique professionnelle',
      'Possibilité de branding personnalisé aux couleurs de l\'entreprise'
    ],
    equipments: [
      'Écrans multiples',
      'Bureaux premium',
      'Salle réunion 12 pers',
      'Cuisine complète',
      'Lounge privé',
      'TV 75"',
      'Visioconférence pro',
      'Serveur rack',
      'Stockage 10m²',
      'Douche',
      'Parking 4 places',
      'Signalétique'
    ],
    tags: ['Premium', 'Tout inclus', 'Entreprise', 'Prestige', 'Personnalisable'],
    availability: '1 bureau disponible'
  },
  {
    id: 10,
    title: 'Hall d\'Accueil Prestigieux',
    category: 'Espaces Communs',
    description: 'Entrée professionnelle pour recevoir vos clients',
    longDescription: 'Accueil professionnel avec réception tenue pour vos visiteurs. Créez la meilleure première impression avec un hall moderne et accueillant.',
    images: [
      { url: 'https://images.pexels.com/photos/1797393/pexels-photo-1797393.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Hall d\'accueil - vue principale' },
      { url: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Hall d\'accueil - espace attente' },
      { url: 'https://images.pexels.com/photos/3182746/pexels-photo-3182746.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Hall d\'accueil - zone lounge' }
    ],
    capacity: 'Partagé',
    surface: '80m²',
    priceFrom: 'Inclus',
    features: [
      'Réception professionnelle avec accueil personnalisé',
      'Gestion du courrier et des colis',
      'Service de domiciliation disponible',
      'Espace d\'attente confortable',
      'Wifi invités haute vitesse',
      'Magazines et journaux disponibles'
    ],
    equipments: [
      'Réception',
      'Wifi invités',
      'Lounge',
      'Magazines',
      'Plantes',
      'Casiers courrier'
    ],
    tags: ['Professionnel', 'Accueil', 'Prestige', 'Première impression'],
    availability: 'Accès inclus dans tous les forfaits'
  },
  {
    id: 11,
    title: 'Salles de Réunion Partagées',
    category: 'Espaces Communs',
    description: 'Heures incluses dans votre forfait',
    longDescription: 'Accès aux salles de réunion modernes et équipées. Parfait pour vos rendez-vous clients, présentations et réunions d\'équipe.',
    images: [
      { url: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Salle de réunion - configuration 8 personnes' },
      { url: 'https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Salle de réunion - configuration 12 personnes' },
      { url: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Salle de réunion - en utilisation' },
      { url: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Salle de réunion - équipements' }
    ],
    capacity: '4-50 pers.',
    surface: 'Variable',
    priceFrom: '10h incluses',
    features: [
      '5 salles de réunion de tailles différentes',
      'Heures incluses selon votre formule',
      'Écrans connectés dans toutes les salles',
      'Système de visioconférence HD',
      'Tableaux blancs et paperboards',
      'Réservation simple via application',
      'Café et eau offerts pendant vos réunions'
    ],
    equipments: [
      'Écrans HD',
      'Visio',
      'Tableaux',
      'Wifi',
      'Café',
      'Eau',
      'Paperboard',
      'Marqueurs'
    ],
    tags: ['Inclus', 'Équipé', 'Flexible', 'Réservation facile'],
    availability: '10h/mois incluses dans forfait bureau'
  },
  {
    id: 12,
    title: 'Espace Networking',
    category: 'Espaces Communs',
    description: 'Zone commune pour échanger avec la communauté',
    longDescription: 'Espace convivial pour rencontrer les autres membres, échanger des idées et créer des synergies. Le cœur vibrant de notre communauté de 120+ entrepreneurs.',
    images: [
      { url: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Espace networking - zone principale' },
      { url: 'https://images.pexels.com/photos/3182746/pexels-photo-3182746.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Espace networking - lounge' },
      { url: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Espace networking - échanges' },
      { url: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Espace networking - ambiance' }
    ],
    capacity: '120+ membres',
    surface: '150m²',
    priceFrom: 'Inclus',
    features: [
      'Espace lounge ouvert à tous les membres',
      'Zone café avec machine professionnelle',
      'Événements networking réguliers',
      'Afterworks mensuels',
      'Ateliers et conférences',
      'Communauté active et bienveillante'
    ],
    equipments: [
      'Canapés',
      'Tables hautes',
      'Machine café',
      'Frigo',
      'Micro-ondes',
      'TV',
      'Jeux',
      'Terrasse'
    ],
    tags: ['Communauté', 'Networking', 'Convivial', 'Événements'],
    availability: 'Accès libre pour tous les membres'
  },
  {
    id: 13,
    title: 'Postes Lumière Naturelle',
    category: 'Ambiance & Détails',
    description: 'Grandes fenêtres dans tous nos bureaux',
    longDescription: 'Chaque bureau bénéficie d\'un apport en lumière naturelle exceptionnel grâce à nos grandes baies vitrées. Un environnement de travail sain et stimulant.',
    images: [
      { url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Lumière naturelle - bureau vitré' },
      { url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Lumière naturelle - poste de travail' },
      { url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Lumière naturelle - open space' }
    ],
    capacity: 'Tous bureaux',
    surface: 'Variable',
    priceFrom: 'Standard',
    features: [
      'Grandes baies vitrées sur tous les bureaux',
      'Vue dégagée sur Marseille',
      'Stores électriques pour contrôle de luminosité',
      'Double vitrage acoustique',
      'Orientation optimale sud/est',
      'Améliore bien-être et productivité'
    ],
    equipments: [
      'Baies vitrées',
      'Stores',
      'Double vitrage',
      'Vue panoramique'
    ],
    tags: ['Lumineux', 'Vue', 'Bien-être', 'Confort'],
    availability: 'Sur tous les bureaux'
  },
  {
    id: 16,
    title: 'Espaces Collaboration',
    category: 'Équipe au Travail',
    description: 'Vos équipes dans un cadre professionnel',
    longDescription: 'Des espaces pensés pour favoriser la collaboration et la créativité de vos équipes. Configuration modulable selon vos besoins du jour.',
    images: [
      { url: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Équipe en collaboration' },
      { url: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Réunion d\'équipe' },
      { url: 'https://images.pexels.com/photos/3182833/pexels-photo-3182833.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Travail concentré' },
      { url: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1920', alt: 'Espace modulable' }
    ],
    capacity: '2-20 pers.',
    surface: 'Variable',
    priceFrom: '699€',
    features: [
      'Espaces modulables selon vos besoins',
      'Zones de concentration et de collaboration',
      'Équipement complet pour le travail d\'équipe',
      'Acoustique étudiée pour limiter le bruit',
      'Mobilier ergonomique premium',
      'Configuration personnalisable'
    ],
    equipments: [
      'Bureaux réglables',
      'Tableaux',
      'Écrans',
      'Wifi pro',
      'Rangements',
      'Zone détente'
    ],
    tags: ['Collaboration', 'Modulable', 'Équipe', 'Productif'],
    availability: 'Configurations sur mesure'
  }
];

export const galleryCategories = [
  'Tous',
  'Bureau 2-4 personnes',
  'Bureau 5-10 personnes',
  'Bureau 10-20 personnes',
  'Espaces Communs',
  'Ambiance & Détails',
  'Équipe au Travail'
];
