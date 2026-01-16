/**
 * ExtrasStep - Step 3: Extras Selection
 */

import { motion } from 'framer-motion';
import { Check, X, Search, Info } from 'lucide-react';
import { EXTRAS_CATEGORIES } from '../../../data/studios';
import type { ExtrasStepProps } from './types';

export default function ExtrasStep({
  selectedExtras,
  extraCategory,
  searchExtra,
  filteredExtras,
  extrasPrice,
  onToggleExtra,
  onSetCategory,
  onSetSearch,
  onOpenExtraDetail,
}: ExtrasStepProps) {
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
          Ajoutez des <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">extras</span>
        </h2>
        <p className="text-white/60">Personnalisez votre expérience (optionnel)</p>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {EXTRAS_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => onSetCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  extraCategory === cat.id
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={searchExtra}
            onChange={(e) => onSetSearch(e.target.value)}
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/40 focus:border-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Selected extras summary */}
      {selectedExtras.length > 0 && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-white">{selectedExtras.length} extra(s) sélectionné(s)</span>
            <span className="text-emerald-400 font-bold">+{extrasPrice}€</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedExtras.map((extra) => (
              <span
                key={extra.id}
                className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm text-white"
              >
                {extra.name}
                <button
                  onClick={() => onToggleExtra(extra)}
                  className="hover:text-red-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Extras grid - Premium design */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredExtras.map((extra) => {
          const isSelected = selectedExtras.some(e => e.id === extra.id);
          const Icon = extra.icon;

          return (
            <motion.div
              key={extra.id}
              whileHover={{ scale: 1.01, y: -2 }}
              className={`relative group p-5 rounded-2xl border-2 text-left transition-all duration-300 ${
                isSelected
                  ? 'border-emerald-500 bg-gradient-to-br from-emerald-500/15 to-teal-500/10 shadow-lg shadow-emerald-500/10'
                  : 'border-white/10 bg-gradient-to-br from-zinc-900/80 to-zinc-800/50 hover:border-white/20 hover:from-zinc-800/80 hover:to-zinc-700/50'
              }`}
            >
              {/* Buttons top right */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                {/* Info button for details */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenExtraDetail(extra);
                  }}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all opacity-60 hover:opacity-100"
                  title="Voir les détails"
                >
                  <Info className="w-4 h-4 text-white" />
                </button>

                {/* Selection checkbox */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleExtra(extra);
                  }}
                  className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-emerald-500 border-emerald-500'
                      : 'border-white/20 group-hover:border-white/40 hover:bg-white/10'
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </button>
              </div>

              {/* Clickable zone to open details */}
              <button
                onClick={() => onOpenExtraDetail(extra)}
                className="w-full text-left"
              >
                {/* Icon with gradient background */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all ${
                  isSelected
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30'
                    : 'bg-gradient-to-br from-white/10 to-white/5 group-hover:from-white/15 group-hover:to-white/10'
                }`}>
                  <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-white/70'}`} />
                </div>

                {/* Content - Title never truncated */}
                <div className="pr-10">
                  <h4 className="font-bold text-white text-base leading-tight mb-1 hover:text-emerald-400 transition-colors">
                    {extra.name}
                  </h4>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {extra.description}
                  </p>
                </div>
              </button>

              {/* Price at bottom - clickable to toggle */}
              <button
                onClick={() => onToggleExtra(extra)}
                className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between w-full text-left hover:opacity-80 transition-opacity"
              >
                <span className={`text-xl font-black ${isSelected ? 'text-emerald-400' : 'text-white'}`}>
                  {extra.price}€
                </span>
                <span className="text-xs text-white/40 font-medium uppercase tracking-wide">
                  {extra.unit}
                </span>
              </button>
            </motion.div>
          );
        })}
      </div>

      {filteredExtras.length === 0 && (
        <div className="text-center py-12 text-white/40">
          Aucun extra trouvé pour cette recherche
        </div>
      )}
    </motion.div>
  );
}
