import { motion } from 'framer-motion';
import { Monitor, Package, Clock, Sparkles, Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  completedSteps: number[];
}

const steps = [
  { id: 1, label: 'Studio', icon: Monitor },
  { id: 2, label: 'Formule', icon: Package },
  { id: 3, label: 'Durée', icon: Clock },
  { id: 4, label: 'Options', icon: Sparkles },
];

export default function StepIndicator({ currentStep, onStepClick, completedSteps }: StepIndicatorProps) {
  return (
    <div className="w-full py-8 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = completedSteps.includes(step.id);
            const isAccessible = isCompleted || step.id <= currentStep;

            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center flex-1">
                <motion.button
                  whileHover={isAccessible ? { scale: 1.1 } : {}}
                  whileTap={isAccessible ? { scale: 0.95 } : {}}
                  onClick={() => isAccessible && onStepClick(step.id)}
                  disabled={!isAccessible}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-xl shadow-cyan-500/50'
                      : isCompleted
                      ? 'bg-emerald-500 shadow-lg shadow-emerald-500/30'
                      : 'bg-slate-800 border-2 border-white/10'
                  } ${isAccessible ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                >
                  {isCompleted && !isActive ? (
                    <Check className="w-6 h-6 text-white" />
                  ) : (
                    <StepIcon className={`w-6 h-6 ${isActive || isCompleted ? 'text-white' : 'text-white/40'}`} />
                  )}
                </motion.button>

                <div className="mt-3 text-center">
                  <div className={`text-sm font-montserrat font-bold ${
                    isActive ? 'text-cyan-400' : isCompleted ? 'text-emerald-400' : 'text-white/40'
                  }`}>
                    Étape {step.id}
                  </div>
                  <div className={`text-xs font-inter ${
                    isActive || isCompleted ? 'text-white' : 'text-white/30'
                  }`}>
                    {step.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
