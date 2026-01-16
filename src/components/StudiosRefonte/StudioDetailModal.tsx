/**
 * StudioDetailModal - Modal showing full studio details
 * Compact design optimized for 13" screens
 */

import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Users, Wrench, Lightbulb, ArrowRight, ImageIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
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
  const [imageError, setImageError] = useState(false);

  // Reset image error when studio changes
  useEffect(() => {
    setImageError(false);
  }, [studio?.id]);

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

          {/* Modal - Centered */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-gradient-to-b from-zinc-900 to-black rounded-2xl border border-white/10 shadow-2xl w-full max-w-md max-h-[75vh] flex flex-col overflow-hidden">
              {/* Header - Compact */}
              <div className={`relative p-4 bg-gradient-to-r ${studio.gradient}`}>
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>

                <div className="flex items-center gap-3 pr-10">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-black/30 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Title & Price */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-montserrat font-black text-white truncate">
                      {studio.name}
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className="text-white/80 text-sm">{studio.description}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right flex-shrink-0">
                    <div className="text-xl font-black text-white">{studio.basePrice}€</div>
                    <div className="text-xs text-white/70">/heure</div>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className={`relative h-40 bg-gradient-to-br ${studio.gradient} overflow-hidden`}>
                {studio.image && !imageError ? (
                  <img
                    src={studio.image}
                    alt={studio.name}
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Pattern overlay */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                      }} />
                    </div>
                    {/* Placeholder content */}
                    <div className="relative text-center text-white/80">
                      <Icon className="w-12 h-12 mx-auto mb-2 opacity-60" />
                      <p className="text-xs flex items-center gap-1 justify-center">
                        <ImageIcon className="w-3 h-3" />
                        Photo à venir
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Description */}
                {studio.longDescription && (
                  <p className="text-white/60 text-sm leading-relaxed">
                    {studio.longDescription}
                  </p>
                )}

                {/* Capacity */}
                {studio.capacity && (
                  <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs text-white/50">Capacité:</span>
                    <span className="text-sm text-white font-medium">{studio.capacity}</span>
                  </div>
                )}

                {/* Equipment - Compact grid */}
                {studio.equipment && studio.equipment.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-white mb-2">
                      <Wrench className="w-4 h-4 text-emerald-400" />
                      Équipement inclus
                    </h3>
                    <div className="grid grid-cols-1 gap-1.5">
                      {studio.equipment.slice(0, 5).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                          <span className="text-white/70">{item}</span>
                        </div>
                      ))}
                      {studio.equipment.length > 5 && (
                        <span className="text-xs text-white/40 ml-5">
                          +{studio.equipment.length - 5} autres équipements
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Use Cases - Tags */}
                {studio.useCases && studio.useCases.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-white mb-2">
                      <Lightbulb className="w-4 h-4 text-amber-400" />
                      Idéal pour
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {studio.useCases.map((useCase, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded-md text-xs font-medium bg-white/10 text-white/80"
                        >
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer - CTA */}
              <div className="border-t border-white/10 p-4 bg-black/50">
                <motion.button
                  onClick={handleSelect}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`w-full py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 bg-gradient-to-r ${studio.gradient} text-white`}
                >
                  <span>Sélectionner ce studio</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
