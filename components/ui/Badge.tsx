'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles = cn(
      // Base styles
      'inline-flex items-center font-medium rounded-pill transition-colors duration-200',

      // Size variants
      {
        'px-2 py-0.5 text-xs': size === 'sm',
        'px-3 py-1 text-sm': size === 'md',
        'px-4 py-1.5 text-base': size === 'lg',
      },

      // Variant styles
      {
        // Default
        'bg-gray-100 text-gray-800 hover:bg-gray-200':
          variant === 'default',

        // Success
        'bg-green-100 text-green-800 hover:bg-green-200':
          variant === 'success',

        // Warning
        'bg-yellow-100 text-yellow-800 hover:bg-yellow-200':
          variant === 'warning',

        // Danger
        'bg-red-100 text-red-800 hover:bg-red-200':
          variant === 'danger',

        // Info
        'bg-blue-100 text-blue-800 hover:bg-blue-200':
          variant === 'info',

        // Outline
        'border border-gray-300 text-gray-600 hover:bg-gray-50':
          variant === 'outline',
      },

      className
    )

    return (
      <span
        ref={ref}
        className={baseStyles}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }