import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../../data/studiosLaunch/config';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const halfLength = Math.ceil(faqs.length / 2);
  const firstColumn = faqs.slice(0, halfLength);
  const secondColumn = faqs.slice(halfLength);

  const FAQItem = ({ faq, index }: { faq: typeof faqs[0], index: number }) => {
    const isOpen = openIndex === index;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: (index % halfLength) * 0.05 }}
        className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
      >
        <button
          onClick={() => setOpenIndex(isOpen ? null : index)}
          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
        >
          <span className="text-white font-semibold pr-4">
            {faq.question}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-4">
                {faq.answer.split('\n').map((paragraph, i) => (
                  <p key={i} className="text-slate-300 mb-2 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Questions Fréquentes
          </h2>
          <p className="text-xl text-slate-400">
            Tout ce que vous devez savoir avant de réserver
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {firstColumn.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>
          <div className="space-y-4">
            {secondColumn.map((faq, index) => (
              <FAQItem key={index + halfLength} faq={faq} index={index + halfLength} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-slate-400 mb-4">
            Vous avez d'autres questions ?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:04XXXXXXXX"
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all"
            >
              Appelez-nous : 04 XX XX XX XX
            </a>
            <a
              href="mailto:contact@le40studio.fr"
              className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl transition-all"
            >
              contact@le40studio.fr
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
