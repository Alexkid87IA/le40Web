import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { studioFAQ } from '../../data/studios/studioFAQ';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-32 bg-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute top-0 left-1/2 h-1/2 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <HelpCircle className="w-8 h-8 text-fuchsia-400" />
            <span className="text-fuchsia-400 font-montserrat font-medium text-sm tracking-wider uppercase">
              Questions fréquentes
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-montserrat font-black text-white mb-6">
            VOUS AVEZ DES
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-500 to-violet-400">
              QUESTIONS ?
            </span>
          </h2>
          <p className="text-xl md:text-2xl font-inter font-light text-white/60 max-w-3xl mx-auto">
            Trouvez toutes les réponses sur nos studios et services
          </p>
        </motion.div>

        <div className="space-y-4">
          {studioFAQ.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="relative group"
            >
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"
              />

              <div className="relative bg-zinc-900/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg md:text-xl font-montserrat font-bold text-white pr-8">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      openIndex === index
                        ? 'bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500'
                        : 'bg-white/10'
                    }`}
                  >
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-white" />
                    ) : (
                      <Plus className="w-5 h-5 text-white" />
                    )}
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6 pt-2">
                        <p className="text-white/70 font-inter leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 px-10 py-8 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-600 via-fuchsia-600 to-violet-600 flex items-center justify-center">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-montserrat font-bold text-white mb-1">
                  Vous ne trouvez pas votre réponse ?
                </h3>
                <p className="text-white/70 font-inter">
                  Notre équipe est là pour vous aider
                </p>
              </div>
            </div>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-rose-600 via-fuchsia-600 to-violet-600 text-white rounded-xl font-inter font-medium shadow-xl whitespace-nowrap"
            >
              Nous contacter
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
