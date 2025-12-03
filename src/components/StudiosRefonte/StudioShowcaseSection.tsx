/**
 * StudioShowcaseSection - Version Ultra Premium
 *
 * Design sophistiqué et audacieux avec :
 * - Animations magnétiques et effets de hover avancés
 * - Glassmorphism et effets de lumière dynamiques
 * - Micro-interactions premium sur chaque élément
 * - Parallax subtil et transitions fluides
 * - Layout immersif avec profondeur visuelle
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Video, Mic, Radio, Users, MessageSquare, Smartphone,
  ChevronLeft, ChevronRight, Check, Camera,
  Monitor, Lightbulb, Headphones, Wifi, Armchair,
  Scissors, Sparkles, Car, Coffee, Package,
  ArrowRight, Eye, Star, Zap, X, Maximize2,
  Clock, Users as UsersIcon, Square, Play, TrendingUp
} from 'lucide-react';
import { useMagneticHover } from '../../hooks/useMagneticHover';

// ============================================================
// TYPES
// ============================================================

interface Studio {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: any;
  color: string;
  gradient: string;
  gradientText: string;
  basePrice: number;
  capacity: string;
  surface: string;
  images: string[];
  video?: string;
  equipment: { name: string; icon: any }[];
  idealFor: string[];
  popular?: boolean;
  highlights: string[];
}

// ============================================================
// DATA - STUDIOS
// ============================================================

const STUDIOS: Studio[] = [
  {
    id: 'face-cam-solo',
    name: 'Studio Face-Cam Solo',
    shortName: 'Face-Cam',
    tagline: 'Le setup parfait pour créateurs solo',
    description: 'Configuration optimisée pour vlogs, tutoriels et contenus face caméra. Éclairage 3 points professionnel, téléprompter inclus et fond personnalisable. Notre studio le plus demandé.',
    icon: Video,
    color: 'emerald',
    gradient: 'from-emerald-500 via-emerald-600 to-teal-600',
    gradientText: 'from-emerald-400 to-teal-400',
    basePrice: 45,
    capacity: '1 personne',
    surface: '15m²',
    images: [
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=90',
      'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&q=90',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=90',
    ],
    equipment: [
      { name: 'Sony FX3 4K', icon: Camera },
      { name: 'Éclairage 3 points', icon: Lightbulb },
      { name: 'Micro cravate HF', icon: Mic },
      { name: 'Téléprompter 15"', icon: Monitor },
    ],
    idealFor: ['YouTubers', 'Formateurs', 'Coachs', 'E-commerce'],
    popular: true,
    highlights: ['Le plus demandé', 'Idéal débutants', 'Setup rapide'],
  },
  {
    id: 'podcast-audio',
    name: 'Studio Podcast Audio',
    shortName: 'Podcast',
    tagline: 'Son broadcast qualité radio',
    description: 'Studio acoustiquement traité avec 4 positions micro. Équipé de micros Shure SM7B et console RodeCaster Pro. Conditions radio professionnelles garanties.',
    icon: Mic,
    color: 'purple',
    gradient: 'from-purple-500 via-purple-600 to-violet-600',
    gradientText: 'from-purple-400 to-violet-400',
    basePrice: 55,
    capacity: '1-4 personnes',
    surface: '20m²',
    images: [
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1200&q=90',
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=90',
      'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=1200&q=90',
    ],
    equipment: [
      { name: '4x Shure SM7B', icon: Mic },
      { name: 'RodeCaster Pro', icon: Headphones },
      { name: 'Casques monitoring', icon: Headphones },
      { name: 'Traitement acoustique', icon: Armchair },
    ],
    idealFor: ['Podcasters', 'Journalistes', 'Auteurs', 'Entreprises'],
    popular: false,
    highlights: ['Qualité radio', '4 invités max', 'Acoustique pro'],
  },
  {
    id: 'live-stream',
    name: 'Studio Live Stream',
    shortName: 'Live',
    tagline: 'Streaming multi-caméras pro',
    description: 'Configuration broadcast avec 3 caméras et régie ATEM Mini Pro. Streamez en direct sur YouTube, Twitch, LinkedIn avec une qualité TV professionnelle.',
    icon: Radio,
    color: 'red',
    gradient: 'from-red-500 via-red-600 to-orange-600',
    gradientText: 'from-red-400 to-orange-400',
    basePrice: 75,
    capacity: '1-2 personnes',
    surface: '25m²',
    images: [
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=90',
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=90',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=90',
    ],
    equipment: [
      { name: '3 caméras PTZ', icon: Camera },
      { name: 'ATEM Mini Pro', icon: Monitor },
      { name: 'Encodeur streaming', icon: Radio },
      { name: 'Fibre dédiée', icon: Wifi },
    ],
    idealFor: ['Streamers', 'Gamers', 'Webinaires', 'Events live'],
    popular: false,
    highlights: ['Multi-caméras', 'Fibre dédiée', 'Overlays inclus'],
  },
  {
    id: 'talk-show',
    name: 'Studio Talk-Show',
    shortName: 'Talk-Show',
    tagline: 'Plateau TV professionnel',
    description: 'Notre plus grand studio avec plateau modulable 4 places. Décor professionnel façon plateau TV, 4 caméras et régie intégrée. Parfait pour émissions et débats.',
    icon: Users,
    color: 'blue',
    gradient: 'from-blue-500 via-blue-600 to-cyan-600',
    gradientText: 'from-blue-400 to-cyan-400',
    basePrice: 95,
    capacity: '2-4 personnes',
    surface: '40m²',
    images: [
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=90',
      'https://images.unsplash.com/photo-1560439514-4e9645039924?w=1200&q=90',
      'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&q=90',
    ],
    equipment: [
      { name: 'Plateau 4 places', icon: Users },
      { name: '4 caméras broadcast', icon: Camera },
      { name: 'Décor modulable', icon: Armchair },
      { name: 'Régie intégrée', icon: Monitor },
    ],
    idealFor: ['Émissions TV', 'Débats', 'Interviews', 'Corporate'],
    popular: true,
    highlights: ['40m² plateau', '4 invités', 'Décor TV'],
  },
  {
    id: 'interview',
    name: 'Studio Interview',
    shortName: 'Interview',
    tagline: 'Ambiance intimiste et pro',
    description: 'Configuration 2 places en face à face avec éclairage cinématique. Fond bokeh naturel et son broadcast. L\'ambiance parfaite pour interviews authentiques.',
    icon: MessageSquare,
    color: 'amber',
    gradient: 'from-amber-500 via-amber-600 to-yellow-600',
    gradientText: 'from-amber-400 to-yellow-400',
    basePrice: 65,
    capacity: '2 personnes',
    surface: '18m²',
    images: [
      'https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?w=1200&q=90',
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=90',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=90',
    ],
    equipment: [
      { name: '2 caméras cinéma', icon: Camera },
      { name: 'Éclairage ciné', icon: Lightbulb },
      { name: 'Fond bokeh', icon: Armchair },
      { name: 'Micros broadcast', icon: Mic },
    ],
    idealFor: ['Interviews', 'Témoignages', 'Documentaires', 'Podcasts vidéo'],
    popular: false,
    highlights: ['Look cinéma', 'Face à face', 'Bokeh naturel'],
  },
  {
    id: 'vertical-social',
    name: 'Studio Vertical',
    shortName: 'Vertical',
    tagline: 'Optimisé TikTok & Reels',
    description: 'Le studio pensé pour les formats verticaux. Ring light pro, fond LED RGB et prompteur vertical. Créez du contenu viral en conditions optimales.',
    icon: Smartphone,
    color: 'pink',
    gradient: 'from-pink-500 via-pink-600 to-rose-600',
    gradientText: 'from-pink-400 to-rose-400',
    basePrice: 40,
    capacity: '1-2 personnes',
    surface: '12m²',
    images: [
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=90',
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=90',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=90',
    ],
    equipment: [
      { name: 'Setup 9:16', icon: Smartphone },
      { name: 'Ring light pro', icon: Lightbulb },
      { name: 'Fond LED RGB', icon: Lightbulb },
      { name: 'Prompteur vertical', icon: Monitor },
    ],
    idealFor: ['TikTokers', 'Instagrammers', 'Influenceurs', 'Marques'],
    popular: true,
    highlights: ['Format 9:16', 'LED RGB', 'Le moins cher'],
  },
];

// ============================================================
// COMPOSANT - STUDIO CARD SIDEBAR (Premium)
// ============================================================

interface StudioCardSidebarProps {
  studio: Studio;
  isActive: boolean;
  onClick: () => void;
}

const StudioCardSidebar = ({ studio, isActive, onClick }: StudioCardSidebarProps) => {
  const cardRef = useRef<HTMLButtonElement>(null);
  const { handleMouseMove, handleMouseLeave, x, y } = useMagneticHover(10);
  const Icon = studio.icon;

  return (
    <motion.button
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      whileTap={{ scale: 0.98 }}
      className={`group relative w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-500 overflow-hidden ${
        isActive
          ? 'bg-gradient-to-br from-white/10 to-white/5'
          : 'bg-white/5 hover:bg-white/8'
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="active-studio-glow"
          className={`absolute inset-0 bg-gradient-to-r ${studio.gradient} opacity-20 blur-xl`}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
        />
      )}

      <motion.div
        className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden ${
          isActive
            ? `bg-gradient-to-br ${studio.gradient} shadow-lg`
            : 'bg-white/10 group-hover:bg-white/15'
        }`}
        whileHover={{ scale: 1.05, rotate: isActive ? 0 : 5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        {isActive && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        <Icon className={`relative z-10 w-6 h-6 ${isActive ? 'text-white' : 'text-white/80'}`} />
      </motion.div>

      <div className="relative z-10 flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`font-bold truncate transition-colors ${isActive ? 'text-white' : 'text-white/90'}`}>
            {studio.shortName}
          </span>
          {studio.popular && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 flex-shrink-0" />
            </motion.div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-sm ${isActive ? `text-transparent bg-clip-text bg-gradient-to-r ${studio.gradientText}` : 'text-white/60'}`}>
            dès {studio.basePrice}€/h
          </span>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/20 rounded-full"
            >
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] font-bold text-emerald-400">ACTIF</span>
            </motion.div>
          )}
        </div>
      </div>

      {isActive && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="relative z-10"
        >
          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${studio.gradient}`} />
        </motion.div>
      )}
    </motion.button>
  );
};

// ============================================================
// COMPOSANT - GALERIE PREMIUM
// ============================================================

interface GalleryPremiumProps {
  studio: Studio;
}

const GalleryPremium = ({ studio }: GalleryPremiumProps) => {
  const [activeImage, setActiveImage] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const parallaxX = useTransform(mouseX, [0, 1], [-10, 10]);
  const parallaxY = useTransform(mouseY, [0, 1], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div className="relative space-y-4">
      <motion.div
        className="relative aspect-[4/3] rounded-3xl overflow-hidden group"
        onMouseMove={handleMouseMove}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <motion.img
              src={studio.images[activeImage]}
              alt={studio.name}
              style={{ x: parallaxX, y: parallaxY }}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {studio.popular && (
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2 bg-amber-500/90 backdrop-blur-xl rounded-2xl shadow-xl"
          >
            <Star className="w-4 h-4 text-black fill-black" />
            <span className="text-sm font-black text-black">POPULAIRE</span>
          </motion.div>
        )}

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`absolute top-5 right-5 px-5 py-3 rounded-2xl bg-gradient-to-r ${studio.gradient} backdrop-blur-xl shadow-xl`}
        >
          <div className="flex items-baseline gap-1">
            <motion.span
              key={studio.basePrice}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-3xl font-black text-white"
            >
              {studio.basePrice}€
            </motion.span>
            <span className="text-white/80 text-sm font-bold">/h</span>
          </div>
        </motion.div>

        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
          <button
            onClick={() => setActiveImage((prev) => (prev - 1 + studio.images.length) % studio.images.length)}
            className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-xl flex items-center justify-center text-white hover:bg-black/60 transition-all hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {studio.images.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setActiveImage(idx)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <div className={`h-2 rounded-full transition-all duration-300 ${
                  idx === activeImage ? 'w-10 bg-white' : 'w-2 bg-white/40'
                }`} />
                {idx === activeImage && (
                  <motion.div
                    layoutId="active-dot"
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${studio.gradient} blur-lg opacity-60`}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <button
            onClick={() => setActiveImage((prev) => (prev + 1) % studio.images.length)}
            className="w-12 h-12 rounded-2xl bg-black/40 backdrop-blur-xl flex items-center justify-center text-white hover:bg-black/60 transition-all hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-3">
        {studio.images.map((img, idx) => (
          <motion.button
            key={idx}
            onClick={() => setActiveImage(idx)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="relative aspect-video rounded-2xl overflow-hidden group"
          >
            <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
            <div className={`absolute inset-0 transition-all duration-300 ${
              idx === activeImage
                ? 'ring-2 ring-white bg-transparent'
                : 'bg-black/40 group-hover:bg-black/20'
            }`} />
            {idx === activeImage && (
              <motion.div
                layoutId="active-thumb"
                className="absolute inset-0 bg-white/10"
                transition={{ type: 'spring', bounce: 0.3 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================

export default function StudioShowcaseSection() {
  const [activeStudio, setActiveStudio] = useState(0);
  const studio = STUDIOS[activeStudio];
  const Icon = studio.icon;

  return (
    <section id="showcase" className="relative py-24 overflow-hidden bg-black">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 -left-48 w-[600px] h-[600px] bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 -right-48 w-[600px] h-[600px] bg-gradient-to-l from-purple-500/20 to-pink-500/20 rounded-full blur-[150px]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-xl rounded-full mb-6 border border-white/10"
          >
            <Eye className="w-4 h-4 text-emerald-400" />
            <span className="text-white/90 text-sm font-bold">6 STUDIOS ÉQUIPÉS PRO</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
            Explorez nos
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"
            >
              espaces créatifs
            </motion.span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-white/70 max-w-2xl mx-auto text-lg"
          >
            Sélectionnez le studio adapté à votre projet
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 space-y-3"
          >
            {STUDIOS.map((s, idx) => (
              <StudioCardSidebar
                key={s.id}
                studio={s}
                isActive={idx === activeStudio}
                onClick={() => setActiveStudio(idx)}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={studio.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="grid lg:grid-cols-2 gap-8"
              >
                <GalleryPremium studio={studio} />

                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-start gap-4"
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${studio.gradient} flex items-center justify-center shadow-xl flex-shrink-0`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-3xl font-black text-white leading-tight mb-2">{studio.name}</h3>
                      <p className={`text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r ${studio.gradientText}`}>
                        {studio.tagline}
                      </p>
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-white/80 leading-relaxed"
                  >
                    {studio.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex gap-3"
                  >
                    {[
                      { icon: UsersIcon, label: studio.capacity },
                      { icon: Square, label: studio.surface },
                      { icon: Clock, label: '2h min' },
                    ].map((spec, idx) => {
                      const SpecIcon = spec.icon;
                      return (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="flex items-center gap-2 px-4 py-3 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
                        >
                          <SpecIcon className="w-4 h-4 text-emerald-400" />
                          <span className="text-white font-medium text-sm">{spec.label}</span>
                        </motion.div>
                      );
                    })}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10"
                  >
                    <h4 className="font-black text-white mb-4 flex items-center gap-2 text-lg">
                      <Package className="w-5 h-5 text-emerald-400" />
                      Équipements inclus
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {studio.equipment.map((eq, idx) => {
                        const EqIcon = eq.icon;
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + idx * 0.05 }}
                            whileHover={{ x: 4 }}
                            className="flex items-center gap-2"
                          >
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                              <EqIcon className="w-4 h-4 text-emerald-400" />
                            </div>
                            <span className="text-sm text-white/90 font-medium">{eq.name}</span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <h4 className="font-bold text-white mb-3">Idéal pour</h4>
                    <div className="flex flex-wrap gap-2">
                      {studio.idealFor.map((use, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 + idx * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          className={`px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${studio.gradient} text-white`}
                        >
                          {use}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  <motion.a
                    href="#booking-flow"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-center gap-3 w-full py-5 rounded-2xl font-black text-lg text-white bg-gradient-to-r ${studio.gradient} shadow-2xl`}
                  >
                    <Play className="w-5 h-5" />
                    Réserver ce studio
                    <ArrowRight className="w-5 h-5" />
                  </motion.a>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
