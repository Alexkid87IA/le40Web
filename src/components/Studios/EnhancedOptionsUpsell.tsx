import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Sparkles, TrendingUp, ArrowRight, Plus, Minus, ShoppingCart, Users, Award, Zap, Info } from 'lucide-react';
import { optionsCatalog } from '../../data/studios/options';
import { useCart } from '../../hooks/useCart';
import {
  getSmartRecommendations,
  getBundleRecommendations,
  getFrequentlyBoughtTogether,
  getSocialProofForOption,
  type RecommendationContext
} from '../../utils/studioRecommendations';

interface EnhancedOptionsUpsellProps {
  context: RecommendationContext;
}

export default function EnhancedOptionsUpsell({ context }: EnhancedOptionsUpsellProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState<'all' | 'essential' | 'recommended' | 'premium'>('all');
  const [showBundles, setShowBundles] = useState(true);
  const { addItem } = useCart();

  const recommendations = getSmartRecommendations(context);
  const bundles = getBundleRecommendations(context);

  const categorizedOptions = {
    essential: recommendations.filter(r => r.category === 'essential'),
    recommended: recommendations.filter(r => r.category === 'recommended'),
    premium: recommendations.filter(r => r.category === 'premium')
  };

  const displayedRecommendations = activeCategory === 'all'
    ? recommendations
    : recommendations.filter(r => r.category === activeCategory);

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev => {
      const current = prev[optionId] || 0;
      if (current > 0) {
        const { [optionId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [optionId]: 1 };
    });
  };

  const updateQuantity = (optionId: string, delta: number) => {
    setSelectedOptions(prev => {
      const current = prev[optionId] || 0;
      const newValue = Math.max(0, current + delta);
      if (newValue === 0) {
        const { [optionId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [optionId]: newValue };
    });
  };

  const selectBundle = (bundleOptions: string[]) => {
    const newSelections = { ...selectedOptions };
    bundleOptions.forEach(optionId => {
      newSelections[optionId] = 1;
    });
    setSelectedOptions(newSelections);
    setShowBundles(false);
  };

  const calculateTotal = () => {
    return Object.entries(selectedOptions).reduce((total, [optionId, quantity]) => {
      const option = optionsCatalog[optionId as keyof typeof optionsCatalog];
      const price = option.unit === '/h' ? option.price * context.durationHours : option.price;
      return total + (price * quantity);
    }, 0);
  };

  const addToCart = () => {
    Object.entries(selectedOptions).forEach(([optionId, quantity]) => {
      const option = optionsCatalog[optionId as keyof typeof optionsCatalog];
      addItem({
        id: `option-${optionId}-${Date.now()}`,
        serviceType: 'creative-studio',
        serviceName: option.name,
        date: new Date().toISOString().split('T')[0],
        duration: 'hour',
        price: option.unit === '/h' ? option.price * context.durationHours : option.price,
        quantity: quantity
      });
    });
    setSelectedOptions({});
  };

  const totalSelected = Object.keys(selectedOptions).length;
  const totalPrice = calculateTotal();

  return (
    <section className="py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/30 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-cyan-300 font-inter text-sm font-bold">Recommandations personnalisées</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
            OPTIONS PREMIUM
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
              SÉLECTION INTELLIGENTE
            </span>
          </h2>

          <p className="text-xl text-white/70 max-w-3xl mx-auto font-inter leading-relaxed">
            Nos recommandations basées sur votre configuration et les choix de +500 créateurs
          </p>
        </motion.div>

        {showBundles && bundles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-emerald-400" />
                <h3 className="text-2xl font-montserrat font-black text-white">
                  Packs recommandés
                </h3>
              </div>
              <button
                onClick={() => setShowBundles(false)}
                className="text-white/60 hover:text-white text-sm font-inter"
              >
                Masquer
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bundles.map((bundle, index) => (
                <motion.div
                  key={bundle.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-400/30 rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
                  onClick={() => selectBundle(bundle.options)}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-bl-full"></div>

                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xl font-montserrat font-black text-white">
                        {bundle.name}
                      </h4>
                      <div className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        -{bundle.discount}%
                      </div>
                    </div>

                    <p className="text-white/80 font-inter text-sm mb-4 leading-relaxed">
                      {bundle.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      {bundle.options.map(optionId => {
                        const option = optionsCatalog[optionId as keyof typeof optionsCatalog];
                        return (
                          <div key={optionId} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span className="text-white/70 text-sm font-inter">{option.name}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-end justify-between pt-4 border-t border-white/10">
                      <div>
                        <div className="text-white/50 text-xs line-through mb-1">
                          {bundle.originalPrice}€
                        </div>
                        <div className="text-2xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                          {bundle.totalPrice}€
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-lg font-inter font-bold text-sm flex items-center gap-2"
                      >
                        Choisir
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="mb-8 flex items-center justify-center gap-3 flex-wrap">
          {(['all', 'essential', 'recommended', 'premium'] as const).map((category) => {
            const count = category === 'all' ? recommendations.length : categorizedOptions[category]?.length || 0;
            return (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-xl font-inter font-bold text-sm transition-all ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
                }`}
              >
                {category === 'all' ? 'Toutes' : category === 'essential' ? 'Essentielles' : category === 'recommended' ? 'Recommandées' : 'Premium'}
                <span className="ml-2 text-xs opacity-75">({count})</span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {displayedRecommendations.map((rec, index) => {
              const option = optionsCatalog[rec.optionId as keyof typeof optionsCatalog];
              const Icon = option.icon;
              const isSelected = selectedOptions[rec.optionId] > 0;
              const quantity = selectedOptions[rec.optionId] || 0;
              const socialProof = getSocialProofForOption(rec.optionId);
              const frequentPairs = getFrequentlyBoughtTogether(rec.optionId, context.studioId);

              return (
                <motion.div
                  key={rec.optionId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group relative"
                >
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 blur-xl transition-all duration-500 group-hover:opacity-30"
                    animate={isSelected ? { opacity: 0.4 } : {}}
                  />

                  <div className={`relative bg-slate-900/80 backdrop-blur-2xl rounded-2xl p-6 border-2 transition-all duration-500 h-full flex flex-col ${
                    isSelected ? 'border-blue-500' : 'border-white/10 group-hover:border-white/20'
                  }`}>
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      {rec.category === 'essential' && (
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          ESSENTIEL
                        </div>
                      )}
                      {(option.recommended || option.popular) && (
                        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          POPULAIRE
                        </div>
                      )}
                    </div>

                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-3 rounded-xl ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                          : 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20'
                      }`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-montserrat font-black text-white mb-1">
                          {option.name}
                        </h3>
                        <p className="text-white/60 text-sm font-inter mb-2">
                          {option.description}
                        </p>
                        {rec.reason && (
                          <div className="flex items-start gap-2 bg-blue-500/10 border border-blue-400/20 rounded-lg p-2 mb-2">
                            <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                            <p className="text-blue-300 text-xs font-inter leading-snug">
                              {rec.reason}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4 text-xs">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-cyan-400" />
                        <span className="text-white/60">{socialProof.popularityPercent}% clients</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-white/60">{socialProof.satisfactionRating}/5</span>
                      </div>
                    </div>

                    {frequentPairs.length > 0 && !isSelected && (
                      <div className="mb-4 bg-white/5 rounded-lg p-3">
                        <p className="text-white/50 text-xs font-inter mb-2">Souvent acheté avec:</p>
                        <div className="flex flex-wrap gap-1">
                          {frequentPairs.slice(0, 2).map(pairId => {
                            const pairOption = optionsCatalog[pairId as keyof typeof optionsCatalog];
                            return (
                              <span key={pairId} className="text-cyan-400 text-xs bg-cyan-500/10 px-2 py-1 rounded">
                                {pairOption.name}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="mt-auto">
                      <div className="mb-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                            {option.price}€
                          </span>
                          <span className="text-white/50 text-sm font-inter">
                            {option.unit}
                          </span>
                        </div>
                      </div>

                      <AnimatePresence mode="wait">
                        {!isSelected ? (
                          <motion.button
                            key="add"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => toggleOption(rec.optionId)}
                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white py-3 rounded-xl font-montserrat font-bold flex items-center justify-center gap-2 transition-all"
                          >
                            <Plus className="w-5 h-5" />
                            Ajouter
                          </motion.button>
                        ) : (
                          <motion.div
                            key="quantity"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-3"
                          >
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(rec.optionId, -1)}
                              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white transition-colors"
                            >
                              <Minus className="w-5 h-5" />
                            </motion.button>
                            <div className="flex-1 text-center">
                              <div className="text-2xl font-montserrat font-black text-white">
                                {quantity}
                              </div>
                              <div className="text-xs text-white/50 font-inter">
                                {quantity * option.price}€
                              </div>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(rec.optionId, 1)}
                              className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-lg flex items-center justify-center text-white transition-all"
                            >
                              <Plus className="w-5 h-5" />
                            </motion.button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {totalSelected > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4"
            >
              <div className="bg-slate-900/95 backdrop-blur-2xl border-2 border-blue-500/50 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-white/60 text-sm font-inter mb-1">
                      {totalSelected} option{totalSelected > 1 ? 's' : ''} sélectionnée{totalSelected > 1 ? 's' : ''}
                    </div>
                    <div className="text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                      {totalPrice}€
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addToCart}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-8 py-4 rounded-xl font-montserrat font-bold flex items-center gap-3 shadow-xl"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Ajouter au panier
                  </motion.button>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-inter">
                  <Check className="w-4 h-4" />
                  <span>Configuration optimisée selon vos besoins</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
