export const pricingPlans = [
  {
    id: "monthly",
    name: "Mensuel",
    price: 50,
    period: "mois",
    description: "Parfait pour découvrir Le Club",
    isMostPopular: false,
    features: [
      "Accès illimité à tous les événements",
      "Plateforme collaborative privée",
      "120+ entrepreneurs actifs",
      "15+ événements par mois",
      "Tarifs préférentiels espaces (-20%)",
      "Réseau d'experts qualifiés",
      "Sans engagement"
    ],
    gradient: "from-orange-500 via-amber-500 to-yellow-500"
  },
  {
    id: "quarterly",
    name: "Trimestriel",
    price: 45,
    originalPrice: 50,
    period: "mois",
    billedAs: "135€ facturés tous les 3 mois",
    description: "Le meilleur rapport qualité-prix",
    savings: "Économisez 15€",
    isMostPopular: true,
    features: [
      "Tous les avantages du plan mensuel",
      "Économie de 15€ sur 3 mois",
      "Priorité sur les événements premium",
      "Invitations événements exclusifs",
      "Badge membre premium",
      "Support prioritaire",
      "Flexibilité totale"
    ],
    gradient: "from-emerald-500 via-teal-500 to-cyan-500"
  },
  {
    id: "annual",
    name: "Annuel",
    price: 40,
    originalPrice: 50,
    period: "mois",
    billedAs: "480€ facturés annuellement",
    description: "Pour les membres engagés",
    savings: "Économisez 120€",
    isMostPopular: false,
    features: [
      "Tous les avantages des plans précédents",
      "Économie de 120€ sur l'année",
      "Accès VIP aux événements",
      "3 invitations gratuites pour vos contacts",
      "Coaching trimestriel individuel",
      "Participation aux décisions du Club",
      "Badge membre fondateur"
    ],
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500"
  }
];

export const comparisonFeatures = [
  {
    category: "Événements",
    features: [
      {
        name: "Afterworks networking",
        visitor: "Sur invitation",
        member: "Illimité"
      },
      {
        name: "Hotseats sessions",
        visitor: "Non inclus",
        member: "Illimité"
      },
      {
        name: "Masterclasses",
        visitor: "150€/session",
        member: "Illimité"
      },
      {
        name: "Ateliers pratiques",
        visitor: "80€/atelier",
        member: "Illimité"
      },
      {
        name: "Événements exclusifs",
        visitor: "Non accessible",
        member: "Accès prioritaire"
      }
    ]
  },
  {
    category: "Communauté",
    features: [
      {
        name: "Réseau entrepreneurs",
        visitor: "Limité",
        member: "120+ membres"
      },
      {
        name: "Plateforme collaborative",
        visitor: "Non accessible",
        member: "24/7"
      },
      {
        name: "Mise en relation experts",
        visitor: "Non inclus",
        member: "Illimité"
      },
      {
        name: "Groupes d'entraide",
        visitor: "Non accessible",
        member: "Accès complet"
      }
    ]
  },
  {
    category: "Avantages",
    features: [
      {
        name: "Réduction bureaux/salles",
        visitor: "0%",
        member: "Jusqu'à -20%"
      },
      {
        name: "Réduction studios",
        visitor: "0%",
        member: "Jusqu'à -15%"
      },
      {
        name: "Priorité réservations",
        visitor: "Non",
        member: "Oui"
      },
      {
        name: "Coworking collaboratif",
        visitor: "Non inclus",
        member: "Hebdomadaire"
      }
    ]
  }
];
