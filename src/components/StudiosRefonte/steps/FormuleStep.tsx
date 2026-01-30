/**
 * FormuleStep - Step 2: Formula Selection
 * Refonte UX: plus compact, tableau comparatif collapsible
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FORMULES } from '../../../data/studios';
import type { FormuleStepProps } from './types';

export default function FormuleStep({
  selectedFormule,
  selectedDuration,
  onSelectFormule,
}: FormuleStepProps) {
  const [showComparison, setShowComparison] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="space-y-5"
    >
      {/* Header compact */}
      <div className="text-center mb-4">
        <h2 className="text-xl md:text-2xl font-montserrat font-black text-white mb-1">
          Choisissez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">formule</span>
        </h2>
        <p className="text-white/60 text-sm">Quel niveau d'accompagnement souhaitez-vous{'\u00A0'}?</p>
      </div>

      {/* Formules - horizontal on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {FORMULES.map((formule) => {
          const isSelected = selectedFormule?.id === formule.id;
          const variant = formule.variants.find(v => v.duration === selectedDuration);
          const price = variant?.price || 0;

          return (
            <motion.button
              key={formule.id}
              onClick={() => onSelectFormule(formule)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/20'
                  : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
              }`}
            >
              {/* Recommended badge */}
              {formule.recommended && (
                <div className="absolute -top-2 right-3 px-2 py-0.5 bg-amber-500 rounded-full text-[10px] font-bold text-black">
                  Recommandé
                </div>
              )}

              {/* Header with icon */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{formule.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-bold text-base ${isSelected ? 'text-emerald-400' : 'text-white'}`}>
                      {formule.name}
                    </h3>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </div>
                  <p className="text-xs text-white/50">{formule.tagline}</p>
                </div>
              </div>

              {/* Features - compact list */}
              <div className="space-y-1.5 mb-4">
                {formule.features.slice(0, 3).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                      isSelected ? 'text-emerald-400' : 'text-white/40'
                    }`} />
                    <span className="text-xs text-white/70 leading-tight">{feature}</span>
                  </div>
                ))}
                {formule.features.length > 3 && (
                  <div className="text-[10px] text-white/40 ml-5">
                    +{formule.features.length - 3} autres...
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                {price === 0 ? (
                  <span className="text-lg font-black text-emerald-400">Inclus</span>
                ) : (
                  <div>
                    <span className={`text-lg font-black ${isSelected ? 'text-emerald-400' : 'text-white'}`}>
                      +{price}€
                    </span>
                    <span className="text-[10px] text-white/40 ml-1">/{selectedDuration}</span>
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Collapsible Comparison Table */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-white/40" />
            <span className="text-sm font-bold text-white">Comparatif des formules</span>
          </div>
          {showComparison ? (
            <ChevronUp className="w-5 h-5 text-white/40" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white/40" />
          )}
        </button>

        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 px-2 text-white/50 text-xs font-medium">Inclus</th>
                        {FORMULES.map(f => (
                          <th key={f.id} className="text-center py-2 px-2">
                            <span className="text-xs text-white">{f.icon}</span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      {[
                        { label: 'Installation matériel', values: [true, true, true] },
                        { label: 'Tech dédié', values: [false, true, true] },
                        { label: 'Montage inclus', values: [false, false, true] },
                        { label: 'Script inclus', values: [false, false, true] },
                        { label: 'Livraison clé en main', values: [false, false, true] },
                      ].map((row, idx) => (
                        <tr key={idx} className="border-b border-white/5 last:border-0">
                          <td className="py-2 px-2 text-white/60">{row.label}</td>
                          {row.values.map((val, i) => (
                            <td key={i} className="text-center py-2 px-2">
                              {val ? (
                                <Check className="w-4 h-4 text-emerald-400 mx-auto" />
                              ) : (
                                <X className="w-4 h-4 text-white/20 mx-auto" />
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
