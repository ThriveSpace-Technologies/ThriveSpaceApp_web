'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Circle } from 'lucide-react'
import { cn, getMotionProps } from '@/lib/utils'

interface SurveyStep {
  id: string
  title: string
  description: string
}

interface SurveyProgressIndicatorProps {
  steps: SurveyStep[]
  currentStep: number
  completedSteps: number[]
}

export function SurveyProgressIndicator({
  steps,
  currentStep,
  completedSteps
}: SurveyProgressIndicatorProps) {
  const progressPercentage = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            {...getMotionProps()}
          />
        </div>

        {/* Step Indicators */}
        <div className="absolute top-0 left-0 w-full flex justify-between transform -translate-y-1">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index)
            const isCurrent = index === currentStep
            const isUpcoming = index > currentStep

            return (
              <motion.div
                key={step.id}
                className="flex flex-col items-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                {...getMotionProps()}
              >
                <div
                  className={cn(
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center mb-2 transition-all duration-300',
                    {
                      'bg-primary-500 border-primary-500': isCurrent,
                      'bg-green-500 border-green-500': isCompleted,
                      'bg-white border-gray-300': isUpcoming,
                    }
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle size={14} className="text-white" />
                  ) : (
                    <Circle
                      size={10}
                      className={cn(
                        'transition-colors duration-300',
                        {
                          'text-white': isCurrent,
                          'text-gray-400': isUpcoming,
                        }
                      )}
                      fill="currentColor"
                    />
                  )}
                </div>

                {/* Step Label - Only show on desktop */}
                <div className="hidden md:block text-center">
                  <div
                    className={cn(
                      'text-xs font-medium transition-colors duration-300',
                      {
                        'text-primary-600': isCurrent,
                        'text-green-600': isCompleted,
                        'text-gray-400': isUpcoming,
                      }
                    )}
                  >
                    {step.title}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Current Step Info */}
      <motion.div
        className="text-center"
        key={currentStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        {...getMotionProps()}
      >
        <div className="text-sm text-gray-500 mb-1">
          Step {currentStep + 1} of {steps.length}
        </div>
        <h3 className="text-step-1 font-semibold text-gray-900 mb-2">
          {steps[currentStep]?.title}
        </h3>
        <p className="text-step-0 text-gray-600 max-w-2xl mx-auto">
          {steps[currentStep]?.description}
        </p>
      </motion.div>
    </div>
  )
}