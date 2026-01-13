export const servicesData = [
  {
    id: 1,
    title: "Coworking",
    description: "Espaces ouverts et modulaires pour une productivité optimale",
    icon: "Users",
    color: "from-blue-400 to-blue-600"
  },
  {
    id: 2,
    title: "Domiciliation",
    description: "Adresse professionnelle au cœur du quartier d'affaires",
    icon: "MapPin",
    color: "from-green-400 to-green-600"
  },
  {
    id: 3,
    title: "Salles de Réunion",
    description: "Espaces équipés pour vos rendez-vous professionnels",
    icon: "PresentationChart",
    color: "from-purple-400 to-purple-600"
  },
  {
    id: 4,
    title: "Studio de Tournage",
    description: "Studio professionnel équipé pour vos contenus vidéo",
    icon: "Video",
    color: "from-red-400 to-red-600"
  },
  {
    id: 5,
    title: "Réseau d'Experts",
    description: "Accédez à notre communauté de professionnels qualifiés",
    icon: "Network",
    color: "from-pink-400 to-pink-600"
  },
  {
    id: 6,
    title: "Événements",
    description: "Participez à nos ateliers et conférences exclusives",
    icon: "Calendar",
    color: "from-yellow-400 to-yellow-600"
  },
  {
    id: 7,
    title: "Services+",
    description: "Accompagnement personnalisé pour votre développement",
    icon: "Star",
    color: "from-orange-400 to-orange-600"
  }
];

export const coworkingSpaces = [
  {
    id: 1,
    title: "Open Space Lumineux",
    tagline: "L'énergie d'un plateau partagé, la sérénité d'un silence feutré.",
    description: "Notre open space baigné de lumière naturelle offre des postes ergonomiques, prises USB-C, Wi-Fi 1 Gb/s et café en libre-service. Idéal pour les freelances qui aiment la dynamique collective sans renoncer au confort.",
    capacity: "30 postes flex",
    access: "24 / 7 – badge sécurisé",
    ctaLabel: "Réserver un poste",
    image: "https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 2,
    title: "Bureaux Privés Premium",
    tagline: "Votre cocon pro, prêt à l'emploi.",
    description: "Bureaux fermés de 2 à 6 personnes, mobilier haut standing, climatisation, accès illimité aux salles de réunion 2 h/mois et branding possible sur la porte. Parfait pour les équipes en croissance ou les consultants exigeants.",
    capacity: "2 – 6 pers.",
    access: "24 / 7 – badge + alarme",
    ctaLabel: "Obtenir un devis",
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 3,
    title: "Phone Box & Call Rooms",
    tagline: "Passez vos appels en toute confidentialité.",
    description: "Cabines insonorisées avec bureau rabattable, lumière douce et ventilation silencieuse ; call rooms équipées d'écran 32'' et anneau LED pour visios impeccables. Réservable à la demi-heure depuis l'appli interne.",
    capacity: "1 pers (box) / 2 – 3 pers (call room)",
    access: "7 h – 22 h",
    ctaLabel: "Bloquer un créneau",
    image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 4,
    title: "Lounge & Café Connecté",
    tagline: "Le spot détente qui booste les idées.",
    description: "Canapés lounge, machine à expresso barista, jus frais, arrière-plan végétal et prises partout : parfait pour un brainstorm informel ou une pause networking. Inclus dans tous les pass.",
    capacity: "Zones assises 15 pers.",
    access: "8 h – 20 h",
    ctaLabel: "Voir la galerie",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 5,
    title: "Terrasse Rooftop (saison)",
    tagline: "Travailler au soleil, pitcher sous les étoiles.",
    description: "Rooftop de 120 m² avec vues panoramiques, Wi-Fi mesh extérieur, parasols et bar mobile. Idéal pour afterworks et sessions créatives à ciel ouvert. Disponible d'avril à octobre, météo permitting.",
    capacity: "25 pers. debout",
    access: "Sur créneau, 9 h – 21 h",
    ctaLabel: "Privatiser la terrasse",
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

export const meetingRooms = [
  {
    id: 1,
    title: "Focus",
    price: "20€/h",
    capacity: "2-4 personnes", 
    description: "Parfaite pour les entretiens et réunions intimes",
    features: ["Écran 32'", "Wifi fibré", "Tableau blanc", "Café inclus"]
  },
  {
    id: 2,
    title: "Créative",
    price: "35€/h",
    capacity: "6-10 personnes",
    description: "Idéale pour brainstorming et workshops créatifs",
    features: ["Écran 55'", "Visio-conférence", "Paperboard", "Snacks inclus"]
  },
  {
    id: 3,
    title: "Conférence",
    price: "Sur devis",
    capacity: "12-20 personnes",
    description: "Salle premium pour vos présentations importantes",
    features: ["Écran 65'", "Sonorisation", "Enregistrement", "Traiteur possible"]
  }
];

export const studioData = [
  {
    id: 1,
    title: "Studio Podcast",
    price: "45€/h",
    capacity: "2-4 personnes",
    description: "Studio insonorisé avec équipement audio professionnel",
    image: "https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&w=600",
    features: ["Micros Shure SM7B", "Table de mixage", "Isolation acoustique", "Enregistrement multi-pistes"]
  },
  {
    id: 2,
    title: "Studio Vidéo",
    price: "65€/h",
    capacity: "5-8 personnes",
    description: "Plateau de tournage avec éclairage et caméras 4K",
    image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600",
    features: ["Caméras 4K", "Éclairage LED", "Fond vert", "Régie technique"]
  },
  {
    id: 3,
    title: "Studio Live",
    price: "85€/h",
    capacity: "10-15 personnes",
    description: "Studio complet pour streaming et événements en direct",
    image: "https://images.pexels.com/photos/7991225/pexels-photo-7991225.jpeg?auto=compress&cs=tinysrgb&w=600",
    features: ["Multi-caméras", "Streaming direct", "Régie vidéo", "Diffusion live"]
  }
];

export const pricingData = {
  domiciliation: [
    {
      id: 1,
      title: "Standard",
      price: "49€/mois",
      description: "L'essentiel pour votre adresse pro",
      features: ["Adresse prestigieuse", "Réexpédition courrier", "Scan documents", "Support email"]
    },
    {
      id: 2,
      title: "Digitale",
      price: "79€/mois", 
      description: "Version numérique optimisée",
      features: ["Standard +", "Dématérialisation complète", "App mobile", "Notification SMS"]
    },
    {
      id: 3,
      title: "Premium",
      price: "129€/mois",
      description: "Solution complète avec services",
      features: ["Digitale +", "2h salle/mois", "1 jour cowork/mois", "Accueil téléphonique"]
    },
    {
      id: 4,
      title: "Pro",
      price: "199€/mois",
      description: "Formule tout inclus pour entreprises",
      features: ["Premium +", "5h salle/mois", "3 jours cowork/mois", "Secrétariat dédié"]
    }
  ],
  coworking: [
    {
      id: 1,
      title: "Flexible",
      price: "25€/jour",
      description: "Accès libre à l'open space",
      features: ["Poste non attitré", "Wifi fibré", "Espace café", "Accès Lun-Ven"]
    },
    {
      id: 2,
      title: "Résident",
      price: "200€/mois",
      description: "Votre poste fixe au quotidien",
      features: ["Poste attitré", "Casier personnel", "2h salle/mois", "Communauté"]
    },
    {
      id: 3,
      title: "Bureau Privé",
      price: "499€/mois",
      description: "Votre espace dédié et sécurisé",
      features: ["Bureau fermé 2p", "Mobilier inclus", "5h salle/mois", "Domiciliation offerte"]
    }
  ],
  studio: [
    {
      id: 1,
      title: "Découverte",
      price: "35€/h",
      description: "Première expérience studio",
      features: ["1h studio podcast", "Assistance technique", "Fichiers audio", "Formation incluse"]
    },
    {
      id: 2,
      title: "Créateur",
      price: "150€/mois",
      description: "Pour créateurs de contenu réguliers",
      features: ["4h studio/mois", "Stockage cloud", "Montage basique", "Support prioritaire"]
    },
    {
      id: 3,
      title: "Professionnel",
      price: "350€/mois",
      description: "Solution complète pour pros",
      features: ["10h studio/mois", "Tous équipements", "Post-production", "Diffusion live"]
    }
  ]
};

export const testimonials = [
  {
    id: 1,
    name: "Marie Dubois",
    role: "CEO, StartupTech",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 5,
    comment: "Le 40 a transformé ma façon de travailler. L'ambiance et la communauté sont exceptionnelles."
  },
  {
    id: 2,
    name: "Thomas Martin",
    role: "Freelance Design",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 5,
    comment: "Enfin un espace qui combine productivité et networking. Je recommande à 100% !"
  },
  {
    id: 3,
    name: "Sophie Laurent",
    role: "Consultante RH",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 5,
    comment: "La domiciliation et les services sont parfaits. Équipe très professionnelle."
  }
];

export const blogPosts = [
  {
    id: 1,
    title: "Les tendances du coworking en 2024",
    excerpt: "Découvrez comment les espaces de travail partagés évoluent pour répondre aux nouveaux besoins des entrepreneurs.",
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Tendances",
    readTime: "5 min"
  },
  {
    id: 2,
    title: "Optimiser sa productivité en télétravail",
    excerpt: "Nos conseils d'experts pour maintenir votre efficacité en travaillant à distance.",
    image: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Productivité", 
    readTime: "3 min"
  },
  {
    id: 3,
    title: "Créer sa startup : les étapes clés",
    excerpt: "Guide complet pour lancer votre projet entrepreneurial dans les meilleures conditions.",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Entrepreneuriat",
    readTime: "8 min"
  }
];