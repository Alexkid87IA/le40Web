/**
 * BookingBottomSheet - Récapitulatif mobile (Bottom Sheet)
 * S'ouvre en swipe-up, affiche le récapitulatif complet
 */

import { motion, AnimatePresence, PanInfo, useAnimation } from 'framer-motion';
import {
  Check, ChevronDown, ChevronUp, X, Sparkles, Clock, Calendar
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface Studio {
  id: string;
  name: string;
  shortName: string;
  icon: LucideIcon;
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
}

interface BookingBottomSheetProps {
  selectedStudio: Studio | null;
  selectedFormule: Formule | null;
  selectedDuration: string;
  selectedExtras: Extra[];
  selectedDate: Date | null;
  selectedSlot: string | null;
  studioPrice: number;
  formulePrice: number;
  extrasPrice: number;
  totalPrice: number;
  onCheckout: () => void;
  canCheckout: boolean;
  isProcessing?: boolean;
}

export default function BookingBottomSheet({
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
  onCheckout,
  canCheckout,
  isProcessing = false,
}: BookingBottomSheetProps) {

  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    });
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Si swipe vers le bas avec vélocité > 20, fermer
    if (info.velocity.y > 20 || info.offset.y > 100) {
      setIsOpen(false);
    }
  };

  const StudioIcon = selectedStudio?.icon;

  return (
    <div className="lg:hidden">
      {/* Bouton flottant pour ouvrir */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-black/95 via-zinc-900/95 to-black/95 backdrop-blur-xl border-t border-white/10 shadow-2xl"
            style={{
              paddingBottom: 'max(env(safe-area-inset-bottom), 16px)',
              paddingTop: '12px',
              paddingLeft: '16px',
              paddingRight: '16px',
            }}
          >
            <div className="flex items-center justify-between gap-3">
              {/* Infos résumées */}
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-2 text-white/60 text-xs mb-1">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>Votre configuration</span>
                </div>
                <div className="flex items-center gap-2 text-white text-sm font-semibold truncate">
                  {selectedStudio ? (
                    <>
                      <span className="truncate">{selectedStudio.shortName}</span>
                      {selectedFormule && (
                        <>
                          <span className="text-white/40">·</span>
                          <span className="text-white/80">{selectedFormule.name}</span>
                        </>
                      )}
                    </>
                  ) : (
                    <span className="text-white/60">Commencez votre réservation</span>
                  )}
                </div>
              </div>

              {/* Prix */}
              <div className="flex items-center gap-3 flex-shrink-0">
                {totalPrice > 0 && (
                  <div className="text-right">
                    <div className="text-xs text-white/60">Total</div>
                    <div className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                      {totalPrice}€
                    </div>
                  </div>
                )}
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <ChevronUp className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bottom Sheet */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-b from-zinc-900 to-black rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col"
              style={{
                paddingBottom: 'env(safe-area-inset-bottom)',
              }}
            >
              {/* Handle pour drag */}
              <div className="flex justify-center py-3">
                <div className="w-12 h-1.5 bg-white/20 rounded-full" />
              </div>

              {/* Header */}
              <div className="px-6 pb-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-montserrat font-black text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-emerald-400" />
                      Récapitulatif
                    </h3>
                    <p className="text-white/60 text-sm mt-1">
                      Votre réservation en détail
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Contenu scrollable */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">

                {/* Studio */}
                {selectedStudio ? (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${selectedStudio.gradient}`}>
                        {StudioIcon && <StudioIcon className="w-5 h-5 text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="text-white/60 text-xs">Studio</span>
                        </div>
                        <h4 className="font-bold text-white">{selectedStudio.shortName}</h4>
                        <div className="flex items-center gap-2 mt-2 text-sm text-white/70">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{selectedDuration}</span>
                        </div>
                      </div>
                      <div className="text-lg font-black text-white">{studioPrice}€</div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/5 rounded-xl p-4 border border-dashed border-white/20 text-center text-white/40 text-sm">
                    Sélectionnez un studio
                  </div>
                )}

                {/* Formule */}
                {selectedFormule ? (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{selectedFormule.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="text-white/60 text-xs">Formule</span>
                        </div>
                        <h4 className="font-bold text-white">{selectedFormule.name}</h4>
                        <p className="text-xs text-white/60 mt-1">{selectedFormule.tagline}</p>
                      </div>
                      {formulePrice > 0 ? (
                        <div className="text-lg font-black text-white">+{formulePrice}€</div>
                      ) : (
                        <div className="text-sm font-bold text-emerald-400">Inclus</div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/5 rounded-xl p-4 border border-dashed border-white/20 text-center text-white/40 text-sm">
                    Choisissez une formule
                  </div>
                )}

                {/* Extras */}
                {selectedExtras.length > 0 && (
                  <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                    <div className="p-4 bg-white/5">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span className="text-white/60 text-xs">Extras</span>
                          </div>
                          <h4 className="font-bold text-white">
                            {selectedExtras.length} extra{selectedExtras.length > 1 ? 's' : ''}
                          </h4>
                        </div>
                        <div className="text-lg font-black text-white">+{extrasPrice}€</div>
                      </div>
                    </div>
                    <div className="px-4 pb-4 space-y-2">
                      {selectedExtras.map((extra) => (
                        <div key={extra.id} className="flex items-center justify-between text-sm">
                          <span className="text-white/70 truncate flex-1">{extra.name}</span>
                          <span className="text-white/90 font-semibold ml-2">{extra.price}€</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Date & Créneau */}
                {selectedDate && selectedSlot && (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-emerald-400 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="text-white/60 text-xs">Date & Créneau</span>
                        </div>
                        <h4 className="font-bold text-white capitalize">
                          {formatDate(selectedDate)}
                        </h4>
                        <div className="flex items-center gap-2 mt-2 text-sm text-white/70">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{selectedSlot}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Spacer pour éviter que le contenu soit caché par le footer */}
                <div className="h-4" />
              </div>

              {/* Footer - Total et CTA */}
              <div className="border-t-2 border-white/20 bg-gradient-to-b from-black/50 to-black px-6 py-4 space-y-4">
                {/* Décomposition */}
                <div className="space-y-2 text-sm">
                  {selectedStudio && (
                    <div className="flex justify-between text-white/60">
                      <span>Studio ({selectedDuration})</span>
                      <span>{studioPrice}€</span>
                    </div>
                  )}
                  {selectedFormule && formulePrice > 0 && (
                    <div className="flex justify-between text-white/60">
                      <span>Formule</span>
                      <span>+{formulePrice}€</span>
                    </div>
                  )}
                  {selectedExtras.length > 0 && (
                    <div className="flex justify-between text-white/60">
                      <span>Extras</span>
                      <span>+{extrasPrice}€</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                {totalPrice > 0 && (
                  <div className="border-t border-white/20 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white text-xl font-montserrat font-black">TOTAL</span>
                      <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
                        {totalPrice}€
                      </div>
                    </div>
                  </div>
                )}

                {/* CTA */}
                <motion.button
                  onClick={() => {
                    setIsOpen(false);
                    onCheckout();
                  }}
                  disabled={!canCheckout || isProcessing}
                  whileTap={canCheckout ? { scale: 0.98 } : {}}
                  className={`w-full py-4 rounded-xl font-montserrat font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                    canCheckout
                      ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white active:scale-95'
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

                <p className="text-white/40 text-xs text-center">
                  🔒 Paiement sécurisé via Shopify
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
