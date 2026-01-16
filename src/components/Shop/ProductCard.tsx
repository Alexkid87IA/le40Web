import { memo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Calendar, Clock } from 'lucide-react';
import { ShopifyProduct } from '../../lib/shopify';
import { requiresCalendarSync } from '../../hooks/useShopifyProducts';

interface ProductCardProps {
  product: ShopifyProduct;
  onQuickView: (product: ShopifyProduct) => void;
  onAddToCart: (product: ShopifyProduct) => void;
}

const ProductCard = memo<ProductCardProps>(function ProductCard({ product, onQuickView, onAddToCart }) {
  const needsCalendar = requiresCalendarSync(product);
  const firstImage = product.images.edges[0]?.node;
  const minPrice = parseFloat(product.priceRange.minVariantPrice.amount);
  const maxPrice = parseFloat(product.priceRange.maxVariantPrice.amount);
  const priceHT = minPrice;
  const priceTTC = priceHT * 1.2;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (needsCalendar) {
      onQuickView(product);
    } else {
      onAddToCart(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      onClick={() => onQuickView(product)}
      className="group relative bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
    >
      {firstImage && (
        <div className="relative aspect-[4/3] overflow-hidden bg-black/20">
          <img
            src={firstImage.url}
            alt={firstImage.altText || product.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />

          {needsCalendar && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-rose-500 to-violet-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Réservation
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-montserrat font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-rose-400 group-hover:to-violet-400 transition-all">
          {product.title}
        </h3>

        <p className="text-white/60 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">
                {priceTTC.toFixed(2)}€
              </span>
              <span className="text-sm text-white/40">TTC</span>
            </div>
            <div className="text-xs text-white/40 mt-1">
              {priceHT.toFixed(2)}€ HT
            </div>
            {minPrice !== maxPrice && (
              <div className="text-xs text-white/60 mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                À partir de
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500 text-white p-3 rounded-xl hover:shadow-lg hover:shadow-violet-500/25 transition-all"
          >
            {needsCalendar ? (
              <Calendar className="w-5 h-5" />
            ) : (
              <ShoppingCart className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
});

export default ProductCard;
