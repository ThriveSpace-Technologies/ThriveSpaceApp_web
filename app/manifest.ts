import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ThriveSpace - Wellness Community',
    short_name: 'ThriveSpace',
    description: 'Most people struggle with health goals alone. ThriveSpace connects you with others on similar journeys.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0062FF',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'en',
    categories: ['health', 'fitness', 'lifestyle', 'social'],
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ],
    screenshots: [
      {
        src: '/screenshot-wide.png',
        sizes: '1280x720',
        type: 'image/png'
      },
      {
        src: '/screenshot-narrow.png',
        sizes: '375x812',
        type: 'image/png'
      }
    ]
  }
}