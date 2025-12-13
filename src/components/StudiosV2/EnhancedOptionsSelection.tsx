import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Sparkles, TrendingUp, Info } from 'lucide-react';
import { Formula, Option, Duration } from '../../data/studiosLaunch/config';
import { getSmartUpsells } from '../../data/studiosLaunch/packages';
import SmartRecommendations from './SmartRecommendations';
import PackageBundles from './PackageBundles';

interface EnhancedOptionsSelectionProps {
  formulas: Formula[];
  options: Option[];
  selectedFormula: Formula | null;
  selectedOptions: Map<string, number>;
  duration: Duration;
  onFormulaSelect: (formula: Formula) => void;
  onOptionToggle: (optionId: string, quantity: number) => void;
  onBack: () => void;
}

export default function EnhancedOptionsSelection({
  formulas,
  options,
  selectedFormula,
  selectedOptions,
  duration,
  onFormulaSelect,
  onOptionToggle,
  onBack
}: EnhancedOptionsSelectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('equipment');
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [smartUpsells, setSmartUpsells] = useState<string[]>([]);

  useEffect(() => {
    const selectedIds = Array.from(selectedOptions.keys());
    const upsells = getSmartUpsells(selectedIds, selectedFormula?.id);
    setSmartUpsells(upsells);
  }, [selectedOptions, selectedFormula]);

  const getFormulaPrice = (formula: Formula) => {
    if (formula.included) return 0;
    const ratio = duration.hours / 4;
    return Math.round(formula.priceFor4h * ratio);
  };

  const equipmentOptions = options.filter(opt => opt.category === 'equipment');
  const postprodOptions = options.filter(opt => opt.category === 'postprod');
  const expertOptions = options.filter(opt => opt.category === 'expert');
  const distributionOptions = options.filter(opt => opt.category === 'distribution');

  const categories = [
    { id: 'equipment', label: 'Équipement', icon: '🎥', count: equipmentOptions.length },
    { id: 'postprod', label: 'Post-Production', icon: '🎬', count: postprodOptions.length },
    { id: 'expert', label: 'Services Experts', icon: '🎯', count: expertOptions.length },
    { id: 'distribution', label: 'Diffusion', icon: '🚀', count: distributionOptions.length }
  ];

  const getOptionsForCategory = (category: string) => {
    switch(category) {
      case 'equipment': return equipmentOptions;
      case 'postprod': return postprodOptions;
      case 'expert': return expertOptions;
      case 'distribution': return distributionOptions;
      default: return [];
    }
  };

  const renderOptionCard = (option: Option) => {
    const isSelected = selectedOptions.has(option.id);
    const quantity = selectedOptions.get(option.id) || 0;

    return (
      <motion.div
        key={option.id}
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02, y: -4 }}
        onClick={() => onOptionToggle(option.id, isSelected ? 0 : 1)}
        className={`relative bg-slate-900 border-2 rounded-2xl p-6 cursor-pointer transition-all ${
          isSelected
            ? 'border-violet-500 shadow-lg shadow-violet-500/25'
            : 'border-slate-800 hover:border-slate-700'
        }`}
      >
        {option.badge && (
          <div className="absolute -top-3 left-6 z-10">
            <div className={`px-3 py-1 text-white text-xs font-semibold rounded-full ${
              option.badge === 'Best-seller' || option.badge === 'Viral' ? 'bg-gradient-to-r from-orange-500 to-red-500' :
              option.badge === 'Essential' || option.badge === 'Recommandé' ? 'bg-gradient-to-r from-violet-600 to-pink-600' :
              option.badge === 'Premium' ? 'bg-gradient-to-r from-amber-500 to-yellow-500' :
              'bg-slate-700'
            }`}>
              {option.badge}
            </div>
          </div>
        )}

        {option.popular && (
          <div className="absolute -top-3 right-6 z-10">
            <div className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Populaire
            </div>
          </div>
        )}

        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="text-4xl">{option.icon}</div>

            <div className="flex-1">
              <h5 className="text-lg font-bold text-white mb-1">
                {option.name}
              </h5>
              <p className="text-slate-400 text-sm mb-3">
                {option.description}
              </p>

              {option.savings && (
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">
                    {option.savings}
                  </span>
                </div>
              )}

              {option.example && (
                <div className="flex items-start gap-2 text-slate-500 text-xs">
                  <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  <span>{option.example}</span>
                </div>
              )}
            </div>
          </div>

          <div className="text-right ml-4">
            <div className="text-2xl font-bold text-white mb-1">
              {option.price}€
            </div>
            <div className="text-slate-400 text-xs">
              {option.unit}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOptionToggle(option.id, isSelected ? 0 : 1);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
              isSelected
                ? 'bg-violet-600 text-white'
                : 'bg-white/5 text-white hover:bg-white/10'
            }`}
          >
            {isSelected ? (
              <>
                <Check className="w-4 h-4" />
                Ajouté
              </>
            ) : (
              'Ajouter'
            )}
          </button>

          {isSelected && (
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-sm font-semibold">
                +{option.price}€ ajouté au total
              </span>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour
        </button>

        <h3 className="text-2xl font-bold text-white mb-2">
          Personnalisez votre package
        </h3>
        <p className="text-slate-400">
          Ajoutez des services pour maximiser l'impact de votre contenu
        </p>
      </div>

      {showRecommendations && smartUpsells.length > 0 && (
        <SmartRecommendations
          recommendedOptionIds={smartUpsells}
          selectedOptions={selectedOptions}
          onAddOption={(optionId) => onOptionToggle(optionId, 1)}
          onDismiss={() => setShowRecommendations(false)}
        />
      )}

      <div>
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
          <span className="text-xl">📹</span>
          <h4 className="text-lg font-bold text-white">
            FORMULE DE BASE
          </h4>
        </div>

        <div className="space-y-4">
          {formulas.map((formula) => {
            const isSelected = selectedFormula?.id === formula.id;
            const price = getFormulaPrice(formula);

            return (
              <motion.div
                key={formula.id}
                onClick={() => onFormulaSelect(formula)}
                whileHover={{ scale: 1.01 }}
                className={`relative bg-slate-900 border-2 rounded-xl p-6 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-violet-500 shadow-lg shadow-violet-500/25'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {formula.badge && (
                  <div className="absolute -top-3 left-6">
                    <div className="px-3 py-1 bg-gradient-to-r from-violet-600 to-pink-600 text-white text-xs font-semibold rounded-full">
                      {formula.badge}
                    </div>
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                      isSelected ? 'border-violet-500 bg-violet-500' : 'border-slate-600'
                    }`}>
                      {isSelected && (
                        <div className="w-3 h-3 bg-white rounded-full" />
                      )}
                    </div>

                    <div>
                      <h5 className="text-lg font-bold text-white mb-1">
                        {formula.name}
                      </h5>
                      <p className="text-slate-400 text-sm mb-3">
                        {formula.description}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    {formula.included ? (
                      <span className="text-green-400 font-semibold">Inclus</span>
                    ) : (
                      <span className="text-white font-bold text-xl">
                        +{price}€
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2 pl-10">
                  {formula.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-800">
          <span className="text-xl">✨</span>
          <h4 className="text-lg font-bold text-white">
            SERVICES ADDITIONNELS
          </h4>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span className="px-2 py-0.5 bg-white/10 rounded-full text-xs">
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {getOptionsForCategory(activeCategory).map(renderOptionCard)}
        </div>
      </div>

      {selectedOptions.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-violet-900/20 to-pink-900/20 border border-violet-500/30 rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-violet-400" />
            <h4 className="text-lg font-bold text-white">
              Votre configuration personnalisée
            </h4>
          </div>
          <p className="text-slate-300">
            Vous avez ajouté {selectedOptions.size} service{selectedOptions.size > 1 ? 's' : ''} additionnel{selectedOptions.size > 1 ? 's' : ''}.
            Consultez le récapitulatif à droite pour voir votre total.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
