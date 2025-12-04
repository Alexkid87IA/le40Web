import { motion } from 'framer-motion';
import { Package, Clock } from 'lucide-react';
import { useShopifyCollection } from '../../hooks/useShopifyCollection';

export default function BundlesHighlightSection() {
  const { products: bundles, loading } = useShopifyCollection('bundles-packs');

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
            const image = bundle.images.edges[0]?.node.url;

            return (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="relative"
              >
                <div className="absolute -top-3 -right-3 z-10">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-xl">
                    <Clock className="w-3.5 h-3.5" />
                    Bientôt disponible
                  </div>
                </div>

                <div className="relative h-full opacity-75">
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-rose-600 to-pink-600 rounded-3xl opacity-10 blur-xl" />

                  <div className="relative bg-zinc-900/60 backdrop-blur-xl rounded-2xl md:rounded-3xl overflow-hidden border border-white/5 h-full flex flex-col">
                    {image && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={image}
                          alt={bundle.title}
                          className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
                      </div>
                    )}

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600 to-rose-600 flex items-center justify-center opacity-50">
                          <Package className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-montserrat font-bold text-white/60 line-clamp-2">
                            {bundle.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-white/50 font-inter text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                        {bundle.description.split('\n')[0] || 'Pack complet pour une productivité maximale'}
                      </p>

                      <div className="inline-flex items-baseline gap-2 mb-5 px-4 py-2 bg-white/5 border border-white/10 rounded-xl self-start">
                        <span className="text-2xl font-montserrat font-black text-white/40">
                          {price.toFixed(0)}€
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <div className="flex-1 py-3 bg-white/5 text-white/40 rounded-xl font-inter font-medium text-sm flex items-center justify-center gap-2 cursor-not-allowed">
                          <Clock className="w-4 h-4" />
                          <span>Prochainement</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 text-white/40 rounded-xl font-montserrat font-bold text-lg cursor-not-allowed">
            <Clock className="w-5 h-5" />
            <span>Prochainement disponible</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
