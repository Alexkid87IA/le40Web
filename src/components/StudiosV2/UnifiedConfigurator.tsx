import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Studio, Duration, Formula, Option } from '../../data/studiosLaunch/config';
import { Package } from '../../data/studiosLaunch/packages';
import StudioSelectionStep from './StudioSelectionStep';
import DurationSelectionStep from './DurationSelectionStep';
import EnhancedOptionsSelection from './EnhancedOptionsSelection';
import DateTimePicker from './DateTimePicker';
import FinalSummaryCard from './FinalSummaryCard';
import BookingCheckoutForm from './BookingCheckoutForm';
import { calculatePrice, ConfigurationState } from '../../utils/pricingCalculations';

interface UnifiedConfiguratorProps {
  studios: Studio[];
  durations: Duration[];
  formulas: Formula[];
  options: Option[];
  selectedProfile?: string;
  selectedPackage?: Package | null;
  onConfigurationChange?: (config: ConfigurationState) => void;
}

interface Section {
  id: string;
  title: string;
  number: number;
  isComplete: boolean;
}

export default function UnifiedConfigurator({
  studios,
  durations,
  formulas,
  options,
  selectedProfile,
  selectedPackage,
  onConfigurationChange
}: UnifiedConfiguratorProps) {
  const [configuration, setConfiguration] = useState<ConfigurationState>({
    studio: null,
    duration: null,
    formula: formulas[0],
    selectedOptions: new Map()
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string>('studio');
  const [filteredStudios, setFilteredStudios] = useState(studios);
  const [showCheckout, setShowCheckout] = useState(false);

  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (selectedProfile && selectedProfile !== 'all') {
      setFilteredStudios(
        studios.filter(studio => studio.profilesRecommended.includes(selectedProfile))
      );
    } else {
      setFilteredStudios(studios);
    }
  }, [selectedProfile, studios]);

  useEffect(() => {
    if (selectedPackage) {
      const relatedFormula = selectedPackage.includedServices.find(id =>
        formulas.some(f => f.id === id)
      );

      if (relatedFormula) {
        const formula = formulas.find(f => f.id === relatedFormula);
        if (formula) {
          setConfiguration(prev => ({ ...prev, formula }));
        }
      }

      const newOptions = new Map<string, number>();
      selectedPackage.includedServices.forEach(serviceId => {
        if (!formulas.some(f => f.id === serviceId)) {
          newOptions.set(serviceId, 1);
        }
      });

      setConfiguration(prev => ({
        ...prev,
        selectedOptions: newOptions
      }));
    }
  }, [selectedPackage, formulas]);

  useEffect(() => {
    if (onConfigurationChange) {
      onConfigurationChange(configuration);
    }
  }, [configuration, onConfigurationChange]);

  const handleStudioSelect = (studio: Studio) => {
    setConfiguration(prev => ({ ...prev, studio }));
    setExpandedSection('duration');
    scrollToSection('duration');
  };

  const handleDurationSelect = (duration: Duration) => {
    setConfiguration(prev => ({ ...prev, duration }));
    setExpandedSection('options');
    scrollToSection('options');
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

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setExpandedSection('summary');
    scrollToSection('summary');
  };

  const handleEditSection = (section: string) => {
    setExpandedSection(section);
    scrollToSection(section);
    setShowCheckout(false);
  };

  const handleBookingSuccess = () => {
    window.location.href = '/';
  };

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      const headerHeight = 96;
      const offset = 20;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? '' : sectionId);
  };

  const priceBreakdown = calculatePrice(configuration);

  const sections: Section[] = [
    {
      id: 'studio',
      title: 'Choisir le Studio',
      number: 1,
      isComplete: !!configuration.studio
    },
    {
      id: 'duration',
      title: 'Choisir la Durée',
      number: 2,
      isComplete: !!configuration.duration
    },
    {
      id: 'options',
      title: 'Formule & Options',
      number: 3,
      isComplete: true
    },
    {
      id: 'datetime',
      title: 'Date & Heure',
      number: 4,
      isComplete: !!selectedDate && !!selectedTime
    },
    {
      id: 'summary',
      title: 'Récapitulatif',
      number: 5,
      isComplete: !!configuration.studio && !!configuration.duration && !!selectedDate && !!selectedTime
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Configurez Votre Réservation
          </h2>
          <p className="text-xl text-slate-400">
            5 étapes simples • Prix en temps réel
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {sections.map((section) => (
              <div
                key={section.id}
                ref={el => sectionRefs.current[section.id] = el}
                className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      section.isComplete
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                        : expandedSection === section.id
                        ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {section.number}
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-white">
                        {section.title}
                      </h3>
                      {section.isComplete && (
                        <p className="text-sm text-green-400">Complété</p>
                      )}
                    </div>
                  </div>
                  {expandedSection === section.id ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                {expandedSection === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-slate-800"
                  >
                    <div className="p-6">
                      {section.id === 'studio' && (
                        <StudioSelectionStep
                          studios={filteredStudios}
                          selectedStudio={configuration.studio}
                          onSelect={handleStudioSelect}
                          showAllStudios={() => setFilteredStudios(studios)}
                          isFiltered={filteredStudios.length < studios.length}
                        />
                      )}

                      {section.id === 'duration' && configuration.studio && (
                        <DurationSelectionStep
                          durations={durations}
                          selectedDuration={configuration.duration}
                          studio={configuration.studio}
                          onSelect={handleDurationSelect}
                          onBack={() => handleEditSection('studio')}
                        />
                      )}

                      {section.id === 'options' && (
                        <EnhancedOptionsSelection
                          formulas={formulas}
                          options={options}
                          selectedFormula={configuration.formula}
                          selectedOptions={configuration.selectedOptions}
                          duration={configuration.duration}
                          onFormulaSelect={handleFormulaSelect}
                          onOptionToggle={handleOptionToggle}
                          onBack={() => handleEditSection('duration')}
                        />
                      )}

                      {section.id === 'datetime' && configuration.studio && (
                        <DateTimePicker
                          selectedDate={selectedDate}
                          selectedTime={selectedTime}
                          onDateSelect={handleDateSelect}
                          onTimeSelect={handleTimeSelect}
                          studioId={configuration.studio.id}
                        />
                      )}

                      {section.id === 'summary' && (
                        <div className="text-center text-slate-400">
                          Consultez le récapitulatif à droite
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <FinalSummaryCard
                studio={configuration.studio}
                duration={configuration.duration}
                formula={configuration.formula}
                selectedOptions={configuration.selectedOptions}
                options={options}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                totalPrice={priceBreakdown.total}
                onEdit={(section) => handleEditSection(section)}
              />

              {sections.every(s => s.isComplete) && !showCheckout && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCheckout(true)}
                  className="w-full mt-6 px-8 py-4 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white font-bold text-lg rounded-xl shadow-2xl transition-all"
                >
                  Procéder au paiement
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {showCheckout && sections.every(s => s.isComplete) && configuration.studio && configuration.duration && selectedDate && selectedTime && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 max-w-3xl mx-auto"
          >
            <BookingCheckoutForm
              configuration={configuration}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              totalPrice={priceBreakdown.total}
              options={options}
              onSuccess={handleBookingSuccess}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
