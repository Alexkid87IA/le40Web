import React from 'react';
import { motion } from 'framer-motion';
import { Users, Wifi, Coffee, Clock, ArrowRight } from 'lucide-react';

export default function CoworkingSection() {
  const benefits = [
    { icon: Users, text: 'Communauté de 120+ entrepreneurs actifs' },
    { icon: Wifi, text: 'Fibre optique dédiée 1 Gb/s' },
    { icon: Coffee, text: 'Café, thé et snacks illimités' },
    { icon: Clock, text: 'Accès 24/7 avec contrôle sécurisé' }
  ];

  return (
    <section id="coworking" className="relative min-h-screen flex items-center bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-black to-blue-950/20"></div>

        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-[150px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal-600/10 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-5 py-3 mb-8">
              <Users className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-300 text-sm font-bold uppercase tracking-wider">Coworking</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-montserrat font-black text-white mb-6 leading-tight">
              Travaillez<br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400">
                  Entouré d'Entrepreneurs
                </span>
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-teal-500/20 blur-3xl -z-10"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>
            </h2>

            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed font-inter">
              Rejoignez une communauté dynamique d'entrepreneurs, freelances et innovateurs dans nos espaces de travail haut de gamme. Flexibilité totale, équipements premium et networking au quotidien.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:border-cyan-500/20 transition-colors duration-300"
                >
                  <div className="p-2 bg-cyan-500/10 rounded-xl shrink-0">
                    <benefit.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-white/80 text-sm leading-tight pt-2 font-medium">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="text-white/50 text-sm font-inter">À partir de</div>
              <div className="text-5xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400">199€</div>
              <div className="text-white/50 text-sm font-inter">/mois</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="/coworking"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 rounded-2xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ opacity: [0.5, 0.75, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 text-white rounded-xl font-montserrat font-bold shadow-2xl text-sm">
                  <span>RÉSERVER MAINTENANT</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </motion.a>

              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-cyan-500/30 hover:border-cyan-500/50 text-white rounded-xl font-montserrat font-bold transition-all duration-300 text-center text-sm"
              >
                Demander une visite
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-cyan-950/40 to-blue-950/30 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-10">
                <div className="text-center mb-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center">
                    <Users className="w-14 h-14 text-cyan-400" />
                  </div>
                  <div className="text-3xl font-montserrat font-black text-white mb-3">Espace Premium</div>
                  <div className="text-cyan-400/70 font-medium text-lg">300m² au cœur de Marseille</div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent my-8"></div>

                <div className="space-y-5">
                  {[
                    { label: 'Postes disponibles', value: '30+', highlight: true },
                    { label: 'Fibre dédiée', value: '1 Gb/s', highlight: true },
                    { label: 'Accès', value: '24/7', highlight: true },
                    { label: 'Membres', value: '120+', highlight: true }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5 hover:border-cyan-500/20 transition-colors duration-300"
                    >
                      <span className="text-white/60 font-medium">{item.label}</span>
                      <span className={`font-bold ${item.highlight ? 'text-cyan-400' : 'text-white'}`}>
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="noiseCoworking">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="2" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseCoworking)" />
        </svg>
      </div>
    </section>
  );
}
