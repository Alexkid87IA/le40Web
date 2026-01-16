/**
 * useFormModal - Reusable hook for modal forms
 * Replaces duplicated form state logic across ClubApplicationModal,
 * DomiciliationModal, VisitModal, and other form modals
 */

import { useState, useCallback, useMemo } from 'react';
import { validateForm, type FieldValidation } from '../utils/validation';
import type { FormStatus, FormErrors } from '../types';

// ============================================================
// TYPES
// ============================================================

export interface UseFormModalOptions<T extends Record<string, string>> {
  /** Initial form data */
  initialData: T;
  /** Validation rules for each field */
  validationRules?: FieldValidation;
  /** Async submit handler */
  onSubmit: (data: T) => Promise<void>;
  /** Callback when modal closes */
  onClose?: () => void;
  /** Auto-reset form after successful submission */
  resetOnSuccess?: boolean;
  /** Delay before auto-closing after success (ms) */
  successCloseDelay?: number;
}

export interface UseFormModalReturn<T extends Record<string, string>> {
  /** Current form data */
  formData: T;
  /** Form errors by field name */
  errors: FormErrors;
  /** Current form status */
  status: FormStatus;
  /** Whether form is currently submitting */
  isSubmitting: boolean;
  /** Whether form was successfully submitted */
  isSuccess: boolean;
  /** Whether form submission failed */
  isError: boolean;
  /** Error message if submission failed */
  errorMessage: string | null;
  /** Update a single field */
  setField: (name: keyof T, value: string) => void;
  /** Update multiple fields at once */
  setFields: (fields: Partial<T>) => void;
  /** Handle input change event */
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  /** Validate all fields and return whether valid */
  validate: () => boolean;
  /** Submit the form */
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  /** Reset form to initial state */
  reset: () => void;
  /** Clear all errors */
  clearErrors: () => void;
  /** Set a specific field error */
  setFieldError: (name: keyof T, message: string) => void;
}

// ============================================================
// HOOK IMPLEMENTATION
// ============================================================

export function useFormModal<T extends Record<string, string>>(
  options: UseFormModalOptions<T>
): UseFormModalReturn<T> {
  const {
    initialData,
    validationRules = {},
    onSubmit,
    onClose,
    resetOnSuccess = false,
    successCloseDelay = 2000,
  } = options;

  // State
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Derived state
  const isSubmitting = status === 'submitting';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  // Update a single field
  const setField = useCallback((name: keyof T, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when field is modified
    if (errors[name as string]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as string];
        return newErrors;
      });
    }
  }, [errors]);

  // Update multiple fields at once
  const setFields = useCallback((fields: Partial<T>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  }, []);

  // Handle input change event
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setField(name as keyof T, value);
  }, [setField]);

  // Validate all fields
  const validate = useCallback((): boolean => {
    const validationErrors = validateForm(formData, validationRules);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  }, [formData, validationRules]);

  // Reset form to initial state
  const reset = useCallback(() => {
    setFormData(initialData);
    setErrors({});
    setStatus('idle');
    setErrorMessage(null);
  }, [initialData]);

  // Clear all errors
  const clearErrors = useCallback(() => {
    setErrors({});
    setErrorMessage(null);
  }, []);

  // Set a specific field error
  const setFieldError = useCallback((name: keyof T, message: string) => {
    setErrors((prev) => ({ ...prev, [name]: message }));
  }, []);

  // Submit the form
  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    // Validate before submitting
    if (!validate()) {
      return;
    }

    setStatus('submitting');
    setErrorMessage(null);

    try {
      await onSubmit(formData);
      setStatus('success');

      // Auto-reset if configured
      if (resetOnSuccess) {
        setTimeout(() => {
          reset();
          onClose?.();
        }, successCloseDelay);
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Une erreur est survenue. Veuillez réessayer.'
      );
    }
  }, [formData, validate, onSubmit, resetOnSuccess, successCloseDelay, reset, onClose]);

  return {
    formData,
    errors,
    status,
    isSubmitting,
    isSuccess,
    isError,
    errorMessage,
    setField,
    setFields,
    handleChange,
    validate,
    handleSubmit,
    reset,
    clearErrors,
    setFieldError,
  };
}

// ============================================================
// HELPER COMPONENTS
// ============================================================

/**
 * Get input className based on error state
 */
export function getInputClassName(hasError: boolean, baseClass: string = ''): string {
  const errorClass = hasError
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
    : 'border-white/20 focus:border-emerald-500';

  return `${baseClass} ${errorClass}`.trim();
}

/**
 * Standard input styles for forms
 */
export const inputStyles = {
  base: 'w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all',
  error: 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
  valid: 'border-white/20 focus:border-emerald-500 focus:ring-emerald-500/20',
};

export default useFormModal;
