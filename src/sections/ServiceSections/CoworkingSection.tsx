import React from 'react';
import { motion } from 'framer-motion';
import { Users, Wifi, Coffee, Calendar, ArrowRight, Zap } from 'lucide-react';
import Button from '../../components/UI/Button';

export default function CoworkingSection() {
  const features = [
    { icon: Wifi, text: 'Internet Très Haut Débit Fibre' },
    { icon: Coffee, text: 'Café & Thé Premium Illimités' },
    { icon: Calendar, text: 'Accès 24/7 avec Badge' },
    { icon: Zap, text: 'Salles de Réunion Incluses' }
  ];

  return (
    <section id="coworking" className="relative min-h-screen flex items-center bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/30 via-[#0A0A0A] to-purple-950/20"></div>

        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px]"
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
          whileInView={{ opacity: 0.4 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="absolute inset-0"
        >
          <img
            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Espace coworking Le 40"
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
            <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-2 mb-6">
              <Users className="w-4 h-4 text-violet-400" />
              <span className="text-violet-300 text-sm font-medium uppercase tracking-wider">Coworking Premium</span>
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-montserrat font-black text-white mb-6 leading-tight">
              Travaillez<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400">
                Entouré d'Excellence
              </span>
            </h2>

            <p className="text-xl text-white/70 mb-8 leading-relaxed font-light">
              Rejoignez une communauté dynamique d'entrepreneurs, freelances et innovateurs dans nos espaces de travail haut de gamme. Flexibilité totale, équipements premium et networking au quotidien.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="p-2 bg-violet-500/10 rounded-lg">
                    <feature.icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <span className="text-white/80 text-sm leading-tight pt-1">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-3 mb-8">
              <div className="text-white/50 text-sm">À partir de</div>
              <div className="text-5xl font-montserrat font-black text-white">199€</div>
              <div className="text-white/50 text-sm">/mois</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                href="/coworking"
                size="md"
                icon={ArrowRight}
                iconPosition="right"
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white"
              >
                RÉSERVER MAINTENANT
              </Button>
              <Button
                href="/tarifs"
                variant="secondary"
                size="md"
                className="border-violet-500/30 text-violet-300 hover:bg-violet-500/10"
              >
                Voir tous les tarifs
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl blur-3xl opacity-30"></div>
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white/50 text-sm mb-1">Membres actifs</div>
                    <div className="text-4xl font-bold text-white">120+</div>
                  </div>
                  <div className="text-6xl">👥</div>
                </div>
                <div className="h-px bg-white/10"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white/50 text-sm mb-1">Surface totale</div>
                    <div className="text-4xl font-bold text-white">4000m²</div>
                  </div>
                  <div className="text-6xl">🏢</div>
                </div>
                <div className="h-px bg-white/10"></div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white/50 text-sm mb-1">Événements / mois</div>
                    <div className="text-4xl font-bold text-white">15+</div>
                  </div>
                  <div className="text-6xl">🎯</div>
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
