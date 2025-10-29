import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Award, Sparkles, ArrowRight, PartyPopper, Lightbulb, Coffee } from 'lucide-react';
import Button from '../../components/UI/Button';

export default function CommunitySection() {
  const benefits = [
    { icon: Calendar, text: 'Networking Events Mensuels' },
    { icon: Lightbulb, text: 'Ateliers & Masterclass Membres' },
    { icon: Award, text: 'Mentors & Experts Disponibles' },
    { icon: Sparkles, text: 'Opportunités de Collaboration' }
  ];

  return (
    <section id="community" className="relative min-h-screen flex items-center bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-[#0A0A0A] to-violet-950/20"></div>

        <motion.div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[140px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="absolute inset-0"
        >
          <img
            src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Communauté Le 40"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]/80"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/90 via-transparent to-[#0A0A0A]"></div>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
              <Users className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium uppercase tracking-wider">Communauté Active</span>
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-montserrat font-black text-white mb-6 leading-tight">
              Rejoignez le Réseau<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400">
                Des Entrepreneurs
              </span>
            </h2>

            <p className="text-xl text-white/70 mb-8 leading-relaxed font-light">
              Plus qu'un espace de travail, Le 40 est une communauté vibrante où se rencontrent les esprits les plus brillants de Marseille. Échangez, collaborez et grandissez ensemble.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-white/80 text-sm font-medium">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                href="/community"
                size="md"
                icon={ArrowRight}
                iconPosition="right"
                className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white"
              >
                REJOINDRE LA COMMUNAUTÉ
              </Button>
              <Button
                href="/events"
                variant="secondary"
                size="md"
                className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
              >
                Voir les événements
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-violet-600 rounded-3xl blur-3xl opacity-30"></div>
              <div className="relative space-y-6">
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-400/30 flex items-center justify-center">
                      <PartyPopper className="w-12 h-12 text-purple-400" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-2">Événements & Networking</div>
                    <div className="text-white/50">15+ événements par mois</div>
                  </div>
                  <div className="h-px bg-white/10 my-6"></div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Afterwork Networking</span>
                      <span className="text-white font-semibold">Hebdo</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Ateliers Thématiques</span>
                      <span className="text-white font-semibold">Mensuel</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Pitch Sessions</span>
                      <span className="text-white font-semibold">Mensuel</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Petit Déj Business</span>
                      <span className="text-white font-semibold">Bi-mensuel</span>
                    </div>
                  </div>
                </div>

                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-4xl font-montserrat font-black text-white mb-1">120+</div>
                      <div className="text-white/50 text-xs">Membres actifs</div>
                    </div>
                    <div>
                      <div className="text-4xl font-montserrat font-black text-white mb-1">15+</div>
                      <div className="text-white/50 text-xs">Events/mois</div>
                    </div>
                    <div>
                      <div className="text-4xl font-montserrat font-black text-white mb-1">30+</div>
                      <div className="text-white/50 text-xs">Secteurs</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20 rounded-2xl p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <span className="text-purple-300 font-semibold text-sm">Prochain événement</span>
                  </div>
                  <p className="text-white text-sm">
                    Afterwork Networking<br />
                    <span className="text-white/60">Jeudi 7 Nov à 18h</span>
                  </p>
                </div>
              </div>
            </div>
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
