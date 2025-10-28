import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Lock, Wifi, Coffee, ArrowRight, Users } from 'lucide-react';
import Button from '../../components/UI/Button';

export default function BureauxSection() {
  const features = [
    { icon: Lock, text: 'Bureaux Privés Sécurisés' },
    { icon: Wifi, text: 'Fibre Dédiée 1 Gbps' },
    { icon: Coffee, text: 'Cuisine Équipée Premium' },
    { icon: Users, text: 'De 2 à 20 Personnes' }
  ];

  return (
    <section id="bureaux" className="relative min-h-screen flex items-center bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 via-[#0A0A0A] to-teal-950/20"></div>

        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-600/20 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-600/15 rounded-full blur-[140px]"
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
            src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Bureaux privés Le 40"
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
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
              <Monitor className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-medium uppercase tracking-wider">Bureaux Privés</span>
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-montserrat font-black text-white mb-6 leading-tight">
              Votre Espace<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                100% Dédié
              </span>
            </h2>

            <p className="text-xl text-white/70 mb-8 leading-relaxed font-light">
              Des bureaux privés entièrement équipés pour accueillir votre équipe dans les meilleures conditions. Sécurité, confort et productivité garantis dans un environnement professionnel premium.
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
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <feature.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-white/80 text-sm leading-tight pt-1">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-3 mb-8">
              <div className="text-white/50 text-sm">À partir de</div>
              <div className="text-5xl font-montserrat font-black text-white">699€</div>
              <div className="text-white/50 text-sm">/mois</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                href="/salles"
                size="md"
                icon={ArrowRight}
                iconPosition="right"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white sm:min-w-[280px]"
              >
                DÉCOUVRIR NOS BUREAUX
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                size="md"
                className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 sm:min-w-[280px]"
              >
                Demander une visite
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
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl blur-3xl opacity-30"></div>
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-6">
                <div>
                  <div className="text-white/50 text-sm mb-3">Inclus dans votre bureau</div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      <span className="text-white">Mobilier ergonomique premium</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      <span className="text-white">Accès salles de réunion</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      <span className="text-white">Espace détente & cuisine</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      <span className="text-white">Badges d'accès 24/7</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      <span className="text-white">Services de conciergerie</span>
                    </div>
                  </div>
                </div>
                <div className="h-px bg-white/10"></div>
                <div className="text-center p-4 bg-emerald-500/10 rounded-xl">
                  <div className="text-emerald-400 text-sm font-medium mb-1">Configuration flexible</div>
                  <div className="text-white/70 text-xs">De 10m² à 100m² selon vos besoins</div>
                </div>
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
