export interface TestimonialMetric {
  metric: string;
  label: string;
}

export interface Testimonial {
  initial: string;
  name: string;
  role: string;
  before: string[];
  after: TestimonialMetric[];
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    initial: 'S',
    name: 'Sophie Martin',
    role: 'E-commerce beauté',
    before: [
      'Adresse perso sur le site',
      'Courrier souvent volé',
      '1h/jour à gérer admin'
    ],
    after: [
      { metric: '+22%', label: 'Taux de conversion' },
      { metric: '✓', label: 'Plus jamais raté un courrier' },
      { metric: '30h/mois', label: 'Temps gagné' }
    ],
    quote: 'Le scan automatique du courrier m\'a changé la vie. Et mes clients me prennent enfin au sérieux.'
  },
  {
    initial: 'M',
    name: 'Marc Dubois',
    role: 'Consultant IT',
    before: [
      'Pas de numéro fixe pro',
      'Rendez-vous dans les cafés',
      'Image peu professionnelle'
    ],
    after: [
      { metric: '+35%', label: 'Taux de signature' },
      { metric: '✓', label: 'Standard pro 24/7' },
      { metric: '15h/mois', label: 'Salle de réunion utilisée' }
    ],
    quote: 'Le standard téléphonique et les salles de réunion ont transformé mon image professionnelle.'
  },
  {
    initial: 'J',
    name: 'Julie Renard',
    role: 'Startup tech',
    before: [
      'Domiciliation basique',
      'Pas d\'accueil client',
      'Organisation compliquée'
    ],
    after: [
      { metric: '+40%', label: 'Deals signés' },
      { metric: '✓', label: 'Accueil premium' },
      { metric: '20h/mois', label: 'Admin gagnées' }
    ],
    quote: 'L\'accompagnement complet nous a permis de nous concentrer sur notre croissance.'
  }
];
