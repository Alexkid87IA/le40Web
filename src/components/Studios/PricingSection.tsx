import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { formulas } from '../../data/studios/formulas';

export default function PricingSection() {
  return (
    <section className="py-32 bg-gradient-to-b from-black to-zinc-900">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center mb-6">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-white/30 mr-4"></div>
            <span className="text-xs font-montserrat font-medium text-white/50 tracking-[0.3em] uppercase">
              Formules
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-white/30 ml-4"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
            CHOISISSEZ VOTRE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
              NIVEAU DE SERVICE
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto font-inter">
            Du tournage brut à la production clé en main
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {formulas.map((formula, index) => (
            <motion.div
              key={formula.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative group ${
                formula.popular ? 'md:scale-105' : ''
              }`}
            >
              {formula.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-1 rounded-full text-white text-sm font-bold flex items-center gap-1 z-10">
                  <Star className="w-3 h-3" />
                  LE PLUS CHOISI
                </div>
              )}

              <div className={`relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border ${
                formula.popular ? 'border-orange-500/50' : 'border-white/10'
              } group-hover:border-white/20 transition-all duration-500 h-full`}>
                <div className="p-8">
                  <div className="mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center mb-4`}>
                      <formula.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-montserrat font-black text-white mb-2">
                      {formula.name}
                    </h3>
                    <p className="text-white/60 font-inter text-sm mb-4">
                      {formula.description}
                    </p>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                        {formula.displayPrice}
                      </span>
                    </div>
                    <p className="text-white/50 text-sm font-inter">
                      {formula.longDescription}
                    </p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {formula.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/80 font-inter text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-xl font-montserrat font-bold transition-all ${
                      formula.popular
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                    }`}
                  >
                    {formula.popular ? 'Formule recommandée' : 'Choisir cette formule'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-6 flex-wrap justify-center text-white/60">
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-400" />
              Prix transparents
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-400" />
              Devis personnalisé gratuit
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-400" />
              Facturation flexible
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
