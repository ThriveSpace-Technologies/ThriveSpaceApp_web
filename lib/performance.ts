/**
 * Performance optimization utilities
 */

/**
 * Lazy load components with Intersection Observer
 */
export function useLazyLoad(threshold = 0.1) {
  const [isInView, setIsInView] = React.useState(false)
  const ref = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return [ref, isInView] as const
}

/**
 * Debounced value hook for performance
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Preload critical images
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

/**
 * Optimize animation frame usage
 */
export function useAnimationFrame(callback: () => void, deps: React.DependencyList) {
  const requestRef = React.useRef<number>()

  const animate = React.useCallback(() => {
    callback()
    requestRef.current = requestAnimationFrame(animate)
  }, deps)

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [animate])
}

/**
 * Memory efficient event listeners
 */
export function useEventListener<T extends keyof WindowEventMap>(
  eventType: T,
  listener: (event: WindowEventMap[T]) => void,
  options?: boolean | AddEventListenerOptions
) {
  const savedListener = React.useRef(listener)

  React.useEffect(() => {
    savedListener.current = listener
  }, [listener])

  React.useEffect(() => {
    const eventListener = (event: WindowEventMap[T]) => savedListener.current(event)
    window.addEventListener(eventType, eventListener, options)

    return () => {
      window.removeEventListener(eventType, eventListener, options)
    }
  }, [eventType, options])
}

/**
 * Optimize re-renders with shallow comparison
 */
export function useShallowMemo<T>(factory: () => T, deps: React.DependencyList): T {
  const ref = React.useRef<{ deps: React.DependencyList; value: T }>()

  if (!ref.current || !shallowEqual(ref.current.deps, deps)) {
    ref.current = { deps, value: factory() }
  }

  return ref.current.value
}

function shallowEqual(a: React.DependencyList, b: React.DependencyList): boolean {
  if (a.length !== b.length) return false
  return a.every((item, index) => item === b[index])
}

// Import React
import React from 'react'