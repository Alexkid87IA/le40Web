import { motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles, TrendingUp, Users, Calendar } from 'lucide-react';
import { useShopifyCollection } from '../../hooks/useShopifyCollection';
import { useUnifiedCart } from '../../hooks/useUnifiedCart';
import { useState } from 'react';

export default function ClubUpsellSection() {
  const { products, loading } = useShopifyCollection('le-40-club');
  const { addShopifyItem } = useUnifiedCart();
  const [addingProductId, setAddingProductId] = useState<string | null>(null);

  const clubProductsWithDomiciliation = products.filter(product =>
    product.description.toLowerCase().includes('domiciliation')
  );

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
      // Error adding to cart
    } finally {
      setAddingProductId(null);
    }
  };

  if (loading || clubProductsWithDomiciliation.length === 0) {
    return null;
  }

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Effets lumineux subtils */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-orange-400" />
            <span className="text-orange-400 font-montserrat font-medium text-sm tracking-wider uppercase">
              Offre Combinée
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-black text-white mb-6">
            DOMICILIATION
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-500 to-orange-400">
              + LE 40 CLUB
            </span>
          </h2>
          <p className="text-lg md:text-xl font-inter font-light text-white/60 max-w-3xl mx-auto">
            Économisez en combinant votre domiciliation avec les avantages exclusifs du Club Le 40
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
          >
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white/60" />
                </div>
                <h3 className="text-2xl font-montserrat font-bold text-white">Domiciliation seule</h3>
              </div>
              <p className="text-white/60 font-inter">Service de domiciliation standard</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
                <span className="text-white/70 font-inter">Adresse professionnelle</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
                <span className="text-white/70 font-inter">Réception du courrier</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-white/70 flex-shrink-0 mt-0.5" />
                <span className="text-white/70 font-inter">Notification de courrier</span>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="text-3xl font-montserrat font-black text-white mb-2">
                à partir de 39€<span className="text-lg text-white/60 font-normal">/mois</span>
              </div>
              <p className="text-white/70 text-sm font-inter">Sans les avantages du Club</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 rounded-3xl blur-lg opacity-30"></div>
            <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-950 backdrop-blur-xl rounded-3xl p-8 border border-orange-500/30">
              <div className="absolute -top-4 -right-4">
                <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white text-sm font-bold px-6 py-2 rounded-full shadow-xl">
                  RECOMMANDÉ
                </div>
              </div>

              <div className="mb-6">
                <div className="inline-flex items-center gap-2 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-montserrat font-bold text-white">Club + Domiciliation</h3>
                </div>
                <p className="text-white/80 font-inter font-medium">Tout inclus pour développer votre business</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white font-inter font-medium">Domiciliation INCLUSE</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white font-inter">Accès coworking illimité</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white font-inter">Workshops mensuels exclusifs</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white font-inter">Réseau d'entrepreneurs</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white font-inter">Réductions sur tous les services</span>
                </div>
              </div>

              <div className="border-t border-orange-500/20 pt-6 mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <div className="text-3xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
                    249€<span className="text-lg text-white/60 font-normal">/mois</span>
                  </div>
                  <div className="text-sm text-green-400 font-semibold">
                    Économie de 50€+/mois
                  </div>
                </div>
                <p className="text-white/70 text-sm font-inter mb-4">Domiciliation + tous les avantages Club</p>
              </div>

              <motion.a
                href="/club"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white rounded-xl font-montserrat font-bold text-base shadow-xl flex items-center justify-center gap-2 group"
              >
                <span>Découvrir Le 40 Club</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center flex-shrink-0">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-montserrat font-bold text-white mb-2">
                  Développez votre réseau professionnel
                </h3>
                <p className="text-white/70 font-inter">
                  Rejoignez une communauté de +100 entrepreneurs à Marseille
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <motion.a
                href="/club"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl font-inter font-medium shadow-lg whitespace-nowrap text-center"
              >
                En savoir plus
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
