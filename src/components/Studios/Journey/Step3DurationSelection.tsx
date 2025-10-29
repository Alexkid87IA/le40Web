import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Clock, TrendingDown, Sparkles, Info } from 'lucide-react';
import { durations } from '../../../data/studios/formulas';
import { studioSetups } from '../../../data/studios/setups';
import { formulas } from '../../../data/studios/formulas';

interface Step3DurationSelectionProps {
  selectedStudioId: string;
  selectedFormulaId: string;
  selectedDurationId: string | null;
  onDurationSelect: (durationId: string) => void;
  onContinue: () => void;
}

export default function Step3DurationSelection({
  selectedStudioId,
  selectedFormulaId,
  selectedDurationId,
  onDurationSelect,
  onContinue
}: Step3DurationSelectionProps) {
  const studio = studioSetups.find(s => s.id === selectedStudioId);
  const formula = formulas.find(f => f.id === selectedFormulaId);
  const selectedDuration = durations.find(d => d.id === selectedDurationId);

  if (!studio || !formula) return null;

  const calculatePrice = (durationId: string) => {
    const duration = durations.find(d => d.id === durationId);
    if (!duration) return { total: 0, perHour: 0, savings: 0, originalTotal: 0 };

    const hourlyRate = studio.basePrice * formula.priceMultiplier;
    const originalTotal = hourlyRate * duration.hours;
    const total = hourlyRate * duration.multiplier;
    const perHour = total / duration.hours;
    const savings = originalTotal - total;

    return { total: Math.round(total), perHour: Math.round(perHour), savings: Math.round(savings), originalTotal: Math.round(originalTotal) };
  };

  return (
    <section className="py-16 bg-gradient-to-b from-black via-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full bg-gradient-to-r from-teal-500/10 to-emerald-500/10 border border-teal-400/30 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-teal-300 font-inter text-sm font-bold">Étape 3 sur 4</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-montserrat font-black text-white mb-6">
            CHOISISSEZ LA
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400">
              DURÉE DE LOCATION
            </span>
          </h2>

          <p className="text-xl text-white/70 max-w-3xl mx-auto font-inter leading-relaxed mb-4">
            Plus vous réservez longtemps, plus vous économisez
          </p>

          <div className="flex items-center justify-center gap-4 text-sm flex-wrap">
            <div className="inline-flex items-center gap-2 text-white/50">
              <Info className="w-4 h-4" />
              <span className="font-inter">Studio: <span className="text-cyan-400 font-bold">{studio.name}</span></span>
            </div>
            <div className="inline-flex items-center gap-2 text-white/50">
              <Info className="w-4 h-4" />
              <span className="font-inter">Formule: <span className="text-blue-400 font-bold">{formula.name}</span></span>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          {durations.map((duration, index) => {
            const isSelected = selectedDurationId === duration.id;
            const pricing = calculatePrice(duration.id);

            return (
              <motion.div
                key={duration.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => onDurationSelect(duration.id)}
                className="group relative cursor-pointer h-full"
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-3xl blur-xl transition-all duration-500"
                  animate={{
                    opacity: isSelected ? 0.5 : 0,
                  }}
                />

                <div className={`relative bg-slate-900/90 backdrop-blur-2xl rounded-3xl p-8 border-2 transition-all duration-500 h-full flex flex-col ${
                  isSelected ? 'border-teal-400 shadow-xl shadow-teal-500/20' : 'border-white/10 group-hover:border-white/30'
                }`}>
                  {duration.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl">
                        <TrendingDown className="w-3 h-3" />
                        MEILLEUR RAPPORT
                      </div>
                    </div>
                  )}

                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-6 right-6 bg-teal-500 text-white p-2 rounded-full shadow-xl"
                    >
                      <Check className="w-5 h-5" />
                    </motion.div>
                  )}

                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                    isSelected ? 'bg-gradient-to-r from-teal-500 to-emerald-500' : 'bg-gradient-to-r from-teal-500/20 to-emerald-500/20'
                  }`}>
                    <Clock className="w-8 h-8 text-white" />
                  </div>

                  <div className="mb-6">
                    <h3 className="text-3xl font-montserrat font-black text-white mb-2">
                      {duration.label}
                    </h3>
                    <p className="text-white/60 font-inter text-sm mb-1">
                      {duration.hours} heure{duration.hours > 1 ? 's' : ''} de tournage
                    </p>
                    {duration.discount && (
                      <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 rounded-lg px-3 py-1.5 mt-2">
                        <TrendingDown className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 font-inter font-bold text-sm">
                          Économie de {duration.discount}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 mb-6">
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-4xl font-montserrat font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
                        {pricing.total}€
                      </span>
                      <span className="text-white/50 text-sm font-inter">total</span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between text-white/60">
                        <span className="font-inter">Prix par heure:</span>
                        <span className="font-inter font-bold text-white">{pricing.perHour}€/h</span>
                      </div>
                      {pricing.savings > 0 && (
                        <>
                          <div className="flex items-center justify-between text-white/40">
                            <span className="font-inter line-through">Prix standard:</span>
                            <span className="font-inter line-through">{pricing.originalTotal}€</span>
                          </div>
                          <div className="flex items-center justify-between text-emerald-400">
                            <span className="font-inter font-bold">Vous économisez:</span>
                            <span className="font-inter font-bold">{pricing.savings}€</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 mb-6 flex-1">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-teal-400 flex-shrink-0" />
                      <span className="text-white/80 font-inter text-sm">Installation incluse</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="text-white/80 font-inter text-sm">Technicien dédié</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span className="text-white/80 font-inter text-sm">Rushs livrés en 2h</span>
                    </div>
                  </div>

                  <div className={`px-4 py-3 rounded-xl border-2 text-center font-montserrat font-bold transition-all ${
                    isSelected
                      ? 'bg-teal-500 border-teal-400 text-white'
                      : 'bg-white/5 border-white/10 text-white/60 group-hover:border-white/20'
                  }`}>
                    {isSelected ? '✓ Durée sélectionnée' : 'Sélectionner'}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-400/30 rounded-2xl p-8 mb-8 max-w-4xl mx-auto"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-montserrat font-black text-white mb-2">
                Pourquoi réserver plus longtemps ?
              </h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <p className="text-white/80 font-inter text-sm">
                    <strong className="text-white">Économies substantielles:</strong> Jusqu'à -28% sur le tarif horaire avec la formule Journée
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                  <p className="text-white/80 font-inter text-sm">
                    <strong className="text-white">Plus de créativité:</strong> Temps suffisant pour expérimenter et obtenir le résultat parfait
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <p className="text-white/80 font-inter text-sm">
                    <strong className="text-white">Moins de stress:</strong> Tournage détendu sans pression du temps
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {selectedDuration && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onContinue}
                className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white px-12 py-5 rounded-xl font-montserrat font-bold text-lg flex items-center gap-3 shadow-2xl"
              >
                Voir les options disponibles
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
