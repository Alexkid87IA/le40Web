import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Users, GraduationCap, Mic2, Wrench, Wine, Award, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { EventCategory } from '../../data/events/categories';

const iconMap: Record<string, typeof Users> = {
  Users,
  GraduationCap,
  Mic2,
  Wrench,
  Wine,
  Award
};

interface CategoryModalProps {
  category: EventCategory | null;
  onClose: () => void;
}

export default function CategoryModal({ category, onClose }: CategoryModalProps) {
  const [dragY, setDragY] = useState(0);

  useEffect(() => {
    if (category) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && category) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [category, onClose]);

  if (!category) return null;

  const Icon = iconMap[category.iconName] || Users;

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 100) {
      onClose();
    }
    setDragY(0);
  };

  return (
    <AnimatePresence mode="wait">
      <div className="fixed inset-0 z-[9999] flex items-start md:items-center justify-center overflow-y-auto" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 50 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="relative w-full max-w-2xl mt-auto md:my-8 overflow-hidden touch-pan-y"
          style={{ maxHeight: 'calc(100vh - env(safe-area-inset-top) - 20px)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-slate-950/95 backdrop-blur-xl border border-white/20 rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden">
            <div className="lg:hidden sticky top-0 z-30 bg-slate-950/95 backdrop-blur-xl border-b border-white/10 px-4 py-3 flex items-center justify-between">
              <div className="w-12 h-1 bg-white/30 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-2"></div>
              <h3 className="text-white font-montserrat font-bold text-base pt-4">{category.name}</h3>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 transition-all group"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="hidden lg:flex absolute top-6 right-6 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Fermer"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="overflow-y-auto lg:max-h-[90vh]">
              <div className="relative p-6 md:p-8 lg:p-12 pb-6 md:pb-8">
                <div className={`absolute inset-0 bg-gradient-to-br ${category.colorGradient} opacity-10`} />

                <div className="relative z-10 flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className={`inline-flex p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br ${category.colorGradient} shadow-2xl mb-6 md:mb-8`}
                  >
                    <Icon className="w-16 h-16 md:w-20 md:h-20 text-white" />
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`text-3xl md:text-4xl lg:text-5xl font-montserrat font-black mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r ${category.colorGradient}`}
                  >
                    {category.name}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-white/80 text-sm md:text-base lg:text-lg leading-relaxed font-inter max-w-xl px-4"
                  >
                    {category.description}
                  </motion.p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="px-4 md:px-8 lg:px-12 pb-6 md:pb-8 lg:pb-12"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 border border-white/10">
                  <h4 className="text-lg md:text-xl font-montserrat font-bold text-white mb-4 md:mb-6">
                    Ce que vous allez découvrir
                  </h4>

                  <ul className="space-y-3 md:space-y-4">
                    <li className="flex items-start gap-4">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.colorGradient} mt-2 flex-shrink-0`} />
                      <span className="text-white/70 font-inter leading-relaxed text-sm md:text-base">
                        Des événements organisés par des professionnels de votre secteur
                      </span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.colorGradient} mt-2 flex-shrink-0`} />
                      <span className="text-white/70 font-inter leading-relaxed text-sm md:text-base">
                        Un espace propice aux échanges et au networking
                      </span>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.colorGradient} mt-2 flex-shrink-0`} />
                      <span className="text-white/70 font-inter leading-relaxed text-sm md:text-base">
                        Des opportunités de développement professionnel
                      </span>
                    </li>
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className={`w-full mt-6 md:mt-8 py-3 md:py-4 px-6 bg-gradient-to-r ${category.colorGradient} text-white font-montserrat font-bold rounded-xl shadow-lg hover:shadow-xl transition-all text-sm md:text-base`}
                  >
                    Voir les événements
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
