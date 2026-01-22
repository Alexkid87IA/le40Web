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
            className="inline-block text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-4"
          >
            Processus simplifié
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-black text-white mb-6">
            Comment ça{' '}
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                fonctionne
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full origin-left"
              />
            </span>
          </h2>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto">
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
                {/* Card */}
                <div className="relative h-full">
                  {/* Glow on hover */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${step.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`} />

                  <div className="relative h-full bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/[0.08] p-6 group-hover:border-white/20 group-hover:bg-white/[0.05] transition-all duration-500">
                    {/* Number - Large watermark style */}
                    <div className="absolute top-4 right-4">
                      <span className={`text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br ${step.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`}>
                        {step.number}
                      </span>
                    </div>

                    {/* Icon container */}
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${step.gradient} p-[1px] mb-6`}
                    >
                      <div className="w-full h-full rounded-xl bg-black/80 flex items-center justify-center backdrop-blur-sm">
                        <step.icon className="w-7 h-7 text-white" />
                      </div>
                      {/* Icon glow */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} rounded-xl blur-lg opacity-50 -z-10`} />
                    </motion.div>

                    {/* Text */}
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {step.title}
                      </h3>
                      <h4 className={`text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r ${step.gradient} mb-3`}>
                        {step.subtitle}
                      </h4>
                      <p className="text-white/50 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Bottom accent line */}
                    <div className={`absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  </div>
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
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} p-[1px] flex-shrink-0`}
                  >
                    <div className="w-full h-full rounded-xl bg-black flex items-center justify-center">
                      <span className="text-white font-black text-lg">{step.number}</span>
                    </div>
                  </motion.div>
                  {index < steps.length - 1 && (
                    <div className="w-[2px] flex-1 mt-3 bg-gradient-to-b from-white/20 to-transparent" />
                  )}
                </div>

                {/* Right - Content */}
                <div className="flex-1 pb-6">
                  <div className="bg-white/[0.03] rounded-xl p-4 border border-white/[0.08] group-hover:border-white/20 transition-all">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${step.gradient} p-[1px] flex-shrink-0`}>
                        <div className="w-full h-full rounded-lg bg-black/80 flex items-center justify-center">
                          <step.icon className="w-5 h-5 text-white" />
                        </div>
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
            className="group relative inline-flex items-center gap-3 px-8 py-4 overflow-hidden rounded-xl font-bold text-lg"
          >
            {/* Button gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

            {/* Shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

            {/* Button glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 blur-xl opacity-50 -z-10" />

            <span className="relative text-white">Commencer ma réservation</span>
            <ArrowRight className="relative w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
