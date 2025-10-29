import { Utensils, Camera, Headphones, Package, Users as UsersIcon, Sparkles } from 'lucide-react';

export interface AdditionalService {
  id: string;
  name: string;
  description: string;
  price: string;
  icon: any;
  gradient: string;
  features: string[];
  popular?: boolean;
}

export const additionalServices: AdditionalService[] = [
  {
    id: 'catering',
    name: 'Service Traiteur',
    description: 'Menu sur-mesure préparé par nos chefs partenaires',
    price: 'À partir de 25€/pers',
    icon: Utensils,
    gradient: 'from-orange-600 to-amber-600',
    features: [
      'Petit-déjeuner continental',
      'Déjeuner buffet ou assis',
      'Pauses café & snacks',
      'Cocktail dînatoire',
      'Menu végétarien/vegan',
      'Options allergies'
    ],
    popular: true
  },
  {
    id: 'photo-video',
    name: 'Photo & Vidéo',
    description: 'Captez les moments clés de votre événement',
    price: 'À partir de 300€',
    icon: Camera,
    gradient: 'from-pink-600 to-rose-600',
    features: [
      'Photographe professionnel',
      'Vidéaste avec montage',
      'Streaming en direct',
      'Enregistrement conférence',
      'Photos livrées sous 48h',
      'Droits d\'utilisation complets'
    ]
  },
  {
    id: 'tech-support',
    name: 'Support Technique',
    description: 'Assistance technique dédiée pour votre événement',
    price: '150€/demi-journée',
    icon: Headphones,
    gradient: 'from-cyan-600 to-blue-600',
    features: [
      'Technicien sur place',
      'Configuration audiovisuelle',
      'Support visioconférence',
      'Dépannage matériel',
      'Tests avant événement',
      'Support régie son/lumière'
    ]
  },
  {
    id: 'equipment-rental',
    name: 'Location Matériel',
    description: 'Équipement supplémentaire selon vos besoins',
    price: 'Sur devis',
    icon: Package,
    gradient: 'from-emerald-600 to-teal-600',
    features: [
      'Écrans supplémentaires',
      'Micros additionnels',
      'Mobilier modulable',
      'Décoration sur-mesure',
      'Matériel créatif',
      'Signalétique personnalisée'
    ]
  },
  {
    id: 'event-coordination',
    name: 'Coordination Événement',
    description: 'Notre équipe organise tout pour vous',
    price: 'À partir de 500€',
    icon: UsersIcon,
    gradient: 'from-violet-600 to-purple-600',
    features: [
      'Planification complète',
      'Coordination logistique',
      'Gestion fournisseurs',
      'Accueil des participants',
      'Déroulé minute par minute',
      'Compte-rendu post-événement'
    ],
    popular: true
  },
  {
    id: 'decoration',
    name: 'Décoration Premium',
    description: 'Ambiance personnalisée pour votre événement',
    price: 'À partir de 200€',
    icon: Sparkles,
    gradient: 'from-yellow-600 to-orange-600',
    features: [
      'Décoration thématique',
      'Fleurs fraîches',
      'Éclairage d\'ambiance',
      'Branding personnalisé',
      'Goodies sur-mesure',
      'Installation & démontage'
    ]
  }
];
