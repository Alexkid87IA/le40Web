export interface PastEvent {
  id: string;
  title: string;
  date: string;
  categoryName: string;
  attendees: number;
  rating: number;
  imageUrl: string;
  highlights: string[];
  testimonials: Array<{
    name: string;
    text: string;
    rating: number;
  }>;
  photoGallery: string[];
}

export const pastEvents: PastEvent[] = [
  {
    id: '1',
    title: 'Conférence IA & Business Innovation',
    date: 'Octobre 2025',
    categoryName: 'Conférence',
    attendees: 85,
    rating: 4.8,
    imageUrl: 'https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlights: [
      '3 speakers internationaux',
      'Démonstrations live d\'outils IA',
      'Sessions networking ciblées',
      'Retours d\'expérience concrets'
    ],
    testimonials: [
      {
        name: 'Pierre Dubois',
        text: 'Conférence exceptionnelle avec des insights concrets sur l\'implémentation de l\'IA dans nos process.',
        rating: 5
      },
      {
        name: 'Marie Laurent',
        text: 'Très enrichissant, j\'ai découvert des outils que je vais tester dès demain !',
        rating: 5
      }
    ],
    photoGallery: [
      'https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    id: '2',
    title: 'Hackathon Innovation Sociale',
    date: 'Septembre 2025',
    categoryName: 'Atelier',
    attendees: 45,
    rating: 4.9,
    imageUrl: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlights: [
      '24h de développement intensif',
      '8 projets présentés',
      '3 prix décernés',
      'Mentorat par des experts tech'
    ],
    testimonials: [
      {
        name: 'Alex Martin',
        text: 'Expérience incroyable ! J\'ai rencontré mon futur co-founder lors de ce hackathon.',
        rating: 5
      },
      {
        name: 'Sophie Chen',
        text: 'Organisation parfaite et énergie exceptionnelle. On a créé un prototype fonctionnel en 24h !',
        rating: 5
      }
    ],
    photoGallery: [
      'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    id: '3',
    title: 'Table Ronde Financement & Croissance',
    date: 'Août 2025',
    categoryName: 'Conférence',
    attendees: 38,
    rating: 4.7,
    imageUrl: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlights: [
      '4 VCs présents',
      'Retours d\'expérience de founders',
      'Session Q&A approfondie',
      'Networking avec investisseurs'
    ],
    testimonials: [
      {
        name: 'Thomas Rousseau',
        text: 'Des conseils pratiques et actionnables. J\'ai pu échanger directement avec des investisseurs.',
        rating: 5
      }
    ],
    photoGallery: [
      'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    id: '4',
    title: 'Masterclass Branding Personnel',
    date: 'Juillet 2025',
    categoryName: 'Masterclass',
    attendees: 22,
    rating: 4.9,
    imageUrl: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlights: [
      'Stratégies LinkedIn avancées',
      'Personal branding workshop',
      'Revue de profils personnalisée',
      'Plan d\'action individuel'
    ],
    testimonials: [
      {
        name: 'Laura Martinez',
        text: 'J\'ai complètement revu ma stratégie de communication. Résultats visibles dès la première semaine !',
        rating: 5
      }
    ],
    photoGallery: [
      'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    id: '5',
    title: 'Afterwork Entrepreneurs Tech',
    date: 'Juin 2025',
    categoryName: 'Afterwork',
    attendees: 52,
    rating: 4.6,
    imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlights: [
      'Speed networking organisé',
      'Cocktails & tapas',
      '30+ connexions créées',
      'Ambiance conviviale'
    ],
    testimonials: [
      {
        name: 'Marc Dubois',
        text: 'Super ambiance, j\'ai rencontré 3 potentiels clients et un partenaire commercial.',
        rating: 4
      }
    ],
    photoGallery: [
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  },
  {
    id: '6',
    title: 'Formation SEO & Content Marketing',
    date: 'Mai 2025',
    categoryName: 'Formation',
    attendees: 18,
    rating: 4.8,
    imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    highlights: [
      'Stratégies SEO 2025',
      'Outils d\'optimisation',
      'Content strategy workshop',
      'Audit SEO inclus'
    ],
    testimonials: [
      {
        name: 'Caroline Petit',
        text: 'Formation très complète avec des outils concrets. Mon trafic a doublé en 2 mois !',
        rating: 5
      }
    ],
    photoGallery: [
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800'
    ]
  }
];
