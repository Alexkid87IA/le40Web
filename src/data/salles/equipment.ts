import { Monitor, Wifi, Coffee, Mic, Video, Projector, Speaker, Thermometer } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface EquipmentCategory {
  category: string;
  icon: LucideIcon;
  items: string[];
  gradient: string;
}

export const equipmentCategories: EquipmentCategory[] = [
  {
    category: 'Audiovisuel',
    icon: Video,
    gradient: 'from-cyan-600 to-blue-600',
    items: [
      'Écrans 4K 55" à 85"',
      'Vidéoprojecteurs laser 4K',
      'Système de visioconférence HD',
      'Caméras PTZ professionnelles',
      'Tableaux blancs interactifs',
      'Écrans tactiles 75"'
    ]
  },
  {
    category: 'Son & Micro',
    icon: Mic,
    gradient: 'from-emerald-600 to-teal-600',
    items: [
      'Micros sans fil Sennheiser',
      'Système de sonorisation Bose',
      'Micros-cravates HF',
      'Enceintes professionnelles',
      'Table de mixage numérique',
      'Système Line Array pour terrasse'
    ]
  },
  {
    category: 'Connectivité',
    icon: Wifi,
    gradient: 'from-violet-600 to-purple-600',
    items: [
      'Wi-Fi Fibre 1 Gb/s',
      'HDMI / USB-C / DisplayPort',
      'Adaptateurs tous appareils',
      'Prises USB-C intégrées',
      'Wi-Fi mesh outdoor',
      'Connexion filaire RJ45'
    ]
  },
  {
    category: 'Confort',
    icon: Thermometer,
    gradient: 'from-orange-600 to-amber-600',
    items: [
      'Climatisation individuelle',
      'Éclairage LED modulable',
      'Mobilier ergonomique Herman Miller',
      'Isolation phonique renforcée',
      'Stores électriques',
      'Brumisateurs extérieurs'
    ]
  },
  {
    category: 'Présentation',
    icon: Projector,
    gradient: 'from-pink-600 to-rose-600',
    items: [
      'Paper-board digital',
      'Murs d\'écriture magnétiques',
      'Pupitre professionnel ajustable',
      'Pointeurs laser',
      'Télécommandes de présentation',
      'Support documents'
    ]
  },
  {
    category: 'Restauration',
    icon: Coffee,
    gradient: 'from-yellow-600 to-amber-600',
    items: [
      'Machine Nespresso Pro',
      'Bouilloire électrique',
      'Réfrigérateur',
      'Vaisselle complète',
      'Bar équipé avec cave à vin',
      'Espace cocktail mobile'
    ]
  }
];
