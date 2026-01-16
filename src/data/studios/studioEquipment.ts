import { Camera, Mic, Lightbulb, Monitor } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface EquipmentItem {
  name: string;
  value: number;
  description?: string;
}

export interface EquipmentCategory {
  category: string;
  icon: LucideIcon;
  gradient: string;
  items: EquipmentItem[];
}

export const studioEquipmentCategories: EquipmentCategory[] = [
  {
    category: 'Caméras',
    icon: Camera,
    gradient: 'from-rose-600 to-fuchsia-600',
    items: [
      {
        name: 'Sony FX3 4K 120fps',
        value: 4500,
        description: 'Le standard des créateurs pro'
      },
      {
        name: 'Caméra PTZ robotisée',
        value: 2800,
        description: 'Suivi automatique streaming'
      },
      {
        name: 'Objectifs cinéma',
        value: 1500,
        description: 'Optiques premium Sigma'
      }
    ]
  },
  {
    category: 'Audio',
    icon: Mic,
    gradient: 'from-fuchsia-600 to-purple-600',
    items: [
      {
        name: 'Shure SM7B (x8)',
        value: 450,
        description: 'La voix des plus grands podcasts'
      },
      {
        name: 'RØDECaster Pro II',
        value: 699,
        description: 'Console broadcast professionnelle'
      },
      {
        name: 'Micros cravate sans fil',
        value: 350,
        description: 'Sennheiser EW 112P'
      },
      {
        name: 'Interface audio Focusrite',
        value: 450,
        description: 'Préamplis studio class A'
      }
    ]
  },
  {
    category: 'Lumières',
    icon: Lightbulb,
    gradient: 'from-purple-600 to-violet-600',
    items: [
      {
        name: 'Softbox ARRI',
        value: 800,
        description: 'Éclairage cinéma professionnel'
      },
      {
        name: 'LED RGB Aputure',
        value: 650,
        description: 'Couleurs personnalisables'
      },
      {
        name: 'Ring Light 18" Neewer',
        value: 200,
        description: 'Parfait pour face-cam'
      },
      {
        name: 'Panneaux LED bicolores',
        value: 400,
        description: 'Température ajustable'
      }
    ]
  },
  {
    category: 'Régie & Streaming',
    icon: Monitor,
    gradient: 'from-pink-600 to-rose-600',
    items: [
      {
        name: 'ATEM Mini Pro',
        value: 495,
        description: 'Diffusion broadcast en direct'
      },
      {
        name: 'Téléprompter 15"',
        value: 350,
        description: 'Lectures fluides'
      },
      {
        name: 'Moniteurs de contrôle 4K',
        value: 400,
        description: 'Référence couleur précise'
      },
      {
        name: 'Stream Deck XL',
        value: 250,
        description: 'Contrôle régie tactile'
      }
    ]
  }
];
