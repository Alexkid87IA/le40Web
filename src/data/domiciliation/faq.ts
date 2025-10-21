export interface FAQItem {
  question: string;
  answer: string;
  highlight: string | null;
  hasVideo: boolean;
}

export const faqItems: FAQItem[] = [
  {
    question: 'Le scan en 2h, c\'est vraiment vrai ?',
    answer: 'Oui, absolument. Votre courrier arrive le matin, on le scanne avant midi. Vous recevez une notification sur votre téléphone avec le scan en pièce jointe.',
    highlight: 'Regardez comment ça fonctionne',
    hasVideo: true
  },
  {
    question: 'Je peux vraiment utiliser la salle 2h/mois ?',
    answer: 'Oui, c\'est inclus dans le prix. Réservation en ligne simple, annulation gratuite jusqu\'à 24h avant. Aucun frais caché.',
    highlight: 'Voir le planning de disponibilité',
    hasVideo: false
  },
  {
    question: 'Qu\'arrive-t-il si je rate un appel ?',
    answer: 'Notre standard prend le message et vous l\'envoie par email immédiatement. Vous pouvez aussi configurer un transfert automatique vers votre mobile.',
    highlight: null,
    hasVideo: false
  },
  {
    question: 'L\'agrément Préfecture, c\'est obligatoire ?',
    answer: 'Oui ! C\'est une obligation légale pour toute société de domiciliation. Nous avons cet agrément, et il est vérifiable. Méfiez-vous des offres qui ne le mentionnent pas.',
    highlight: null,
    hasVideo: false
  },
  {
    question: 'Je peux changer de formule ?',
    answer: 'Oui, à tout moment. Upgrade immédiat, downgrade au prochain cycle de facturation. Pas de pénalités.',
    highlight: null,
    hasVideo: false
  },
  {
    question: 'C\'est légal de ne pas avoir de bureau physique ?',
    answer: 'Totalement légal avec une domiciliation conforme. Notre attestation est reconnue par tous les organismes (URSSAF, impôts, banques, etc.).',
    highlight: null,
    hasVideo: false
  },
  {
    question: 'Mon courrier est-il en sécurité ?',
    answer: 'Oui. Stockage sécurisé, scan confidentiel, archive chiffrée. Seul vous avez accès à vos documents numérisés.',
    highlight: null,
    hasVideo: false
  },
  {
    question: 'Différence avec les concurrents ?',
    answer: 'Les autres vendent une adresse. Nous gérons TOUT : scan 2h, standard inclus, salles incluses, conseiller dédié. C\'est un service complet, pas juste une boîte aux lettres.',
    highlight: null,
    hasVideo: false
  }
];
