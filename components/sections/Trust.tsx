'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Users, Award, Heart, CheckCircle, Eye, MessageCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { getMotionProps } from '@/lib/utils'

export function Trust() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const trustFactors = [
    {
      icon: Shield,
      title: 'Privacy by Design',
      description: 'Your wellness data is encrypted and never shared without your explicit permission.',
      details: ['End-to-end encryption', 'No data selling', 'Granular privacy controls']
    },
    {
      icon: Users,
      title: 'Community-First',
      description: 'Built by wellness enthusiasts who understand the importance of supportive communities.',
      details: ['Member-driven development', 'Community feedback integration', 'User-centric design']
    },
    {
      icon: Heart,
      title: 'Evidence-Based',
      description: 'Our approach is grounded in peer-reviewed research on behavior change and social support.',
      details: ['Scientific foundation', 'Proven methodologies', 'Expert consultation']
    },
    {
      icon: CheckCircle,
      title: 'Transparent Development',
      description: 'We build in the open, sharing our progress and incorporating community feedback.',
      details: ['Public roadmap', 'Regular updates', 'Open feedback channels']
    }
  ]

  const commitments = [
    {
      icon: Lock,
      title: 'Data Security',
      description: 'Industry-standard security measures protect your personal information',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Eye,
      title: 'Full Transparency',
      description: 'Clear terms of service and privacy policy with no hidden clauses',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: MessageCircle,
      title: 'Responsive Support',
      description: 'Real humans ready to help with questions or concerns',
      color: 'text-purple-600 bg-purple-100'
    },
    {
      icon: Award,
      title: 'Quality Standards',
      description: 'Rigorous testing and quality assurance for reliable experience',
      color: 'text-orange-600 bg-orange-100'
    }
  ]

  const principles = [
    'Your wellness data belongs to you, always',
    'Communities should feel safe and supportive',
    'Privacy controls should be simple and powerful',
    'Wellness is personal, and platforms should respect that',
    'Technology should enhance human connection, not replace it',
    'Building healthy habits is a journey, not a destination'
  ]

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50/30">
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
              Built on Trust
            </Badge>
            <h2 className="text-step-3 font-bold gradient-text mb-4">
              Your wellness, your privacy, your control
            </h2>
            <p className="text-step-1 text-gray-600 max-w-3xl mx-auto leading-relaxed">
              ThriveSpace is built on the foundation of trust, privacy, and genuine care for your wellness journey.
              We believe technology should empower, not exploit, your health goals.
            </p>
          </motion.div>

          {/* Trust Factors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {trustFactors.map((factor, index) => {
              const Icon = factor.icon
              return (
                <motion.div key={index} variants={itemVariants} className="h-full">
                  <Card variant="elevated" hover className="h-full text-center flex flex-col">
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon size={24} className="text-primary-600" />
                      </div>

                      <h3 className="font-semibold text-gray-900 mb-3">
                        {factor.title}
                      </h3>

                      <p className="text-gray-600 text-step-0 mb-4 leading-relaxed flex-1">
                        {factor.description}
                      </p>

                      <ul className="text-step--1 text-gray-500 space-y-2">
                        {factor.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-primary-500 rounded-full flex-shrink-0 mt-2" />
                            <span className="text-left">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Commitments Section */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="text-center mb-12">
              <h3 className="text-step-2 font-semibold mb-3">
                Our commitments to you
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These aren't just promises—they're the principles that guide every decision we make
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {commitments.map((commitment, index) => {
                const Icon = commitment.icon
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300"
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${commitment.color}`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {commitment.title}
                      </h4>
                      <p className="text-gray-600 text-step-0">
                        {commitment.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Core Principles */}
          <motion.div variants={itemVariants}>
            <Card variant="elevated" className="bg-white">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-step-2 font-semibold mb-3">
                    Our core principles
                  </h3>
                  <p className="text-gray-600">
                    The beliefs that drive how we build ThriveSpace
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {principles.map((principle, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <CheckCircle size={18} className="text-primary-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700 text-step-0 leading-relaxed">
                        {principle}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Trust CTA */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-step-2 font-semibold mb-4">
                Building trust through transparency
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We believe trust is earned through consistent action, not just words.
                As we build ThriveSpace, we're committed to being open about our processes,
                decisions, and the ways we protect your wellness journey.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="mailto:support@thrivespaceapp.com"
                  className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                >
                  support@thrivespaceapp.com
                </a>
                <span className="hidden sm:block text-gray-300">•</span>
                <a
                  href="/privacy"
                  className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                >
                  Privacy Policy
                </a>
                <span className="hidden sm:block text-gray-300">•</span>
                <a
                  href="/terms"
                  className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}