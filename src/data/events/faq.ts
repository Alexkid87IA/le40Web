export interface EventFAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const eventsFAQ: EventFAQ[] = [
  {
    id: '1',
    question: 'Comment m\'inscrire à un événement ?',
    answer: 'Cliquez sur le bouton "S\'inscrire" de l\'événement qui vous intéresse. Vous serez guidé à travers un processus simple où vous renseignerez vos coordonnées et procéderez au paiement si l\'événement est payant. Vous recevrez une confirmation par email avec tous les détails.',
    category: 'inscription'
  },
  {
    id: '2',
    question: 'Puis-je annuler mon inscription ?',
    answer: 'Oui, vous pouvez annuler votre inscription jusqu\'à 48h avant l\'événement pour un remboursement complet. Entre 48h et 24h, un remboursement de 50% est appliqué. En dessous de 24h, aucun remboursement n\'est possible, mais vous pouvez transférer votre place à quelqu\'un d\'autre.',
    category: 'inscription'
  },
  {
    id: '3',
    question: 'Les événements sont-ils réservés aux membres ?',
    answer: 'Non ! La plupart de nos événements sont ouverts à tous. Les membres bénéficient de tarifs préférentiels et d\'un accès prioritaire à certains événements à capacité limitée. Certains événements exclusifs sont réservés aux membres uniquement.',
    category: 'acces'
  },
  {
    id: '4',
    question: 'Que se passe-t-il si l\'événement est complet ?',
    answer: 'Si un événement affiche complet, vous pouvez vous inscrire sur la liste d\'attente. Nous vous notifierons automatiquement par email si une place se libère. Les places sont attribuées selon l\'ordre d\'inscription sur la liste d\'attente.',
    category: 'inscription'
  },
  {
    id: '5',
    question: 'Recevrai-je un certificat de participation ?',
    answer: 'Oui, pour toutes les formations et masterclasses, un certificat de participation vous sera délivré par email dans les 48h suivant l\'événement. Pour les autres types d\'événements, un certificat peut être fourni sur demande.',
    category: 'participation'
  },
  {
    id: '6',
    question: 'Puis-je amener un invité ?',
    answer: 'Cela dépend de l\'événement. Les afterworks et événements networking permettent généralement d\'amener un invité moyennant un supplément. Pour les formations et ateliers à places limitées, chaque participant doit s\'inscrire individuellement.',
    category: 'participation'
  },
  {
    id: '7',
    question: 'Y a-t-il des tarifs de groupe ?',
    answer: 'Oui ! Pour les réservations de 5 personnes ou plus, nous proposons des tarifs de groupe avec une réduction de 20%. Contactez-nous directement pour obtenir un devis personnalisé pour votre équipe.',
    category: 'tarifs'
  },
  {
    id: '8',
    question: 'Les événements sont-ils enregistrés ?',
    answer: 'Les conférences et masterclasses sont généralement enregistrées. Les participants reçoivent un lien vers le replay et les supports de présentation dans les 7 jours suivant l\'événement. Les sessions confidentielles et ateliers pratiques ne sont pas enregistrés.',
    category: 'participation'
  },
  {
    id: '9',
    question: 'Comment proposer un sujet d\'événement ?',
    answer: 'Nous adorons les suggestions de notre communauté ! Envoyez-nous vos idées via le formulaire de contact ou par email. Si vous souhaitez animer un événement, consultez notre section "Devenir intervenant" pour plus d\'informations.',
    category: 'organisation'
  },
  {
    id: '10',
    question: 'Les repas sont-ils inclus ?',
    answer: 'Pour les événements d\'une demi-journée ou plus, des rafraîchissements et snacks sont toujours inclus. Les événements afterwork incluent généralement des tapas et boissons. Pour les formations full-day, le déjeuner est inclus ou un temps de pause déjeuner est prévu à proximité.',
    category: 'pratique'
  },
  {
    id: '11',
    question: 'L\'espace est-il accessible PMR ?',
    answer: 'Oui, tous nos espaces sont accessibles aux personnes à mobilité réduite. Si vous avez des besoins spécifiques, merci de nous contacter à l\'avance pour que nous puissions préparer votre accueil dans les meilleures conditions.',
    category: 'pratique'
  },
  {
    id: '12',
    question: 'Comment devenir intervenant ?',
    answer: 'Si vous avez une expertise à partager, nous serions ravis d\'échanger avec vous ! Envoyez-nous votre proposition d\'intervention avec votre CV et une description de votre sujet. Notre équipe évalue chaque proposition et vous recontactera sous 2 semaines.',
    category: 'organisation'
  }
];
