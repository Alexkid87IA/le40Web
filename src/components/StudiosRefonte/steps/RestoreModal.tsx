/**
 * RestoreModal - Modal for restoring saved booking
 */

import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import type { RestoreModalProps } from './types';

export default function RestoreModal({
  savedBooking,
  onRestore,
  onStartFresh,
}: RestoreModalProps) {
  if (!savedBooking) return null;

  return (
    <AnimatePresence>
      {savedBooking && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg mx-auto"
          >
            <div className="bg-gradient-to-br from-zinc-900 to-black border-2 border-emerald-500/30 rounded-2xl p-6 md:p-8 shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-montserrat font-black text-white mb-2">
                  Bon retour !
                </h3>
                <p className="text-white/60">
                  Vous aviez commencé une réservation
                </p>
              </div>

              {/* Saved summary */}
              <div className="bg-white/5 rounded-xl p-4 mb-6 space-y-2">
                {savedBooking.selectedStudio && (
                  <div className="flex items-center gap-2 text-white/80">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm">
                      Studio: <strong className="text-white">{savedBooking.selectedStudio.shortName}</strong>
                    </span>
                  </div>
                )}
                {savedBooking.selectedFormule && (
                  <div className="flex items-center gap-2 text-white/80">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm">
                      Formule: <strong className="text-white">{savedBooking.selectedFormule.name}</strong>
                    </span>
                  </div>
                )}
                {savedBooking.selectedExtras && savedBooking.selectedExtras.length > 0 && (
                  <div className="flex items-center gap-2 text-white/80">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm">
                      <strong className="text-white">{savedBooking.selectedExtras.length}</strong> extra{savedBooking.selectedExtras.length > 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  onClick={onRestore}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-500/30 transition-all"
                >
                  Reprendre
                </motion.button>
                <motion.button
                  onClick={onStartFresh}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 px-6 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
                >
                  Recommencer
                </motion.button>
              </div>

              <p className="text-white/40 text-xs text-center mt-4">
                La sauvegarde est automatique pendant 24h
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
