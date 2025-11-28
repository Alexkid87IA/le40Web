import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';
import { useUnifiedCart } from '../../hooks/useUnifiedCart';

interface AddToCartButtonProps {
  item: {
    id: string;
    name: string;
    price: number;
    type: 'coworking' | 'meeting-room' | 'studio' | 'private-office' | 'domiciliation';
    duration?: 'hour' | 'half-day' | 'day' | 'week' | 'month';
    description?: string;
  };
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  className?: string;
}

export default function AddToCartButton({ item, variant = 'primary', fullWidth = true, className = '' }: AddToCartButtonProps) {
  const { addLocalItem, setIsOpen } = useUnifiedCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addLocalItem({
      serviceType: item.type,
      serviceName: item.name,
      date: new Date().toISOString(),
      duration: item.duration || 'day',
      price: item.price,
      quantity: 1
    });

    // Animation de confirmation
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const baseStyles = `
    ${fullWidth ? 'w-full' : 'inline-flex'} 
    py-4 px-6 rounded-2xl font-montserrat font-semibold 
    text-center transition-all duration-300 
    flex items-center justify-center gap-2
  `;

  const variantStyles = {
    primary: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/25',
    secondary: 'bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 border border-purple-500/30'
  };

  return (
    <motion.button
      onClick={handleAddToCart}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      <AnimatePresence mode="wait">
        {isAdded ? (
          <motion.span
            key="added"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            Ajouté au panier !
          </motion.span>
        ) : (
          <motion.span
            key="add"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Ajouter au panier
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}