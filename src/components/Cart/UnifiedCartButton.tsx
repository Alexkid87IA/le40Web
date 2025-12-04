import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useUnifiedCart } from '../../hooks/useUnifiedCart';

interface UnifiedCartButtonProps {
  pathname?: string;
}

// Fonction pour obtenir les couleurs selon la page
const getCartColors = (pathname: string) => {
  const colorMap: Record<string, any> = {
    '/': {
      bg: 'from-orange-600/20 to-orange-700/20',
      border: 'border-orange-500/30',
      borderHover: 'hover:border-orange-500/50',
      icon: 'text-orange-400',
      iconHover: 'group-hover:text-orange-300',
      badge: 'from-orange-600 to-orange-700',
      badgeShadow: 'shadow-orange-500/50',
      shimmer: 'from-orange-600/0 via-orange-600/30 to-orange-600/0',
    },
    '/bureaux': {
      bg: 'from-blue-600/20 to-blue-700/20',
      border: 'border-blue-500/30',
      borderHover: 'hover:border-blue-500/50',
      icon: 'text-blue-400',
      iconHover: 'group-hover:text-blue-300',
      badge: 'from-blue-600 to-blue-700',
      badgeShadow: 'shadow-blue-500/50',
      shimmer: 'from-blue-600/0 via-blue-600/30 to-blue-600/0',
    },
    '/domiciliation': {
      bg: 'from-orange-600/20 to-orange-700/20',
      border: 'border-orange-500/30',
      borderHover: 'hover:border-orange-500/50',
      icon: 'text-orange-400',
      iconHover: 'group-hover:text-orange-300',
      badge: 'from-orange-600 to-orange-700',
      badgeShadow: 'shadow-orange-500/50',
      shimmer: 'from-orange-600/0 via-orange-600/30 to-orange-600/0',
    },
    '/salles': {
      bg: 'from-emerald-600/20 to-emerald-700/20',
      border: 'border-emerald-500/30',
      borderHover: 'hover:border-emerald-500/50',
      icon: 'text-emerald-400',
      iconHover: 'group-hover:text-emerald-300',
      badge: 'from-emerald-600 to-emerald-700',
      badgeShadow: 'shadow-emerald-500/50',
      shimmer: 'from-emerald-600/0 via-emerald-600/30 to-emerald-600/0',
    },
    '/studios': {
      bg: 'from-teal-600/20 to-teal-700/20',
      border: 'border-teal-500/30',
      borderHover: 'hover:border-teal-500/50',
      icon: 'text-teal-400',
      iconHover: 'group-hover:text-teal-300',
      badge: 'from-teal-600 to-teal-700',
      badgeShadow: 'shadow-teal-500/50',
      shimmer: 'from-teal-600/0 via-teal-600/30 to-teal-600/0',
    },
    '/bundles': {
      bg: 'from-amber-600/20 to-amber-700/20',
      border: 'border-amber-500/30',
      borderHover: 'hover:border-amber-500/50',
      icon: 'text-amber-400',
      iconHover: 'group-hover:text-amber-300',
      badge: 'from-amber-600 to-amber-700',
      badgeShadow: 'shadow-amber-500/50',
      shimmer: 'from-amber-600/0 via-amber-600/30 to-amber-600/0',
    },
    '/events': {
      bg: 'from-cyan-600/20 to-cyan-700/20',
      border: 'border-cyan-500/30',
      borderHover: 'hover:border-cyan-500/50',
      icon: 'text-cyan-400',
      iconHover: 'group-hover:text-cyan-300',
      badge: 'from-cyan-600 to-cyan-700',
      badgeShadow: 'shadow-cyan-500/50',
      shimmer: 'from-cyan-600/0 via-cyan-600/30 to-cyan-600/0',
    },
    '/experts': {
      bg: 'from-red-600/20 to-red-700/20',
      border: 'border-red-500/30',
      borderHover: 'hover:border-red-500/50',
      icon: 'text-red-400',
      iconHover: 'group-hover:text-red-300',
      badge: 'from-red-600 to-red-700',
      badgeShadow: 'shadow-red-500/50',
      shimmer: 'from-red-600/0 via-red-600/30 to-red-600/0',
    },
    '/contact': {
      bg: 'from-blue-600/20 to-blue-700/20',
      border: 'border-blue-500/30',
      borderHover: 'hover:border-blue-500/50',
      icon: 'text-blue-400',
      iconHover: 'group-hover:text-blue-300',
      badge: 'from-blue-600 to-blue-700',
      badgeShadow: 'shadow-blue-500/50',
      shimmer: 'from-blue-600/0 via-blue-600/30 to-blue-600/0',
    },
  };

  return colorMap[pathname] || colorMap['/'];
};

export default function UnifiedCartButton({ pathname = '' }: UnifiedCartButtonProps) {
  const { itemCount, setIsOpen } = useUnifiedCart();

  const colors = getCartColors(pathname);

  return (
    <motion.button
      onClick={() => setIsOpen(true)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.bg}
                 border ${colors.border} flex items-center justify-center group
                 ${colors.borderHover} transition-all duration-300`}
    >
      <ShoppingCart className={`w-6 h-6 ${colors.icon} ${colors.iconHover} transition-colors`} />

      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r ${colors.badge}
                       rounded-full flex items-center justify-center shadow-lg ${colors.badgeShadow}`}
          >
            <span className="text-white text-xs font-bold">{itemCount > 99 ? '99+' : itemCount}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${colors.shimmer}`}
        animate={{
          x: [-100, 100],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      />
    </motion.button>
  );
}
