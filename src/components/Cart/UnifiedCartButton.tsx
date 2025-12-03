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
      bg: 'from-emerald-600/20 to-emerald-700/20',
      border: 'border-emerald-500/30',
      borderHover: 'hover:border-emerald-500/50',
      icon: 'text-emerald-400',
      iconHover: 'group-hover:text-emerald-300',
      badge: 'from-emerald-600 to-emerald-700',
      badgeShadow: 'shadow-emerald-500/50',
      shimmer: 'from-emerald-600/0 via-emerald-600/30 to-emerald-600/0',
    },
    '/domiciliation': {
      bg: 'from-cyan-600/20 to-cyan-700/20',
      border: 'border-cyan-500/30',
      borderHover: 'hover:border-cyan-500/50',
      icon: 'text-cyan-400',
      iconHover: 'group-hover:text-cyan-300',
      badge: 'from-cyan-600 to-cyan-700',
      badgeShadow: 'shadow-cyan-500/50',
      shimmer: 'from-cyan-600/0 via-cyan-600/30 to-cyan-600/0',
    },
    '/salles': {
      bg: 'from-rose-600/20 to-rose-700/20',
      border: 'border-rose-500/30',
      borderHover: 'hover:border-rose-500/50',
      icon: 'text-rose-400',
      iconHover: 'group-hover:text-rose-300',
      badge: 'from-rose-600 to-rose-700',
      badgeShadow: 'shadow-rose-500/50',
      shimmer: 'from-rose-600/0 via-rose-600/30 to-rose-600/0',
    },
    '/studios': {
      bg: 'from-orange-600/20 to-orange-700/20',
      border: 'border-orange-500/30',
      borderHover: 'hover:border-orange-500/50',
      icon: 'text-orange-400',
      iconHover: 'group-hover:text-orange-300',
      badge: 'from-orange-600 to-orange-700',
      badgeShadow: 'shadow-orange-500/50',
      shimmer: 'from-orange-600/0 via-orange-600/30 to-orange-600/0',
    },
    '/bundles': {
      bg: 'from-purple-600/20 to-purple-700/20',
      border: 'border-purple-500/30',
      borderHover: 'hover:border-purple-500/50',
      icon: 'text-purple-400',
      iconHover: 'group-hover:text-purple-300',
      badge: 'from-purple-600 to-purple-700',
      badgeShadow: 'shadow-purple-500/50',
      shimmer: 'from-purple-600/0 via-purple-600/30 to-purple-600/0',
    },
    '/events': {
      bg: 'from-violet-600/20 to-violet-700/20',
      border: 'border-violet-500/30',
      borderHover: 'hover:border-violet-500/50',
      icon: 'text-violet-400',
      iconHover: 'group-hover:text-violet-300',
      badge: 'from-violet-600 to-violet-700',
      badgeShadow: 'shadow-violet-500/50',
      shimmer: 'from-violet-600/0 via-violet-600/30 to-violet-600/0',
    },
    '/experts': {
      bg: 'from-fuchsia-600/20 to-fuchsia-700/20',
      border: 'border-fuchsia-500/30',
      borderHover: 'hover:border-fuchsia-500/50',
      icon: 'text-fuchsia-400',
      iconHover: 'group-hover:text-fuchsia-300',
      badge: 'from-fuchsia-600 to-fuchsia-700',
      badgeShadow: 'shadow-fuchsia-500/50',
      shimmer: 'from-fuchsia-600/0 via-fuchsia-600/30 to-fuchsia-600/0',
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
