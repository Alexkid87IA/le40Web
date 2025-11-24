import { motion } from 'framer-motion';
import { formulas } from '../../data/studios/formulas';
import { Check, Star, ArrowRight, Target } from 'lucide-react';

export default function FormulasComparisonSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-montserrat font-black text-white mb-4 md:mb-6">
            CHOISISSEZ VOTRE
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400">
              FORMULE
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-inter font-light text-white/60 max-w-3xl mx-auto px-4">
            Du tournage simple à la production complète, trouvez la formule adaptée
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {formulas.map((formula, index) => (
            <motion.div
              key={formula.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="relative group"
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative h-full"
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500"
                />

                <div className={`relative bg-zinc-900/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 border ${
                  formula.popular ? 'border-teal-400/50' : 'border-white/10'
                } group-hover:border-white/30 transition-all duration-500 h-full flex flex-col`}>
                  <div className="mb-5 md:mb-6">
                    <motion.div
                      className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center mb-4 md:mb-6"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <formula.icon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
                    </motion.div>

                    <h3 className="text-2xl md:text-3xl font-montserrat font-bold text-white mb-2">
                      {formula.name}
                    </h3>

                    <p className="text-sm md:text-base lg:text-lg text-white/70 font-inter mb-2">
                      {formula.longDescription}
                    </p>

                    <p className="text-xs md:text-sm text-teal-400 font-inter font-medium mb-4 md:mb-6">
                      {formula.tagline}
                    </p>

                    <div className="inline-flex items-baseline gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-emerald-600/20 via-teal-600/20 to-cyan-600/20 border border-teal-400/30 rounded-lg md:rounded-xl mb-4 md:mb-6">
                      <span className="text-xl md:text-2xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400">
                        {formula.displayPrice}
                      </span>
                      <span className="text-white/60 font-inter text-xs md:text-sm">
                        {formula.id === 'studio' ? 'du tarif studio' : 'vs Studio'}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4 md:mb-6 p-3 md:p-4 bg-white/5 border border-white/10 rounded-lg md:rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="w-4 h-4 text-teal-400" />
                      <span className="text-xs md:text-sm font-inter font-semibold text-white">Cas d'usage</span>
                    </div>
                    <ul className="space-y-2">
                      {formula.useCases.map((useCase: string, idx: number) => (
                        <li key={idx} className="text-sm text-white/70 font-inter flex items-start gap-2">
                          <span className="text-teal-400 mt-0.5">→</span>
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4 md:mb-6 p-3 md:p-4 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-lg md:rounded-xl">
                    <p className="text-sm text-white/80 font-inter leading-relaxed italic">
                      {formula.detailedDescription}
                    </p>
                  </div>

                  <div className="space-y-2 md:space-y-3 mb-6 md:mb-8 flex-1">
                    {formula.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index * 0.15) + (idx * 0.05), duration: 0.4 }}
                        className="flex items-start gap-3"
                      >
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center mt-0.5">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm md:text-base text-white/80 font-inter leading-relaxed">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.a
                    href="#configurator"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 md:py-4 text-sm md:text-base ${
                      formula.popular
                        ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500'
                        : 'bg-white/10 hover:bg-white/20'
                    } text-white rounded-xl font-inter font-medium shadow-lg flex items-center justify-center gap-2 group/btn transition-all`}
                  >
                    <span>Choisir {formula.name}</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 md:gap-6 px-6 md:px-10 py-6 md:py-8 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-3xl">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 flex items-center justify-center">
                <Star className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-base md:text-lg lg:text-xl font-montserrat font-bold text-white mb-1">
                  Besoin d'une solution sur-mesure ?
                </h3>
                <p className="text-sm md:text-base text-white/70 font-inter">
                  Contactez notre équipe pour un devis personnalisé
                </p>
              </div>
            </div>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-lg md:rounded-xl font-inter font-medium text-sm md:text-base shadow-xl whitespace-nowrap"
            >
              Nous contacter
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
