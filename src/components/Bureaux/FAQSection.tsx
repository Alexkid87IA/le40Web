import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { bureauFAQ } from '../../data/bureaux/faq';

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Essentiel');
  const [showAll, setShowAll] = useState(false);

  const essentialQuestionIds = [1, 4, 7, 10, 13, 16];

  const categories = ['Essentiel', 'Toutes', ...Array.from(new Set(bureauFAQ.map(faq => faq.category)))];

  const filteredFAQ = bureauFAQ.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Toutes' ||
                           (activeCategory === 'Essentiel' ? essentialQuestionIds.includes(faq.id) : faq.category === activeCategory);
    return matchesSearch && matchesCategory;
  });

  const displayedFAQ = showAll || activeCategory !== 'Essentiel' ? filteredFAQ : filteredFAQ.slice(0, 6);

  return (
    <section className="py-32">
      <div className="max-w-4xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-6">
            VOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400">QUESTIONS</span>
          </h2>
          <p className="text-base md:text-lg font-inter text-white/60">
            Toutes les réponses pour prendre votre décision en toute sérénité
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
            <input
              type="text"
              placeholder="Rechercher une question..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 transition-all"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg font-inter text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="space-y-4">
          {displayedFAQ.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full p-6 flex items-center justify-between text-left group"
              >
                <div className="flex-1">
                  <div className="text-blue-400 text-xs font-semibold mb-1">{faq.category}</div>
                  <div className="text-white font-inter text-lg font-semibold group-hover:text-blue-400 transition-colors">
                    {faq.question}
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-4"
                >
                  <ChevronDown className="w-6 h-6 text-blue-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-white/80 font-inter leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {activeCategory === 'Essentiel' && !showAll && filteredFAQ.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-8"
          >
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-xl text-white font-inter font-semibold transition-all"
            >
              Voir plus de questions ({filteredFAQ.length - 6} autres)
            </button>
          </motion.div>
        )}

        {displayedFAQ.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-white/60 font-inter">
              Aucune question ne correspond à votre recherche.
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-2xl text-center"
        >
          <h3 className="text-lg md:text-xl font-montserrat font-bold text-white mb-4">
            Vous ne trouvez pas la réponse ?
          </h3>
          <p className="text-white/70 font-inter mb-6">
            Notre équipe est là pour répondre à toutes vos questions personnalisées
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-montserrat font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-600/30 transition-all"
          >
            Nous contacter
          </a>
        </motion.div>
      </div>
    </section>
  );
}
