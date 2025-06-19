/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
      colors: {
        // Base colors
        'black-deep': '#0A0A0A',
        'black-nuanced': '#0F0F0F',
        'white-soft': '#F5F5F5',
        
        // Thematic colors
        'coworking': '#4299E1',
        'domiciliation': '#ED8936',
        'salles': '#4A5568',
        'studios': '#9F7AEA',
        'community': '#48BB78',
        'blog': '#38B2AC',
        
        // Gradient colors
        'violet': {
          400: '#8B5CF6',
          500: '#7C3AED',
        },
        'fuchsia': {
          400: '#EC4899',
          500: '#DB2777',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
        'gradient-primary-hover': 'linear-gradient(135deg, #7C3AED 0%, #DB2777 100%)',
        'gradient-coworking': 'linear-gradient(135deg, #4299E1 0%, #3182CE 100%)',
        'gradient-domiciliation': 'linear-gradient(135deg, #ED8936 0%, #DD6B20 100%)',
        'gradient-studios': 'linear-gradient(135deg, #9F7AEA 0%, #805AD5 100%)',
      },
      animation: {
        'ken-burns': 'ken-burns 25s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'film-grain': 'film-grain 2s ease-in-out infinite alternate',
      },
      backdropBlur: {
        'glass': '20px',
      },
      boxShadow: {
        'glow': '0 0 30px rgba(139, 92, 246, 0.3), 0 0 60px rgba(236, 72, 153, 0.2)',
        'glow-coworking': '0 0 30px rgba(66, 153, 225, 0.4)',
        'glow-domiciliation': '0 0 30px rgba(237, 137, 54, 0.4)',
        'glow-studios': '0 0 30px rgba(159, 122, 234, 0.4)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
};