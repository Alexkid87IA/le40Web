/**
 * Studios Data
 * All available studio configurations
 */

import { Video, Mic, Radio, Users, MessageSquare, Smartphone } from 'lucide-react';
import type { Studio } from './types';

export const STUDIOS: Studio[] = [
  {
    id: 'face-cam-solo',
    name: 'Studio Face-Cam Solo',
    shortName: 'Face-Cam',
    description: 'Parfait pour vlogs, tutoriels et contenus solo',
    icon: Video,
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-500',
    basePrice: 45,
    features: ['1 caméra 4K', 'Éclairage 3 points', 'Micro cravate', 'Téléprompter inclus'],
    recommended: true,
  },
  {
    id: 'podcast-audio',
    name: 'Studio Podcast Audio',
    shortName: 'Podcast',
    description: 'Configuration audio pro pour podcasts',
    icon: Mic,
    color: 'purple',
    gradient: 'from-purple-500 to-violet-500',
    basePrice: 55,
    features: ['4 micros Shure SM7B', 'Console RodeCaster', 'Casques monitoring', 'Traitement acoustique'],
  },
  {
    id: 'live-stream',
    name: 'Studio Live Stream',
    shortName: 'Live',
    description: 'Multi-caméras pour streaming pro',
    icon: Radio,
    color: 'red',
    gradient: 'from-red-500 to-orange-500',
    basePrice: 75,
    features: ['3 caméras', 'ATEM Mini Pro', 'Overlay personnalisé', 'Chat management'],
  },
  {
    id: 'talk-show',
    name: 'Studio Émission / Talk-Show',
    shortName: 'Talk-Show',
    description: 'Plateau TV pour émissions et interviews',
    icon: Users,
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-500',
    basePrice: 95,
    features: ['Plateau 4 places', '4 caméras', 'Décor modulable', 'Régie intégrée'],
    recommended: true,
  },
  {
    id: 'interview',
    name: 'Studio Interview Intimiste',
    shortName: 'Interview',
    description: 'Ambiance cosy pour interviews profondes',
    icon: MessageSquare,
    color: 'amber',
    gradient: 'from-amber-500 to-yellow-500',
    basePrice: 65,
    features: ['2 places face à face', 'Éclairage cinématique', 'Fond bokeh', 'Son broadcast'],
  },
  {
    id: 'vertical-social',
    name: 'Studio Vertical Social',
    shortName: 'Vertical',
    description: 'Optimisé TikTok, Reels, Shorts',
    icon: Smartphone,
    color: 'pink',
    gradient: 'from-pink-500 to-rose-500',
    basePrice: 40,
    features: ['Setup vertical 9:16', 'Ring light pro', 'Fond LED RGB', 'Prompteur vertical'],
  },
];

/**
 * Find studio by ID
 */
export function findStudioById(id: string): Studio | undefined {
  return STUDIOS.find(s => s.id === id);
}

/**
 * Get recommended studios
 */
export function getRecommendedStudios(): Studio[] {
  return STUDIOS.filter(s => s.recommended);
}
