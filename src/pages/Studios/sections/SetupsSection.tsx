import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Users, ChevronRight, Play, Sparkles } from 'lucide-react';
import { studioSetups } from '../data/studioSetups';

export default function SetupsSection({ onSetupSelect }) {
  const [hoveredSetup, setHoveredSetup] = useState(null);

  return (
    <section id="setups" className="relative py-20 bg-black">
      {/* Background moderne avec gradient subtil */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header moderne et épuré */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500"></div>
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span className="text-purple-500 text-sm font-medium tracking-wider uppercase">Nos Studios</span>
            <Sparkles className="w-5 h-5 text-purple-500" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500"></div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-montserrat font-extralight text-white mb-4">
            Choisissez votre <span className="font-normal bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">espace créatif</span>
          </h2>
          
          <p className="text-lg text-white/50 max-w-2xl mx-auto font-light">
            7 studios professionnels équipés pour donner vie à vos projets
          </p>
        </motion.div>

        {/* Grille moderne avec layout varié */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {studioSetups.map((setup, index) => (
            <motion.div
              key={setup.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              onMouseEnter={() => setHoveredSetup(setup.id)}
              onMouseLeave={() => setHoveredSetup(null)}
              className={`group relative ${
                setup.id === 'full-show' ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative h-full min-h-[450px] rounded-3xl overflow-hidden bg-gradient-to-b from-zinc-900/50 to-zinc-900/80 backdrop-blur-sm border border-white/5 group-hover:border-purple-500/30 transition-all duration-500"
              >
                {/* Image avec overlay moderne */}
                <div className="absolute inset-0">
                  <motion.img
                    src={setup.image}
                    alt={setup.name}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredSetup === setup.id ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
                  
                  {/* Overlay coloré au hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredSetup === setup.id ? 0.2 : 0 }}
                    className={`absolute inset-0 bg-gradient-to-br ${setup.gradient}`}
                  />
                </div>

                {/* Badge populaire moderne */}
                {setup.popular && (
                  <motion.div
                    initial={{ scale: 0, rotate: -12 }}
                    animate={{ scale: 1, rotate: -12 }}
                    transition={{ delay: 0.3 + index * 0.08, type: "spring" }}
                    className="absolute top-6 right-6 z-10"
                  >
                    <div className="bg-black/80 backdrop-blur-md border border-purple-500/50 text-purple-400 text-xs font-medium px-4 py-2 rounded-full flex items-center gap-2">
                      <Star className="w-3.5 h-3.5 fill-purple-400" />
                      POPULAIRE
                    </div>
                  </motion.div>
                )}

                {/* Contenu */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  {/* Icon flottante moderne */}
                  <motion.div
                    animate={{
                      y: hoveredSetup === setup.id ? -5 : 0,
                      rotate: hoveredSetup === setup.id ? 12 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="mb-6"
                  >
                    <div className={`w-14 h-14 bg-black/60 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10`}>
                      <setup.icon className={`w-7 h-7 ${
                        setup.color === 'purple' ? 'text-purple-400' :
                        setup.color === 'emerald' ? 'text-emerald-400' :
                        setup.color === 'blue' ? 'text-blue-400' :
                        setup.color === 'pink' ? 'text-pink-400' :
                        setup.color === 'violet' ? 'text-violet-400' :
                        setup.color === 'red' ? 'text-red-400' :
                        'text-yellow-400'
                      }`} />
                    </div>
                  </motion.div>

                  {/* Titre et description */}
                  <motion.div
                    animate={{ x: hoveredSetup === setup.id ? 5 : 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-3xl font-montserrat font-bold text-white mb-2">
                      {setup.name}
                    </h3>
                    <p className={`text-sm font-medium mb-3 ${
                      setup.color === 'purple' ? 'text-purple-400' :
                      setup.color === 'emerald' ? 'text-emerald-400' :
                      setup.color === 'blue' ? 'text-blue-400' :
                      setup.color === 'pink' ? 'text-pink-400' :
                      setup.color === 'violet' ? 'text-violet-400' :
                      setup.color === 'red' ? 'text-red-400' :
                      'text-yellow-400'
                    }`}>
                      {setup.subtitle}
                    </p>
                    <p className="text-white/60 text-sm mb-6 line-clamp-2">
                      {setup.description}
                    </p>
                  </motion.div>

                  {/* Footer avec prix et CTA */}
                  <div className="flex items-end justify-between">
                    <div>
                      {/* Tags info */}
                      <div className="flex gap-3 mb-4">
                        <div className="flex items-center gap-1.5 text-xs text-white/50 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full">
                          <Users className="w-3.5 h-3.5" />
                          {setup.capacity}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-white/50 bg-white/5 backdrop-blur-sm px-3 py-1.5 rounded-full">
                          <Clock className="w-3.5 h-3.5" />
                          {setup.recommendedDuration}
                        </div>
                      </div>
                      
                      {/* Prix */}
                      <div>
                        <p className="text-white/40 text-xs mb-1">À partir de</p>
                        <p className="text-4xl font-montserrat font-light text-white">
                          {setup.basePrice}€
                          <span className="text-sm font-normal text-white/40 ml-1">/h</span>
                        </p>
                      </div>
                    </div>

                    {/* Bouton CTA moderne */}
                    <motion.button
                      onClick={() => onSetupSelect(setup)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group/btn relative"
                    >
                      <div className="absolute inset-0 bg-white rounded-2xl blur-xl opacity-20 group-hover/btn:opacity-30 transition-opacity"></div>
                      <div className="relative bg-white text-black px-6 py-3 rounded-2xl font-medium flex items-center gap-2 hover:gap-3 transition-all">
                        Configurer
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </motion.button>
                  </div>
                </div>

                {/* Effet de brillance au hover */}
                <motion.div
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ 
                    x: hoveredSetup === setup.id ? '100%' : '-100%',
                    opacity: hoveredSetup === setup.id ? 1 : 0
                  }}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Bottom moderne */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col items-center gap-4">
            <p className="text-white/50 text-lg">Besoin de conseils pour choisir ?</p>
            <button className="group flex items-center gap-3 text-white hover:text-purple-400 transition-colors">
              <div className="w-12 h-12 rounded-full border border-white/20 group-hover:border-purple-400/50 flex items-center justify-center transition-colors">
                <Play className="w-5 h-5 ml-0.5" />
              </div>
              <span className="font-medium">Voir notre guide vidéo</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}