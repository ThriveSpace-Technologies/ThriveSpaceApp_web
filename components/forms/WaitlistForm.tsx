'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, User, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { validateEmail, validateRequired, cn, getMotionProps } from '@/lib/utils'

interface FormData {
  email: string
  name: string
  role: string
}

interface FormErrors {
  email?: string
  name?: string
  role?: string
}

const roleOptions = [
  { value: 'individual', label: 'Individual seeking wellness support' },
  { value: 'coach', label: 'Health/Fitness Coach' },
  { value: 'team-lead', label: 'Team/Organization Leader' },
  { value: 'healthcare', label: 'Healthcare Professional' },
  { value: 'other', label: 'Other' },
]

export function WaitlistForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    role: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string>('')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    const emailValidation = validateEmail(formData.email)
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error
    }

    const nameValidation = validateRequired(formData.name, 'Name')
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.error
    }

    const roleValidation = validateRequired(formData.role, 'Role')
    if (!roleValidation.isValid) {
      newErrors.role = roleValidation.error
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // TODO: Replace with actual API call
      // const response = await fetch(process.env.NEXT_PUBLIC_POST_URL_SUBSCRIBE, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // })

      setIsSubmitted(true)
    } catch (error) {
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
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
        <Card className="max-w-md mx-auto bg-green-50 border-green-200">
          <CardContent className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-step-2 font-semibold text-green-900 mb-2">
              You're on the list!
            </h3>
            <p className="text-green-700">
              Thanks for joining our waitlist. We'll keep you updated on our progress and let you know when ThriveSpace is ready.
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
      {...getMotionProps()}
    >
      <Card className="max-w-md mx-auto">
        <CardContent>
          <div className="text-center mb-6">
            <h3 className="text-step-2 font-semibold mb-2">Join the Waitlist</h3>
            <p className="text-gray-600 text-step-0">
              Be the first to know when ThriveSpace launches and get early access.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-step-0 font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={cn(
                    'w-full pl-10 pr-4 py-3 border rounded-input text-step-0',
                    'focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200',
                    errors.name ? 'border-red-500' : 'border-border'
                  )}
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-step--1 text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-step-0 font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={cn(
                    'w-full pl-10 pr-4 py-3 border rounded-input text-step-0',
                    'focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200',
                    errors.email ? 'border-red-500' : 'border-border'
                  )}
                  placeholder="your@email.com"
                  disabled={isSubmitting}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-step--1 text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label htmlFor="role" className="block text-step-0 font-medium text-gray-700 mb-2">
                I'm a...
              </label>
              <select
                id="role"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className={cn(
                  'w-full px-4 py-3 border rounded-input text-step-0',
                  'focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200',
                  errors.role ? 'border-red-500' : 'border-border'
                )}
                disabled={isSubmitting}
              >
                <option value="">Select your role</option>
                {roleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="mt-1 text-step--1 text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.role}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-6"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </Button>

            {/* Error Message */}
            {submitError && (
              <motion.p
                className="text-step--1 text-red-600 text-center flex items-center justify-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                {...getMotionProps()}
              >
                <AlertCircle size={14} />
                {submitError}
              </motion.p>
            )}

            {/* Privacy Note */}
            <p className="text-step--1 text-gray-500 text-center">
              We respect your privacy. No spam, just updates on our progress.
            </p>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}