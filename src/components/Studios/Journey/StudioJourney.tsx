import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepIndicator from '../StepIndicator';
import Step1StudioSelection from './Step1StudioSelection';
import Step2FormulaSelection from './Step2FormulaSelection';
import Step3DurationSelection from './Step3DurationSelection';
import Step4OptionsSelection from './Step4OptionsSelection';
import FinalSummary from './FinalSummary';
import PriceSummary from './PriceSummary';
import { durations } from '../../../data/studios/formulas';

interface StudioJourneyProps {
  initialStudioId?: string;
  initialFormulaId?: string;
  initialDurationId?: string;
}

export default function StudioJourney({
  initialStudioId,
  initialFormulaId,
  initialDurationId,
}: StudioJourneyProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const [selectedStudioId, setSelectedStudioId] = useState<string | null>(initialStudioId || null);
  const [selectedFormulaId, setSelectedFormulaId] = useState<string | null>(initialFormulaId || null);
  const [selectedDurationId, setSelectedDurationId] = useState<string | null>(initialDurationId || null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});

  const stepRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    const savedConfig = localStorage.getItem('studioConfiguration');
    if (savedConfig) {
      try {
        const config = JSON.parse(savedConfig);
        if (config.studioId) setSelectedStudioId(config.studioId);
        if (config.formulaId) setSelectedFormulaId(config.formulaId);
        if (config.durationId) setSelectedDurationId(config.durationId);
        if (config.options) setSelectedOptions(config.options);
        if (config.currentStep) setCurrentStep(config.currentStep);
        if (config.completedSteps) setCompletedSteps(config.completedSteps);
      } catch (e) {
        console.error('Failed to load saved configuration', e);
      }
    }
  }, []);

  useEffect(() => {
    const config = {
      studioId: selectedStudioId,
      formulaId: selectedFormulaId,
      durationId: selectedDurationId,
      options: selectedOptions,
      currentStep,
      completedSteps,
    };
    localStorage.setItem('studioConfiguration', JSON.stringify(config));
  }, [selectedStudioId, selectedFormulaId, selectedDurationId, selectedOptions, currentStep, completedSteps]);

  const scrollToStep = (step: number) => {
    const element = stepRefs.current[step];
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleStepClick = (step: number) => {
    if (completedSteps.includes(step) || step <= currentStep) {
      setCurrentStep(step);
      setTimeout(() => scrollToStep(step), 100);
    }
  };

  const handleStudioSelect = (studioId: string) => {
    setSelectedStudioId(studioId);
  };

  const handleContinueFromStep1 = () => {
    if (!completedSteps.includes(1)) {
      setCompletedSteps([...completedSteps, 1]);
    }
    setCurrentStep(2);
    setTimeout(() => scrollToStep(2), 100);
  };

  const handleFormulaSelect = (formulaId: string) => {
    setSelectedFormulaId(formulaId);
  };

  const handleContinueFromStep2 = () => {
    if (!completedSteps.includes(2)) {
      setCompletedSteps([...completedSteps, 2]);
    }
    setCurrentStep(3);
    setTimeout(() => scrollToStep(3), 100);
  };

  const handleDurationSelect = (durationId: string) => {
    setSelectedDurationId(durationId);
  };

  const handleContinueFromStep3 = () => {
    if (!completedSteps.includes(3)) {
      setCompletedSteps([...completedSteps, 3]);
    }
    setCurrentStep(4);
    setTimeout(() => scrollToStep(4), 100);
  };

  const handleOptionsChange = (options: Record<string, number>) => {
    setSelectedOptions(options);
  };

  const handleContinueFromStep4 = () => {
    if (!completedSteps.includes(4)) {
      setCompletedSteps([...completedSteps, 4]);
    }
    setCurrentStep(5);
    setTimeout(() => scrollToStep(5), 100);
  };

  const handleEditFromSummary = (step: number) => {
    setCurrentStep(step);
    setTimeout(() => scrollToStep(step), 100);
  };

  const duration = selectedDurationId ? durations.find(d => d.id === selectedDurationId) : null;

  const context = selectedStudioId && selectedFormulaId && duration
    ? {
        studioId: selectedStudioId,
        formulaId: selectedFormulaId,
        durationHours: duration.hours,
      }
    : null;

  const showPriceSummary = currentStep >= 1 && selectedStudioId !== null;

  return (
    <div className="relative">
      <StepIndicator
        currentStep={Math.min(currentStep, 4)}
        onStepClick={handleStepClick}
        completedSteps={completedSteps}
      />

      <PriceSummary
        studioId={selectedStudioId}
        formulaId={selectedFormulaId}
        durationId={selectedDurationId}
        selectedOptions={selectedOptions}
        isVisible={showPriceSummary}
      />

      <div className="relative">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={(el) => (stepRefs.current[1] = el)}
            >
              <Step1StudioSelection
                selectedStudioId={selectedStudioId}
                onStudioSelect={handleStudioSelect}
                onContinue={handleContinueFromStep1}
              />
            </motion.div>
          )}

          {currentStep === 2 && selectedStudioId && (
            <motion.div
              key="step2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={(el) => (stepRefs.current[2] = el)}
            >
              <Step2FormulaSelection
                selectedStudioId={selectedStudioId}
                selectedFormulaId={selectedFormulaId}
                onFormulaSelect={handleFormulaSelect}
                onContinue={handleContinueFromStep2}
              />
            </motion.div>
          )}

          {currentStep === 3 && selectedStudioId && selectedFormulaId && (
            <motion.div
              key="step3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={(el) => (stepRefs.current[3] = el)}
            >
              <Step3DurationSelection
                selectedStudioId={selectedStudioId}
                selectedFormulaId={selectedFormulaId}
                selectedDurationId={selectedDurationId}
                onDurationSelect={handleDurationSelect}
                onContinue={handleContinueFromStep3}
              />
            </motion.div>
          )}

          {currentStep === 4 && context && (
            <motion.div
              key="step4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={(el) => (stepRefs.current[4] = el)}
            >
              <Step4OptionsSelection
                context={context}
                selectedOptions={selectedOptions}
                onOptionsChange={handleOptionsChange}
                onContinue={handleContinueFromStep4}
              />
            </motion.div>
          )}

          {currentStep === 5 && selectedStudioId && selectedFormulaId && selectedDurationId && (
            <motion.div
              key="step5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={(el) => (stepRefs.current[5] = el)}
            >
              <FinalSummary
                studioId={selectedStudioId}
                formulaId={selectedFormulaId}
                durationId={selectedDurationId}
                selectedOptions={selectedOptions}
                onEdit={handleEditFromSummary}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
