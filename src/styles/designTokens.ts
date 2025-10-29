export const designTokens = {
  colors: {
    background: {
      primary: '#0A0A0A',
      secondary: '#0F0F0F',
      tertiary: '#1A1A1A',
    },

    brand: {
      primary: '#F59E0B',
      secondary: '#06B6D4',
      accent: '#10B981',
      gradient: 'from-orange-500 via-amber-500 to-yellow-500',
      gradientAlt: 'from-cyan-500 via-blue-500 to-teal-500',
      gradientAccent: 'from-emerald-500 via-teal-500 to-cyan-500',
      shadow: 'rgba(245, 158, 11, 0.3)',
    },

    neutral: {
      white: '#FFFFFF',
      gray: {
        50: '#FAFAFA',
        100: '#F5F5F5',
        200: '#E5E5E5',
        300: '#D4D4D4',
        400: '#A3A3A3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
      },
      gradient: 'from-white via-zinc-100 to-zinc-200',
      gradientDark: 'from-zinc-800 via-zinc-900 to-black',
      shadow: 'rgba(255, 255, 255, 0.1)',
      glow: 'rgba(255, 255, 255, 0.05)',
    },

    palette: {
      primary: {
        light: '#FBBF24',
        main: '#F59E0B',
        dark: '#D97706',
        gradient: 'from-orange-500 via-amber-500 to-yellow-500',
        shadow: 'rgba(245, 158, 11, 0.3)',
        glow: 'rgba(245, 158, 11, 0.15)',
      },
      secondary: {
        light: '#22D3EE',
        main: '#06B6D4',
        dark: '#0891B2',
        gradient: 'from-cyan-500 via-blue-500 to-teal-500',
        shadow: 'rgba(6, 182, 212, 0.3)',
        glow: 'rgba(6, 182, 212, 0.15)',
      },
      accent: {
        light: '#34D399',
        main: '#10B981',
        dark: '#059669',
        gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
        shadow: 'rgba(16, 185, 129, 0.3)',
        glow: 'rgba(16, 185, 129, 0.15)',
      },
    },

    services: {
      coworking: {
        primary: '#06B6D4',
        gradient: 'from-cyan-500 via-blue-500 to-teal-500',
        shadow: 'rgba(6, 182, 212, 0.3)',
      },
      domiciliation: {
        primary: '#F59E0B',
        gradient: 'from-orange-500 via-amber-500 to-yellow-500',
        shadow: 'rgba(245, 158, 11, 0.3)',
      },
      salles: {
        primary: '#F59E0B',
        gradient: 'from-orange-500 via-amber-500 to-yellow-500',
        shadow: 'rgba(245, 158, 11, 0.3)',
      },
      studios: {
        primary: '#10B981',
        gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
        shadow: 'rgba(16, 185, 129, 0.3)',
      },
      community: {
        primary: '#06B6D4',
        gradient: 'from-cyan-500 via-blue-500 to-teal-500',
        shadow: 'rgba(6, 182, 212, 0.3)',
      },
    },
  },

  typography: {
    h1: {
      size: 'text-6xl sm:text-7xl md:text-8xl lg:text-9xl',
      weight: 'font-black',
      leading: 'leading-[0.9]',
      tracking: 'tracking-[-0.04em]',
    },
    h2: {
      size: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
      weight: 'font-black',
      leading: 'leading-tight',
      tracking: 'tracking-[-0.02em]',
    },
    h3: {
      size: 'text-3xl sm:text-4xl md:text-5xl',
      weight: 'font-bold',
      leading: 'leading-tight',
      tracking: 'tracking-tight',
    },
    h4: {
      size: 'text-2xl sm:text-3xl',
      weight: 'font-bold',
      leading: 'leading-snug',
    },
    body: {
      size: 'text-base sm:text-lg',
      weight: 'font-normal',
      leading: 'leading-relaxed',
    },
    bodySmall: {
      size: 'text-sm sm:text-base',
      weight: 'font-normal',
      leading: 'leading-relaxed',
    },
  },

  spacing: {
    section: 'py-32',
    sectionSmall: 'py-24',
    container: 'px-6 sm:px-8 lg:px-12',
    containerLarge: 'px-6 sm:px-8 lg:px-16',
    gap: {
      xs: 'gap-2',
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12',
      xxl: 'gap-16',
    },
  },

  buttons: {
    size: {
      sm: 'px-6 py-3 text-sm',
      md: 'px-8 py-4 text-base',
      lg: 'px-10 py-5 text-lg',
    },
    radius: {
      base: 'rounded-xl',
      large: 'rounded-2xl',
    },
  },

  cards: {
    radius: {
      base: 'rounded-2xl',
      large: 'rounded-3xl',
    },
    background: 'bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl',
    border: 'border border-white/10',
  },

  animations: {
    hover: {
      scale: {
        small: 'hover:scale-[1.02]',
        medium: 'hover:scale-105',
        large: 'hover:scale-110',
      },
      y: {
        small: 'hover:-translate-y-1',
        medium: 'hover:-translate-y-2',
        large: 'hover:-translate-y-4',
      },
    },
    transition: {
      fast: 'transition-all duration-300',
      normal: 'transition-all duration-500',
      slow: 'transition-all duration-700',
    },
  },

  shadows: {
    glow: {
      small: 'shadow-lg',
      medium: 'shadow-xl',
      large: 'shadow-2xl',
    },
  },
} as const;

export type DesignTokens = typeof designTokens;
