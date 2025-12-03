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
        'black-deep': '#0A0A0A',
        'black-nuanced': '#0F0F0F',
        'white-soft': '#F5F5F5',

        'brand': {
          orange: '#F59E0B',
          cyan: '#06B6D4',
          emerald: '#10B981',
        },

        'coworking': '#06B6D4',
        'domiciliation': '#F59E0B',
        'salles': '#F59E0B',
        'studios': '#10B981',
        'community': '#06B6D4',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #F59E0B 0%, #EAB308 100%)',
        'gradient-brand-alt': 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
        'gradient-coworking': 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
        'gradient-domiciliation': 'linear-gradient(135deg, #F59E0B 0%, #EAB308 100%)',
        'gradient-studios': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      },
      animation: {
        'ken-burns': 'ken-burns 25s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'gradient': 'gradient 4s ease infinite',
        'film-grain': 'film-grain 2s ease-in-out infinite alternate',
      },
      backdropBlur: {
        'glass': '20px',
      },
      boxShadow: {
        'glow-orange': '0 0 30px rgba(245, 158, 11, 0.4)',
        'glow-cyan': '0 0 30px rgba(6, 182, 212, 0.4)',
        'glow-emerald': '0 0 30px rgba(16, 185, 129, 0.4)',
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