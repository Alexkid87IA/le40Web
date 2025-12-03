/**
 * StudioShowcaseSection - Version UX Client First
 *
 * Objectif: Aider le client à prendre une décision éclairée
 * - Galerie photos complète et claire
 * - Informations transparentes sur le prix et les inclusions
 * - Éléments de réassurance (avis, garanties, popularité)
 * - Process de réservation visible et simple
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video, Mic, Radio, Users, MessageSquare, Smartphone,
  ChevronLeft, ChevronRight, Check, Camera, X,
  Monitor, Lightbulb, Headphones, Wifi, Armchair,
  Clock, Square, Star, Shield, Zap, TrendingUp,
  Calendar, ArrowRight, Play, CheckCircle, AlertCircle,
  MapPin, Maximize2
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
    minDuration: '2h minimum',
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
    minDuration: '2h minimum',
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
    minDuration: '2h minimum',
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
    minDuration: '2h minimum',
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
    minDuration: '2h minimum',
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
    minDuration: '2h minimum',
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
  const studio = STUDIOS[activeStudio];
  const Icon = studio.icon;

  return (
    <section id="showcase" className="relative py-16 md:py-24 bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
            Explorez nos{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              espaces créatifs
            </span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Découvrez chaque studio en détail : équipements, photos réelles, tarifs transparents
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* SIDEBAR - Studios */}
          <div className="lg:col-span-3 space-y-2">
            {STUDIOS.map((s, idx) => {
              const SIcon = s.icon;
              const isActive = idx === activeStudio;

              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveStudio(idx);
                    setActiveImage(0);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                    isActive
                      ? `bg-gradient-to-r ${s.gradient} shadow-lg`
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isActive ? 'bg-white/20' : 'bg-white/10'
                  }`}>
                    <SIcon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="font-bold text-white text-sm truncate">{s.shortName}</span>
                      {s.popular && <Star className="w-3 h-3 text-amber-400 fill-amber-400 flex-shrink-0" />}
                    </div>
                    <span className="text-xs text-white/80">dès {s.basePrice}€/h</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* CONTENU PRINCIPAL */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={studio.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Header Studio */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${studio.gradient} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-2xl md:text-3xl font-black text-white">{studio.name}</h3>
                        {studio.popular && (
                          <span className="px-3 py-1 bg-amber-500 rounded-full text-xs font-black text-black">
                            POPULAIRE
                          </span>
                        )}
                      </div>
                      <p className={`text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r ${studio.gradient} mb-2`}>
                        {studio.tagline}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <span className="flex items-center gap-1.5">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="font-bold text-white">{studio.rating}</span>
                          <span>({studio.reviewCount} avis)</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <TrendingUp className="w-4 h-4 text-emerald-400" />
                          <span>{studio.reservations} réservations ce mois</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Prix à partir de */}
                  <div className={`px-5 py-3 rounded-2xl bg-gradient-to-r ${studio.gradient} flex-shrink-0`}>
                    <div className="text-xs text-white/80 mb-0.5">À partir de</div>
                    <div className="text-3xl font-black text-white">{studio.basePrice}€<span className="text-lg">/h</span></div>
                  </div>
                </div>

                {/* GALERIE PHOTOS - PRIORITAIRE */}
                <div className="space-y-3">
                  {/* Image principale */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer" onClick={() => setShowFullGallery(true)}>
                    <img
                      src={studio.images[activeImage].url}
                      alt={studio.images[activeImage].label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex items-center gap-2 px-5 py-3 bg-white/20 backdrop-blur-xl rounded-full text-white font-bold">
                        <Maximize2 className="w-5 h-5" />
                        Voir en plein écran
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 px-4 py-2 bg-black/60 backdrop-blur-xl rounded-full text-white text-sm font-medium">
                      {studio.images[activeImage].label}
                    </div>
                  </div>

                  {/* Toutes les miniatures */}
                  <div className="grid grid-cols-6 gap-2">
                    {studio.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`relative aspect-video rounded-lg overflow-hidden transition-all ${
                          idx === activeImage ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                        <div className="absolute inset-x-0 bottom-0 px-1 py-0.5 bg-black/80 text-[10px] text-white/90 text-center truncate">
                          {img.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grille Infos */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Colonne Gauche */}
                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <h4 className="font-bold text-white text-lg mb-2">À propos de ce studio</h4>
                      <p className="text-white/80 leading-relaxed">{studio.description}</p>
                    </div>

                    {/* Pourquoi choisir */}
                    <div className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                      <h4 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                        Pourquoi ce studio ?
                      </h4>
                      <ul className="space-y-2">
                        {studio.whyChoose.map((reason, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-white/90">
                            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Caractéristiques */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-4 bg-white/5 rounded-xl text-center">
                        <Users className="w-5 h-5 text-white/50 mx-auto mb-2" />
                        <div className="text-white font-bold text-sm">{studio.capacity}</div>
                        <div className="text-white/40 text-xs">Capacité</div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-xl text-center">
                        <Square className="w-5 h-5 text-white/50 mx-auto mb-2" />
                        <div className="text-white font-bold text-sm">{studio.surface}</div>
                        <div className="text-white/40 text-xs">Surface</div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-xl text-center">
                        <Clock className="w-5 h-5 text-white/50 mx-auto mb-2" />
                        <div className="text-white font-bold text-sm">{studio.minDuration}</div>
                        <div className="text-white/40 text-xs">Durée min</div>
                      </div>
                    </div>

                    {/* Garanties */}
                    <div className="p-5 bg-white/5 rounded-2xl">
                      <h4 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-cyan-400" />
                        Nos garanties
                      </h4>
                      <ul className="space-y-2">
                        {studio.guarantees.map((guarantee, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-white/80 text-sm">
                            <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                            <span>{guarantee}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Colonne Droite */}
                  <div className="space-y-6">
                    {/* Tarifs transparents */}
                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                      <h4 className="font-bold text-white text-lg mb-4">Tarifs transparents</h4>
                      <div className="space-y-2 mb-4">
                        {studio.pricing.map((p, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                            <span className="text-white font-medium">{p.duration}</span>
                            <span className="text-white font-black text-lg">{p.price}€</span>
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-white/60 mb-4">
                        Tous les équipements listés ci-dessous sont inclus dans ces tarifs
                      </div>
                      <a
                        href="#booking-flow"
                        className={`flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r ${studio.gradient} hover:shadow-lg transition-shadow`}
                      >
                        <Calendar className="w-5 h-5" />
                        Voir les disponibilités
                        <ArrowRight className="w-5 h-5" />
                      </a>
                    </div>

                    {/* Équipements inclus */}
                    <div className="p-6 bg-white/5 rounded-2xl">
                      <h4 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
                        <Check className="w-5 h-5 text-emerald-400" />
                        Équipements inclus
                      </h4>
                      <div className="space-y-2">
                        {studio.equipment.map((eq, idx) => {
                          const EqIcon = eq.icon;
                          return (
                            <div key={idx} className="flex items-center gap-3 p-2">
                              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                <EqIcon className="w-4 h-4 text-emerald-400" />
                              </div>
                              <span className="text-white/90 text-sm font-medium">{eq.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Non inclus */}
                    {studio.notIncluded.length > 0 && (
                      <div className="p-5 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
                        <h4 className="font-bold text-white text-base mb-3 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-400" />
                          Non inclus (options payantes)
                        </h4>
                        <ul className="space-y-1.5">
                          {studio.notIncluded.map((item, idx) => (
                            <li key={idx} className="text-white/70 text-sm">
                              • {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Idéal pour */}
                    <div>
                      <h4 className="font-bold text-white mb-3">Idéal pour</h4>
                      <div className="flex flex-wrap gap-2">
                        {studio.idealFor.map((use, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r ${studio.gradient} text-white`}
                          >
                            {use}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Galerie plein écran */}
      <AnimatePresence>
        {showFullGallery && (
          <FullScreenGallery studio={studio} onClose={() => setShowFullGallery(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}
