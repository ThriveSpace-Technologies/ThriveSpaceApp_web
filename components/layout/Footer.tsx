'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Linkedin } from 'lucide-react'
import { cn, getMotionProps } from '@/lib/utils'

interface SocialLink {
  label: string
  href: string
  icon: React.ComponentType<any>
}

const socialLinks: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/thrivespace',
    icon: Linkedin,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/thrivespace',
    icon: Instagram,
  },
]

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          {...getMotionProps()}
        >
          {/* Brand Section */}
          <motion.div
            variants={itemVariants}
          >
            <Link href="/" className="inline-block mb-4">
              <div className="text-step-2 font-bold text-white">
                ThriveSpace
              </div>
            </Link>
            <p className="text-gray-300 text-step-0 mb-6 max-w-md leading-relaxed">
              Building the world's most supportive wellness community.
              Your health, powered by connection and shared progress.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-gray-400 text-step--1">
              <p>Support: support@thrivespaceapp.com</p>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-step-1 font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className={cn(
                      'w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center',
                      'text-gray-300 hover:text-white hover:bg-primary-500 transition-all duration-200'
                    )}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    {...getMotionProps()}
                  >
                    <Icon size={18} />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          {...getMotionProps()}
        >
          <p className="text-gray-400 text-step--1 mb-4 md:mb-0">
            © {currentYear} ThriveSpace. All rights reserved. Building wellness communities worldwide.
          </p>

          <div className="flex items-center space-x-4 text-step--1 text-gray-400">
            <span>Made with</span>
            <motion.span
              className="text-red-400"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
              {...getMotionProps()}
            >
              ♥
            </motion.span>
            <span>for healthier communities</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}