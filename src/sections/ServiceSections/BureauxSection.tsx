import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Wifi, Coffee, ArrowRight, Users, Building2 } from 'lucide-react';

export default function BureauxSection() {
  const features = [
    { icon: Lock, text: 'Bureaux Privés Sécurisés' },
    { icon: Wifi, text: 'Fibre Dédiée 1 Gbps' },
    { icon: Coffee, text: 'Cuisine Équipée Premium' },
    { icon: Users, text: 'De 2 à 20 Personnes' }
  ];

  return (
    <section id="bureaux" className="relative min-h-screen flex items-center bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 via-black to-teal-950/20"></div>

        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-600/15 rounded-full blur-[150px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-[150px]"
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
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-5 py-3 mb-8">
              <Building2 className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-bold uppercase tracking-wider">Bureaux Privés</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-montserrat font-black text-white mb-6 leading-tight">
              Votre Espace<br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                  100% Dédié
                </span>
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 blur-3xl -z-10"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>
            </h2>

            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed font-inter">
              Louez un bureau privé fermé et sécurisé pour votre entreprise. Espaces exclusifs de 10m² à 100m² avec mobilier premium, ligne téléphonique dédiée et services professionnels inclus.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:border-emerald-500/20 transition-colors duration-300"
                >
                  <div className="p-2 bg-emerald-500/10 rounded-xl shrink-0">
                    <feature.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-white/80 text-sm leading-tight pt-2 font-medium">{feature.text}</span>
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
              <div className="text-5xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">699€</div>
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
                href="/bureaux-prives"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ opacity: [0.5, 0.75, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-xl font-montserrat font-bold shadow-2xl text-sm">
                  <span>VOIR LES BUREAUX</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </motion.a>

              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-emerald-500/30 hover:border-emerald-500/50 text-white rounded-xl font-montserrat font-bold transition-all duration-300 text-center text-sm"
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
            <div className="relative h-[600px] rounded-3xl overflow-hidden">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative h-full">
                {[
                  'https://images.pexels.com/photos/2747446/pexels-photo-2747446.jpeg',
                  'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
                  'https://images.pexels.com/photos/2467285/pexels-photo-2467285.jpeg',
                  'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg'
                ].map((src, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 1,
                      delay: index * 4,
                      repeat: Infinity,
                      repeatDelay: 12
                    }}
                    className="absolute inset-0"
                    style={{
                      opacity: 0,
                      animation: `fadeInOut 16s infinite ${index * 4}s`
                    }}
                  >
                    <img
                      src={src}
                      alt={`Bureau privé ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="noiseBureaux">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseBureaux)" />
        </svg>
      </div>
    </section>
  );
}
