import { motion } from 'framer-motion';
import { ArrowLeft, TrendingDown } from 'lucide-react';
import { Duration, Studio } from '../../data/studiosLaunch/config';
import { calculateDurationPrice, formatPrice } from '../../utils/pricingCalculations';

interface DurationSelectionStepProps {
  durations: Duration[];
  selectedDuration: Duration | null;
  studio: Studio;
  onSelect: (duration: Duration) => void;
  onBack: () => void;
}

export default function DurationSelectionStep({
  durations,
  selectedDuration,
  studio,
  onSelect,
  onBack
}: DurationSelectionStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Retour
      </button>

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">
          Combien de temps avez-vous besoin du studio ?
        </h3>
        <p className="text-slate-400">
          Plus vous réservez longtemps, plus vous économisez
        </p>
      </div>

      <div className="space-y-4">
        {durations.map((duration, index) => {
          const pricing = calculateDurationPrice(studio, duration);
          const isSelected = selectedDuration?.id === duration.id;

          return (
            <motion.div
              key={duration.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelect(duration)}
              className={`relative bg-slate-900 border-2 rounded-2xl p-6 cursor-pointer transition-all hover:scale-[1.01] ${
                isSelected
                  ? 'border-violet-500 shadow-lg shadow-violet-500/25'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {duration.badge && (
                <div className="absolute -top-3 left-6">
                  <div className="px-3 py-1 bg-gradient-to-r from-violet-600 to-pink-600 text-white text-xs font-semibold rounded-full">
                    {duration.badge}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? 'border-violet-500 bg-violet-500' : 'border-slate-600'
                  }`}>
                    {isSelected && (
                      <div className="w-3 h-3 bg-white rounded-full" />
                    )}
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-white mb-1">
                      {duration.label}
                    </h4>
                    <p className="text-slate-400 text-sm">
                      {duration.description}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold text-white">
                      {formatPrice(pricing.price)}
                    </span>
                    <span className="text-slate-400 text-sm">
                      ({formatPrice(pricing.pricePerHour)}/h)
                    </span>
                  </div>

                  {duration.discountPercent > 0 ? (
                    <div className="flex items-center gap-2 justify-end">
                      <span className="text-slate-500 line-through text-sm">
                        {formatPrice(pricing.normalPrice)}
                      </span>
                      <div className="flex items-center gap-1 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                        <TrendingDown className="w-3 h-3 text-green-400" />
                        <span className="text-green-400 text-xs font-semibold">
                          -{duration.discountPercent}% • Économisez {formatPrice(pricing.savings)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-slate-500 text-sm">
                      Sans réduction supplémentaire
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
        <p className="text-slate-400 text-sm">
          💡 <strong className="text-white">Astuce :</strong> La demi-journée (4h) est idéale pour tourner 2-3 vidéos de qualité avec notre formule Post-Production.
        </p>
      </div>
    </motion.div>
  );
}
