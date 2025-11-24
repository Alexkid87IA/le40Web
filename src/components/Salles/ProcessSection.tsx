import { motion } from 'framer-motion';
import { reservationProcess } from '../../data/salles/process';
import { ArrowRight } from 'lucide-react';

export default function ProcessSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-zinc-900 to-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-black text-white mb-4 md:mb-6 px-4">
            RÉSERVATION EN
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              4 ÉTAPES SIMPLES
            </span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl font-inter font-light text-white/60 max-w-3xl mx-auto px-4">
            Un processus fluide et rapide pour réserver votre espace en moins de 5 minutes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
          <div className="hidden lg:block absolute top-1/3 left-0 right-0 h-px">
            <div className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>

          {reservationProcess.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="relative group"
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative"
              >
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-r ${step.gradient} rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`}
                />

                <div className="relative bg-zinc-900/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/10 group-hover:border-white/30 transition-all duration-500 h-full">
                  <div className="relative mb-6">
                    <motion.div
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mx-auto`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <step.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </motion.div>

                    <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black border-2 border-white/20 flex items-center justify-center">
                      <span className="text-white font-montserrat font-black text-base md:text-lg">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  <div className="text-center mb-4">
                    <h3 className="text-xl md:text-2xl font-montserrat font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r ${step.gradient} bg-opacity-10 border border-white/20 mb-4`}>
                      <span className="text-white/80 font-inter text-xs md:text-sm font-medium">
                        {step.duration}
                      </span>
                    </div>
                  </div>

                  <p className="text-white/70 font-inter leading-relaxed text-center text-sm md:text-base">
                    {step.description}
                  </p>

                  {index < reservationProcess.length - 1 && (
                    <motion.div
                      className="hidden lg:block absolute top-1/3 -right-4 z-10"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="w-8 h-8 rounded-full bg-black border-2 border-white/30 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-white/60" />
                      </div>
                    </motion.div>
                  )}
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
          className="mt-10 md:mt-12 lg:mt-16 text-center px-4"
        >
          <motion.a
            href="#spaces"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-2 md:gap-3 px-6 md:px-10 py-3 md:py-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-xl md:rounded-2xl font-montserrat font-bold text-sm md:text-base lg:text-lg shadow-2xl"
          >
            <span>Commencer ma réservation</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
