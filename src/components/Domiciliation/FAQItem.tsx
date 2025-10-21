import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FAQItem as FAQItemType } from '../../data/domiciliation/faq';

interface FAQItemProps {
  item: FAQItemType;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FAQItem({ item, index, isOpen, onToggle }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <span className="text-lg font-semibold text-white pr-4">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-orange-400 shrink-0" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 text-white/70">
              <p className="mb-4">{item.answer}</p>
              {item.highlight && (
                <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                  <p className="text-sm text-orange-400 font-semibold mb-2">
                    {item.hasVideo ? '🎥 ' : ''}
                    {item.highlight}
                  </p>
                  <button className="text-sm text-white underline hover:text-orange-400">
                    {item.hasVideo ? 'Voir la vidéo du process (30 sec)' : 'En savoir plus →'}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
