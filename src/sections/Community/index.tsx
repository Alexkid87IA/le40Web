import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, ArrowRight, Lightbulb } from 'lucide-react';

const events = [
  { name: 'Afterwork Networking', frequency: 'Hebdo' },
  { name: 'Ateliers Thématiques', frequency: 'Mensuel' },
  { name: 'Pitch Sessions', frequency: 'Mensuel' },
  { name: 'Petit Déj Business', frequency: 'Bi-mensuel' }
];

const features = [
  { icon: Calendar, text: 'Networking Events Mensuels' },
  { icon: Lightbulb, text: 'Mentors & Experts Disponibles' },
  { icon: Users, text: 'Ateliers & Masterclass Members' },
  { icon: Lightbulb, text: 'Opportunités de Collaboration' }
];

const stats = [
  { value: '120+', label: 'Membres actifs' },
  { value: '15+', label: 'Events/mois' },
  { value: '30+', label: 'Secteurs' }
];

export default function Community() {
  return (
    <section id="community" className="relative min-h-screen flex items-center bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-black to-violet-950/20"></div>

        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-[150px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[150px]"
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
            className="lg:order-2"
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-5 py-3 mb-8">
              <Users className="w-5 h-5 text-purple-400" />
              <span className="text-purple-300 text-sm font-bold uppercase tracking-wider">Communauté</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-montserrat font-black text-white mb-6 leading-tight">
              Rejoignez le<br />
              Réseau<br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400">
                  Des Entrepreneurs
                </span>
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-violet-500/20 to-fuchsia-500/20 blur-3xl -z-10"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>
            </h2>

            <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed font-inter">
              Plus qu'un espace de travail, Le 40 est une communauté vibrante où se rencontrent les esprits les plus brillants de Marseille. Échangez, collaborez et grandissez ensemble.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:border-purple-500/20 transition-colors duration-300"
                >
                  <div className="p-2 bg-purple-500/10 rounded-xl shrink-0">
                    <feature.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-white/80 text-sm leading-tight pt-2 font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="/club"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex-1"
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-violet-500 to-orange-500 rounded-2xl opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ opacity: [0.5, 0.75, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-purple-500 via-violet-500 to-orange-500 text-white rounded-2xl font-montserrat font-black shadow-2xl text-lg">
                  <span>REJOINDRE LA COMMUNAUTÉ</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </motion.a>

              <motion.a
                href="/club"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10 hover:border-white/20 text-white rounded-2xl font-montserrat font-black transition-all duration-300 text-center text-lg"
              >
                Voir les événements
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="lg:order-1 space-y-6"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-violet-600 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-purple-950/40 to-violet-950/30 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-10">
                <div className="text-center mb-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-400/30 flex items-center justify-center">
                    <Users className="w-14 h-14 text-purple-400" />
                  </div>
                  <div className="text-3xl font-montserrat font-black text-white mb-3">Événements & Networking</div>
                  <div className="text-purple-400/70 font-medium text-lg">15+ événements par mois</div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent my-8"></div>

                <div className="space-y-4">
                  {events.map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="flex items-center justify-between p-4 rounded-xl bg-black/30 border border-white/5 hover:border-purple-500/20 transition-colors duration-300"
                    >
                      <span className="text-white/80 font-medium">{event.name}</span>
                      <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 font-bold text-sm">
                        {event.frequency}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-purple-950/40 to-fuchsia-950/30 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8">
                <div className="grid grid-cols-3 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <div className="text-3xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400 mb-2">
                        {stat.value}
                      </div>
                      <div className="text-white/60 text-xs font-medium leading-tight">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-violet-950/40 to-purple-950/30 backdrop-blur-xl border border-violet-500/20 rounded-3xl p-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-violet-500/20 rounded-2xl">
                    <Calendar className="w-8 h-8 text-violet-400" />
                  </div>
                  <div>
                    <div className="text-white/70 text-sm font-medium mb-1">Prochain événement</div>
                    <div className="text-white font-bold text-lg">Afterwork Networking</div>
                    <div className="text-violet-400 text-sm font-medium">Jeudi 7 Nov à 18h</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="noiseCommunity">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseCommunity)" />
        </svg>
      </div>
    </section>
  );
}
