/**
 * StudioDetailModal - Modal showing full studio details
 */

import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Users, Wrench, Lightbulb, ArrowRight } from 'lucide-react';
import type { Studio } from '../../data/studios/types';

interface StudioDetailModalProps {
  studio: Studio | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (studio: Studio) => void;
}

export default function StudioDetailModal({
  studio,
  isOpen,
  onClose,
  onSelect,
}: StudioDetailModalProps) {
  if (!studio) return null;

  const Icon = studio.icon;

  const handleSelect = () => {
    onSelect(studio);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[85vh] z-50 flex flex-col"
          >
            <div className="bg-gradient-to-b from-zinc-900 to-black rounded-2xl border border-white/10 shadow-2xl flex flex-col max-h-full overflow-hidden">
              {/* Header */}
              <div className={`relative p-6 bg-gradient-to-r ${studio.gradient} bg-opacity-20`}>
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${studio.gradient} p-[1px]`}>
                    <div className="w-full h-full rounded-xl bg-black/50 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="flex-1 pt-1">
                    <h2 className="text-2xl md:text-3xl font-montserrat font-black text-white">
                      {studio.name}
                    </h2>
                    <p className="text-white/70 mt-1">{studio.description}</p>
                  </div>
                </div>

                {/* Price badge */}
                <div className="absolute bottom-4 right-6 bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="text-white/60 text-xs">À partir de</div>
                  <div className="text-2xl font-black text-white">{studio.basePrice}€<span className="text-sm font-normal text-white/60">/h</span></div>
                </div>
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Description */}
                {studio.longDescription && (
                  <div>
                    <p className="text-white/70 leading-relaxed">
                      {studio.longDescription}
                    </p>
                  </div>
                )}

                {/* Capacity */}
                {studio.capacity && (
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                    <Users className="w-5 h-5 text-emerald-400" />
                    <div>
                      <div className="text-xs text-white/50 uppercase tracking-wide">Capacité</div>
                      <div className="text-white font-semibold">{studio.capacity}</div>
                    </div>
                  </div>
                )}

                {/* Equipment */}
                {studio.equipment && studio.equipment.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-3">
                      <Wrench className="w-5 h-5 text-emerald-400" />
                      Équipement inclus
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {studio.equipment.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/5"
                        >
                          <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <span className="text-sm text-white/80">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Use Cases */}
                {studio.useCases && studio.useCases.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-3">
                      <Lightbulb className="w-5 h-5 text-amber-400" />
                      Idéal pour
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {studio.useCases.map((useCase, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r ${studio.gradient} bg-opacity-20 text-white border border-white/10`}
                        >
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features highlights */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Points forts</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {studio.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${studio.gradient}`} />
                        <span className="text-sm text-white/70">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer - CTA */}
              <div className="border-t border-white/10 p-6 bg-black/50">
                <motion.button
                  onClick={handleSelect}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 bg-gradient-to-r ${studio.gradient} text-white shadow-lg`}
                >
                  <span>Sélectionner ce studio</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
