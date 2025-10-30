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
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-[9998] w-80"
          >
            <div className={`absolute -inset-1 bg-gradient-to-r ${colors.gradient} rounded-2xl blur-xl opacity-40`}></div>
            <div className={`relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-2 ${colors.border} rounded-2xl shadow-2xl overflow-hidden`}>
              <div className={`bg-gradient-to-r ${colors.gradient} p-4 flex items-center justify-between relative`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} rounded-full blur-md opacity-50`}></div>
                    <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <MessageCircle className={`w-6 h-6 ${colors.iconBg}`} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-montserrat font-bold text-sm">Le 40 Coworking</h3>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 ${colors.ping} rounded-full animate-pulse`}></div>
                      <p className="text-white/90 text-xs">En ligne</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="relative z-10 p-1.5 hover:bg-white/20 rounded-lg transition-all duration-200"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="p-6 relative">
                <div className={`${colors.messageBg} backdrop-blur-sm rounded-xl p-4 mb-4 border ${colors.border}`}>
                  <p className="text-white text-sm font-inter mb-3">
                    👋 Bonjour ! Comment pouvons-nous vous aider aujourd'hui ?
                  </p>
                  <p className="text-white/60 text-xs">
                    Nous répondons généralement en quelques minutes
                  </p>
                </div>

                <motion.button
                  onClick={handleClick}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative w-full py-3.5 bg-gradient-to-r ${colors.gradient} text-white font-montserrat font-semibold rounded-xl shadow-lg hover:shadow-xl ${colors.hoverShadow} transition-all flex items-center justify-center gap-2 overflow-hidden group`}
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
                  <MessageCircle className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Démarrer la conversation</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.15, rotate: isOpen ? 90 : 0 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-[9999] w-16 h-16 group"
      >
        <div className={`absolute -inset-2 bg-gradient-to-r ${colors.gradient} rounded-full blur-xl opacity-60 group-hover:opacity-80 ${colors.glow} transition-all duration-300`}></div>

        <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} rounded-full animate-ping opacity-20`}></div>

        <div className={`relative w-full h-full bg-gradient-to-br ${colors.gradient} rounded-full shadow-2xl ${colors.shadow} flex items-center justify-center overflow-hidden`}>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>

          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative z-10"
              >
                <X className="w-7 h-7 text-white drop-shadow-lg" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative z-10"
              >
                <MessageCircle className="w-7 h-7 text-white drop-shadow-lg" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </>
  );
}
