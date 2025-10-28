import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Building2, Calendar, Wifi, Coffee, Zap, Calendar as CalendarIcon } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0A0A0A]">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#1A1A1A]"></div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      {/* Ambient light effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-48 w-96 h-96 rounded-full blur-[120px] bg-orange-500/10"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-48 w-[30rem] h-[30rem] rounded-full blur-[140px] bg-amber-500/8"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -50, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left column - Text content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <Users className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-white/80 tracking-wide">
                COWORKING PREMIUM
              </span>
            </motion.div>

            {/* Main heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] tracking-tight"
              >
                Travaillez
              </motion.h1>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight"
                style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fbbf24 100%)',
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
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight"
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

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl text-white/60 leading-relaxed max-w-xl font-light"
            >
              Rejoignez une communauté dynamique d'entrepreneurs, freelances et innovateurs dans nos espaces de travail haut de gamme. Flexibilité totale, équipements premium et networking au quotidien.
            </motion.p>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center gap-3"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <Wifi className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-white/70">Internet Très Haut Débit Fibre</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <Coffee className="w-4 h-4 text-amber-400" />
                <span className="text-sm text-white/70">Café & Thé Premium Illimités</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <CalendarIcon className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-white/70">Accès 24/7 avec Badge</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-white/70">Salles de Réunion Incluses</span>
              </div>
            </motion.div>

            {/* Price and CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4"
            >
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-white/40 uppercase tracking-wider">À partir de</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl sm:text-6xl font-bold text-white">199€</span>
                  <span className="text-xl text-white/50">/mois</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fbbf24 100%)',
                    color: 'white',
                    boxShadow: '0 10px 40px rgba(249, 115, 22, 0.3)'
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

          {/* Right column - Stats card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-xl p-8 space-y-6">
              {/* Glow effect */}
              <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-purple-500/20 blur-xl -z-10" />

              {/* Stats items */}
              <div className="space-y-6">
                {/* Stat 1 */}
                <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-colors">
                  <div className="space-y-1">
                    <p className="text-sm text-white/50 font-medium">Membres actifs</p>
                    <p className="text-4xl font-bold text-white">120+</p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center">
                    <Users className="w-7 h-7 text-orange-400" />
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-colors">
                  <div className="space-y-1">
                    <p className="text-sm text-white/50 font-medium">Surface totale</p>
                    <p className="text-4xl font-bold text-white">4000m²</p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                    <Building2 className="w-7 h-7 text-cyan-400" />
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-colors">
                  <div className="space-y-1">
                    <p className="text-sm text-white/50 font-medium">Événements / mois</p>
                    <p className="text-4xl font-bold text-white">15+</p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <Calendar className="w-7 h-7 text-purple-400" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent z-[5] pointer-events-none" />

      {/* Noise texture overlay */}
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
