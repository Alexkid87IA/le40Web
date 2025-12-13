import { motion } from 'framer-motion';
import { Check, Users, Maximize } from 'lucide-react';
import { Studio } from '../../data/studiosLaunch/config';

interface StudioSelectionStepProps {
  studios: Studio[];
  selectedStudio: Studio | null;
  onSelect: (studio: Studio) => void;
  showAllStudios: () => void;
  isFiltered: boolean;
}

export default function StudioSelectionStep({
  studios,
  selectedStudio,
  onSelect,
  showAllStudios,
  isFiltered
}: StudioSelectionStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">
          Choisissez votre studio
        </h3>
        {isFiltered && (
          <button
            onClick={showAllStudios}
            className="text-violet-400 hover:text-violet-300 text-sm underline"
          >
            Voir tous les studios
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {studios.map((studio, index) => (
          <motion.div
            key={studio.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(studio)}
            className={`relative bg-slate-900 border-2 rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] ${
              selectedStudio?.id === studio.id
                ? 'border-violet-500 shadow-lg shadow-violet-500/25'
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            {studio.badge && (
              <div className="absolute top-4 left-4 z-10">
                <div className="px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
                  {studio.badge}
                </div>
              </div>
            )}

            {studio.popular && (
              <div className="absolute top-4 right-4 z-10">
                <div className="px-3 py-1 bg-gradient-to-r from-violet-600 to-pink-600 text-white text-xs font-semibold rounded-full">
                  Populaire
                </div>
              </div>
            )}

            <div className="relative h-48">
              <img
                src={studio.image}
                alt={studio.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
            </div>

            <div className="p-6">
              <h4 className="text-xl font-bold text-white mb-1">
                {studio.name}
              </h4>
              <p className="text-slate-400 text-sm mb-4">
                {studio.subtitle}
              </p>

              <div className="space-y-2 mb-4">
                {studio.equipment.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 mb-4 text-sm text-slate-400">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{studio.capacity}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Maximize className="w-4 h-4" />
                  <span>{studio.surface}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-white">
                    {studio.priceDiscounted}€
                  </span>
                  <span className="text-slate-400">/h</span>
                  <span className="text-slate-500 line-through text-sm ml-2">
                    {studio.priceNormal}€/h
                  </span>
                </div>
                <div className="inline-block px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                  <span className="text-green-400 text-sm font-semibold">
                    -{studio.discountPercent}% Offre Découverte
                  </span>
                </div>
              </div>

              <button
                onClick={() => onSelect(studio)}
                className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all"
              >
                Choisir ce studio
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
