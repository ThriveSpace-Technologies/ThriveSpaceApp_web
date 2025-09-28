'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Users, Target, TrendingUp, Heart, MessageCircle, Award } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import { cn, getMotionProps, motionVariants } from '@/lib/utils'
import { useFocusTrap } from '@/lib/focus-trap'

interface TourStep {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  preview: React.ReactNode
  highlights: string[]
}

interface GuidedTourModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete?: () => void
}

export function GuidedTourModal({ isOpen, onClose, onComplete }: GuidedTourModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [announceText, setAnnounceText] = useState('')
  const setFocusTrapContainer = useFocusTrap(isOpen)

  const tourSteps: TourStep[] = [
    {
      id: 'communities',
      title: 'Join Wellness Communities',
      description: 'Connect with others who share your health goals and interests',
      icon: Users,
      preview: (
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Users size={20} className="text-white" />
              </div>
              <div>
                <div className="font-medium">Morning Runners</div>
                <div className="text-sm text-gray-600">127 members</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Heart size={20} className="text-white" />
              </div>
              <div>
                <div className="font-medium">Mindful Eating</div>
                <div className="text-sm text-gray-600">89 members</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                <Target size={20} className="text-white" />
              </div>
              <div>
                <div className="font-medium">Weight Training Beginners</div>
                <div className="text-sm text-gray-600">203 members</div>
              </div>
            </div>
          </div>
        </div>
      ),
      highlights: [
        'Find communities based on your specific goals',
        'Connect with people at similar fitness levels',
        'Get support from those who understand your journey'
      ]
    },
    {
      id: 'progress',
      title: 'Track & Share Progress',
      description: 'Monitor your habits and celebrate milestones with your community',
      icon: TrendingUp,
      preview: (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Weekly Runs</span>
              <Badge variant="success">5/4 goals</Badge>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-green-500 h-3 rounded-full" style={{ width: '80%' }} />
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 7 }, (_, i) => (
                <div
                  key={i}
                  className={cn(
                    'w-6 h-6 rounded-full',
                    i < 5 ? 'bg-green-500' : 'bg-gray-200'
                  )}
                />
              ))}
            </div>
            <div className="text-sm text-gray-600">
              🔥 12-day streak • Share with Morning Runners?
            </div>
          </div>
        </div>
      ),
      highlights: [
        'Visual tracking of daily habits and goals',
        'Streak counters to maintain momentum',
        'Share victories with your support network'
      ]
    },
    {
      id: 'challenges',
      title: 'Join Community Challenges',
      description: 'Participate in friendly competitions that motivate and engage',
      icon: Award,
      preview: (
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-xl">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Award size={24} className="text-orange-500" />
              <div>
                <div className="font-medium">30-Day Mindfulness</div>
                <div className="text-sm text-gray-600">Ends in 12 days</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Your Progress</span>
                <span>18/30 days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '60%' }} />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>🏆 Currently #3 of 47 participants</span>
            </div>
          </div>
        </div>
      ),
      highlights: [
        'Team challenges to build accountability',
        'Leaderboards for friendly competition',
        'Celebrate group achievements together'
      ]
    },
    {
      id: 'support',
      title: 'Get & Give Support',
      description: 'Share encouragement and receive motivation from your wellness community',
      icon: MessageCircle,
      preview: (
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl">
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-3 border-l-4 border-pink-500">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  A
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-600 mb-1">Alex just completed their first 5K!</div>
                  <div className="text-xs text-gray-500">2 min ago</div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">❤️ Celebrate</Button>
              <Button size="sm" variant="outline">💪 Encourage</Button>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">12 people</span> celebrated with Alex
            </div>
          </div>
        </div>
      ),
      highlights: [
        'Real-time updates from your community',
        'Easy ways to show support and encouragement',
        'Build meaningful connections around wellness'
      ]
    }
  ]

  const currentTourStep = tourSteps[currentStep]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === tourSteps.length - 1

  const handleNext = () => {
    if (isLastStep) {
      handleComplete()
    } else {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      setAnnounceText(`Step ${nextStep + 1} of ${tourSteps.length}: ${tourSteps[nextStep].title}`)
    }
  }

  const handlePrevious = () => {
    if (!isFirstStep) {
      const prevStep = currentStep - 1
      setCurrentStep(prevStep)
      setAnnounceText(`Step ${prevStep + 1} of ${tourSteps.length}: ${tourSteps[prevStep].title}`)
    }
  }

  const handleComplete = () => {
    onComplete?.()
    onClose()
    setCurrentStep(0) // Reset for next time
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose()
    } else if (event.key === 'ArrowRight') {
      handleNext()
    } else if (event.key === 'ArrowLeft') {
      handlePrevious()
    }
  }

  // Reset step when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0)
      setAnnounceText(`Step 1 of ${tourSteps.length}: ${tourSteps[0].title}`)
    }
  }, [isOpen, tourSteps])

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }

  const modalVariants = motionVariants.modalEnter

  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Screen Reader Announcements */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {announceText}
          </div>

          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            {...getMotionProps()}
          />

          {/* Modal */}
          <motion.div
            ref={setFocusTrapContainer}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-modal="true"
            aria-labelledby="tour-modal-title"
            aria-describedby="tour-modal-description"
            {...getMotionProps()}
          >
            <Card
              variant="elevated"
              className="w-full max-w-sm mx-4 sm:max-w-2xl lg:max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <CardContent className="p-0">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    <h2 id="tour-modal-title" className="text-step-2 font-semibold">
                      How ThriveSpace Works
                    </h2>
                    <Badge variant="info" size="sm">
                      {currentStep + 1} of {tourSteps.length}
                    </Badge>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="p-2"
                    aria-label="Close guided tour"
                  >
                    <X size={20} />
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="px-6 py-3 bg-gray-50">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-primary-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                        mass: 0.8
                      }}
                      {...getMotionProps()}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      className="grid gap-8 items-start lg:grid-cols-2"
                      {...getMotionProps()}
                    >
                      {/* Left Column - Description */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center" aria-hidden="true">
                            <currentTourStep.icon size={24} className="text-primary-600" />
                          </div>
                          <div>
                            <h3 className="text-step-2 font-semibold">
                              {currentTourStep.title}
                            </h3>
                            <p id="tour-modal-description" className="text-gray-600">
                              {currentTourStep.description}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {currentTourStep.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
                              <span className="text-gray-700">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Column - Preview */}
                      <div className="lg:order-last">
                        <div className="border-2 border-gray-100 rounded-xl p-4 bg-white">
                          <div className="text-sm text-gray-500 mb-3 text-center">
                            Preview
                          </div>
                          {currentTourStep.preview}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="flex flex-col gap-4 p-4 sm:p-6 sm:flex-row sm:items-center sm:justify-between border-t border-gray-100 bg-gray-50">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handlePrevious()
                    }}
                    disabled={isFirstStep}
                    leftIcon={<ChevronLeft size={16} />}
                    type="button"
                    style={{ pointerEvents: 'auto' }}
                  >
                    Previous
                  </Button>

                  <div className="flex items-center gap-2">
                    {tourSteps.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setCurrentStep(index)
                          setAnnounceText(`Step ${index + 1} of ${tourSteps.length}: ${tourSteps[index].title}`)
                        }}
                        type="button"
                        className={cn(
                          'w-8 h-8 sm:w-4 sm:h-4 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 flex items-center justify-center',
                          index === currentStep ? 'bg-primary-500' : 'bg-gray-300 hover:bg-gray-400'
                        )}
                        style={{ pointerEvents: 'auto' }}
                        aria-label={`Go to step ${index + 1}: ${tourSteps[index].title}`}
                        aria-current={index === currentStep ? 'step' : undefined}
                      >
                        <span className="block sm:hidden text-xs text-white font-medium">
                          {index + 1}
                        </span>
                      </button>
                    ))}
                  </div>

                  <Button
                    variant="primary"
                    size="md"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleNext()
                    }}
                    rightIcon={isLastStep ? undefined : <ChevronRight size={16} />}
                    type="button"
                    style={{ pointerEvents: 'auto' }}
                  >
                    {isLastStep ? 'Get Started' : 'Next'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}