import { motion } from 'framer-motion';
import { Check, Edit2, Calendar, Clock, Package, Sparkles } from 'lucide-react';
import { Studio, Duration, Formula, Option } from '../../data/studiosLaunch/config';
import { formatPrice } from '../../utils/pricingCalculations';

interface FinalSummaryCardProps {
  studio: Studio | null;
  duration: Duration | null;
  formula: Formula;
  selectedOptions: Map<string, number>;
  options: Option[];
  selectedDate: Date | null;
  selectedTime: string | null;
  totalPrice: number;
  onEdit: (section: 'studio' | 'duration' | 'formula' | 'options' | 'datetime') => void;
}

export default function FinalSummaryCard({
  studio,
  duration,
  formula,
  selectedOptions,
  options,
  selectedDate,
  selectedTime,
  totalPrice,
  onEdit
}: FinalSummaryCardProps) {
  const studioPrice = studio && duration ? studio.priceDiscounted * duration.multiplier : 0;
  const formulaPrice = duration ? formula.priceFor4h * (duration.hours / 4) : 0;

  const optionsPrice = Array.from(selectedOptions.entries()).reduce((sum, [optionId, quantity]) => {
    const option = options.find(o => o.id === optionId);
    return sum + (option ? option.price * quantity : 0);
  }, 0);

  const savings = studio && duration ? (studio.priceNormal - studio.priceDiscounted) * duration.multiplier : 0;

  const isComplete = studio && duration && selectedDate && selectedTime;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl"
    >
      <div className="bg-gradient-to-r from-violet-600 to-pink-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-white" />
            <h3 className="text-xl font-bold text-white">Récapitulatif</h3>
          </div>
          {isComplete && (
            <div className="px-3 py-1 bg-white/20 rounded-full">
              <span className="text-white text-xs font-semibold">Prêt à réserver</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {studio ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Studio sélectionné</span>
              <button
                onClick={() => onEdit('studio')}
                className="text-violet-400 hover:text-violet-300 text-sm flex items-center gap-1"
              >
                <Edit2 className="w-3 h-3" />
                Modifier
              </button>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4">
              <h4 className="text-white font-semibold mb-1">{studio.name}</h4>
              <p className="text-slate-400 text-sm mb-2">{studio.subtitle}</p>
              {duration && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">{duration.hours}h</span>
                  <span className="text-white font-semibold">
                    {formatPrice(studioPrice)}€
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <Package className="w-12 h-12 text-slate-700 mx-auto mb-2" />
            <p className="text-slate-500 text-sm">Aucun studio sélectionné</p>
          </div>
        )}

        {duration && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Durée</span>
              <button
                onClick={() => onEdit('duration')}
                className="text-violet-400 hover:text-violet-300 text-sm flex items-center gap-1"
              >
                <Edit2 className="w-3 h-3" />
                Modifier
              </button>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">{duration.label}</span>
                {duration.discountPercent > 0 && (
                  <span className="px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-green-400 text-xs font-semibold">
                    -{duration.discountPercent}%
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {formula && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Formule</span>
              <button
                onClick={() => onEdit('formula')}
                className="text-violet-400 hover:text-violet-300 text-sm flex items-center gap-1"
              >
                <Edit2 className="w-3 h-3" />
                Modifier
              </button>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold">{formula.name}</h4>
                {formulaPrice > 0 && (
                  <span className="text-white font-semibold">
                    +{formatPrice(formulaPrice)}€
                  </span>
                )}
              </div>
              <div className="space-y-1">
                {formula.features.slice(0, 3).map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-400 text-xs">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedOptions.size > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">
                Options ({selectedOptions.size})
              </span>
              <button
                onClick={() => onEdit('options')}
                className="text-violet-400 hover:text-violet-300 text-sm flex items-center gap-1"
              >
                <Edit2 className="w-3 h-3" />
                Modifier
              </button>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 space-y-2">
              {Array.from(selectedOptions.entries()).map(([optionId, quantity]) => {
                const option = options.find(o => o.id === optionId);
                if (!option) return null;

                return (
                  <div key={optionId} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">{option.name}</span>
                      {quantity > 1 && (
                        <span className="text-slate-500 text-xs">×{quantity}</span>
                      )}
                    </div>
                    <span className="text-white font-semibold">
                      +{formatPrice(option.price * quantity)}€
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {selectedDate && selectedTime && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Date et heure</span>
              <button
                onClick={() => onEdit('datetime')}
                className="text-violet-400 hover:text-violet-300 text-sm flex items-center gap-1"
              >
                <Edit2 className="w-3 h-3" />
                Modifier
              </button>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-white">
                <Calendar className="w-4 h-4 text-violet-400" />
                <span className="font-semibold">
                  {selectedDate.toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Clock className="w-4 h-4 text-violet-400" />
                <span className="font-semibold">{selectedTime}</span>
              </div>
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-slate-800 space-y-3">
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Studio {duration?.hours}h</span>
              <span className="text-white">{formatPrice(studioPrice)}€</span>
            </div>
            {formulaPrice > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-slate-400">{formula.name}</span>
                <span className="text-white">{formatPrice(formulaPrice)}€</span>
              </div>
            )}
            {optionsPrice > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Options</span>
                <span className="text-white">{formatPrice(optionsPrice)}€</span>
              </div>
            )}
            {savings > 0 && (
              <div className="flex items-center justify-between text-green-400">
                <span>Réduction offre découverte</span>
                <span>-{formatPrice(savings)}€</span>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-white font-bold text-lg">Total</span>
              <div className="text-right">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
                  {formatPrice(totalPrice)}€
                </div>
                {savings > 0 && (
                  <div className="text-xs text-slate-500 line-through">
                    {formatPrice(totalPrice + savings)}€
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
