export interface UpcomingEvent {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  categoryId: string;
  categoryName: string;
  eventDate: string;
  duration: number;
  location: string;
  imageUrl: string;
  maxAttendees: number;
  currentAttendees: number;
  priceMember: number;
  priceNonMember: number;
  isFeatured: boolean;
  difficultyLevel: string;
  tags: string[];
  speakerIds: string[];
  prerequisites?: string;
}

export const upcomingEvents: UpcomingEvent[] = [
  {
    id: '1',
    title: 'Afterwork Networking Premium',
    slug: 'afterwork-networking-premium',
    description: 'Rejoignez-nous pour une soirée networking exclusive dans une ambiance conviviale. Rencontrez des entrepreneurs passionnés, échangez sur vos projets et développez votre réseau professionnel autour de cocktails et petits fours. Des speed-networking organisés pour maximiser les rencontres.',
    shortDescription: 'Soirée networking exclusive avec cocktails et rencontres organisées',
    categoryId: '1',
    categoryName: 'Networking',
    eventDate: '2025-11-15T18:30:00',
    duration: 150,
    location: 'Le 40 - Marseille',
    imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    maxAttendees: 50,
    currentAttendees: 35,
    priceMember: 0,
    priceNonMember: 15,
    isFeatured: true,
    difficultyLevel: 'Tous niveaux',
    tags: ['Networking', 'Afterwork', 'Cocktail'],
    speakerIds: []
  },
  {
    id: '2',
    title: 'Masterclass: Lever des Fonds en 2025',
    slug: 'masterclass-lever-fonds-2025',
    description: 'Masterclass intensive sur les stratégies et techniques pour réussir sa levée de fonds. Apprenez à préparer votre pitch deck, identifier les bons investisseurs, négocier les termes et éviter les pièges courants. Session animée par Caroline Chen, investment partner avec 15 ans d\'expérience.',
    shortDescription: 'Stratégies complètes pour réussir votre levée de fonds',
    categoryId: '6',
    categoryName: 'Masterclass',
    eventDate: '2025-11-22T14:00:00',
    duration: 180,
    location: 'Le 40 - Marseille',
    imageUrl: 'https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=800',
    maxAttendees: 20,
    currentAttendees: 12,
    priceMember: 49,
    priceNonMember: 89,
    isFeatured: true,
    difficultyLevel: 'Intermédiaire',
    tags: ['Finance', 'Investissement', 'Pitch'],
    speakerIds: ['3'],
    prerequisites: 'Avoir un projet de startup en phase de développement'
  },
  {
    id: '3',
    title: 'Conférence: L\'IA au Service des PME',
    slug: 'conference-ia-pme',
    description: 'Découvrez comment intégrer l\'intelligence artificielle dans votre stratégie d\'entreprise. Applications concrètes, outils accessibles, et retours d\'expérience de PME qui ont transformé leur activité grâce à l\'IA. Session interactive avec démonstrations et Q&A.',
    shortDescription: 'Applications pratiques de l\'IA pour transformer votre business',
    categoryId: '3',
    categoryName: 'Conférence',
    eventDate: '2025-12-05T19:00:00',
    duration: 120,
    location: 'Le 40 - Marseille',
    imageUrl: 'https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=800',
    maxAttendees: 80,
    currentAttendees: 45,
    priceMember: 20,
    priceNonMember: 35,
    isFeatured: true,
    difficultyLevel: 'Tous niveaux',
    tags: ['IA', 'Innovation', 'Technologie'],
    speakerIds: ['2']
  },
  {
    id: '4',
    title: 'Atelier Marketing Digital Intensif',
    slug: 'atelier-marketing-digital',
    description: 'Formation intensive d\'une journée sur les stratégies marketing digital qui convertissent. SEO, publicité en ligne, email marketing, réseaux sociaux - tous les canaux essentiels pour générer des leads qualifiés. Exercices pratiques et mise en situation.',
    shortDescription: 'Journée intensive sur toutes les facettes du marketing digital',
    categoryId: '4',
    categoryName: 'Atelier',
    eventDate: '2025-12-12T10:00:00',
    duration: 360,
    location: 'Le 40 - Marseille',
    imageUrl: 'https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=800',
    maxAttendees: 15,
    currentAttendees: 8,
    priceMember: 89,
    priceNonMember: 149,
    isFeatured: false,
    difficultyLevel: 'Intermédiaire',
    tags: ['Marketing', 'Digital', 'Formation'],
    speakerIds: ['1', '5']
  },
  {
    id: '5',
    title: 'Pitch Session Startups',
    slug: 'pitch-session-startups',
    description: 'Présentez votre startup devant un panel d\'investisseurs et d\'entrepreneurs expérimentés. 5 minutes de pitch suivi de 10 minutes de Q&A constructif. Excellente opportunité pour affiner votre discours et recevoir des feedbacks précieux. Networking après la session.',
    shortDescription: 'Pitchez votre projet devant investisseurs et entrepreneurs',
    categoryId: '1',
    categoryName: 'Networking',
    eventDate: '2025-12-20T18:00:00',
    duration: 150,
    location: 'Le 40 - Marseille',
    imageUrl: 'https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg?auto=compress&cs=tinysrgb&w=800',
    maxAttendees: 40,
    currentAttendees: 28,
    priceMember: 0,
    priceNonMember: 25,
    isFeatured: false,
    difficultyLevel: 'Tous niveaux',
    tags: ['Pitch', 'Startup', 'Networking'],
    speakerIds: ['3', '4']
  },
  {
    id: '6',
    title: 'Formation: Création d\'Entreprise de A à Z',
    slug: 'formation-creation-entreprise',
    description: 'Formation complète sur toutes les étapes de création d\'entreprise. Choix du statut juridique, démarches administratives, business plan, financement, premiers clients. Avec David Bernard, avocat spécialisé en droit des affaires.',
    shortDescription: 'Guide complet pour lancer votre entreprise sereinement',
    categoryId: '2',
    categoryName: 'Formation',
    eventDate: '2026-01-10T09:00:00',
    duration: 240,
    location: 'Le 40 - Marseille',
    imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    maxAttendees: 25,
    currentAttendees: 15,
    priceMember: 69,
    priceNonMember: 129,
    isFeatured: false,
    difficultyLevel: 'Débutant',
    tags: ['Création', 'Juridique', 'Business'],
    speakerIds: ['6']
  },
  {
    id: '7',
    title: 'Workshop: Growth Hacking Avancé',
    slug: 'workshop-growth-hacking',
    description: 'Atelier avancé sur les techniques de growth hacking. Acquisition virale, automatisation marketing, optimisation des conversions, A/B testing. Cas pratiques et outils concrets pour accélérer votre croissance.',
    shortDescription: 'Techniques avancées pour accélérer votre croissance',
    categoryId: '4',
    categoryName: 'Atelier',
    eventDate: '2026-01-24T14:00:00',
    duration: 180,
    location: 'Le 40 - Marseille',
    imageUrl: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=800',
    maxAttendees: 20,
    currentAttendees: 11,
    priceMember: 79,
    priceNonMember: 139,
    isFeatured: false,
    difficultyLevel: 'Avancé',
    tags: ['Growth', 'Marketing', 'Stratégie'],
    speakerIds: ['1'],
    prerequisites: 'Expérience en marketing digital requise'
  },
  {
    id: '8',
    title: 'Table Ronde: L\'Entrepreneuriat Féminin',
    slug: 'table-ronde-entrepreneuriat-feminin',
    description: 'Table ronde inspirante avec des entrepreneures à succès. Partage d\'expériences, défis spécifiques, stratégies gagnantes et networking. Un moment d\'échange authentique et motivant.',
    shortDescription: 'Échanges inspirants avec des entrepreneures à succès',
    categoryId: '3',
    categoryName: 'Conférence',
    eventDate: '2026-02-07T18:30:00',
    duration: 120,
    location: 'Le 40 - Marseille',
    imageUrl: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
    maxAttendees: 60,
    currentAttendees: 42,
    priceMember: 15,
    priceNonMember: 25,
    isFeatured: true,
    difficultyLevel: 'Tous niveaux',
    tags: ['Entrepreneuriat', 'Inspiration', 'Diversité'],
    speakerIds: ['1', '3', '5']
  },
  {
    id: '9',
    title: 'Bootcamp: Product Management',
    slug: 'bootcamp-product-management',
    description: 'Formation intensive de 2 jours pour maîtriser le product management. De la définition de la vision produit au lancement, en passant par la priorisation, les méthodologies agiles et la mesure du succès. Cas pratiques, exercices en groupe et retours d\'expérience de product managers chevronnés.',
    shortDescription: 'Formation intensive sur tous les aspects du product management',
    categoryId: '2',
    categoryName: 'Formation',
    eventDate: '2026-02-21T09:00:00',
    duration: 480,
    location: 'Le 40 - Marseille',
    imageUrl: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    maxAttendees: 15,
    currentAttendees: 7,
    priceMember: 199,
    priceNonMember: 299,
    isFeatured: false,
    difficultyLevel: 'Intermédiaire',
    tags: ['Product', 'Management', 'Stratégie'],
    speakerIds: ['4'],
    prerequisites: 'Avoir une première expérience en startup ou tech'
  }
];
