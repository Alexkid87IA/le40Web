import React from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Sparkles, ArrowRight } from 'lucide-react';
import { pricingPlans } from '../../data/club/pricing';

const PricingCard = ({ plan, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="relative group flex"
    >
      {plan.isMostPopular && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-inter font-bold shadow-lg">
            <Crown className="w-4 h-4" />
            LE PLUS POPULAIRE
          </span>
        </div>
      )}

      <div className={`absolute -inset-1 bg-gradient-to-r ${plan.gradient} rounded-3xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity`} />

      <div className={`relative w-full bg-gradient-to-br ${plan.isMostPopular ? 'from-white/15 to-white/10' : 'from-white/10 to-white/5'} backdrop-blur-xl border ${plan.isMostPopular ? 'border-emerald-500/30' : 'border-white/10'} rounded-3xl p-8 group-hover:border-white/20 transition-all flex flex-col`}>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-montserrat font-bold text-white mb-2">{plan.name}</h3>
          <p className="text-white/60 text-sm font-inter mb-6">{plan.description}</p>

          <div className="flex items-baseline justify-center gap-2 mb-2">
            {plan.originalPrice && (
              <span className="text-2xl font-montserrat font-bold text-white/40 line-through">
                {plan.originalPrice}€
              </span>
            )}
            <span className={`text-6xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r ${plan.gradient}`}>
              {plan.price}€
            </span>
            <span className="text-white/60 font-inter">/{plan.period}</span>
          </div>

          {plan.billedAs && (
            <p className="text-xs text-white/50 mb-2 font-inter">{plan.billedAs}</p>
          )}

          {plan.savings && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
              <span className="text-xs font-inter font-bold text-emerald-400">{plan.savings}</span>
            </div>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-4 rounded-2xl font-montserrat font-bold text-white mb-6 ${
            plan.isMostPopular
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30'
              : `bg-gradient-to-r ${plan.gradient}`
          } hover:shadow-xl transition-all`}
        >
          <span className="flex items-center justify-center gap-2">
            Choisir {plan.name}
            <ArrowRight className="w-4 h-4" />
          </span>
        </motion.button>

        <div className="space-y-3 flex-grow">
          {plan.features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + idx * 0.05 }}
              className="flex items-start gap-3"
            >
              <Check className={`w-5 h-5 ${plan.isMostPopular ? 'text-emerald-400' : 'text-red-400'} flex-shrink-0 mt-0.5`} />
              <span className="text-white/80 text-sm leading-relaxed font-inter">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function PricingSection() {
  return (
    <section id="pricing" className="py-32 bg-gradient-to-b from-slate-950 to-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/20 text-sm font-inter font-semibold text-red-400 mb-6"
          >
            <Sparkles className="w-4 h-4" />
            TARIFICATION TRANSPARENTE
          </motion.span>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-montserrat font-black text-white mb-6 leading-tight">
            Un prix
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-red-400">
              ridiculement abordable
            </span>
          </h2>

          <p className="text-xl text-white/60 max-w-3xl mx-auto font-inter">
            Choisissez la formule qui vous convient. Sans engagement, résiliable à tout moment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16 pt-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-montserrat font-bold text-white mb-3">
                Comparez avec le prix réel des événements
              </h3>
              <p className="text-white/60 font-inter">
                Si vous deviez payer chaque événement séparément
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white/5 rounded-2xl">
                <div className="text-white/60 text-sm mb-2 font-inter">2 Masterclasses</div>
                <div className="text-2xl font-montserrat font-bold text-white">300€</div>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-2xl">
                <div className="text-white/60 text-sm mb-2 font-inter">4 Ateliers</div>
                <div className="text-2xl font-montserrat font-bold text-white">320€</div>
              </div>
              <div className="text-center p-6 bg-white/5 rounded-2xl">
                <div className="text-white/60 text-sm mb-2 font-inter">+ Networking</div>
                <div className="text-2xl font-montserrat font-bold text-white">Inestimable</div>
              </div>
            </div>

            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="mt-8 text-center p-6 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-2xl"
            >
              <p className="text-white/80 mb-2 font-inter">Valeur totale réelle : <span className="font-bold text-white">+600€/mois</span></p>
              <p className="text-3xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                Vous payez seulement 50€/mois
              </p>
              <p className="text-emerald-400 font-inter font-bold mt-2">Soit 92% d'économies !</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-white/40 text-sm font-inter">
            💳 Paiement sécurisé • 🔒 Sans engagement • ✨ Première visite offerte
          </p>
        </motion.div>
      </div>
    </section>
  );
}
