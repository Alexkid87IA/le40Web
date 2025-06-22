import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

export default function CartButton() {
  const { itemCount, setIsOpen } = useCart();

  return (
    <motion.button
      onClick={() => setIsOpen(true)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 
                 border border-purple-500/30 flex items-center justify-center group
                 hover:border-purple-500/50 transition-all duration-300"
    >
      <ShoppingCart className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
      
      {/* Badge avec animation */}
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 
                       rounded-full flex items-center justify-center"
          >
            <span className="text-white text-xs font-bold">{itemCount}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Effet de brillance */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/0 via-purple-600/30 to-purple-600/0"
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