import React from 'react';
import { motion } from 'framer-motion';
import { Users, Wifi, Coffee, Calendar, ArrowRight, Zap, Building2, Target } from 'lucide-react';
import Button from '../../components/UI/Button';

export default function CoworkingSection() {
  const features = [
    { icon: Wifi, text: 'Internet Très Haut Débit Fibre' },
    { icon: Coffee, text: 'Café & Thé Premium Illimités' },
    { icon: Calendar, text: 'Accès 24/7' },
    { icon: Zap, text: 'Salles de Réunion Incluses' }
  ];

  const stats = [
    { value: '120+', label: 'Membres actifs', icon: Users },
    { value: '4000m²', label: 'Surface totale', icon: Building2 },
    { value: '15+', label: 'Événements / mois', icon: Target }
  ];

  return (
    <section id="coworking" className="relative min-h-screen flex items-center bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-[#0A0A0A] to-blue-950/10"></div>
      </div>

      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="absolute inset-0"
        >
          <img
            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Espace coworking Le 40"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]/60"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]"></div>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-2 mb-8">
              <Users className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 text-sm font-medium uppercase tracking-wider">Espaces Premium</span>
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Travaillez
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400">
                Entouré d'Entrepreneurs
              </span>
            </h2>

            <p className="text-xl text-white/70 mb-12 leading-relaxed max-w-3xl">
              Rejoignez une communauté dynamique d'entrepreneurs, freelances et innovateurs dans nos espaces de travail haut de gamme. Flexibilité totale, équipements premium et networking au quotidien.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-3 gap-6 mb-12"
          >
            {stats.map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-white/40 text-sm">{stat.label}</div>
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-4 mb-12"
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3">
                <div className="p-2 bg-cyan-500/10 rounded-lg flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-white/80 text-sm">{feature.text}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="text-white/50 text-sm">À partir de</div>
              <div className="text-5xl font-bold text-white">199€</div>
              <div className="text-white/50 text-sm">/mois</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                href="/coworking"
                size="md"
                icon={ArrowRight}
                iconPosition="right"
                className="bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 hover:from-cyan-600 hover:via-blue-600 hover:to-teal-600 text-white shadow-lg shadow-cyan-500/25"
              >
                RÉSERVER MAINTENANT
              </Button>
              <Button
                href="/tarifs"
                variant="secondary"
                size="md"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Voir tous les tarifs
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
