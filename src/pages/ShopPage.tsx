import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Filter, X, Loader2, Package, Sparkles, Zap } from 'lucide-react';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import ProductCard from '../components/Shop/ProductCard';
import ProductModal from '../components/Shop/ProductModal';
import { useShopifyProducts } from '../hooks/useShopifyProducts';
import { ShopifyProduct } from '../lib/shopify';
import { useUnifiedCart } from '../hooks/useUnifiedCart';

export default function ShopPage() {
  const { products, loading, error } = useShopifyProducts();
  const { addShopifyItem, loading: cartLoading } = useUnifiedCart();
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

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

  const allCollections = Array.from(
    new Set(
      products.flatMap(p =>
        p.tags.filter(tag =>
          ['le-40-club', 'bundles-packs', 'services-additionnels', 'services-expert', 'services-premium'].some(c => tag.includes(c))
        )
      )
    )
  );

  const productTypes = Array.from(
    new Set(
      products.flatMap(p => {
        if (p.tags.some(t => t.includes('bundle') || t.includes('pack'))) return ['Bundle'];
        if (p.tags.some(t => t.includes('club') || t.includes('abonnement'))) return ['Abonnement'];
        if (p.tags.some(t => t.includes('studio'))) return ['Studio'];
        if (p.tags.some(t => t.includes('service'))) return ['Service'];
        return [];
      })
    )
  );

  const isNewProduct = (createdAt: string) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  const toggleCollection = (collection: string) => {
    setSelectedCollections(prev =>
      prev.includes(collection)
        ? prev.filter(c => c !== collection)
        : [...prev, collection]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const resetFilters = () => {
    setPriceFilter('all');
    setSelectedCollections([]);
    setSelectedTypes([]);
  };

  const filteredProducts = products.filter(product => {
    if (priceFilter !== 'all') {
      const price = parseFloat(product.priceRange.minVariantPrice.amount);
      if (priceFilter === 'low' && price >= 100) return false;
      if (priceFilter === 'medium' && (price < 100 || price >= 300)) return false;
      if (priceFilter === 'high' && price < 300) return false;
    }

    if (selectedCollections.length > 0) {
      const hasMatchingCollection = selectedCollections.some(col =>
        product.tags.some(tag => tag.includes(col))
      );
      if (!hasMatchingCollection) return false;
    }

    if (selectedTypes.length > 0) {
      let productType = '';
      if (product.tags.some(t => t.includes('bundle') || t.includes('pack'))) productType = 'Bundle';
      else if (product.tags.some(t => t.includes('club') || t.includes('abonnement'))) productType = 'Abonnement';
      else if (product.tags.some(t => t.includes('studio'))) productType = 'Studio';
      else if (product.tags.some(t => t.includes('service'))) productType = 'Service';

      if (!selectedTypes.includes(productType)) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <HeaderNav />
      <MobileBurger />

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <ShoppingBag className="w-12 h-12 text-violet-400" />
              <h1 className="text-5xl md:text-6xl font-montserrat font-black">
                La <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-violet-400">Boutique</span>
              </h1>
            </div>
            <p className="text-xl text-white/60 max-w-2xl">
              Découvrez nos espaces, services et produits. Réservez en ligne et profitez de notre écosystème entrepreneurial.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="md:w-64 flex-shrink-0"
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-montserrat font-bold text-lg flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filtres
                  </h3>
                  {(priceFilter !== 'all' || selectedCollections.length > 0 || selectedTypes.length > 0) && (
                    <button
                      onClick={resetFilters}
                      className="text-xs text-white/60 hover:text-white transition-colors"
                    >
                      Réinitialiser
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-white/80 mb-3">Type de produit</h4>
                    <div className="space-y-2">
                      {productTypes.map(type => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedTypes.includes(type)}
                            onChange={() => toggleType(type)}
                            className="w-4 h-4 accent-violet-500 rounded"
                          />
                          <span className="text-sm text-white/60 group-hover:text-white transition-colors">
                            {type}
                          </span>
                          {type === 'Bundle' && <Package className="w-3 h-3 text-pink-400" />}
                          {type === 'Abonnement' && <Sparkles className="w-3 h-3 text-yellow-400" />}
                        </label>
                      ))}
                    </div>
                  </div>

                  {allCollections.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-white/80 mb-3">Collections</h4>
                      <div className="space-y-2">
                        {allCollections.map(collection => (
                          <label key={collection} className="flex items-center gap-2 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={selectedCollections.includes(collection)}
                              onChange={() => toggleCollection(collection)}
                              className="w-4 h-4 accent-violet-500 rounded"
                            />
                            <span className="text-sm text-white/60 group-hover:text-white transition-colors capitalize">
                              {collection.replace(/-/g, ' ')}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-semibold text-white/80 mb-3">Prix</h4>
                    <div className="space-y-2">
                      {[
                        { id: 'all', label: 'Tous les prix' },
                        { id: 'low', label: 'Moins de 100€' },
                        { id: 'medium', label: '100€ - 300€' },
                        { id: 'high', label: 'Plus de 300€' }
                      ].map(option => (
                        <label key={option.id} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="radio"
                            name="price"
                            checked={priceFilter === option.id}
                            onChange={() => setPriceFilter(option.id as any)}
                            className="w-4 h-4 accent-violet-500"
                          />
                          <span className="text-sm text-white/60 group-hover:text-white transition-colors">
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex-1">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-12 h-12 text-violet-400 animate-spin" />
                </div>
              ) : error ? (
                <div className="text-center py-20">
                  <p className="text-red-400 mb-4">{error}</p>
                  <p className="text-white/60">Impossible de charger les produits</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingBag className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <p className="text-white/60">Aucun produit trouvé</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => {
                    const isNew = isNewProduct(product.createdAt);
                    const isBundle = product.tags.some(t => t.includes('bundle') || t.includes('pack'));
                    return (
                      <div key={product.id} className="relative">
                        {isNew && (
                          <div className="absolute -top-2 -right-2 z-10">
                            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                              <Zap className="w-3 h-3" />
                              NOUVEAU
                            </div>
                          </div>
                        )}
                        {isBundle && (
                          <div className="absolute -top-2 -left-2 z-10">
                            <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                              <Package className="w-3 h-3" />
                              PACK
                            </div>
                          </div>
                        )}
                        <ProductCard
                          product={product}
                          onQuickView={setSelectedProduct}
                          onAddToCart={handleAddToCart}
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {!loading && filteredProducts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 text-center text-white/40 text-sm"
                >
                  {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} disponible{filteredProducts.length > 1 ? 's' : ''}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
