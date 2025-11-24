import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useUnifiedCart } from '../../hooks/useUnifiedCart';

export default function UnifiedCartButton() {
  const { itemCount, setIsOpen } = useUnifiedCart();

  return (
    <motion.button
      onClick={() => setIsOpen(true)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-600/20 to-violet-600/20
                 border border-fuchsia-500/30 flex items-center justify-center group
                 hover:border-fuchsia-500/50 transition-all duration-300"
    >
      <ShoppingCart className="w-6 h-6 text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors" />

      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-fuchsia-600 to-violet-600
                       rounded-full flex items-center justify-center shadow-lg shadow-fuchsia-500/50"
          >
            <span className="text-white text-xs font-bold">{itemCount > 99 ? '99+' : itemCount}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-fuchsia-600/0 via-fuchsia-600/30 to-fuchsia-600/0"
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
