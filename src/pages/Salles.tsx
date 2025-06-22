import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Clock, Users, Check, ArrowRight, Calendar, ChevronLeft, ChevronRight, Monitor, Wifi, Video, Presentation, Coffee, Sparkles, Award, MapPin, Phone, Mic, Sun, Music, Projector, X, ShoppingCart, Plus, Star, Zap, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SidebarNav from '../components/Nav/SidebarNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import AddToCartButton from '../components/Cart/AddToCartButton';

// Données des salles mises à jour
const allSpaces = [
  {
    id: 1,
    category: 'Salles de réunion',
    title: 'Salle Focus',
    capacity: '2-4 personnes',
    price: 40,
    priceUnit: '/heure',
    description: 'Espace intime idéal pour entretiens, visioconférences et sessions de coaching',
    features: [
      'Écran 4K 55"',
      'Tableau blanc digital',
      'Wi-Fi 1 Gb/s dédié',
      'Isolation phonique renforcée',
      'Climatisation individuelle',
      'Éclairage modulable LED',
      'Mobilier ergonomique Herman Miller',
      'Prises USB-C intégrées'
    ],
    images: [
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1600'
    ],
    gradient: 'from-violet-600 to-purple-600',
    accentColor: 'violet',
    icon: Monitor,
    disponibilites: ['Heure', 'Demi-journée', 'Journée']
  },
  {
    id: 2,
    category: 'Salles de réunion',
    title: 'Salle Créative',
    capacity: '6-8 personnes',
    price: 60,
    priceUnit: '/heure',
    description: 'Espace dynamique pour ateliers créatifs et sessions de brainstorming',
    features: [
      'TV HD 75" tactile',
      'Paper-board digital interactif',
      'Connectique HDMI/USB-C/DisplayPort',
      'Post-its & matériel créatif illimité',
      'Mobilier modulable sur roulettes',
      'Machine à café Nespresso Pro',
      'Mur d\'écriture magnétique',
      'Système audio Bose'
    ],
    images: [
      'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1600'
    ],
    gradient: 'from-emerald-600 to-teal-600',
    accentColor: 'emerald',
    icon: Presentation,
    popular: true,
    disponibilites: ['Heure', 'Demi-journée', 'Journée']
  },
  {
    id: 3,
    category: 'Grande Salle',
    title: 'Salle de Conférence',
    capacity: 'Jusqu\'à 80 personnes',
    price: 80,
    priceUnit: '/heure',
    description: 'Espace événementiel premium pour conférences, séminaires et formations',
    features: [
      'Duo vidéoprojecteurs laser 4K',
      'Écrans latéraux synchronisés',
      'Système micro-cravate & HF Sennheiser',
      'Pupitre professionnel ajustable',
      'Estrade modulaire 40m²',
      'Scène éclairée DMX',
      'Régie son + lumière complète',
      'Streaming HD & enregistrement',
      'Cabine de traduction simultanée',
      'Vestiaire 100 places'
    ],
    images: [
      'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/3321793/pexels-photo-3321793.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1600'
    ],
    gradient: 'from-indigo-600 to-purple-600',
    accentColor: 'indigo',
    icon: Projector,
    disponibilites: ['Heure', 'Demi-journée', 'Journée']
  },
  {
    id: 4,
    category: 'Espaces événementiels',
    title: 'Terrasse Panoramique',
    capacity: '300 m²',
    price: 200,
    priceUnit: '/heure (min. 2h)',
    description: 'Rooftop exceptionnel avec vue 360° pour réceptions, keynotes et afterworks mémorables',
    features: [
      'Vue panoramique 360° sur Paris',
      'Lounge extérieur chauffé',
      'Estrade modulable 20m²',
      'Mobilier cocktail design',
      'Wi-Fi mesh outdoor',
      'Bar mobile équipé complet',
      'Éclairage soirée LED RGB',
      'Sonorisation Line Array',
      'Brumisateurs intégrés',
      'Pergola bioclimatique 100m²'
    ],
    images: [
      'https://images.pexels.com/photos/1449773/pexels-photo-1449773.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1600'
    ],
    gradient: 'from-amber-600 to-orange-600',
    accentColor: 'amber',
    icon: Sun,
    disponibilites: ['2 heures', '4 heures', 'Soirée complète']
  },
  {
    id: 5,
    category: 'Espaces événementiels',
    title: 'Lounge & Café',
    capacity: '60 m²',
    price: 50,
    priceUnit: '/heure',
    description: 'Espace convivial pour networking, pauses gourmandes et mini-events',
    features: [
      'Canapés Chesterfield',
      'Machine espresso barista professionnelle',
      'Sono d\'ambiance Sonos',
      'Éclairage tamisé variable',
      'Bar équipé avec cave à vin',
      'Mobilier lounge modulable',
      'Écran TV 65" 4K',
      'Espace privatisable',
      'Bibliothèque design',
      'Coin jeux (baby-foot, arcade)'
    ],
    images: [
      'https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=1600'
    ],
    gradient: 'from-rose-600 to-pink-600',
    accentColor: 'rose',
    icon: Coffee,
    disponibilites: ['Heure', 'Demi-journée', 'Soirée']
  }
];

export default function Salles() {
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.8]);

  // Reset options when space changes
  useEffect(() => {
    if (selectedSpace) {
      setCurrentImageIndex(0);
    }
  }, [selectedSpace]);

  const calculatePrice = (space, duration) => {
    let basePrice = space.price;
    
    switch(duration) {
      case '2 heures':
        return basePrice * 2;
      case '4 heures':
        return basePrice * 4;
      case 'Demi-journée':
        return Math.round(basePrice * 3.5);
      case 'Journée':
        return Math.round(basePrice * 7);
      case 'Soirée complète':
      case 'Soirée':
        return basePrice * 6;
      default:
        return basePrice;
    }
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <SidebarNav />
      <MobileBurger />
      
      <main className="lg:ml-60">
        {/* Hero Section avec effet parallax */}
        <motion.section 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative h-[50vh] flex items-center justify-center overflow-hidden"
        >
          {/* Background animé avec mesh gradient */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-black to-purple-900/20"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse animation-delay-2000"></div>
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>

          <div className="relative z-10 text-center px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-montserrat font-black text-white mb-6">
                NOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">ESPACES</span>
              </h1>
              <p className="text-xl md:text-2xl font-inter font-light text-white/60 max-w-3xl mx-auto">
                5 espaces modulables pour tous vos besoins professionnels
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Espaces Grid - Design cards modernes */}
        <section className="relative py-24 bg-black">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="absolute top-0 left-1/2 h-1/2 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16">
            {/* Première ligne - 3 espaces */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {allSpaces.slice(0, 3).map((space, index) => (
                <motion.div
                  key={space.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  onHoverStart={() => setHoveredCard(space.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  onClick={() => setSelectedSpace(space)}
                  className="relative group cursor-pointer"
                >
                  {space.popular && (
                    <motion.div
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="absolute -top-4 right-6 z-10"
                    >
                      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-medium px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
                        <Star className="w-3.5 h-3.5 fill-white" />
                        Plus demandée
                      </div>
                    </motion.div>
                  )}

                  <motion.div
                    animate={{
                      scale: hoveredCard === space.id ? 1.02 : 1,
                      y: hoveredCard === space.id ? -5 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative h-[400px] rounded-2xl overflow-hidden bg-zinc-900/50 backdrop-blur-sm border border-white/5"
                  >
                    {/* Image avec effet Ken Burns au hover */}
                    <motion.div
                      animate={{
                        scale: hoveredCard === space.id ? 1.1 : 1
                      }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0"
                    >
                      <img
                        src={space.images[0]}
                        alt={space.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* Gradient overlay dynamique */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90`}></div>
                    
                    {/* Accent gradient au hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredCard === space.id ? 0.3 : 0 }}
                      className={`absolute inset-0 bg-gradient-to-br ${space.gradient}`}
                    ></motion.div>

                    {/* Icône flottante */}
                    <motion.div
                      animate={{
                        y: hoveredCard === space.id ? -5 : 0,
                        rotate: hoveredCard === space.id ? 10 : 0
                      }}
                      className="absolute top-6 right-6"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${space.gradient} rounded-xl flex items-center justify-center backdrop-blur-sm`}>
                        <space.icon className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>

                    {/* Contenu */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <motion.h3 
                        animate={{
                          x: hoveredCard === space.id ? 5 : 0
                        }}
                        className="text-3xl font-montserrat font-bold text-white mb-2"
                      >
                        {space.title}
                      </motion.h3>
                      <p className="text-white/60 text-sm mb-8">{space.capacity}</p>
                      
                      {/* Prix et CTA */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-4xl font-montserrat font-black text-white">
                            {space.price}€
                          </span>
                          <span className="text-white/40 text-sm ml-2">{space.priceUnit}</span>
                        </div>
                        
                        <motion.div
                          animate={{
                            scale: hoveredCard === space.id ? 1.1 : 1,
                            rotate: hoveredCard === space.id ? 90 : 0
                          }}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20`}
                        >
                          <Plus className="w-6 h-6 text-white" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Effet de lumière au hover */}
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ 
                        opacity: hoveredCard === space.id ? 1 : 0,
                        x: hoveredCard === space.id ? 100 : -100
                      }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Deuxième ligne - 2 espaces centrés */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[850px] mx-auto">
              {allSpaces.slice(3).map((space, index) => (
                <motion.div
                  key={space.id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index + 3) * 0.1, duration: 0.6 }}
                  onHoverStart={() => setHoveredCard(space.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  onClick={() => setSelectedSpace(space)}
                  className="relative group cursor-pointer"
                >
                  <motion.div
                    animate={{
                      scale: hoveredCard === space.id ? 1.02 : 1,
                      y: hoveredCard === space.id ? -5 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative h-[400px] rounded-2xl overflow-hidden bg-zinc-900/50 backdrop-blur-sm border border-white/5"
                  >
                    {/* Image avec effet Ken Burns au hover */}
                    <motion.div
                      animate={{
                        scale: hoveredCard === space.id ? 1.1 : 1
                      }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0"
                    >
                      <img
                        src={space.images[0]}
                        alt={space.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* Gradient overlay dynamique */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90`}></div>
                    
                    {/* Accent gradient au hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredCard === space.id ? 0.3 : 0 }}
                      className={`absolute inset-0 bg-gradient-to-br ${space.gradient}`}
                    ></motion.div>

                    {/* Icône flottante */}
                    <motion.div
                      animate={{
                        y: hoveredCard === space.id ? -5 : 0,
                        rotate: hoveredCard === space.id ? 10 : 0
                      }}
                      className="absolute top-6 right-6"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${space.gradient} rounded-xl flex items-center justify-center backdrop-blur-sm`}>
                        <space.icon className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>

                    {/* Contenu */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <motion.h3 
                        animate={{
                          x: hoveredCard === space.id ? 5 : 0
                        }}
                        className="text-3xl font-montserrat font-bold text-white mb-2"
                      >
                        {space.title}
                      </motion.h3>
                      <p className="text-white/60 text-sm mb-8">{space.capacity}</p>
                      
                      {/* Prix et CTA */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-4xl font-montserrat font-black text-white">
                            {space.price}€
                          </span>
                          <span className="text-white/40 text-sm ml-2">{space.priceUnit}</span>
                        </div>
                        
                        <motion.div
                          animate={{
                            scale: hoveredCard === space.id ? 1.1 : 1,
                            rotate: hoveredCard === space.id ? 90 : 0
                          }}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20`}
                        >
                          <Plus className="w-6 h-6 text-white" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Effet de lumière au hover */}
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ 
                        opacity: hoveredCard === space.id ? 1 : 0,
                        x: hoveredCard === space.id ? 100 : -100
                      }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Modal détails espace - Design premium */}
        <AnimatePresence>
          {selectedSpace && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedSpace(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                transition={{ type: "spring", stiffness: 250, damping: 25 }}
                className="bg-gradient-to-br from-zinc-900 to-black rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                  {/* Galerie photos avec effet cinématique */}
                  <div className="relative h-[400px] lg:h-[700px] bg-black">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={selectedSpace.images[currentImageIndex]}
                        alt={selectedSpace.title}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                      />
                    </AnimatePresence>

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                    {/* Navigation élégante */}
                    {selectedSpace.images.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentImageIndex(prev => 
                            prev === 0 ? selectedSpace.images.length - 1 : prev - 1
                          )}
                          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all group"
                        >
                          <ChevronLeft className="w-6 h-6 text-white group-hover:-translate-x-0.5 transition-transform" />
                        </button>

                        <button
                          onClick={() => setCurrentImageIndex(prev => 
                            prev === selectedSpace.images.length - 1 ? 0 : prev + 1
                          )}
                          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all group"
                        >
                          <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-0.5 transition-transform" />
                        </button>

                        {/* Indicateurs minimalistes */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                          {selectedSpace.images.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentImageIndex(idx)}
                              className="group"
                            >
                              <div className={`h-1 rounded-full transition-all ${
                                idx === currentImageIndex 
                                  ? 'w-12 bg-white' 
                                  : 'w-6 bg-white/30 group-hover:bg-white/50'
                              }`} />
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Détails et réservation - Design premium */}
                  <div className="p-10 lg:p-12 bg-gradient-to-br from-zinc-900 to-zinc-950 max-h-[700px] overflow-y-auto">
                    {/* Header élégant */}
                    <div className="flex items-start justify-between mb-8">
                      <div>
                        <motion.span 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-${selectedSpace.accentColor}-500/10 text-${selectedSpace.accentColor}-400 mb-4`}
                        >
                          <selectedSpace.icon className="w-3.5 h-3.5" />
                          {selectedSpace.category}
                        </motion.span>
                        
                        <motion.h2 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="text-4xl font-montserrat font-black text-white mb-4"
                        >
                          {selectedSpace.title}
                        </motion.h2>
                        
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="text-zinc-400 leading-relaxed"
                        >
                          {selectedSpace.description}
                        </motion.p>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedSpace(null)}
                        className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                      >
                        <X className="w-5 h-5 text-white" />
                      </motion.button>
                    </div>

                    <div className="flex items-center gap-3 text-zinc-400 mb-10">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{selectedSpace.capacity}</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg">
                        <Wifi className="w-4 h-4" />
                        <span className="text-sm">Wi-Fi 1Gb/s</span>
                      </div>
                    </div>

                    {/* Équipements avec design moderne */}
                    <div className="mb-10">
                      <h3 className="text-lg font-montserrat font-bold text-white mb-6 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-emerald-400" />
                        Équipements premium inclus
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedSpace.features.map((feature, idx) => (
                          <motion.div 
                            key={idx} 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                          >
                            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span className="text-zinc-300 text-sm">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Options de réservation avec AddToCartButton */}
                    <div className="space-y-6">
                      <h4 className="text-base font-montserrat font-semibold text-white">
                        Choisissez votre durée
                      </h4>

                      <div className="grid grid-cols-1 gap-3">
                        {selectedSpace.disponibilites.map((duree, idx) => {
                          const price = calculatePrice(selectedSpace, duree);
                          const durationMap = {
                            'Heure': 'hour',
                            'Demi-journée': 'half-day',
                            'Journée': 'day',
                            '2 heures': 'hour',
                            '4 heures': 'half-day',
                            'Soirée complète': 'day',
                            'Soirée': 'day'
                          };
                          
                          return (
                            <motion.div
                              key={duree}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                            >
                              <div>
                                <p className="text-white font-medium">{selectedSpace.title} - {duree}</p>
                                <p className="text-zinc-400 text-sm">{price}€ TTC</p>
                              </div>
                              <AddToCartButton
                                item={{
                                  id: `salle-${selectedSpace.id}-${duree.toLowerCase().replace(/\s/g, '-')}`,
                                  name: `${selectedSpace.title} - ${duree}`,
                                  price: price,
                                  type: 'meeting-room',
                                  duration: durationMap[duree] || 'hour'
                                }}
                                variant={idx === 0 ? 'primary' : 'secondary'}
                              />
                            </motion.div>
                          );
                        })}
                      </div>

                      <p className="text-center text-zinc-500 text-xs mt-4">
                        Réservation flexible • Annulation gratuite jusqu'à 24h avant
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section avec design futuriste */}
        <section className="relative py-32 bg-black overflow-hidden">
          {/* Background animé */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px]">
              <div className="absolute inset-0 bg-emerald-600/20 rounded-full blur-[200px] animate-pulse"></div>
              <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-[200px] animate-pulse animation-delay-2000"></div>
            </div>
          </div>

          {/* Particules flottantes */}
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 mb-8">
                <Building2 className="w-8 h-8 text-emerald-400" />
                <span className="text-emerald-400 font-montserrat font-medium text-sm tracking-wider uppercase">
                  Le 40 Coworking Premium
                </span>
              </div>

              <h2 className="text-5xl md:text-6xl lg:text-7xl font-montserrat font-black text-white mb-6">
                BESOIN D'UN ESPACE
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 animate-gradient">
                  SUR-MESURE ?
                </span>
              </h2>

              <p className="text-xl font-inter text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                Notre équipe vous accompagne pour créer l'événement parfait dans nos espaces modulables
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/contact" className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative bg-black rounded-2xl px-10 py-5 border border-emerald-500/50 flex items-center gap-3"
                  >
                    <Zap className="w-5 h-5 text-white" />
                    <span className="font-montserrat font-semibold text-white">
                      Demander un devis personnalisé
                    </span>
                    <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </Link>

                <motion.a
                  href="tel:0123456789"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl px-10 py-5 border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-3"
                >
                  <Phone className="w-5 h-5 text-white" />
                  <span className="font-montserrat font-semibold text-white">
                    01 23 45 67 89
                  </span>
                </motion.a>
              </div>

              <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
                {[
                  { number: "500+", label: "Événements organisés" },
                  { number: "98%", label: "Clients satisfaits" },
                  { number: "24/7", label: "Support disponible" }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                      {stat.number}
                    </div>
                    <div className="text-zinc-500 text-sm mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}