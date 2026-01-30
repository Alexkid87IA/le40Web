import { motion } from 'framer-motion';
import { equipmentCategories } from '../../data/salles/equipment';
import { Check } from 'lucide-react';

export default function EquipmentSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute top-0 left-1/2 h-1/2 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-montserrat font-black text-white mb-4 md:mb-6 px-4">
            ÉQUIPEMENTS
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              PROFESSIONNELS
            </span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl font-inter font-light text-white/60 max-w-3xl mx-auto px-4">
            Tout le matériel dont vous avez besoin, inclus dans chaque réservation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {equipmentCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative group"
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative h-full"
              >
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-r ${category.gradient} rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`}
                />

                <div className="relative bg-zinc-900/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 border border-white/10 group-hover:border-white/30 transition-all duration-500 h-full">
                  <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6 lg:mb-8">
                    <motion.div
                      className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <category.icon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
                    </motion.div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-montserrat font-bold text-white">
                      {category.category}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index * 0.1) + (itemIndex * 0.05), duration: 0.4 }}
                        className="flex items-start gap-3 group/item"
                      >
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${category.gradient} flex items-center justify-center mt-0.5`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-white/80 font-inter leading-relaxed group-hover/item:text-white transition-colors text-sm md:text-base">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 md:mt-12 lg:mt-16 text-center px-4"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 md:gap-6 px-6 md:px-10 py-4 md:py-6 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-xl md:rounded-2xl">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-white font-inter text-sm md:text-base lg:text-lg">
                <span className="font-bold text-emerald-400">100%</span> inclus dans votre réservation
              </span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/20"></div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
              <span className="text-white font-inter text-sm md:text-base lg:text-lg">
                <span className="font-bold text-cyan-400">Support technique</span> disponible
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
