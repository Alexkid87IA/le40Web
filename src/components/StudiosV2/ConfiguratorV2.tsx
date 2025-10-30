import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { studios, durations, formulas, options, Studio, Duration, Formula } from '../../data/studiosLaunch/config';
import { calculatePrice, ConfigurationState, formatPrice } from '../../utils/pricingCalculations';
import { Package } from '../../data/studiosLaunch/packages';
import StepIndicator from './StepIndicator';
import StudioSelectionStep from './StudioSelectionStep';
import DurationSelectionStep from './DurationSelectionStep';
import EnhancedOptionsSelection from './EnhancedOptionsSelection';
import StickyPriceSummary from './StickyPriceSummary';
import PackageBundles from './PackageBundles';

interface ConfiguratorV2Props {
  selectedProfile?: string;
}

export default function ConfiguratorV2({ selectedProfile }: ConfiguratorV2Props) {
  const [currentStep, setCurrentStep] = useState(1);
  const [configuration, setConfiguration] = useState<ConfigurationState>({
    studio: null,
    duration: null,
    formula: formulas[0],
    selectedOptions: new Map()
  });

  const [filteredStudios, setFilteredStudios] = useState(studios);

  useEffect(() => {
    if (selectedProfile && selectedProfile !== 'all') {
      setFilteredStudios(
        studios.filter(studio => studio.profilesRecommended.includes(selectedProfile))
      );
    } else {
      setFilteredStudios(studios);
    }
  }, [selectedProfile]);

  const handleStudioSelect = (studio: Studio) => {
    setConfiguration(prev => ({ ...prev, studio }));
    setCurrentStep(2);
  };

  const handleDurationSelect = (duration: Duration) => {
    setConfiguration(prev => ({ ...prev, duration }));
    setCurrentStep(3);
  };

  const handleFormulaSelect = (formula: Formula) => {
    setConfiguration(prev => ({ ...prev, formula }));
  };

  const handleOptionToggle = (optionId: string, quantity: number = 1) => {
    setConfiguration(prev => {
      const newOptions = new Map(prev.selectedOptions);
      if (quantity === 0) {
        newOptions.delete(optionId);
      } else {
        newOptions.set(optionId, quantity);
      }
      return { ...prev, selectedOptions: newOptions };
    });
  };

  const handlePackageSelect = (pkg: Package) => {
    const relatedFormula = pkg.includedServices.find(id =>
      formulas.some(f => f.id === id)
    );

    if (relatedFormula) {
      const formula = formulas.find(f => f.id === relatedFormula);
      if (formula) {
        setConfiguration(prev => ({ ...prev, formula }));
      }
    }

    const newOptions = new Map<string, number>();
    pkg.includedServices.forEach(serviceId => {
      if (!formulas.some(f => f.id === serviceId)) {
        newOptions.set(serviceId, 1);
      }
    });

    setConfiguration(prev => ({
      ...prev,
      selectedOptions: newOptions
    }));
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const priceBreakdown = calculatePrice(configuration);

  const steps = [
    { number: 1, label: 'Studio' },
    { number: 2, label: 'Durée' },
    { number: 3, label: 'Options' }
  ];

  return (
    <section id="configurator" className="py-20 bg-gradient-to-b from-black to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Configurez Votre Studio
          </h2>
          <p className="text-xl text-slate-400">
            En 3 étapes simples • Devis instantané
          </p>
        </motion.div>

        <div className="mb-12">
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <StudioSelectionStep
                  studios={filteredStudios}
                  selectedStudio={configuration.studio}
                  onSelect={handleStudioSelect}
                  showAllStudios={() => setFilteredStudios(studios)}
                  isFiltered={filteredStudios.length < studios.length}
                />
              )}

              {currentStep === 2 && (
                <DurationSelectionStep
                  durations={durations}
                  selectedDuration={configuration.duration}
                  studio={configuration.studio!}
                  onSelect={handleDurationSelect}
                  onBack={handleBack}
                />
              )}

              {currentStep === 3 && (
                <>
                  <PackageBundles
                    recommendedFor={selectedProfile}
                    onSelectPackage={handlePackageSelect}
                  />

                  <EnhancedOptionsSelection
                    formulas={formulas}
                    options={options}
                    selectedFormula={configuration.formula}
                    selectedOptions={configuration.selectedOptions}
                    duration={configuration.duration!}
                    onFormulaSelect={handleFormulaSelect}
                    onOptionToggle={handleOptionToggle}
                    onBack={handleBack}
                  />
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <StickyPriceSummary
              configuration={configuration}
              priceBreakdown={priceBreakdown}
              currentStep={currentStep}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
