import { motion, useScroll, useTransform } from 'framer-motion';
import { Check, ArrowRight, FileCheck, Send, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import SectionHeader from './SectionHeader';

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.98]);

  const steps = [
    {
      number: '01',
      icon: Sparkles,
      duration: '5 minutes',
      title: 'Choisissez',
      subtitle: 'Choisissez votre formule',
      description: 'Sélectionnez l\'offre adaptée à vos besoins. Paiement sécurisé par CB ou virement.',
      color: 'orange',
      gradient: 'from-orange-500 to-orange-600',
      glowColor: 'rgba(249, 115, 22, 0.3)'
    },
    {
      number: '02',
      icon: Send,
      duration: '2 heures',
      title: 'Documents',
      subtitle: 'Envoyez vos documents',
      description: 'Par email',
      items: ['Photo pièce d\'identité', 'Kbis (si déjà créé) ou récépissé', 'Justificatif domicile perso'],
      color: 'orange',
      gradient: 'from-orange-500 to-orange-600',
      glowColor: 'rgba(249, 115, 22, 0.3)'
    },
    {
      number: '03',
      icon: FileCheck,
      duration: '24 heures',
      title: 'Activation',
      subtitle: 'C\'est opérationnel !',
      description: 'Tout est prêt',
      items: ['Adresse opérationnelle', 'Courrier réceptionné dès J+1', 'Téléphone activé', 'Attestation envoyée'],
      color: 'green',
      gradient: 'from-orange-500 to-orange-600',
      glowColor: 'rgba(34, 197, 94, 0.3)'
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }}></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] bg-orange-500/10"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div style={{ opacity, scale }} className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <SectionHeader
          title="Opérationnel en"
          highlightedText="3 étapes"
          subtitle="(on s'occupe du reste)"
          className="mb-10 md:mb-16 lg:mb-20"
        />

        <div className="relative">
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/40 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 xl:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="relative group"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="relative h-full"
                >
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative p-6 md:p-8 lg:p-10 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/[0.08] group-hover:border-white/[0.15] transition-all duration-500 h-full">
                    <motion.div
                      className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700"
                      style={{ backgroundColor: step.glowColor }}
                    />

                    <div className="relative">
                      <div className="flex items-start justify-between mb-6 md:mb-8">
                        <div className="flex items-center gap-4">
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className={`w-12 md:w-16 h-12 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-xl`}
                            style={{
                              boxShadow: `0 8px 32px ${step.glowColor}`
                            }}
                          >
                            <step.icon className="w-6 md:w-8 h-6 md:h-8 text-white" />
                          </motion.div>

                          <div>
                            <div className={`text-xs font-montserrat font-bold tracking-wider mb-1 ${
                              step.color === 'green' ? 'text-orange-400' : 'text-orange-400'
                            }`}>
                              {step.duration.toUpperCase()}
                            </div>
                            <div className="text-white/90 font-montserrat font-bold text-base md:text-lg">
                              {step.title}
                            </div>
                          </div>
                        </div>

                        <div className="text-4xl md:text-6xl font-black text-white/[0.03] font-montserrat">
                          {step.number}
                        </div>
                      </div>

                      <div className="mb-4 md:mb-6">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 font-montserrat">
                          {step.subtitle}
                        </h3>
                        <p className="text-white/60 font-inter text-sm md:text-base leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      {step.items && (
                        <ul className="space-y-2 md:space-y-3">
                          {step.items.map((item, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.2 + i * 0.1, duration: 0.5 }}
                              className="flex items-start gap-3 group/item"
                            >
                              <motion.div
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                transition={{ duration: 0.3 }}
                                className={`shrink-0 mt-0.5 ${
                                  step.color === 'green' ? 'text-orange-400' : 'text-orange-400'
                                }`}
                              >
                                <Check className="w-5 h-5" />
                              </motion.div>
                              <span className="text-white/70 group-hover/item:text-white/90 transition-colors font-inter text-sm md:text-base leading-relaxed">
                                {item}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      )}

                      {index < steps.length - 1 && (
                        <div className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 z-10">
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="w-12 h-12 rounded-full bg-zinc-800/50 backdrop-blur-sm border border-white/10 flex items-center justify-center"
                          >
                            <ArrowRight className="w-5 h-5 text-orange-400" />
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 md:mt-16 lg:mt-20 text-center"
        >
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-2 md:gap-3 px-6 md:px-10 py-3 md:py-5 bg-white text-black rounded-lg md:rounded-xl font-bold text-sm md:text-lg overflow-hidden shadow-2xl"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="relative z-10 font-montserrat group-hover:text-white transition-colors text-sm md:text-base">
              Démarrer maintenant
            </span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <ArrowRight className="w-5 md:w-6 h-5 md:h-6 group-hover:text-white transition-colors" />
            </motion.div>
          </motion.a>

          <p className="mt-4 md:mt-6 text-white/60 text-xs md:text-sm font-inter">
            Activation garantie sous 24h • Sans engagement
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
