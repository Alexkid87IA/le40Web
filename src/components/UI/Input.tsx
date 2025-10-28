import { forwardRef, InputHTMLAttributes } from 'react';
import { inputs } from '../../utils/designSystem';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Label du champ (optionnel, sr-only si non affiché)
   */
  label?: string;
  /**
   * Afficher le label visuellement (par défaut caché pour accessibilité)
   */
  showLabel?: boolean;
  /**
   * Message d'erreur à afficher
   */
  error?: string;
  /**
   * Taille de l'input
   */
  inputSize?: 'sm' | 'md' | 'lg';
  /**
   * Variant de l'input
   */
  variant?: 'default' | 'large';
  /**
   * Classe CSS personnalisée additionnelle
   */
  className?: string;
}

/**
 * Composant Input réutilisable avec styles du design system
 * Supporte l'accessibilité complète (labels, aria, erreurs)
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      showLabel = false,
      error,
      inputSize = 'md',
      variant = 'default',
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    // Générer un ID unique si non fourni
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    // Choisir les classes de base selon le variant
    const baseClasses = variant === 'large' ? inputs.large : inputs.full;

    // Ajouter la classe de taille si différente de 'md' (déjà inclus dans base)
    const sizeClass = inputSize !== 'md' ? inputs.sizes[inputSize] : '';

    // Ajouter la classe d'erreur si nécessaire
    const errorClass = error ? inputs.error : '';

    // Combiner toutes les classes
    const finalClasses = [baseClasses, sizeClass, errorClass, className]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={showLabel ? 'block text-sm font-semibold text-white mb-2' : 'sr-only'}
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          className={finalClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />

        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-2 text-sm text-red-400"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
