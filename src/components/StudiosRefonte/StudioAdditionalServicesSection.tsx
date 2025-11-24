import { motion } from 'framer-motion';
import { studioAdditionalServices } from '../../data/studios/studioAdditionalServices';
import { Star, ArrowRight, Check, Film, Settings, Users } from 'lucide-react';
import { useState } from 'react';

export default function StudioAdditionalServicesSection() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'post-production' | 'equipement' | 'services'>('all');

  const categories = [
    { id: 'all' as const, name: 'Tous', icon: Star },
    { id: 'post-production' as const, name: 'Post-Production', icon: Film },
    { id: 'equipement' as const, name: 'Équipement', icon: Settings },
    { id: 'services' as const, name: 'Services', icon: Users }
  ];

  const filteredServices = selectedCategory === 'all'
    ? studioAdditionalServices
    : studioAdditionalServices.filter(s => s.category === selectedCategory);

  return (
    <section className="relative py-16 md:py-24 lg:py-32">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-montserrat font-black text-white mb-4 md:mb-6">
            OPTIONS
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400">
              ADDITIONNELLES
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-inter font-light text-white/60 max-w-3xl mx-auto px-4">
            Optimisez votre production avec nos services premium
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 lg:gap-4 mb-8 md:mb-12 lg:mb-16"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 md:px-5 lg:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl font-inter font-medium text-xs md:text-sm transition-all flex items-center gap-1.5 md:gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-lg'
                    : 'bg-white/5 text-white/70 border border-white/10 hover:border-white/30'
                }`}
              >
                <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                {cat.name}
              </motion.button>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-12 lg:mb-16">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative group"
            >
              {service.popular && (
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="absolute -top-3 md:-top-4 right-4 md:right-6 z-10"
                >
                  <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white text-[10px] md:text-xs font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-full flex items-center gap-1 md:gap-1.5 shadow-lg">
                    <Star className="w-3 h-3 md:w-3.5 md:h-3.5 fill-white" />
                    Populaire
                  </div>
                </motion.div>
              )}

              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative h-full"
              >
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`}
                />

                <div className="relative bg-zinc-900/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 border border-white/10 group-hover:border-white/30 transition-all duration-500 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4 md:mb-5 lg:mb-6">
                    <motion.div
                      className={`w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <service.icon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
                    </motion.div>
                  </div>

                  <h3 className="text-lg md:text-xl lg:text-2xl font-montserrat font-bold text-white mb-2 md:mb-3">
                    {service.name}
                  </h3>

                  <p className="text-white/70 font-inter text-sm md:text-base leading-relaxed mb-3 md:mb-4">
                    {service.details}
                  </p>

                  <div className={`inline-flex items-baseline gap-1.5 md:gap-2 mb-4 md:mb-5 lg:mb-6 px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r ${service.gradient} bg-opacity-10 border border-white/20 rounded-lg md:rounded-xl self-start`}>
                    <span className="text-xl md:text-2xl font-montserrat font-black text-white">
                      {service.displayPrice}
                    </span>
                  </div>

                  <div className="space-y-2 md:space-y-3 mb-5 md:mb-6 flex-1">
                    {service.features.slice(0, 4).map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index * 0.1) + (idx * 0.05), duration: 0.4 }}
                        className="flex items-start gap-3"
                      >
                        <div className={`flex-shrink-0 w-4 h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center mt-0.5`}>
                          <Check className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                        </div>
                        <span className="text-white/80 font-inter text-xs md:text-sm leading-relaxed">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.a
                    href="#configurator"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 md:py-4 bg-gradient-to-r ${service.gradient} text-white rounded-lg md:rounded-xl font-inter font-medium text-sm md:text-base shadow-lg flex items-center justify-center gap-2 group/btn`}
                  >
                    <span>Ajouter à ma session</span>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-1 transition-transform" />
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
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 md:gap-6 px-5 md:px-8 lg:px-10 py-5 md:py-6 lg:py-8 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-3xl">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 flex items-center justify-center">
                <Star className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-base md:text-lg lg:text-xl font-montserrat font-bold text-white mb-1">
                  Besoin d'une option sur-mesure ?
                </h3>
                <p className="text-white/70 font-inter text-xs md:text-sm">
                  Contactez notre équipe pour un service personnalisé
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
