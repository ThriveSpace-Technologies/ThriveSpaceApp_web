/**
 * Modal management utilities for handling multiple modals and their state
 */

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface Modal {
  id: string
  isOpen: boolean
  data?: any
}

interface ModalContextType {
  modals: Record<string, Modal>
  openModal: (id: string, data?: any) => void
  closeModal: (id: string) => void
  closeAllModals: () => void
  isModalOpen: (id: string) => boolean
  getModalData: (id: string) => any
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

/**
 * Create a modal context with the given initial state
 */
export function createModalContext() {
  return createContext<ModalContextType | undefined>(undefined)
}

/**
 * Hook factory for modal state management
 */
export function useModalState() {
  const [modals, setModals] = useState<Record<string, Modal>>({})

  const openModal = (id: string, data?: any) => {
    setModals(prev => ({
      ...prev,
      [id]: { id, isOpen: true, data }
    }))
  }

  const closeModal = (id: string) => {
    setModals(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false }
    }))
  }

  const closeAllModals = () => {
    setModals(prev =>
      Object.keys(prev).reduce((acc, id) => ({
        ...acc,
        [id]: { ...prev[id], isOpen: false }
      }), {})
    )
  }

  const isModalOpen = (id: string) => {
    return modals[id]?.isOpen ?? false
  }

  const getModalData = (id: string) => {
    return modals[id]?.data
  }

  return {
    modals,
    openModal,
    closeModal,
    closeAllModals,
    isModalOpen,
    getModalData
  }
}

/**
 * Simple hook for managing a single modal's state
 */
export function useSimpleModal(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen(prev => !prev)

  return {
    isOpen,
    open,
    close,
    toggle
  }
}

/**
 * Hook for handling escape key to close modals
 */
export function useEscapeKey(callback: () => void, isActive: boolean = true) {
  useEffect(() => {
    if (!isActive) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [callback, isActive])
}

/**
 * Hook for preventing body scroll when modal is open
 */
export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isLocked])
}

/**
 * Hook that combines common modal functionality
 */
export function useModalEffects(isOpen: boolean, onClose: () => void) {
  useEscapeKey(onClose, isOpen)
  useBodyScrollLock(isOpen)
}

