import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Check } from 'lucide-react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

interface BaseFieldProps {
  label: string;
  error?: string;
  success?: boolean;
  hint?: string;
  required?: boolean;
}

interface FormInputProps extends BaseFieldProps, Omit<InputProps, 'className'> {
  type?: 'text' | 'email' | 'tel' | 'password' | 'number' | 'date' | 'time' | 'url';
}

interface FormTextareaProps extends BaseFieldProps, Omit<TextareaProps, 'className'> {
  rows?: number;
}

interface FormSelectProps extends BaseFieldProps, Omit<SelectProps, 'className'> {
  children: ReactNode;
}

const baseInputStyles = `
  w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder:text-white/40
  transition-all duration-200
  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black
`;

const getInputStyles = (error?: string, success?: boolean) => {
  if (error) {
    return `${baseInputStyles} border-red-500/50 focus:border-red-500 focus:ring-red-500/30`;
  }
  if (success) {
    return `${baseInputStyles} border-emerald-500/50 focus:border-emerald-500 focus:ring-emerald-500/30`;
  }
  return `${baseInputStyles} border-white/10 hover:border-white/20 focus:border-orange-500 focus:ring-orange-500/30`;
};

/**
 * Accessible form input with label, error, and success states
 */
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, success, hint, required, id, ...props }, ref) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-white/80"
        >
          {label}
          {required && <span className="text-red-400 ml-1" aria-hidden="true">*</span>}
        </label>

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={getInputStyles(error, success)}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? errorId : hint ? hintId : undefined}
            aria-required={required}
            {...props}
          />

          <AnimatePresence>
            {(error || success) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {error ? (
                  <AlertCircle className="w-5 h-5 text-red-400" aria-hidden="true" />
                ) : (
                  <Check className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              id={errorId}
              role="alert"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-red-400 flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4" aria-hidden="true" />
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {hint && !error && (
          <p id={hintId} className="text-sm text-white/50">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

/**
 * Accessible textarea with label, error, and success states
 */
export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, success, hint, required, id, rows = 4, ...props }, ref) => {
    const textareaId = id || `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`;
    const errorId = `${textareaId}-error`;
    const hintId = `${textareaId}-hint`;

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-white/80"
        >
          {label}
          {required && <span className="text-red-400 ml-1" aria-hidden="true">*</span>}
        </label>

        <div className="relative">
          <textarea
            ref={ref}
            id={textareaId}
            rows={rows}
            className={`${getInputStyles(error, success)} resize-none`}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? errorId : hint ? hintId : undefined}
            aria-required={required}
            {...props}
          />
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              id={errorId}
              role="alert"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-red-400 flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4" aria-hidden="true" />
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {hint && !error && (
          <p id={hintId} className="text-sm text-white/50">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';

/**
 * Accessible select with label, error, and success states
 */
export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, success, hint, required, id, children, ...props }, ref) => {
    const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;
    const errorId = `${selectId}-error`;
    const hintId = `${selectId}-hint`;

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-white/80"
        >
          {label}
          {required && <span className="text-red-400 ml-1" aria-hidden="true">*</span>}
        </label>

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={`${getInputStyles(error, success)} appearance-none cursor-pointer pr-10`}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? errorId : hint ? hintId : undefined}
            aria-required={required}
            {...props}
          >
            {children}
          </select>

          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              id={errorId}
              role="alert"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-red-400 flex items-center gap-1"
            >
              <AlertCircle className="w-4 h-4" aria-hidden="true" />
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {hint && !error && (
          <p id={hintId} className="text-sm text-white/50">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';

/**
 * Form validation utilities
 */
export const validators = {
  required: (value: string) => value.trim() ? undefined : 'Ce champ est requis',

  email: (value: string) => {
    if (!value) return undefined;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? undefined : 'Email invalide';
  },

  phone: (value: string) => {
    if (!value) return undefined;
    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return phoneRegex.test(value.replace(/\s/g, '')) ? undefined : 'Numéro de téléphone invalide';
  },

  minLength: (min: number) => (value: string) => {
    if (!value) return undefined;
    return value.length >= min ? undefined : `Minimum ${min} caractères`;
  },

  maxLength: (max: number) => (value: string) => {
    if (!value) return undefined;
    return value.length <= max ? undefined : `Maximum ${max} caractères`;
  },
};

export default FormInput;
