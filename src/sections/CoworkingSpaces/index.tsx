import React from 'react';
import { motion } from 'framer-motion';
import { Users, ArrowRight, Clock, Shield, Wifi, Coffee, Building2, MapPin, Star, Sparkles } from 'lucide-react';
import { coworkingSpaces } from '../../data/mockData';

// Mapping des espaces vers leurs pages dédiées
const spaceRoutes = {
  1: '/spaces/open-space',
  2: '/spaces/bureaux-prives', 
  3: '/spaces/phone-box',
  4: '/spaces/lounge-cafe',
  5: '/spaces/terrasse-rooftop'
};

export default function CoworkingSpaces() {
  return (
    <section id="espaces" className="min-h-screen bg-gradient-to-br from-black-deep via-black-nuanced to-black-deep relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-spaces" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-spaces)" />
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
            {/* Badge "Acte 2" */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center mb-8"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-coworking"></div>
                <span className="text-sm font-inter font-medium text-coworking tracking-[0.3em] uppercase">ACTE 2</span>
                <div className="w-12 h-0.5 bg-gradient-to-r from-coworking to-transparent"></div>
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
                {['NOS', 'ESPACES'].map((word, index) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, rotateX: 90 }}
                    whileInView={{ opacity: 1, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.2, duration: 0.8 }}
                    className={`inline-block mr-6 ${word === 'ESPACES' ? 'bg-gradient-coworking bg-clip-text text-transparent' : ''}`}
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
              className="text-body-large font-inter text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
              Des éclats d'espaces premium pour nourrir votre productivité et créativité
            </motion.p>
          </motion.div>

          {/* Spaces Grid avec design "Fragments" */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {coworkingSpaces.map((space, index) => (
              <motion.a
                key={space.id}
                href={spaceRoutes[space.id as keyof typeof spaceRoutes]}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.7 }}
                whileHover={{ y: -12, scale: 1.03, zIndex: 10 }}
                className={`group cursor-pointer h-full block ${
                  space.id === 5 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="glass-effect border border-white/10 rounded-4xl overflow-hidden hover:border-white/20 transition-all duration-700 h-full relative">
                  {/* Background Image avec Ken Burns */}
                  <div className="absolute inset-0">
                    <img
                      src={space.image}
                      alt={space.title}
                      className="w-full h-full object-cover ken-burns group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Overlays gradients stratégiques */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black-deep/90 via-black-nuanced/20 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black-deep/60 via-transparent to-black-nuanced/40"></div>
                  </div>

                  {/* Numérotation massive */}
                  <div className="absolute top-8 left-8 z-20">
                    <span 
                      className="font-playfair font-bold text-coworking opacity-80 group-hover:text-blue-300 transition-colors duration-500"
                      style={{ 
                        fontSize: 'clamp(4rem, 8vw, 6rem)',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        WebkitTextStroke: '1px rgba(66, 153, 225, 0.3)'
                      }}
                    >
                      {space.id.toString().padStart(2, '0')}
                    </span>
                  </div>

                  {/* Badge capacité */}
                  <div className="absolute top-8 right-8 glass-effect border border-white/20 rounded-full px-4 py-2 flex items-center">
                    <Users className="w-4 h-4 text-coworking mr-2" />
                    <span className="text-white font-inter text-xs font-medium tracking-wide">
                      {space.capacity}
                    </span>
                  </div>

                  {/* Badge accès */}
                  <div className="absolute top-20 right-8 glass-effect border border-white/20 rounded-full px-3 py-1">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 text-white/70 mr-1" />
                      <span className="text-white/70 font-inter text-xs">
                        {space.access.includes('24') ? '24/7' : 'Horaires'}
                      </span>
                    </div>
                  </div>

                  {/* Icônes flottantes selon le type d'espace */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-90 transition-all duration-500 z-20">
                    <div className="w-20 h-20 bg-gradient-coworking rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 glow-coworking">
                      {space.id === 1 && <Building2 className="w-10 h-10 text-white" />}
                      {space.id === 2 && <Shield className="w-10 h-10 text-white" />}
                      {space.id === 3 && <Users className="w-10 h-10 text-white" />}
                      {space.id === 4 && <Coffee className="w-10 h-10 text-white" />}
                      {space.id === 5 && <Sparkles className="w-10 h-10 text-white" />}
                    </div>
                  </div>

                  {/* Zone de contenu (bottom) */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                    {/* Tagline */}
                    <p className="text-coworking font-inter text-sm font-medium mb-3 italic opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {space.tagline}
                    </p>

                    <h3 className="text-2xl lg:text-3xl font-montserrat font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-coworking group-hover:bg-clip-text transition-all duration-500">
                      {space.title}
                    </h3>
                    
                    {/* Ligne décorative */}
                    <div className="w-16 h-1 bg-gradient-coworking rounded-full mb-4 group-hover:w-24 transition-all duration-500"></div>
                    
                    <p className="text-white/80 font-inter leading-relaxed line-clamp-3 group-hover:text-white transition-colors duration-500 mb-6">
                      {space.description}
                    </p>

                    {/* Informations d'accès */}
                    <div className="flex items-center justify-between mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="glass-effect border border-white/20 rounded-xl px-3 py-2">
                        <span className="text-white font-inter text-xs">{space.access}</span>
                      </div>
                    </div>

                    {/* CTA avec label dynamique */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-coworking text-white font-montserrat font-semibold py-4 rounded-2xl hover:shadow-lg hover:shadow-coworking/25 transition-all duration-500 flex items-center justify-center relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                      <div className="relative flex items-center">
                        <span className="tracking-wide">{space.ctaLabel}</span>
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </motion.button>
                  </div>

                  {/* Hover Effects */}
                  <div className="absolute inset-0 ring-0 group-hover:ring-2 group-hover:ring-coworking/50 rounded-4xl transition-all duration-700"></div>
                  <div className="absolute inset-0 shadow-none group-hover:shadow-2xl group-hover:shadow-coworking/25 rounded-4xl transition-all duration-700"></div>
                </div>
              </motion.a>
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
              { icon: Wifi, title: "Wifi Fibré", desc: "Connexion ultra-rapide 1 Gb/s", color: "from-blue-400 to-blue-600" },
              { icon: Coffee, title: "Café Illimité", desc: "Boissons chaudes et froides", color: "from-orange-400 to-orange-600" },
              { icon: Shield, title: "Accès Sécurisé", desc: "Badge personnel 24/7", color: "from-green-400 to-green-600" },
              { icon: Users, title: "Communauté", desc: "200+ entrepreneurs actifs", color: "from-purple-400 to-purple-600" }
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
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center px-10 py-5 glass-effect text-white font-montserrat font-semibold text-lg rounded-2xl border border-coworking/30 hover:bg-coworking/10 hover:border-coworking transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-coworking opacity-10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
              <div className="relative flex items-center">
                <span className="tracking-wide">Planifier une visite</span>
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}