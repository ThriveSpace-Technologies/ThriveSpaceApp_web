'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play, Users, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cn, getMotionProps, motionVariants } from '@/lib/utils'

interface HeroProps {
  onJoinWaitlist?: () => void
  onTryTour?: () => void
}

export function Hero({ onJoinWaitlist, onTryTour }: HeroProps) {
  const containerVariants = motionVariants.staggerContainer(0.12)
  const itemVariants = motionVariants.fadeInUp

  const stats = [
    { icon: Users, label: '500+ early supporters', value: '500+' },
    { icon: TrendingUp, label: 'Growing community', value: '↗️' },
  ]

  return (
    <section className="relative min-h-[100dvh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-primary-50/30 to-purple-50/50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          {...getMotionProps()}
        >
          {/* Launch Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <Badge
              variant="info"
              size="lg"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Building in public • Join the journey
            </Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-step-4 font-bold mb-6 leading-[1.1] tracking-tight"
          >
            Wellness works better{' '}
            <span className="gradient-text">together</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-step-1 text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Most people struggle with health goals alone. ThriveSpace connects you with others
            on similar journeys, turning individual challenges into shared victories through
            community accountability and genuine support.
          </motion.p>

          {/* Key Value Points */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6 mb-10 text-step-0 text-gray-600"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full" aria-hidden="true" />
              <span>Find your wellness tribe</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full" aria-hidden="true" />
              <span>Share wins, overcome setbacks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full" aria-hidden="true" />
              <span>Sustainable habits through connection</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 justify-center items-center mb-12 max-w-sm mx-auto sm:max-w-none sm:flex-row"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={onJoinWaitlist}
              rightIcon={<ArrowRight size={18} />}
              className="w-full sm:w-auto sm:min-w-[200px]"
            >
              Join Waitlist
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={onTryTour}
              leftIcon={<Play size={18} />}
              className="w-full sm:w-auto sm:min-w-[200px]"
            >
              See How It Works
            </Button>
          </motion.div>

          {/* Social Proof Stats */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center gap-8 text-center"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Icon size={20} className="text-primary-600" />
                  </div>
                  <div className="text-left">
                    <div className="text-step-1 font-semibold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-step--1 text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Enhanced Floating Elements - Hidden on mobile for better performance */}
        <motion.div
          className="absolute top-1/4 left-10 w-16 h-16 bg-primary-100 rounded-full opacity-60 hidden sm:block"
          animate={{
            y: [0, -12, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
          aria-hidden="true"
          {...getMotionProps(true, { enableGPU: true })}
        />

        <motion.div
          className="absolute bottom-1/4 right-10 w-12 h-12 bg-purple-100 rounded-full opacity-60 hidden sm:block"
          animate={{
            y: [0, 8, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          aria-hidden="true"
          {...getMotionProps(true, { enableGPU: true })}
        />

        <motion.div
          className="absolute top-1/3 right-1/4 w-8 h-8 bg-green-100 rounded-full opacity-40 hidden lg:block"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
            delay: 1
          }}
          aria-hidden="true"
          {...getMotionProps(true, { enableGPU: true })}
        />
      </div>
    </section>
  )
}