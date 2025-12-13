import { motion } from 'framer-motion';
import { Check, Sparkles, TrendingUp } from 'lucide-react';
import { packages, Package } from '../../data/studiosLaunch/packages';
import { options } from '../../data/studiosLaunch/config';

interface PackageBundlesProps {
  recommendedFor?: string;
  onSelectPackage: (pkg: Package) => void;
}

export default function PackageBundles({ recommendedFor, onSelectPackage }: PackageBundlesProps) {
  const filteredPackages = recommendedFor
    ? packages.filter(pkg => pkg.recommendedFor.includes(recommendedFor))
    : packages;

  const getServiceName = (serviceId: string) => {
    const option = options.find(opt => opt.id === serviceId);
    return option?.name || serviceId;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/20 rounded-full mb-4">
          <Sparkles className="w-5 h-5 text-violet-400" />
          <span className="text-violet-400 font-semibold">Économisez avec nos packs</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Ou choisissez un package tout-en-un
        </h3>
        <p className="text-slate-400">
          Packages optimisés pour chaque objectif avec jusqu'à 30% d'économies
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 hover:border-violet-500/50 transition-all group"
          >
            {pkg.badge && (
              <div className="absolute -top-3 left-6 z-10">
                <div className={`px-3 py-1 text-white text-xs font-semibold rounded-full ${
                  pkg.badge === 'Best-seller' || pkg.badge === 'Viral' ? 'bg-gradient-to-r from-orange-500 to-red-500' :
                  pkg.badge === 'Premium' ? 'bg-gradient-to-r from-amber-500 to-yellow-500' :
                  pkg.badge === 'ROI garanti' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                  'bg-slate-700'
                }`}>
                  {pkg.badge}
                </div>
              </div>
            )}

            {pkg.popular && (
              <div className="absolute -top-3 right-6 z-10">
                <div className="px-3 py-1 bg-violet-600 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Populaire
                </div>
              </div>
            )}

            <div className="text-5xl mb-4">{pkg.icon}</div>

            <h4 className="text-xl font-bold text-white mb-2">
              {pkg.name}
            </h4>

            <p className="text-slate-400 text-sm mb-4">
              {pkg.description}
            </p>

            <div className="mb-4">
              <p className="text-slate-500 text-xs mb-2">Inclus :</p>
              <div className="space-y-1">
                {pkg.includedServices.slice(0, 4).map((serviceId, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300 text-xs">
                      {getServiceName(serviceId)}
                    </span>
                  </div>
                ))}
                {pkg.includedServices.length > 4 && (
                  <p className="text-slate-500 text-xs pl-5">
                    +{pkg.includedServices.length - 4} autres services
                  </p>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 mb-4">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-white">
                  {pkg.packagePrice}€
                </span>
                <span className="text-slate-500 line-through text-sm">
                  {pkg.totalValue}€
                </span>
              </div>
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                <span className="text-green-400 text-sm font-semibold">
                  Économisez {pkg.savings}€ ({Math.round((pkg.savings / pkg.totalValue) * 100)}%)
                </span>
              </div>
            </div>

            <button
              onClick={() => onSelectPackage(pkg)}
              className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all group-hover:shadow-lg group-hover:shadow-violet-500/25"
            >
              Choisir ce pack
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
