export interface EventSpeaker {
  id: string;
  name: string;
  title: string;
  bio: string;
  photoUrl: string;
  expertiseAreas: string[];
  linkedinUrl?: string;
  twitterUrl?: string;
  websiteUrl?: string;
  rating: number;
  totalEvents: number;
}

export const eventSpeakers: EventSpeaker[] = [
  {
    id: '1',
    name: 'Sophie Durand',
    title: 'CEO & Growth Expert',
    bio: 'Experte en stratégies de croissance et scaling de startups avec 15 ans d\'expérience. A accompagné plus de 200 entreprises dans leur développement.',
    photoUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    expertiseAreas: ['Growth Hacking', 'Marketing Digital', 'Stratégie Business'],
    linkedinUrl: 'https://linkedin.com',
    rating: 4.9,
    totalEvents: 24
  },
  {
    id: '2',
    name: 'Marc Lemaire',
    title: 'Tech Lead & CTO',
    bio: 'Ancien CTO de plusieurs scale-ups tech. Expert en architecture logicielle, IA et transformation digitale.',
    photoUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    expertiseAreas: ['Intelligence Artificielle', 'Architecture Tech', 'Innovation'],
    linkedinUrl: 'https://linkedin.com',
    rating: 4.8,
    totalEvents: 18
  },
  {
    id: '3',
    name: 'Caroline Chen',
    title: 'Investment Partner',
    bio: 'Investisseuse et mentor de startups. Spécialiste des levées de fonds et relations investisseurs.',
    photoUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    expertiseAreas: ['Levée de Fonds', 'Pitch', 'Finance'],
    linkedinUrl: 'https://linkedin.com',
    rating: 4.9,
    totalEvents: 32
  },
  {
    id: '4',
    name: 'Thomas Rousseau',
    title: 'Serial Entrepreneur',
    bio: 'Fondateur de 3 entreprises à succès. Passionné par l\'entrepreneuriat et le partage d\'expérience.',
    photoUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    expertiseAreas: ['Entrepreneuriat', 'Business Model', 'Innovation'],
    linkedinUrl: 'https://linkedin.com',
    rating: 4.7,
    totalEvents: 15
  },
  {
    id: '5',
    name: 'Laura Martinez',
    title: 'Brand Strategist',
    bio: 'Experte en branding et communication digitale. A travaillé avec plus de 100 marques internationales.',
    photoUrl: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
    expertiseAreas: ['Branding', 'Communication', 'Marketing'],
    linkedinUrl: 'https://linkedin.com',
    rating: 4.8,
    totalEvents: 21
  },
  {
    id: '6',
    name: 'David Bernard',
    title: 'Legal & Corporate Advisor',
    bio: 'Avocat spécialisé en droit des affaires et création d\'entreprise. Conseil de nombreuses startups.',
    photoUrl: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
    expertiseAreas: ['Juridique', 'Corporate', 'Compliance'],
    linkedinUrl: 'https://linkedin.com',
    rating: 4.9,
    totalEvents: 12
  }
];
