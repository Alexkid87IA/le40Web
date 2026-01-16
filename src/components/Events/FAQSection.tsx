import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { eventsFAQ } from '../../data/events/faq';
import { useState } from 'react';

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-black via-slate-950 to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            transform: 'scaleY(-1)',
            filter: 'brightness(0.6)',
            playbackRate: 0.5
          }}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          ref={(video) => {
            if (video) {
              video.playbackRate = 0.5;
            }
          }}
        >
          <source
            src="https://le40-cdn.b-cdn.net/videos/hero/hero-background.mp4#t=0.1"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-slate-950/30 to-black/40" />
      </div>
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '30px 30px'
      }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 md:gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 md:px-6 py-2 md:py-3 mb-6 md:mb-8">
            <HelpCircle className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
            <span className="text-white/80 font-inter font-medium text-xs md:text-sm">Questions Fréquentes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-black text-white mb-4 md:mb-6">
            Vous Avez des{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-400">
              Questions ?
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 font-inter px-4">
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
                  className="w-full text-left relative bg-slate-950/50 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
          <div className="bg-slate-950/50 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-amber-500/5" />
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Vous ne trouvez pas votre réponse ?</h3>
              <p className="text-white/70 mb-6 font-inter text-sm md:text-base">
                Notre équipe est là pour vous aider. Contactez-nous directement !
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-amber-500 hover:from-cyan-400 hover:via-blue-400 hover:to-amber-400 text-white rounded-xl font-montserrat font-bold transition-all duration-300 shadow-lg text-sm md:text-base"
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
