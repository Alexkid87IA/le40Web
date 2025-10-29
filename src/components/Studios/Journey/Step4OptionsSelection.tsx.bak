import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, Minus, Sparkles, Award, Star, Users, Info, TrendingUp, ArrowRight } from 'lucide-react';
import { optionsCatalog } from '../../../data/studios/options';
import { getSmartRecommendations, getBundleRecommendations, getSocialProofForOption, type RecommendationContext } from '../../../utils/studioRecommendations';

interface Step4OptionsSelectionProps {
  context: RecommendationContext;
  selectedOptions: Record<string, number>;
  onOptionsChange: (options: Record<string, number>) => void;
  onContinue: () => void;
}

export default function Step4OptionsSelection({
  context,
  selectedOptions,
  onOptionsChange,
  onContinue
}: Step4OptionsSelectionProps) {
  const [activeTab, setActiveTab] = useState<'essential' | 'recommended' | 'all'>('essential');

  const recommendations = getSmartRecommendations(context);
  const bundles = getBundleRecommendations(context);

  const categorizedOptions = {
    essential: recommendations.filter(r => r.category === 'essential'),
    recommended: recommendations.filter(r => r.category === 'recommended'),
    premium: recommendations.filter(r => r.category === 'premium'),
  };

  const displayedRecommendations = activeTab === 'all'
    ? recommendations
    : activeTab === 'essential'
    ? categorizedOptions.essential
    : categorizedOptions.recommended;

  const toggleOption = (optionId: string) => {
    const newOptions = { ...selectedOptions };
    if (newOptions[optionId]) {
      delete newOptions[optionId];
    } else {
      newOptions[optionId] = 1;
    }
    onOptionsChange(newOptions);
  };

  const updateQuantity = (optionId: string, delta: number) => {
    const newOptions = { ...selectedOptions };
    const current = newOptions[optionId] || 0;
    const newValue = Math.max(0, current + delta);

    if (newValue === 0) {
      delete newOptions[optionId];
    } else {
      newOptions[optionId] = newValue;
    }

    onOptionsChange(newOptions);
  };

  const selectBundle = (bundleOptions: string[]) => {
    const newOptions = { ...selectedOptions };
    bundleOptions.forEach(optionId => {
      newOptions[optionId] = 1;
    });
    onOptionsChange(newOptions);
  };

  const calculateOptionsTotal = () => {
    return Object.entries(selectedOptions).reduce((total, [optionId, quantity]) => {
      const option = optionsCatalog[optionId as keyof typeof optionsCatalog];
      const price = option.unit === '/h' ? option.price * context.durationHours : option.price;
      return total + (price * quantity);
    }, 0);
  };

  const totalSelected = Object.keys(selectedOptions).length;
  const optionsTotal = calculateOptionsTotal();

  return (
    <section className="py-16 bg-gradient-to-b from-slate-900 via-slate-950 to-black">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-400/30 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-violet-300 font-inter text-sm font-bold">Étape 4 sur 4</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
            OPTIONS PREMIUM
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400">
              PERSONNALISEZ VOTRE EXPÉRIENCE
            </span>
          </h2>

          <p className="text-xl text-white/70 max-w-3xl mx-auto font-inter leading-relaxed">
            Recommandations intelligentes basées sur votre configuration et les choix de +500 créateurs
          </p>
        </motion.div>

        {bundles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-emerald-400" />
              <h3 className="text-2xl font-montserrat font-black text-white">
                Packs recommandés pour vous
              </h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bundles.map((bundle, index) => (
                <motion.div
                  key={bundle.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  onClick={() => selectBundle(bundle.options)}
                  className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-400/30 rounded-2xl p-6 relative overflow-hidden cursor-pointer group"
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

                    <p className="text-white/80 font-inter text-sm mb-4">
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
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-lg font-inter font-bold text-sm flex items-center gap-2 group-hover:shadow-lg transition-shadow">
                        Choisir
                        <TrendingUp className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="mb-8">
          <div className="flex justify-center gap-3 flex-wrap">
            {[
              { id: 'essential', label: 'Essentielles', count: categorizedOptions.essential.length },
              { id: 'recommended', label: 'Recommandées', count: categorizedOptions.recommended.length },
              { id: 'all', label: 'Toutes les options', count: recommendations.length },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-xl font-inter font-bold text-sm transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 border border-white/10'
                }`}
              >
                {tab.label}
                <span className="ml-2 text-xs opacity-75">({tab.count})</span>
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {displayedRecommendations.map((rec, index) => {
              const option = optionsCatalog[rec.optionId as keyof typeof optionsCatalog];
              const Icon = option.icon;
              const isSelected = selectedOptions[rec.optionId] > 0;
              const quantity = selectedOptions[rec.optionId] || 0;
              const socialProof = getSocialProofForOption(rec.optionId);

              return (
                <motion.div
                  key={rec.optionId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group relative"
                >
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl blur-xl transition-all duration-500"
                    animate={{ opacity: isSelected ? 0.4 : 0 }}
                  />

                  <div className={`relative bg-slate-900/90 backdrop-blur-2xl rounded-2xl p-6 border-2 transition-all duration-500 h-full flex flex-col ${
                    isSelected ? 'border-violet-400' : 'border-white/10 group-hover:border-white/20'
                  }`}>
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      {rec.category === 'essential' && (
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          ESSENTIEL
                        </div>
                      )}
                      {(option.recommended || option.popular) && (
                        <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          POPULAIRE
                        </div>
                      )}
                    </div>

                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-3 rounded-xl ${
                        isSelected
                          ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500'
                          : 'bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20'
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
                          <div className="flex items-start gap-2 bg-violet-500/10 border border-violet-400/20 rounded-lg p-2">
                            <Info className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                            <p className="text-violet-300 text-xs font-inter leading-snug">
                              {rec.reason}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4 text-xs">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-violet-400" />
                        <span className="text-white/60">{socialProof.popularityPercent}% clients</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-white/60">{socialProof.satisfactionRating}/5</span>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <div className="mb-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
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
                            className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white py-3 rounded-xl font-montserrat font-bold flex items-center justify-center gap-2"
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
                              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-white"
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
                              className="w-10 h-10 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 rounded-lg flex items-center justify-center text-white"
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-6"
        >
          {totalSelected > 0 && (
            <div className="bg-slate-900/90 backdrop-blur-xl border border-violet-400/30 rounded-2xl p-6 w-full max-w-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white/60 text-sm font-inter mb-1">
                    {totalSelected} option{totalSelected > 1 ? 's' : ''} sélectionnée{totalSelected > 1 ? 's' : ''}
                  </div>
                  <div className="text-3xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                    +{optionsTotal}€
                  </div>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 text-sm">
                  <Check className="w-4 h-4" />
                  <span className="font-inter">Options ajoutées</span>
                </div>
              </div>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContinue}
            className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white px-12 py-5 rounded-xl font-montserrat font-bold text-lg flex items-center gap-3 shadow-2xl"
          >
            Voir le récapitulatif final
            <ArrowRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
