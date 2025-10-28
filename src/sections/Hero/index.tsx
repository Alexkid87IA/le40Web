import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Building2, Calendar, Wifi, Coffee, Zap, Calendar as CalendarIcon } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#1A1A1A]"></div>

        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-48 w-96 h-96 rounded-full blur-[120px] bg-purple-500/10"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-48 w-[30rem] h-[30rem] rounded-full blur-[140px] bg-purple-600/8"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -50, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 py-20">
        <div className="relative">

          {/* Stats card - positioned top right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute top-0 right-0 w-80 hidden lg:block"
          >
            <div className="relative rounded-2xl bg-gradient-to-br from-purple-900/20 to-purple-950/10 border border-purple-500/20 backdrop-blur-xl p-6">
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent blur-lg -z-10" />

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <div>
                    <p className="text-xs text-white/40 font-medium mb-1">Membres actifs</p>
                    <p className="text-3xl font-bold text-white">120+</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-400" />
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <div>
                    <p className="text-xs text-white/40 font-medium mb-1">Surface totale</p>
                    <p className="text-3xl font-bold text-white">4000m²</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-purple-400" />
                  </div>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-xs text-white/40 font-medium mb-1">Événements / mois</p>
                    <p className="text-3xl font-bold text-white">15+</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main content - left side with proper right margin for card */}
          <div className="lg:pr-96 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-900/20 border border-purple-500/20 backdrop-blur-sm"
            >
              <Users className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-white/80 tracking-wide">
                COWORKING PREMIUM
              </span>
            </motion.div>

            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white leading-[1] tracking-tight"
              >
                Travaillez
              </motion.h1>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-[1] tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #a855f7 0%, #c084fc 50%, #e879f9 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Entouré
              </motion.h1>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-[1] tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #a855f7 0%, #c084fc 50%, #e879f9 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                d'Entrepreneurs
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl font-light"
            >
              Rejoignez une communauté dynamique d'entrepreneurs, freelances et innovateurs dans nos espaces de travail haut de gamme. Flexibilité totale, équipements premium et networking au quotidien.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 gap-3 max-w-2xl"
            >
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                <Wifi className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-white/70">Internet Très Haut Débit Fibre</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                <Coffee className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-white/70">Café & Thé Premium Illimités</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                <CalendarIcon className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-white/70">Accès 24/7 avec Badge</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                <Zap className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-white/70">Salles de Réunion Incluses</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-4"
            >
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xs text-white/40 uppercase tracking-wider">À partir de</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-bold text-white">199€</span>
                  <span className="text-xl text-white/50">/mois</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #a855f7 0%, #c084fc 50%, #e879f9 100%)',
                    color: 'white',
                    boxShadow: '0 10px 40px rgba(168, 85, 247, 0.3)'
                  }}
                >
                  <span>RÉSERVER MAINTENANT</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.a>

                <motion.a
                  href="/tarifs"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base bg-white/5 border border-white/10 text-white backdrop-blur-sm hover:bg-white/10 transition-all"
                >
                  Voir tous les tarifs
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent z-[5] pointer-events-none" />

      <div className="absolute inset-0 z-[3] opacity-[0.015] mix-blend-overlay pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="2" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
    </section>
  );
}
