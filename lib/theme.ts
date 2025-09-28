// Theme configuration inspired by descript.com
export const theme = {
  colors: {
    // Base colors
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

    // Dark theme
    dark: {
      bg: '#0F172A',
      fg: '#F8FAFC',
      muted: '#1E293B',
      border: '#334155',
    }
  },

  // Typography scale
  typography: {
    fontFamily: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
    fontSize: {
      'step--1': 'clamp(0.875rem, 0.8vw, 0.95rem)',
      'step-0': 'clamp(1rem, 0.9vw, 1.06rem)',
      'step-1': 'clamp(1.125rem, 1.1vw, 1.2rem)',
      'step-2': 'clamp(1.25rem, 1.6vw, 1.5rem)',
      'step-3': 'clamp(1.875rem, 2.6vw, 2.25rem)',
      'step-4': 'clamp(2.75rem, 4.2vw, 3.5rem)', // Oversized H1
    }
  },

  // Border radius tokens
  borderRadius: {
    input: '12px',
    card: '16px',
    pill: '9999px',
  },

  // Shadow tokens
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 8px 24px rgba(0,0,0,0.08)',
    lg: '0 20px 40px rgba(0,0,0,0.10)',
  },

  // Spacing tokens
  spacing: {
    section: '6rem',
    sectionMobile: '4rem',
    container: '1200px',
  },

  // Motion tokens
  motion: {
    ease: [0.2, 0.8, 0.2, 1] as const,
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.5s',
      slower: '0.7s',
    }
  },

  // Gradient definitions
  gradients: {
    primary: 'linear-gradient(135deg, #0062FF, #8B5CF6)',
    hero: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%)',
    glass: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
  }
} as const

// Theme application utility
export function applyTheme(themeName: 'light' | 'dark' = 'light') {
  const root = document.documentElement

  if (themeName === 'dark') {
    root.setAttribute('data-theme', 'dark')
  } else {
    root.removeAttribute('data-theme')
  }
}

// CSS-in-JS style helper for component styling
export function createStyles(styles: Record<string, any>) {
  return styles
}

// Responsive breakpoints
export const breakpoints = {
  mobile: '(max-width: 640px)',
  tablet: '(max-width: 768px)',
  desktop: '(min-width: 1024px)',
  large: '(min-width: 1280px)',
} as const

// Animation presets that respect prefers-reduced-motion
export const animations = {
  fadeInUp: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: theme.motion.ease }
  },
  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  scaleHover: {
    whileHover: { scale: 1.01, transition: { duration: 0.15 } },
    whileTap: { scale: 0.99 }
  }
} as const

export type Theme = typeof theme
export type ThemeColors = typeof theme.colors
export type Breakpoint = keyof typeof breakpoints