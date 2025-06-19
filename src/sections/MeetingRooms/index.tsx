import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Check, ArrowRight, Sparkles, Presentation as PresentationChart, Wifi, Monitor, Coffee, Shield } from 'lucide-react';
import { meetingRooms } from '../../data/mockData';

export default function MeetingRooms() {
  return (
    <section id="salles" className="min-h-screen bg-gradient-to-br from-black-deep via-black-nuanced to-black-deep relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-salles" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-salles)" />
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
            {/* Badge "Acte 3" */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center mb-8"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-salles"></div>
                <span className="text-sm font-inter font-medium text-salles tracking-[0.3em] uppercase">ACTE 3</span>
                <div className="w-12 h-0.5 bg-gradient-to-r from-salles to-transparent"></div>
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
                {['SALLES', 'DE', 'RÉUNION'].map((word, index) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, rotateX: 90 }}
                    whileInView={{ opacity: 1, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.2, duration: 0.8 }}
                    className={`inline-block mr-6 ${word === 'RÉUNION' ? 'bg-gradient-to-r from-salles to-gray-600 bg-clip-text text-transparent' : ''}`}
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
              Des éclats d'espaces équipés pour vos rendez-vous stratégiques et présentations professionnelles
            </motion.p>
          </motion.div>

          {/* Rooms Grid avec design "Fragments" */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {meetingRooms.map((room, index) => (
              <motion.div
                key={room.id}
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
                      src={`https://images.pexels.com/photos/${3184300 + index * 20}/pexels-photo-${3184300 + index * 20}.jpeg?auto=compress&cs=tinysrgb&w=800`}
                      alt={room.title}
                      className="w-full h-full object-cover ken-burns group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Overlays gradients stratégiques */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black-deep/90 via-black-nuanced/20 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black-deep/60 via-transparent to-black-nuanced/40"></div>
                  </div>

                  {/* Numérotation massive */}
                  <div className="absolute top-8 left-8 z-20">
                    <span 
                      className="font-playfair font-bold text-salles opacity-80 group-hover:text-gray-300 transition-colors duration-500"
                      style={{ 
                        fontSize: 'clamp(4rem, 8vw, 6rem)',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                        WebkitTextStroke: '1px rgba(74, 85, 104, 0.3)'
                      }}
                    >
                      {room.id.toString().padStart(2, '0')}
                    </span>
                  </div>

                  {/* Badge prix */}
                  <div className="absolute top-8 right-8 glass-effect border border-white/20 rounded-full px-4 py-2">
                    <span className="text-salles font-montserrat font-bold text-sm tracking-wide">
                      {room.price}
                    </span>
                  </div>

                  {/* Badge capacité */}
                  <div className="absolute top-20 right-8 glass-effect border border-white/20 rounded-full px-3 py-1 flex items-center">
                    <Users className="w-3 h-3 text-white mr-1" />
                    <span className="text-white font-inter text-xs">
                      {room.capacity}
                    </span>
                  </div>

                  {/* Icône flottante selon le type de salle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-90 transition-all duration-500 z-20">
                    <div className="w-20 h-20 bg-gradient-to-r from-salles to-gray-600 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                      {room.id === 1 && <Users className="w-10 h-10 text-white" />}
                      {room.id === 2 && <Sparkles className="w-10 h-10 text-white" />}
                      {room.id === 3 && <PresentationChart className="w-10 h-10 text-white" />}
                    </div>
                  </div>

                  {/* Zone de contenu (bottom) */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                    <h3 className="text-2xl lg:text-3xl font-montserrat font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-salles group-hover:to-gray-600 group-hover:bg-clip-text transition-all duration-500">
                      {room.title}
                    </h3>
                    
                    {/* Ligne décorative */}
                    <div className="w-16 h-1 bg-gradient-to-r from-salles to-gray-600 rounded-full mb-4 group-hover:w-24 transition-all duration-500"></div>
                    
                    <p className="text-white/80 font-inter leading-relaxed line-clamp-3 group-hover:text-white transition-colors duration-500 mb-6">
                      {room.description}
                    </p>

                    {/* Features preview */}
                    <div className="flex items-center justify-between mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="flex space-x-2">
                        {room.features.slice(0, 2).map((_, featureIndex) => (
                          <div key={featureIndex} className="w-2 h-2 bg-salles rounded-full"></div>
                        ))}
                        <span className="text-white/70 font-inter text-xs">+{room.features.length - 2} équipements</span>
                      </div>
                    </div>

                    {/* CTA avec label dynamique */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-salles to-gray-600 text-white font-montserrat font-semibold py-4 rounded-2xl hover:shadow-lg transition-all duration-500 flex items-center justify-center relative overflow-hidden"
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
                  <div className="absolute inset-0 ring-0 group-hover:ring-2 group-hover:ring-salles/50 rounded-4xl transition-all duration-700"></div>
                  <div className="absolute inset-0 shadow-none group-hover:shadow-2xl group-hover:shadow-salles/25 rounded-4xl transition-all duration-700"></div>
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
              { icon: Monitor, title: "Écrans HD", desc: "Écrans haute définition jusqu'à 65 pouces", color: "from-blue-400 to-blue-600" },
              { icon: Wifi, title: "Connexion Pro", desc: "Wi-Fi fibré et câblage réseau", color: "from-green-400 to-green-600" },
              { icon: Coffee, title: "Service Inclus", desc: "Café, thé et collations disponibles", color: "from-orange-400 to-orange-600" },
              { icon: Shield, title: "Confidentialité", desc: "Isolation phonique garantie", color: "from-purple-400 to-purple-600" }
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
              <div className="absolute inset-0 bg-gradient-to-r from-salles/10 to-gray-600/10 opacity-50"></div>
              <div className="relative">
                <Sparkles className="w-12 h-12 text-salles mx-auto mb-6" />
                <h3 className="text-3xl font-montserrat font-bold text-white mb-6">
                  Besoin d'un espace personnalisé ?
                </h3>
                <p className="text-white/70 font-inter mb-8 max-w-3xl mx-auto leading-relaxed text-lg">
                  Nous proposons également des configurations sur-mesure pour vos événements spéciaux, 
                  formations ou séminaires d'entreprise avec un accompagnement technique dédié.
                </p>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center px-10 py-5 glass-effect text-white font-montserrat font-semibold text-lg rounded-2xl border border-salles/30 hover:bg-salles/10 hover:border-salles transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-salles/10 to-gray-600/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                  <div className="relative flex items-center">
                    <span className="tracking-wide">Nous contacter</span>
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