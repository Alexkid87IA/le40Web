import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Store, Star } from 'lucide-react';
import { useUnifiedCart } from '../hooks/useUnifiedCart';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import { motion } from 'framer-motion';

export default function UnifiedCheckout() {
  const { items, getCheckoutUrl, loading } = useUnifiedCart();
  const navigate = useNavigate();

  const localItems = items.filter(item => item.type === 'local');
  const shopifyItems = items.filter(item => item.type === 'shopify');
  const hasLocalItems = localItems.length > 0;
  const hasShopifyItems = shopifyItems.length > 0;

  useEffect(() => {
    if (items.length === 0) {
      navigate('/boutique');
      return;
    }

    if (hasShopifyItems && !hasLocalItems) {
      const checkoutUrl = getCheckoutUrl();
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        navigate('/boutique');
      }
    } else if (hasLocalItems && !hasShopifyItems) {
      navigate('/checkout');
    }
  }, [items.length, hasLocalItems, hasShopifyItems, getCheckoutUrl, navigate]);

  if (hasLocalItems && hasShopifyItems) {
    return (
      <div className="min-h-screen bg-black text-white">
        <HeaderNav />
        <MobileBurger />

        <main className="pt-24 pb-20 px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-montserrat font-black text-white mb-4">
                Votre panier contient <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-violet-400">deux types</span> d'articles
              </h1>
              <p className="text-xl text-white/60">Choisissez comment procéder au paiement</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                onClick={() => navigate('/checkout')}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-violet-500/50
                           cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20
                               rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <Star className="w-8 h-8 text-violet-400" />
                </div>

                <h3 className="text-xl font-montserrat font-bold text-white mb-3 text-center">
                  Réservations personnalisées
                </h3>
                <p className="text-white/60 text-sm text-center mb-4">
                  {localItems.length} article{localItems.length > 1 ? 's' : ''}
                </p>
                <p className="text-white/40 text-xs text-center">
                  Complétez votre réservation avec dates et horaires précis
                </p>

                <div className="mt-6 text-center">
                  <button className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl
                                   font-semibold hover:from-violet-500 hover:to-fuchsia-500 transition-all">
                    Continuer
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                onClick={() => {
                  const checkoutUrl = getCheckoutUrl();
                  if (checkoutUrl) {
                    window.location.href = checkoutUrl;
                  }
                }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-fuchsia-500/50
                           cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-fuchsia-600/20 to-rose-600/20
                               rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <Store className="w-8 h-8 text-fuchsia-400" />
                </div>

                <h3 className="text-xl font-montserrat font-bold text-white mb-3 text-center">
                  Produits boutique
                </h3>
                <p className="text-white/60 text-sm text-center mb-4">
                  {shopifyItems.length} article{shopifyItems.length > 1 ? 's' : ''}
                </p>
                <p className="text-white/40 text-xs text-center">
                  Paiement sécurisé via Shopify
                </p>

                <div className="mt-6 text-center">
                  <button className="px-6 py-3 bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white rounded-xl
                                   font-semibold hover:from-fuchsia-500 hover:to-rose-500 transition-all">
                    Continuer
                  </button>
                </div>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center text-white/40 text-sm mt-8"
            >
              Vous pouvez traiter vos réservations et produits séparément ou en une seule fois
            </motion.p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-fuchsia-400 animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">Redirection en cours...</h2>
        <p className="text-white/60">Préparation de votre commande</p>
      </div>
    </div>
  );
}
