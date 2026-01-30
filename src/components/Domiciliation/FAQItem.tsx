import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Play, ArrowRight } from 'lucide-react';
import { FAQItem as FAQItemType } from '../../data/domiciliation/faq';

interface FAQItemProps {
  item: FAQItemType;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem = memo<FAQItemProps>(function FAQItem({ item, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className={`relative bg-white/5 backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-500 ${
        isOpen ? 'border-orange-500/30' : 'border-white/10 group-hover:border-white/[0.15]'
      }`}>
        <motion.button
          onClick={onToggle}
          className="w-full p-6 lg:p-7 text-left flex items-center justify-between group/button"
          whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
          transition={{ duration: 0.3 }}
          aria-expanded={isOpen}
          aria-controls={`faq-content-${index}`}
          aria-label={`Question ${index + 1}: ${item.question}`}
        >
          <div className="flex items-start gap-4 flex-1 pr-4">
            <motion.div
              animate={{
                backgroundColor: isOpen ? 'rgba(249, 115, 22, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                scale: isOpen ? 1.05 : 1
              }}
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-white/10"
            >
              <span className={`text-sm font-bold font-montserrat transition-colors ${
                isOpen ? 'text-orange-400' : 'text-white/60 group-hover/button:text-white/60'
              }`}>
                {(index + 1).toString().padStart(2, '0')}
              </span>
            </motion.div>
            <span className={`text-lg font-semibold font-montserrat transition-colors ${
              isOpen ? 'text-white' : 'text-white/90 group-hover/button:text-white'
            }`}>
              {item.question}
            </span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0"
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 ${
              isOpen
                ? 'bg-orange-500/20 border-orange-500/30'
                : 'bg-white/[0.03] border-white/10 group-hover/button:bg-white/[0.06]'
            }`}>
              <ChevronDown className={`w-5 h-5 transition-colors ${
                isOpen ? 'text-orange-400' : 'text-white/60'
              }`} />
            </div>
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id={`faq-content-${index}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              role="region"
              aria-labelledby={`faq-button-${index}`}
            >
              <div className="px-6 lg:px-7 pb-6 lg:pb-7">
                <div className="ml-12">
                  <motion.p
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="text-white/70 font-inter leading-relaxed mb-4"
                  >
                    {item.answer}
                  </motion.p>
                  {item.highlight && (
                    <motion.div
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="p-5 bg-gradient-to-br from-orange-950/30 to-orange-950/10 border border-orange-500/20 rounded-xl relative overflow-hidden group/highlight"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 group-hover/highlight:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative flex items-start gap-3 mb-3">
                        {item.hasVideo && (
                          <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center shrink-0">
                            <Play className="w-4 h-4 text-orange-400" />
                          </div>
                        )}
                        <p className="text-sm text-orange-400 font-semibold font-montserrat flex-1">
                          {item.highlight}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="relative flex items-center gap-2 text-sm text-white font-inter group/link"
                      >
                        <span className="group-hover/link:text-orange-400 transition-colors">
                          {item.hasVideo ? 'Voir la vidéo du process (30 sec)' : 'En savoir plus'}
                        </span>
                        <ArrowRight className="w-4 h-4 text-orange-400" />
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});

export default FAQItem;
