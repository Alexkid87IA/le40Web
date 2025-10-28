/**
 * Constantes de design réutilisables
 * Évite la duplication des gradients, couleurs et styles
 */

// Gradients communs
export const gradients = {
  // Gradients principaux (orange/amber)
  primary: 'from-orange-500 to-orange-600',
  primaryHover: 'from-orange-500 to-orange-500',
  primaryGlow: 'from-orange-500/20 via-orange-500/10 to-orange-500/20',

  // Gradients d'accentuation
  accent: 'from-amber-600 to-orange-600',
  accentHover: 'from-amber-500 to-orange-500',

  // Gradients de fond
  backgroundDark: 'from-black via-zinc-950 to-black',
  backgroundSlate: 'from-slate-950 via-slate-900 to-slate-950',
  backgroundOrange: 'from-orange-600/10 via-orange-500/5 to-transparent',

  // Gradients de texte
  textGradient: 'from-amber-400 via-orange-400 to-red-400',
  textGradientAlt: 'from-orange-400 to-orange-600',

  // Gradients de carte
  cardBg: 'from-zinc-900/80 to-zinc-950/80',
  cardBorder: 'from-white/10 via-white/5 to-white/10'
} as const;

// Classes de gradient complètes (avec bg-gradient-to-r)
export const gradientClasses = {
  primaryButton: 'bg-gradient-to-r from-orange-500 to-orange-600',
  primaryButtonHover: 'hover:from-orange-500 hover:to-orange-500',
  accentButton: 'bg-gradient-to-r from-amber-600 to-orange-600',
  accentButtonHover: 'hover:from-amber-500 hover:to-orange-500',
  textGradient: 'bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent'
} as const;

// Couleurs
export const colors = {
  // Couleurs principales
  primary: {
    DEFAULT: '#F97316', // orange-500
    light: '#FB923C', // orange-400
    dark: '#EA580C', // orange-600
    glow: 'rgba(249, 115, 22, 0.3)'
  },
  accent: {
    DEFAULT: '#F59E0B', // amber-500
    light: '#FCD34D', // amber-400
    dark: '#D97706', // amber-600
    glow: 'rgba(245, 158, 11, 0.3)'
  },
  // Couleurs de fond
  background: {
    black: '#000000',
    zinc: '#18181B', // zinc-900
    slate: '#0F172A' // slate-900
  }
} as const;

// Bordures
export const borders = {
  subtle: 'border-white/10',
  medium: 'border-white/20',
  focus: 'border-orange-400',
  focusRing: 'focus:ring-2 focus:ring-orange-400/50'
} as const;

// Ombres
export const shadows = {
  glow: 'shadow-lg shadow-orange-500/25',
  glowStrong: 'shadow-2xl shadow-orange-500/50',
  card: 'shadow-xl shadow-black/50'
} as const;

// Backdrop blur
export const backdropBlur = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
  xl: 'backdrop-blur-xl'
} as const;

// Patterns de fond (styles inline)
export const backgroundPatterns = {
  dots: (size = 48) => ({
    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
    backgroundSize: `${size}px ${size}px`
  }),
  grid: (size = 48) => ({
    backgroundImage: `
      linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
    `,
    backgroundSize: `${size}px ${size}px`
  })
} as const;

// Classes complètes pour les composants
export const componentClasses = {
  // Cartes
  card: 'bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl',
  cardHover: 'hover:border-orange-400/30 transition-all duration-300',

  // Inputs
  input: 'bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50 backdrop-blur-sm',

  // Boutons
  buttonPrimary: 'bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold hover:scale-105 transition-transform',
  buttonSecondary: 'border border-orange-500/30 text-orange-300 hover:bg-orange-500/10 transition-colors',

  // Sections
  sectionDark: 'relative bg-gradient-to-b from-black via-zinc-950 to-black',
  sectionSlate: 'relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
} as const;

/**
 * Helper pour créer un style de blur orb animé
 */
export const createBlurOrb = (color: string, size = 96, blur = 120, opacity = 0.12) => ({
  className: `absolute w-${size} h-${size} rounded-full blur-[${blur}px]`,
  style: {
    backgroundColor: color,
    opacity
  }
});
