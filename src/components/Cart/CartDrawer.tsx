import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, ArrowRight, Trash2, Clock } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { isOpen, setIsOpen, items, removeItem, updateQuantity, totalPrice, calculateStudioTotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-black/95 backdrop-blur-3xl 
                       border-l border-white/10 z-[70] overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6 text-purple-400" />
                  <h2 className="text-2xl font-montserrat font-bold text-white">Votre panier</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 
                           flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <p className="text-white/60 font-inter">Votre panier est vide</p>
                  <Link
                    to="/reservation"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-2 mt-6 text-purple-400 
                             hover:text-purple-300 transition-colors"
                  >
                    Découvrir nos services
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => {
                    const isStudio = item.serviceType === 'studio' && item.studioConfig;
                    const itemTotal = isStudio ? calculateStudioTotal(item) : item.price * item.quantity;

                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10"
                      >
                        {isStudio && item.image && (
                          <div className="relative h-32 overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.serviceName}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            {item.gradient && (
                              <div className={`absolute top-2 left-2 px-3 py-1 rounded-full bg-gradient-to-r ${item.gradient} text-white text-xs font-bold`}>
                                Studio
                              </div>
                            )}
                          </div>
                        )}

                        <div className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-montserrat font-semibold text-white">
                                {item.serviceName}
                              </h3>
                              {isStudio && item.studioConfig ? (
                                <div className="space-y-1 mt-2">
                                  <p className="text-white/60 text-xs flex items-center gap-1.5">
                                    <Clock className="w-3 h-3" />
                                    {item.studioConfig.formulaName} • {item.studioConfig.durationLabel}
                                  </p>
                                  {item.studioConfig.options.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {item.studioConfig.options.map((option) => (
                                        <span
                                          key={option.id}
                                          className="text-[10px] px-2 py-0.5 bg-white/10 rounded-full text-white/70"
                                        >
                                          {option.name}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <p className="text-white/60 text-sm mt-1">
                                  {new Date(item.date).toLocaleDateString('fr-FR')}
                                  {item.startTime && ` • ${item.startTime} - ${item.endTime}`}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-400 hover:text-red-300 transition-colors ml-2"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-white/10">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20
                                         flex items-center justify-center transition-colors text-white"
                              >
                                -
                              </button>
                              <span className="text-white font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20
                                         flex items-center justify-center transition-colors text-white"
                              >
                                +
                              </button>
                            </div>
                            <div className="text-right">
                              <p className="text-fuchsia-400 font-montserrat font-bold text-lg">
                                {(itemTotal * 1.20).toFixed(0)}€
                              </p>
                              {isStudio && item.studioConfig && item.studioConfig.options.length > 0 && (
                                <p className="text-white/40 text-xs">
                                  +{(item.studioConfig.options.reduce((sum, opt) => sum + opt.price, 0) * 1.20).toFixed(0)}€ options
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer avec total et CTA */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-white/60">Total TTC</span>
                  <span className="text-3xl font-montserrat font-bold text-white">
                    {(totalPrice * 1.20).toFixed(2)}€
                  </span>
                </div>

                <Link
                  to="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500 rounded-2xl py-4
                             text-center font-montserrat font-semibold text-white flex items-center justify-center gap-2"
                  >
                    <span>Procéder au paiement</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}