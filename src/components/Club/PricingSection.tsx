import { motion } from 'framer-motion';
import { Check, Crown, Sparkles, ArrowRight, Loader2, ShoppingCart } from 'lucide-react';
import { useShopifyCollection } from '../../hooks/useShopifyCollection';
import { useUnifiedCart } from '../../hooks/useUnifiedCart';
import { useState } from 'react';
import { ShopifyProduct } from '../../lib/shopify';

interface PricingCardProps {
  product: ShopifyProduct;
  index: number;
  isPopular: boolean;
  onAddToCart: (productId: string) => void;
  isAdding: boolean;
}

const PricingCard = ({ product, index, isPopular, onAddToCart, isAdding }: PricingCardProps) => {
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const gradient = isPopular
    ? 'from-emerald-500 to-teal-500'
    : index === 0
    ? 'from-red-500 to-rose-500'
    : 'from-orange-500 to-amber-500';

  const extractFeatures = (description: string): string[] => {
    const features: string[] = [];
    const lines = description.split('\n').filter(line => line.trim());

    lines.forEach(line => {
      if (line.includes('•') || line.includes('-') || line.includes('✓')) {
        const cleaned = line.replace(/[•\-✓]/g, '').trim();
        if (cleaned && !cleaned.toLowerCase().includes('description')) {
          features.push(cleaned);
        }
      }
    });

    return features.length > 0 ? features : [
      'Accès coworking',
      'Workshops mensuels',
      'Réseau entrepreneurs',
      'Support prioritaire'
    ];
  };

  const features = extractFeatures(product.description);
  const tier = product.title.includes('Creator') ? 'Creator'
    : product.title.includes('Business') ? 'Business'
    : product.title.includes('Scale') ? 'Scale'
    : product.title;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="relative group flex pt-6"
    >
      {isPopular && (
        <div className="absolute -top-0 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-inter font-bold shadow-lg">
            <Crown className="w-4 h-4" />
            LE PLUS POPULAIRE
          </span>
        </div>
      )}

      <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity`} />

      <div className={`relative w-full bg-gradient-to-br ${isPopular ? 'from-white/15 to-white/10' : 'from-white/10 to-white/5'} backdrop-blur-xl border ${isPopular ? 'border-emerald-500/30' : 'border-white/10'} rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 group-hover:border-white/20 transition-all flex flex-col`}>

        <div className="text-center mb-5 sm:mb-6">
          <h3 className="text-xl sm:text-2xl font-montserrat font-bold text-white mb-2">{tier}</h3>
          <p className="text-white/60 text-xs sm:text-sm font-inter mb-4 sm:mb-6 line-clamp-2">
            {product.description.split('\n')[0] || 'Formule complète pour entrepreneurs'}
          </p>

          <div className="flex items-baseline justify-center gap-2 mb-2">
            <span className={`text-4xl sm:text-5xl md:text-6xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}>
              {price.toFixed(0)}€
            </span>
            <span className="text-white/60 font-inter">/mois</span>
          </div>

          <p className="text-xs text-white/50 mb-2 font-inter">Engagement mensuel</p>

          {isPopular && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
              <span className="text-xs font-inter font-bold text-emerald-400">Meilleur rapport qualité/prix</span>
            </div>
          )}
        </div>

        <motion.button
          disabled={true}
          className={`w-full py-4 rounded-2xl font-montserrat font-bold text-white mb-6 bg-white/10 border border-white/20 opacity-70 cursor-not-allowed transition-all flex items-center justify-center gap-2`}
        >
          <span>Bientôt disponible</span>
        </motion.button>

        <div className="space-y-3 flex-grow">
          {features.slice(0, 8).map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + idx * 0.05 }}
              className="flex items-start gap-3"
            >
              <Check className={`w-5 h-5 ${isPopular ? 'text-emerald-400' : 'text-red-400'} flex-shrink-0 mt-0.5`} />
              <span className="text-white/80 text-sm leading-relaxed font-inter">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function PricingSection() {
  const { products, loading } = useShopifyCollection('le-40-club');
  const { addShopifyItem } = useUnifiedCart();
  const [addingProductId, setAddingProductId] = useState<string | null>(null);

  const sortedProducts = [...products].sort((a, b) => {
    const priceA = parseFloat(a.priceRange.minVariantPrice.amount);
    const priceB = parseFloat(b.priceRange.minVariantPrice.amount);
    return priceA - priceB;
  });

  const handleAddToCart = async (productId: string) => {
    setAddingProductId(productId);
    try {
      const product = products.find(p => p.id === productId);
      const firstVariant = product?.variants.edges[0]?.node;

      if (firstVariant && firstVariant.availableForSale) {
        await addShopifyItem({
          shopifyVariantId: firstVariant.id,
          productTitle: product!.title,
          variantTitle: firstVariant.title,
          price: parseFloat(firstVariant.price.amount),
          quantity: 1,
          image: product!.images.edges[0]?.node.url,
          availableForSale: firstVariant.availableForSale,
        });
      }
    } catch {
      // Error adding to cart, user will see the button reset
    } finally {
      setAddingProductId(null);
    }
  };

  if (loading) {
    return (
      <section id="pricing" className="py-32 bg-gradient-to-b from-slate-950 to-black relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex items-center justify-center">
          <div className="flex items-center gap-3 text-white">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
            <span className="text-lg font-inter">Chargement des abonnements...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-32 bg-gradient-to-b from-slate-950 to-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/20 text-xs sm:text-sm font-inter font-semibold text-red-400 mb-4 sm:mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            TARIFICATION TRANSPARENTE
          </motion.span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-montserrat font-black text-white mb-4 sm:mb-6 leading-tight px-4 sm:px-0">
            Un prix
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-red-400 break-words">
              ridiculement abordable
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto font-inter px-4 sm:px-0">
            Choisissez la formule qui vous convient. Sans engagement, résiliable à tout moment.
          </p>
        </motion.div>

        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-stretch mb-12 sm:mb-16">
            {sortedProducts.map((product, index) => {
              const isPopular = index === 1 || product.tags.some(tag => tag.toLowerCase().includes('populaire'));
              return (
                <PricingCard
                  key={product.id}
                  product={product}
                  index={index}
                  isPopular={isPopular}
                  onAddToCart={handleAddToCart}
                  isAdding={addingProductId === product.id}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center text-white/60 py-12">
            <p>Aucun abonnement disponible pour le moment</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-montserrat font-bold text-white mb-2 sm:mb-3">
                Comparez avec le prix réel des événements
              </h3>
              <p className="text-sm sm:text-base text-white/60 font-inter">
                Si vous deviez payer chaque événement séparément
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white/5 rounded-xl sm:rounded-2xl p-5 sm:p-6">
                <h4 className="text-base sm:text-lg font-montserrat font-bold text-white mb-3 sm:mb-4">Sans le Club</h4>
                <ul className="space-y-2 text-white/70 text-sm font-inter">
                  <li>Workshop → 150€/session</li>
                  <li>Networking → 50€/événement</li>
                  <li>Coworking → 250€/mois</li>
                  <li className="pt-2 border-t border-white/10 font-bold text-white">Total: ~600€/mois</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-xl sm:rounded-2xl p-5 sm:p-6">
                <h4 className="text-base sm:text-lg font-montserrat font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                  <Crown className="w-5 h-5 text-emerald-400" />
                  Avec le Club
                </h4>
                <ul className="space-y-2 text-white/80 text-sm font-inter">
                  <li>Workshops illimités ✓</li>
                  <li>Networking illimité ✓</li>
                  <li>Coworking inclus ✓</li>
                  <li className="pt-2 border-t border-emerald-500/30 font-bold text-emerald-400">Dès 50€/mois</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
