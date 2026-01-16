import { motion } from 'framer-motion';
import { Video, Sliders, Sparkles, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ProcessSection() {
  const steps = [
    {
      number: '1',
      title: 'Choisissez',
      subtitle: 'votre studio',
      description: 'Face-Cam, Podcast, Live Stream ou Talk-Show',
      icon: Video,
    },
    {
      number: '2',
      title: 'Sélectionnez',
      subtitle: 'votre formule',
      description: 'Autonome, Assisté ou Full Service',
      icon: Sliders,
    },
    {
      number: '3',
      title: 'Personnalisez',
      subtitle: 'vos extras',
      description: 'Montage, maquillage, catering...',
      icon: Sparkles,
    },
    {
      number: '4',
      title: 'Réservez',
      subtitle: 'votre créneau',
      description: 'Confirmation instantanée',
      icon: Calendar,
    }
  ];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">Simple & Rapide</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-4">
            Comment ça{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              fonctionne
            </span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto">
            Réservez votre studio en 4 étapes simples
          </p>
        </motion.div>

        {/* Steps - Desktop horizontal timeline */}
        <div className="hidden md:block">
          {/* Connection line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[320px] w-[calc(100%-200px)] max-w-4xl h-0.5">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 origin-left"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="relative"
              >
                {/* Card */}
                <div className="group relative">
                  {/* Glow effect on hover */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/10 group-hover:border-emerald-500/30 transition-all duration-300">
                    {/* Number badge */}
                    <div className="absolute -top-3 left-6">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                        <span className="text-white font-black text-lg">{step.number}</span>
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="mt-6 mb-5">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all duration-300"
                      >
                        <step.icon className="w-7 h-7 text-white/70 group-hover:text-emerald-400 transition-colors" />
                      </motion.div>
                    </div>

                    {/* Text */}
                    <div className="space-y-1">
                      <h3 className="text-white font-bold text-lg">
                        {step.title}
                      </h3>
                      <h4 className="text-emerald-400 font-semibold text-base">
                        {step.subtitle}
                      </h4>
                      <p className="text-white/50 text-sm pt-2">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Arrow between cards */}
                {index < steps.length - 1 && (
                  <div className="absolute top-1/2 -right-3 lg:-right-5 transform -translate-y-1/2 z-10">
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-5 h-5 text-emerald-500/50" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Steps - Mobile vertical timeline */}
        <div className="md:hidden space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex gap-4">
                {/* Timeline line & number */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 z-10">
                    <span className="text-white font-black">{step.number}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-emerald-500/50 to-transparent mt-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-6">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <step.icon className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-sm">{step.title}</h3>
                        <h4 className="text-emerald-400 font-medium text-sm">{step.subtitle}</h4>
                      </div>
                    </div>
                    <p className="text-white/50 text-xs pl-13">
                      {step.description}
                    </p>
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
          className="mt-12 md:mt-16 text-center"
        >
          <motion.a
            href="#booking-flow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-shadow"
          >
            <span>Commencer ma réservation</span>
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
