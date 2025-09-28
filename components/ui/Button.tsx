'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn, getMotionProps, motionVariants } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      // Base styles
      'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 ease-smooth',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',

      // Size variants with proper touch targets
      {
        'px-4 py-3 text-sm rounded-lg min-h-[44px]': size === 'sm',
        'px-6 py-3 text-base rounded-pill min-h-[48px]': size === 'md',
        'px-8 py-4 text-lg rounded-pill min-h-[52px]': size === 'lg',
      },

      // Variant styles
      {
        // Primary
        'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-md hover:shadow-lg':
          variant === 'primary',

        // Secondary
        'bg-muted text-fg hover:bg-border active:bg-gray-300':
          variant === 'secondary',

        // Outline
        'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 active:bg-primary-100':
          variant === 'outline',

        // Ghost
        'text-primary-500 hover:bg-primary-50 active:bg-primary-100':
          variant === 'ghost',
      },

      className
    )

    return (
      <motion.button
        ref={ref}
        className={baseStyles}
        disabled={disabled || isLoading}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        variants={{
          rest: { scale: 1 },
          hover: {
            scale: 1.02,
            transition: { type: "spring", stiffness: 400, damping: 25 }
          },
          tap: {
            scale: 0.98,
            transition: { duration: 0.1 }
          }
        }}
        type={props.type || 'button'}
        onClick={props.onClick}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onKeyDown={props.onKeyDown}
        aria-label={props['aria-label']}
        tabIndex={props.tabIndex}
        {...getMotionProps()}
      >
        {isLoading && (
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            {...getMotionProps()}
          />
        )}

        {leftIcon && !isLoading && <span className="w-4 h-4">{leftIcon}</span>}

        {children}

        {rightIcon && !isLoading && <span className="w-4 h-4">{rightIcon}</span>}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button }