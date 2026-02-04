/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './types/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        nuclear: {
          primary: '#0891b2',
          secondary: '#2563eb',
          accent: '#7c3aed',
          success: '#059669',
          warning: '#d97706',
          danger: '#dc2626',
        },
        cyan: {
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
        },
        blue: {
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        purple: {
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        }
      },
      fontFamily: {
        'inter': ['var(--font-inter)', 'Inter', 'sans-serif'],
        'sans': ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.8s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.8s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'dots': 'dots 1.5s steps(5, end) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(8, 145, 178, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(8, 145, 178, 0.6)' },
        },
        dots: {
          '0%, 20%': {
            color: 'rgba(0, 0, 0, 0)',
            textShadow: '0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0)'
          },
          '40%': {
            color: 'black',
            textShadow: '0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0)'
          },
          '60%': {
            textShadow: '0.25em 0 0 black, 0.5em 0 0 rgba(0, 0, 0, 0)'
          },
          '80%, 100%': {
            textShadow: '0.25em 0 0 black, 0.5em 0 0 black'
          }
        },
      },
      backgroundImage: {
        'gradient-nuclear': 'linear-gradient(135deg, #0891b2, #2563eb, #7c3aed)',
        'gradient-nuclear-hover': 'linear-gradient(135deg, #0e7490, #1d4ed8, #6d28d9)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}

