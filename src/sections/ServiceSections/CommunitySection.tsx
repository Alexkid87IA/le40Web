import React from 'react';
import { motion } from 'framer-motion';
import { Network, Users, Calendar, Award, ArrowRight, Sparkles } from 'lucide-react';
import Button from '../../components/UI/Button';

export default function CommunitySection() {
  const benefits = [
    { icon: Users, text: 'Networking Events Mensuels' },
    { icon: Calendar, text: 'Ateliers & Masterclass Membres' },
    { icon: Award, text: 'Mentors & Experts Disponibles' },
    { icon: Sparkles, text: 'Opportunités de Collaboration' }
  ];

  return (
    <section id="community" className="relative min-h-screen flex items-center bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-[#0A0A0A] to-sky-950/20"></div>

        <motion.div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-sky-600/15 rounded-full blur-[140px]"
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
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-2 mb-8">
              <Network className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 text-sm font-medium uppercase tracking-wider">Communauté Active</span>
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-montserrat font-black text-white mb-6 leading-tight">
              Rejoignez le Réseau<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-400">
                Des Entrepreneurs
              </span>
            </h2>

            <p className="text-xl text-white/70 mb-12 leading-relaxed font-light max-w-3xl mx-auto">
              Plus qu'un espace de travail, Le 40 est une communauté vibrante où se rencontrent les esprits les plus brillants de Marseille. Échangez, collaborez et grandissez ensemble.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-sky-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center group-hover:border-cyan-500/30 transition-all">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-cyan-500/10 rounded-xl mb-4">
                    <benefit.icon className="w-7 h-7 text-cyan-400" />
                  </div>
                  <p className="text-white/80 text-sm font-medium">{benefit.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="inline-block bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 max-w-3xl">
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <div className="text-5xl font-montserrat font-black text-white mb-2">120+</div>
                  <div className="text-white/50 text-sm">Membres actifs</div>
                </div>
                <div>
                  <div className="text-5xl font-montserrat font-black text-white mb-2">15+</div>
                  <div className="text-white/50 text-sm">Events par mois</div>
                </div>
                <div>
                  <div className="text-5xl font-montserrat font-black text-white mb-2">30+</div>
                  <div className="text-white/50 text-sm">Secteurs représentés</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              href="/community"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
              className="bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white"
            >
              REJOINDRE LA COMMUNAUTÉ
            </Button>
            <Button
              href="/events"
              variant="secondary"
              size="md"
              className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
            >
              Voir les événements
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="inline-block bg-gradient-to-r from-cyan-500/10 to-sky-500/10 border border-cyan-500/20 rounded-2xl px-6 py-4">
              <p className="text-cyan-300 text-sm">
                <span className="font-semibold">Prochain événement:</span> Afterwork Networking - Jeudi 7 Nov à 18h
              </p>
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
