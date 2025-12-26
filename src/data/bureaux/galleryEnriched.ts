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
      { url: 'https://static.eno.do/x/fs-209550-default/29be7178c30a995b1c18d52753a2565f/media.jpg', alt: 'Bureau privé 2-4 personnes Le 40 Marseille' }
    ],
    capacity: '2-4 pers.',
    surface: '20m²',
    priceFrom: '499€',
    features: [
      'Bureau fermé et sécurisé avec serrure individuelle',
      '4 postes de travail ergonomiques',
      'Lumière naturelle optimale avec grandes fenêtres',
      'Rangements privatifs sécurisés',
      'Ligne téléphonique dédiée',
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
      { url: 'https://static.eno.do/x/fs-209551-default/97972a3cfd4fb6f5d74740183fd1d64e/media.jpg', alt: 'Bureau privé 5-10 personnes Le 40 Marseille' }
    ],
    capacity: '5-10 pers.',
    surface: '50m²',
    priceFrom: '1 490€',
    features: [
      'Open space privé modulable avec cloisons acoustiques',
      'Jusqu\'à 10 postes de travail ergonomiques',
      'Zone de réunion informelle avec canapés',
      'Espace détente café privé',
      'Rangements muraux sur mesure',
      'Double ligne téléphonique professionnelle',
      'Éclairage LED réglable par zone',
      'Accès privatif avec badges personnalisés'
    ],
    equipments: [
      'Écrans 27"',
      'Bureaux réglables',
      'Zone lounge',
      'Kitchenette',
      'TV 55"',
      'Sono',
      'Tableau blanc',
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
      { url: 'https://static.eno.do/x/fs-209549-default/043c5aa87c9dcef20fab04438606f2ff/media.jpg', alt: 'Bureau entreprise 10-20 personnes Le 40 Marseille' }
    ],
    capacity: '10-20 pers.',
    surface: '90m²',
    priceFrom: '2 890€',
    features: [
      'Suite complète avec plusieurs zones distinctes',
      'Open space principal pour 15 postes',
      'Salle de réunion privée équipée pour 12 personnes',
      'Bureau direction séparé',
      'Kitchenette complète avec frigo, micro-ondes, lave-vaisselle',
      'Espace détente lounge avec canapés',
      'Système de climatisation et chauffage par zone',
      'Triple ligne téléphonique professionnelle'
    ],
    equipments: [
      'Écrans multiples',
      'Bureaux premium',
      'Salle réunion 12 pers',
      'Cuisine complète',
      'Lounge privé',
      'TV 75"',
      'Visioconférence pro',
      'Stockage 10m²'
    ],
    tags: ['Premium', 'Tout inclus', 'Entreprise', 'Personnalisable'],
    availability: '1 bureau disponible'
  },
  {
    id: 10,
    title: 'Hall d\'Accueil',
    category: 'Espaces Communs',
    description: 'Entrée professionnelle pour recevoir vos clients',
    longDescription: 'Accueil professionnel avec réception tenue pour vos visiteurs. Créez la meilleure première impression avec un hall moderne et accueillant.',
    images: [
      { url: 'https://static.eno.do/x/fs-209543-default/38e3f0872fceaa577efd20f777109732/media.jpg', alt: 'Hall d\'accueil Le 40 Marseille' }
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
    tags: ['Professionnel', 'Accueil', 'Première impression'],
    availability: 'Accès inclus dans tous les forfaits'
  },
  {
    id: 11,
    title: 'Salles de Réunion Partagées',
    category: 'Espaces Communs',
    description: 'Heures incluses dans votre forfait',
    longDescription: 'Accès aux salles de réunion modernes et équipées. Parfait pour vos rendez-vous clients, présentations et réunions d\'équipe.',
    images: [
      { url: 'https://static.eno.do/x/fs-209545-default/1f8db3cc706389492670db5916bf10e6/media.jpg', alt: 'Salle de réunion Le 40 Marseille' }
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
      { url: 'https://static.eno.do/x/fs-209544-default/2d5940a543a725b7f46b061a24ffdbaf/media.jpg', alt: 'Espace networking Le 40 Marseille' }
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
      { url: 'https://static.eno.do/x/fs-209547-default/3eb6c47d0d64a47aecc6be50f4cf4966/media.jpg', alt: 'Poste de travail lumière naturelle Le 40 Marseille' }
    ],
    capacity: 'Tous bureaux',
    surface: 'Variable',
    priceFrom: 'Standard',
    features: [
      'Grandes baies vitrées sur tous les bureaux',
      'Vue dégagée sur Marseille',
      'Stores pour contrôle de luminosité',
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
      { url: 'https://static.eno.do/x/fs-209548-default/110bbe332534127eb84829e332645a2c/media.jpg', alt: 'Espace collaboration Le 40 Marseille' }
    ],
    capacity: '2-20 pers.',
    surface: 'Variable',
    priceFrom: '499€',
    features: [
      'Espaces modulables selon vos besoins',
      'Zones de concentration et de collaboration',
      'Équipement complet pour le travail d\'équipe',
      'Acoustique étudiée pour limiter le bruit',
      'Mobilier ergonomique',
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