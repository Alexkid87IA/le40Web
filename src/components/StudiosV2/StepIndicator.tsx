import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Step {
  number: number;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <motion.div
              initial={false}
              animate={{
                scale: currentStep === step.number ? 1.1 : 1,
                backgroundColor: currentStep > step.number ? '#8b5cf6' : currentStep === step.number ? '#8b5cf6' : '#1e293b'
              }}
              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                currentStep >= step.number ? 'border-violet-500' : 'border-slate-700'
              }`}
            >
              {currentStep > step.number ? (
                <Check className="w-6 h-6 text-white" />
              ) : (
                <span className={`text-lg font-bold ${
                  currentStep >= step.number ? 'text-white' : 'text-slate-500'
                }`}>
                  {step.number}
                </span>
              )}
            </motion.div>
            <span className={`mt-2 text-sm font-medium ${
              currentStep >= step.number ? 'text-white' : 'text-slate-500'
            }`}>
              {step.label}
            </span>
          </div>

          {index < steps.length - 1 && (
            <div className="w-24 h-0.5 mx-4 mb-6">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: currentStep > step.number ? 1 : 0,
                  backgroundColor: currentStep > step.number ? '#8b5cf6' : '#1e293b'
                }}
                transition={{ duration: 0.3 }}
                className="h-full origin-left"
                style={{ backgroundColor: currentStep > step.number ? '#8b5cf6' : '#1e293b' }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
