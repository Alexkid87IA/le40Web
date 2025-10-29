import { Briefcase, Users, Lightbulb, GraduationCap, Presentation, PartyPopper } from 'lucide-react';

export interface EventType {
  title: string;
  description: string;
  icon: any;
  gradient: string;
  recommendedSpaces: string[];
  examples: string[];
  image: string;
}

export const eventTypes: EventType[] = [
  {
    title: 'Réunions d\'affaires',
    description: 'Espaces professionnels pour vos rendez-vous clients, comités de direction et réunions stratégiques',
    icon: Briefcase,
    gradient: 'from-cyan-600 to-blue-600',
    recommendedSpaces: ['Salle Focus', 'Salle Créative'],
    examples: ['Comité de direction', 'Rendez-vous clients', 'Entretiens d\'embauche', 'Pitch investisseurs'],
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600'
  },
  {
    title: 'Ateliers & Brainstorming',
    description: 'Espaces créatifs modulables pour libérer la créativité de vos équipes',
    icon: Lightbulb,
    gradient: 'from-emerald-600 to-teal-600',
    recommendedSpaces: ['Salle Créative', 'Lounge & Café'],
    examples: ['Design thinking', 'Sprint créatif', 'Hackathon', 'Innovation workshop'],
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1600'
  },
  {
    title: 'Formations & Séminaires',
    description: 'Salles équipées pour vos formations professionnelles et séminaires d\'entreprise',
    icon: GraduationCap,
    gradient: 'from-violet-600 to-purple-600',
    recommendedSpaces: ['Salle de Conférence', 'Salle Créative'],
    examples: ['Formation interne', 'Séminaire annuel', 'Team building', 'Onboarding'],
    image: 'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1600'
  },
  {
    title: 'Conférences & Keynotes',
    description: 'Espaces événementiels pour vos grandes conférences et présentations publiques',
    icon: Presentation,
    gradient: 'from-orange-600 to-amber-600',
    recommendedSpaces: ['Salle de Conférence', 'Terrasse Panoramique'],
    examples: ['Lancement produit', 'Conférence de presse', 'Keynote speaker', 'Table ronde'],
    image: 'https://images.pexels.com/photos/3321793/pexels-photo-3321793.jpeg?auto=compress&cs=tinysrgb&w=1600'
  },
  {
    title: 'Networking & Afterwork',
    description: 'Espaces conviviaux pour vos événements de networking et soirées d\'entreprise',
    icon: Users,
    gradient: 'from-pink-600 to-rose-600',
    recommendedSpaces: ['Terrasse Panoramique', 'Lounge & Café'],
    examples: ['Afterwork', 'Soirée de networking', 'Cocktail entreprise', 'Meet-up'],
    image: 'https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg?auto=compress&cs=tinysrgb&w=1600'
  },
  {
    title: 'Événements privés',
    description: 'Espaces privatisables pour vos célébrations et événements spéciaux',
    icon: PartyPopper,
    gradient: 'from-yellow-600 to-orange-600',
    recommendedSpaces: ['Terrasse Panoramique', 'Lounge & Café'],
    examples: ['Anniversaire entreprise', 'Pot de départ', 'Célébration', 'Gala'],
    image: 'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=1600'
  }
];
