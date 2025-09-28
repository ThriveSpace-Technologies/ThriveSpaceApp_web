'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Users, TrendingUp, MessageCircle, Award, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { cn, getMotionProps } from '@/lib/utils'

interface DemoFeature {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  component: React.ReactNode
  color: string
}

export function InteractiveDemo() {
  const [activeFeature, setActiveFeature] = useState<string>('community')
  const [isPlaying, setIsPlaying] = useState(false)

  const demoFeatures: DemoFeature[] = [
    {
      id: 'community',
      title: 'Join Communities',
      description: 'Connect with like-minded wellness enthusiasts',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      component: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Your Communities</h4>
          </div>

          {[
            { name: 'Morning Runners', members: 127, activity: '2 new posts', color: 'bg-blue-500' },
            { name: 'Mindful Eating', members: 89, activity: 'Challenge active', color: 'bg-green-500' },
            { name: 'Yoga Beginners', members: 156, activity: 'Live session now', color: 'bg-purple-500', isLive: true },
          ].map((community, index) => (
            <motion.div
              key={community.name}
              className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-primary-200 transition-colors duration-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              {...getMotionProps()}
            >
              <div className={`w-12 h-12 ${community.color} rounded-full flex items-center justify-center text-white font-medium`}>
                {community.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{community.name}</span>
                  {community.isLive && <Badge variant="danger" size="sm">Live</Badge>}
                </div>
                <div className="text-sm text-gray-600">
                  {community.members} members • {community.activity}
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </motion.div>
          ))}
        </div>
      )
    },
    {
      id: 'progress',
      title: 'Track Progress',
      description: 'Monitor habits and celebrate achievements',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      component: (
        <div className="space-y-6">
          <div className="text-center">
            <h4 className="font-semibold mb-2">Your Wellness Journey</h4>
            <p className="text-sm text-gray-600">Week of March 4-10</p>
          </div>

          {/* Habit Tracker */}
          <div className="space-y-4">
            {[
              { habit: 'Morning Walk', streak: 12, progress: 6, goal: 7, color: 'bg-blue-500' },
              { habit: 'Meditation', streak: 8, progress: 5, goal: 7, color: 'bg-purple-500' },
              { habit: 'Water Intake', streak: 15, progress: 7, goal: 7, color: 'bg-cyan-500' },
            ].map((item, index) => (
              <motion.div
                key={item.habit}
                className="p-4 bg-white rounded-lg border border-gray-100"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                {...getMotionProps()}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="font-medium">{item.habit}</span>
                    <div className="text-xs text-gray-500">
                      🔥 {item.streak}-day streak
                    </div>
                  </div>
                  <Badge variant="success">{item.progress}/{item.goal}</Badge>
                </div>

                {/* Progress Dots */}
                <div className="flex gap-1">
                  {Array.from({ length: item.goal }, (_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'w-6 h-6 rounded-full transition-colors duration-300',
                        i < item.progress ? item.color : 'bg-gray-200'
                      )}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'social',
      title: 'Social Support',
      description: 'Give and receive encouragement from your community',
      icon: MessageCircle,
      color: 'from-pink-500 to-rose-500',
      component: (
        <div className="space-y-4">
          <h4 className="font-semibold">Community Feed</h4>

          {[
            {
              user: 'Sarah M.',
              avatar: 'S',
              action: 'completed their first 10K run!',
              time: '2 min ago',
              likes: 12,
              comments: 3,
              color: 'bg-pink-500'
            },
            {
              user: 'Mike R.',
              avatar: 'M',
              action: 'reached a 30-day meditation streak',
              time: '1 hour ago',
              likes: 8,
              comments: 5,
              color: 'bg-blue-500'
            },
            {
              user: 'Emma L.',
              avatar: 'E',
              action: 'shared a healthy recipe',
              time: '3 hours ago',
              likes: 15,
              comments: 7,
              color: 'bg-green-500'
            }
          ].map((post, index) => (
            <motion.div
              key={post.user}
              className="p-4 bg-white rounded-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              {...getMotionProps()}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 ${post.color} rounded-full flex items-center justify-center text-white font-medium text-sm`}>
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <div className="text-sm">
                    <span className="font-medium">{post.user}</span> {post.action}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{post.time}</div>

                  <div className="flex items-center gap-4 mt-3">
                    <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-pink-500 transition-colors">
                      ❤️ {post.likes}
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-500 transition-colors">
                      💬 {post.comments}
                    </button>
                    <button className="text-sm text-gray-600 hover:text-green-500 transition-colors">
                      🎉 Celebrate
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )
    },
    {
      id: 'challenges',
      title: 'Community Challenges',
      description: 'Join team challenges and friendly competitions',
      icon: Award,
      color: 'from-orange-500 to-yellow-500',
      component: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Active Challenges</h4>
            <p className="text-sm text-gray-600">Compete with friends and stay motivated</p>
          </div>

          {[
            {
              title: '30-Day Mindfulness',
              participants: 47,
              timeLeft: '12 days left',
              progress: 60,
              position: 3,
              color: 'bg-purple-500'
            },
            {
              title: 'Steps Challenge',
              participants: 124,
              timeLeft: '3 days left',
              progress: 85,
              position: 8,
              color: 'bg-blue-500'
            }
          ].map((challenge, index) => (
            <motion.div
              key={challenge.title}
              className="p-4 bg-white rounded-lg border border-gray-100"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              {...getMotionProps()}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h5 className="font-medium">{challenge.title}</h5>
                  <div className="text-sm text-gray-600">
                    {challenge.participants} participants • {challenge.timeLeft}
                  </div>
                </div>
                <Badge variant="info" size="sm">#{challenge.position}</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Your Progress</span>
                  <span>{challenge.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <motion.div
                    className={`h-3 rounded-full ${challenge.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${challenge.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    {...getMotionProps()}
                  />
                </div>
              </div>
            </motion.div>
          ))}

        </div>
      )
    }
  ]

  const activeFeatureData = demoFeatures.find(f => f.id === activeFeature) || demoFeatures[0]
  const Icon = activeFeatureData.icon

  const handleFeatureClick = (featureId: string) => {
    setActiveFeature(featureId)
    setIsPlaying(true)

    // Reset playing state after animation
    setTimeout(() => setIsPlaying(false), 1000)
  }

  return (
    <Card variant="elevated" className="w-full max-w-6xl mx-auto overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary-50 to-purple-50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <Play size={24} className="text-primary-600" />
          </div>
          <div>
            <CardTitle className="text-step-2">Interactive Preview</CardTitle>
            <p className="text-gray-600">Explore ThriveSpace features before launch</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid lg:grid-cols-3">
          {/* Feature Tabs */}
          <div className="lg:border-r border-gray-100 bg-gray-50">
            <div className="p-6">
              <h3 className="font-semibold mb-4">Platform Features</h3>
              <div className="space-y-2">
                {demoFeatures.map((feature) => {
                  const FeatureIcon = feature.icon
                  return (
                    <button
                      key={feature.id}
                      onClick={() => handleFeatureClick(feature.id)}
                      className={cn(
                        'w-full text-left p-4 rounded-lg transition-all duration-200',
                        'hover:bg-white hover:shadow-sm',
                        {
                          'bg-white shadow-sm border-l-4 border-primary-500': activeFeature === feature.id,
                          'bg-transparent': activeFeature !== feature.id
                        }
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'w-8 h-8 rounded-lg flex items-center justify-center',
                          activeFeature === feature.id ? 'bg-primary-100' : 'bg-gray-200'
                        )}>
                          <FeatureIcon
                            size={16}
                            className={cn(
                              activeFeature === feature.id ? 'text-primary-600' : 'text-gray-500'
                            )}
                          />
                        </div>
                        <div className="flex-1">
                          <div className={cn(
                            'font-medium text-sm',
                            activeFeature === feature.id ? 'text-gray-900' : 'text-gray-700'
                          )}>
                            {feature.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {feature.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Feature Demo */}
          <div className="lg:col-span-2">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 bg-gradient-to-r ${activeFeatureData.color} rounded-lg flex items-center justify-center`}>
                  <Icon size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">{activeFeatureData.title}</h3>
                  <p className="text-sm text-gray-600">{activeFeatureData.description}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 min-h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    {...getMotionProps()}
                  >
                    {activeFeatureData.component}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}