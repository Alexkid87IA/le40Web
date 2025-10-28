/**
 * Design System Complet - Le 40 Domiciliation
 * Système unifié de composants et tokens pour maintenir la cohérence visuelle
 */

// ============================================================================
// BUTTONS - Styles de boutons standardisés
// ============================================================================

export const buttons = {
  // Bouton principal (CTA primaire)
  primary: {
    base: 'px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl font-montserrat transition-all duration-300',
    hover: 'hover:from-orange-600 hover:to-orange-700 hover:shadow-lg hover:shadow-orange-500/40 hover:scale-105',
    focus: 'focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:ring-offset-2 focus:ring-offset-black',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
    full: 'px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl font-montserrat transition-all duration-300 hover:from-orange-600 hover:to-orange-700 hover:shadow-lg hover:shadow-orange-500/40 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400/50 disabled:opacity-50 disabled:cursor-not-allowed'
  },

  // Bouton secondaire (moins d'emphasis)
  secondary: {
    base: 'px-10 py-5 backdrop-blur-xl bg-white/[0.04] text-white rounded-xl border border-white/[0.12] font-bold font-montserrat transition-all duration-300',
    hover: 'hover:bg-white/[0.08] hover:border-white/[0.16]',
    focus: 'focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
    full: 'px-10 py-5 backdrop-blur-xl bg-white/[0.04] text-white rounded-xl border border-white/[0.12] font-bold font-montserrat transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.16] focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50 disabled:cursor-not-allowed'
  },

  // Bouton tertiaire (minimal)
  tertiary: {
    base: 'px-6 py-3 text-white font-semibold font-montserrat transition-all duration-300',
    hover: 'hover:text-orange-400',
    focus: 'focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:rounded-lg',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
    full: 'px-6 py-3 text-white font-semibold font-montserrat transition-all duration-300 hover:text-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:rounded-lg disabled:opacity-50 disabled:cursor-not-allowed'
  },

  // Tailles
  sizes: {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-10 py-5 text-base',
    xl: 'px-12 py-6 text-lg'
  }
} as const;

// ============================================================================
// INPUTS - Styles d'inputs standardisés
// ============================================================================

export const inputs = {
  // Input standard
  base: 'px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 backdrop-blur-sm font-inter transition-all duration-300',
  focus: 'focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50',
  disabled: 'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white/5',
  error: 'border-red-400 focus:border-red-400 focus:ring-red-400/50',

  // Input full (toutes les classes combinées)
  full: 'px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 backdrop-blur-sm font-inter transition-all duration-300 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/50 disabled:opacity-50 disabled:cursor-not-allowed',

  // Input large (pour search, etc.)
  large: 'px-5 py-5 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-xl border border-white/[0.08] text-white placeholder-white/60 font-inter transition-all duration-300 focus:outline-none focus:border-orange-400/50 focus:ring-2 focus:ring-orange-400/50',

  // Tailles
  sizes: {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-5 text-base'
  }
} as const;

// ============================================================================
// CARDS - Styles de cartes standardisés
// ============================================================================

export const cards = {
  // Carte premium (pour contenus importants)
  premium: {
    base: 'rounded-3xl border border-white/20 backdrop-blur-2xl p-8 lg:p-10',
    bg: 'bg-gradient-to-br from-zinc-900/90 to-zinc-950/90',
    hover: 'hover:border-orange-400/30 transition-all duration-500',
    full: 'rounded-3xl border border-white/20 backdrop-blur-2xl p-8 lg:p-10 bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 hover:border-orange-400/30 transition-all duration-500'
  },

  // Carte standard (usage général)
  standard: {
    base: 'rounded-2xl border border-white/[0.08] backdrop-blur-xl p-8 lg:p-10',
    bg: 'bg-gradient-to-br from-zinc-900/80 to-zinc-950/80',
    hover: 'hover:border-white/[0.15] transition-all duration-300',
    full: 'rounded-2xl border border-white/[0.08] backdrop-blur-xl p-8 lg:p-10 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 hover:border-white/[0.15] transition-all duration-300'
  },

  // Carte minimale (backgrounds subtils)
  minimal: {
    base: 'rounded-2xl border border-white/5 backdrop-blur-sm p-6 lg:p-8',
    bg: 'bg-white/[0.03]',
    hover: 'hover:bg-white/[0.05] transition-all duration-300',
    full: 'rounded-2xl border border-white/5 backdrop-blur-sm p-6 lg:p-8 bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-300'
  },

  // Glow effect (pour hover states)
  glow: {
    wrapper: 'relative group',
    effect: 'absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500',
    blur: 'absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 bg-orange-500/20'
  }
} as const;

// ============================================================================
// SPACING - Espacements standardisés
// ============================================================================

export const spacing = {
  // Padding de section (vertical)
  section: {
    mobile: 'py-20',
    tablet: 'py-24',
    desktop: 'py-32',
    responsive: 'py-20 md:py-24 lg:py-32'
  },

  // Padding de container (horizontal)
  container: {
    mobile: 'px-6',
    tablet: 'px-8',
    desktop: 'px-12',
    large: 'px-16',
    responsive: 'px-6 sm:px-8 lg:px-12',
    responsiveLarge: 'px-6 sm:px-8 lg:px-16'
  },

  // Grid gaps
  grid: {
    sm: 'gap-4 md:gap-6',
    md: 'gap-6 md:gap-8 lg:gap-10',
    lg: 'gap-8 md:gap-10 lg:gap-12',
    xl: 'gap-8 md:gap-12 lg:gap-16'
  },

  // Card padding
  card: {
    sm: 'p-4 lg:p-6',
    md: 'p-6 lg:p-8',
    lg: 'p-8 lg:p-10'
  }
} as const;

// ============================================================================
// TYPOGRAPHY - Typographie responsive
// ============================================================================

export const typography = {
  // Headings
  h1: {
    size: 'text-6xl sm:text-7xl md:text-8xl lg:text-9xl',
    weight: 'font-black',
    family: 'font-montserrat',
    leading: 'leading-[0.9]',
    tracking: 'tracking-tight',
    full: 'text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-montserrat leading-[0.9] tracking-tight'
  },

  h2: {
    size: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
    weight: 'font-black',
    family: 'font-montserrat',
    leading: 'leading-tight',
    tracking: 'tracking-tight',
    full: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-montserrat leading-tight tracking-tight'
  },

  h3: {
    size: 'text-2xl sm:text-3xl md:text-4xl',
    weight: 'font-bold',
    family: 'font-montserrat',
    leading: 'leading-tight',
    full: 'text-2xl sm:text-3xl md:text-4xl font-bold font-montserrat leading-tight'
  },

  h4: {
    size: 'text-xl sm:text-2xl',
    weight: 'font-bold',
    family: 'font-montserrat',
    leading: 'leading-snug',
    full: 'text-xl sm:text-2xl font-bold font-montserrat leading-snug'
  },

  // Body text
  body: {
    base: 'text-base sm:text-lg font-inter leading-relaxed text-white/80',
    sm: 'text-sm font-inter leading-relaxed text-white/70',
    lg: 'text-lg sm:text-xl font-inter leading-relaxed text-white/80'
  },

  // Labels et captions
  label: 'text-sm font-semibold font-montserrat tracking-wide uppercase',
  caption: 'text-xs font-inter text-white/60'
} as const;

// ============================================================================
// COLORS - Palette de couleurs
// ============================================================================

export const colors = {
  // Couleurs primaires
  primary: {
    DEFAULT: 'text-orange-500',
    light: 'text-orange-400',
    dark: 'text-orange-600',
    bg: 'bg-orange-500',
    bgLight: 'bg-orange-400',
    bgDark: 'bg-orange-600',
    border: 'border-orange-500'
  },

  // Couleurs d'accent
  accent: {
    DEFAULT: 'text-amber-500',
    light: 'text-amber-400',
    dark: 'text-amber-600'
  },

  // Couleurs de feedback
  success: {
    text: 'text-green-400',
    bg: 'bg-green-500/20',
    border: 'border-green-400/40'
  },

  error: {
    text: 'text-red-400',
    bg: 'bg-red-500/20',
    border: 'border-red-400/40'
  },

  warning: {
    text: 'text-yellow-400',
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-400/40'
  },

  info: {
    text: 'text-blue-400',
    bg: 'bg-blue-500/20',
    border: 'border-blue-400/40'
  },

  // Text colors (dark theme)
  text: {
    primary: 'text-white',
    secondary: 'text-white/80',
    tertiary: 'text-white/60',
    muted: 'text-white/60',
    disabled: 'text-white/60'
  }
} as const;

// ============================================================================
// GRADIENTS - Gradients réutilisables
// ============================================================================

export const gradients = {
  // Gradients de boutons
  primary: 'bg-gradient-to-r from-orange-500 to-orange-600',
  primaryHover: 'from-orange-600 to-orange-700',
  accent: 'bg-gradient-to-r from-amber-600 to-orange-600',
  accentHover: 'from-amber-500 to-orange-500',

  // Gradients de fond
  dark: 'bg-gradient-to-b from-black via-zinc-950 to-black',
  darkSlate: 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950',
  darkZinc: 'bg-gradient-to-b from-zinc-900 to-black',

  // Gradients de texte
  text: 'bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent',
  textAlt: 'bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent',

  // Gradients de carte
  card: 'bg-gradient-to-br from-zinc-900/80 to-zinc-950/80',
  cardPremium: 'bg-gradient-to-br from-zinc-900/90 to-zinc-950/90'
} as const;

// ============================================================================
// EFFECTS - Effets visuels
// ============================================================================

export const effects = {
  // Backdrop blur
  blur: {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
    '2xl': 'backdrop-blur-2xl'
  },

  // Shadows
  shadow: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
    glow: 'shadow-lg shadow-orange-500/25',
    glowStrong: 'shadow-2xl shadow-orange-500/50'
  },

  // Border radius
  radius: {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-3xl',
    full: 'rounded-full'
  }
} as const;

// ============================================================================
// ANIMATIONS - Durées et easings
// ============================================================================

export const animations = {
  duration: {
    fast: 'duration-300',
    normal: 'duration-500',
    slow: 'duration-700'
  },

  ease: {
    default: 'ease-in-out',
    in: 'ease-in',
    out: 'ease-out',
    custom: [0.16, 1, 0.3, 1] // Pour Framer Motion
  },

  transition: {
    fast: 'transition-all duration-300',
    normal: 'transition-all duration-500',
    slow: 'transition-all duration-700'
  }
} as const;

// ============================================================================
// HELPER FUNCTIONS - Fonctions utilitaires
// ============================================================================

/**
 * Combine plusieurs classes du design system
 */
export const combine = (...classes: string[]) => classes.filter(Boolean).join(' ');

/**
 * Obtient toutes les classes d'un bouton
 */
export const getButtonClasses = (variant: 'primary' | 'secondary' | 'tertiary' = 'primary') => {
  return buttons[variant].full;
};

/**
 * Obtient toutes les classes d'un input
 */
export const getInputClasses = (hasError = false) => {
  return hasError ? `${inputs.full} ${inputs.error}` : inputs.full;
};

/**
 * Obtient toutes les classes d'une carte
 */
export const getCardClasses = (variant: 'premium' | 'standard' | 'minimal' = 'standard') => {
  return cards[variant].full;
};
