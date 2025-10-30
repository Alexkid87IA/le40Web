import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full shadow-lg shadow-violet-500/25 flex items-center justify-center text-white"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-40 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-violet-600 to-pink-600 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-violet-600 font-bold">40</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Le 40 Studio</p>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-white/90 text-xs">En ligne</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="bg-slate-800 rounded-lg p-3">
                <p className="text-white text-sm">
                  👋 Bonjour ! Comment pouvons-nous vous aider ?
                </p>
              </div>

              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-white transition-colors">
                  💬 Questions sur les studios
                </button>
                <button className="w-full text-left px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-white transition-colors">
                  📅 Disponibilités et réservation
                </button>
                <button className="w-full text-left px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-white transition-colors">
                  💰 Tarifs et formules
                </button>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <p className="text-slate-400 text-xs text-center mb-2">
                  Ou contactez-nous directement
                </p>
                <div className="flex gap-2">
                  <a
                    href="tel:04XXXXXXXX"
                    className="flex-1 px-3 py-2 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white text-sm font-semibold rounded-lg transition-all text-center"
                  >
                    Appeler
                  </a>
                  <a
                    href="mailto:contact@le40studio.fr"
                    className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold rounded-lg transition-all text-center"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
