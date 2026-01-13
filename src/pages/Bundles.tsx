/**
 * Bundles - Version Ultra-Compact et Efficace
 *
 * Objectif : Montrer toutes les offres clairement et rapidement
 * - Hero compact
 * - Cards bundles condensées avec toutes les infos
 * - Comparaison visuelle rapide
 * - Pas de modal inutile
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  Check,
  TrendingDown,
  Zap,
  Star,
  Clock,
  Users
} from 'lucide-react';
import HeaderNav from '../components/Nav/HeaderNav';
import MobileBurger from '../components/Nav/MobileBurger';
import Footer from '../components/Footer';
import SEOHead from '../components/SEO/SEOHead';
import { useShopifyCollection } from '../hooks/useShopifyCollection';
import type { ShopifyProduct } from '../lib/shopify';
import { extractListItems } from '../lib/sanitize';

export default function Bundles() {
  const { products: bundles, loading } = useShopifyCollection('bundles-packs');
  const { products: subscriptions } = useShopifyCollection('le-40-club');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    return extractListItems(description, 4);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead
        title="Packs & Bundles Le 40 | Économisez jusqu'à 30% sur nos Services"
        description="Profitez de nos bundles studios + services et abonnements Le 40 Club. Économisez jusqu'à 30% avec nos packs tout inclus à Marseille."
        keywords="bundles coworking Marseille, packs studio Marseille, offres Le 40, abonnements coworking, réductions studio"
      />
      <HeaderNav />
      <MobileBurger />

      {/* Hero Compact */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-b from-zinc-900 to-black">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

        <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[150px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-400/20 rounded-full px-4 py-2 mb-6">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-bold text-amber-300">BIENTÔT DISPONIBLE</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
              Bundles{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                tout inclus
              </span>
            </h1>

            <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
              Studios + Services combinés pour des économies jusqu'à <span className="text-amber-400 font-bold">30%</span>
            </p>

            {/* Quick Stats */}
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-amber-400" />
                <span className="text-white/50">Jusqu'à 30% d'économie</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/30" />
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-white/50">Prochainement</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/30" />
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-white/50">Qualité premium</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative bg-black py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-16">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
                <Clock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-amber-400" />
              </div>
            </div>
          ) : (
            <div className="space-y-16">
              {/* Bundles Grid Compact */}
              <section>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Package className="w-6 h-6 text-amber-400" />
                    <h2 className="text-2xl md:text-3xl font-black text-white/60">
                      Bundles Studio + Services
                    </h2>
                  </div>
                  <p className="text-white/50">
                    Packs préconçus avec tout le nécessaire pour votre production
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {bundles.map((bundle, index) => {
                    const savings = getBundleSavings(bundle);
                    const variant = bundle.variants.edges[0]?.node;
                    const price = variant ? parseFloat(variant.price.amount) : 0;
                    const comparePrice = variant?.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) : null;
                    const benefits = extractBenefits(bundle.description || '');

                    return (
                      <motion.div
                        key={bundle.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="relative opacity-60"
                      >
                        <div className="absolute -top-3 -right-3 z-10">
                          <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-amber-500/30">
                            <Clock className="w-3.5 h-3.5" />
                            Bientôt disponible
                          </div>
                        </div>

                        <div className="relative bg-zinc-900/30 backdrop-blur-sm rounded-2xl border border-white/5 overflow-hidden">
                          {/* Image Compact */}
                          {bundle.images.edges[0] && (
                            <div className="relative h-40 overflow-hidden">
                              <img
                                src={bundle.images.edges[0].node.url}
                                alt={bundle.title}
                                className="w-full h-full object-cover opacity-50"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent" />
                            </div>
                          )}

                          <div className="p-5">
                            {/* Title & Price - Compact */}
                            <div className="mb-4">
                              <h3 className="text-lg font-black text-white/50 mb-2 leading-tight">
                                {bundle.title}
                              </h3>

                              <div className="flex items-end justify-between">
                                <div>
                                  <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-black text-white/30">
                                      {price}€
                                    </span>
                                    {comparePrice && (
                                      <span className="text-sm text-white/20 line-through">
                                        {comparePrice}€
                                      </span>
                                    )}
                                  </div>
                                  {savings && (
                                    <div className="text-white/30 text-xs font-semibold">
                                      Économisez {savings.amount}€
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Benefits Compact */}
                            {benefits.length > 0 && (
                              <div className="space-y-1.5 mb-4">
                                {benefits.slice(0, 3).map((benefit, idx) => (
                                  <div key={idx} className="flex items-start gap-2">
                                    <Check className="w-3.5 h-3.5 text-white/30 shrink-0 mt-0.5" />
                                    <span className="text-white/40 text-xs leading-tight line-clamp-2">{benefit}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* CTA Button Disabled */}
                            <div className="w-full py-3 bg-white/5 text-white/40 rounded-lg text-sm font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                              <Clock className="w-4 h-4" />
                              <span>Prochainement</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>

              {/* Club Subscriptions - Compact 3 Columns */}
              {subscriptions.length > 0 && (
                <section>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Users className="w-6 h-6 text-violet-400/60" />
                      <h2 className="text-2xl md:text-3xl font-black text-white/60">
                        Le 40 Club - Abonnements
                      </h2>
                    </div>
                    <p className="text-white/50">
                      Accès illimité à notre communauté et services
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {subscriptions.map((sub, index) => {
                      const variant = sub.variants.edges[0]?.node;
                      const price = variant ? parseFloat(variant.price.amount) : 0;
                      const isPopular = index === 1;
                      const benefits = extractBenefits(sub.description || '');

                      return (
                        <motion.div
                          key={sub.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                          className="relative opacity-60"
                        >
                          {isPopular && (
                            <div className="absolute -top-3 left-0 right-0 z-10 flex justify-center">
                              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                                <Clock className="w-3 h-3" />
                                BIENTÔT
                              </div>
                            </div>
                          )}

                          <div className={`relative bg-zinc-900/30 backdrop-blur-sm rounded-2xl border overflow-hidden ${
                            isPopular
                              ? 'border-amber-500/20 pt-8'
                              : 'border-white/5'
                          }`}>
                            <div className="p-6">
                              <h3 className="text-xl font-black text-white/50 mb-1">
                                {sub.title.replace(' (Abonnement Mensuel)', '')}
                              </h3>
                              <p className="text-white/30 text-xs mb-4">Sans engagement</p>

                              <div className="mb-4">
                                <div className="flex items-baseline gap-2">
                                  <span className="text-4xl font-black text-white/30">
                                    {price}€
                                  </span>
                                  <span className="text-white/30 text-sm">/mois</span>
                                </div>
                              </div>

                              {benefits.length > 0 && (
                                <div className="space-y-2 mb-5">
                                  {benefits.map((benefit, idx) => (
                                    <div key={idx} className="flex items-start gap-2">
                                      <Check className="w-4 h-4 shrink-0 mt-0.5 text-white/30" />
                                      <span className="text-white/40 text-xs leading-tight">{benefit}</span>
                                    </div>
                                  ))}
                                </div>
                              )}

                              <div className="w-full font-bold py-3 rounded-lg bg-white/5 text-white/40 flex items-center justify-center gap-2 text-sm cursor-not-allowed">
                                <Clock className="w-4 h-4" />
                                <span>Prochainement</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Quick Advantages - Ultra Compact */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-zinc-900/20 backdrop-blur-sm rounded-2xl border border-white/5 p-8"
              >
                <h3 className="text-xl font-black text-white/60 mb-6 text-center">
                  Pourquoi choisir un bundle ?
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: TrendingDown,
                      title: 'Économies garanties',
                      desc: 'Jusqu\'à 30% moins cher qu\'à l\'unité'
                    },
                    {
                      icon: Zap,
                      title: 'Tout inclus',
                      desc: 'Studio + services en un seul achat'
                    },
                    {
                      icon: Clock,
                      title: 'Bientôt disponible',
                      desc: 'Nos bundles arrivent prochainement'
                    }
                  ].map((item, index) => (
                    <div key={index} className="text-center opacity-60">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-3">
                        <item.icon className="w-6 h-6 text-amber-400" />
                      </div>
                      <h4 className="text-white/60 font-bold mb-1">{item.title}</h4>
                      <p className="text-white/40 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
