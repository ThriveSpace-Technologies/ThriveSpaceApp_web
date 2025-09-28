'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { cn, getMotionProps } from '@/lib/utils'

interface Question {
  id: string
  text: string
  type: 'single' | 'multiple' | 'checkbox'
  maxSelections?: number
  section: {
    name: string
    number: number
    total: number
  }
  options: Array<{
    id: string
    text: string
    description?: string
    icon?: string
  }>
}

const questions: Question[] = [
  // Section 1: Interest & Usage Assessment
  {
    id: 'social_frustration',
    text: 'How frustrated are you with toxic and negative contents on Instagram and Facebook?',
    type: 'single',
    section: { name: 'Interest & Usage', number: 1, total: 4 },
    options: [
      { id: 'extremely', text: 'Extremely frustrated', description: 'I actively avoid them', icon: '😤' },
      { id: 'very', text: 'Very frustrated', description: 'It affects my motivation', icon: '😔' },
      { id: 'somewhat', text: 'Somewhat frustrated', description: 'I notice the negativity', icon: '😐' },
      { id: 'not_really', text: 'Not really frustrated', description: 'I can filter it out', icon: '🤷' },
      { id: 'not_at_all', text: 'Not frustrated at all', description: 'I don\'t see this as an issue', icon: '😊' },
    ],
  },
  {
    id: 'platform_interest',
    text: 'Would you join a wellness platform that prioritizes community over likes?',
    type: 'single',
    section: { name: 'Interest & Usage', number: 1, total: 4 },
    options: [
      { id: 'definitely_yes', text: 'Definitely yes!', description: 'I\'ve been looking for this', icon: '🌟' },
      { id: 'probably_yes', text: 'Probably yes', description: 'Sounds appealing', icon: '👍' },
      { id: 'maybe', text: 'Maybe', description: 'Depends on execution', icon: '🤔' },
      { id: 'probably_not', text: 'Probably not', description: 'Happy with current platforms', icon: '👎' },
    ],
  },
  {
    id: 'app_likelihood',
    text: 'How likely would you use an app combining social + wellness tracking + trainer access?',
    type: 'single',
    section: { name: 'Interest & Usage', number: 1, total: 4 },
    options: [
      { id: 'extremely', text: 'Extremely likely', description: 'Would use daily', icon: '📱' },
      { id: 'very', text: 'Very likely', description: 'Would use regularly', icon: '💪' },
      { id: 'somewhat', text: 'Somewhat likely', description: 'Would try it out', icon: '🔍' },
      { id: 'not_very', text: 'Not very likely', description: 'Might check occasionally', icon: '👀' },
    ],
  },
  {
    id: 'learning_engagement',
    text: 'If ThriveSpace offered structured learning programs (yoga, nutrition, mental wellness), how often would you engage?',
    type: 'single',
    section: { name: 'Interest & Usage', number: 1, total: 4 },
    options: [
      { id: 'daily', text: 'Daily', description: 'Actively learning new skills', icon: '📚' },
      { id: 'several_times_week', text: 'Several times per week', description: 'Enjoy structured learning', icon: '🎯' },
      { id: 'weekly', text: 'Weekly', description: 'When I have time to focus', icon: '⏰' },
      { id: 'monthly', text: 'Monthly', description: 'Occasionally interested', icon: '🌙' },
      { id: 'rarely', text: 'Rarely', description: 'Prefer to learn elsewhere', icon: '🤷' },
    ],
  },
  // Section 2: Feature Requests
  {
    id: 'valuable_features',
    text: 'Which 2 features would be most valuable to you? (Select exactly 2)',
    type: 'checkbox',
    maxSelections: 2,
    section: { name: 'Feature Requests', number: 2, total: 4 },
    options: [
      { id: 'ai_recommendations', text: 'AI-powered recommendations', description: 'Personalized workout and nutrition', icon: '🤖' },
      { id: 'live_classes', text: 'Live group fitness classes', description: 'Workshops with certified trainers', icon: '🎥' },
      { id: 'challenges', text: 'Wellness challenges', description: 'Competitions with real rewards', icon: '🏆' },
      { id: 'mental_health', text: 'Mental health support', description: 'Anonymous groups and counseling', icon: '🧠' },
    ],
  },
  {
    id: 'engaging_content',
    text: 'What content would engage you most in a wellness community?',
    type: 'single',
    section: { name: 'Feature Requests', number: 2, total: 4 },
    options: [
      { id: 'transformation_stories', text: 'Transformation stories', description: 'Real user progress celebrations', icon: '⭐' },
      { id: 'expert_content', text: 'Expert-led education', description: 'Nutrition tips, exercise techniques', icon: '👨‍⚕️' },
      { id: 'community_challenges', text: 'Community challenges', description: 'Group accountability programs', icon: '👥' },
      { id: 'mindfulness', text: 'Mindfulness resources', description: 'Meditation, stress management', icon: '🧘' },
    ],
  },
  // Section 3: Problem-Solution Fit
  {
    id: 'biggest_frustration',
    text: 'What\'s your biggest frustration with existing fitness apps/platforms?',
    type: 'single',
    section: { name: 'Problem-Solution Fit', number: 3, total: 4 },
    options: [
      { id: 'appearance_focused', text: 'Too focused on appearance', description: 'Rather than overall health', icon: '👁️' },
      { id: 'lack_community', text: 'Lack of genuine community', description: 'No meaningful connections', icon: '💔' },
      { id: 'toxic_culture', text: 'Toxic comparison culture', description: 'Unrealistic body standards', icon: '☠️' },
      { id: 'motivation_issues', text: 'Staying motivated', description: 'Difficulty with accountability', icon: '😞' },
    ],
  },
  {
    id: 'solution_fit',
    text: 'How well would ThriveSpace solve your wellness & social media challenges?',
    type: 'single',
    section: { name: 'Problem-Solution Fit', number: 3, total: 4 },
    options: [
      { id: 'perfectly', text: 'Perfectly', description: 'Addresses all my concerns', icon: '🎯' },
      { id: 'very_well', text: 'Very well', description: 'Would solve most problems', icon: '✅' },
      { id: 'somewhat_well', text: 'Somewhat well', description: 'Would help with some issues', icon: '👍' },
      { id: 'unsure', text: 'Unsure', description: 'Need to see it in action first', icon: '🤷' },
    ],
  },
  // Section 4: Demographics
  {
    id: 'age_range',
    text: 'What\'s your age range?',
    type: 'single',
    section: { name: 'About You', number: 4, total: 4 },
    options: [
      { id: '18-24', text: '18-24' },
      { id: '25-34', text: '25-34' },
      { id: '35-44', text: '35-44' },
      { id: '45-54', text: '45-54' },
      { id: '55+', text: '55+' },
    ],
  },
  {
    id: 'info_source',
    text: 'How do you currently find fitness and wellness information?',
    type: 'single',
    section: { name: 'About You', number: 4, total: 4 },
    options: [
      { id: 'social_media', text: 'Social media', description: 'Instagram, TikTok, YouTube', icon: '📱' },
      { id: 'apps_websites', text: 'Apps and websites', description: 'Fitness apps, wellness sites', icon: '💻' },
      { id: 'professionals', text: 'Fitness professionals', description: 'Personal trainers, coaches', icon: '🏋️' },
      { id: 'friends_family', text: 'Friends and family', description: 'Personal recommendations', icon: '👥' },
      { id: 'traditional_media', text: 'Traditional media', description: 'Books, magazines, TV', icon: '📚' },
      { id: 'medical_professionals', text: 'Medical professionals', description: 'Healthcare providers', icon: '🏥' },
    ],
  },
  {
    id: 'wellness_goal',
    text: 'What\'s your primary wellness goal for the next 12 months?',
    type: 'single',
    section: { name: 'About You', number: 4, total: 4 },
    options: [
      { id: 'weight_loss', text: 'Weight loss', description: 'Body composition improvement', icon: '⚖️' },
      { id: 'strength_building', text: 'Building strength', description: 'Muscle mass development', icon: '💪' },
      { id: 'mental_health', text: 'Mental health', description: 'Stress management improvement', icon: '🧠' },
      { id: 'maintaining_health', text: 'Maintaining health', description: 'Preventing illness', icon: '🏥' },
    ],
  },
]

interface SurveyData {
  [questionId: string]: string | string[]
}

export function QuickSurvey() {
  const [currentStep, setCurrentStep] = useState(0)
  const [surveyData, setSurveyData] = useState<SurveyData>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string>('')

  const currentQuestion = questions[currentStep]
  const isLastQuestion = currentStep === questions.length - 1
  const progress = ((currentStep + 1) / questions.length) * 100

  const handleOptionSelect = (questionId: string, optionId: string, type: 'single' | 'multiple' | 'checkbox', maxSelections?: number) => {
    setSurveyData(prev => {
      if (type === 'single') {
        return { ...prev, [questionId]: optionId }
      } else if (type === 'multiple' || type === 'checkbox') {
        const currentSelections = (prev[questionId] as string[]) || []
        const isSelected = currentSelections.includes(optionId)

        if (isSelected) {
          return {
            ...prev,
            [questionId]: currentSelections.filter(id => id !== optionId)
          }
        } else {
          // Check max selections for checkbox type
          if (maxSelections && currentSelections.length >= maxSelections) {
            return prev // Don't allow more selections
          }
          return {
            ...prev,
            [questionId]: [...currentSelections, optionId]
          }
        }
      }
      return prev
    })
  }

  const canProceed = () => {
    const answer = surveyData[currentQuestion.id]
    if (currentQuestion.type === 'single') {
      return !!answer
    } else if (currentQuestion.type === 'multiple' || currentQuestion.type === 'checkbox') {
      const selections = Array.isArray(answer) ? answer : []
      if (currentQuestion.maxSelections) {
        return selections.length === currentQuestion.maxSelections
      }
      return selections.length > 0
    }
    return false
  }

  const handleNext = () => {
    if (isLastQuestion) {
      handleSubmit()
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError('')

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1500))

      // TODO: Replace with actual API call
      // const response = await fetch(process.env.NEXT_PUBLIC_POST_URL_FEEDBACK, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(surveyData),
      // })

      setIsSubmitted(true)
    } catch (error) {
      setSubmitError('Failed to submit survey. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        {...getMotionProps()}
      >
        <Card className="max-w-2xl mx-auto bg-green-50 border-green-200">
          <CardContent className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-step-2 font-semibold text-green-900 mb-2">
              Thank you for your feedback!
            </h3>
            <p className="text-green-700 max-w-md mx-auto">
              Your input is invaluable in helping us build a wellness platform that truly serves your needs.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
      {...getMotionProps()}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-step-1">ThriveSpace Survey</CardTitle>
            <span className="text-step--1 text-gray-500">
              {currentStep + 1} of {questions.length}
            </span>
          </div>

          {/* Section Badge */}
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="text-step--1">
              {currentQuestion.section.name}
            </Badge>
            <span className="text-step--2 text-gray-400">
              {currentQuestion.section.number}/4
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-primary-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              {...getMotionProps()}
            />
          </div>
        </CardHeader>

        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              {...getMotionProps()}
            >
              <h3 className="text-step-2 font-semibold mb-6 leading-tight">
                {currentQuestion.text}
              </h3>

              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option) => {
                  const isSelected = currentQuestion.type === 'single'
                    ? surveyData[currentQuestion.id] === option.id
                    : (surveyData[currentQuestion.id] as string[] || []).includes(option.id)

                  const isDisabled = currentQuestion.maxSelections &&
                    (surveyData[currentQuestion.id] as string[] || []).length >= currentQuestion.maxSelections &&
                    !isSelected

                  return (
                    <motion.button
                      key={option.id}
                      onClick={() => handleOptionSelect(currentQuestion.id, option.id, currentQuestion.type, currentQuestion.maxSelections)}
                      disabled={isDisabled}
                      className={cn(
                        'w-full p-4 rounded-card border-2 text-left transition-all duration-200',
                        'hover:border-primary-300 hover:bg-primary-50',
                        isSelected
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-border bg-white',
                        isDisabled && 'opacity-50 cursor-not-allowed'
                      )}
                      whileHover={!isDisabled ? { scale: 1.01 } : {}}
                      whileTap={!isDisabled ? { scale: 0.99 } : {}}
                      {...getMotionProps()}
                    >
                      <div className="flex items-center space-x-3">
                        {option.icon && (
                          <span className="text-2xl">{option.icon}</span>
                        )}
                        <div className="flex-1">
                          <div className="text-step-0 font-medium">{option.text}</div>
                          {option.description && (
                            <div className="text-step--1 text-gray-600 mt-1">
                              {option.description}
                            </div>
                          )}
                        </div>
                        {(currentQuestion.type === 'multiple' || currentQuestion.type === 'checkbox') && (
                          <div className={cn(
                            'w-5 h-5 rounded border-2 transition-colors duration-200',
                            isSelected
                              ? 'bg-primary-500 border-primary-500'
                              : 'border-gray-300'
                          )}>
                            {isSelected && (
                              <CheckCircle className="w-3 h-3 text-white m-0.5" />
                            )}
                          </div>
                        )}
                        {currentQuestion.type === 'single' && (
                          <div className={cn(
                            'w-5 h-5 rounded-full border-2 transition-colors duration-200',
                            isSelected
                              ? 'bg-primary-500 border-primary-500'
                              : 'border-gray-300'
                          )}>
                            {isSelected && (
                              <div className="w-2 h-2 bg-white rounded-full m-1" />
                            )}
                          </div>
                        )}
                      </div>
                    </motion.button>
                  )
                })}
              </div>

              <div className="flex justify-between items-center">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  disabled={currentStep === 0}
                >
                  Previous
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  isLoading={isSubmitting}
                  rightIcon={!isLastQuestion ? <ChevronRight size={16} /> : undefined}
                >
                  {isSubmitting ? 'Submitting...' : isLastQuestion ? 'Submit Survey' : 'Next'}
                </Button>
              </div>

              {submitError && (
                <motion.p
                  className="text-step--1 text-red-600 text-center flex items-center justify-center gap-1 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  {...getMotionProps()}
                >
                  <AlertCircle size={14} />
                  {submitError}
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}