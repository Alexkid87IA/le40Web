import { Search, Calendar, CreditCard, CheckCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  duration: string;
}

export const reservationProcess: ProcessStep[] = [
  {
    number: '01',
    title: 'Découvrez nos espaces',
    description: 'Parcourez notre sélection de 5 salles uniques et choisissez celle qui correspond à vos besoins',
    icon: Search,
    gradient: 'from-cyan-600 to-blue-600',
    duration: '2 min'
  },
  {
    number: '02',
    title: 'Vérifiez la disponibilité',
    description: 'Consultez notre calendrier en temps réel et sélectionnez votre créneau horaire idéal',
    icon: Calendar,
    gradient: 'from-emerald-600 to-teal-600',
    duration: '1 min'
  },
  {
    number: '03',
    title: 'Réservez en ligne',
    description: 'Paiement sécurisé par carte bancaire. Confirmation immédiate par email et SMS',
    icon: CreditCard,
    gradient: 'from-violet-600 to-purple-600',
    duration: '2 min'
  },
  {
    number: '04',
    title: 'Profitez de votre espace',
    description: 'Arrivez 15 min avant. Notre équipe vous accueille et prépare votre salle selon vos besoins',
    icon: CheckCircle,
    gradient: 'from-pink-600 to-rose-600',
    duration: 'Le jour J'
  }
];
