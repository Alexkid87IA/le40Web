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
        gradient: 'from-amber-500 to-orange-500',
        shadow: 'shadow-orange-500/50',
        hoverShadow: 'hover:shadow-orange-500/50',
        border: 'border-orange-400/30',
        iconBg: 'text-orange-500',
        messageBg: 'bg-orange-500/10',
        textAccent: 'text-orange-100',
        ping: 'bg-orange-500',
        glow: 'group-hover:shadow-orange-500/40'
      };
    }

    if (path.includes('/bureaux')) {
      return {
        gradient: 'from-emerald-500 to-teal-500',
        shadow: 'shadow-emerald-500/50',
        hoverShadow: 'hover:shadow-emerald-500/50',
        border: 'border-emerald-400/30',
        iconBg: 'text-emerald-500',
        messageBg: 'bg-emerald-500/10',
        textAccent: 'text-emerald-100',
        ping: 'bg-emerald-500',
        glow: 'group-hover:shadow-emerald-500/40'
      };
    }

    if (path.includes('/coworking')) {
      return {
        gradient: 'from-cyan-500 via-blue-500 to-teal-500',
        shadow: 'shadow-cyan-500/50',
        hoverShadow: 'hover:shadow-cyan-500/50',
        border: 'border-cyan-400/30',
        iconBg: 'text-cyan-500',
        messageBg: 'bg-cyan-500/10',
        textAccent: 'text-cyan-100',
        ping: 'bg-cyan-500',
        glow: 'group-hover:shadow-cyan-500/40'
      };
    }

    if (path.includes('/studios')) {
      return {
        gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
        shadow: 'shadow-emerald-500/50',
        hoverShadow: 'hover:shadow-emerald-500/50',
        border: 'border-emerald-400/30',
        iconBg: 'text-emerald-500',
        messageBg: 'bg-emerald-500/10',
        textAccent: 'text-emerald-100',
        ping: 'bg-emerald-500',
        glow: 'group-hover:shadow-emerald-500/40'
      };
    }

    if (path.includes('/salles')) {
      return {
        gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
        shadow: 'shadow-emerald-500/50',
        hoverShadow: 'hover:shadow-teal-500/50',
        border: 'border-teal-400/30',
        iconBg: 'text-teal-500',
        messageBg: 'bg-teal-500/10',
        textAccent: 'text-teal-100',
        ping: 'bg-teal-500',
        glow: 'group-hover:shadow-teal-500/40'
      };
    }

    if (path.includes('/club')) {
      return {
        gradient: 'from-red-500 to-rose-500',
        shadow: 'shadow-red-500/50',
        hoverShadow: 'hover:shadow-rose-500/50',
        border: 'border-rose-400/30',
        iconBg: 'text-rose-500',
        messageBg: 'bg-rose-500/10',
        textAccent: 'text-rose-100',
        ping: 'bg-rose-500',
        glow: 'group-hover:shadow-rose-500/40'
      };
    }

    if (path.includes('/events') || path.includes('/evenements')) {
      return {
        gradient: 'from-cyan-500 to-blue-500',
        shadow: 'shadow-cyan-500/50',
        hoverShadow: 'hover:shadow-blue-500/50',
        border: 'border-blue-400/30',
        iconBg: 'text-blue-500',
        messageBg: 'bg-blue-500/10',
        textAccent: 'text-blue-100',
        ping: 'bg-blue-500',
        glow: 'group-hover:shadow-blue-500/40'
      };
    }

    if (path.includes('/contact')) {
      return {
        gradient: 'from-purple-500 to-pink-500',
        shadow: 'shadow-purple-500/50',
        hoverShadow: 'hover:shadow-pink-500/50',
        border: 'border-purple-400/30',
        iconBg: 'text-purple-500',
        messageBg: 'bg-purple-500/10',
        textAccent: 'text-purple-100',
        ping: 'bg-purple-500',
        glow: 'group-hover:shadow-purple-500/40'
      };
    }

    if (path.includes('/offres') || path.includes('/tarifs') || path.includes('/pricing')) {
      return {
        gradient: 'from-amber-500 to-orange-500',
        shadow: 'shadow-orange-500/50',
        hoverShadow: 'hover:shadow-orange-500/50',
        border: 'border-orange-400/30',
        iconBg: 'text-orange-500',
        messageBg: 'bg-orange-500/10',
        textAccent: 'text-orange-100',
        ping: 'bg-orange-500',
        glow: 'group-hover:shadow-orange-500/40'
      };
    }

    return {
      gradient: 'from-emerald-500 to-teal-500',
      shadow: 'shadow-emerald-500/50',
      hoverShadow: 'hover:shadow-teal-500/50',
      border: 'border-emerald-400/30',
      iconBg: 'text-emerald-500',
      messageBg: 'bg-emerald-500/10',
      textAccent: 'text-emerald-100',
      ping: 'bg-emerald-500',
      glow: 'group-hover:shadow-emerald-500/40'
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
            className="fixed bottom-20 right-6 z-[9998] w-72"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-white/20 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">WhatsApp</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-700 mb-4">
                  Une question ? Contactez-nous sur WhatsApp
                </p>
                <button
                  onClick={handleClick}
                  className="w-full py-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Démarrer la conversation
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
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] rounded-full shadow-lg flex items-center justify-center transition-colors group"
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
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
