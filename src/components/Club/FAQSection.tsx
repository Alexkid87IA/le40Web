import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { clubFAQ } from '../../data/club/faq';

const FAQItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-red-500/30 transition-all"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-bold text-white pr-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-400 group-hover:to-rose-400 transition-all">
            {faq.question}
          </h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0"
          >
            {isOpen ? (
              <Minus className="w-5 h-5 text-red-400" />
            ) : (
              <Plus className="w-5 h-5 text-white/40" />
            )}
          </motion.div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-white/70 leading-relaxed mt-4 pt-4 border-t border-white/10">
                {faq.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
};

export default function FAQSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-rose-600/20 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/20 text-sm font-medium text-red-400 mb-6"
          >
            QUESTIONS FRÉQUENTES
          </motion.span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-6">
            VOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-red-400">QUESTIONS</span>
          </h2>

          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto font-inter">
            Trouvez les réponses aux questions les plus fréquentes sur Le Club
          </p>
        </motion.div>

        <div className="space-y-4">
          {clubFAQ.map((faq, index) => (
            <FAQItem key={faq.id} faq={faq} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center p-8 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-3xl"
        >
          <h3 className="text-2xl font-bold text-white mb-3">
            Vous avez d'autres questions ?
          </h3>
          <p className="text-white/60 mb-6">
            Notre équipe est là pour répondre à toutes vos interrogations
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-red-500 to-rose-500 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-red-500/30 transition-all"
          >
            Contactez-nous
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
