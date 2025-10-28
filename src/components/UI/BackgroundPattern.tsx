import { memo } from 'react';

interface BackgroundPatternProps {
  /**
   * Type de pattern de fond
   * - 'dots': Points réguliers
   * - 'grid': Grille
   * - 'noise': Texture bruit
   */
  variant?: 'dots' | 'grid' | 'noise';
  /**
   * Opacité du pattern (0-1)
   */
  opacity?: number;
  /**
   * Taille du pattern en pixels
   */
  size?: number;
  /**
   * Classe CSS personnalisée
   */
  className?: string;
}

/**
 * Composant réutilisable pour les patterns de fond
 * Mémoïsé pour éviter les re-renders inutiles
 */
const BackgroundPattern = memo<BackgroundPatternProps>(({
  variant = 'dots',
  opacity = 0.015,
  size = 48,
  className = ''
}) => {
  const getPatternStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'dots':
        return {
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: `${size}px ${size}px`
        };
      case 'grid':
        return {
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: `${size}px ${size}px`
        };
      case 'noise':
        return {};
      default:
        return {};
    }
  };

  if (variant === 'noise') {
    return (
      <div className={`absolute inset-0 mix-blend-overlay pointer-events-none ${className}`} style={{ opacity }}>
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        opacity,
        ...getPatternStyle()
      }}
      aria-hidden="true"
    />
  );
});

BackgroundPattern.displayName = 'BackgroundPattern';

export default BackgroundPattern;
