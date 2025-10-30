import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const whatsappNumber = '33614315214';
  const defaultMessage = 'Bonjour, je souhaite obtenir des informations sur Le 40 Coworking.';

  const getColorScheme = () => {
    const path = location.pathname;

    if (path.includes('/domiciliation')) {
      return {
        bg: 'bg-gradient-to-r from-amber-500 to-orange-500',
        bgHover: 'hover:from-amber-600 hover:to-orange-600',
        text: 'text-white'
      };
    }

    if (path.includes('/bureaux')) {
      return {
        bg: 'bg-gradient-to-r from-emerald-600 to-teal-600',
        bgHover: 'hover:from-emerald-700 hover:to-teal-700',
        text: 'text-white'
      };
    }

    if (path.includes('/coworking')) {
      return {
        bg: 'bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600',
        bgHover: 'hover:from-cyan-700 hover:via-blue-700 hover:to-teal-700',
        text: 'text-white'
      };
    }

    if (path.includes('/studios')) {
      return {
        bg: 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600',
        bgHover: 'hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700',
        text: 'text-white'
      };
    }

    if (path.includes('/salles')) {
      return {
        bg: 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600',
        bgHover: 'hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700',
        text: 'text-white'
      };
    }

    if (path.includes('/club')) {
      return {
        bg: 'bg-gradient-to-r from-red-600 to-rose-600',
        bgHover: 'hover:from-red-700 hover:to-rose-700',
        text: 'text-white'
      };
    }

    if (path.includes('/events') || path.includes('/evenements')) {
      return {
        bg: 'bg-gradient-to-r from-cyan-600 to-blue-600',
        bgHover: 'hover:from-cyan-700 hover:to-blue-700',
        text: 'text-white'
      };
    }

    if (path.includes('/contact')) {
      return {
        bg: 'bg-gradient-to-r from-purple-600 to-pink-600',
        bgHover: 'hover:from-purple-700 hover:to-pink-700',
        text: 'text-white'
      };
    }

    if (path.includes('/offres') || path.includes('/tarifs') || path.includes('/pricing')) {
      return {
        bg: 'bg-gradient-to-r from-orange-400 to-orange-600',
        bgHover: 'hover:from-orange-500 hover:to-orange-700',
        text: 'text-white'
      };
    }

    return {
      bg: 'bg-gradient-to-r from-orange-500 to-orange-600',
      bgHover: 'hover:from-orange-600 hover:to-orange-700',
      text: 'text-white'
    };
  };

  const colors = getColorScheme();

  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-[9998] w-64"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
              <div className="p-3 flex items-center justify-between border-b border-gray-100">
                <span className="text-sm font-medium text-gray-900">Contactez-nous</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              <div className="p-3">
                <button
                  onClick={handleClick}
                  className={`w-full py-2.5 ${colors.bg} ${colors.bgHover} ${colors.text} text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2`}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 right-6 z-[9999] w-12 h-12 ${colors.bg} ${colors.bgHover} rounded-full shadow-lg flex items-center justify-center transition-all`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-5 h-5 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-5 h-5 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
