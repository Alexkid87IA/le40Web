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
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="https://res.cloudinary.com/dwt7u0azs/video/upload/v1761803178/f6ec245d-506e-49b7-a107-01e3b561a567_1_mrh0xu.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/60 via-black/80 to-blue-950/60"></div>
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
            className="lg:order-1"
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
            className="lg:order-2"
          >
            <div className="relative h-[600px] rounded-3xl overflow-hidden">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative h-full">
                {[
                  'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
                  'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg',
                  'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg',
                  'https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg'
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
                      alt={`Coworking ${index + 1}`}
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
