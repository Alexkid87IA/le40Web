export interface EventCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  colorGradient: string;
  displayOrder: number;
}

export const eventCategories: EventCategory[] = [
  {
    id: '1',
    name: 'Networking',
    slug: 'networking',
    description: 'Rencontrez des entrepreneurs, développez votre réseau professionnel et créez des opportunités de collaboration',
    iconName: 'Users',
    colorGradient: 'from-cyan-600 to-blue-600',
    displayOrder: 1
  },
  {
    id: '2',
    name: 'Formation',
    slug: 'formation',
    description: 'Formations pratiques et ateliers intensifs pour développer vos compétences entrepreneuriales',
    iconName: 'GraduationCap',
    colorGradient: 'from-blue-600 to-cyan-600',
    displayOrder: 2
  },
  {
    id: '3',
    name: 'Conférence',
    slug: 'conference',
    description: 'Conférences inspirantes avec des experts et leaders d\'opinion de votre industrie',
    iconName: 'Mic2',
    colorGradient: 'from-cyan-600 to-teal-600',
    displayOrder: 3
  },
  {
    id: '4',
    name: 'Atelier',
    slug: 'atelier',
    description: 'Ateliers pratiques et sessions hands-on pour maîtriser de nouvelles compétences',
    iconName: 'Wrench',
    colorGradient: 'from-orange-600 to-amber-600',
    displayOrder: 4
  },
  {
    id: '5',
    name: 'Afterwork',
    slug: 'afterwork',
    description: 'Événements conviviaux pour networker dans une ambiance décontractée',
    iconName: 'Wine',
    colorGradient: 'from-pink-600 to-rose-600',
    displayOrder: 5
  },
  {
    id: '6',
    name: 'Masterclass',
    slug: 'masterclass',
    description: 'Sessions d\'expertise approfondie avec des professionnels reconnus',
    iconName: 'Award',
    colorGradient: 'from-amber-600 to-yellow-600',
    displayOrder: 6
  }
];
