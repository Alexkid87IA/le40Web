import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, X, Plus } from 'lucide-react';
import { options, Option } from '../../data/studiosLaunch/config';

interface SmartRecommendationsProps {
  recommendedOptionIds: string[];
  selectedOptions: Map<string, number>;
  onAddOption: (optionId: string) => void;
  onDismiss: () => void;
}

export default function SmartRecommendations({
  recommendedOptionIds,
  selectedOptions,
  onAddOption,
  onDismiss
}: SmartRecommendationsProps) {
  const recommendedOptions = recommendedOptionIds
    .filter(id => !selectedOptions.has(id))
    .map(id => options.find(opt => opt.id === id))
    .filter((opt): opt is Option => opt !== undefined)
    .slice(0, 3);

  if (recommendedOptions.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 border border-amber-500/30 rounded-2xl p-6 mb-8"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">
                Recommandations intelligentes
              </h4>
              <p className="text-amber-200/80 text-sm">
                Services qui complètent parfaitement votre sélection
              </p>
            </div>
          </div>
          <button
            onClick={onDismiss}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {recommendedOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/50 border border-amber-500/20 rounded-xl p-4"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="text-2xl">{option.icon}</div>
                <div className="flex-1">
                  <h5 className="text-white font-semibold text-sm mb-1">
                    {option.name}
                  </h5>
                  <p className="text-slate-400 text-xs mb-2">
                    {option.description}
                  </p>
                  {option.savings && (
                    <p className="text-amber-400 text-xs font-medium">
                      💡 {option.savings}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <span className="text-white font-bold">
                  {option.price}€
                </span>
                <button
                  onClick={() => onAddOption(option.id)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-sm font-semibold rounded-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-amber-500/20">
          <p className="text-amber-200/70 text-xs">
            💡 Ces recommandations sont basées sur votre configuration actuelle et les choix des créateurs qui ont réussi.
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
