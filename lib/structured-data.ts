/**
 * Structured data schemas for SEO optimization
 */

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ThriveSpace",
  "alternateName": "ThriveSpace Wellness Community",
  "url": "https://thrivespace.com",
  "description": "Most people struggle with health goals alone. ThriveSpace connects you with others on similar journeys, turning individual challenges into shared victories.",
  "inLanguage": "en-US",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://thrivespace.com/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ThriveSpace",
  "url": "https://thrivespace.com",
  "logo": "https://thrivespace.com/logo.png",
  "description": "Community-powered wellness platform that helps people achieve their health goals through accountability and support.",
  "foundingDate": "2024",
  "sameAs": [
    "https://twitter.com/thrivespace",
    "https://linkedin.com/company/thrivespace"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "support@thrivespace.com",
    "availableLanguage": ["English"]
  }
}

export const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "ThriveSpace",
  "url": "https://thrivespace.com",
  "description": "Community-powered wellness platform that helps people achieve their health goals through accountability and support.",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Community wellness groups",
    "Progress tracking",
    "Habit formation support",
    "Peer accountability",
    "Wellness challenges"
  ],
  "screenshot": "https://thrivespace.com/screenshot.png"
}

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What makes ThriveSpace different from other wellness apps?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ThriveSpace is built around a simple truth: people succeed with wellness goals when they have genuine community support. Unlike apps focused on individual tracking, we create meaningful connections between people with similar goals."
      }
    },
    {
      "@type": "Question",
      "name": "How do you protect my privacy and personal data?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Privacy is fundamental to ThriveSpace. You control exactly what you share and with whom. We use industry-standard encryption, never sell your data to third parties, and give you granular privacy controls."
      }
    },
    {
      "@type": "Question",
      "name": "Will ThriveSpace be free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We're committed to making community-powered wellness accessible to everyone. ThriveSpace will have a robust free tier that includes joining communities, basic progress tracking, and participation in challenges."
      }
    }
  ]
}

export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://thrivespace.com"
    }
  ]
}