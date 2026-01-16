import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { faqItems } from '../../data/salles/faq';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12 lg:mb-16 px-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-black text-white mb-4 md:mb-6">
            QUESTIONS <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">FRÉQUENTES</span>
          </h2>
          <p className="text-sm md:text-base lg:text-lg font-inter text-white/60">
            Tout ce que vous devez savoir sur nos salles
          </p>
        </motion.div>

        <div className="space-y-3 md:space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="bg-white/5 backdrop-blur-xl rounded-xl md:rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 flex items-start md:items-center justify-between gap-3 text-left"
              >
                <span className="text-white font-montserrat font-bold text-sm md:text-base lg:text-lg flex-1">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-white/60 flex-shrink-0" />
                </motion.div>
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-4 md:px-6 lg:px-8 pb-4 md:pb-5 lg:pb-6">
                  <p className="text-white/70 font-inter text-sm md:text-base leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
