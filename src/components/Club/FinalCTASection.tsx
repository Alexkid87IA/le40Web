import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Check } from 'lucide-react';

const quickFeatures = [
  "Accès immédiat à tous les événements",
  "Réseau de 120+ entrepreneurs actifs",
  "Sans engagement, annulation facile",
  "Première visite découverte offerte"
];

export default function FinalCTASection() {
  return (
    <section className="py-40 relative overflow-hidden bg-gradient-to-b from-slate-950 to-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 via-black to-amber-900/20" />
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 text-sm font-semibold text-orange-400 mb-8"
          >
            PRÊT À NOUS REJOINDRE ?
          </motion.span>

          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8">
            <span className="text-white">Faites le Pas</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400">
              Aujourd'hui
            </span>
          </h2>

          <p className="text-2xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
            Rejoignez une communauté d'entrepreneurs qui s'entraident, collaborent et réussissent ensemble
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12"
          >
            {quickFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-3 text-white/80"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-left">{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-2xl text-white font-bold text-lg shadow-xl">
                <Calendar className="w-6 h-6" />
                <span>Rejoindre Le Club</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl text-white font-bold text-lg hover:bg-white/10 hover:border-white/30 transition-all shadow-xl"
            >
              Planifier une Visite
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="inline-flex flex-col gap-4 p-8 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl"
          >
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                  50€
                </div>
                <div className="text-sm text-white/60">par mois</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                  15+
                </div>
                <div className="text-sm text-white/60">événements</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  120+
                </div>
                <div className="text-sm text-white/60">membres</div>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="mt-12 text-white/40 text-sm"
          >
            🔒 Paiement sécurisé • ⚡ Activation immédiate • 💝 Sans engagement • 🎁 Visite offerte
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
