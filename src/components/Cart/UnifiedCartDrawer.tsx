import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, ArrowRight, Trash2, Clock, Calendar, Sparkles, Package, RefreshCw } from 'lucide-react';
import { useUnifiedCart } from '../../hooks/useUnifiedCart';
import { useNavigate } from 'react-router-dom';

export default function UnifiedCartDrawer() {
  const {
    isOpen,
    setIsOpen,
    items,
    removeItem,
    updateQuantity,
    totalPrice,
    calculateStudioTotal,
    loading,
    getCheckoutUrl,
  } = useUnifiedCart();

  const navigate = useNavigate();

  const localItems = items.filter(item => item.type === 'local');
  const shopifyItems = items.filter(item => item.type === 'shopify');
  const hasLocalItems = localItems.length > 0;
  const hasShopifyItems = shopifyItems.length > 0;

  const handleCheckout = () => {
    if (hasLocalItems && !hasShopifyItems) {
      navigate('/checkout');
      setIsOpen(false);
    } else if (hasShopifyItems && !hasLocalItems) {
      const checkoutUrl = getCheckoutUrl();
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } else {
      navigate('/checkout');
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-black/95 backdrop-blur-3xl
                       border-l border-white/10 z-[70] overflow-hidden flex flex-col"
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6 text-fuchsia-400" />
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

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <p className="text-white/60 font-inter mb-2">Votre panier est vide</p>
                  <p className="text-white/40 text-sm">Découvrez nos espaces et services</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {hasShopifyItems && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Store className="w-4 h-4 text-fuchsia-400" />
                        <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider">
                          Produits Boutique
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {shopifyItems.map((item) => (
                          <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10"
                          >
                            {item.image && (
                              <div className="relative h-32 overflow-hidden">
                                <img
                                  src={item.image}
                                  alt={item.productTitle}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                              </div>
                            )}

                            <div className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-montserrat font-semibold text-white text-sm">
                                      {item.productTitle}
                                    </h4>
                                    {item.productTitle.toLowerCase().includes('club') && (
                                      <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/30 rounded-full">
                                        <RefreshCw className="w-2.5 h-2.5 text-yellow-400" />
                                        <span className="text-yellow-400 text-[9px] font-semibold uppercase">Abonnement</span>
                                      </div>
                                    )}
                                    {(item.productTitle.toLowerCase().includes('bundle') || item.productTitle.toLowerCase().includes('pack')) && (
                                      <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-pink-500/20 border border-pink-500/30 rounded-full">
                                        <Package className="w-2.5 h-2.5 text-pink-400" />
                                        <span className="text-pink-400 text-[9px] font-semibold uppercase">Bundle</span>
                                      </div>
                                    )}
                                  </div>
                                  <p className="text-white/60 text-xs mt-1">{item.variantTitle}</p>
                                  {item.productTitle.toLowerCase().includes('club') && (
                                    <p className="text-yellow-400/80 text-[10px] mt-1 italic">
                                      Facturation mensuelle automatique
                                    </p>
                                  )}
                                </div>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  disabled={loading}
                                  className="text-red-400 hover:text-red-300 transition-colors ml-2"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>

                              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    disabled={loading}
                                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20
                                             flex items-center justify-center transition-colors text-white
                                             disabled:opacity-50"
                                  >
                                    -
                                  </button>
                                  <span className="text-white font-medium w-8 text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    disabled={loading}
                                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20
                                             flex items-center justify-center transition-colors text-white
                                             disabled:opacity-50"
                                  >
                                    +
                                  </button>
                                </div>
                                <p className="text-fuchsia-400 font-montserrat font-bold text-lg">
                                  {(item.price * item.quantity).toFixed(2)}€
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {hasLocalItems && (
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-4 h-4 text-violet-400" />
                        <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider">
                          Réservations Personnalisées
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {localItems.map((item) => {
                          const itemTotal = item.serviceType === 'studio' && item.studioConfig
                            ? calculateStudioTotal(item)
                            : item.price * item.quantity;

                          return (
                            <motion.div
                              key={item.id}
                              layout
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, x: -100 }}
                              className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10"
                            >
                              {item.image && (
                                <div className="relative h-32 overflow-hidden">
                                  <img
                                    src={item.image}
                                    alt={item.serviceName}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                  {item.gradient && (
                                    <div className={`absolute top-2 left-2 px-3 py-1 rounded-full bg-gradient-to-r ${item.gradient} text-white text-xs font-bold`}>
                                      {item.serviceType === 'studio' ? 'Studio' : 'Réservation'}
                                    </div>
                                  )}
                                </div>
                              )}

                              <div className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex-1">
                                    <h4 className="font-montserrat font-semibold text-white text-sm">
                                      {item.serviceName}
                                    </h4>
                                    {item.studioConfig ? (
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
                                      <>
                                        <p className="text-white/60 text-xs mt-1 flex items-center gap-1">
                                          <Calendar className="w-3 h-3" />
                                          {new Date(item.date).toLocaleDateString('fr-FR')}
                                        </p>
                                        {item.startTime && (
                                          <p className="text-white/60 text-xs flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {item.startTime} - {item.endTime}
                                          </p>
                                        )}
                                      </>
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
                                  <p className="text-fuchsia-400 font-montserrat font-bold text-lg">
                                    {itemTotal.toFixed(0)}€
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-black/50">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-white/60">Total</span>
                  <span className="text-3xl font-montserrat font-bold text-white">
                    {totalPrice.toFixed(2)}€
                  </span>
                </div>

                <motion.button
                  onClick={handleCheckout}
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500 rounded-2xl py-4
                           text-center font-montserrat font-semibold text-white flex items-center justify-center gap-2
                           disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <span>Procéder au paiement</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                {hasLocalItems && hasShopifyItems && (
                  <p className="text-white/40 text-xs text-center mt-3">
                    Vos réservations et produits seront traités ensemble
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
