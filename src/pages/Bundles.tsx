import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Package,
  Check,
  ArrowRight,
  Sparkles,
  TrendingDown,
  X,
  Zap,
  Gift,
  Star,
  Clock
} from 'lucide-react';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import SEOHead from '../components/SEO/SEOHead';
import { useShopifyCollection } from '../hooks/useShopifyCollection';
import { useUnifiedCart } from '../hooks/useUnifiedCart';
import type { ShopifyProduct } from '../lib/shopify';

export default function Bundles() {
  const { products: bundles, loading } = useShopifyCollection('bundles-packs');
  const { products: subscriptions } = useShopifyCollection('le-40-club');
  const { addShopifyItem, loading: cartLoading } = useUnifiedCart();
  const [selectedBundle, setSelectedBundle] = useState<ShopifyProduct | null>(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

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

  const extractBenefits = (description: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = description;
    const listItems = tempDiv.querySelectorAll('li');
    return Array.from(listItems).map(li => li.textContent || '').slice(0, 5);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <SEOHead
        title="Packs & Bundles Le 40 | Économisez jusqu'à 30% sur nos Services"
        description="Profitez de nos bundles studios + services et abonnements Le 40 Club. Économisez jusqu'à 30% avec nos packs tout inclus à Marseille."
        keywords="bundles coworking Marseille, packs studio Marseille, offres Le 40, abonnements coworking, réductions studio"
      />
      <HeaderNav />
      <MobileBurger />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div
          style={{ opacity, scale }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          >
            <source
              src="https://res.cloudinary.com/dwt7u0azs/video/upload/v1761808607/8fc51ed3-de40-42f7-ac18-7dd2da634556_yxt3cm.mp4"
              type="video/mp4"
            />
          </video>

          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/60 via-black/80 to-teal-950/60" />

          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/15 rounded-full blur-[150px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-600/15 rounded-full blur-[150px]"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-32 w-full">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-400/20 rounded-full px-5 py-3 mb-8"
            >
              <Gift className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-bold uppercase tracking-wider text-emerald-300">Bundles & Packs</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-montserrat font-black text-white mb-6 leading-tight"
            >
              Économisez jusqu'à{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                  30%
                </span>
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 blur-3xl -z-10"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Nos packs tout inclus combinent studios, services et expertise
              <span className="text-white font-semibold"> pour un tarif préférentiel</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12"
            >
              {[
                { icon: TrendingDown, value: 'Jusqu\'à 30%', label: 'd\'économie' },
                { icon: Zap, value: 'Tout inclus', label: 'Service complet' },
                { icon: Clock, value: 'Immédiat', label: 'Disponible maintenant' },
                { icon: Star, value: 'Premium', label: 'Qualité garantie' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300"
                >
                  <stat.icon className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                  <div className="text-sm font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </section>

      {/* Main Content */}
      <main className="relative z-10 bg-black pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-emerald-400" />
              </div>
            </div>
          ) : (
            <>
              {/* Bundles Section */}
              <section className="mb-32">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-400/20 rounded-full px-5 py-2 mb-6">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-bold text-yellow-300">OFFRES EXCLUSIVES</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-4">
                    Bundles Studio + Services
                  </h2>
                  <p className="text-lg text-white/60 max-w-2xl mx-auto">
                    Profitez de nos packs préconçus pour une expérience complète
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {bundles.map((bundle, index) => {
                    const savings = getBundleSavings(bundle);
                    const variant = bundle.variants.edges[0]?.node;
                    const price = variant ? parseFloat(variant.price.amount) : 0;
                    const comparePrice = variant?.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) : null;
                    const benefits = extractBenefits(bundle.description || '');

                    return (
                      <motion.div
                        key={bundle.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative"
                      >
                        <motion.div
                          className="absolute -inset-[1px] bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500"
                          whileHover={{ scale: 1.02 }}
                        />

                        <div className="relative bg-zinc-900/50 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden hover:border-emerald-500/30 transition-all duration-500">
                          {savings && (
                            <div className="absolute top-6 right-6 z-20">
                              <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/30"
                              >
                                <TrendingDown className="w-4 h-4" />
                                -{savings.percent}%
                              </motion.div>
                            </div>
                          )}

                          {bundle.images.edges[0] && (
                            <div className="relative h-72 overflow-hidden">
                              <motion.img
                                src={bundle.images.edges[0].node.url}
                                alt={bundle.title}
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.6 }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
                            </div>
                          )}

                          <div className="p-8">
                            <h3 className="text-2xl md:text-3xl font-montserrat font-black text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-cyan-400 transition-all">
                              {bundle.title}
                            </h3>

                            {benefits.length > 0 && (
                              <div className="space-y-2 mb-6">
                                {benefits.map((benefit, idx) => (
                                  <div key={idx} className="flex items-start gap-2">
                                    <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                    <span className="text-white/70 text-sm leading-tight">{benefit}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="flex items-end justify-between mb-6 pt-6 border-t border-white/10">
                              <div>
                                <div className="flex items-baseline gap-3 mb-1">
                                  <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                                    {price}€
                                  </span>
                                  {comparePrice && (
                                    <span className="text-xl text-white/30 line-through font-bold">
                                      {comparePrice}€
                                    </span>
                                  )}
                                </div>
                                {savings && (
                                  <div className="text-emerald-400 text-sm font-semibold">
                                    Économisez {savings.amount}€
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex gap-3">
                              <motion.button
                                onClick={() => handleAddToCart(bundle)}
                                disabled={cartLoading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 group/btn relative overflow-hidden"
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 transition-transform group-hover/btn:scale-105" />
                                <div className="relative flex items-center justify-center gap-2 py-4 text-white font-bold rounded-xl">
                                  {cartLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                  ) : (
                                    <>
                                      <span>Ajouter au panier</span>
                                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                    </>
                                  )}
                                </div>
                              </motion.button>

                              <motion.button
                                onClick={() => setSelectedBundle(bundle)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white rounded-xl transition-all"
                              >
                                Détails
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>

              {/* Club Subscriptions Section */}
              <section className="mb-32">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-400/20 rounded-full px-5 py-2 mb-6">
                    <Package className="w-4 h-4 text-violet-400" />
                    <span className="text-sm font-bold text-violet-300">ABONNEMENTS MENSUELS</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-black text-white mb-4">
                    Le 40 Club
                  </h2>
                  <p className="text-lg text-white/60 max-w-2xl mx-auto">
                    Rejoignez notre communauté d'entrepreneurs avec un accès illimité
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {subscriptions.map((sub, index) => {
                    const variant = sub.variants.edges[0]?.node;
                    const price = variant ? parseFloat(variant.price.amount) : 0;
                    const isPopular = index === 1;
                    const benefits = extractBenefits(sub.description || '');

                    return (
                      <motion.div
                        key={sub.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group"
                      >
                        {isPopular && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -top-4 left-0 right-0 z-10"
                          >
                            <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-center py-2 rounded-t-2xl text-sm font-bold uppercase tracking-wide">
                              ⭐ Plus Populaire
                            </div>
                          </motion.div>
                        )}

                        <div className={`relative bg-zinc-900/50 backdrop-blur-xl rounded-2xl border overflow-hidden transition-all duration-500 ${
                          isPopular
                            ? 'border-violet-500/50 shadow-2xl shadow-violet-500/20 scale-105 pt-12'
                            : 'border-white/10 hover:border-white/20'
                        }`}>
                          <div className="p-8">
                            <h3 className="text-2xl font-montserrat font-bold text-white mb-2">
                              {sub.title.replace(' (Abonnement Mensuel)', '')}
                            </h3>
                            <p className="text-white/60 text-sm mb-6">Sans engagement • Annulation facile</p>

                            <div className="mb-8">
                              <div className="flex items-baseline gap-2">
                                <span className={`text-5xl font-black ${isPopular ? 'text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400' : 'text-white'}`}>
                                  {price}€
                                </span>
                                <span className="text-white/60 text-lg">/mois</span>
                              </div>
                            </div>

                            {benefits.length > 0 && (
                              <div className="space-y-3 mb-8">
                                {benefits.map((benefit, idx) => (
                                  <div key={idx} className="flex items-start gap-2">
                                    <Check className={`w-5 h-5 shrink-0 mt-0.5 ${isPopular ? 'text-violet-400' : 'text-emerald-400'}`} />
                                    <span className="text-white/70 text-sm leading-tight">{benefit}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            <motion.button
                              onClick={() => handleAddToCart(sub)}
                              disabled={cartLoading}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`w-full font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                                isPopular
                                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-500 hover:to-fuchsia-500 shadow-lg shadow-violet-500/30'
                                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
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
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>

              {/* Why Choose Section */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-cyan-600/10 rounded-3xl blur-3xl" />
                <div className="relative bg-zinc-900/30 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12">
                  <div className="text-center mb-12">
                    <Check className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
                    <h3 className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-4">
                      Pourquoi choisir un pack ?
                    </h3>
                    <p className="text-white/60 max-w-2xl mx-auto">
                      Des avantages exclusifs pour optimiser votre investissement
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      {
                        icon: TrendingDown,
                        value: 'Jusqu\'à 30%',
                        label: 'd\'économie',
                        desc: 'Par rapport aux achats séparés',
                        color: 'from-emerald-400 to-teal-400'
                      },
                      {
                        icon: Zap,
                        value: 'Tout inclus',
                        label: 'Service complet',
                        desc: 'Studio + services + expertise',
                        color: 'from-teal-400 to-cyan-400'
                      },
                      {
                        icon: Star,
                        value: 'Simplicité',
                        label: 'Un seul achat',
                        desc: 'Réservation instantanée',
                        color: 'from-cyan-400 to-blue-400'
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="text-center"
                      >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-4">
                          <item.icon className="w-8 h-8 text-emerald-400" />
                        </div>
                        <div className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${item.color} mb-2`}>
                          {item.value}
                        </div>
                        <div className="text-lg text-white font-semibold mb-1">{item.label}</div>
                        <div className="text-white/60 text-sm">{item.desc}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.section>
            </>
          )}
        </div>
      </main>

      <Footer />

      {/* Bundle Details Modal */}
      {selectedBundle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={() => setSelectedBundle(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl"
          >
            <div className="relative">
              {selectedBundle.images.edges[0] && (
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={selectedBundle.images.edges[0].node.url}
                    alt={selectedBundle.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                </div>
              )}

              <button
                onClick={() => setSelectedBundle(null)}
                className="absolute top-4 right-4 p-3 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full border border-white/10 hover:border-white/20 transition-all"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 mb-6">
                {selectedBundle.title}
              </h2>

              <div
                className="text-white/70 leading-relaxed prose prose-invert prose-lg max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: selectedBundle.description || '' }}
              />

              <div className="flex gap-4">
                <motion.button
                  onClick={() => {
                    handleAddToCart(selectedBundle);
                    setSelectedBundle(null);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>Ajouter au panier</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                <motion.button
                  onClick={() => setSelectedBundle(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-xl transition-all border border-white/10"
                >
                  Fermer
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
