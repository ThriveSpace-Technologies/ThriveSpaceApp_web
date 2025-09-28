'use client'

import { motion } from 'framer-motion'
import { X, CheckCircle, Users, Target, TrendingUp, Heart, Zap, Shield } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { getMotionProps, motionVariants } from '@/lib/utils'

export function ProblemValue() {
  const containerVariants = motionVariants.staggerContainer(0.1)
  const itemVariants = motionVariants.fadeInUp

  const problems = [
    {
      icon: X,
      title: 'You start strong, then fade away',
      description: 'Without accountability partners, motivation dwindles after the initial excitement wears off'
    },
    {
      icon: X,
      title: 'Small setbacks feel like failures',
      description: 'When struggling alone, missing one workout or healthy meal can derail your entire progress'
    },
    {
      icon: X,
      title: 'No one celebrates your wins',
      description: 'Progress happens in isolation, making it harder to stay motivated through tough days'
    }
  ]

  const solutions = [
    {
      icon: Users,
      title: 'Built-in accountability partners',
      description: 'Check-ins with people who genuinely care about your progress keep you consistent'
    },
    {
      icon: Target,
      title: 'Setbacks become learning moments',
      description: 'Community support helps you bounce back faster and see challenges as growth opportunities'
    },
    {
      icon: Heart,
      title: 'Every victory is shared',
      description: 'Your progress matters to others, creating positive momentum that carries you forward'
    }
  ]

  const benefits = [
    {
      icon: TrendingUp,
      stat: '3x',
      label: 'Higher success rate',
      description: 'Community support significantly improves long-term habit formation'
    },
    {
      icon: Zap,
      stat: '85%',
      label: 'Feel more motivated',
      description: 'Shared accountability creates sustainable motivation'
    },
    {
      icon: Shield,
      stat: '90%',
      label: 'Stick with habits',
      description: 'Social connections make healthy behaviors more consistent'
    }
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          {...getMotionProps()}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              The Problem & Our Solution
            </Badge>
            <h2 className="text-step-3 font-bold gradient-text mb-4">
              Why do 92% of wellness goals fail?
            </h2>
            <p className="text-step-1 text-gray-600 max-w-2xl mx-auto">
              The answer isn't willpower—it's connection. People succeed when they have
              genuine support, shared accountability, and communities that understand their journey.
            </p>
          </motion.div>

          {/* Problem vs Solution Grid */}
          <div className="grid gap-12 mb-20 lg:grid-cols-2">
            {/* Problems Column */}
            <motion.div variants={itemVariants}>
              <div className="text-center mb-8">
                <h3 className="text-step-2 font-semibold text-gray-900 mb-3">
                  The Challenge
                </h3>
                <p className="text-gray-600">
                  Why traditional wellness approaches often fail
                </p>
              </div>

              <div className="space-y-6">
                {problems.map((problem, index) => {
                  const Icon = problem.icon
                  return (
                    <Card key={index} variant="outline" className="border-red-200 bg-red-50/30">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0" aria-hidden="true">
                            <Icon size={20} className="text-red-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                              {problem.title}
                            </h4>
                            <p className="text-gray-600 text-step-0">
                              {problem.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </motion.div>

            {/* Solutions Column */}
            <motion.div variants={itemVariants}>
              <div className="text-center mb-8">
                <h3 className="text-step-2 font-semibold text-primary-900 mb-3">
                  Our Approach
                </h3>
                <p className="text-gray-600">
                  How ThriveSpace creates lasting change
                </p>
              </div>

              <div className="space-y-6">
                {solutions.map((solution, index) => {
                  const Icon = solution.icon
                  return (
                    <Card key={index} variant="outline" className="border-primary-200 bg-primary-50/30">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0" aria-hidden="true">
                            <Icon size={20} className="text-primary-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                              {solution.title}
                            </h4>
                            <p className="text-gray-600 text-step-0">
                              {solution.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Benefits Stats */}
          <motion.div variants={itemVariants}>
            <div className="text-center mb-12">
              <h3 className="text-step-2 font-semibold mb-3">
                The ThriveSpace Difference
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Community-powered wellness delivers measurably better outcomes
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="text-center"
                  >
                    <motion.div
                      initial="rest"
                      whileHover="hover"
                      whileTap="tap"
                      variants={motionVariants.cardHover}
                    >
                      <Card variant="elevated">
                        <CardContent className="p-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                          <Icon size={24} className="text-white" />
                        </div>

                        <div className="text-3xl font-bold text-primary-600 mb-2">
                          {benefit.stat}
                        </div>

                        <h4 className="font-semibold text-gray-900 mb-3">
                          {benefit.label}
                        </h4>

                        <p className="text-gray-600 text-step--1 leading-relaxed">
                          {benefit.description}
                        </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-step-2 font-semibold mb-4">
                Ready to transform your wellness journey?
              </h3>
              <p className="text-gray-600 mb-6">
                Join others who are building healthier habits through community support.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex -space-x-2" aria-hidden="true">
                  {Array.from({ length: 4 }, (_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-gradient-to-br from-primary-400 to-purple-500 rounded-full border-2 border-white flex items-center justify-center text-white text-sm font-medium"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-step--1 text-gray-600">
                  <span className="font-medium">500+ people</span> are already building healthier habits together
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}