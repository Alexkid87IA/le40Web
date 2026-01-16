/**
 * SummaryStep - Step 4: Summary & Checkout
 */

import { motion } from 'framer-motion';
import { Check, Calendar, Clock, Loader2, ArrowRight } from 'lucide-react';
import { generateNextDays, formatBookingDate, AVAILABLE_SLOTS } from '../../../data/studios';
import type { SummaryStepProps } from './types';

export default function SummaryStep({
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
  isProcessing,
  canProceed,
  onSelectDate,
  onSelectSlot,
  onCheckout,
}: SummaryStepProps) {
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
          Finalisez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">réservation</span>
        </h2>
        <p className="text-white/60">Choisissez votre créneau et confirmez</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column - Date, slot */}
        <div className="space-y-6">
          {/* Date */}
          <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-400" />
              Sélectionnez une date
            </h3>
            <div className="grid grid-cols-7 gap-2">
              {generateNextDays(14).map((day, idx) => {
                const isSelected = day.toDateString() === selectedDate.toDateString();
                return (
                  <button
                    key={idx}
                    onClick={() => onSelectDate(day)}
                    className={`p-2 rounded-xl text-center transition-all ${
                      isSelected
                        ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white'
                        : 'bg-white/5 hover:bg-white/10 text-white/60'
                    }`}
                  >
                    <div className="text-xs font-bold">{formatBookingDate(day).split(' ')[0]}</div>
                    <div className="text-lg font-bold">{day.getDate()}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slots */}
          <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              Choisissez un créneau
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {AVAILABLE_SLOTS.map((slot) => (
                <button
                  key={slot}
                  onClick={() => onSelectSlot(slot)}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    selectedSlot === slot
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="text-white font-bold">{slot}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - Summary */}
        <div>
          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-6 sticky top-4">
            <h3 className="text-xl font-bold text-white mb-6">Récapitulatif</h3>

            <div className="space-y-4">
              {/* Studio */}
              {selectedStudio && (
                <div className="flex justify-between items-center text-white/90 pb-3 border-b border-white/20">
                  <div>
                    <div className="font-semibold">{selectedStudio.name}</div>
                    <div className="text-sm text-white/60">{selectedDuration}</div>
                  </div>
                  <span className="font-bold">{studioPrice}€</span>
                </div>
              )}

              {/* Formule */}
              {selectedFormule && formulePrice > 0 && (
                <div className="flex justify-between items-center text-white/90 pb-3 border-b border-white/20">
                  <div>
                    <div className="font-semibold">Formule {selectedFormule.name}</div>
                    <div className="text-sm text-white/60">{selectedDuration}</div>
                  </div>
                  <span className="font-bold">+{formulePrice}€</span>
                </div>
              )}

              {/* Extras */}
              {selectedExtras.length > 0 && (
                <div className="pb-3 border-b border-white/20">
                  <div className="text-white/90 font-semibold mb-2">Extras ({selectedExtras.length})</div>
                  {selectedExtras.map((extra) => (
                    <div key={extra.id} className="flex justify-between items-center text-white/70 text-sm py-1">
                      <span>{extra.name}</span>
                      <span>+{extra.price}€</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Date and slot */}
              {selectedSlot && (
                <div className="flex justify-between items-center text-white/90">
                  <span>Date & Créneau</span>
                  <span className="font-semibold">{formatBookingDate(selectedDate)} - {selectedSlot}</span>
                </div>
              )}

              {/* Total */}
              <div className="pt-4 mt-4 border-t-2 border-white/30">
                <div className="flex justify-between items-center">
                  <span className="text-white text-xl font-bold">Total</span>
                  <span className="text-white text-3xl font-black">{totalPrice}€</span>
                </div>
              </div>
            </div>

            <motion.button
              onClick={onCheckout}
              disabled={!canProceed || isProcessing}
              whileHover={canProceed ? { scale: 1.02 } : {}}
              whileTap={canProceed ? { scale: 0.98 } : {}}
              className={`w-full mt-6 py-4 rounded-xl font-montserrat font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                canProceed
                  ? 'bg-white text-emerald-600 shadow-xl hover:shadow-2xl'
                  : 'bg-white/20 text-white/40 cursor-not-allowed'
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Traitement...</span>
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  <span>Confirmer et payer</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>

            <p className="text-white/60 text-xs text-center mt-4">
              Paiement sécurisé via Shopify
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
