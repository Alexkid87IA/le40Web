import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight } from 'lucide-react';
import { Studio } from '../../data/studios/studiosData';

interface StudioDetailModalProps {
  studio: Studio | null;
  onClose: () => void;
  onSelect: (studioId: string) => void;
}

export default function StudioDetailModal({ studio, onClose, onSelect }: StudioDetailModalProps) {
  if (!studio) return null;

  const handleSelect = () => {
    onSelect(studio.id);
    onClose();
  };

  return (
    <AnimatePresence>
      {studio && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-zinc-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-white/10"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="overflow-y-auto max-h-[90vh]">
              <div className="relative h-80">
                <img
                  src={studio.image}
                  alt={studio.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent"></div>

                <div className="absolute bottom-8 left-8 right-8">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${studio.gradient} text-white text-sm font-medium mb-4`}>
                    <studio.icon className="w-4 h-4" />
                    {studio.subtitle}
                  </div>
                  <h2 className="text-5xl font-montserrat font-black text-white mb-4">
                    {studio.name}
                  </h2>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-montserrat font-black text-white">
                      {studio.launchPrice}€
                    </span>
                    <span className="text-white/60">{studio.priceUnit}</span>
                    <span className="text-white/40 text-lg line-through ml-2">{studio.basePrice}€</span>
                    <span className="text-rose-400 text-sm font-bold">-{studio.savings}€</span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="mb-8">
                  <h3 className="text-xl font-montserrat font-bold text-white mb-4">Description</h3>
                  <p className="text-white/70 font-inter leading-relaxed">
                    {studio.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-montserrat font-bold text-white mb-4">Équipement</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-white/50 text-sm">Caméras</span>
                        <p className="text-white font-inter">{studio.equipment.cameras}</p>
                      </div>
                      <div>
                        <span className="text-white/50 text-sm">Audio</span>
                        <p className="text-white font-inter">{studio.equipment.audio}</p>
                      </div>
                      <div>
                        <span className="text-white/50 text-sm">Lumières</span>
                        <p className="text-white font-inter">{studio.equipment.light}</p>
                      </div>
                      <div>
                        <span className="text-white/50 text-sm">Extras</span>
                        <p className="text-white font-inter">{studio.equipment.extras}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-montserrat font-bold text-white mb-4">Inclus</h3>
                    <div className="space-y-2">
                      {studio.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${studio.gradient} flex items-center justify-center mt-0.5`}>
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-white/80 font-inter">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-montserrat font-bold text-white mb-4">Parfait pour</h3>
                  <div className="flex flex-wrap gap-2">
                    {studio.perfectFor.map((item, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/80 text-sm font-inter"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <motion.button
                  onClick={handleSelect}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-5 bg-gradient-to-r ${studio.gradient} text-white rounded-2xl font-montserrat font-bold text-lg shadow-2xl flex items-center justify-center gap-2 group`}
                >
                  <span>Choisir ce studio</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
