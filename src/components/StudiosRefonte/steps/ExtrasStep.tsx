/**
 * ExtrasStep - Step 3: Extras Selection
 * Refonte UX: scroll interne, filtres sticky, compteur
 */

import { motion } from 'framer-motion';
import { Check, X, Search, ChevronDown, ChevronUp, Package } from 'lucide-react';
import { useState, useMemo } from 'react';
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
  const [isSelectedExpanded, setIsSelectedExpanded] = useState(true);

  // Group extras by category for better organization
  const groupedExtras = useMemo(() => {
    if (extraCategory !== 'all') {
      return { [extraCategory]: filteredExtras };
    }

    const groups: Record<string, typeof filteredExtras> = {};
    filteredExtras.forEach(extra => {
      if (!groups[extra.category]) {
        groups[extra.category] = [];
      }
      groups[extra.category].push(extra);
    });
    return groups;
  }, [filteredExtras, extraCategory]);

  const totalExtrasCount = filteredExtras.length;
  const categoryName = EXTRAS_CATEGORIES.find(c => c.id === extraCategory)?.name || 'Tous';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="flex flex-col h-full"
    >
      {/* Header compact */}
      <div className="text-center mb-4">
        <h2 className="text-xl md:text-2xl font-montserrat font-black text-white mb-1">
          Ajoutez des <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">extras</span>
        </h2>
        <p className="text-white/60 text-sm">Personnalisez votre expérience (optionnel)</p>
      </div>

      {/* Sticky filters zone */}
      <div className="sticky top-0 z-20 bg-[#0A0A0A]/95 backdrop-blur-xl pb-4 -mx-4 px-4 border-b border-white/5">
        <div className="flex flex-col gap-3">
          {/* Search + Counter row */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                value={searchExtra}
                onChange={(e) => onSetSearch(e.target.value)}
                placeholder="Rechercher un extra..."
                className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-white/40 focus:border-emerald-500 focus:outline-none transition-colors"
              />
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl">
              <Package className="w-4 h-4 text-white/40" />
              <span className="text-white/70 text-sm font-medium">{totalExtrasCount}</span>
            </div>
          </div>

          {/* Categories horizontal scroll */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
            {EXTRAS_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = extraCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSetCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap transition-all text-sm ${
                    isActive
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="font-medium">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected extras collapsible summary */}
      {selectedExtras.length > 0 && (
        <div className="mt-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl overflow-hidden">
          <button
            onClick={() => setIsSelectedExpanded(!isSelectedExpanded)}
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <Check className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-left">
                <span className="font-bold text-white text-sm">{selectedExtras.length} extra{selectedExtras.length > 1 ? 's' : ''}</span>
                <span className="text-emerald-400 font-bold ml-2">+{extrasPrice}€</span>
              </div>
            </div>
            {isSelectedExpanded ? (
              <ChevronUp className="w-5 h-5 text-white/40" />
            ) : (
              <ChevronDown className="w-5 h-5 text-white/40" />
            )}
          </button>

          {isSelectedExpanded && (
            <div className="px-4 pb-3 flex flex-wrap gap-2">
              {selectedExtras.map((extra) => (
                <span
                  key={extra.id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 rounded-lg text-xs text-white"
                >
                  {extra.name}
                  <button
                    onClick={() => onToggleExtra(extra)}
                    className="hover:text-red-400 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Scrollable extras container - padding for hover effects */}
      <div className="mt-4 flex-1 overflow-y-auto max-h-[50vh] lg:max-h-[55vh] px-1 -mx-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {Object.entries(groupedExtras).map(([categoryId, extras]) => {
          const category = EXTRAS_CATEGORIES.find(c => c.id === categoryId);
          const showCategoryHeader = extraCategory === 'all' && category;

          return (
            <div key={categoryId} className="mb-6 last:mb-0">
              {showCategoryHeader && (
                <div className="flex items-center gap-2 mb-3 sticky top-0 bg-[#0A0A0A]/90 py-2 -mt-2">
                  {category && <category.icon className="w-4 h-4 text-white/40" />}
                  <h3 className="text-sm font-bold text-white/60 uppercase tracking-wide">
                    {category?.name}
                  </h3>
                  <span className="text-xs text-white/30">({extras.length})</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {extras.map((extra) => {
                  const isSelected = selectedExtras.some(e => e.id === extra.id);
                  const Icon = extra.icon;

                  return (
                    <div
                      key={extra.id}
                      className={`relative group p-4 rounded-xl border transition-all duration-200 ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10'
                          : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/8 hover:shadow-md hover:shadow-white/5'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon - clickable to open details */}
                        <button
                          onClick={() => onOpenExtraDetail(extra)}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all cursor-pointer hover:scale-105 ${
                            isSelected
                              ? 'bg-emerald-500 shadow-lg shadow-emerald-500/30'
                              : 'bg-white/10 hover:bg-white/20'
                          }`}
                        >
                          <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-white/70'}`} />
                        </button>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            {/* Title - clickable to open details */}
                            <button
                              onClick={() => onOpenExtraDetail(extra)}
                              className="text-left"
                            >
                              <h4 className={`font-bold text-sm leading-tight hover:underline ${isSelected ? 'text-emerald-400' : 'text-white'}`}>
                                {extra.name}
                              </h4>
                            </button>

                            {/* Checkbox - clickable to toggle */}
                            <button
                              onClick={() => onToggleExtra(extra)}
                              className={`w-7 h-7 rounded-md border-2 flex items-center justify-center transition-all shrink-0 ${
                                isSelected
                                  ? 'bg-emerald-500 border-emerald-500'
                                  : 'border-white/30 hover:border-emerald-500 hover:bg-emerald-500/10'
                              }`}
                            >
                              {isSelected && <Check className="w-4 h-4 text-white" />}
                            </button>
                          </div>

                          {/* Description - clickable to open details */}
                          <button
                            onClick={() => onOpenExtraDetail(extra)}
                            className="text-left w-full"
                          >
                            <p className="text-xs text-white/50 mt-1 line-clamp-2 hover:text-white/70 transition-colors">
                              {extra.description}
                            </p>
                          </button>

                          {/* Price row */}
                          <div className="flex items-center justify-between mt-2">
                            <button
                              onClick={() => onToggleExtra(extra)}
                              className={`text-lg font-black transition-colors ${isSelected ? 'text-emerald-400' : 'text-white hover:text-emerald-400'}`}
                            >
                              {extra.price}€
                            </button>
                            <span className="text-xs text-white/40">
                              {extra.unit}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {filteredExtras.length === 0 && (
          <div className="text-center py-12 text-white/40">
            <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Aucun extra trouvé pour cette recherche</p>
          </div>
        )}
      </div>

      {/* Quick action footer */}
      {selectedExtras.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={() => selectedExtras.forEach(e => onToggleExtra(e))}
            className="text-sm text-white/50 hover:text-red-400 transition-colors"
          >
            Tout désélectionner
          </button>
          <div className="text-right">
            <span className="text-white/60 text-sm">Total extras:</span>
            <span className="text-emerald-400 font-bold text-lg ml-2">+{extrasPrice}€</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
