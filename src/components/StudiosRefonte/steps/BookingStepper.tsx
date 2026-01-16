/**
 * BookingStepper - Step indicator/navigation component
 */

import { motion } from 'framer-motion';
import { Check, Edit2 } from 'lucide-react';
import type { BookingStepperProps, StepInfo } from './types';

export default function BookingStepper({
  currentStep,
  selectedStudio,
  selectedFormule,
  selectedExtras,
  selectedDate,
  selectedSlot,
  selectedDuration,
  onEditStep,
}: BookingStepperProps) {
  const steps: StepInfo[] = [
    {
      number: 1,
      label: 'Studio',
      value: selectedStudio ? selectedStudio.shortName : null,
      icon: selectedStudio?.icon || null,
    },
    {
      number: 2,
      label: 'Formule',
      value: selectedFormule ? `${selectedFormule.name} · ${selectedDuration}` : null,
      icon: selectedFormule ? selectedFormule.icon : null,
    },
    {
      number: 3,
      label: 'Extras',
      value: selectedExtras.length > 0 ? `${selectedExtras.length} extra${selectedExtras.length > 1 ? 's' : ''}` : null,
      icon: null,
    },
    {
      number: 4,
      label: 'Date',
      value: selectedDate && selectedSlot ? `${selectedSlot}` : null,
      icon: null,
    },
  ];

  return (
    <div className="sticky top-0 z-30 mb-8 md:mb-12 bg-gradient-to-b from-zinc-950 via-zinc-950/95 to-transparent backdrop-blur-md pb-4 pt-2 -mx-4 px-4 md:-mx-6 md:px-6 border-b border-white/5">
      {/* Desktop version - detailed horizontal stepper */}
      <div className="hidden md:flex items-start justify-center gap-2">
        {steps.map((step, idx) => {
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          const StepIcon = step.icon;
          const isClickable = isCompleted || (step.number === 1);

          return (
            <div key={step.number} className="flex items-center">
              <motion.button
                onClick={() => isClickable && onEditStep(step.number)}
                disabled={!isClickable}
                whileHover={isClickable ? { scale: 1.02, y: -2 } : {}}
                whileTap={isClickable ? { scale: 0.98 } : {}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative p-4 rounded-xl border-2 transition-all min-w-[140px] ${
                  isActive
                    ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/20'
                    : isCompleted
                    ? 'border-emerald-500/50 bg-emerald-500/5 hover:border-emerald-500 hover:bg-emerald-500/10 cursor-pointer'
                    : 'border-white/10 bg-white/5'
                } ${!isClickable ? 'cursor-not-allowed' : ''}`}
              >
                {/* Number/Check */}
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                      : 'bg-white/10 text-white/40'
                  }`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : step.number}
                  </div>

                  <div className="text-left flex-1">
                    <div className={`text-xs font-medium transition-colors ${
                      isActive ? 'text-emerald-400' : isCompleted ? 'text-emerald-300' : 'text-white/60'
                    }`}>
                      {step.label}
                    </div>

                    {step.value && (
                      <div className="text-xs font-bold text-white mt-0.5 truncate">
                        {typeof StepIcon === 'string' ? StepIcon : ''}
                        {step.value}
                      </div>
                    )}
                  </div>
                </div>

                {/* "Edit" badge when completed */}
                {isCompleted && (
                  <div className="absolute top-1 right-1 text-[10px] text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Edit2 className="w-3 h-3" />
                  </div>
                )}
              </motion.button>

              {/* Separator */}
              {idx < steps.length - 1 && (
                <div className={`w-6 h-1 mx-1 rounded-full transition-all ${
                  isCompleted ? 'bg-emerald-500' : 'bg-white/10'
                }`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile version - simple stepper with progression */}
      <div className="md:hidden">
        {/* Progress indicator */}
        <div className="mb-3 text-center">
          <div className="text-emerald-400 text-xs font-bold mb-1">
            ÉTAPE {currentStep} SUR 4
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / 4) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <div className="flex items-center justify-center mb-4">
          {steps.map((step, idx) => {
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;

            return (
              <div key={step.number} className="flex items-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isActive || isCompleted ? 1 : 0.8 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30'
                      : 'bg-white/10 text-white/40'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step.number}
                </motion.div>
                {idx < steps.length - 1 && (
                  <div className={`w-6 h-1 mx-1 rounded-full transition-all ${
                    isCompleted ? 'bg-emerald-500' : 'bg-white/10'
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Current step label */}
        <div className="text-center">
          <div className="text-emerald-400 text-sm font-medium mb-1">
            Étape {currentStep}/4
          </div>
          <div className="text-white font-bold text-lg">
            {steps[currentStep - 1].label}
          </div>
          {steps[currentStep - 1].value && (
            <div className="text-white/60 text-sm mt-1">
              {steps[currentStep - 1].value}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
