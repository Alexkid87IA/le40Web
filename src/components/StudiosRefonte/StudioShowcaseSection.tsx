/**
 * StudioShowcaseSection - Version Ultra-Compact "Above the Fold"
 *
 * Tout visible d'un coup d'œil sans scroll :
 * - Layout horizontal 50/50 (galerie gauche, infos droite)
 * - Tabs pour organiser les informations
 * - Hauteur max ~800px pour tenir sur 1 écran
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video, Mic, Radio, Users, MessageSquare, Smartphone,
  ChevronLeft, ChevronRight, Check, Camera, X,
  Monitor, Lightbulb, Headphones, Wifi, Armchair,
  Clock, Square, Star, Shield, Zap, TrendingUp,
  Calendar, ArrowRight, CheckCircle, AlertCircle,
  Maximize2, Sparkles
} from 'lucide-react';

// ============================================================
// TYPES & DATA
// ============================================================

interface Studio {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: any;
  gradient: string;
  basePrice: number;
  pricing: { duration: string; price: number }[];
  capacity: string;
  surface: string;
  minDuration: string;
  images: { url: string; label: string }[];
  equipment: { name: string; icon: any; included: boolean }[];
  idealFor: string[];
  popular?: boolean;
  reservations: number;
  rating: number;
  reviewCount: number;
  guarantees: string[];
  whyChoose: string[];
  notIncluded: string[];
}

const STUDIOS: Studio[] = [
  {
    id: 'face-cam-solo',
    name: 'Studio Face-Cam Solo',
    shortName: 'Face-Cam',
    tagline: 'Le setup parfait pour créateurs solo',
    description: 'Configuration optimisée pour vlogs, tutoriels et contenus face caméra. Setup professionnel clé en main, vous arrivez, vous filmez.',
    icon: Video,
    gradient: 'from-emerald-500 to-teal-600',
    basePrice: 45,
    pricing: [
      { duration: '2h', price: 90 },
      { duration: '4h', price: 160 },
      { duration: '8h', price: 280 },
    ],
    capacity: '1 personne',
    surface: '15m²',
    minDuration: '2h',
    images: [
      { url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=90', label: 'Vue d\'ensemble' },
      { url: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&q=90', label: 'Setup caméra' },
      { url: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=90', label: 'Zone éclairage' },
      { url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=90', label: 'Téléprompter' },
      { url: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&q=90', label: 'Fond personnalisable' },
      { url: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=90', label: 'Régie' },
    ],
    equipment: [
      { name: 'Sony FX3 4K', icon: Camera, included: true },
      { name: 'Éclairage 3 points pro', icon: Lightbulb, included: true },
      { name: 'Micro cravate HF', icon: Mic, included: true },
      { name: 'Téléprompter 15"', icon: Monitor, included: true },
      { name: 'Fond vert/blanc/noir', icon: Square, included: true },
      { name: 'Monitoring HD', icon: Monitor, included: true },
    ],
    idealFor: ['YouTubers', 'Formateurs', 'Coachs', 'E-commerce'],
    popular: true,
    reservations: 127,
    rating: 4.9,
    reviewCount: 84,
    guarantees: [
      'Matériel vérifié avant chaque session',
      'Annulation gratuite 48h avant',
      'Support technique sur place',
    ],
    whyChoose: [
      'Le studio le plus réservé',
      'Setup prêt à l\'emploi en 5 min',
      'Idéal pour débutants',
    ],
    notIncluded: [
      'Montage vidéo (disponible en option)',
      'Maquillage professionnel (disponible en option)',
    ],
  },
  {
    id: 'podcast-audio',
    name: 'Studio Podcast Audio',
    shortName: 'Podcast',
    tagline: 'Son broadcast qualité radio',
    description: 'Studio acoustiquement traité avec 4 positions micro. Qualité sonore professionnelle garantie, parfait pour podcasts et interviews audio.',
    icon: Mic,
    gradient: 'from-purple-500 to-violet-600',
    basePrice: 55,
    pricing: [
      { duration: '2h', price: 110 },
      { duration: '4h', price: 200 },
      { duration: '8h', price: 360 },
    ],
    capacity: '1-4 personnes',
    surface: '20m²',
    minDuration: '2h',
    images: [
      { url: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200&q=90', label: 'Vue d\'ensemble' },
      { url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=90', label: 'Setup 4 micros' },
      { url: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=1200&q=90', label: 'Console RodeCaster' },
      { url: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200&q=90', label: 'Cabine acoustique' },
      { url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=90', label: 'Zone invités' },
      { url: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=1200&q=90', label: 'Monitoring' },
    ],
    equipment: [
      { name: '4x Shure SM7B', icon: Mic, included: true },
      { name: 'Console RodeCaster Pro', icon: Headphones, included: true },
      { name: '4 casques monitoring', icon: Headphones, included: true },
      { name: 'Traitement acoustique pro', icon: Armchair, included: true },
      { name: 'Table enregistrement', icon: Monitor, included: true },
      { name: 'Perches micro réglables', icon: Mic, included: true },
    ],
    idealFor: ['Podcasters', 'Journalistes', 'Auteurs', 'Entreprises'],
    popular: false,
    reservations: 89,
    rating: 4.8,
    reviewCount: 56,
    guarantees: [
      'Acoustique professionnelle garantie',
      'Annulation gratuite 48h avant',
      'Ingénieur son disponible (option)',
    ],
    whyChoose: [
      'Qualité radio broadcast',
      'Jusqu\'à 4 invités',
      'Isolation acoustique parfaite',
    ],
    notIncluded: [
      'Mixage audio (disponible en option)',
      'Montage podcast (disponible en option)',
    ],
  },
  {
    id: 'live-stream',
    name: 'Studio Live Stream',
    shortName: 'Live',
    tagline: 'Streaming multi-caméras pro',
    description: 'Configuration broadcast complète avec 3 caméras et régie professionnelle. Streamez en direct avec une qualité TV.',
    icon: Radio,
    gradient: 'from-red-500 to-orange-600',
    basePrice: 75,
    pricing: [
      { duration: '2h', price: 150 },
      { duration: '4h', price: 280 },
      { duration: '8h', price: 520 },
    ],
    capacity: '1-2 personnes',
    surface: '25m²',
    minDuration: '2h',
    images: [
      { url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=90', label: 'Vue d\'ensemble' },
      { url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=90', label: 'Setup 3 caméras' },
      { url: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=90', label: 'Régie ATEM' },
      { url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=90', label: 'Zone streaming' },
      { url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=90', label: 'Monitoring' },
      { url: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=90', label: 'Setup éclairage' },
    ],
    equipment: [
      { name: '3 caméras PTZ 4K', icon: Camera, included: true },
      { name: 'Régie ATEM Mini Pro', icon: Monitor, included: true },
      { name: 'Encodeur streaming', icon: Radio, included: true },
      { name: 'Connexion fibre dédiée', icon: Wifi, included: true },
      { name: 'Éclairage multi-points', icon: Lightbulb, included: true },
      { name: 'Overlays graphiques', icon: Monitor, included: true },
    ],
    idealFor: ['Streamers', 'Gamers', 'Webinaires', 'Events live'],
    popular: false,
    reservations: 67,
    rating: 4.9,
    reviewCount: 42,
    guarantees: [
      'Débit garanti pour streaming HD',
      'Backup Internet automatique',
      'Test pré-session inclus',
    ],
    whyChoose: [
      'Configuration multi-caméras',
      'Fibre dédiée 1Gb/s',
      'Changement de plan automatique',
    ],
    notIncluded: [
      'Modération chat (disponible en option)',
      'Montage replay (disponible en option)',
    ],
  },
  {
    id: 'talk-show',
    name: 'Studio Talk-Show',
    shortName: 'Talk-Show',
    tagline: 'Plateau TV professionnel',
    description: 'Notre plus grand studio avec plateau TV 4 places. Décor modulable, 4 caméras broadcast et régie intégrée.',
    icon: Users,
    gradient: 'from-blue-500 to-cyan-600',
    basePrice: 95,
    pricing: [
      { duration: '2h', price: 190 },
      { duration: '4h', price: 350 },
      { duration: '8h', price: 640 },
    ],
    capacity: '2-4 personnes',
    surface: '40m²',
    minDuration: '2h',
    images: [
      { url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=90', label: 'Vue plateau' },
      { url: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=1200&q=90', label: 'Décor TV' },
      { url: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&q=90', label: 'Setup 4 caméras' },
      { url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=90', label: 'Zone invités' },
      { url: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=1200&q=90', label: 'Régie' },
      { url: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&q=90', label: 'Éclairage pro' },
    ],
    equipment: [
      { name: 'Plateau modulable 4 places', icon: Users, included: true },
      { name: '4 caméras broadcast', icon: Camera, included: true },
      { name: 'Décor TV professionnel', icon: Armchair, included: true },
      { name: 'Régie vidéo intégrée', icon: Monitor, included: true },
      { name: 'Micros HF pro', icon: Mic, included: true },
      { name: 'Éclairage plateau TV', icon: Lightbulb, included: true },
    ],
    idealFor: ['Émissions TV', 'Débats', 'Interviews', 'Corporate'],
    popular: true,
    reservations: 93,
    rating: 5.0,
    reviewCount: 67,
    guarantees: [
      'Plateau professionnel garanti',
      'Décor personnalisable inclus',
      'Technicien vidéo disponible',
    ],
    whyChoose: [
      'Notre plus grand studio (40m²)',
      'Décor façon plateau TV',
      'Jusqu\'à 4 invités confortablement',
    ],
    notIncluded: [
      'Maquillage pro (disponible en option)',
      'Post-production (disponible en option)',
    ],
  },
  {
    id: 'interview',
    name: 'Studio Interview',
    shortName: 'Interview',
    tagline: 'Ambiance intimiste et pro',
    description: 'Configuration 2 places face à face avec éclairage cinématique. Fond bokeh naturel pour des interviews authentiques.',
    icon: MessageSquare,
    gradient: 'from-amber-500 to-yellow-600',
    basePrice: 65,
    pricing: [
      { duration: '2h', price: 130 },
      { duration: '4h', price: 240 },
      { duration: '8h', price: 440 },
    ],
    capacity: '2 personnes',
    surface: '18m²',
    minDuration: '2h',
    images: [
      { url: 'https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?w=1200&q=90', label: 'Vue d\'ensemble' },
      { url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=90', label: 'Setup face-à-face' },
      { url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=90', label: 'Éclairage ciné' },
      { url: 'https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?w=1200&q=90', label: 'Fond bokeh' },
      { url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=90', label: 'Caméras' },
      { url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=90', label: 'Zone confort' },
    ],
    equipment: [
      { name: '2 caméras cinéma 4K', icon: Camera, included: true },
      { name: 'Éclairage cinématique', icon: Lightbulb, included: true },
      { name: 'Fond bokeh naturel', icon: Armchair, included: true },
      { name: '2 micros broadcast', icon: Mic, included: true },
      { name: 'Sièges confortables', icon: Armchair, included: true },
      { name: 'Table d\'appoint', icon: Monitor, included: true },
    ],
    idealFor: ['Interviews', 'Témoignages', 'Documentaires', 'Podcasts vidéo'],
    popular: false,
    reservations: 71,
    rating: 4.9,
    reviewCount: 48,
    guarantees: [
      'Ambiance intimiste garantie',
      'Look cinéma professionnel',
      'Confort optimal',
    ],
    whyChoose: [
      'Look cinéma unique',
      'Setup face-à-face authentique',
      'Fond bokeh naturel',
    ],
    notIncluded: [
      'Montage interview (disponible en option)',
      'Sous-titrage (disponible en option)',
    ],
  },
  {
    id: 'vertical-social',
    name: 'Studio Vertical',
    shortName: 'Vertical',
    tagline: 'Optimisé TikTok & Reels',
    description: 'Le studio pensé pour les formats verticaux 9:16. Ring light pro, fond LED RGB et prompteur vertical intégré.',
    icon: Smartphone,
    gradient: 'from-pink-500 to-rose-600',
    basePrice: 40,
    pricing: [
      { duration: '2h', price: 80 },
      { duration: '4h', price: 140 },
      { duration: '8h', price: 240 },
    ],
    capacity: '1-2 personnes',
    surface: '12m²',
    minDuration: '2h',
    images: [
      { url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=90', label: 'Vue d\'ensemble' },
      { url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=90', label: 'Setup vertical' },
      { url: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=90', label: 'Ring light pro' },
      { url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=90', label: 'Fond LED RGB' },
      { url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=90', label: 'Prompteur' },
      { url: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=90', label: 'Zone création' },
    ],
    equipment: [
      { name: 'Setup format 9:16', icon: Smartphone, included: true },
      { name: 'Ring light professionnel', icon: Lightbulb, included: true },
      { name: 'Fond LED RGB 256 couleurs', icon: Lightbulb, included: true },
      { name: 'Prompteur vertical', icon: Monitor, included: true },
      { name: 'Micro-cravate', icon: Mic, included: true },
      { name: 'Support smartphone pro', icon: Smartphone, included: true },
    ],
    idealFor: ['TikTokers', 'Instagrammers', 'Influenceurs', 'Marques'],
    popular: true,
    reservations: 156,
    rating: 4.8,
    reviewCount: 103,
    guarantees: [
      'Format vertical optimisé',
      'Setup prêt en 3 minutes',
      'Le tarif le plus accessible',
    ],
    whyChoose: [
      'Le moins cher (40€/h)',
      'Parfait pour contenu viral',
      'Fond RGB personnalisable',
    ],
    notIncluded: [
      'Smartphone (apportez le vôtre)',
      'Clipping vidéo (disponible en option)',
    ],
  },
];

// ============================================================
// COMPOSANT - Galerie Full Screen
// ============================================================

interface FullScreenGalleryProps {
  studio: Studio;
  onClose: () => void;
}

function FullScreenGallery({ studio, onClose }: FullScreenGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/20 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => setActiveImage((prev) => (prev - 1 + studio.images.length) % studio.images.length)}
          className="absolute left-6 z-10 w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/20 transition-all"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>

        <div className="relative w-full h-full flex items-center justify-center p-20">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage}
              src={studio.images[activeImage].url}
              alt={studio.images[activeImage].label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-full max-h-full object-contain rounded-2xl"
            />
          </AnimatePresence>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/80 backdrop-blur-xl rounded-full">
            <span className="text-white font-medium">
              {studio.images[activeImage].label}
            </span>
          </div>
        </div>

        <button
          onClick={() => setActiveImage((prev) => (prev + 1) % studio.images.length)}
          className="absolute right-6 z-10 w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/20 transition-all"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {studio.images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === activeImage ? 'w-8 bg-white' : 'w-2 bg-white/40'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================

export default function StudioShowcaseSection() {
  const [activeStudio, setActiveStudio] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'equipment' | 'pricing'>('overview');

  const studio = STUDIOS[activeStudio];
  const Icon = studio.icon;

  return (
    <section id="showcase" className="relative py-12 md:py-16 bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-16">
        {/* Header section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
            Explorez nos{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              espaces créatifs
            </span>
          </h2>
          <p className="text-white/60 text-sm">
            Tout ce qu'il faut savoir pour choisir votre studio
          </p>
        </motion.div>

        {/* Studios Tabs - Horizontal on desktop, compact on mobile */}
        <div className="mb-6 overflow-x-auto pb-2 hide-scrollbar">
          <div className="flex gap-2 min-w-max md:min-w-0 md:justify-center">
            {STUDIOS.map((s, idx) => {
              const SIcon = s.icon;
              const isActive = idx === activeStudio;

              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveStudio(idx);
                    setActiveImage(0);
                    setActiveTab('overview');
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex-shrink-0 ${
                    isActive
                      ? `bg-gradient-to-r ${s.gradient} text-white shadow-lg`
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <SIcon className="w-4 h-4" />
                  <span>{s.shortName}</span>
                  {s.popular && <Star className="w-3 h-3 text-amber-300 fill-amber-300" />}
                  <span className="text-xs opacity-80">{s.basePrice}€/h</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* LAYOUT PRINCIPAL - SPLIT 50/50 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={studio.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid lg:grid-cols-2 gap-6 lg:gap-8"
          >
            {/* GAUCHE - GALERIE COMPACTE */}
            <div className="space-y-3">
              {/* Header Studio - Ultra Compact */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${studio.gradient} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl md:text-2xl font-black text-white">{studio.name}</h3>
                      {studio.popular && (
                        <span className="px-2 py-0.5 bg-amber-500 rounded-full text-[10px] font-black text-black uppercase">
                          Top
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white/60">{studio.tagline}</p>
                  </div>
                </div>
              </div>

              {/* Stats rapides - 1 ligne */}
              <div className="flex items-center gap-4 text-xs text-white/60">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-white">{studio.rating}</span>
                  <span>({studio.reviewCount})</span>
                </span>
                <span className="w-1 h-1 rounded-full bg-white/30" />
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{studio.reservations} résa/mois</span>
                </span>
              </div>

              {/* Image principale carousel */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer bg-zinc-900" onClick={() => setShowFullGallery(true)}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={studio.images[activeImage].url}
                    alt={studio.images[activeImage].label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Navigation carousel */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage((prev) => (prev - 1 + studio.images.length) % studio.images.length);
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage((prev) => (prev + 1) % studio.images.length);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Label photo + zoom icon */}
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <span className="text-white text-xs font-medium">
                    {studio.images[activeImage].label}
                  </span>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3 h-3" />
                    Voir {studio.images.length} photos
                  </div>
                </div>

                {/* Indicateur position */}
                <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                  {activeImage + 1}/{studio.images.length}
                </div>
              </div>

              {/* Miniatures - 4 seulement */}
              <div className="grid grid-cols-4 gap-2">
                {studio.images.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-video rounded-lg overflow-hidden transition-all ${
                      idx === activeImage ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                    {idx === 3 && studio.images.length > 4 && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-white text-xs font-bold">
                        +{studio.images.length - 4}
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Quick stats - 4 colonnes compactes */}
              <div className="grid grid-cols-4 gap-2">
                <div className="p-2 bg-white/5 rounded-lg text-center">
                  <Users className="w-4 h-4 text-white/40 mx-auto mb-1" />
                  <div className="text-white font-bold text-xs">{studio.capacity.split(' ')[0]}</div>
                  <div className="text-white/40 text-[10px]">pers.</div>
                </div>
                <div className="p-2 bg-white/5 rounded-lg text-center">
                  <Square className="w-4 h-4 text-white/40 mx-auto mb-1" />
                  <div className="text-white font-bold text-xs">{studio.surface}</div>
                  <div className="text-white/40 text-[10px]">surface</div>
                </div>
                <div className="p-2 bg-white/5 rounded-lg text-center">
                  <Clock className="w-4 h-4 text-white/40 mx-auto mb-1" />
                  <div className="text-white font-bold text-xs">{studio.minDuration}</div>
                  <div className="text-white/40 text-[10px]">min</div>
                </div>
                <div className={`p-2 bg-gradient-to-br ${studio.gradient} rounded-lg text-center`}>
                  <Zap className="w-4 h-4 text-white/80 mx-auto mb-1" />
                  <div className="text-white font-black text-xs">{studio.basePrice}€</div>
                  <div className="text-white/80 text-[10px]">par h</div>
                </div>
              </div>
            </div>

            {/* DROITE - INFOS AVEC TABS */}
            <div className="flex flex-col">
              {/* Tabs Navigation */}
              <div className="flex gap-1 p-1 bg-white/5 rounded-xl mb-4">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    activeTab === 'overview'
                      ? 'bg-white text-black'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Vue d'ensemble
                </button>
                <button
                  onClick={() => setActiveTab('equipment')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    activeTab === 'equipment'
                      ? 'bg-white text-black'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Équipements
                </button>
                <button
                  onClick={() => setActiveTab('pricing')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    activeTab === 'pricing'
                      ? 'bg-white text-black'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Tarifs & Résa
                </button>
              </div>

              {/* Tab Content - Scrollable si besoin */}
              <div className="flex-1 overflow-y-auto max-h-[600px] space-y-4 pr-2 custom-scrollbar">
                {/* TAB OVERVIEW */}
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {/* Description */}
                    <div>
                      <p className="text-white/80 text-sm leading-relaxed">{studio.description}</p>
                    </div>

                    {/* Pourquoi ce studio - Compact */}
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                      <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        Pourquoi ce studio ?
                      </h4>
                      <ul className="space-y-1.5">
                        {studio.whyChoose.map((reason, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-white/90 text-sm">
                            <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Idéal pour - Tags compacts */}
                    <div>
                      <h4 className="font-bold text-white text-sm mb-2">Idéal pour</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {studio.idealFor.map((use, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/10 text-white"
                          >
                            {use}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Garanties - Compact */}
                    <div className="p-4 bg-white/5 rounded-xl">
                      <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-cyan-400" />
                        Garanties
                      </h4>
                      <ul className="space-y-1.5">
                        {studio.guarantees.map((guarantee, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-white/80 text-xs">
                            <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <span>{guarantee}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Non inclus */}
                    {studio.notIncluded.length > 0 && (
                      <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                        <h4 className="font-bold text-white text-xs mb-2 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-orange-400" />
                          Non inclus (options payantes)
                        </h4>
                        <ul className="space-y-1">
                          {studio.notIncluded.map((item, idx) => (
                            <li key={idx} className="text-white/70 text-xs">
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* TAB EQUIPMENT */}
                {activeTab === 'equipment' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                      <h4 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        Tout est inclus dans le tarif
                      </h4>
                      <div className="grid gap-2">
                        {studio.equipment.map((eq, idx) => {
                          const EqIcon = eq.icon;
                          return (
                            <div key={idx} className="flex items-center gap-3 p-2.5 bg-white/5 rounded-lg">
                              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                <EqIcon className="w-4 h-4 text-emerald-400" />
                              </div>
                              <span className="text-white/90 text-sm font-medium">{eq.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Description équipements */}
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-white/70 text-xs leading-relaxed">
                        Tout le matériel est vérifié avant chaque session. Configuration professionnelle clé en main, vous n'avez rien à apporter.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* TAB PRICING */}
                {activeTab === 'pricing' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {/* Tarifs - Format horizontal compact */}
                    <div className="p-5 bg-white/5 border border-white/10 rounded-xl">
                      <h4 className="font-bold text-white mb-3">Tarifs transparents</h4>
                      <div className="space-y-2">
                        {studio.pricing.map((p, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                            <span className="text-white/80 text-sm">{p.duration}</span>
                            <span className="text-white font-black text-xl">{p.price}€</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 text-xs text-white/50">
                        Tous les équipements inclus • Annulation gratuite 48h avant
                      </div>
                    </div>

                    {/* CTA Principal */}
                    <a
                      href="#booking-flow"
                      className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r ${studio.gradient} hover:shadow-2xl hover:scale-[1.02] transition-all`}
                    >
                      <Calendar className="w-5 h-5" />
                      Voir les disponibilités
                      <ArrowRight className="w-5 h-5" />
                    </a>

                    {/* Info supplémentaire */}
                    <div className="p-4 bg-white/5 rounded-xl space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60">Réservation instantanée</span>
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60">Paiement sécurisé</span>
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60">Confirmation immédiate</span>
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Galerie plein écran */}
      <AnimatePresence>
        {showFullGallery && (
          <FullScreenGallery studio={studio} onClose={() => setShowFullGallery(false)} />
        )}
      </AnimatePresence>

      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </section>
  );
}
