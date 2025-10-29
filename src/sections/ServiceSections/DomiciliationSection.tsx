import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Building2, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '../../components/UI/Button';

export default function DomiciliationSection() {
  const benefits = [
    { icon: Building2, text: 'Adresse professionnelle au centre de Marseille' },
    { icon: Mail, text: 'Scan courrier en 2h + Réexpédition express' },
    { icon: Shield, text: 'Configuration en 24h + Agrément préfecture' },
    { icon: CheckCircle2, text: 'Accès coworking & networking inclus' }
  ];

  return (
    <section id="domiciliation" className="relative min-h-screen flex items-center bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/30 via-[#0A0A0A] to-orange-950/20"></div>

        <motion.div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-amber-600/20 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-orange-600/15 rounded-full blur-[140px]"
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
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Domiciliation Le 40"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]/80"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/90 via-transparent to-[#0A0A0A]"></div>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="lg:order-2"
          >
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 mb-6">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span className="text-amber-300 text-sm font-medium uppercase tracking-wider">Domiciliation</span>
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-montserrat font-black text-white mb-6 leading-tight">
              Domiciliation<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">
                En 24h
              </span>
            </h2>

            <p className="text-xl text-white/70 mb-8 leading-relaxed font-light">
              Domiciliez votre entreprise au cœur de Marseille. Configuration rapide en 24h, gestion courrier automatisée et services professionnels inclus. Une solution complète et flexible pour démarrer sereinement.
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
                  <div className="p-2 bg-amber-500/10 rounded-lg shrink-0">
                    <benefit.icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <span className="text-white/80 leading-tight pt-2">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-3 mb-8">
              <div className="text-white/50 text-sm">À partir de</div>
              <div className="text-5xl font-montserrat font-black text-white">29€</div>
              <div className="text-white/50 text-sm">/mois</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                href="/domiciliation"
                size="md"
                icon={ArrowRight}
                iconPosition="right"
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white"
              >
                OBTENIR UNE ADRESSE
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                size="md"
                className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10"
              >
                Nous contacter
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
              <span>120+ entreprises nous font déjà confiance</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="lg:order-1"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-600 to-orange-600 rounded-3xl blur-3xl opacity-30"></div>
              <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-400/30 flex items-center justify-center">
                    <Building2 className="w-12 h-12 text-amber-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">40 Rue de la République</div>
                  <div className="text-white/50">13001 Marseille</div>
                </div>
                <div className="h-px bg-white/10 my-6"></div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Configuration</span>
                    <span className="text-white font-semibold">En 48h</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Gestion courrier</span>
                    <span className="text-white font-semibold">Incluse</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Scan documents</span>
                    <span className="text-white font-semibold">En option</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Accès coworking</span>
                    <span className="text-white font-semibold">Inclus</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="noiseDomiciliation">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseDomiciliation)" />
        </svg>
      </div>
    </section>
  );
}
