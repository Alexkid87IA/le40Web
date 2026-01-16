/**
 * ExtraDetailModal - Modal for viewing extra details
 */

import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { EXTRAS_CATEGORIES, getExtraIncludes } from '../../../data/studios';
import type { ExtraDetailModalProps } from './types';

export default function ExtraDetailModal({
  extra,
  selectedExtras,
  onClose,
  onToggleExtra,
}: ExtraDetailModalProps) {
  if (!extra) return null;

  const isSelected = selectedExtras.some(e => e.id === extra.id);
  const Icon = extra.icon;

  return (
    <AnimatePresence>
      {extra && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md mx-auto max-h-[90vh] flex flex-col"
          >
            <div className="bg-gradient-to-br from-zinc-900 to-black border-2 border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-full">
              {/* Header with icon - compact */}
              <div className="relative bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-4 pb-4 flex-shrink-0">
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
                >
                  <X className="w-4 h-4 text-white" />
                </button>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1 min-w-0 pr-8">
                    <h3 className="text-lg font-montserrat font-black text-white leading-tight">
                      {extra.name}
                    </h3>
                    <span className="text-xs text-white/60">
                      {EXTRAS_CATEGORIES.find(c => c.id === extra.category)?.name || extra.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content - scrollable */}
              <div className="p-4 overflow-y-auto flex-1">
                {/* Description */}
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-white/60 uppercase tracking-wide mb-1">Description</h4>
                  <p className="text-sm text-white/90 leading-relaxed">
                    {extra.description}
                  </p>
                </div>

                {/* What's included */}
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-white/60 uppercase tracking-wide mb-2">Ce qui est inclus</h4>
                  <ul className="space-y-1.5">
                    {getExtraIncludes(extra).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-white/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Fixed footer with price and buttons */}
              <div className="p-4 border-t border-white/10 bg-zinc-900/50 flex-shrink-0">
                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-white/60">Tarif</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-white">{extra.price}€</span>
                    <span className="text-white/50 text-sm ml-1">{extra.unit}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <motion.button
                    onClick={onClose}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-2.5 px-4 bg-white/10 text-white text-sm font-semibold rounded-xl hover:bg-white/20 transition-all"
                  >
                    Fermer
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      onToggleExtra(extra);
                      onClose();
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 py-2.5 px-4 font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 ${
                      isSelected
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <X className="w-4 h-4" />
                        Retirer
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        Ajouter
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
