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
// CDN BUNNY.NET - Configuration
// ============================================================

const CDN_URL = 'https://le40cdn.b-cdn.net';

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
  images: string[];
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
      `${CDN_URL}/studios/face-cam/facecam1.png`,
      `${CDN_URL}/studios/face-cam/facecam2.png`,
      `${CDN_URL}/studios/face-cam/facecam3.png`,
      `${CDN_URL}/studios/face-cam/facecam4.png`,
      `${CDN_URL}/studios/face-cam/facecam5.png`,
      `${CDN_URL}/studios/face-cam/facecam6.png`,
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
      `${CDN_URL}/studios/podcast/podcast1.png`,
      `${CDN_URL}/studios/podcast/podcast%202.png`,
      `${CDN_URL}/studios/podcast/podcast3.png`,
      `${CDN_URL}/studios/podcast/podcast%204.png`,
      `${CDN_URL}/studios/podcast/podcast%205.png`,
      `${CDN_URL}/studios/podcast/podcast%206.png`,
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
      `${CDN_URL}/studios/live/stream1.png`,
      `${CDN_URL}/studios/live/stream%202.png`,
      `${CDN_URL}/studios/live/stream%203.png`,
      `${CDN_URL}/studios/live/stream%204.png`,
      `${CDN_URL}/studios/live/stream%205.png`,
      `${CDN_URL}/studios/live/stream3.png`,
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
      'Régie pro multi-caméras',
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
      `${CDN_URL}/studios/talk-show/4a.png`,
      `${CDN_URL}/studios/talk-show/4b.png`,
      `${CDN_URL}/studios/talk-show/4c.png`,
      `${CDN_URL}/studios/talk-show/a4.png`,
      `${CDN_URL}/studios/talk-show/ae.png`,
      `${CDN_URL}/studios/talk-show/ae.png`,
    ],
    equipment: [
      { name: 'Plateau modulable 4 places', icon: Users, included: true },
      { name: '4 caméras broadcast', icon: Camera, included: true },
      { name: 'Régie intégrée', icon: Monitor, included: true },
      { name: 'Décor TV personnalisable', icon: Square, included: true },
      { name: 'Éclairage plateau', icon: Lightbulb, included: true },
      { name: 'Retours écran', icon: Monitor, included: true },
    ],
    idealFor: ['Émissions', 'Débats', 'Interviews groupées', 'Webséries'],
    popular: false,
    reservations: 45,
    rating: 4.9,
    reviewCount: 31,
    guarantees: [
      'Décor TV professionnel',
      'Configuration sur mesure',
      'Régisseur disponible (option)',
    ],
    whyChoose: [
      'Le plus grand studio',
      'Plateau TV authentique',
      'Multi-caméras intégré',
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
      `${CDN_URL}/studios/interview/alexorigines_71937_Intimate_interview_studio_setup_two_comforta_d37695fa-59d9-4312-b3d7-9518f08b10ad.png`,
      `${CDN_URL}/studios/interview/alexorigines_71937_Two-person_interview_configuration_from_side_2ab44313-b189-4e3f-8373-25f003ac2f03.png`,
      `${CDN_URL}/studios/interview/alexorigines_71937_Cinematic_interview_lighting_setup_soft_diff_896cfc58-2040-4d10-aaaf-2ff6b08dd20d.png`,
      `${CDN_URL}/studios/interview/alexorigines_71937_Beautiful_bokeh_background_for_interview_war_71e20421-ecd6-4b10-9b70-08ebc998259d.png`,
      `${CDN_URL}/studios/interview/alexorigines_71937_Two_Sony_FX3_cameras_positioned_for_intervie_3fc9d153-9639-49cb-9bdb-1ad933dd68fc.png`,
      `${CDN_URL}/studios/interview/alexorigines_71937_Cozy_interview_corner_with_designer_furnitur_6ad63ea5-2dbb-422e-b673-f8c1385ad272.png`,
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
      `${CDN_URL}/studios/vertical/alexorigines_71937_Vertical_video_recording_setup_camera_mounte_e2083961-ee73-44ac-a1dd-f3a8bf1f900a.png`,
      `${CDN_URL}/studios/vertical/alexorigines_71937_TikTok_vertical_video_studio_phone_mount_in__1c46911e-4961-4ead-84aa-9a19afaee31d.png`,
      `${CDN_URL}/studios/vertical/alexorigines_71937_Professional_ring_light_close-up_circular_LE_14f665c2-2b02-4a17-9987-c6062cd4dca9.png`,
      `${CDN_URL}/studios/vertical/alexorigines_71937_RGB_LED_panel_backdrop_showing_multiple_colo_762a035a-2644-42ac-8c5d-e43b005561c7.png`,
      `${CDN_URL}/studios/vertical/alexorigines_71937_Vertical_teleprompter_for_TikTok_content_scr_bbaa6816-6711-455f-966c-976810598620.png`,
      `${CDN_URL}/studios/vertical/alexorigines_71937_Social_media_creator_workspace_makeup_mirror_92ffc7a3-b3d6-4dbc-8370-013144aab90b.png`,
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
    reviewCount: 92,
    guarantees: [
      'Setup vertical natif',
      'Qualité pro en 5 min',
      'Fond LED personnalisable',
    ],
    whyChoose: [
      'Le seul studio 100% vertical',
      'Fond LED 256 couleurs',
      'Format TikTok/Reels natif',
    ],
    notIncluded: [
      'Montage vidéo (disponible en option)',
      'Filtres avancés (disponible en option)',
    ],
  },
];

// ============================================================
// COMPONENTS
// ============================================================

// Galerie plein écran
const FullScreenGallery = ({ studio, onClose }: { studio: Studio; onClose: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Main image */}
      <div className="relative w-full h-full flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
        <img
          src={studio.images[currentIndex]}
          alt={`${studio.name} - Photo ${currentIndex + 1}`}
          className="max-w-full max-h-[85vh] object-contain rounded-lg"
        />

        {/* Navigation arrows */}
        <button
          onClick={() => setCurrentIndex(prev => prev === 0 ? studio.images.length - 1 : prev - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={() => setCurrentIndex(prev => prev === studio.images.length - 1 ? 0 : prev + 1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Counter */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
          <span className="text-white text-sm font-medium">
            {currentIndex + 1} / {studio.images.length}
          </span>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {studio.images.map((img, idx) => (
          <button
            key={idx}
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
            className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
              idx === currentIndex ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </motion.div>
  );
};

// Composant principal
export default function StudioShowcaseSection() {
  const [activeStudioIndex, setActiveStudioIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'equipment' | 'pricing'>('overview');
  const [showFullGallery, setShowFullGallery] = useState(false);

  const studio = STUDIOS[activeStudioIndex];
  const Icon = studio.icon;

  // Reset image index when changing studio
  const handleStudioChange = (index: number) => {
    setActiveStudioIndex(index);
    setActiveImageIndex(0);
    setActiveTab('overview');
  };

  return (
    <section className="bg-[#0a0a0a] py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header minimaliste */}
        <div className="text-center mb-6">
          <h2 className="text-2xl lg:text-3xl font-black text-white mb-2">
            6 Studios Professionnels
          </h2>
          <p className="text-white/60 text-sm">
            Matériel haut de gamme inclus • Réservation instantanée
          </p>
        </div>

        {/* Navigation studios - Pills horizontales */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-white/5 rounded-2xl p-1.5 gap-1 overflow-x-auto hide-scrollbar max-w-full">
            {STUDIOS.map((s, idx) => {
              const SIcon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => handleStudioChange(idx)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
                    activeStudioIndex === idx
                      ? `bg-gradient-to-r ${s.gradient} text-white shadow-lg`
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <SIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">{s.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Contenu principal - Layout horizontal */}
        <AnimatePresence mode="wait">
          <motion.div
            key={studio.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-6 bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-3xl overflow-hidden"
          >
            {/* GAUCHE - Galerie */}
            <div className="relative p-4 lg:p-6">
              {/* Image principale */}
              <div
                className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => setShowFullGallery(true)}
              >
                <img
                  src={studio.images[activeImageIndex]}
                  alt={`${studio.name} - Photo ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay au hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <Maximize2 className="w-6 h-6 text-white" />
                  </div>
                </div>
                {/* Badge popular */}
                {studio.popular && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    <span className="text-white text-xs font-bold">Populaire</span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar">
                {studio.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? `border-white shadow-lg shadow-white/20`
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Mini stats sous les thumbnails */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-white font-bold text-sm">{studio.rating}</span>
                    <span className="text-white/50 text-xs">({studio.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/60 text-xs">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {studio.reservations} réservations
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-white/50 text-xs">à partir de</span>
                  <span className="text-white font-black text-lg ml-1">{studio.basePrice}€</span>
                  <span className="text-white/50 text-xs">/h</span>
                </div>
              </div>
            </div>

            {/* DROITE - Infos avec tabs */}
            <div className="p-4 lg:p-6 flex flex-col">
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${studio.gradient} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">{studio.name}</h3>
                    <p className="text-white/60 text-sm">{studio.tagline}</p>
                  </div>
                </div>

                {/* Infos clés en ligne */}
                <div className="flex flex-wrap gap-3 mt-3">
                  <span className="inline-flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full text-white/80 text-xs">
                    <Users className="w-3.5 h-3.5" /> {studio.capacity}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full text-white/80 text-xs">
                    <Square className="w-3.5 h-3.5" /> {studio.surface}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full text-white/80 text-xs">
                    <Clock className="w-3.5 h-3.5" /> Min. {studio.minDuration}
                  </span>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 mb-4 bg-white/5 rounded-xl p-1">
                {[
                  { id: 'overview', label: 'Aperçu' },
                  { id: 'equipment', label: 'Équipement' },
                  { id: 'pricing', label: 'Tarifs' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-white text-gray-900'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Contenu des tabs - Scrollable */}
              <div className="flex-1 overflow-y-auto custom-scrollbar max-h-[320px]">
                {/* TAB OVERVIEW */}
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <p className="text-white/80 text-sm leading-relaxed">
                      {studio.description}
                    </p>

                    {/* Idéal pour */}
                    <div className="p-3 bg-white/5 rounded-xl">
                      <h4 className="font-bold text-white text-xs mb-2 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        Idéal pour
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {studio.idealFor.map((use, idx) => (
                          <span key={idx} className="bg-white/10 px-2.5 py-1 rounded-full text-white/80 text-xs">
                            {use}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pourquoi choisir */}
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                      <h4 className="font-bold text-white text-xs mb-2 flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        Pourquoi ce studio ?
                      </h4>
                      <ul className="space-y-1">
                        {studio.whyChoose.map((reason, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-white/80 text-xs">
                            <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Garanties */}
                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                      <h4 className="font-bold text-white text-xs mb-2 flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-blue-400" />
                        Nos garanties
                      </h4>
                      <ul className="space-y-1">
                        {studio.guarantees.map((guarantee, idx) => (
                          <li key={idx} className="text-white/70 text-xs">
                            • {guarantee}
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