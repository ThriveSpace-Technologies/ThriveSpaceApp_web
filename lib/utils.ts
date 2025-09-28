import { type ClassValue, clsx } from 'clsx'

/**
 * Utility for merging Tailwind classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

/**
 * Enhanced utility for handling reduced motion preferences with performance optimizations
 */
export function getMotionProps(respectReducedMotion = true, options?: {
  reduceComplexity?: boolean
  enableGPU?: boolean
}) {
  if (typeof window === 'undefined') return {}

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (respectReducedMotion && prefersReducedMotion) {
    return {
      initial: false,
      animate: false,
      transition: { duration: 0.01 }, // Tiny duration instead of 0
      layoutId: undefined // Disable layout animations
    }
  }

  // Performance optimizations
  const baseProps: any = {}

  if (options?.enableGPU) {
    baseProps.style = { willChange: 'transform' }
  }

  return baseProps
}

/**
 * Enhanced motion variants with sophisticated timing and easing
 */
export const motionVariants = {
  // Enhanced stagger with natural timing
  staggerContainer: (delay = 0.08) => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
        delayChildren: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94] // Custom easing curve
      }
    }
  }),

  // More sophisticated item animations
  fadeInUp: {
    hidden: {
      opacity: 0,
      y: 24,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.8
      }
    }
  },

  // Card hover variants
  cardHover: {
    rest: {
      scale: 1,
      y: 0,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    },
    hover: {
      scale: 1.02,
      y: -4,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  },

  // Loading skeleton animation
  skeleton: {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },

  // Modal entrance
  modalEnter: {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.9
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  }
}

/**
 * Debounce function for form inputs
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Email validation utility
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Form field validation
 */
export interface ValidationResult {
  isValid: boolean
  error?: string
}

export function validateRequired(value: string, fieldName: string): ValidationResult {
  if (!value.trim()) {
    return {
      isValid: false,
      error: `${fieldName} is required`
    }
  }
  return { isValid: true }
}

export function validateEmail(email: string): ValidationResult {
  if (!email.trim()) {
    return {
      isValid: false,
      error: 'Email is required'
    }
  }

  if (!isValidEmail(email)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address'
    }
  }

  return { isValid: true }
}