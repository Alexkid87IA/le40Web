import React from 'react';
import { motion } from 'framer-motion';
import { Video, Clock, Users, Check, ArrowRight, Play, Mic, Camera, Sparkles, Monitor, Headphones, Radio } from 'lucide-react';
import { studioData } from '../../data/mockData';

export default function Studio() {
  return (
    <section id="studio" className="min-h-screen bg-gradient-to-br from-black-deep via-black-nuanced to-black-deep relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-studio" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-studio)" />
        </svg>
      </div>

      {/* Film grain texture */}
      <div className="absolute inset-0 film-grain"></div>

      <div className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            {/* Badge "Acte 4" */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center mb-8"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-studios"></div>
                <span className="text-sm font-inter font-medium text-studios tracking-[0.3em] uppercase">ACTE 4</span>
                <div className="w-12 h-0.5 bg-gradient-to-r from-studios to-transparent"></div>
              </div>
            </motion.div>

            {/* Titre principal avec animation mot par mot */}
            <div className="mb-8">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-hero font-montserrat font-black text-white leading-none tracking-tight"
              >
                {['STUDIO', 'DE', 'PRODUCTION'].map((word, index) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, rotateX: 90 }}
                    whileInView={{ opacity: 1, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.2, duration: 0.8 }}
                    className={`inline-block mr-6 ${word === 'PRODUCTION' ? 'bg-gradient-studios bg-clip-text text-transparent' : ''}`}
                    style={{ transformOrigin: 'center bottom' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-body-large font-inter text-white/70 max-w-4xl mx-auto leading-relaxed"
            >
              Des éclats de technologie premium pour créer vos contenus vidéo, podcasts et événements en direct
            </motion.p>
          </motion.div>

          {/* Studios Grid avec design "Fragments" */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {studioData.map((studio, index) => (
              <motion.div
                key={studio.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.7 }}
                whileHover={{ y: -12, scale: 1.03, zIndex: 10 }}
                className="group cursor-pointer h-full"
              >
                <div className="glass-effect border border-white/10 rounded-4xl overflow-hidden hover:border-white/20 transition-all duration-700 h-full relative">
                  {/* Background Image avec Ken Burns */}
                  <div className="absolute inset-0">
                    <img
                      src={studio.image}
                      alt={studio.title}
                      className="w-full h-full object-cover ken-burns group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Overlays gradients stratégiques */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black-deep/90 via-black-nuanced/20 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black-deep/60 via-transparent to-black-nuanced/40"></div>
                  </div>

                  {/* Numérotation massive */}
                  <div className="absolute top-8 left-8 z-20">
                    <span 
                      className="font-playfair font-bold text-studios opacity-80 group-hover:text-purple-300 transition-colors duration-500"
                      style={{ 
                        fontSize: 'clamp(4rem, 8vw, 6rem)',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        WebkitTextStroke: '1px rgba(159, 122, 234, 0.3)'
                      }}
                    >
                      {studio.id.toString().padStart(2, '0')}
                    </span>
                  </div>

                  {/* Badge prix */}
                  <div className="absolute top-8 right-8 glass-effect border border-white/20 rounded-full px-4 py-2">
                    <span className="text-studios font-montserrat font-bold text-sm tracking-wide">
                      {studio.price}
                    </span>
                  </div>

                  {/* Badge capacité */}
                  <div className="absolute top-20 right-8 glass-effect border border-white/20 rounded-full px-3 py-1 flex items-center">
                    <Users className="w-3 h-3 text-white mr-1" />
                    <span className="text-white font-inter text-xs">
                      {studio.capacity}
                    </span>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-90 transition-all duration-500 z-20">
                    <div className="w-20 h-20 bg-gradient-studios rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 glow-studios">
                      {studio.id === 1 && <Mic className="w-10 h-10 text-white" />}
                      {studio.id === 2 && <Video className="w-10 h-10 text-white" />}
                      {studio.id === 3 && <Radio className="w-10 h-10 text-white" />}
                    </div>
                  </div>

                  {/* Zone de contenu (bottom) */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                    <h3 className="text-2xl lg:text-3xl font-montserrat font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-studios group-hover:bg-clip-text transition-all duration-500">
                      {studio.title}
                    </h3>
                    
                    {/* Ligne décorative */}
                    <div className="w-16 h-1 bg-gradient-studios rounded-full mb-4 group-hover:w-24 transition-all duration-500"></div>
                    
                    <p className="text-white/80 font-inter leading-relaxed line-clamp-3 group-hover:text-white transition-colors duration-500 mb-6">
                      {studio.description}
                    </p>

                    {/* Features preview */}
                    <div className="flex items-center justify-between mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="flex space-x-2">
                        {studio.features.slice(0, 2).map((_, featureIndex) => (
                          <div key={featureIndex} className="w-2 h-2 bg-studios rounded-full"></div>
                        ))}
                        <span className="text-white/70 font-inter text-xs">+{studio.features.length - 2} équipements</span>
                      </div>
                    </div>

                    {/* CTA avec label dynamique */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-studios text-white font-montserrat font-semibold py-4 rounded-2xl hover:shadow-lg transition-all duration-500 flex items-center justify-center relative overflow-hidden glow-studios"
                    >
                      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                      <div className="relative flex items-center">
                        <Clock className="w-5 h-5 mr-2" />
                        <span className="tracking-wide">Réserver</span>
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </motion.button>
                  </div>

                  {/* Hover Effects */}
                  <div className="absolute inset-0 ring-0 group-hover:ring-2 group-hover:ring-studios/50 rounded-4xl transition-all duration-700"></div>
                  <div className="absolute inset-0 shadow-none group-hover:shadow-2xl group-hover:shadow-studios/25 rounded-4xl transition-all duration-700"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          >
            {[
              { icon: Video, title: 'Équipement Pro', desc: 'Caméras 4K, éclairage LED professionnel', color: 'from-red-400 to-red-600' },
              { icon: Mic, title: 'Studio Podcast', desc: 'Isolation acoustique et micros Shure SM7B', color: 'from-purple-400 to-purple-600' },
              { icon: Camera, title: 'Streaming Live', desc: 'Diffusion multi-plateformes en direct', color: 'from-blue-400 to-blue-600' },
              { icon: Monitor, title: 'Post-Production', desc: 'Montage et étalonnage professionnel', color: 'from-green-400 to-green-600' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center group"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-montserrat font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70 font-inter text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-center"
          >
            <div className="glass-effect border border-white/10 rounded-4xl p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-studios opacity-5"></div>
              <div className="relative">
                <Sparkles className="w-12 h-12 text-studios mx-auto mb-6" />
                <h3 className="text-3xl font-montserrat font-bold text-white mb-6">
                  Besoin d'un accompagnement technique ?
                </h3>
                <p className="text-white/70 font-inter mb-8 max-w-3xl mx-auto leading-relaxed text-lg">
                  Notre équipe technique vous accompagne dans la réalisation de vos projets vidéo, 
                  du tournage à la post-production avec un service premium personnalisé.
                </p>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center px-10 py-5 glass-effect text-white font-montserrat font-semibold text-lg rounded-2xl border border-studios/30 hover:bg-studios/10 hover:border-studios transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-studios opacity-10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                  <div className="relative flex items-center">
                    <span className="tracking-wide">Discuter de votre projet</span>
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}