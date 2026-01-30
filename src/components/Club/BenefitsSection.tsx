import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { membershipBenefits } from '../../data/club/benefits';

const BenefitCard = ({ benefit, index }) => {
  const Icon = benefit.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <div className="h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 group-hover:border-red-500/30 transition-all duration-300">
        <div className="flex items-start gap-6">
          <div className={`w-14 h-14 bg-gradient-to-br ${benefit.gradient} rounded-xl flex items-center justify-center shrink-0`}>
            <Icon className="w-7 h-7 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-xl font-montserrat font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
              {benefit.title}
            </h3>
            <p className="text-white/60 text-sm font-inter leading-relaxed mb-3">
              {benefit.description}
            </p>
            <span className="inline-flex items-center text-xs font-inter font-semibold text-red-400/80">
              {benefit.stats}
            </span>
          </div>

          <Check className="w-5 h-5 text-red-400 shrink-0 mt-1" />
        </div>
      </div>
    </motion.div>
  );
};

export default function BenefitsSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-rose-600/20 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/20 text-sm font-medium text-red-400 mb-6"
          >
            AVANTAGES EXCLUSIFS
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-6">
            CE QUI EST <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-red-400">INCLUS</span>
          </h2>

          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto font-inter">
            Tout ce dont votre entreprise a besoin pour grandir, inclus dans votre abonnement
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {membershipBenefits.map((benefit, index) => (
            <BenefitCard key={index} benefit={benefit} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-red-950/50 to-rose-950/50 border border-red-500/30 rounded-2xl p-10 text-center"
        >
          <h3 className="text-xl md:text-2xl font-montserrat font-black text-white mb-4">
            Tout ça pour seulement <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-400">50€ par mois</span>
          </h3>
          <p className="text-base text-white/60 font-inter">
            Sans engagement · Résiliation à tout moment · Visite découverte gratuite
          </p>
        </motion.div>
      </div>
    </section>
  );
}
