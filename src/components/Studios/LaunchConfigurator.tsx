import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { studioSetups, degressivePricing } from '../../data/studios/setups';
import { optionsCatalog } from '../../data/studios/options';
import { buttons, cards } from '../../utils/designSystem';
import { Check, ChevronDown, ChevronUp, Calendar as CalendarIcon, X } from 'lucide-react';

interface SelectedConfig {
  studio: typeof studioSetups[0] | null;
  duration: typeof degressivePricing[0];
  options: string[];
  date: string;
  time: string;
}

export default function LaunchConfigurator() {
  const [selectedConfig, setSelectedConfig] = useState<SelectedConfig>({
    studio: null,
    duration: degressivePricing[2],
    options: [],
    date: '',
    time: ''
  });

  const [expandedStudio, setExpandedStudio] = useState<string | null>(null);

  const calculateTotal = () => {
    if (!selectedConfig.studio) return 0;

    const launchPrice = selectedConfig.studio.launchPrice || selectedConfig.studio.basePrice;
    const hoursPrice = launchPrice * selectedConfig.duration.hours;
    const discountAmount = hoursPrice * selectedConfig.duration.discount;
    const baseTotal = hoursPrice - discountAmount;

    const optionsTotal = selectedConfig.options.reduce((sum, optionId) => {
      const option = optionsCatalog[optionId as keyof typeof optionsCatalog];
      if (!option) return sum;

      if (option.unit === '/h') {
        return sum + (option.price * selectedConfig.duration.hours);
      }
      return sum + option.price;
    }, 0);

    return baseTotal + optionsTotal;
  };

  const calculateSavings = () => {
    if (!selectedConfig.studio) return 0;

    const normalPrice = selectedConfig.studio.basePrice * selectedConfig.duration.hours;
    const launchPrice = selectedConfig.studio.launchPrice! * selectedConfig.duration.hours;
    const degressiveDiscount = launchPrice * selectedConfig.duration.discount;

    return normalPrice - (launchPrice - degressiveDiscount);
  };

  const total = calculateTotal();
  const savings = calculateSavings();

  return (
    <section id="configurator" className="py-32 bg-gradient-to-b from-black via-slate-950 to-black">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black font-montserrat text-white">
            Choisissez Votre Configuration
          </h2>
          <p className="text-xl sm:text-2xl text-white/80">
            Setup prêt en 5 minutes • Tout inclus
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white font-montserrat">
                1. Type de contenu
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {studioSetups.map((studio) => (
                  <StudioCard
                    key={studio.id}
                    studio={studio}
                    isSelected={selectedConfig.studio?.id === studio.id}
                    isExpanded={expandedStudio === studio.id}
                    onSelect={() => setSelectedConfig({ ...selectedConfig, studio })}
                    onToggleExpand={() =>
                      setExpandedStudio(expandedStudio === studio.id ? null : studio.id)
                    }
                  />
                ))}
              </div>
            </div>

            {selectedConfig.studio && (
              <>
                <DurationSelector
                  selected={selectedConfig.duration}
                  studio={selectedConfig.studio}
                  onChange={(duration) =>
                    setSelectedConfig({ ...selectedConfig, duration })
                  }
                />

                <OptionsSelector
                  selectedOptions={selectedConfig.options}
                  relevantOptions={selectedConfig.studio.relevantOptions || []}
                  duration={selectedConfig.duration.hours}
                  onChange={(options) =>
                    setSelectedConfig({ ...selectedConfig, options })
                  }
                />
              </>
            )}
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <ConfigSummary
              config={selectedConfig}
              total={total}
              savings={savings}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StudioCard({
  studio,
  isSelected,
  isExpanded,
  onSelect,
  onToggleExpand
}: {
  studio: typeof studioSetups[0];
  isSelected: boolean;
  isExpanded: boolean;
  onSelect: () => void;
  onToggleExpand: () => void;
}) {
  const Icon = studio.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`${cards.standard.full} cursor-pointer relative overflow-hidden group ${
        isSelected ? 'border-orange-500/50' : ''
      }`}
    >
      <div
        className="relative h-48 -m-8 mb-6 overflow-hidden"
        onClick={onSelect}
      >
        <img
          src={studio.image}
          alt={studio.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${studio.gradient} opacity-60`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="absolute top-4 left-4">
          <Icon className="w-8 h-8 text-white drop-shadow-lg" />
        </div>

        {studio.badge && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-bold">
            {studio.badge}
          </div>
        )}

        <div className="absolute bottom-4 right-4">
          <div className="text-right">
            <div className="text-3xl font-black text-white drop-shadow-lg">
              {studio.launchPrice}€<span className="text-lg">/h</span>
            </div>
            <div className="text-sm text-white/80 line-through">
              au lieu de {studio.basePrice}€
            </div>
          </div>
        </div>
      </div>

      <div onClick={onSelect} className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white font-montserrat">{studio.name}</h3>
            <p className="text-sm text-white/60">{studio.subtitle}</p>
          </div>
          {isSelected && (
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        <p className="text-sm text-white/80">{studio.description}</p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleExpand();
        }}
        className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm text-white/80 font-semibold"
      >
        {isExpanded ? 'Masquer' : 'Voir'} les détails
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-white/10 space-y-4 text-sm">
              <div>
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  📹 Équipement inclus
                </h4>
                <ul className="space-y-1 text-white/70">
                  <li>• Caméras: {studio.equipment.cameras}</li>
                  <li>• Audio: {studio.equipment.audio}</li>
                  <li>• Lumières: {studio.equipment.light}</li>
                  <li>• Régie: {studio.equipment.extras}</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2">👤 Capacité</h4>
                <p className="text-white/70">{studio.capacity}</p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2">⏱️ Durée recommandée</h4>
                <p className="text-white/70">{studio.recommendedDuration}</p>
              </div>

              {studio.perfectFor && (
                <div>
                  <h4 className="font-bold text-white mb-2">✨ Parfait pour</h4>
                  <div className="flex flex-wrap gap-2">
                    {studio.perfectFor.map((use) => (
                      <span
                        key={use}
                        className="px-2 py-1 rounded-md bg-white/5 text-white/70 text-xs"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function DurationSelector({
  selected,
  studio,
  onChange
}: {
  selected: typeof degressivePricing[0];
  studio: typeof studioSetups[0];
  onChange: (duration: typeof degressivePricing[0]) => void;
}) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white font-montserrat">
        2. Durée
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {degressivePricing.map((duration) => {
          const launchPrice = studio.launchPrice || studio.basePrice;
          const price = launchPrice * duration.hours;
          const normalPrice = studio.basePrice * duration.hours;
          const discountAmount = price * duration.discount;
          const finalPrice = price - discountAmount;

          return (
            <motion.button
              key={duration.hours}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange(duration)}
              className={`${cards.standard.base} relative p-6 text-center ${
                selected.hours === duration.hours
                  ? 'border-orange-500/50 bg-orange-500/10'
                  : 'hover:border-white/20'
              }`}
            >
              {duration.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-bold whitespace-nowrap">
                  Recommandé
                </div>
              )}

              <div className="text-3xl font-black text-white mb-1">{duration.label}</div>
              <div className="text-2xl font-bold text-orange-400 mb-1">
                {Math.round(finalPrice)}€
              </div>
              {duration.discount > 0 && (
                <>
                  <div className="text-sm text-white/40 line-through">
                    {Math.round(normalPrice)}€
                  </div>
                  <div className="text-xs text-green-400 font-bold mt-1">
                    -{Math.round(duration.discount * 100)}%
                  </div>
                </>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function OptionsSelector({
  selectedOptions,
  relevantOptions,
  duration,
  onChange
}: {
  selectedOptions: string[];
  relevantOptions: string[];
  duration: number;
  onChange: (options: string[]) => void;
}) {
  const toggleOption = (optionId: string) => {
    if (selectedOptions.includes(optionId)) {
      onChange(selectedOptions.filter((id) => id !== optionId));
    } else {
      onChange([...selectedOptions, optionId]);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white font-montserrat">
        3. Options
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {relevantOptions.map((optionId) => {
          const option = optionsCatalog[optionId as keyof typeof optionsCatalog];
          if (!option) return null;

          const isSelected = selectedOptions.includes(optionId);
          const Icon = option.icon;
          const totalPrice = option.unit === '/h' ? option.price * duration : option.price;

          return (
            <motion.button
              key={optionId}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleOption(optionId)}
              className={`${cards.minimal.base} text-left relative ${
                isSelected ? 'border-orange-500/50 bg-orange-500/10' : 'hover:border-white/10'
              }`}
            >
              {option.popular && (
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                  <span className="text-xs">⭐</span>
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-bold text-white text-sm">{option.name}</h4>
                    {isSelected && (
                      <Check className="w-5 h-5 text-orange-400 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-white/60 mb-2">{option.description}</p>
                  <div className="text-lg font-bold text-orange-400">
                    +{totalPrice}€
                    {option.unit !== 'fixe' && <span className="text-sm ml-1">{option.unit}</span>}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function ConfigSummary({
  config,
  total,
  savings
}: {
  config: SelectedConfig;
  total: number;
  savings: number;
}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`${cards.premium.full} space-y-6 sticky top-24`}>
      <h3 className="text-2xl font-bold text-white font-montserrat">
        Votre Configuration
      </h3>

      {!config.studio ? (
        <div className="text-center py-12">
          <p className="text-white/60">
            Sélectionnez un studio pour commencer
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4 pb-6 border-b border-white/10">
            <div>
              <p className="text-sm text-white/60 mb-1">Studio</p>
              <p className="text-lg font-bold text-white">{config.studio.name}</p>
            </div>

            <div>
              <p className="text-sm text-white/60 mb-1">Durée</p>
              <p className="text-lg font-bold text-white">{config.duration.label}</p>
            </div>

            {config.options.length > 0 && (
              <div>
                <p className="text-sm text-white/60 mb-2">Options</p>
                <div className="space-y-2">
                  {config.options.map((optionId) => {
                    const option = optionsCatalog[optionId as keyof typeof optionsCatalog];
                    if (!option) return null;
                    return (
                      <p key={optionId} className="text-sm text-white/80">
                        + {option.name}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-white/60">Total</span>
              <span className="text-3xl font-black text-white">{Math.round(total)}€</span>
            </div>

            {savings > 0 && (
              <div className="px-4 py-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-green-400 font-semibold text-sm">
                    Vous économisez
                  </span>
                  <span className="text-xl font-bold text-green-400">
                    {Math.round(savings)}€
                  </span>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={scrollToTop}
            className={`${buttons.primary.full} w-full text-lg`}
          >
            RÉSERVER MAINTENANT
          </button>

          <div className="space-y-2 text-xs text-white/60">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>Paiement sécurisé</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>Annulation gratuite 7j</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
