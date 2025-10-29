export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "Comment réserver une salle de réunion ?",
    answer: "Choisissez votre salle, sélectionnez la durée souhaitée et ajoutez-la au panier. Vous pouvez également nous contacter directement pour une réservation assistée ou des besoins spécifiques."
  },
  {
    question: "Puis-je annuler ou modifier ma réservation ?",
    answer: "Oui, vous pouvez annuler gratuitement jusqu'à 24h avant le début de votre réservation. Les modifications sont possibles selon les disponibilités."
  },
  {
    question: "Le matériel technique est-il inclus ?",
    answer: "Tout l'équipement listé pour chaque salle est inclus dans le tarif : écrans, projecteurs, systèmes audio, Wi-Fi haut débit, etc. Aucun frais caché."
  },
  {
    question: "Y a-t-il un service de restauration ?",
    answer: "Nous pouvons organiser des services traiteur pour vos événements. Contactez-nous pour discuter de vos besoins en restauration et recevoir un devis personnalisé."
  },
  {
    question: "Les salles sont-elles accessibles en dehors des heures d'ouverture ?",
    answer: "Les créneaux standards sont de 8h à 20h. Pour des besoins en soirée ou weekend, contactez-nous directement pour vérifier la disponibilité et les conditions."
  },
  {
    question: "Puis-je visiter les salles avant de réserver ?",
    answer: "Absolument ! Nous vous invitons à visiter nos espaces sur rendez-vous. Contactez-nous pour planifier votre visite guidée."
  }
];
