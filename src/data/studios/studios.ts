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
    longDescription: 'Le studio Face-Cam Solo est conçu pour les créateurs de contenu qui souhaitent produire des vidéos de qualité professionnelle en toute autonomie. Idéal pour les vlogs, tutoriels, formations en ligne et contenus solo. L\'éclairage 3 points professionnel garantit un rendu cinématique impeccable.',
    icon: Video,
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-500',
    basePrice: 45,
    features: ['1 caméra 4K', 'Éclairage 3 points', 'Micro cravate', 'Téléprompter inclus'],
    equipment: [
      'Caméra Sony A7S III 4K',
      'Éclairage Aputure 300D II',
      'Micro cravate Rode Wireless GO II',
      'Téléprompter professionnel',
      'Fond vert/noir/blanc',
      'Moniteur de retour 24"'
    ],
    useCases: ['Vlogs YouTube', 'Tutoriels', 'Formations en ligne', 'Présentations produit', 'Témoignages clients'],
    capacity: '1 personne',
    image: '/images/studios/face-cam.jpg',
    recommended: true,
  },
  {
    id: 'podcast-audio',
    name: 'Studio Podcast Audio',
    shortName: 'Podcast',
    description: 'Configuration audio pro pour podcasts',
    longDescription: 'Notre studio Podcast offre une acoustique parfaite et un équipement broadcast de qualité radio. Avec 4 micros Shure SM7B et une console RodeCaster Pro II, vous êtes prêt pour enregistrer des podcasts au son cristallin. Le traitement acoustique professionnel élimine tous les bruits parasites.',
    icon: Mic,
    color: 'purple',
    gradient: 'from-purple-500 to-violet-500',
    basePrice: 55,
    features: ['4 micros Shure SM7B', 'Console RodeCaster', 'Casques monitoring', 'Traitement acoustique'],
    equipment: [
      '4x Micros Shure SM7B',
      'Console RodeCaster Pro II',
      '4x Casques Audio-Technica ATH-M50x',
      'Traitement acoustique premium',
      'Bras articulés Rode PSA1',
      'Interface audio Focusrite Scarlett',
      'Enregistrement multi-piste'
    ],
    useCases: ['Podcasts', 'Interviews audio', 'Voice-over', 'Audiobooks', 'Émissions radio'],
    capacity: '1 à 4 personnes',
    image: '/images/studios/podcast.jpg',
  },
  {
    id: 'live-stream',
    name: 'Studio Live Stream',
    shortName: 'Live',
    description: 'Multi-caméras pour streaming pro',
    longDescription: 'Le studio Live Stream est optimisé pour les diffusions en direct professionnelles. Équipé de 3 caméras, d\'un mélangeur ATEM Mini Pro et d\'overlays personnalisables, vous pouvez streamer sur Twitch, YouTube ou LinkedIn avec une qualité broadcast. Support technique disponible pour vos premiers lives.',
    icon: Radio,
    color: 'red',
    gradient: 'from-red-500 to-orange-500',
    basePrice: 75,
    features: ['3 caméras', 'ATEM Mini Pro', 'Overlay personnalisé', 'Chat management'],
    equipment: [
      '3x Caméras Sony PTZ',
      'Mélangeur Blackmagic ATEM Mini Pro ISO',
      'Encodeur streaming dédié',
      'Overlays et lower thirds personnalisables',
      'Écran de retour chat',
      'Éclairage LED RGB',
      'Connexion fibre 1Gbps'
    ],
    useCases: ['Streaming Twitch/YouTube', 'Webinaires', 'Événements virtuels', 'Gaming', 'E-sport'],
    capacity: '1 à 2 personnes',
    image: '/images/studios/live-stream.jpg',
  },
  {
    id: 'talk-show',
    name: 'Studio Émission / Talk-Show',
    shortName: 'Talk-Show',
    description: 'Plateau TV pour émissions et interviews',
    longDescription: 'Notre plateau Talk-Show reproduit les conditions d\'un vrai studio TV. Avec 4 caméras, un décor modulable et une régie intégrée, vous pouvez produire des émissions dignes des grandes chaînes. Parfait pour les interviews de groupe, les débats et les émissions corporate.',
    icon: Users,
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-500',
    basePrice: 95,
    features: ['Plateau 4 places', '4 caméras', 'Décor modulable', 'Régie intégrée'],
    equipment: [
      '4x Caméras broadcast Sony',
      'Plateau modulable 4 places',
      'Décors interchangeables',
      'Régie complète avec opérateur',
      'Éclairage studio professionnel',
      'Micros HF Sennheiser',
      'Système d\'IFB (retour oreillette)',
      'Maquillage disponible'
    ],
    useCases: ['Talk-shows', 'Débats', 'Interviews groupe', 'Émissions corporate', 'Conférences de presse'],
    capacity: '2 à 6 personnes',
    image: '/images/studios/talk-show.jpg',
    recommended: true,
  },
  {
    id: 'interview',
    name: 'Studio Interview Intimiste',
    shortName: 'Interview',
    description: 'Ambiance cosy pour interviews profondes',
    longDescription: 'Le studio Interview Intimiste crée une atmosphère chaleureuse propice aux conversations authentiques. L\'éclairage cinématique et le fond bokeh naturel donnent un rendu premium. Idéal pour les interviews profondes, les témoignages et les contenus émotionnels.',
    icon: MessageSquare,
    color: 'amber',
    gradient: 'from-amber-500 to-yellow-500',
    basePrice: 65,
    features: ['2 places face à face', 'Éclairage cinématique', 'Fond bokeh', 'Son broadcast'],
    equipment: [
      '2x Caméras Sony FX3',
      'Éclairage Aputure cinématique',
      'Fond naturel avec bokeh',
      '2x Micros cravate Sennheiser',
      'Fauteuils confort premium',
      'Table basse design',
      'Plantes et déco'
    ],
    useCases: ['Interviews intimistes', 'Témoignages', 'Portraits', 'Contenus corporate', 'Documentaires'],
    capacity: '2 personnes',
    image: '/images/studios/interview.jpg',
  },
  {
    id: 'vertical-social',
    name: 'Studio Vertical Social',
    shortName: 'Vertical',
    description: 'Optimisé TikTok, Reels, Shorts',
    longDescription: 'Le studio Vertical Social est spécialement conçu pour les formats courts verticaux. Setup 9:16 optimisé pour TikTok, Instagram Reels et YouTube Shorts. Le fond LED RGB permet des ambiances variées et le prompteur vertical facilite vos prises.',
    icon: Smartphone,
    color: 'pink',
    gradient: 'from-pink-500 to-rose-500',
    basePrice: 40,
    features: ['Setup vertical 9:16', 'Ring light pro', 'Fond LED RGB', 'Prompteur vertical'],
    equipment: [
      'Caméra Sony ZV-E10 (format vertical)',
      'Ring light professionnel 18"',
      'Fond LED RGB programmable',
      'Prompteur vertical',
      'Micro directionnel',
      'Support smartphone/caméra',
      'Effets lumineux TikTok'
    ],
    useCases: ['TikTok', 'Instagram Reels', 'YouTube Shorts', 'Stories', 'Snack content'],
    capacity: '1 personne',
    image: '/images/studios/vertical.jpg',
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
