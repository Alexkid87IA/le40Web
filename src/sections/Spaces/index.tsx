import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Monitor, Video, ArrowRight, Calendar, Sparkles, Check, Clock, Shield, Wifi, Coffee, Camera, Mic, Radio, Building2, Projector, ChevronRight } from 'lucide-react';

const spaceCategories = [
  {
    id: 'coworking',
    title: 'Espaces Coworking',
    subtitle: 'Bureaux flexibles et privés',
    icon: Users,
    gradient: 'from-violet-600 to-purple-600',
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
    gradient: 'from-emerald-600 to-teal-600',
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
    gradient: 'from-pink-600 to-rose-600',
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
    <section id="espaces" className="relative min-h-screen bg-black overflow-hidden py-32">
      {/* Dynamic gradient background */}
      <motion.div 
        className="absolute inset-0"
        animate={{ opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${currentCategory.gradient} transition-all duration-1000`}></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/60 to-black"></div>
      </motion.div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 px-8"
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

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl font-inter font-light text-white/60 max-w-3xl mx-auto"
          >
            2500m² dédiés à votre réussite • Technologie de pointe • Services all-inclusive
          </motion.p>
        </motion.div>

        {/* Category Tabs */}
        <div className="max-w-5xl mx-auto px-8 mb-16">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-2 border border-white/10">
            <div className="grid grid-cols-3 gap-2">
              {spaceCategories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
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
                  </button>
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
            className="max-w-7xl mx-auto px-8"
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

                {/* Decorative elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-10 -right-10 w-40 h-40"
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
                    className="group"
                  >
                    <div className={`relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border transition-all duration-500 ${
                      hoveredSpace === space.name 
                        ? 'border-white/30 bg-white/10 scale-[1.02]' 
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
                            <span key={i} className="px-4 py-2 bg-white/5 rounded-full text-white/60 text-sm font-inter border border-white/10">
                              {feature}
                            </span>
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
                  <div className={`relative bg-gradient-to-r ${currentCategory.gradient} p-[2px] rounded-2xl overflow-hidden group`}>
                    <div className="relative bg-black rounded-2xl px-8 py-5 overflow-hidden">
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${currentCategory.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                      />
                      
                      <div className="relative flex items-center justify-between">
                        <span className="font-montserrat font-bold text-white text-lg">
                          {currentCategory.cta}
                        </span>
                        <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-2 transition-transform duration-300" />
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
              className="text-center"
            >
              <h3 className="text-2xl font-montserrat font-bold text-white/80 mb-12">
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
                      className="group"
                    >
                      <div className="text-center">
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
                      </div>
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
              className="text-center mt-20"
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
                    <span className="font-montserrat font-bold">
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

      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <div className={`w-48 h-48 bg-gradient-to-r ${spaceCategories[i % 3].gradient} rounded-full blur-3xl`} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}