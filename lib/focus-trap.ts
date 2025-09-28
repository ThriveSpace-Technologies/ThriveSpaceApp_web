/**
 * Focus trap utility for accessible modals
 */

const FOCUSABLE_ELEMENTS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable]',
]

export class FocusTrap {
  private container: HTMLElement
  private previousActiveElement: Element | null = null
  private focusableElements: HTMLElement[] = []

  constructor(container: HTMLElement) {
    this.container = container
  }

  activate() {
    // Store the currently focused element
    this.previousActiveElement = document.activeElement

    // Find all focusable elements within the container
    this.updateFocusableElements()

    // Focus the first focusable element
    if (this.focusableElements.length > 0) {
      this.focusableElements[0].focus()
    }

    // Add event listeners
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('focusin', this.handleFocusIn)
  }

  deactivate() {
    // Remove event listeners
    document.removeEventListener('keydown', this.handleKeyDown)
    document.removeEventListener('focusin', this.handleFocusIn)

    // Restore focus to the previously focused element
    if (this.previousActiveElement && 'focus' in this.previousActiveElement) {
      ;(this.previousActiveElement as HTMLElement).focus()
    }
  }

  private updateFocusableElements() {
    const elements = this.container.querySelectorAll(FOCUSABLE_ELEMENTS.join(','))
    this.focusableElements = Array.from(elements) as HTMLElement[]
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      this.handleTabKey(event)
    } else if (event.key === 'Escape') {
      // Let the modal handle escape key
      return
    }
  }

  private handleTabKey(event: KeyboardEvent) {
    if (this.focusableElements.length === 0) {
      event.preventDefault()
      return
    }

    const firstElement = this.focusableElements[0]
    const lastElement = this.focusableElements[this.focusableElements.length - 1]

    if (event.shiftKey) {
      // Shift + Tab (backwards)
      if (document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      }
    } else {
      // Tab (forwards)
      if (document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }
  }

  private handleFocusIn = (event: FocusEvent) => {
    const target = event.target as HTMLElement

    // If focus moves outside the container, bring it back
    if (!this.container.contains(target)) {
      event.preventDefault()
      if (this.focusableElements.length > 0) {
        this.focusableElements[0].focus()
      }
    }
  }
}

/**
 * React hook for managing focus trap
 */
export function useFocusTrap(isActive: boolean) {
  const [container, setContainer] = React.useState<HTMLElement | null>(null)
  const focusTrapRef = React.useRef<FocusTrap | null>(null)

  React.useEffect(() => {
    if (container && isActive) {
      focusTrapRef.current = new FocusTrap(container)
      focusTrapRef.current.activate()

      return () => {
        focusTrapRef.current?.deactivate()
      }
    }
  }, [container, isActive])

  return setContainer
}

// Import React for the hook
import React from 'react'