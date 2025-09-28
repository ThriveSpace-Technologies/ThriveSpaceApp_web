'use client'

import { useState } from 'react'
import { Navbar, Footer } from '@/components/layout'
import { Badge, Card, CardContent } from '@/components/ui'
import { WaitlistForm, QuickSurvey, FeatureRequest } from '@/components/forms'
import { Hero, ProblemValue, UseCases, Trust } from '@/components/sections'
import { GuidedTourModal, InteractiveDemo } from '@/components/interactive'
import { websiteSchema, organizationSchema, webApplicationSchema, faqSchema, breadcrumbSchema } from '@/lib/structured-data'

export default function HomePage() {
  const [isTourModalOpen, setIsTourModalOpen] = useState(false)
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            websiteSchema,
            organizationSchema,
            webApplicationSchema,
            faqSchema,
            breadcrumbSchema
          ])
        }}
      />

      {/* Skip Navigation Links */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md z-50 font-medium"
      >
        Skip to main content
      </a>
      <a
        href="#waitlist"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-40 bg-primary-600 text-white px-4 py-2 rounded-md z-50 font-medium"
      >
        Skip to waitlist
      </a>

      <Navbar />

      <main id="main-content">
        {/* Hero Section */}
        <Hero
          onJoinWaitlist={() => scrollToSection('#waitlist')}
          onTryTour={() => setIsTourModalOpen(true)}
        />

        {/* Problem & Value Proposition */}
        <ProblemValue />

        {/* Use Cases for Different Personas */}
        <UseCases />

        {/* Interactive Demo Section */}
        <section className="section-padding bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <Badge variant="info" className="mb-4">Interactive Preview</Badge>
              <h2 className="text-step-3 font-bold gradient-text mb-4">
                Experience ThriveSpace Features
              </h2>
              <p className="text-step-1 text-gray-600 max-w-2xl mx-auto">
                Get a hands-on preview of how ThriveSpace will work. Explore communities,
                track progress, and see how social support transforms wellness.
              </p>
            </div>
            <InteractiveDemo />
          </div>
        </section>

        {/* Trust & Privacy Section */}
        <Trust />

        {/* Waitlist Section */}
        <section id="waitlist" className="section-padding bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-step-3 font-bold gradient-text mb-4">
                Join the ThriveSpace Community
              </h2>
              <p className="text-step-1 text-gray-600 max-w-2xl mx-auto">
                Be among the first to experience community-powered wellness.
                Join our waitlist to get early access and help shape the platform.
              </p>
            </div>
            <WaitlistForm />
          </div>
        </section>

        {/* Survey Section */}
        <section id="survey" className="section-padding bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-step-3 font-bold gradient-text mb-4">
                Help Shape ThriveSpace
              </h2>
              <p className="text-step-1 text-gray-600 max-w-2xl mx-auto">
                Your input is invaluable. Take our quick survey to help us understand
                what features matter most to your wellness journey.
              </p>
            </div>
            <QuickSurvey />
          </div>
        </section>


        {/* Feature Request Section */}
        <section id="features" className="section-padding bg-white">
          <div className="container mx-auto">
            <FeatureRequest />
          </div>
        </section>

      </main>

      <Footer />

      {/* Interactive Modals */}
      <GuidedTourModal
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
        onComplete={() => scrollToSection('#waitlist')}
      />
    </>
  )
}