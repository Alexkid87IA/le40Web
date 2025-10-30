import { motion } from 'framer-motion';
import { Video, Sliders, Plus, CheckCircle } from 'lucide-react';

export default function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Choisissez votre studio',
      description: '6 configurations professionnelles adaptées à tous vos projets audiovisuels',
      icon: Video,
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500'
    },
    {
      number: '02',
      title: 'Sélectionnez formule & durée',
      description: 'Studio simple, Post-Prod ou Expert. Tarifs dégressifs selon la durée',
      icon: Sliders,
      gradient: 'from-teal-500 via-cyan-500 to-emerald-600'
    },
    {
      number: '03',
      title: 'Ajoutez vos options',
      description: 'Montage, téléprompter, caméras supplémentaires, streaming live',
      icon: Plus,
      gradient: 'from-cyan-500 via-teal-500 to-emerald-500'
    },
    {
      number: '04',
      title: 'Confirmez votre réservation',
      description: 'Paiement sécurisé, confirmation immédiate, annulation flexible',
      icon: CheckCircle,
      gradient: 'from-teal-500 via-emerald-500 to-cyan-500'
    }
  ];

  return (
    <section className="relative py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-montserrat font-black text-white mb-6">
            COMMENT ÇA
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400">
              FONCTIONNE
            </span>
          </h2>
          <p className="text-xl md:text-2xl font-inter font-light text-white/60 max-w-3xl mx-auto">
            4 étapes simples pour réserver votre session studio
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="relative group"
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative"
              >
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-r ${step.gradient} rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`}
                />

                <div className="relative bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/10 group-hover:border-white/30 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <span className={`text-6xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r ${step.gradient} opacity-30`}>
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-montserrat font-bold text-white mb-3">
                    {step.title}
                  </h3>

                  <p className="text-white/70 font-inter leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-8 h-0.5 bg-gradient-to-r from-white/20 to-transparent"
                  />
                </div>
              )}
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
          <motion.a
            href="#configurator"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-2xl font-montserrat font-bold text-lg shadow-2xl"
          >
            <span>Commencer maintenant</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
