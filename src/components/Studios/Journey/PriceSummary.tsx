import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, TrendingUp, Check, Info } from 'lucide-react';
import { studioSetups } from '../../../data/studios/setups';
import { formulas, durations } from '../../../data/studios/formulas';
import { optionsCatalog } from '../../../data/studios/options';

interface PriceSummaryProps {
  studioId: string | null;
  formulaId: string | null;
  durationId: string | null;
  selectedOptions: Record<string, number>;
  isVisible: boolean;
}

export default function PriceSummary({
  studioId,
  formulaId,
  durationId,
  selectedOptions,
  isVisible
}: PriceSummaryProps) {
  const studio = studioId ? studioSetups.find(s => s.id === studioId) : null;
  const formula = formulaId ? formulas.find(f => f.id === formulaId) : null;
  const duration = durationId ? durations.find(d => d.id === durationId) : null;

  const calculateBase = () => {
    if (!studio || !formula || !duration) return 0;
    const hourlyRate = Math.round(studio.basePrice * formula.priceMultiplier);
    return Math.round(hourlyRate * duration.hours * duration.multiplier);
  };

  const calculateOptions = () => {
    if (!duration) return 0;
    return Math.round(Object.entries(selectedOptions).reduce((total, [optionId, quantity]) => {
      const option = optionsCatalog[optionId as keyof typeof optionsCatalog];
      const price = option.unit === '/h' ? option.price * duration.hours : option.price;
      return total + (price * quantity);
    }, 0));
  };

  const basePrice = calculateBase();
  const optionsPrice = calculateOptions();
  const totalPrice = basePrice + optionsPrice;
  const hasOptions = Object.keys(selectedOptions).length > 0;

  if (!isVisible || !studio) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className="fixed right-8 top-32 z-20 w-80 hidden xl:block"
      >
        <div className="bg-slate-900/95 backdrop-blur-2xl border-2 border-cyan-400/30 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-cyan-400 text-xs font-inter font-bold uppercase tracking-wider">
                Votre devis
              </div>
              <div className="text-white text-sm font-montserrat font-bold">
                En temps réel
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {studio && (
              <div className="pb-4 border-b border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <div className="text-white/60 text-xs font-inter mb-1">Studio</div>
                    <div className="text-white font-inter font-bold text-sm">{studio.name}</div>
                  </div>
                  {formula && duration && (
                    <div className="text-right">
                      <div className="text-white font-montserrat font-black text-lg">
                        {basePrice}€
                      </div>
                      <div className="text-white/50 text-xs font-inter">
                        {duration.label}
                      </div>
                    </div>
                  )}
                </div>
                {formula && (
                  <div className="text-white/50 text-xs font-inter">
                    Formule: <span className="text-blue-400">{formula.name}</span>
                  </div>
                )}
              </div>
            )}

            {hasOptions && (
              <div className="pb-4 border-b border-white/10">
                <div className="text-white/60 text-xs font-inter mb-3 uppercase tracking-wider">
                  Options sélectionnées
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {Object.entries(selectedOptions).map(([optionId, quantity]) => {
                    const option = optionsCatalog[optionId as keyof typeof optionsCatalog];
                    const price = option.unit === '/h' && duration ? option.price * duration.hours * quantity : option.price * quantity;
                    return (
                      <div key={optionId} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 flex-1">
                          <Check className="w-3 h-3 text-orange-400 flex-shrink-0" />
                          <span className="text-white/80 font-inter truncate">
                            {option.name} {quantity > 1 ? `(×${quantity})` : ''}
                          </span>
                        </div>
                        <span className="text-white font-inter font-bold ml-2">
                          +{price}€
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-2xl p-5 mb-4">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-white/70 font-inter text-sm">Total TTC</span>
              <div className="text-right">
                <motion.div
                  key={totalPrice}
                  initial={{ scale: 1.2, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"
                >
                  {totalPrice}€
                </motion.div>
              </div>
            </div>
            {duration && (
              <div className="flex items-center justify-between text-xs text-white/50">
                <span className="font-inter">Prix par heure</span>
                <span className="font-inter font-bold">
                  {Math.round(totalPrice / duration.hours)}€/h
                </span>
              </div>
            )}
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-white/60 text-xs">
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="font-inter">Technicien expert inclus</span>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-xs">
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="font-inter">Rushs livrés en 2h</span>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-xs">
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="font-inter">Installation incluse</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-cyan-400 text-xs bg-cyan-500/10 rounded-lg p-3">
            <Info className="w-4 h-4 flex-shrink-0" />
            <span className="font-inter">
              Prix fixe, sans frais cachés
            </span>
          </div>

          {duration && duration.discount && (
            <div className="flex items-center gap-2 text-emerald-400 text-xs bg-emerald-500/10 rounded-lg p-3 mt-3">
              <TrendingUp className="w-4 h-4 flex-shrink-0" />
              <span className="font-inter">
                Vous économisez {duration.discount} sur ce forfait
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
