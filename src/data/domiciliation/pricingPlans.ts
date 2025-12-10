export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  savings: string[];
  gradient: string;
  popular: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'domiciliation-starter',
    name: 'STARTER',
    price: 39,
    period: '/mois',
    description: 'Freelances & Auto',
    features: [
      'Votre courrier (scan 2h)',
      'Votre adresse officielle',
      'Vos attestations',
      'Réexpédition 1x/semaine'
    ],
    savings: [
      '5h/mois de paperasse',
      '0€ de location bureau',
      '100% conformité garantie'
    ],
    gradient: 'from-zinc-600 to-gray-600',
    popular: false
  },
  {
    id: 'domiciliation-business',
    name: 'BUSINESS',
    price: 79,
    period: '/mois',
    description: 'SARL, SAS, PME',
    features: [
      'Standard téléphonique pro',
      'Accueil clients',
      '2h salle/mois',
      'Réexpédition quotidienne',
      'Google Business Profile'
    ],
    savings: [
      '300€/mois de secrétariat',
      '150€/mois de salle',
      'Image d\'entreprise établie'
    ],
    gradient: 'from-amber-600 to-orange-600',
    popular: true
  },
  {
    id: 'domiciliation-premium',
    name: 'SCALE-UP',
    price: 149,
    period: '/mois',
    description: 'UP',
    features: [
      'Secrétariat dédié',
      '8h salle/mois',
      '4h bureau privatif/mois',
      'Gestion administrative',
      'Conseiller prioritaire'
    ],
    savings: [
      '800€/mois de location',
      '1000€/mois d\'assistante',
      'Infrastructure complète'
    ],
    gradient: 'from-orange-600 to-red-600',
    popular: false
  }
];
