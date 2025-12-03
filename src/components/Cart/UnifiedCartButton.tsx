import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useUnifiedCart } from '../../hooks/useUnifiedCart';

interface UnifiedCartButtonProps {
  pathname?: string;
}

export default function UnifiedCartButton({ pathname = '' }: UnifiedCartButtonProps) {
  const { itemCount, setIsOpen } = useUnifiedCart();

  const isHome = pathname === '/';

  const colors = isHome
    ? {
        bg: 'from-orange-600/20 to-orange-700/20',
        border: 'border-orange-500/30',
        borderHover: 'hover:border-orange-500/50',
        icon: 'text-orange-400',
        iconHover: 'group-hover:text-orange-300',
        badge: 'from-orange-600 to-orange-700',
        badgeShadow: 'shadow-orange-500/50',
        shimmer: 'from-orange-600/0 via-orange-600/30 to-orange-600/0',
      }
    : {
        bg: 'from-fuchsia-600/20 to-violet-600/20',
        border: 'border-fuchsia-500/30',
        borderHover: 'hover:border-fuchsia-500/50',
        icon: 'text-fuchsia-400',
        iconHover: 'group-hover:text-fuchsia-300',
        badge: 'from-fuchsia-600 to-violet-600',
        badgeShadow: 'shadow-fuchsia-500/50',
        shimmer: 'from-fuchsia-600/0 via-fuchsia-600/30 to-fuchsia-600/0',
      };

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
