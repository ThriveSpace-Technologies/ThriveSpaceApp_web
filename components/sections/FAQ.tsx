'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { cn, getMotionProps } from '@/lib/utils'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: 'general' | 'privacy' | 'features' | 'community'
}

export function FAQ() {
  const [openItem, setOpenItem] = useState<string | null>('what-is-thrivespace')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const faqItems: FAQItem[] = [
    {
      id: 'what-is-thrivespace',
      question: 'What makes ThriveSpace different from other wellness apps?',
      answer: 'ThriveSpace is built around a simple truth: people succeed with wellness goals when they have genuine community support. Unlike apps focused on individual tracking, we create meaningful connections between people with similar goals. You join small, supportive groups, share real progress (not just numbers), celebrate wins together, and help each other through challenging times. It\'s the difference between working out alone and having a workout buddy—but for your entire wellness journey.',
      category: 'general'
    },
    {
      id: 'privacy-and-data',
      question: 'How do you protect my privacy and personal data?',
      answer: 'Privacy is fundamental to ThriveSpace. You control exactly what you share and with whom. We use industry-standard encryption, never sell your data to third parties, and give you granular privacy controls. You can choose to share progress publicly, with specific groups, or keep it completely private. We believe wellness is personal, and your data should remain under your control.',
      category: 'privacy'
    },
    {
      id: 'community-moderation',
      question: 'How do you ensure communities remain supportive and positive?',
      answer: 'We\'ve built ThriveSpace around positive reinforcement and mutual support. Our community guidelines emphasize encouragement over judgment, and we have moderation tools to maintain safe, welcoming spaces. Members can report inappropriate content, and we use both automated systems and human moderators to maintain community standards. The goal is to create spaces where everyone feels comfortable sharing their wellness journey.',
      category: 'community'
    },
    {
      id: 'types-of-wellness',
      question: 'What types of wellness goals does ThriveSpace support?',
      answer: 'ThriveSpace supports all dimensions of wellness - physical fitness, nutrition, mental health, mindfulness, sleep, stress management, and more. Whether you\'re training for a marathon, trying to eat healthier, building meditation habits, or managing chronic conditions, you can find or create communities around your specific goals. We believe wellness is holistic and personal to each individual.',
      category: 'features'
    },
    {
      id: 'getting-started',
      question: 'How do I get started when ThriveSpace launches?',
      answer: 'Getting started is simple! After joining the waitlist, you\'ll receive early access when we launch. You\'ll complete a brief onboarding to understand your wellness goals and preferences, then we\'ll suggest relevant communities to join. You can also create your own group if you have specific interests. The platform is designed to be intuitive - you can start participating in communities and tracking progress right away.',
      category: 'general'
    },
    {
      id: 'cost-and-pricing',
      question: 'Will ThriveSpace be free to use?',
      answer: 'We\'re committed to making community-powered wellness accessible to everyone. ThriveSpace will have a robust free tier that includes joining communities, basic progress tracking, and participation in challenges. We\'ll also offer premium features for users who want advanced analytics, coach connections, or additional customization options. Our goal is to ensure the core community experience remains free.',
      category: 'general'
    },
    {
      id: 'launch-timeline',
      question: 'When will ThriveSpace be available?',
      answer: 'We\'re currently in active development and working closely with early community members to shape the platform. We expect to launch our beta version in early 2025, with broader availability following shortly after. By joining our waitlist, you\'ll be among the first to access ThriveSpace and help us refine the experience during our beta period.',
      category: 'general'
    },
    {
      id: 'beta-access',
      question: 'How can I get early access to try ThriveSpace?',
      answer: 'Join our waitlist to be first in line for beta access! We\'ll be rolling out invites to waitlist members starting in early 2025. Beta users will get free access to all features, direct input on development priorities, and the chance to help shape the community culture from day one. Your feedback during beta will directly influence the features we build.',
      category: 'general'
    },
    {
      id: 'community-safety',
      question: 'How do you ensure communities stay supportive and positive?',
      answer: 'Community safety is our top priority. We start with clear community guidelines focused on encouragement and mutual support. Every group has community moderators, and we provide easy reporting tools for any issues. Our platform is designed around positive reinforcement—celebrating progress rather than judgment. We also use smart matching to connect people with similar goals and values.',
      category: 'community'
    }
  ]

  const toggleItem = (itemId: string) => {
    setOpenItem(openItem === itemId ? null : itemId)
  }

  const categoryColors = {
    general: 'bg-blue-50 text-blue-700',
    privacy: 'bg-green-50 text-green-700',
    features: 'bg-purple-50 text-purple-700',
    community: 'bg-orange-50 text-orange-700'
  }

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto max-w-4xl">
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
              Frequently Asked Questions
            </Badge>
            <h2 className="text-step-3 font-bold gradient-text mb-4">
              Everything you need to know
            </h2>
            <p className="text-step-1 text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Have questions about ThriveSpace? We've got answers. If you don't find what you're
              looking for, feel free to reach out to us directly.
            </p>
          </motion.div>

          {/* FAQ Items */}
          <motion.div variants={itemVariants} className="space-y-4">
            {faqItems.map((item, index) => (
              <Card
                key={item.id}
                variant="outline"
                className={cn(
                  'transition-all duration-300 cursor-pointer hover:shadow-md',
                  openItem === item.id && 'shadow-md border-primary-200'
                )}
              >
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset rounded-card"
                    aria-expanded={openItem === item.id}
                    aria-controls={`faq-content-${item.id}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge
                            size="sm"
                            className={cn(
                              'text-xs',
                              categoryColors[item.category]
                            )}
                          >
                            {item.category}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-gray-900 text-step-0 leading-tight">
                          {item.question}
                        </h3>
                      </div>

                      <motion.div
                        animate={{ rotate: openItem === item.id ? 180 : 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="flex-shrink-0"
                        {...getMotionProps()}
                      >
                        <ChevronDown
                          size={20}
                          className={cn(
                            'transition-colors duration-200',
                            openItem === item.id ? 'text-primary-500' : 'text-gray-400'
                          )}
                        />
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {openItem === item.id && (
                      <motion.div
                        id={`faq-content-${item.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        {...getMotionProps()}
                      >
                        <div className="px-6 pb-6">
                          <div className="pt-4 border-t border-gray-100">
                            <p className="text-gray-600 text-step-0 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={itemVariants} className="mt-16">
            <Card variant="elevated" className="bg-gradient-to-r from-primary-50 to-purple-50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HelpCircle size={24} className="text-primary-600" />
                </div>

                <h3 className="text-step-2 font-semibold mb-3">
                  Still have questions?
                </h3>

                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  We're here to help! Reach out to our team and we'll get back to you as soon as possible.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a
                    href="mailto:support@thrivespace.com"
                    className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                  >
                    support@thrivespace.com
                  </a>
                  <span className="hidden sm:block text-gray-300">•</span>
                  <a
                    href="mailto:hello@thrivespace.com"
                    className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                  >
                    hello@thrivespace.com
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}