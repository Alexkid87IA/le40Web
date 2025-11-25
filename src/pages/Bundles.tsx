import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Check, ArrowRight, Sparkles, TrendingDown } from 'lucide-react';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import { useShopifyCollection } from '../hooks/useShopifyCollection';
import { useUnifiedCart } from '../hooks/useUnifiedCart';
import type { ShopifyProduct } from '../lib/shopify';

export default function Bundles() {
  const { products: bundles, loading } = useShopifyCollection('bundles-packs');
  const { products: subscriptions } = useShopifyCollection('le-40-club');
  const { addShopifyItem, loading: cartLoading } = useUnifiedCart();
  const [selectedBundle, setSelectedBundle] = useState<ShopifyProduct | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = async (product: ShopifyProduct) => {
    const firstVariant = product.variants.edges[0]?.node;
    if (firstVariant && firstVariant.availableForSale) {
      await addShopifyItem({
        shopifyVariantId: firstVariant.id,
        productTitle: product.title,
        variantTitle: firstVariant.title,
        price: parseFloat(firstVariant.price.amount),
        quantity: 1,
        image: product.images.edges[0]?.node.url,
        availableForSale: firstVariant.availableForSale,
      });
    }
  };

  const getBundleSavings = (product: ShopifyProduct) => {
    const variant = product.variants.edges[0]?.node;
    if (!variant) return null;

    const price = parseFloat(variant.price.amount);
    const compareAtPrice = variant.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) : null;

    if (compareAtPrice && compareAtPrice > price) {
      const savings = compareAtPrice - price;
      const percent = Math.round((savings / compareAtPrice) * 100);
      return { amount: savings, percent };
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <HeaderNav />
      <MobileBurger />

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-6 py-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-8"
            >
              <Package className="w-4 h-4 text-violet-400 mr-2" />
              <span className="text-sm font-inter font-medium text-white/80 tracking-wide">BUNDLES & PACKS</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-montserrat font-black text-white mb-6">
              Économisez jusqu'à <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">30%</span>
            </h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Nos packs tout inclus combinent studio, services et expertise pour un tarif préférentiel
            </p>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <section className="mb-20">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-12"
                >
                  <Sparkles className="w-8 h-8 text-yellow-400 inline mr-3" />
                  Bundles Studio + Services
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {bundles.map((bundle, index) => {
                    const savings = getBundleSavings(bundle);
                    const variant = bundle.variants.edges[0]?.node;
                    const price = variant ? parseFloat(variant.price.amount) : 0;

                    return (
                      <motion.div
                        key={bundle.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500"
                      >
                        {savings && (
                          <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                            <TrendingDown className="w-4 h-4" />
                            Économisez {savings.amount}€
                          </div>
                        )}

                        {bundle.images.edges[0] && (
                          <div className="relative h-64 overflow-hidden">
                            <img
                              src={bundle.images.edges[0].node.url}
                              alt={bundle.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                          </div>
                        )}

                        <div className="p-8">
                          <h3 className="text-2xl font-montserrat font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-cyan-400 transition-all">
                            {bundle.title}
                          </h3>

                          <div
                            className="text-white/70 text-sm mb-6 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: bundle.description?.substring(0, 200) + '...' || '' }}
                          />

                          <div className="flex items-baseline gap-3 mb-6">
                            <span className="text-4xl font-bold text-white">{price}€</span>
                            {savings && (
                              <span className="text-xl text-white/40 line-through">
                                {variant?.compareAtPrice?.amount}€
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => handleAddToCart(bundle)}
                            disabled={cartLoading}
                            className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-bold py-4 rounded-xl hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-500 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                          >
                            {cartLoading ? (
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                              <>
                                <span>Ajouter au panier</span>
                                <ArrowRight className="w-5 h-5" />
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => setSelectedBundle(bundle)}
                            className="w-full mt-3 text-white/60 hover:text-white text-sm py-2 transition-colors"
                          >
                            Voir les détails →
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>

              <section>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-12"
                >
                  <Package className="w-8 h-8 text-violet-400 inline mr-3" />
                  Abonnements Le 40 Club
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {subscriptions.map((sub, index) => {
                    const variant = sub.variants.edges[0]?.node;
                    const price = variant ? parseFloat(variant.price.amount) : 0;
                    const isPopular = index === 1;

                    return (
                      <motion.div
                        key={sub.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative bg-white/5 backdrop-blur-xl rounded-3xl border overflow-hidden transition-all duration-500 ${
                          isPopular
                            ? 'border-violet-500/50 shadow-2xl shadow-violet-500/20 scale-105'
                            : 'border-white/10 hover:border-white/20'
                        }`}
                      >
                        {isPopular && (
                          <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-center py-2 text-sm font-bold">
                            PLUS POPULAIRE
                          </div>
                        )}

                        <div className={`p-8 ${isPopular ? 'pt-16' : ''}`}>
                          <h3 className="text-2xl font-montserrat font-bold text-white mb-2">
                            {sub.title.replace(' (Abonnement Mensuel)', '')}
                          </h3>
                          <p className="text-white/60 text-sm mb-6">Sans engagement</p>

                          <div className="mb-8">
                            <span className="text-5xl font-bold text-white">{price}€</span>
                            <span className="text-white/60">/mois</span>
                          </div>

                          <div
                            className="text-white/70 text-sm mb-8 space-y-2"
                            dangerouslySetInnerHTML={{ __html: sub.description?.substring(0, 300) + '...' || '' }}
                          />

                          <button
                            onClick={() => handleAddToCart(sub)}
                            disabled={cartLoading}
                            className={`w-full font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                              isPopular
                                ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-500 hover:to-fuchsia-500'
                                : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                          >
                            {cartLoading ? (
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                              <>
                                <span>S'abonner</span>
                                <ArrowRight className="w-5 h-5" />
                              </>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>

              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-20 bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-pink-600/20 rounded-3xl border border-white/10 p-12 text-center"
              >
                <Check className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
                <h3 className="text-3xl font-montserrat font-bold text-white mb-4">
                  Pourquoi choisir un pack ?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                  <div>
                    <div className="text-4xl font-bold text-emerald-400 mb-2">Jusqu'à 30%</div>
                    <div className="text-white/70">d'économie</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-cyan-400 mb-2">Tout inclus</div>
                    <div className="text-white/70">Service complet</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-violet-400 mb-2">Simplicité</div>
                    <div className="text-white/70">Un seul achat</div>
                  </div>
                </div>
              </motion.section>
            </>
          )}
        </div>
      </main>

      <Footer />

      {selectedBundle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedBundle(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
          >
            {selectedBundle.images.edges[0] && (
              <img
                src={selectedBundle.images.edges[0].node.url}
                alt={selectedBundle.title}
                className="w-full h-64 object-cover"
              />
            )}
            <div className="p-8">
              <h2 className="text-3xl font-montserrat font-bold text-white mb-6">
                {selectedBundle.title}
              </h2>
              <div
                className="text-white/70 leading-relaxed prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedBundle.description || '' }}
              />
              <button
                onClick={() => setSelectedBundle(null)}
                className="mt-8 w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-xl transition-colors"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
