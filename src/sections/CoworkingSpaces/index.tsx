import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Users, ArrowRight, Clock, Shield, Wifi, Coffee, Building2, Calendar, ArrowUpRight } from 'lucide-react';

const coworkingSpaces = [
  {
    id: 1,
    title: "Open Space",
    tagline: "L'énergie collective",
    description: "Un espace ouvert et lumineux conçu pour favoriser les échanges et la créativité collective.",
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1920",
    capacity: "50 postes",
    access: "24/7",
    features: ["Bureaux flexibles", "Écrans 4K", "Casiers sécurisés"],
    gradient: "from-blue-600 to-cyan-600",
    price: "À partir de 250€/mois"
  },
  {
    id: 2,
    title: "Bureaux Privés",
    tagline: "Votre espace dédié",
    description: "Des bureaux fermés pour 2 à 10 personnes, entièrement équipés et personnalisables.",
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920",
    capacity: "2-10 personnes",
    access: "24/7",
    features: ["Mobilier premium", "Ligne téléphonique", "Stockage privé"],
    gradient: "from-purple-600 to-pink-600",
    price: "À partir de 800€/mois"
  },
  {
    id: 3,
    title: "Phone Box",
    tagline: "Confidentialité garantie",
    description: "Cabines insonorisées pour vos appels importants et visioconférences en toute tranquillité.",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920",
    capacity: "1 personne",
    access: "Réservation",
    features: ["Insonorisation totale", "Éclairage optimal", "Ventilation silencieuse"],
    gradient: "from-emerald-600 to-green-600",
    price: "Inclus"
  },
  {
    id: 4,
    title: "Lounge & Café",
    tagline: "Détente productive",
    description: "Un espace convivial pour travailler dans une ambiance décontractée ou networker autour d'un café.",
    image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1920",
    capacity: "30 places",
    access: "7h-22h",
    features: ["Canapés confort", "Bar à café", "Espace networking"],
    gradient: "from-orange-600 to-amber-600",
    price: "Accès libre"
  },
  {
    id: 5,
    title: "Terrasse Rooftop",
    tagline: "Vue panoramique",
    description: "Un espace extérieur unique avec vue sur Marseille pour travailler ou organiser des événements.",
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920",
    capacity: "40 personnes",
    access: "Selon météo",
    features: ["Vue 360°", "Mobilier outdoor", "Zone événements"],
    gradient: "from-sky-600 to-indigo-600",
    price: "Sur réservation"
  }
];

const features = [
  { 
    icon: Wifi, 
    title: "Wifi Fibré", 
    desc: "Connexion ultra-rapide 1 Gb/s",
    gradient: "from-blue-500 to-cyan-500"
  },
  { 
    icon: Coffee, 
    title: "Café Illimité", 
    desc: "Boissons chaudes et froides",
    gradient: "from-orange-500 to-amber-500"
  },
  { 
    icon: Shield, 
    title: "Accès Sécurisé", 
    desc: "Badge personnel 24/7",
    gradient: "from-emerald-500 to-green-500"
  },
  { 
    icon: Users, 
    title: "Communauté", 
    desc: "200+ entrepreneurs actifs",
    gradient: "from-purple-500 to-pink-500"
  }
];

export default function CoworkingSpaces() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]);

  const activeSpace = coworkingSpaces[activeIndex];

  return (
    <section ref={containerRef} id="espaces" className="relative min-h-screen bg-black overflow-hidden py-32" style={{ position: 'relative' }}>
      {/* Dynamic gradient background */}
      <motion.div 
        className="absolute inset-0"
        style={{ opacity }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${activeSpace.gradient} opacity-10 transition-all duration-1000`}></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/50 to-black"></div>
      </motion.div>

      {/* Animated grid */}
      <motion.div 
        className="absolute inset-0 opacity-[0.03]"
        style={{ y: parallaxY }}
      >
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </motion.div>

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
              Nos Espaces
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
              className={`block text-transparent bg-clip-text bg-gradient-to-r ${activeSpace.gradient}`}
              key={activeIndex}
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
            Des environnements pensés pour stimuler votre productivité et favoriser les rencontres
          </motion.p>
        </motion.div>

        {/* Main showcase area */}
        <div className="max-w-7xl mx-auto px-8 mb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Space showcase */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Main image container */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIndex}
                    src={activeSpace.image}
                    alt={activeSpace.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.7 }}
                  />
                </AnimatePresence>
                
                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className={`absolute inset-0 bg-gradient-to-br ${activeSpace.gradient} opacity-20`}></div>
                
                {/* Space info overlay */}
                <motion.div 
                  className="absolute bottom-8 left-8 right-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`px-4 py-2 bg-gradient-to-r ${activeSpace.gradient} rounded-full`}>
                      <span className="text-white font-montserrat font-semibold text-sm">
                        {activeSpace.price}
                      </span>
                    </div>
                    <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                      <span className="text-white font-inter text-sm">{activeSpace.capacity}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-4xl font-montserrat font-bold text-white mb-2">
                    {activeSpace.title}
                  </h3>
                  <p className="text-white/80 font-inter text-lg italic">
                    "{activeSpace.tagline}"
                  </p>
                </motion.div>
              </div>

              {/* Navigation dots */}
              <div className="flex justify-center gap-2 mt-8">
                {coworkingSpaces.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? `w-8 bg-gradient-to-r ${activeSpace.gradient}` 
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Right: Space details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Space selector */}
              <div className="space-y-4">
                {coworkingSpaces.map((space, index) => (
                  <motion.button
                    key={space.id}
                    onClick={() => setActiveIndex(index)}
                    className={`w-full text-left p-6 rounded-2xl border transition-all duration-500 ${
                      index === activeIndex
                        ? 'bg-white/10 border-white/30 backdrop-blur-md'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className={`text-xl font-montserrat font-bold mb-2 transition-colors duration-300 ${
                          index === activeIndex ? 'text-white' : 'text-white/70'
                        }`}>
                          {space.title}
                        </h4>
                        <p className={`font-inter text-sm transition-colors duration-300 ${
                          index === activeIndex ? 'text-white/80' : 'text-white/50'
                        }`}>
                          {space.description}
                        </p>
                      </div>
                      
                      <motion.div
                        animate={{ rotate: index === activeIndex ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`ml-4 transition-colors duration-300 ${
                          index === activeIndex ? 'text-white' : 'text-white/30'
                        }`}
                      >
                        <ArrowUpRight className="w-6 h-6" />
                      </motion.div>
                    </div>

                    {/* Features - only show for active */}
                    <AnimatePresence>
                      {index === activeIndex && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-white/10">
                            {space.features.map((feature, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-white/10 rounded-full text-white/70 text-xs font-inter"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </div>

              {/* CTA */}
              <motion.a
                href={`/spaces/${activeSpace.title.toLowerCase().replace(/\s+/g, '-')}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block"
              >
                <div className={`relative bg-gradient-to-r ${activeSpace.gradient} p-[2px] rounded-2xl overflow-hidden group`}>
                  <div className="relative bg-black rounded-2xl px-8 py-5 overflow-hidden">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${activeSpace.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                    />
                    
                    <div className="relative flex items-center justify-between">
                      <span className="font-montserrat font-bold text-white">
                        Découvrir cet espace
                      </span>
                      <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Features section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-8 mb-20"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isHovered = hoveredFeature === index;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className="relative group"
                >
                  <div className="text-center">
                    {/* Icon with animated background */}
                    <div className="relative inline-block mb-6">
                      <motion.div
                        animate={{ 
                          scale: isHovered ? 1.2 : 1,
                          rotate: isHovered ? 360 : 0
                        }}
                        transition={{ duration: 0.5 }}
                        className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-xl opacity-30`}
                      />
                      <div className={`relative w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-3xl flex items-center justify-center`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-montserrat font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/60 font-inter text-sm">
                      {feature.desc}
                    </p>
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
          className="text-center"
        >
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-block"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
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
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <div className={`w-32 h-32 bg-gradient-to-r ${coworkingSpaces[i].gradient} rounded-full blur-3xl`} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}