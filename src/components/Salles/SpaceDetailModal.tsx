import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Check, Users, Wifi, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Space } from '../../data/salles/spaces';
import AddToCartButton from '../Cart/AddToCartButton';

interface SpaceDetailModalProps {
  space: Space | null;
  onClose: () => void;
}

export default function SpaceDetailModal({ space, onClose }: SpaceDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (space) {
      setCurrentImageIndex(0);
    }
  }, [space]);

  if (!space) return null;

  const calculatePrice = (duration: string) => {
    let basePrice = space.price;

    switch (duration) {
      case '2 heures':
        return basePrice * 2;
      case '4 heures':
        return basePrice * 4;
      case 'Demi-journée':
        return Math.round(basePrice * 3.5);
      case 'Journée':
        return Math.round(basePrice * 7);
      case 'Soirée complète':
      case 'Soirée':
        return basePrice * 6;
      default:
        return basePrice;
    }
  };

  const durationMap: Record<string, string> = {
    'Heure': 'hour',
    'Demi-journée': 'half-day',
    'Journée': 'day',
    '2 heures': 'hour',
    '4 heures': 'half-day',
    'Soirée complète': 'day',
    'Soirée': 'day'
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
          className="bg-gradient-to-br from-zinc-900 to-black rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-white/10"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
            <div className="relative h-[400px] lg:h-[700px] bg-black">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={space.images[currentImageIndex]}
                  alt={space.title}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

              {space.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex(prev =>
                      prev === 0 ? space.images.length - 1 : prev - 1
                    )}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all group"
                  >
                    <ChevronLeft className="w-6 h-6 text-white group-hover:-translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => setCurrentImageIndex(prev =>
                      prev === space.images.length - 1 ? 0 : prev + 1
                    )}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all group"
                  >
                    <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                    {space.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className="group"
                      >
                        <div className={`h-1 rounded-full transition-all ${idx === currentImageIndex
                          ? 'w-12 bg-white'
                          : 'w-6 bg-white/30 group-hover:bg-white/50'
                          }`} />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="p-10 lg:p-12 bg-gradient-to-br from-zinc-900 to-zinc-950 max-h-[700px] overflow-y-auto">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-${space.accentColor}-500/10 text-${space.accentColor}-400 mb-4`}
                  >
                    <space.icon className="w-3.5 h-3.5" />
                    {space.category}
                  </motion.span>

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl font-montserrat font-black text-white mb-4"
                  >
                    {space.title}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-zinc-400 leading-relaxed"
                  >
                    {space.description}
                  </motion.p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </motion.button>
              </div>

              <div className="flex items-center gap-3 text-zinc-400 mb-10">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{space.capacity}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg">
                  <Wifi className="w-4 h-4" />
                  <span className="text-sm">Wi-Fi 1Gb/s</span>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-lg font-montserrat font-bold text-white mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  Équipements premium inclus
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {space.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="text-zinc-300 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-base font-montserrat font-semibold text-white">
                  Choisissez votre durée
                </h4>

                <div className="grid grid-cols-1 gap-3">
                  {space.disponibilites.map((duree, idx) => {
                    const price = calculatePrice(duree);

                    return (
                      <motion.div
                        key={duree}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                      >
                        <div>
                          <p className="text-white font-medium">{space.title} - {duree}</p>
                          <p className="text-zinc-400 text-sm">{price}€ TTC</p>
                        </div>
                        <AddToCartButton
                          item={{
                            id: `salle-${space.id}-${duree.toLowerCase().replace(/\s/g, '-')}`,
                            name: `${space.title} - ${duree}`,
                            price: price,
                            type: 'meeting-room',
                            duration: durationMap[duree] || 'hour'
                          }}
                          variant={idx === 0 ? 'primary' : 'secondary'}
                        />
                      </motion.div>
                    );
                  })}
                </div>

                <p className="text-center text-zinc-500 text-xs mt-4">
                  Réservation flexible • Annulation gratuite jusqu'à 24h avant
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
