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

    if (path.includes('/bureaux')) {
      return {
        gradient: 'from-emerald-600 to-teal-600',
        shadow: 'shadow-emerald-600/50',
        hoverShadow: 'hover:shadow-emerald-600/50',
        border: 'border-emerald-500/30',
        iconBg: 'text-emerald-600',
        messageBg: 'bg-emerald-500/10',
        textAccent: 'text-emerald-100',
        ping: 'bg-emerald-600'
      };
    }

    if (path.includes('/studios')) {
      return {
        gradient: 'from-purple-600 to-pink-600',
        shadow: 'shadow-purple-600/50',
        hoverShadow: 'hover:shadow-purple-600/50',
        border: 'border-purple-500/30',
        iconBg: 'text-purple-600',
        messageBg: 'bg-purple-500/10',
        textAccent: 'text-purple-100',
        ping: 'bg-purple-600'
      };
    }

    if (path.includes('/domiciliation')) {
      return {
        gradient: 'from-blue-600 to-cyan-600',
        shadow: 'shadow-blue-600/50',
        hoverShadow: 'hover:shadow-blue-600/50',
        border: 'border-blue-500/30',
        iconBg: 'text-blue-600',
        messageBg: 'bg-blue-500/10',
        textAccent: 'text-blue-100',
        ping: 'bg-blue-600'
      };
    }

    if (path.includes('/salles')) {
      return {
        gradient: 'from-orange-600 to-amber-600',
        shadow: 'shadow-orange-600/50',
        hoverShadow: 'hover:shadow-orange-600/50',
        border: 'border-orange-500/30',
        iconBg: 'text-orange-600',
        messageBg: 'bg-orange-500/10',
        textAccent: 'text-orange-100',
        ping: 'bg-orange-600'
      };
    }

    if (path.includes('/club')) {
      return {
        gradient: 'from-rose-600 to-pink-600',
        shadow: 'shadow-rose-600/50',
        hoverShadow: 'hover:shadow-rose-600/50',
        border: 'border-rose-500/30',
        iconBg: 'text-rose-600',
        messageBg: 'bg-rose-500/10',
        textAccent: 'text-rose-100',
        ping: 'bg-rose-600'
      };
    }

    return {
      gradient: 'from-emerald-600 to-teal-600',
      shadow: 'shadow-emerald-600/50',
      hoverShadow: 'hover:shadow-emerald-600/50',
      border: 'border-emerald-500/30',
      iconBg: 'text-emerald-600',
      messageBg: 'bg-emerald-500/10',
      textAccent: 'text-emerald-100',
      ping: 'bg-emerald-600'
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
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={`fixed bottom-24 right-6 z-[9998] w-80 bg-gradient-to-br from-slate-900 to-slate-800 border ${colors.border} rounded-2xl shadow-2xl overflow-hidden`}
          >
            <div className={`bg-gradient-to-r ${colors.gradient} p-4 flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <MessageCircle className={`w-6 h-6 ${colors.iconBg}`} />
                </div>
                <div>
                  <h3 className="text-white font-montserrat font-bold text-sm">Le 40 Coworking</h3>
                  <p className={`${colors.textAccent} text-xs`}>En ligne</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-6">
              <div className={`${colors.messageBg} rounded-xl p-4 mb-4`}>
                <p className="text-white text-sm font-inter mb-3">
                  👋 Bonjour ! Comment pouvons-nous vous aider aujourd'hui ?
                </p>
                <p className="text-white/60 text-xs">
                  Nous répondons généralement en quelques minutes
                </p>
              </div>

              <motion.button
                onClick={handleClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 bg-gradient-to-r ${colors.gradient} text-white font-montserrat font-semibold rounded-xl shadow-lg ${colors.hoverShadow} transition-all flex items-center justify-center gap-2`}
              >
                <MessageCircle className="w-5 h-5" />
                Démarrer la conversation
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-6 right-6 z-[9999] w-16 h-16 bg-gradient-to-r ${colors.gradient} rounded-full shadow-2xl ${colors.shadow} flex items-center justify-center group`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-7 h-7 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-7 h-7 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`absolute inset-0 ${colors.ping} rounded-full animate-ping opacity-20`}></div>
      </motion.button>
    </>
  );
}
