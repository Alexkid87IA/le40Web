import React from 'react';
import { motion } from 'framer-motion';
import { Users, Wifi, Coffee, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '../../components/UI/Button';

export default function CoworkingSection() {
  const benefits = [
    { icon: Users, text: 'Communauté de 120+ entrepreneurs actifs' },
    { icon: Wifi, text: 'Fibre optique dédiée 1 Gb/s' },
    { icon: Coffee, text: 'Café, thé et snacks illimités' },
    { icon: Clock, text: 'Accès 24/7 avec contrôle sécurisé' }
  ];

  return (
    <section id="coworking" className="relative min-h-screen flex items-center bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-[#0A0A0A] to-blue-950/20"></div>

        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px]"
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
            src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Coworking Le 40"
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
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-2 mb-6">
              <Users className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 text-sm font-medium uppercase tracking-wider">Coworking</span>
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-montserrat font-black text-white mb-6 leading-tight">
              Travaillez<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400">
                Entouré d'Entrepreneurs
              </span>
            </h2>

            <p className="text-xl text-white/70 mb-8 leading-relaxed font-light">
              Rejoignez une communauté dynamique d'entrepreneurs, freelances et innovateurs dans nos espaces de travail haut de gamme. Flexibilité totale, équipements premium et networking au quotidien.
            </p>

            <div className="space-y-4 mb-10">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                >
                  <div className="p-2 bg-cyan-500/10 rounded-lg shrink-0">
                    <benefit.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-white/80 leading-tight pt-2">{benefit.text}</span>
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
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white"
              >
                RÉSERVER MAINTENANT
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                size="md"
                className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
              >
                Demander une visite
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-8 flex items-center gap-3 text-sm text-white/50"
            >
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span>120+ membres actifs dans notre communauté</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="lg:order-2"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl blur-3xl opacity-30"></div>
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center">
                    <Users className="w-12 h-12 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">Espace Premium</div>
                  <div className="text-white/50">300m² au cœur de Marseille</div>
                </div>
                <div className="h-px bg-white/10 my-6"></div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Postes disponibles</span>
                    <span className="text-white font-semibold">30+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Fibre dédiée</span>
                    <span className="text-white font-semibold">1 Gb/s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Accès</span>
                    <span className="text-white font-semibold">24/7</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Membres</span>
                    <span className="text-white font-semibold">120+</span>
                  </div>
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
