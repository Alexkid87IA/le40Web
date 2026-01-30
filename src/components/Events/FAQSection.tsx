import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { eventsFAQ } from '../../data/events/faq';
import { useState } from 'react';

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Motif de points subtil */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '30px 30px'
      }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-sm font-medium text-cyan-400 mb-6"
          >
            QUESTIONS FRÉQUENTES
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-6">
            VOS{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-400">
              QUESTIONS
            </span>
          </h2>
          <p className="text-base md:text-lg text-white/60 font-inter">
            Trouvez rapidement les réponses à vos questions les plus courantes
          </p>
        </motion.div>

        <div className="space-y-4">
          {eventsFAQ.map((faq, index) => {
            const isOpen = openId === faq.id;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="group"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left relative bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-500/30 rounded-2xl p-5 md:p-6 transition-all duration-300 overflow-hidden"
                >
                  <div className="flex items-center justify-between gap-4 relative z-10">
                    <h3 className="text-base md:text-lg font-montserrat font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-white/60 group-hover:text-cyan-400 transition-colors duration-300" />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden relative z-10"
                      >
                        <div className="pt-4 border-t border-white/10 mt-4">
                          <p className="text-white/70 leading-relaxed font-inter text-sm md:text-base">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 md:mt-16 text-center"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8">
            <div>
              <h3 className="text-xl md:text-2xl font-montserrat font-bold text-white mb-3">Vous ne trouvez pas votre réponse ?</h3>
              <p className="text-white/70 mb-6 font-inter text-sm md:text-base">
                Notre équipe est là pour vous aider. Contactez-nous directement !
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-montserrat font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all"
              >
                Nous contacter
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
