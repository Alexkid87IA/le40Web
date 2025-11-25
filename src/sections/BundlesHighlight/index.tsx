import { motion } from 'framer-motion';
import { Package, ArrowRight, Sparkles, ShoppingCart, TrendingDown, Loader2 } from 'lucide-react';
import { useShopifyCollection } from '../../hooks/useShopifyCollection';
import { useUnifiedCart } from '../../hooks/useUnifiedCart';
import { useState } from 'react';
import { ShopifyProduct } from '../../lib/shopify';

export default function BundlesHighlightSection() {
  const { products: bundles, loading } = useShopifyCollection('bundles-packs');
  const { addShopifyItem } = useUnifiedCart();
  const [addingProductId, setAddingProductId] = useState<string | null>(null);

  const handleAddToCart = async (product: ShopifyProduct) => {
    setAddingProductId(product.id);
    try {
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
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAddingProductId(null);
    }
  };

  const calculateSavings = (price: number): string => {
    if (price > 1000) return 'Économisez 20%';
    if (price > 500) return 'Économisez 15%';
    return 'Économisez 10%';
  };

  if (loading || bundles.length === 0) {
    return null;
  }

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <Package className="w-8 h-8 text-pink-400" />
            <span className="text-pink-400 font-montserrat font-medium text-sm tracking-wider uppercase">
              Packs tout inclus
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-montserrat font-black text-white mb-6">
            ÉCONOMISEZ
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-500 to-pink-400">
              AVEC NOS BUNDLES
            </span>
          </h2>
          <p className="text-lg md:text-xl font-inter font-light text-white/60 max-w-3xl mx-auto">
            Combinaisons intelligentes pour maximiser votre productivité et réduire vos coûts
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
          {bundles.map((bundle, index) => {
            const price = parseFloat(bundle.priceRange.minVariantPrice.amount);
            const savings = calculateSavings(price);
            const isAdding = addingProductId === bundle.id;
            const image = bundle.images.edges[0]?.node.url;

            return (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="relative group"
              >
                <div className="absolute -top-3 -right-3 z-10">
                  <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-xl">
                    <TrendingDown className="w-3.5 h-3.5" />
                    {savings}
                  </div>
                </div>

                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative h-full"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600 rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500" />

                  <div className="relative bg-zinc-900/80 backdrop-blur-xl rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 group-hover:border-pink-500/30 transition-all duration-500 h-full flex flex-col">
                    {image && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={image}
                          alt={bundle.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
                      </div>
                    )}

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600 to-rose-600 flex items-center justify-center">
                          <Package className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-montserrat font-bold text-white line-clamp-2">
                            {bundle.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-white/70 font-inter text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                        {bundle.description.split('\n')[0] || 'Pack complet pour une productivité maximale'}
                      </p>

                      <div className="inline-flex items-baseline gap-2 mb-5 px-4 py-2 bg-gradient-to-r from-pink-600/10 to-rose-600/10 border border-pink-500/20 rounded-xl self-start">
                        <span className="text-2xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
                          {price.toFixed(0)}€
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => handleAddToCart(bundle)}
                          disabled={isAdding}
                          whileHover={{ scale: isAdding ? 1 : 1.02 }}
                          whileTap={{ scale: isAdding ? 1 : 0.98 }}
                          className={`flex-1 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl font-inter font-medium text-sm shadow-lg flex items-center justify-center gap-2 transition-opacity ${
                            isAdding ? 'opacity-70 cursor-not-allowed' : ''
                          }`}
                        >
                          {isAdding ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Ajout...</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4" />
                              <span>Ajouter</span>
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center"
        >
          <motion.a
            href="/bundles"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600 text-white rounded-xl font-montserrat font-bold text-lg shadow-2xl group"
          >
            <Sparkles className="w-5 h-5" />
            <span>Voir tous les packs</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
