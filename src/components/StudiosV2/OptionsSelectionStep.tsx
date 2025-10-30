import { motion } from 'framer-motion';
import { ArrowLeft, Check } from 'lucide-react';
import { Formula, Option, Duration } from '../../data/studiosLaunch/config';

interface OptionsSelectionStepProps {
  formulas: Formula[];
  options: Option[];
  selectedFormula: Formula | null;
  selectedOptions: Map<string, number>;
  duration: Duration;
  onFormulaSelect: (formula: Formula) => void;
  onOptionToggle: (optionId: string, quantity: number) => void;
  onBack: () => void;
}

export default function OptionsSelectionStep({
  formulas,
  options,
  selectedFormula,
  selectedOptions,
  duration,
  onFormulaSelect,
  onOptionToggle,
  onBack
}: OptionsSelectionStepProps) {
  const getFormulaPrice = (formula: Formula) => {
    if (formula.included) return 0;
    const ratio = duration.hours / 4;
    return Math.round(formula.priceFor4h * ratio);
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
          Personnalisez votre réservation
        </h3>
        <p className="text-slate-400">
          Choisissez vos services de production et options additionnelles
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
          <span className="text-xl">📹</span>
          <h4 className="text-lg font-bold text-white">
            OPTIONS DE PRODUCTION
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
                      <span className="text-green-400 font-semibold">Inclus • 0€</span>
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
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
          <span className="text-xl">➕</span>
          <h4 className="text-lg font-bold text-white">
            OPTIONS SUPPLÉMENTAIRES
          </h4>
        </div>

        <div className="space-y-3">
          {options.map((option) => {
            const isSelected = selectedOptions.has(option.id);
            const quantity = selectedOptions.get(option.id) || 0;
            const optionPrice = option.unit === '/h'
              ? option.price * duration.hours
              : option.price;

            return (
              <motion.div
                key={option.id}
                whileHover={{ scale: 1.01 }}
                className={`bg-slate-900 border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-violet-500 shadow-lg shadow-violet-500/25'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <button
                      onClick={() => onOptionToggle(option.id, isSelected ? 0 : 1)}
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                        isSelected ? 'border-violet-500 bg-violet-500' : 'border-slate-600'
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </button>

                    <div className="flex-1">
                      <h5 className="text-white font-semibold">
                        {option.name}
                      </h5>
                      <p className="text-slate-400 text-sm">
                        {option.description}
                      </p>
                      {option.minimum && (
                        <p className="text-slate-500 text-xs mt-1">
                          Minimum {option.minimum} {option.unit === '/personne' ? 'personnes' : 'unités'}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-white font-bold">
                      +{option.price}€{option.unit}
                    </span>
                    {option.unit === '/h' && (
                      <p className="text-slate-400 text-sm">
                        ({optionPrice}€ pour {duration.hours}h)
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
