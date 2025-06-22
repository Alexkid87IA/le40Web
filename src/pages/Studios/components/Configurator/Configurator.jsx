import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ShoppingBag, Check } from 'lucide-react';
import StepDuration from './StepDuration';
import StepFormula from './StepFormula';
import StepOptions from './StepOptions';
import StepDateTime from './StepDateTime';
import { calculatePrice } from '../../utils/priceCalculations';

export default function Configurator({ isOpen, selectedSetup, onClose }) {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedDuration, setSelectedDuration] = useState('3h');
  const [selectedFormula, setSelectedFormula] = useState('studio');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Reset state when opening
  React.useEffect(() => {
    if (isOpen && selectedSetup) {
      setActiveStep(1);
      setSelectedDuration('3h');
      setSelectedFormula('studio');
      setSelectedOptions([]);
      setSelectedDate('');
      setSelectedTime('');
    }
  }, [isOpen, selectedSetup]);

  const price = calculatePrice({
    setup: selectedSetup,
    duration: selectedDuration,
    formula: selectedFormula,
    options: selectedOptions
  });

  const handleNext = () => {
    if (activeStep < 4) setActiveStep(activeStep + 1);
  };

  const handlePrev = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert('Veuillez sélectionner une date et un créneau horaire');
      return;
    }

    // Créer l'objet de réservation
    const reservation = {
      id: `studio-${selectedSetup.id}-${Date.now()}`,
      name: `${selectedSetup.name} - ${selectedDate} à ${selectedTime}`,
      price: price,
      type: 'studio',
      setup: selectedSetup.name,
      duration: selectedDuration,
      formula: selectedFormula,
      options: selectedOptions,
      date: selectedDate,
      time: selectedTime
    };
    
    alert(`Réservation confirmée !\n\n${selectedSetup.name}\nLe ${selectedDate} à ${selectedTime}\nTotal : ${price}€ HT`);
    onClose();
  };

  const steps = [
    { number: 1, title: 'Durée' },
    { number: 2, title: 'Formule' },
    { number: 3, title: 'Options' },
    { number: 4, title: 'Date & Heure' }
  ];

  return (
    <AnimatePresence>
      {isOpen && selectedSetup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50"
        >
          <div className="h-full flex">
            {/* Zone principale - côté gauche */}
            <div className="flex-1 flex flex-col">
              {/* Header minimal */}
              <div className="px-8 py-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onClose}
                      className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </motion.button>
                    <div>
                      <h2 className="text-xl font-light text-white">
                        Configuration de votre <span className="font-normal">{selectedSetup.name}</span>
                      </h2>
                    </div>
                  </div>

                  {/* Progress minimal */}
                  <div className="flex items-center gap-3">
                    {steps.map((step, index) => (
                      <React.Fragment key={step.number}>
                        <div className="flex items-center gap-2">
                          <div className={`transition-all duration-300 ${
                            activeStep > step.number 
                              ? 'w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center' 
                              : activeStep === step.number
                              ? 'w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center'
                              : 'w-6 h-6 rounded-full bg-white/10 flex items-center justify-center'
                          }`}>
                            {activeStep > step.number ? (
                              <Check className="w-3 h-3 text-white" />
                            ) : (
                              <span className={`text-xs ${activeStep >= step.number ? 'text-white' : 'text-white/40'}`}>
                                {step.number}
                              </span>
                            )}
                          </div>
                          <span className={`text-sm hidden lg:block ${
                            activeStep >= step.number ? 'text-white' : 'text-white/40'
                          }`}>
                            {step.title}
                          </span>
                        </div>
                        {index < steps.length - 1 && (
                          <div className={`w-12 h-px transition-all duration-300 ${
                            activeStep > step.number ? 'bg-purple-500' : 'bg-white/10'
                          }`} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contenu de l'étape */}
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-3xl">
                  <AnimatePresence mode="wait">
                    {activeStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <StepDuration 
                          isActive={true}
                          selectedDuration={selectedDuration}
                          onDurationChange={setSelectedDuration}
                          onNext={handleNext}
                          basePrice={selectedSetup.basePrice}
                        />
                      </motion.div>
                    )}

                    {activeStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <StepFormula 
                          isActive={true}
                          selectedFormula={selectedFormula}
                          onFormulaChange={setSelectedFormula}
                          onNext={handleNext}
                        />
                      </motion.div>
                    )}

                    {activeStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <StepOptions 
                          isActive={true}
                          selectedOptions={selectedOptions}
                          onOptionsChange={setSelectedOptions}
                          onNext={handleNext}
                          selectedDuration={selectedDuration}
                        />
                      </motion.div>
                    )}

                    {activeStep === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <StepDateTime 
                          isActive={true}
                          price={price}
                          selectedDate={selectedDate}
                          selectedTime={selectedTime}
                          onDateChange={setSelectedDate}
                          onTimeChange={setSelectedTime}
                          setupName={selectedSetup.name}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Navigation en bas */}
              <div className="px-8 py-6 border-t border-white/10">
                <div className="max-w-3xl mx-auto flex justify-between">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePrev}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                      activeStep === 1 
                        ? 'bg-white/5 text-white/30 cursor-not-allowed' 
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                    disabled={activeStep === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Précédent
                  </motion.button>

                  {activeStep < 4 ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNext}
                      className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-white/90 transition-colors"
                    >
                      Suivant
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Panier latéral - côté droit */}
            <div className="w-[400px] bg-zinc-900/50 backdrop-blur-xl border-l border-white/10 flex flex-col">
              {/* Header du panier */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white">Récapitulatif</h3>
                </div>
              </div>

              {/* Contenu du panier */}
              <div className="flex-1 p-6 overflow-y-auto">
                {/* Info du setup */}
                <div className="mb-6">
                  <div className="flex gap-4">
                    <img 
                      src={selectedSetup.image} 
                      alt={selectedSetup.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-white mb-1">{selectedSetup.name}</h4>
                      <p className="text-sm text-white/50">{selectedSetup.subtitle}</p>
                      <p className="text-xs text-white/30 mt-2">{selectedSetup.capacity}</p>
                    </div>
                  </div>
                </div>

                {/* Détails progressifs */}
                <div className="space-y-4">
                  {/* Durée */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pb-4 border-b border-white/5"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-white/50">Durée</span>
                      <span className="text-sm text-white font-medium">
                        {selectedDuration === '1h' && '1 heure'}
                        {selectedDuration === '3h' && '3 heures'}
                        {selectedDuration === 'day' && 'Journée complète'}
                      </span>
                    </div>
                  </motion.div>

                  {/* Formule */}
                  {activeStep >= 2 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="pb-4 border-b border-white/5"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-white/50">Formule</span>
                        <span className="text-sm text-white font-medium">
                          {selectedFormula === 'studio' && 'Studio'}
                          {selectedFormula === 'postprod' && 'Post-Production'}
                          {selectedFormula === 'expert' && 'Pack Expert'}
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Options */}
                  {activeStep >= 3 && selectedOptions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="pb-4 border-b border-white/5"
                    >
                      <p className="text-sm text-white/50 mb-2">Options ({selectedOptions.length})</p>
                      <div className="space-y-1">
                        {selectedOptions.map(optionId => (
                          <div key={optionId} className="text-xs text-white/70">
                            • {optionId}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Date et heure */}
                  {activeStep === 4 && selectedDate && selectedTime && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20"
                    >
                      <p className="text-sm text-purple-400 mb-2">📅 Rendez-vous</p>
                      <p className="text-white font-medium">{selectedDate}</p>
                      <p className="text-white/70">à {selectedTime}</p>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Footer avec prix et CTA */}
              <div className="p-6 border-t border-white/10">
                <div className="mb-6">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-white/50">Total HT</span>
                    <motion.span 
                      key={price}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-3xl font-montserrat font-light text-white"
                    >
                      {price}€
                    </motion.span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/30">TVA 20% : {Math.round(price * 0.2)}€</p>
                    <p className="text-sm text-white/50 font-medium">TTC : {Math.round(price * 1.2)}€</p>
                  </div>
                </div>

                {activeStep === 4 && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleConfirm}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                  >
                    Confirmer la réservation
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}