/**
 * Validation utilities - Centralized validation patterns and functions
 * Used across all form modals and input validation
 */

// ============================================================
// REGEX PATTERNS
// ============================================================

export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_FR: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
  POSTAL_CODE_FR: /^[0-9]{5}$/,
  SIRET: /^[0-9]{14}$/,
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
} as const;

// ============================================================
// VALIDATION FUNCTIONS
// ============================================================

export const validators = {
  /**
   * Validates an email address
   */
  email: (value: string): boolean => {
    return PATTERNS.EMAIL.test(value.trim());
  },

  /**
   * Validates a French phone number
   */
  phoneFR: (value: string): boolean => {
    return PATTERNS.PHONE_FR.test(value.trim());
  },

  /**
   * Validates a French postal code
   */
  postalCodeFR: (value: string): boolean => {
    return PATTERNS.POSTAL_CODE_FR.test(value.trim());
  },

  /**
   * Validates a SIRET number
   */
  siret: (value: string): boolean => {
    return PATTERNS.SIRET.test(value.replace(/\s/g, ''));
  },

  /**
   * Validates that a string is not empty
   */
  required: (value: string): boolean => {
    return value.trim().length > 0;
  },

  /**
   * Validates minimum length
   */
  minLength: (value: string, min: number): boolean => {
    return value.trim().length >= min;
  },

  /**
   * Validates maximum length
   */
  maxLength: (value: string, max: number): boolean => {
    return value.trim().length <= max;
  },

  /**
   * Validates a URL
   */
  url: (value: string): boolean => {
    if (!value.trim()) return true; // Optional by default
    return PATTERNS.URL.test(value.trim());
  },
};

// ============================================================
// ERROR MESSAGES
// ============================================================

export const ERROR_MESSAGES = {
  required: 'Ce champ est requis',
  email: 'Adresse email invalide',
  phone: 'Numéro de téléphone invalide',
  postalCode: 'Code postal invalide',
  siret: 'Numéro SIRET invalide (14 chiffres)',
  url: 'URL invalide',
  minLength: (min: number) => `Minimum ${min} caractères requis`,
  maxLength: (max: number) => `Maximum ${max} caractères autorisés`,
} as const;

// ============================================================
// FORM VALIDATION HELPER
// ============================================================

export interface ValidationRule {
  validator: (value: string) => boolean;
  message: string;
}

export interface FieldValidation {
  [fieldName: string]: ValidationRule[];
}

/**
 * Validates form data against a set of rules
 * Returns an object with field names as keys and error messages as values
 */
export function validateForm<T extends Record<string, string>>(
  data: T,
  rules: FieldValidation
): Record<string, string> {
  const errors: Record<string, string> = {};

  Object.keys(rules).forEach((fieldName) => {
    const fieldRules = rules[fieldName];
    const value = data[fieldName] || '';

    for (const rule of fieldRules) {
      if (!rule.validator(value)) {
        errors[fieldName] = rule.message;
        break; // Stop at first error for this field
      }
    }
  });

  return errors;
}

/**
 * Common validation rule sets for reuse
 */
export const commonRules = {
  requiredEmail: [
    { validator: validators.required, message: ERROR_MESSAGES.required },
    { validator: validators.email, message: ERROR_MESSAGES.email },
  ],
  requiredPhone: [
    { validator: validators.required, message: ERROR_MESSAGES.required },
    { validator: validators.phoneFR, message: ERROR_MESSAGES.phone },
  ],
  requiredText: [
    { validator: validators.required, message: ERROR_MESSAGES.required },
  ],
  optionalEmail: [
    { validator: (v: string) => !v.trim() || validators.email(v), message: ERROR_MESSAGES.email },
  ],
  optionalPhone: [
    { validator: (v: string) => !v.trim() || validators.phoneFR(v), message: ERROR_MESSAGES.phone },
  ],
};
