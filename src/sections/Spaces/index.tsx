import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Monitor, Video, ArrowRight, Calendar, Sparkles, Check, Clock, Shield, Wifi, Coffee, Camera, Mic, Radio, Building2, Projector, ChevronRight } from 'lucide-react';

const spaceCategories = [
  {
    id: 'coworking',
    title: 'Espaces Coworking',
    subtitle: 'Bureaux flexibles et privés',
    icon: Users,
    gradient: 'from-violet-600 via-purple-600 to-indigo-600',
    shadowColor: '#8b5cf6',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1920',
    spaces: [
      {
        name: 'Open Space',
        capacity: '50 postes',
        price: 'Dès 250€/mois',
        features: ['Bureaux flexibles', 'Écrans 4K', 'Casiers sécurisés'],
        highlight: 'L\'énergie collective'
      },
      {
        name: 'Bureaux Privés',
        capacity: '2-10 personnes',
        price: 'Dès 800€/mois',
        features: ['Mobilier premium', 'Ligne téléphonique', 'Stockage privé'],
        highlight: 'Votre espace dédié'
      },
      {
        name: 'Phone Box',
        capacity: '1 personne',
        price: 'Inclus',
        features: ['Insonorisation totale', 'Éclairage optimal', 'Ventilation'],
        highlight: 'Confidentialité garantie'
      }
    ],
    cta: 'Découvrir nos espaces',
    link: '/coworking'
  },
  {
    id: 'meeting',
    title: 'Salles de Réunion',
    subtitle: 'Espaces équipés tout compris',
    icon: Monitor,
    gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
    shadowColor: '#10b981',
    image: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1920',
    spaces: [
      {
        name: 'Salle Conférence',
        capacity: '2-50 personnes',
        price: '150€/heure',
        features: ['Écran géant 85"', 'Système audio pro', 'Streaming HD'],
        highlight: 'Grandes présentations'
      },
      {
        name: 'Salle Créative',
        capacity: '4-20 personnes',
        price: '80€/heure',
        features: ['Murs inscriptibles', 'Écrans tactiles', 'Kit créatif'],
        highlight: 'Brainstorming dynamique'
      },
      {
        name: 'Salle Executive',
        capacity: '6-12 personnes',
        price: '120€/heure',
        features: ['Table ovale premium', 'Visio 4K', 'Bar privé'],
        highlight: 'Réunions stratégiques'
      }
    ],
    cta: 'Réserver une salle',
    link: '/salles'
  },
  {
    id: 'studio',
    title: 'Studios Production',
    subtitle: 'Création audiovisuelle 4K/8K',
    icon: Video,
    gradient: 'from-pink-600 via-rose-600 to-red-600',
    shadowColor: '#ec4899',
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1920',
    spaces: [
      {
        name: 'Studio Vidéo',
        capacity: '200m² modulables',
        price: 'Dès 119€/h',
        features: ['Fond vert 6x4m', 'Éclairage LED', 'Caméras 4K'],
        highlight: 'Production pro'
      },
      {
        name: 'Studio Podcast',
        capacity: '4 invités',
        price: 'Dès 79€/h',
        features: ['Isolation acoustique', 'Micros Shure SM7B', 'Table ronde'],
        highlight: 'Audio cristallin'
      },
      {
        name: 'Studio Live',
        capacity: 'Streaming HD',
        price: 'Dès 199€/h',
        features: ['Régie multicam', 'Streaming 4K', 'Écran LED'],
        highlight: 'Événements en direct'
      }
    ],
    cta: 'Explorer les studios',
    link: '/studios'
  }
];

const globalFeatures = [
  { icon: Wifi, title: 'Wifi Fibré 1Gb/s', gradient: 'from-blue-500 to-cyan-500' },
  { icon: Coffee, title: 'Café & Snacks illimités', gradient: 'from-orange-500 to-amber-500' },
  { icon: Shield, title: 'Accès sécurisé 24/7', gradient: 'from-emerald-500 to-green-500' },
  { icon: Users, title: 'Communauté premium', gradient: 'from-purple-500 to-pink-500' }
];

export default function Spaces() {
  const [activeCategory, setActiveCategory] = useState('coworking');
  const [hoveredSpace, setHoveredSpace] = useState<string | null>(null);

  const currentCategory = spaceCategories.find(cat => cat.id === activeCategory)!;

  return (
    <section id="espaces" className="relative min-h-screen bg-[#0A0A0A] py-32 overflow-hidden">
      {/* Sophisticated gradient base - Matching Hero exactly */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#1A1A1A]"></div>

        {/* Subtle mesh pattern - Matching Hero exactly */}
        <div className="absolute inset-0 opacity-[0.015]"
             style={{
               backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
               backgroundSize: '48px 48px'
             }}>
        </div>
      </div>

      {/* Dynamic ambient light orbs - Matching Hero system */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            <motion.div
              className="absolute top-1/4 -left-48 w-96 h-96 rounded-full blur-[120px]"
              style={{ backgroundColor: currentCategory.shadowColor, opacity: 0.08 }}
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, -30, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 -right-48 w-[30rem] h-[30rem] rounded-full blur-[140px]"
              style={{ backgroundColor: currentCategory.shadowColor, opacity: 0.06 }}
              animate={{
                scale: [1, 1.15, 1],
                x: [0, -50, 0],
                y: [0, 40, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating particles - Matching Hero */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? currentCategory.shadowColor : i % 3 === 1 ? '#ec4899' : '#3b82f6',
              boxShadow: `0 0 ${4 + Math.random() * 6}px currentColor`,
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0, 0.7, 0],
              scale: [0, Math.random() * 1.5 + 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 6,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16">
        {/* Header - Matching Hero exactly */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center mb-12"
          >
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/30 mr-4"></div>
            <span className="text-xs font-montserrat font-medium text-white/50 tracking-[0.3em] uppercase">
              Acte 3 - Nos Espaces
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/30 ml-4"></div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-6xl md:text-7xl lg:text-8xl font-montserrat font-black text-white mb-8 leading-[0.9]"
          >
            ESPACES
            <motion.span
              className={`block text-transparent bg-clip-text bg-gradient-to-r ${currentCategory.gradient}`}
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              PREMIUM
            </motion.span>
          </motion.h2>

          {/* Refined accent line - Matching Hero */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-24 origin-center mb-8"
          >
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            <motion.div
              className="absolute top-0 left-0 h-[1px] w-6 bg-white/60"
              animate={{ x: [0, 72, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl font-inter font-light text-white/60 max-w-3xl mx-auto leading-relaxed"
          >
            2500m² dédiés à votre réussite • Technologie de pointe • Services all-inclusive
          </motion.p>
        </motion.div>

        {/* Category Tabs - Already matches well */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-2 border border-white/10">
            <div className="grid grid-cols-3 gap-2">
              {spaceCategories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;

                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative rounded-2xl p-6 transition-all duration-500 ${
                      isActive ? 'bg-white/10' : 'hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-20 rounded-2xl`}
                        transition={{ type: "spring", duration: 0.6 }}
                      />
                    )}

                    <div className="relative flex flex-col items-center gap-3">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${category.gradient} flex items-center justify-center ${
                        isActive ? 'scale-110' : 'scale-100 opacity-70'
                      } transition-all duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className={`font-montserrat font-bold text-lg ${
                          isActive ? 'text-white' : 'text-white/60'
                        } transition-colors duration-300`}>
                          {category.title}
                        </h3>
                        <p className={`text-sm font-inter mt-1 ${
                          isActive ? 'text-white/70' : 'text-white/40'
                        } transition-colors duration-300`}>
                          {category.subtitle}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
              {/* Left: Image showcase */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="relative"
              >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                  <img
                    src={currentCategory.image}
                    alt={currentCategory.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${currentCategory.gradient} opacity-20`}></div>

                  {/* Floating stats */}
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="flex gap-4 flex-wrap">
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20">
                        <span className="text-white font-montserrat font-bold text-lg">2500m²</span>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20">
                        <span className="text-white font-montserrat font-bold text-lg">24/7</span>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20">
                        <span className="text-white font-montserrat font-bold text-lg">All-inclusive</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative element */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-10 -right-10 w-40 h-40 pointer-events-none"
                >
                  <div className={`w-full h-full bg-gradient-to-r ${currentCategory.gradient} rounded-full opacity-10 blur-3xl`}></div>
                </motion.div>
              </motion.div>

              {/* Right: Spaces list */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="space-y-6"
              >
                {currentCategory.spaces.map((space, index) => (
                  <motion.div
                    key={space.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.6 }}
                    onMouseEnter={() => setHoveredSpace(space.name)}
                    onMouseLeave={() => setHoveredSpace(null)}
                    whileHover={{ y: -4, scale: 1.01 }}
                    className="group"
                  >
                    <div className={`relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border transition-all duration-500 ${
                      hoveredSpace === space.name
                        ? 'border-white/30 bg-white/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}>
                      {/* Hover gradient */}
                      {hoveredSpace === space.name && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`absolute inset-0 bg-gradient-to-r ${currentCategory.gradient} opacity-5 rounded-3xl`}
                        />
                      )}

                      <div className="relative">
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <h3 className="text-2xl font-montserrat font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
                              {space.name}
                            </h3>
                            <p className="text-white/60 font-playfair italic text-lg">
                              "{space.highlight}"
                            </p>
                          </div>

                          <motion.div
                            animate={{ rotate: hoveredSpace === space.name ? 45 : 0 }}
                            transition={{ duration: 0.3 }}
                            className={`p-3 rounded-2xl bg-gradient-to-r ${currentCategory.gradient} opacity-20 group-hover:opacity-100 transition-opacity duration-300`}
                          >
                            <ChevronRight className="w-6 h-6 text-white" />
                          </motion.div>
                        </div>

                        <div className="flex flex-wrap gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-white/40" />
                            <span className="text-white/80 font-inter text-sm">{space.capacity}</span>
                          </div>
                          <div className="w-px h-5 bg-white/20"></div>
                          <div className={`px-4 py-1.5 bg-gradient-to-r ${currentCategory.gradient} rounded-full`}>
                            <span className="text-white font-montserrat font-semibold text-sm">{space.price}</span>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-3">
                          {space.features.map((feature, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.05 * i + 0.2 }}
                              className="px-4 py-2 bg-white/5 rounded-full text-white/60 text-sm font-inter border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
                            >
                              {feature}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* CTA */}
                <motion.a
                  href={currentCategory.link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block mt-8"
                >
                  <div className="relative group">
                    <div className={`absolute -inset-1 bg-gradient-to-r ${currentCategory.gradient} rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500`}></div>
                    <div className="relative bg-white text-black rounded-2xl px-10 py-5 overflow-hidden">
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${currentCategory.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                      />
                      <div className="relative flex items-center justify-between">
                        <span className="font-montserrat font-bold text-lg tracking-wide">
                          {currentCategory.cta}
                        </span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </motion.a>
              </motion.div>
            </div>

            {/* Global Features */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-20"
            >
              <h3 className="text-2xl font-montserrat font-bold text-white/80 text-center mb-12">
                Inclus dans tous nos espaces
              </h3>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {globalFeatures.map((feature, index) => {
                  const Icon = feature.icon;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      whileHover={{ y: -5 }}
                      className="group text-center"
                    >
                      <div className="relative inline-block mb-6">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
                        />
                        <div className={`relative w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-3xl flex items-center justify-center`}>
                          <Icon className="w-10 h-10 text-white" />
                        </div>
                      </div>

                      <h4 className="text-lg font-montserrat font-semibold text-white">
                        {feature.title}
                      </h4>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-center"
            >
              <motion.a
                href="/visite"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-block"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-emerald-600 to-pink-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative bg-white text-black rounded-2xl px-10 py-5">
                  <div className="flex items-center gap-4">
                    <Calendar className="w-5 h-5" />
                    <span className="font-montserrat font-bold tracking-wide">
                      PLANIFIER UNE VISITE
                    </span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </motion.a>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Premium film grain texture - Matching Hero */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none z-20">
        <svg width="100%" height="100%">
          <filter id="sophisticatedNoiseSpaces">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#sophisticatedNoiseSpaces)" />
        </svg>
      </div>
    </section>
  );
}
