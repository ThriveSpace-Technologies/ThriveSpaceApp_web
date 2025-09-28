'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ThumbsUp, MessageSquare, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { cn, getMotionProps } from '@/lib/utils'

interface Feature {
  id: string
  title: string
  description: string
  category: string
  votes: number
  hasVoted: boolean
}

const mockFeatures: Feature[] = [
  {
    id: '1',
    title: 'Habit Streaks & Milestones',
    description: 'Visual tracking of daily habits with streak counters and milestone celebrations',
    category: 'Tracking',
    votes: 42,
    hasVoted: false,
  },
  {
    id: '2',
    title: 'Community Challenges',
    description: 'Group challenges where teams compete in friendly wellness competitions',
    category: 'Community',
    votes: 38,
    hasVoted: false,
  },
  {
    id: '3',
    title: 'Personal Wellness Coach Chat',
    description: 'Direct messaging with certified wellness coaches for personalized guidance',
    category: 'Coaching',
    votes: 35,
    hasVoted: false,
  },
  {
    id: '4',
    title: 'Progress Photo Timeline',
    description: 'Private photo timeline to track physical transformation over time',
    category: 'Tracking',
    votes: 31,
    hasVoted: false,
  },
  {
    id: '5',
    title: 'Mindfulness & Meditation',
    description: 'Guided meditation sessions and mindfulness exercises integrated with progress',
    category: 'Wellness',
    votes: 29,
    hasVoted: false,
  },
]

export function FeatureRequest() {
  const [features, setFeatures] = useState<Feature[]>(mockFeatures)
  const [isSubmitting, setIsSubmitting] = useState<string>('')
  const [newFeatureTitle, setNewFeatureTitle] = useState('')
  const [newFeatureDescription, setNewFeatureDescription] = useState('')
  const [showAddFeature, setShowAddFeature] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleVote = async (featureId: string) => {
    const previousFeatures = [...features]
    setSubmitError('')

    // Optimistic update - update UI immediately
    setFeatures(prev =>
      prev.map(feature =>
        feature.id === featureId
          ? {
              ...feature,
              votes: feature.hasVoted ? feature.votes - 1 : feature.votes + 1,
              hasVoted: !feature.hasVoted
            }
          : feature
      )
    )

    setIsSubmitting(featureId)

    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 800))

      // In a real app, this would be the API response
      // For demo purposes, we'll just confirm the optimistic update was correct
      console.log('Vote submitted successfully for feature:', featureId)
    } catch (error) {
      // Rollback on error - restore previous state
      setFeatures(previousFeatures)
      setSubmitError('Failed to submit vote. Please try again.')
    } finally {
      setIsSubmitting('')
    }
  }

  const handleAddFeature = async () => {
    if (!newFeatureTitle.trim() || !newFeatureDescription.trim()) {
      setSubmitError('Please fill in both title and description.')
      return
    }

    setIsSubmitting('new-feature')
    setSubmitError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      const newFeature: Feature = {
        id: Date.now().toString(),
        title: newFeatureTitle,
        description: newFeatureDescription,
        category: 'Community',
        votes: 1,
        hasVoted: true,
      }

      setFeatures(prev => [newFeature, ...prev])
      setNewFeatureTitle('')
      setNewFeatureDescription('')
      setShowAddFeature(false)
    } catch (error) {
      setSubmitError('Failed to add feature. Please try again.')
    } finally {
      setIsSubmitting('')
    }
  }

  const sortedFeatures = [...features].sort((a, b) => b.votes - a.votes)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
      {...getMotionProps()}
    >
      <div className="text-center mb-8">
        <h2 className="text-step-3 font-bold gradient-text mb-4">
          Help Shape ThriveSpace
        </h2>
        <p className="text-gray-600 text-step-1 max-w-2xl mx-auto">
          Vote on features you'd love to see or suggest your own ideas.
          The most popular features will be prioritized in development.
        </p>
      </div>

      {/* Add Feature Button */}
      <div className="mb-8 text-center">
        <Button
          variant="outline"
          size="md"
          onClick={() => setShowAddFeature(!showAddFeature)}
          leftIcon={<MessageSquare size={16} />}
        >
          Suggest a Feature
        </Button>
      </div>

      {/* Add Feature Form */}
      {showAddFeature && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-8"
          {...getMotionProps()}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-step-1">Suggest a New Feature</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-step-0 font-medium text-gray-700 mb-2">
                  Feature Title
                </label>
                <input
                  type="text"
                  value={newFeatureTitle}
                  onChange={(e) => setNewFeatureTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-input focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Give your feature a catchy name"
                  disabled={isSubmitting === 'new-feature'}
                />
              </div>

              <div>
                <label className="block text-step-0 font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newFeatureDescription}
                  onChange={(e) => setNewFeatureDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-border rounded-input focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                  placeholder="Describe how this feature would help with wellness goals"
                  disabled={isSubmitting === 'new-feature'}
                />
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleAddFeature}
                  isLoading={isSubmitting === 'new-feature'}
                  disabled={isSubmitting === 'new-feature'}
                >
                  {isSubmitting === 'new-feature' ? 'Adding...' : 'Add Feature'}
                </Button>
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setShowAddFeature(false)}
                  disabled={isSubmitting === 'new-feature'}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Error Message */}
      {submitError && (
        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          {...getMotionProps()}
        >
          <p className="text-red-600 flex items-center justify-center gap-2">
            <AlertCircle size={16} />
            {submitError}
          </p>
        </motion.div>
      )}

      {/* Feature List */}
      <div className="space-y-4">
        {sortedFeatures.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            {...getMotionProps()}
          >
            <Card hover className="transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-step-1 font-semibold">{feature.title}</h3>
                      <Badge variant="outline" size="sm">
                        {feature.category}
                      </Badge>
                      {index < 3 && (
                        <Badge variant="info" size="sm" className="flex items-center gap-1">
                          <TrendingUp size={12} />
                          Top
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 text-step-0 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  <div className="ml-6 flex flex-col items-center space-y-2">
                    <Button
                      variant={feature.hasVoted ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleVote(feature.id)}
                      isLoading={isSubmitting === feature.id}
                      disabled={!!isSubmitting}
                      className="min-w-[80px]"
                      leftIcon={<ThumbsUp size={14} />}
                    >
                      {feature.votes}
                    </Button>
                    {feature.hasVoted && (
                      <span className="text-step--1 text-primary-600 font-medium">
                        Voted
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center text-gray-500 text-step--1">
        <p>Have a different idea? We'd love to hear it!</p>
      </div>
    </motion.div>
  )
}