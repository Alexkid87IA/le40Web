/**
 * FormuleStep - Step 2: Formula Selection
 */

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { FORMULES } from '../../../data/studios';
import type { FormuleStepProps } from './types';

export default function FormuleStep({
  selectedFormule,
  selectedDuration,
  onSelectFormule,
}: FormuleStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-montserrat font-black text-white mb-2">
          Choisissez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">formule</span>
        </h2>
        <p className="text-white/60">Quel niveau d'accompagnement souhaitez-vous ?</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {FORMULES.map((formule) => {
          const isSelected = selectedFormule?.id === formule.id;
          const variant = formule.variants.find(v => v.duration === selectedDuration);
          const price = variant?.price || 0;

          return (
            <motion.button
              key={formule.id}
              onClick={() => onSelectFormule(formule)}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-6 rounded-2xl border-2 text-left transition-all ${
                isSelected
                  ? `border-${formule.color}-500 bg-${formule.color}-500/10 shadow-lg shadow-${formule.color}-500/20`
                  : 'border-white/10 bg-zinc-900/50 hover:border-white/20'
              }`}
            >
              {formule.recommended && (
                <div className="absolute -top-3 left-4 px-3 py-1 bg-amber-500 rounded-full text-xs font-bold text-black">
                  Recommandé
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{formule.icon}</span>
                <div>
                  <h3 className="font-bold text-xl text-white">{formule.name}</h3>
                  <p className="text-sm text-white/60">{formule.tagline}</p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {formule.features.slice(0, 5).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      isSelected ? `text-${formule.color}-400` : 'text-emerald-400'
                    }`} />
                    <span className="text-sm text-white/80">{feature}</span>
                  </div>
                ))}
                {formule.features.length > 5 && (
                  <div className="text-sm text-white/40">
                    +{formule.features.length - 5} autres avantages...
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div>
                  {price === 0 ? (
                    <span className="text-2xl font-black text-emerald-400">Inclus</span>
                  ) : (
                    <>
                      <span className="text-2xl font-black text-white">+{price}€</span>
                      <span className="text-sm text-white/60 ml-1">pour {selectedDuration}</span>
                    </>
                  )}
                </div>

                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`w-8 h-8 rounded-full bg-${formule.color}-500 flex items-center justify-center`}
                  >
                    <Check className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Comparison Table */}
      <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h3 className="font-bold text-lg text-white mb-4">Comparatif des formules</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-white/60">Inclus</th>
                {FORMULES.map(f => (
                  <th key={f.id} className="text-center py-3 px-4 text-white">{f.icon} {f.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 text-white/80">Installation matériel</td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 text-white/80">Tech dédié</td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-white/20 mx-auto" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 text-white/80">Montage inclus</td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-white/20 mx-auto" /></td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-white/20 mx-auto" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-3 px-4 text-white/80">Script inclus</td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-white/20 mx-auto" /></td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-white/20 mx-auto" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white/80">Livraison clé en main</td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-white/20 mx-auto" /></td>
                <td className="text-center py-3 px-4"><X className="w-5 h-5 text-white/20 mx-auto" /></td>
                <td className="text-center py-3 px-4"><Check className="w-5 h-5 text-emerald-400 mx-auto" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
