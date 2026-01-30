import { motion } from 'framer-motion';
import { additionalServices } from '../../data/salles/additionalServices';
import { Star, ArrowRight, Check } from 'lucide-react';

export default function AdditionalServicesSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-montserrat font-black text-white mb-6">
            SERVICES
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              ADDITIONNELS
            </span>
          </h2>
          <p className="text-base md:text-lg lg:text-base md:text-lg lg:text-xl font-inter font-light text-white/60 max-w-3xl mx-auto">
            Personnalisez votre événement avec nos services premium
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {additionalServices.map((service, index) => (
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
                  className="absolute -top-4 right-6 z-10"
                >
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-medium px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
                    <Star className="w-3.5 h-3.5 fill-white" />
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
                  className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`}
                />

                <div className="relative bg-zinc-900/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 border border-white/10 group-hover:border-white/30 transition-all duration-500 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>

                  <h3 className="text-2xl font-montserrat font-bold text-white mb-3">
                    {service.name}
                  </h3>

                  <p className="text-white/70 font-inter leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className={`inline-flex items-baseline gap-2 mb-6 px-4 py-2 bg-gradient-to-r ${service.gradient} bg-opacity-10 border border-white/20 rounded-xl`}>
                    <span className="text-2xl font-montserrat font-black text-white">
                      {service.price.split(' ')[0]} {service.price.split(' ')[1]}
                    </span>
                    {service.price.split(' ').slice(2).length > 0 && (
                      <span className="text-white/60 font-inter text-sm">
                        {service.price.split(' ').slice(2).join(' ')}
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 mb-6 flex-1">
                    {service.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index * 0.1) + (idx * 0.05), duration: 0.4 }}
                        className="flex items-start gap-3"
                      >
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center mt-0.5`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-white/80 font-inter leading-relaxed">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 bg-gradient-to-r ${service.gradient} text-white rounded-xl font-inter font-medium shadow-lg flex items-center justify-center gap-2 group/btn`}
                  >
                    <span>Ajouter à ma réservation</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
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
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 px-10 py-8 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-3xl">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-base md:text-lg lg:text-xl font-montserrat font-bold text-white mb-1">
                  Besoin d'un service sur-mesure ?
                </h3>
                <p className="text-white/70 font-inter">
                  Contactez notre équipe pour un devis personnalisé
                </p>
              </div>
            </div>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-inter font-medium shadow-xl whitespace-nowrap"
            >
              Nous contacter
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
