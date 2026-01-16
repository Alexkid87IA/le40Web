import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useUnifiedCart } from '../../hooks/useUnifiedCart';

interface UnifiedCartButtonProps {
  pathname?: string;
}

// Couleurs par page
const pageColors: Record<string, {
  accent: string;
  border: string;
  borderHover: string;
  badge: string;
  glow: string;
}> = {
  '/': {
    accent: 'text-amber-400',
    border: 'border-amber-500/40',
    borderHover: 'hover:border-amber-400/60',
    badge: 'from-amber-500 to-orange-500',
    glow: 'shadow-amber-500/25',
  },
  '/bureaux': {
    accent: 'text-blue-400',
    border: 'border-blue-500/40',
    borderHover: 'hover:border-blue-400/60',
    badge: 'from-blue-500 to-indigo-500',
    glow: 'shadow-blue-500/25',
  },
  '/domiciliation': {
    accent: 'text-orange-400',
    border: 'border-orange-500/40',
    borderHover: 'hover:border-orange-400/60',
    badge: 'from-orange-500 to-amber-500',
    glow: 'shadow-orange-500/25',
  },
  '/salles': {
    accent: 'text-emerald-400',
    border: 'border-emerald-500/40',
    borderHover: 'hover:border-emerald-400/60',
    badge: 'from-emerald-500 to-teal-500',
    glow: 'shadow-emerald-500/25',
  },
  '/studios': {
    accent: 'text-teal-400',
    border: 'border-teal-500/40',
    borderHover: 'hover:border-teal-400/60',
    badge: 'from-teal-500 to-cyan-500',
    glow: 'shadow-teal-500/25',
  },
  '/events': {
    accent: 'text-cyan-400',
    border: 'border-cyan-500/40',
    borderHover: 'hover:border-cyan-400/60',
    badge: 'from-cyan-500 to-blue-500',
    glow: 'shadow-cyan-500/25',
  },
  '/club': {
    accent: 'text-rose-400',
    border: 'border-rose-500/40',
    borderHover: 'hover:border-rose-400/60',
    badge: 'from-rose-500 to-pink-500',
    glow: 'shadow-rose-500/25',
  },
  '/contact': {
    accent: 'text-blue-400',
    border: 'border-blue-500/40',
    borderHover: 'hover:border-blue-400/60',
    badge: 'from-blue-500 to-indigo-500',
    glow: 'shadow-blue-500/25',
  },
};

const getPageColors = (pathname: string) => {
  return pageColors[pathname] || pageColors['/'];
};

export default function UnifiedCartButton({ pathname = '/' }: UnifiedCartButtonProps) {
  const { itemCount, setIsOpen } = useUnifiedCart();
  const colors = getPageColors(pathname);

  const ariaLabel = itemCount > 0
    ? `Ouvrir le panier, ${itemCount} article${itemCount > 1 ? 's' : ''}`
    : 'Ouvrir le panier, panier vide';

  return (
    <motion.button
      onClick={() => setIsOpen(true)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative w-10 h-10 rounded-xl bg-white/[0.06] border ${colors.border} ${colors.borderHover} backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white/[0.1] hover:shadow-lg ${colors.glow}`}
      aria-label={ariaLabel}
      aria-haspopup="dialog"
    >
      <ShoppingCart className={`w-[18px] h-[18px] ${colors.accent} transition-colors duration-300`} />

      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className={`absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-gradient-to-r ${colors.badge} rounded-full flex items-center justify-center`}
          >
            <span className="text-white text-[10px] font-bold">{itemCount > 99 ? '99+' : itemCount}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
