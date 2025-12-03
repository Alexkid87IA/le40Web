/**
 * BookingSidebar - Récapitulatif permanent de la réservation
 * Sticky sur desktop, Bottom Sheet sur mobile
 */

import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, Edit2, Calendar, Clock, ChevronDown, ChevronUp, X,
  Sparkles, Package
} from 'lucide-react';
import { useState } from 'react';

interface Studio {
  id: string;
  name: string;
  shortName: string;
  icon: any;
  color: string;
  gradient: string;
}

interface Formule {
  id: string;
  name: string;
  tagline: string;
  icon: string;
}

interface Extra {
  id: string;
  name: string;
  price: number;
  unit: string;
}

interface BookingSidebarProps {
  // Sélections
  selectedStudio: Studio | null;
  selectedFormule: Formule | null;
  selectedDuration: string;
  selectedExtras: Extra[];
  selectedDate: Date | null;
  selectedSlot: string | null;

  // Prix
  studioPrice: number;
  formulePrice: number;
  extrasPrice: number;
  totalPrice: number;

  // Actions de navigation
  onEditStep: (step: number) => void;
  onCheckout: () => void;

  // État
  currentStep: number;
  canCheckout: boolean;
  isProcessing?: boolean;
}

export default function BookingSidebar({
  selectedStudio,
  selectedFormule,
  selectedDuration,
  selectedExtras,
  selectedDate,
  selectedSlot,
  studioPrice,
  formulePrice,
  extrasPrice,
  totalPrice,
  onEditStep,
  onCheckout,
  currentStep,
  canCheckout,
  isProcessing = false,
}: BookingSidebarProps) {

  const [isExtrasExpanded, setIsExtrasExpanded] = useState(true);

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  const StudioIcon = selectedStudio?.icon;

  return (
    <>
      {/* VERSION DESKTOP - Sidebar sticky à droite */}
      <div className="hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="sticky top-24 bg-gradient-to-br from-zinc-900/95 to-black/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border-b border-white/10 p-6">
            <h3 className="text-xl font-montserrat font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              Votre Réservation
            </h3>
            <p className="text-white/60 text-sm mt-1">
              Configuration en temps réel
            </p>
          </div>

          {/* Contenu scrollable */}
          <div className="p-6 space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">

            {/* 1. STUDIO */}
            <AnimatePresence mode="wait">
              {selectedStudio ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-emerald-500/30 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${selectedStudio.gradient}`}>
                      {StudioIcon && <StudioIcon className="w-5 h-5 text-white" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span className="text-white/60 text-xs font-medium">Studio</span>
                      </div>
                      <h4 className="font-bold text-white mt-1 truncate">
                        {selectedStudio.shortName}
                      </h4>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="w-3.5 h-3.5 text-white/40" />
                        <span className="text-sm text-white/80">{selectedDuration}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-black text-white">{studioPrice}€</div>
                      <button
                        onClick={() => onEditStep(1)}
                        className="mt-2 text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Edit2 className="w-3 h-3" />
                        Modifier
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/5 rounded-xl p-4 border border-dashed border-white/20"
                >
                  <div className="text-white/40 text-sm text-center py-2">
                    Sélectionnez un studio
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 2. FORMULE */}
            <AnimatePresence mode="wait">
              {selectedFormule ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-amber-500/30 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{selectedFormule.icon}</div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span className="text-white/60 text-xs font-medium">Formule</span>
                      </div>
                      <h4 className="font-bold text-white mt-1">{selectedFormule.name}</h4>
                      <p className="text-xs text-white/60 mt-1">{selectedFormule.tagline}</p>
                    </div>

                    <div className="text-right">
                      {formulePrice > 0 ? (
                        <div className="text-lg font-black text-white">+{formulePrice}€</div>
                      ) : (
                        <div className="text-sm font-bold text-emerald-400">Inclus</div>
                      )}
                      <button
                        onClick={() => onEditStep(2)}
                        className="mt-2 text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Edit2 className="w-3 h-3" />
                        Modifier
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/5 rounded-xl p-4 border border-dashed border-white/20"
                >
                  <div className="text-white/40 text-sm text-center py-2">
                    Choisissez une formule
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 3. EXTRAS */}
            <AnimatePresence mode="wait">
              {selectedExtras.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white/5 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all overflow-hidden"
                >
                  {/* Header collapsible */}
                  <button
                    onClick={() => setIsExtrasExpanded(!isExtrasExpanded)}
                    className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-cyan-400" />
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="text-white/60 text-xs font-medium">Extras</span>
                        </div>
                        <h4 className="font-bold text-white">
                          {selectedExtras.length} extra{selectedExtras.length > 1 ? 's' : ''}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-lg font-black text-white">+{extrasPrice}€</div>
                      {isExtrasExpanded ? (
                        <ChevronUp className="w-5 h-5 text-white/40 group-hover:text-white/60" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-white/40 group-hover:text-white/60" />
                      )}
                    </div>
                  </button>

                  {/* Liste des extras */}
                  <AnimatePresence>
                    {isExtrasExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-white/10"
                      >
                        <div className="p-4 space-y-2 max-h-48 overflow-y-auto">
                          {selectedExtras.map((extra) => (
                            <div
                              key={extra.id}
                              className="flex items-center justify-between text-sm py-1.5"
                            >
                              <span className="text-white/70 truncate flex-1">{extra.name}</span>
                              <span className="text-white/90 font-semibold ml-2">
                                {extra.price}€
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="px-4 pb-4">
                          <button
                            onClick={() => onEditStep(3)}
                            className="w-full text-xs text-cyan-400 hover:text-cyan-300 flex items-center justify-center gap-1 py-2"
                          >
                            <Edit2 className="w-3 h-3" />
                            Modifier les extras
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : currentStep >= 3 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/5 rounded-xl p-4 border border-dashed border-white/20"
                >
                  <div className="text-white/40 text-sm text-center py-2">
                    Aucun extra sélectionné
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* 4. DATE & CRÉNEAU */}
            <AnimatePresence mode="wait">
              {selectedDate && selectedSlot ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-blue-500/30 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-blue-400 mt-1" />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span className="text-white/60 text-xs font-medium">Date & Créneau</span>
                      </div>
                      <h4 className="font-bold text-white mt-1 capitalize">
                        {formatDate(selectedDate)}
                      </h4>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="w-3.5 h-3.5 text-white/40" />
                        <span className="text-sm text-white/80">{selectedSlot}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onEditStep(4)}
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Edit2 className="w-3 h-3" />
                      Modifier
                    </button>
                  </div>
                </motion.div>
              ) : currentStep >= 4 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/5 rounded-xl p-4 border border-dashed border-white/20"
                >
                  <div className="text-white/40 text-sm text-center py-2">
                    Sélectionnez une date
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* Footer - Total et CTA */}
          <div className="border-t-2 border-white/20 bg-gradient-to-b from-black/50 to-black p-6 space-y-4">
            {/* Décomposition du prix */}
            <div className="space-y-2 text-sm">
              {selectedStudio && (
                <div className="flex justify-between text-white/60">
                  <span>Studio ({selectedDuration})</span>
                  <span>{studioPrice}€</span>
                </div>
              )}
              {selectedFormule && formulePrice > 0 && (
                <div className="flex justify-between text-white/60">
                  <span>Formule {selectedFormule.name}</span>
                  <span>+{formulePrice}€</span>
                </div>
              )}
              {selectedExtras.length > 0 && (
                <div className="flex justify-between text-white/60">
                  <span>Extras ({selectedExtras.length})</span>
                  <span>+{extrasPrice}€</span>
                </div>
              )}
            </div>

            {/* Séparateur */}
            {totalPrice > 0 && (
              <div className="border-t border-white/20 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-white text-xl font-montserrat font-black">TOTAL</span>
                  <div className="text-right">
                    <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                      {totalPrice}€
                    </div>
                    <div className="text-xs text-white/40 mt-1">TTC</div>
                  </div>
                </div>
              </div>
            )}

            {/* CTA Principal */}
            <motion.button
              onClick={onCheckout}
              disabled={!canCheckout || isProcessing}
              whileHover={canCheckout ? { scale: 1.02 } : {}}
              whileTap={canCheckout ? { scale: 0.98 } : {}}
              className={`w-full py-4 rounded-xl font-montserrat font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl ${
                canCheckout
                  ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white hover:shadow-2xl hover:shadow-emerald-500/30'
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Traitement...</span>
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  <span>Confirmer et payer</span>
                </>
              )}
            </motion.button>

            {/* Sécurité */}
            <p className="text-white/40 text-xs text-center flex items-center justify-center gap-1">
              🔒 Paiement sécurisé via Shopify
            </p>
          </div>
        </motion.div>
      </div>

      {/* VERSION MOBILE - Bottom Sheet (sera implémenté dans le prochain composant) */}
    </>
  );
}
