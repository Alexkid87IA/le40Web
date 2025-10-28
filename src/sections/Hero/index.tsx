import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Users, Building2, Video } from 'lucide-react';
import { designTokens } from '../../styles/designTokens';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#0A0A0A]">
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-10"></div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/50 to-[#0A0A0A]"></div>

      <div className={`relative z-10 w-full max-w-7xl mx-auto ${designTokens.spacing.container} ${designTokens.spacing.section}`}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block mb-4">
                <span className="px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium">
                  MARSEILLE, 4000m² d'espaces professionnels
                </span>
              </div>

              <h1 className={`${designTokens.typography.h1.size} ${designTokens.typography.h1.weight} ${designTokens.typography.h1.leading} ${designTokens.typography.h1.tracking} text-white mb-6`}>
                Le 40
                <span className="block bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                  Votre Espace Pro
                </span>
              </h1>

              <p className={`${designTokens.typography.body.size} ${designTokens.typography.body.leading} text-slate-300`}>
                Coworking, bureaux privés, domiciliation, salles de réunion et studios créatifs. Tout pour développer votre activité.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#coworking"
                className={`inline-flex items-center gap-2 ${designTokens.buttons.size.md} bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold ${designTokens.buttons.radius.base} ${designTokens.animations.transition.fast} shadow-lg shadow-orange-500/25`}
              >
                Découvrir nos offres
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="/contact"
                className={`inline-flex items-center gap-2 ${designTokens.buttons.size.md} bg-white/5 hover:bg-white/10 text-white font-semibold ${designTokens.buttons.radius.base} border border-white/10 backdrop-blur-sm ${designTokens.animations.transition.fast}`}
              >
                Visite gratuite
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10"
            >
              <div>
                <div className="text-3xl font-bold text-white mb-1">120+</div>
                <div className="text-sm text-slate-400">Membres actifs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">4000m²</div>
                <div className="text-sm text-slate-400">Surface totale</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-sm text-slate-400">Accès disponible</div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <button
                  onClick={() => {
                    const element = document.getElementById('services');
                    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`block w-full text-left ${designTokens.cards.background} ${designTokens.cards.radius.large} ${designTokens.cards.border} p-6 ${designTokens.animations.transition.fast} ${designTokens.animations.hover.y.small} cursor-pointer hover:border-cyan-500/30`}
                >
                  <div className={`w-12 h-12 ${designTokens.buttons.radius.base} bg-cyan-500/10 flex items-center justify-center mb-4`}>
                    <Users className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Coworking</h3>
                  <p className="text-sm text-slate-400">Espaces partagés flexibles</p>
                </button>

                <button
                  onClick={() => {
                    const element = document.getElementById('services');
                    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`block w-full text-left ${designTokens.cards.background} ${designTokens.cards.radius.large} ${designTokens.cards.border} p-6 ${designTokens.animations.transition.fast} ${designTokens.animations.hover.y.small} cursor-pointer hover:border-cyan-500/30`}
                >
                  <div className={`w-12 h-12 ${designTokens.buttons.radius.base} bg-cyan-500/10 flex items-center justify-center mb-4`}>
                    <Building2 className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Bureaux Privés</h3>
                  <p className="text-sm text-slate-400">Espaces dédiés équipés</p>
                </button>
              </div>

              <div className="space-y-4 pt-8">
                <button
                  onClick={() => {
                    const element = document.getElementById('services');
                    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`block w-full text-left ${designTokens.cards.background} ${designTokens.cards.radius.large} ${designTokens.cards.border} p-6 ${designTokens.animations.transition.fast} ${designTokens.animations.hover.y.small} cursor-pointer hover:border-amber-500/30`}
                >
                  <div className={`w-12 h-12 ${designTokens.buttons.radius.base} bg-amber-500/10 flex items-center justify-center mb-4`}>
                    <MapPin className="w-6 h-6 text-amber-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Domiciliation</h3>
                  <p className="text-sm text-slate-400">Adresse prestigieuse</p>
                </button>

                <button
                  onClick={() => {
                    const element = document.getElementById('services');
                    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`block w-full text-left ${designTokens.cards.background} ${designTokens.cards.radius.large} ${designTokens.cards.border} p-6 ${designTokens.animations.transition.fast} ${designTokens.animations.hover.y.small} cursor-pointer hover:border-emerald-500/30`}
                >
                  <div className={`w-12 h-12 ${designTokens.buttons.radius.base} bg-emerald-500/10 flex items-center justify-center mb-4`}>
                    <Video className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Studios Pro</h3>
                  <p className="text-sm text-slate-400">Audio & vidéo équipés</p>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent"></div>
    </section>
  );
}
