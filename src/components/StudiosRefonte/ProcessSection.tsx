import { motion } from 'framer-motion';
import { Video, Sliders, Star, Calendar, ArrowRight } from 'lucide-react';

export default function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Choisissez',
      subtitle: 'votre studio',
      description: 'Face-Cam, Podcast, Live Stream ou Talk-Show',
      icon: Video,
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      number: '02',
      title: 'Sélectionnez',
      subtitle: 'votre formule',
      description: 'Autonome, Assisté ou Full Service',
      icon: Sliders,
      gradient: 'from-teal-500 to-cyan-500',
    },
    {
      number: '03',
      title: 'Personnalisez',
      subtitle: 'vos extras',
      description: 'Montage, maquillage, catering...',
      icon: Star,
      gradient: 'from-cyan-500 to-emerald-500',
    },
    {
      number: '04',
      title: 'Réservez',
      subtitle: 'votre créneau',
      description: 'Confirmation instantanée',
      icon: Calendar,
      gradient: 'from-emerald-400 to-teal-400',
    }
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background transparent - vidéo visible */}

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-sm font-medium text-emerald-400 mb-6"
          >
            PROCESSUS SIMPLIFIÉ
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-6">
            COMMENT ÇA <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">FONCTIONNE</span>
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto font-inter">
            Réservez votre studio en 4 étapes simples
          </p>
        </motion.div>

        {/* Steps - Desktop */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
                className="group relative"
              >
                <div className="relative h-full bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 group-hover:border-emerald-500/30 transition-all">
                  <div className="text-sm font-montserrat font-bold text-emerald-400/60 mb-4">
                    ÉTAPE {step.number}
                  </div>

                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-lg md:text-xl font-montserrat font-bold text-white mb-1">
                    {step.title}
                  </h3>
                  <h4 className={`text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r ${step.gradient} mb-3`}>
                    {step.subtitle}
                  </h4>
                  <p className="text-white/60 text-sm font-inter leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector arrow */}
                {index < steps.length - 1 && (
                  <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-20">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.3 }}
                      className="w-6 h-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                    >
                      <ArrowRight className="w-3 h-3 text-emerald-400" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Steps - Mobile/Tablet */}
        <div className="lg:hidden space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative flex gap-4">
                {/* Left - Number & Line */}
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex-shrink-0 flex items-center justify-center`}>
                    <span className="text-white font-black text-lg">{step.number}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-[2px] flex-1 mt-3 bg-gradient-to-b from-white/20 to-transparent" />
                  )}
                </div>

                {/* Right - Content */}
                <div className="flex-1 pb-6">
                  <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10 group-hover:border-emerald-500/30 transition-all">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${step.gradient} flex-shrink-0 flex items-center justify-center`}>
                        <step.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold">{step.title}</h3>
                        <h4 className={`text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${step.gradient}`}>
                          {step.subtitle}
                        </h4>
                        <p className="text-white/50 text-sm mt-1">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 md:mt-20 text-center"
        >
          <motion.a
            href="#booking-flow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-xl text-white font-montserrat font-bold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all"
          >
            <span>Commencer ma réservation</span>
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
