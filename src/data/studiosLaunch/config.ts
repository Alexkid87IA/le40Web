export interface Studio {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  capacity: string;
  surface: string;
  image: string;
  priceNormal: number;
  priceDiscounted: number;
  discountPercent: number;
  badge: string;
  equipment: string[];
  profilesRecommended: string[];
  popular: boolean;
}

export interface Duration {
  id: string;
  label: string;
  hours: number;
  multiplier: number;
  discountPercent: number;
  badge: string | null;
  description: string;
  popular?: boolean;
}

export interface Formula {
  id: string;
  name: string;
  description: string;
  priceFor4h: number;
  included?: boolean;
  badge?: string;
  features: string[];
}

export interface Option {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  minimum?: number;
}

export interface Profile {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  badge?: string;
  benefits: string[];
  startingPrice: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
}

export const studios: Studio[] = [
  {
    id: "face-cam",
    name: "Face Cam",
    subtitle: "Setup YouTube/TikTok optimisé",
    description: "Setup YouTube/Twitch épuré pour créateurs de contenu",
    capacity: "1 personne",
    surface: "15m²",
    image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1200",
    priceNormal: 84,
    priceDiscounted: 59,
    discountPercent: 30,
    badge: "Nouveau • Promo -30%",
    equipment: [
      "Sony FX3 4K + FX30 backup",
      "2 micros Shure SM7B",
      "Éclairage Aputure RGB",
      "Décor YouTube moderne"
    ],
    profilesRecommended: ["creator"],
    popular: false
  },
  {
    id: "duo-interview",
    name: "Duo/Interview",
    subtitle: "Parfait pour 2 personnes face à face",
    description: "Ambiance cosy pour conversations authentiques et interviews",
    capacity: "2-3 personnes",
    surface: "20m²",
    image: "https://images.pexels.com/photos/7991487/pexels-photo-7991487.jpeg?auto=compress&cs=tinysrgb&w=1200",
    priceNormal: 113,
    priceDiscounted: 79,
    discountPercent: 30,
    badge: "Nouveau • Promo -30%",
    equipment: [
      "3 caméras Sony FX3 multi-angles",
      "4 micros cravate pro",
      "Table interview + décor cosy",
      "Éclairage cinéma warm"
    ],
    profilesRecommended: ["creator", "enterprise"],
    popular: false
  },
  {
    id: "multi-cam-pro",
    name: "Multi-Caméras Pro",
    subtitle: "Production professionnelle 4-6 caméras",
    description: "Plateau TV professionnel pour émissions et débats",
    capacity: "4-8 personnes",
    surface: "50m²",
    image: "https://images.pexels.com/photos/7991158/pexels-photo-7991158.jpeg?auto=compress&cs=tinysrgb&w=1200",
    priceNormal: 213,
    priceDiscounted: 149,
    discountPercent: 30,
    badge: "Populaire • Promo -30%",
    equipment: [
      "4-6 caméras Sony FX3 synchronisées",
      "Table talk-show modulable",
      "Éclairage broadcast 3 points",
      "Régie vidéo disponible"
    ],
    profilesRecommended: ["enterprise", "production"],
    popular: true
  },
  {
    id: "green-screen",
    name: "Green Screen",
    subtitle: "Incrustation & effets spéciaux",
    description: "Fond vert professionnel avec éclairage uniforme pour VFX",
    capacity: "1-4 personnes",
    surface: "25m²",
    image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1200",
    priceNormal: 141,
    priceDiscounted: 99,
    discountPercent: 30,
    badge: "Nouveau • Promo -30%",
    equipment: [
      "Cyclo vert 6x4m professionnel",
      "2-3 caméras Sony FX3",
      "Éclairage uniforme optimisé",
      "Prompteur inclus"
    ],
    profilesRecommended: ["enterprise", "production"],
    popular: false
  }
];

export const durations: Duration[] = [
  {
    id: "2h",
    label: "2 Heures",
    hours: 2,
    multiplier: 1,
    discountPercent: 0,
    badge: null,
    description: "Parfait pour un shooting rapide"
  },
  {
    id: "4h",
    label: "Demi-Journée (4h)",
    hours: 4,
    multiplier: 1.8,
    discountPercent: 10,
    badge: "Le plus populaire",
    description: "Le choix le plus populaire",
    popular: true
  },
  {
    id: "8h",
    label: "Journée (8h)",
    hours: 8,
    multiplier: 3.2,
    discountPercent: 20,
    badge: "Meilleure économie",
    description: "Maximum de contenu en une session"
  },
  {
    id: "40h",
    label: "Semaine (40h)",
    hours: 40,
    multiplier: 14,
    discountPercent: 30,
    badge: "Pour projets d'envergure",
    description: "Pour projets d'envergure"
  }
];

export const formulas: Formula[] = [
  {
    id: "studio-only",
    name: "Studio Seul",
    description: "Tournage uniquement",
    priceFor4h: 0,
    included: true,
    features: [
      "Plateau équipé + technicien",
      "Transfert des rushs 4K",
      "Assistance technique"
    ]
  },
  {
    id: "post-production",
    name: "+ Post-Production",
    description: "Tournage + Montage pro",
    priceFor4h: 89,
    badge: "Populaire",
    features: [
      "Tout ce qui est inclus ci-dessus",
      "Montage professionnel (cuts, transitions)",
      "Colorimétrie cinéma",
      "Étalonnage son",
      "Export HD optimisé réseaux",
      "1 révision incluse",
      "Livraison 48h garantie"
    ]
  },
  {
    id: "complete-solution",
    name: "Solution Clé en Main",
    description: "Production complète",
    priceFor4h: 319,
    features: [
      "Tout ce qui est inclus ci-dessus",
      "Stratégie de contenu (brief pré-tournage)",
      "Montage avancé + motion design",
      "3 formats d'export (16:9, 9:16, 1:1)",
      "Optimisation SEO (titre, description)",
      "Miniature YouTube pro incluse",
      "Livraison 48h garantie"
    ]
  }
];

export const options: Option[] = [
  {
    id: "extra-camera",
    name: "Caméra supplémentaire",
    description: "Multi-angles pour montage dynamique",
    price: 39,
    unit: "/h"
  },
  {
    id: "teleprompter",
    name: "Prompteur + iPad",
    description: "Texte qui défile pour discours fluide",
    price: 19,
    unit: "/h"
  },
  {
    id: "rgb-lighting",
    name: "Éclairage RGB additionnel",
    description: "Ambiances colorées pour contenus créatifs",
    price: 15,
    unit: "/h"
  },
  {
    id: "green-screen-extra",
    name: "Fond vert supplémentaire",
    description: "Pour incrustation & effets spéciaux",
    price: 29,
    unit: "/h"
  },
  {
    id: "assistant",
    name: "Assistant production",
    description: "2ème technicien pour projets complexes",
    price: 35,
    unit: "/h"
  },
  {
    id: "catering",
    name: "Traiteur sur place",
    description: "Pause déjeuner pour équipe (plats, boissons)",
    price: 15,
    unit: "/personne",
    minimum: 4
  }
];

export const profiles: Profile[] = [
  {
    id: "creator",
    icon: "🎥",
    title: "Créateur de Contenu",
    subtitle: "YouTube, TikTok, Podcast",
    benefits: [
      "Vlogs et formats courts",
      "Interviews 1-2 personnes",
      "Content régulier"
    ],
    startingPrice: 59
  },
  {
    id: "enterprise",
    icon: "💼",
    title: "Entreprise / Marque",
    subtitle: "Communication corporate",
    badge: "Populaire",
    benefits: [
      "Vidéos produits/services",
      "Témoignages clients",
      "Formations internes"
    ],
    startingPrice: 89
  },
  {
    id: "production",
    icon: "🎬",
    title: "Production / Agence",
    subtitle: "Projets d'envergure",
    benefits: [
      "Publicités & spots",
      "Émissions & débats",
      "Événements live"
    ],
    startingPrice: 149
  }
];

export const faqs: FAQ[] = [
  {
    question: "Pourquoi des tarifs aussi bas ?",
    answer: "Nous venons d'ouvrir et voulons nous faire connaître rapidement. L'offre -30% est valable uniquement sur les réservations effectuées avant le 31 janvier 2025. Après cette date, les tarifs normaux s'appliquent (Face Cam à 84€/h au lieu de 59€/h).\n\nLes 15 créneaux/mois à tarif découverte partent vite !"
  },
  {
    question: "Le matériel est-il vraiment professionnel ?",
    answer: "Oui, 100%. Nous utilisons exclusivement :\n• Caméras Sony FX3 (5000€/unité) utilisées par Netflix\n• Micros Shure SM7B (standard podcasting pro)\n• Éclairage Aputure (référence cinéma)\n\nLe studio a été équipé pour 65,000€ de matériel. Vous aurez le même rendu qu'une grosse prod, sans les gros frais."
  },
  {
    question: "Qui s'occupe de la technique ?",
    answer: "Un technicien expert est présent pendant tout votre tournage. Il gère : réglages caméras, éclairage, son, monitoring en direct.\n\nVous n'avez qu'à vous concentrer sur votre contenu. Si vous êtes autonome, vous pouvez aussi opérer seul (pas de réduction)."
  },
  {
    question: "Quelle est votre politique d'annulation ?",
    answer: "Annulation GRATUITE jusqu'à 72h avant le créneau réservé.\n\nEntre 72h et 48h : 50% du montant est retenu.\nMoins de 48h : montant total retenu (nous avons refusé d'autres clients).\n\nVous pouvez également reporter votre créneau une fois sans frais (selon disponibilités)."
  },
  {
    question: "Que se passe-t-il si je ne suis pas satisfait ?",
    answer: "Garantie \"Satisfait ou Remboursé\" :\n\nSi la qualité du rendu ne correspond pas à ce qui est annoncé (problème technique de notre côté), nous vous remboursons intégralement la session.\n\nEn 2 mois de test avec Origines Media et autres créateurs, nous n'avons eu aucune insatisfaction."
  },
  {
    question: "Puis-je venir voir le studio avant de réserver ?",
    answer: "Bien sûr ! Nous proposons des visites gratuites du mardi au samedi entre 10h et 18h.\n\nRéservez votre visite : 04 XX XX XX XX ou contact@le40studio.fr\n\nVous pouvez aussi voir les studios en vidéo 360° sur notre site."
  },
  {
    question: "Recevons-nous les fichiers bruts (rushs) ?",
    answer: "OUI, toujours.\n\nPour la formule \"Studio Seul\" : rushs transférés en fin de session via clé USB ou WeTransfer (fichiers 4K MP4 H.264).\n\nPour \"Post-Production\" : vous recevez les rushs + la vidéo montée.\n\nPour \"Solution Clé en Main\" : rushs + vidéo(s) montée(s) + miniature + tous les exports."
  },
  {
    question: "Combien de personnes peuvent tenir dans le studio ?",
    answer: "Capacités maximales :\n• Face Cam : 1 personne face caméra (+ 2 accompagnants)\n• Duo/Interview : 3 personnes (2 face caméra + 1 accompagnant)\n• Multi-Caméras Pro : 8 personnes (6 face caméra + équipe)\n• Green Screen : 4 personnes face caméra\n\nAu-delà, nous avons le \"Plateau XL\" (sur devis)."
  },
  {
    question: "Puis-je apporter mon propre matériel ?",
    answer: "Absolument. Vous pouvez apporter :\n• Vos objectifs (monture E-Mount pour Sony)\n• Vos décors, props, costumes\n• Votre prompteur/script\n• Votre maquillage\n\nNotre matériel reste disponible en complément."
  },
  {
    question: "Y a-t-il un parking ?",
    answer: "Oui, parking gratuit avec 8 places réservées clients.\n\nSi vous venez en transports :\n• Métro ligne 2 : arrêt \"Joliette\" à 400m\n• Navette gratuite depuis Gare Saint-Charles sur demande (réservation 48h avant)"
  },
  {
    question: "Puis-je annuler l'offre Post-Production après tournage ?",
    answer: "Non, les formules avec Post-Production ou Solution Clé en Main doivent être choisies avant le tournage (nous adaptons le workflow).\n\nPar contre, vous pouvez ajouter la Post-Production après coup moyennant un supplément de 20% (délais de livraison plus longs)."
  },
  {
    question: "Proposez-vous des forfaits mensuels pour créateurs réguliers ?",
    answer: "Oui ! Pour créateurs qui tournent souvent, nous avons des pass mensuels :\n\n• Pass Créateur : 4 sessions 2h/mois = 399€ (au lieu de 472€)\n• Pass Pro : 8 sessions 2h/mois = 699€ (au lieu de 944€)\n\nRéservables au mois le mois (sans engagement annuel). Contactez-nous pour plus d'infos."
  }
];

export const testimonials: Testimonial[] = [
  {
    name: "Marc Dubois",
    role: "YouTuber Tech - 285K abonnés",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "Le setup Face Cam est parfait pour mes vidéos. Le technicien connaît YouTube par cœur, j'ai gagné des heures de setup. Studio réservé chaque semaine maintenant."
  },
  {
    name: "Sophie Laurent",
    role: "Directrice Marketing - TechCorp",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    text: "Nous avons tourné 6 vidéos produits en une journée. La formule Post-Prod nous a livré les montages en 5 jours. Rapport qualité/prix imbattable pour du corporate."
  },
  {
    name: "Alex Chen",
    role: "Créateur TikTok - 1.2M followers",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 5,
    text: "Le studio TikTok est une pépite. Setup vertical pro, éclairage RGB de fou, et le pack 3 Shorts me permet de sortir du contenu optimisé direct. Game changer."
  }
];

export const socialProofData = {
  equipment: "15,000€",
  delivery: "48h",
  satisfaction: "100%",
  clients: [
    {
      name: "Origines Media",
      subscribers: "580K"
    }
  ]
};

export const contactInfo = {
  phone: "04 XX XX XX XX",
  email: "contact@le40studio.fr",
  address: "Le 40 Studio, Marseille",
  hours: "Lun-Sam 9h-20h"
};
