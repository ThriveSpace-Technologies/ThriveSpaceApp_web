'use client'

import { motion } from 'framer-motion'
import {
  User,
  Users,
  Briefcase,
  Heart,
  Target,
  Clock,
  MessageCircle,
  TrendingUp,
  Award,
  Shield
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { getMotionProps } from '@/lib/utils'

interface UseCase {
  id: string
  persona: string
  title: string
  description: string
  icon: React.ComponentType<any>
  painPoints: string[]
  solutions: string[]
  outcomes: string[]
  badge: string
  gradient: string
}

export function UseCases() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  const useCases: UseCase[] = [
    {
      id: 'individual',
      persona: 'Individual',
      title: 'Personal Wellness Journey',
      description: 'For individuals seeking accountability and community support on their health journey',
      icon: User,
      badge: 'Most Popular',
      gradient: 'from-blue-500 to-cyan-500',
      painPoints: [
        'Struggling to stay consistent with health habits',
        'Feeling isolated and unmotivated',
        'Difficulty tracking meaningful progress'
      ],
      solutions: [
        'Join accountability groups with similar goals',
        'Share progress and get encouragement',
        'Access personalized wellness insights'
      ],
      outcomes: [
        'Build sustainable healthy habits',
        'Feel supported and motivated daily',
        'Track progress that actually matters'
      ]
    },
    {
      id: 'coach',
      persona: 'Health Coach',
      title: 'Client Community Building',
      description: 'For coaches wanting to create supportive communities around their clients',
      icon: Heart,
      badge: 'Professional',
      gradient: 'from-emerald-500 to-green-500',
      painPoints: [
        'Limited client engagement between sessions',
        'Difficulty scaling personalized support',
        'Clients feeling isolated in their journey'
      ],
      solutions: [
        'Create private communities for client groups',
        'Facilitate peer-to-peer support',
        'Monitor client progress efficiently'
      ],
      outcomes: [
        'Higher client retention and success',
        'Scale impact beyond 1:1 sessions',
        'Build thriving wellness communities'
      ]
    },
    {
      id: 'team',
      persona: 'Team Leader',
      title: 'Workplace Wellness Culture',
      description: 'For organizations building a culture of health and wellbeing among team members',
      icon: Briefcase,
      badge: 'Enterprise',
      gradient: 'from-purple-500 to-pink-500',
      painPoints: [
        'Low participation in wellness programs',
        'Lack of team cohesion around health',
        'Difficulty measuring wellness ROI'
      ],
      solutions: [
        'Create team wellness challenges',
        'Foster peer support networks',
        'Track team engagement metrics'
      ],
      outcomes: [
        'Improved team morale and productivity',
        'Stronger workplace relationships',
        'Measurable wellness program success'
      ]
    }
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          {...getMotionProps()}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Built for Everyone
            </Badge>
            <h2 className="text-step-3 font-bold gradient-text mb-4">
              Wellness communities for every journey
            </h2>
            <p className="text-step-1 text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Whether you're starting your personal wellness journey, supporting clients as a coach,
              or building healthier team culture, ThriveSpace adapts to your unique needs.
            </p>
          </motion.div>

          {/* Use Cases Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon
              return (
                <motion.div key={useCase.id} variants={itemVariants} className="h-full">
                  <Card variant="elevated" hover className="h-full flex flex-col">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${useCase.gradient} rounded-full flex items-center justify-center`}>
                          <Icon size={24} className="text-white" />
                        </div>
                        <Badge variant="info" size="sm">
                          {useCase.badge}
                        </Badge>
                      </div>
                      <CardTitle className="text-step-1">
                        {useCase.title}
                      </CardTitle>
                      <p className="text-gray-600 text-step-0">
                        {useCase.description}
                      </p>
                    </CardHeader>

                    <CardContent className="pt-0 flex-1 flex flex-col">
                      {/* Pain Points */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Target size={16} className="text-red-500" />
                          Common Challenges
                        </h4>
                        <ul className="space-y-2">
                          {useCase.painPoints.map((point, idx) => (
                            <li key={idx} className="text-step--1 text-gray-600 flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Solutions */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <MessageCircle size={16} className="text-primary-500" />
                          ThriveSpace Solutions
                        </h4>
                        <ul className="space-y-2">
                          {useCase.solutions.map((solution, idx) => (
                            <li key={idx} className="text-step--1 text-gray-600 flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                              {solution}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Outcomes */}
                      <div className="mb-6 flex-1">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <TrendingUp size={16} className="text-green-500" />
                          Expected Outcomes
                        </h4>
                        <ul className="space-y-2">
                          {useCase.outcomes.map((outcome, idx) => (
                            <li key={idx} className="text-step--1 text-gray-600 flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        variant="outline"
                        size="md"
                        className="w-full mt-auto"
                      >
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Feature Highlights */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="text-center mb-8">
                <h3 className="text-step-2 font-semibold mb-3">
                  Powerful features for every use case
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Core capabilities that adapt to your specific wellness community needs
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    icon: Users,
                    title: 'Community Groups',
                    description: 'Create and join groups based on goals, interests, or location'
                  },
                  {
                    icon: Clock,
                    title: 'Progress Tracking',
                    description: 'Visual dashboards to monitor habits and celebrate milestones'
                  },
                  {
                    icon: Award,
                    title: 'Challenges',
                    description: 'Friendly competitions that motivate and engage members'
                  },
                  {
                    icon: Shield,
                    title: 'Privacy First',
                    description: 'Control what you share with granular privacy settings'
                  }
                ].map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Icon size={20} className="text-primary-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-step--1 text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <h3 className="text-step-2 font-semibold mb-4">
              Find your wellness community
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              No matter where you are in your wellness journey, there's a place for you in ThriveSpace.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="primary" size="lg">
                Join the Waitlist
              </Button>
              <Button variant="ghost" size="lg">
                Take the Survey
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}