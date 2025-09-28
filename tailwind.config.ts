import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base colors inspired by descript.com
        bg: '#FFFFFF',
        fg: '#0B1220',
        muted: '#F6F7FB',
        border: '#E6E8EE',

        // Primary blue scale
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#0062FF', // Main primary
          600: '#0052D4',
          700: '#0047AB',
          800: '#003D82',
          900: '#002E5C',
        },

        // Semantic colors
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        info: '#0EA5E9',

        // Dark theme support
        dark: {
          bg: '#0F172A',
          fg: '#F8FAFC',
          muted: '#1E293B',
          border: '#334155',
        }
      },

      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },

      fontSize: {
        // Fluid typography scale
        'step--1': 'clamp(0.875rem, 0.8vw, 0.95rem)',
        'step-0': 'clamp(1rem, 0.9vw, 1.06rem)',
        'step-1': 'clamp(1.125rem, 1.1vw, 1.2rem)',
        'step-2': 'clamp(1.25rem, 1.6vw, 1.5rem)',
        'step-3': 'clamp(1.875rem, 2.6vw, 2.25rem)',
        'step-4': 'clamp(2.75rem, 4.2vw, 3.5rem)', // H1 oversized
      },

      borderRadius: {
        'input': '12px',
        'card': '16px',
        'pill': '9999px',
      },

      boxShadow: {
        'sm': '0 1px 2px rgba(0,0,0,0.05)',
        'md': '0 8px 24px rgba(0,0,0,0.08)',
        'lg': '0 20px 40px rgba(0,0,0,0.10)',
      },

      spacing: {
        'section': '6rem',
        'section-mobile': '4rem',
      },

      maxWidth: {
        'container': '1200px',
      },

      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-up-delay': 'fadeInUp 0.6s ease-out 0.1s both',
        'fade-in-up-delay-2': 'fadeInUp 0.6s ease-out 0.2s both',
        'fade-in-up-delay-3': 'fadeInUp 0.6s ease-out 0.3s both',
      },

      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(12px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },

      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
    },
  },
  plugins: [],
  darkMode: ['class', '[data-theme="dark"]'],
}

export default config