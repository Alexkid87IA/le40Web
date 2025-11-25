import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Users, DollarSign, Sparkles } from 'lucide-react';
import { useShopifyCollection } from '../../hooks/useShopifyCollection';

interface StudioCardProps {
  product: any;
  onSelect: () => void;
}

function StudioCard({ product, onSelect }: StudioCardProps) {
  const variants = product.variants.edges;
  const minPrice = Math.min(...variants.map((v: any) => parseFloat(v.node.price.amount)));
  const image = product.images.edges[0]?.node.url || 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      onClick={onSelect}
      className="group relative bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden cursor-pointer transition-all hover:border-emerald-500/50"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <div className="absolute top-4 right-4 px-3 py-1.5 bg-emerald-500 rounded-full text-white text-xs font-bold">
          À partir de {minPrice}€
        </div>

        {product.tags.includes('offre-lancement') && (
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white text-xs font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Offre de lancement
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-montserrat font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
          {product.title}
        </h3>

        <div className="space-y-2 mb-4">
          {variants.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>{variants.length} formules disponibles</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {variants.slice(0, 3).map((variant: any, idx: number) => (
            <div
              key={idx}
              className="px-3 py-2 bg-white/5 rounded-lg border border-white/10 text-center"
            >
              <div className="text-xs text-white/60 mb-1">{variant.node.title}</div>
              <div className="text-sm font-bold text-white">{parseFloat(variant.node.price.amount)}€</div>
            </div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all"
        >
          <Play className="w-4 h-4" />
          <span>Réserver ce studio</span>
        </motion.button>
      </div>
    </motion.div>
  );
}

interface ProductModalProps {
  product: any;
  onClose: () => void;
}

function ProductModal({ product, onClose }: ProductModalProps) {
  const variants = product.variants.edges;
  const image = product.images.edges[0]?.node.url || 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-zinc-900 rounded-2xl border border-white/20 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
        >
          ✕
        </button>

        <div className="relative h-80">
          <img
            src={image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-montserrat font-black text-white mb-4">
            {product.title}
          </h2>

          <div
            className="prose prose-invert prose-sm max-w-none mb-6"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />

          <div className="space-y-4">
            <h3 className="text-xl font-montserrat font-bold text-white">
              Formules disponibles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {variants.map((variant: any, idx: number) => (
                <div
                  key={idx}
                  className="p-6 bg-gradient-to-br from-emerald-600/20 to-cyan-600/20 rounded-xl border border-emerald-500/30"
                >
                  <div className="text-sm text-emerald-400 font-semibold mb-2">
                    {variant.node.title}
                  </div>
                  <div className="text-3xl font-black text-white mb-4">
                    {parseFloat(variant.node.price.amount)}€
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-xl text-white font-bold text-sm shadow-lg"
                  >
                    Réserver
                  </motion.button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AllStudiosSection() {
  const { products, loading, error } = useShopifyCollection('studios-location');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  if (loading) {
    return (
      <section className="relative py-16 md:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-white text-lg">Chargement des studios...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative py-16 md:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-red-400">Erreur lors du chargement des studios</div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative py-16 md:py-24 bg-black">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-black text-white mb-4">
              TOUS NOS
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400">
                STUDIOS DISPONIBLES
              </span>
            </h2>
            <p className="text-lg text-white/60 font-inter max-w-2xl mx-auto">
              {products.length} studios équipés pour tous vos projets créatifs
            </p>
          </motion.div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-white/60 text-lg mb-4">
                Aucun studio disponible pour le moment
              </div>
              <p className="text-white/40 text-sm">
                Les studios seront bientôt disponibles à la réservation
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: any) => (
                <StudioCard
                  key={product.id}
                  product={product}
                  onSelect={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
