import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import { Package } from '../../data/studiosLaunch/packages';

interface QuickPackSelectorProps {
  packages: Package[];
  selectedPackage: Package | null;
  onSelectPackage: (pkg: Package) => void;
}

export default function QuickPackSelector({
  packages,
  selectedPackage,
  onSelectPackage
}: QuickPackSelectorProps) {
  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/10 to-rose-500/10 border border-orange-500/20 rounded-full mb-4">
          <Zap className="w-4 h-4 text-orange-400" />
          <span className="text-orange-400 font-semibold text-sm">Réservation Express</span>
        </div>
        <h3 className="text-3xl font-bold text-white mb-2">
          Packs Prêts à Réserver
        </h3>
        <p className="text-slate-400">
          Choisissez un pack et réservez en 3 clics • Studio + Formule + Options inclus
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelectPackage(pkg)}
            className={`relative bg-slate-900 border-2 rounded-2xl p-6 cursor-pointer transition-all hover:scale-[1.02] ${
              selectedPackage?.id === pkg.id
                ? 'border-violet-500 shadow-lg shadow-violet-500/25'
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="px-4 py-1 bg-gradient-to-r from-violet-600 to-pink-600 text-white text-xs font-bold rounded-full shadow-lg">
                  {pkg.badge || 'Populaire'}
                </div>
              </div>
            )}

            {pkg.badge && !pkg.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="px-4 py-1 bg-gradient-to-r from-orange-600 to-rose-600 text-white text-xs font-bold rounded-full shadow-lg">
                  {pkg.badge}
                </div>
              </div>
            )}

            <div className="text-center mb-6">
              <div className="text-5xl mb-3">{pkg.icon}</div>
              <h4 className="text-xl font-bold text-white mb-2">
                {pkg.name}
              </h4>
              <p className="text-slate-400 text-sm">
                {pkg.description}
              </p>
            </div>

            <div className="space-y-2 mb-6">
              {pkg.includedServices.slice(0, 4).map((service, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300 text-sm capitalize">
                    {service.replace(/-/g, ' ')}
                  </span>
                </div>
              ))}
              {pkg.includedServices.length > 4 && (
                <div className="text-slate-400 text-sm pl-6">
                  + {pkg.includedServices.length - 4} autres services
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs text-slate-500 line-through">
                    Valeur: {pkg.totalValue}€
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">
                      {pkg.packagePrice}€
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                    <span className="text-green-400 text-xs font-semibold">
                      -{pkg.savings}€
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectPackage(pkg)}
                className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all"
              >
                Choisir ce pack
              </button>
            </div>

            {selectedPackage?.id === pkg.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 right-4 w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center"
              >
                <Check className="w-5 h-5 text-white" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
