/**
 * StudioShowcaseSection - Version Premium
 * 
 * Design ultra-sophistiqué avec :
 * - Galerie immersive plein écran
 * - Navigation fluide entre studios
 * - Animations premium
 * - 100% optimisé mobile-first
 * - Aperçu services intégré
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video, Mic, Radio, Users, MessageSquare, Smartphone,
  ChevronLeft, ChevronRight, Check, Camera,
  Monitor, Lightbulb, Headphones, Wifi, Armchair,
  Scissors, Sparkles, Car, Coffee, Package,
  ArrowRight, Eye, Star, Zap, X, Maximize2,
  Clock, Users as UsersIcon, Square
} from 'lucide-react';

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
// DATA - SERVICES PREVIEW
// ============================================================

const SERVICES_PREVIEW = [
  {
    id: 'post-prod',
    name: 'Post-Production',
    icon: Scissors,
    color: 'purple',
    description: 'Montage, clipping, sous-titres',
    price: 'dès 79€',
  },
  {
    id: 'beauty',
    name: 'Beauty',
    icon: Sparkles,
    color: 'pink',
    description: 'Maquillage & coiffure pro',
    price: 'dès 89€',
  },
  {
    id: 'transport',
    name: 'Transport',
    icon: Car,
    color: 'blue',
    description: 'Navettes gare & aéroport',
    price: 'dès 20€',
  },
  {
    id: 'catering',
    name: 'Catering',
    icon: Coffee,
    color: 'amber',
    description: 'Coffee break, déjeuners',
    price: 'dès 12€/pers',
  },
];

// ============================================================
// COMPOSANT - STUDIO CARD MOBILE
// ============================================================

interface StudioCardMobileProps {
  studio: Studio;
  isActive: boolean;
  onClick: () => void;
}

const StudioCardMobile = ({ studio, isActive, onClick }: StudioCardMobileProps) => {
  const Icon = studio.icon;
  
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={`relative flex-shrink-0 w-[280px] rounded-3xl overflow-hidden transition-all duration-300 ${
        isActive ? 'ring-2 ring-white/50 scale-[1.02]' : 'opacity-80'
      }`}
    >
      {/* Image de fond */}
      <div className="relative aspect-[3/4]">
        <img
          src={studio.images[0]}
          alt={studio.name}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Badge populaire */}
        {studio.popular && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/90 backdrop-blur-sm rounded-full">
            <Star className="w-3.5 h-3.5 text-black fill-black" />
            <span className="text-xs font-bold text-black">Populaire</span>
          </div>
        )}
        
        {/* Prix */}
        <div className={`absolute top-4 right-4 px-3 py-2 rounded-2xl bg-gradient-to-r ${studio.gradient}`}>
          <span className="text-xl font-black text-white">{studio.basePrice}€</span>
          <span className="text-white/80 text-xs">/h</span>
        </div>
        
        {/* Contenu */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          {/* Icon + Name */}
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold text-white leading-tight">{studio.shortName}</h3>
              <p className="text-xs text-white/70">{studio.tagline}</p>
            </div>
          </div>
          
          {/* Highlights */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {studio.highlights.slice(0, 2).map((h, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-white/15 backdrop-blur-sm rounded-full text-[11px] text-white font-medium"
              >
                {h}
              </span>
            ))}
          </div>
          
          {/* Specs */}
          <div className="flex items-center gap-4 text-xs text-white/80">
            <span className="flex items-center gap-1.5">
              <UsersIcon className="w-3.5 h-3.5" />
              {studio.capacity}
            </span>
            <span className="flex items-center gap-1.5">
              <Square className="w-3.5 h-3.5" />
              {studio.surface}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
};

// ============================================================
// COMPOSANT - STUDIO DETAIL MODAL (Mobile)
// ============================================================

interface StudioDetailModalProps {
  studio: Studio;
  onClose: () => void;
}

const StudioDetailModal = ({ studio, onClose }: StudioDetailModalProps) => {
  const [activeImage, setActiveImage] = useState(0);
  const Icon = studio.icon;

  // Empêcher le scroll du body
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black"
    >
      <div className="h-full overflow-y-auto overscroll-contain">
        {/* Header fixe */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black via-black/80 to-transparent">
          <motion.button
            onClick={onClose}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
          >
            <X className="w-5 h-5 text-white" />
          </motion.button>
          
          <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${studio.gradient}`}>
            <span className="font-bold text-white">{studio.basePrice}€/h</span>
          </div>
        </div>

        {/* Galerie images - Full width */}
        <div className="relative -mt-16">
          <div className="relative aspect-[4/3]">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={studio.images[activeImage]}
                alt={studio.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            
            {/* Gradient bas */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
          </div>
          
          {/* Navigation images */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
            {studio.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeImage ? 'w-8 bg-white' : 'w-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Contenu */}
        <div className="relative z-10 px-5 pb-32 -mt-4 space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${studio.gradient} flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white leading-tight">{studio.name}</h2>
              <p className={`text-transparent bg-clip-text bg-gradient-to-r ${studio.gradientText} font-semibold`}>
                {studio.tagline}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/80 leading-relaxed text-[15px]">{studio.description}</p>

          {/* Specs - Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-center">
              <UsersIcon className="w-5 h-5 text-white/50 mx-auto mb-2" />
              <div className="text-white font-bold text-sm">{studio.capacity}</div>
              <div className="text-white/40 text-xs">Capacité</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-center">
              <Square className="w-5 h-5 text-white/50 mx-auto mb-2" />
              <div className="text-white font-bold text-sm">{studio.surface}</div>
              <div className="text-white/40 text-xs">Surface</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 text-center">
              <Clock className="w-5 h-5 text-white/50 mx-auto mb-2" />
              <div className="text-white font-bold text-sm">2h min</div>
              <div className="text-white/40 text-xs">Durée</div>
            </div>
          </div>

          {/* Équipements */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-emerald-400" />
              Équipements inclus
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {studio.equipment.map((eq, idx) => {
                const EqIcon = eq.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <EqIcon className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-sm text-white/90 font-medium">{eq.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Idéal pour */}
          <div>
            <h3 className="text-base font-bold text-white mb-4">Idéal pour</h3>
            <div className="flex flex-wrap gap-2">
              {studio.idealFor.map((use, idx) => (
                <span
                  key={idx}
                  className={`px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${studio.gradient} text-white`}
                >
                  {use}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Fixe en bas */}
        <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black via-black to-transparent">
          <motion.a
            href="#booking-flow"
            onClick={onClose}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r ${studio.gradient} shadow-xl`}
          >
            Réserver ce studio
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================

export default function StudioShowcaseSection() {
  const [activeStudio, setActiveStudio] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [activeImageDesktop, setActiveImageDesktop] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const studio = STUDIOS[activeStudio];
  const Icon = studio.icon;

  // Auto-scroll vers la card active sur mobile
  useEffect(() => {
    if (scrollContainerRef.current && window.innerWidth < 768) {
      const container = scrollContainerRef.current;
      const cards = container.querySelectorAll('[data-studio-card]');
      const activeCard = cards[activeStudio] as HTMLElement;
      
      if (activeCard) {
        const containerWidth = container.offsetWidth;
        const cardLeft = activeCard.offsetLeft;
        const cardWidth = activeCard.offsetWidth;
        const scrollTo = cardLeft - (containerWidth - cardWidth) / 2;
        
        container.scrollTo({
          left: scrollTo,
          behavior: 'smooth',
        });
      }
    }
  }, [activeStudio]);

  // Reset image quand on change de studio
  useEffect(() => {
    setActiveImageDesktop(0);
  }, [activeStudio]);

  return (
    <section id="showcase" className="relative py-12 md:py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px]"
        />
      </div>

      {/* ============================================
          HEADER
      ============================================ */}
      <div className="relative z-10 px-5 md:px-8 lg:px-16 max-w-7xl mx-auto mb-8 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-5"
          >
            <Eye className="w-4 h-4 text-emerald-400" />
            <span className="text-white/80 text-sm font-medium">6 studios équipés</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 leading-tight">
            Explorez nos
            <span className="block md:inline md:ml-3 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              espaces créatifs
            </span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm md:text-base">
            Découvrez chaque studio et ses équipements avant de réserver.
          </p>
        </motion.div>
      </div>

      {/* ============================================
          VERSION MOBILE - Carousel horizontal
      ============================================ */}
      <div className="md:hidden">
        {/* Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 px-5 pb-6 overflow-x-auto scrollbar-hide"
          style={{ 
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {STUDIOS.map((s, idx) => (
            <div
              key={s.id}
              data-studio-card
              className="scroll-snap-align-center flex-shrink-0"
              style={{ scrollSnapAlign: 'center' }}
            >
              <StudioCardMobile
                studio={s}
                isActive={idx === activeStudio}
                onClick={() => {
                  setActiveStudio(idx);
                  setShowDetail(true);
                }}
              />
            </div>
          ))}
        </div>

        {/* Dots navigation */}
        <div className="flex justify-center gap-2 mb-6">
          {STUDIOS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveStudio(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeStudio 
                  ? `w-8 bg-gradient-to-r ${s.gradient}` 
                  : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Bouton voir détails */}
        <div className="px-5">
          <motion.button
            onClick={() => setShowDetail(true)}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r ${studio.gradient} flex items-center justify-center gap-2 shadow-lg`}
          >
            <Maximize2 className="w-5 h-5" />
            Voir {studio.shortName} en détail
          </motion.button>
        </div>

        {/* Modal détails */}
        <AnimatePresence>
          {showDetail && (
            <StudioDetailModal
              studio={studio}
              onClose={() => setShowDetail(false)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* ============================================
          VERSION DESKTOP - Layout split
      ============================================ */}
      <div className="hidden md:block px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          
          {/* Colonne gauche - Navigation studios */}
          <div className="col-span-4 lg:col-span-3 space-y-2">
            {STUDIOS.map((s, idx) => {
              const SIcon = s.icon;
              const isActive = idx === activeStudio;
              
              return (
                <motion.button
                  key={s.id}
                  onClick={() => setActiveStudio(idx)}
                  whileHover={{ x: isActive ? 0 : 4 }}
                  className={`w-full flex items-center gap-3 lg:gap-4 p-3 lg:p-4 rounded-2xl text-left transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${s.gradient} shadow-lg shadow-${s.color}-500/20`
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isActive ? 'bg-white/20' : 'bg-white/10'
                  }`}>
                    <SIcon className={`w-5 h-5 lg:w-6 lg:h-6 ${isActive ? 'text-white' : 'text-white/70'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-sm lg:text-base truncate ${isActive ? 'text-white' : 'text-white/90'}`}>
                        {s.shortName}
                      </span>
                      {s.popular && (
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 flex-shrink-0" />
                      )}
                    </div>
                    <span className={`text-xs lg:text-sm ${isActive ? 'text-white/80' : 'text-white/50'}`}>
                      dès {s.basePrice}€/h
                    </span>
                  </div>
                  <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-transform ${
                    isActive ? 'text-white translate-x-1' : 'text-white/30'
                  }`} />
                </motion.button>
              );
            })}
          </div>

          {/* Colonne droite - Détails studio */}
          <div className="col-span-8 lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={studio.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                {/* Galerie */}
                <div className="space-y-3">
                  {/* Image principale */}
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeImageDesktop}
                        src={studio.images[activeImageDesktop]}
                        alt={studio.name}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </AnimatePresence>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Badge prix */}
                    <div className={`absolute top-4 right-4 px-4 py-2 rounded-2xl bg-gradient-to-r ${studio.gradient}`}>
                      <span className="text-2xl font-black text-white">{studio.basePrice}€</span>
                      <span className="text-white/80">/h</span>
                    </div>

                    {/* Badge populaire */}
                    {studio.popular && (
                      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-amber-500 rounded-full">
                        <Star className="w-4 h-4 text-black fill-black" />
                        <span className="text-sm font-bold text-black">Populaire</span>
                      </div>
                    )}

                    {/* Navigation arrows */}
                    <button
                      onClick={() => setActiveImageDesktop((prev) => (prev - 1 + studio.images.length) % studio.images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/60"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActiveImageDesktop((prev) => (prev + 1) % studio.images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/60"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {studio.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageDesktop(idx)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            idx === activeImageDesktop ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Thumbnails */}
                  <div className="grid grid-cols-3 gap-3">
                    {studio.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageDesktop(idx)}
                        className={`relative aspect-video rounded-xl overflow-hidden transition-all duration-300 ${
                          idx === activeImageDesktop
                            ? 'ring-2 ring-white'
                            : 'opacity-50 hover:opacity-80'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Infos */}
                <div className="space-y-5">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${studio.gradient} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white leading-tight">{studio.name}</h3>
                      <p className={`text-transparent bg-clip-text bg-gradient-to-r ${studio.gradientText} font-semibold`}>
                        {studio.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/70 leading-relaxed">{studio.description}</p>

                  {/* Specs */}
                  <div className="flex gap-3">
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-white/5 rounded-xl">
                      <UsersIcon className="w-4 h-4 text-white/50" />
                      <span className="text-white font-medium text-sm">{studio.capacity}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-white/5 rounded-xl">
                      <Square className="w-4 h-4 text-white/50" />
                      <span className="text-white font-medium text-sm">{studio.surface}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-white/5 rounded-xl">
                      <Clock className="w-4 h-4 text-white/50" />
                      <span className="text-white font-medium text-sm">2h min</span>
                    </div>
                  </div>

                  {/* Équipements */}
                  <div className="p-5 bg-white/5 rounded-2xl">
                    <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                      <Package className="w-5 h-5 text-emerald-400" />
                      Équipements inclus
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {studio.equipment.map((eq, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span className="text-sm text-white/80">{eq.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Idéal pour */}
                  <div>
                    <h4 className="font-bold text-white mb-3 text-sm">Idéal pour</h4>
                    <div className="flex flex-wrap gap-2">
                      {studio.idealFor.map((use, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r ${studio.gradient} text-white`}
                        >
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.a
                    href="#booking-flow"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r ${studio.gradient} shadow-lg`}
                  >
                    Réserver ce studio
                    <ArrowRight className="w-5 h-5" />
                  </motion.a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ============================================
          SERVICES PREVIEW
      ============================================ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 mt-16 md:mt-24 px-5 md:px-8 lg:px-16 max-w-7xl mx-auto"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-4">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-white/80 text-sm font-medium">Services additionnels</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
            On s'occupe de tout
          </h3>
          <p className="text-white/60 text-sm md:text-base max-w-md mx-auto">
            Montage, maquillage, transport... Ajoutez ce dont vous avez besoin.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {SERVICES_PREVIEW.map((service, idx) => {
            const ServiceIcon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="group p-4 md:p-5 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-white/10 transition-all cursor-pointer"
              >
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-${service.color}-500/20 flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform`}>
                  <ServiceIcon className={`w-5 h-5 md:w-6 md:h-6 text-${service.color}-400`} />
                </div>
                <h4 className="font-bold text-white text-sm md:text-base mb-1">{service.name}</h4>
                <p className="text-xs md:text-sm text-white/50 mb-2 md:mb-3 line-clamp-2">{service.description}</p>
                <span className="text-emerald-400 font-bold text-sm">{service.price}</span>
              </motion.div>
            );
          })}
        </div>

        {/* CTA global */}
        <div className="text-center mt-8 md:mt-10">
          <motion.a
            href="#booking-flow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl font-bold text-white shadow-lg shadow-emerald-500/25"
          >
            Composer mon offre
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}