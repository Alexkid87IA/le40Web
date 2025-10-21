import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import SectionHeader from './SectionHeader';
import FAQItem from './FAQItem';
import { faqItems } from '../../data/domiciliation/faq';

export default function FAQSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="relative py-32 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }}></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 right-1/3 w-96 h-96 rounded-full blur-[120px] bg-orange-500/8"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 60, 0],
            y: [0, -40, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 sm:px-8">
        <SectionHeader
          title="Les vraies questions"
          highlightedText="sur nos services"
          className="mb-12"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="relative group">
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-orange-500/20 via-orange-500/10 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur"></div>

            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.4, 0.6, 0.4]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Search className="w-5 h-5 text-orange-400" />
                </motion.div>
              </div>
              <input
                type="text"
                placeholder="Rechercher dans la FAQ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-5 py-5 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-orange-400/50 transition-all duration-300 font-inter"
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 flex items-center gap-2 text-sm text-white/40 font-inter"
          >
            <Sparkles className="w-4 h-4" />
            <span>{faqItems.length} questions fréquentes</span>
          </motion.div>
        </motion.div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isOpen={openFaqIndex === index}
              onToggle={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center gap-4 p-8 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl rounded-2xl border border-white/[0.08]">
            <div className="text-white/60 font-inter">
              Vous ne trouvez pas votre réponse ?
            </div>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl font-montserrat shadow-lg hover:shadow-orange-500/25 transition-shadow"
            >
              Contactez-nous
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
