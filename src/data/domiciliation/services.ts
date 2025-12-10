import { LucideIcon } from 'lucide-react';

export interface ServiceTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface DetailedService {
  icon: LucideIcon;
  title: string;
  color: string;
  bgColor: string;
  features: string[];
  testimonial: ServiceTestimonial;
}

import {
  Mail, Phone, Building2, Shield, Globe, Users, Clock, Sparkles
} from 'lucide-react';

export const detailedServices: DetailedService[] = [
  {
    icon: Mail,
    title: 'Gestion Courrier Intelligente',
    color: 'text-orange-400',
    bgColor: 'from-zinc-900 to-zinc-800',
    features: [
      'Réception de tout votre courrier pro',
      'Scan HD sous 2 heures (vraiment)',
      'Upload automatique sur votre espace cloud',
      'Notification push sur votre tel',
      'Réexpédition où vous voulez, quand vous voulez',
      'Archive 12 mois en ligne'
    ],
    testimonial: {
      quote: 'Avant, je ratais des courriers importants. Maintenant, je scanne mon téléphone dans le métro.',
      author: 'Sophie',
      role: 'e-commerce'
    }
  },
  {
    icon: Phone,
    title: 'Standard Téléphonique Pro',
    color: 'text-blue-400',
    bgColor: 'from-zinc-900 to-zinc-800',
    features: [
      'Profitez de la ligne fixe 04 du 40',
      'Accueil pro personnalisé',
      'Messages pris et transmis'
    ],
    testimonial: {
      quote: 'Mes clients pensent que j\'ai une vraie équipe. Ça change tout pour la crédibilité.',
      author: 'Marc',
      role: 'consultant'
    }
  },
  {
    icon: Building2,
    title: 'Salles de Réunion (VRAIMENT INCLUSES)',
    color: 'text-purple-400',
    bgColor: 'from-zinc-900 to-zinc-800',
    features: [
      '2h à 8h/mois selon formule (pas de supplément)',
      'Réservation en 2 clics sur l\'app',
      'Salles équipées : écran, wifi pro, café',
      'Accueil de vos clients à la réception',
      'Ambiance pro, pas "salle des fêtes"'
    ],
    testimonial: {
      quote: 'Je reçois mes clients ici plutôt que dans un café. J\'ai signé 40% plus de contrats depuis.',
      author: 'Julie',
      role: 'agence comm'
    }
  },
  {
    icon: Shield,
    title: 'Conformité & Administratif',
    color: 'text-green-400',
    bgColor: 'from-zinc-900 to-zinc-800',
    features: [
      'Attestation de domiciliation officielle',
      'Agrément Préfecture (les autres disent "oui" sans l\'avoir)',
      'Mise à jour automatique INSEE/Infogreffe',
      'Renouvellement géré pour vous',
      'Support admin dédié si besoin'
    ],
    testimonial: {
      quote: 'Lors du contrôle Urssaf, tout était carré. Zéro stress, zéro problème.',
      author: 'David',
      role: 'auto-entrepreneur'
    }
  },
  {
    icon: Globe,
    title: 'Présence Digitale',
    color: 'text-cyan-400',
    bgColor: 'from-zinc-900 to-zinc-800',
    features: [
      'Google Business Profile optimisé',
      'Référencement local automatique',
      'Adresse visible sur Google Maps',
      'Renforce votre crédibilité en ligne',
      'Améliore votre visibilité locale'
    ],
    testimonial: {
      quote: 'Mes clients me trouvent facilement sur Google. C\'est un vrai plus pour mon business.',
      author: 'Emma',
      role: 'freelance'
    }
  },
  {
    icon: Users,
    title: 'Accueil Client Premium',
    color: 'text-pink-400',
    bgColor: 'from-zinc-900 to-zinc-800',
    features: [
      'Réception de vos visiteurs professionnelle',
      'Espace d\'attente confortable',
      'Café offert à vos clients',
      'Notification immédiate de leur arrivée',
      'Image de marque renforcée'
    ],
    testimonial: {
      quote: 'L\'accueil fait toute la différence. Mes clients sont impressionnés dès leur arrivée.',
      author: 'Thomas',
      role: 'startup'
    }
  },
  {
    icon: Clock,
    title: 'Accès Coworking',
    color: 'text-amber-400',
    bgColor: 'from-zinc-900 to-zinc-800',
    features: [
      'Accès aux espaces selon formule',
      'Wi-Fi ultra-rapide',
      'Café et thé à volonté',
      'Ambiance inspirante',
      'Networking avec la communauté'
    ],
    testimonial: {
      quote: 'Quand j\'ai besoin de sortir de chez moi, je viens travailler ici. C\'est parfait.',
      author: 'Laura',
      role: 'designer'
    }
  },
  {
    icon: Sparkles,
    title: 'Conseiller Dédié',
    color: 'text-yellow-400',
    bgColor: 'from-zinc-900 to-zinc-800',
    features: [
      'Interlocuteur unique qui connaît votre dossier',
      'Réponse en moins d\'1h en moyenne',
      'Accompagnement personnalisé',
      'Conseils administratifs',
      'Humain, pas un chatbot'
    ],
    testimonial: {
      quote: 'J\'ai toujours une réponse rapide. C\'est rassurant de savoir que quelqu\'un suit mon dossier.',
      author: 'Pierre',
      role: 'entrepreneur'
    }
  }
];
