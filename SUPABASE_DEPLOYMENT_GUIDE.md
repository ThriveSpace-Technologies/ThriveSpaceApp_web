# ThriveSpace Supabase Integration Guide

Using the same Supabase project for both your marketing website and mobile app database.

## Overview

- **Single Supabase Project**: One project for both marketing and production data
- **Separate Tables**: Marketing tables separate from app production tables
- **Role-Based Security**: Different access patterns for web vs mobile
- **Shared Resources**: Users can transition from marketing to app seamlessly

## Benefits of Single Supabase Project

✅ **Cost Effective**: One project, one billing
✅ **User Continuity**: Same user can move from waitlist to app
✅ **Shared Analytics**: Combined insights across marketing and app
✅ **Simplified Management**: Single dashboard for all data
✅ **Easy Data Migration**: Move users from marketing to production tables

---

## Part 1: Database Structure

### Marketing Tables (New)

```sql
-- Survey responses from marketing website
CREATE TABLE marketing_survey_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  social_frustration TEXT,
  platform_interest TEXT,
  app_likelihood TEXT,
  learning_engagement TEXT,
  valuable_features TEXT[], -- Array for multiple selections
  engaging_content TEXT,
  biggest_frustration TEXT,
  solution_fit TEXT,
  age_range TEXT,
  info_source TEXT,
  wellness_goal TEXT,
  user_agent TEXT,
  ip_address INET,
  session_id TEXT
);

-- Marketing website waitlist
CREATE TABLE marketing_waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  source TEXT DEFAULT 'website',
  referral_code TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  is_converted BOOLEAN DEFAULT FALSE, -- Converted to app user
  converted_at TIMESTAMP WITH TIME ZONE,
  priority INTEGER DEFAULT 1 -- 1=normal, 2=high, 3=vip
);

-- Feature requests from marketing
CREATE TABLE marketing_feature_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT,
  feature_title TEXT NOT NULL,
  feature_description TEXT,
  priority TEXT DEFAULT 'Medium',
  use_case TEXT,
  upvotes INTEGER DEFAULT 1,
  status TEXT DEFAULT 'submitted', -- submitted, reviewing, planned, implemented
  category TEXT -- fitness, social, tracking, etc.
);

-- Newsletter subscriptions
CREATE TABLE marketing_newsletter (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  source TEXT DEFAULT 'website',
  preferences JSONB DEFAULT '{}' -- Store preference settings
);

-- Contact form submissions
CREATE TABLE marketing_contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new', -- new, responded, resolved
  replied_at TIMESTAMP WITH TIME ZONE
);
```

### Your Existing Mobile App Tables

Keep all your existing mobile app tables as they are:
- `profiles`
- `workouts`
- `communities`
- `posts`
- `challenges`
- etc.

---

## Part 2: Row Level Security (RLS) Setup

### Marketing Tables Security

```sql
-- Enable RLS on marketing tables
ALTER TABLE marketing_survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_feature_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_newsletter ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_contacts ENABLE ROW LEVEL SECURITY;

-- Allow public inserts for marketing data (anonymous submissions)
CREATE POLICY "Allow anonymous inserts" ON marketing_survey_responses
FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON marketing_waitlist
FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON marketing_feature_requests
FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON marketing_newsletter
FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts" ON marketing_contacts
FOR INSERT TO anon WITH CHECK (true);

-- Admin/authenticated users can read all marketing data
CREATE POLICY "Allow admin read" ON marketing_survey_responses
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow admin read" ON marketing_waitlist
FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow admin read" ON marketing_feature_requests
FOR SELECT TO authenticated USING (true);

-- Public can read feature requests (for voting)
CREATE POLICY "Allow public read feature requests" ON marketing_feature_requests
FOR SELECT TO anon USING (true);
```

### Mobile App Security

Keep your existing RLS policies for mobile app tables unchanged.

---

## Part 3: Frontend Integration

### Step 1: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### Step 2: Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 3: Create Supabase Client

Create `lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for marketing tables
export interface SurveyResponse {
  social_frustration?: string
  platform_interest?: string
  app_likelihood?: string
  learning_engagement?: string
  valuable_features?: string[]
  engaging_content?: string
  biggest_frustration?: string
  solution_fit?: string
  age_range?: string
  info_source?: string
  wellness_goal?: string
}

export interface WaitlistEntry {
  email: string
  name?: string
  source?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
}

export interface FeatureRequest {
  email?: string
  feature_title: string
  feature_description?: string
  priority?: string
  use_case?: string
  category?: string
}
```

### Step 4: Create API Functions

Create `lib/marketing-api.ts`:
```typescript
import { supabase } from './supabase'
import type { SurveyResponse, WaitlistEntry, FeatureRequest } from './supabase'

export async function submitSurvey(data: SurveyResponse) {
  try {
    const { error } = await supabase
      .from('marketing_survey_responses')
      .insert([{
        ...data,
        session_id: generateSessionId(),
        user_agent: navigator.userAgent
      }])

    if (error) throw error

    return { success: true, message: 'Survey submitted successfully!' }
  } catch (error) {
    console.error('Survey submission error:', error)
    return { success: false, message: 'Failed to submit survey. Please try again.' }
  }
}

export async function joinWaitlist(data: WaitlistEntry) {
  try {
    // Check if email already exists
    const { data: existing } = await supabase
      .from('marketing_waitlist')
      .select('email')
      .eq('email', data.email)
      .single()

    if (existing) {
      return { success: false, message: 'Email already registered for waitlist!' }
    }

    const { error } = await supabase
      .from('marketing_waitlist')
      .insert([data])

    if (error) throw error

    return { success: true, message: 'Successfully added to waitlist!' }
  } catch (error) {
    console.error('Waitlist submission error:', error)
    return { success: false, message: 'Failed to join waitlist. Please try again.' }
  }
}

export async function submitFeatureRequest(data: FeatureRequest) {
  try {
    const { error } = await supabase
      .from('marketing_feature_requests')
      .insert([data])

    if (error) throw error

    return { success: true, message: 'Feature request submitted successfully!' }
  } catch (error) {
    console.error('Feature request error:', error)
    return { success: false, message: 'Failed to submit feature request.' }
  }
}

export async function getFeatureRequests() {
  try {
    const { data, error } = await supabase
      .from('marketing_feature_requests')
      .select('*')
      .eq('status', 'submitted')
      .order('upvotes', { ascending: false })
      .limit(20)

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching feature requests:', error)
    return { success: false, data: [] }
  }
}

export async function subscribeNewsletter(email: string, source = 'website') {
  try {
    const { error } = await supabase
      .from('marketing_newsletter')
      .insert([{ email, source }])

    if (error) throw error
    return { success: true, message: 'Subscribed to newsletter!' }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return { success: false, message: 'Failed to subscribe.' }
  }
}

function generateSessionId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}
```

---

## Part 4: Update Components

### Update QuickSurvey Component

```typescript
// In components/forms/QuickSurvey.tsx
import { submitSurvey } from '@/lib/marketing-api'

const handleSubmit = async () => {
  setIsSubmitting(true)
  setSubmitError('')

  try {
    const result = await submitSurvey(surveyData)

    if (result.success) {
      setIsSubmitted(true)
    } else {
      setSubmitError(result.message)
    }
  } catch (error) {
    setSubmitError('Failed to submit survey. Please try again.')
  } finally {
    setIsSubmitting(false)
  }
}
```

### Create Waitlist Component

Create `components/forms/WaitlistForm.tsx`:
```typescript
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { joinWaitlist } from '@/lib/marketing-api'

export function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const result = await joinWaitlist({
      email,
      name: name || undefined,
      source: 'website',
      utm_source: new URLSearchParams(window.location.search).get('utm_source') || undefined,
      utm_medium: new URLSearchParams(window.location.search).get('utm_medium') || undefined,
      utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || undefined,
    })

    setMessage(result.message)
    if (result.success) {
      setEmail('')
      setName('')
    }

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-3 border rounded-lg"
      />
      <input
        type="text"
        placeholder="Name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border rounded-lg"
      />
      <Button
        type="submit"
        isLoading={isSubmitting}
        className="w-full"
      >
        Join Waitlist
      </Button>
      {message && (
        <p className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </form>
  )
}
```

---

## Part 5: Admin Dashboard (Optional)

Create a simple admin page to view marketing data:

### Create `app/admin/page.tsx`:
```typescript
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminDashboard() {
  const [waitlistCount, setWaitlistCount] = useState(0)
  const [surveyCount, setSurveyCount] = useState(0)
  const [featureRequestCount, setFeatureRequestCount] = useState(0)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    const [waitlist, surveys, features] = await Promise.all([
      supabase.from('marketing_waitlist').select('*', { count: 'exact' }),
      supabase.from('marketing_survey_responses').select('*', { count: 'exact' }),
      supabase.from('marketing_feature_requests').select('*', { count: 'exact' })
    ])

    setWaitlistCount(waitlist.count || 0)
    setSurveyCount(surveys.count || 0)
    setFeatureRequestCount(features.count || 0)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Marketing Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800">Waitlist</h3>
          <p className="text-3xl font-bold text-blue-600">{waitlistCount}</p>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800">Survey Responses</h3>
          <p className="text-3xl font-bold text-green-600">{surveyCount}</p>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-800">Feature Requests</h3>
          <p className="text-3xl font-bold text-purple-600">{featureRequestCount}</p>
        </div>
      </div>
    </div>
  )
}
```

---

## Part 6: Deployment to Namecheap

### Build Configuration

Update `next.config.js` for static export:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
}

module.exports = nextConfig
```

### Build and Deploy

1. **Build the project**:
```bash
npm run build
```

2. **Upload to Namecheap** (same process as before):
   - Zip the `out` folder contents
   - Upload to cPanel File Manager
   - Extract to `public_html`

---

## Part 7: Data Migration Strategy

### Moving Users from Marketing to App

When users download your mobile app, you can link their marketing data:

```sql
-- Function to convert waitlist user to app user
CREATE OR REPLACE FUNCTION convert_waitlist_to_user(
  waitlist_email TEXT,
  user_id UUID
) RETURNS VOID AS $$
BEGIN
  -- Mark as converted in waitlist
  UPDATE marketing_waitlist
  SET is_converted = TRUE, converted_at = NOW()
  WHERE email = waitlist_email;

  -- You can add logic here to pre-populate user preferences
  -- based on their survey responses
END;
$$ LANGUAGE plpgsql;
```

---

## Part 8: Analytics and Insights

### Useful Queries for Marketing Analysis

```sql
-- Survey response analysis
SELECT
  platform_interest,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as percentage
FROM marketing_survey_responses
GROUP BY platform_interest;

-- Waitlist growth over time
SELECT
  DATE_TRUNC('day', created_at) as date,
  COUNT(*) as daily_signups,
  SUM(COUNT(*)) OVER (ORDER BY DATE_TRUNC('day', created_at)) as cumulative_signups
FROM marketing_waitlist
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY date;

-- Feature request popularity
SELECT
  category,
  COUNT(*) as requests,
  AVG(upvotes) as avg_upvotes
FROM marketing_feature_requests
GROUP BY category
ORDER BY requests DESC;
```

---

## Benefits of This Approach

✅ **Single Source of Truth**: All user data in one place
✅ **Seamless User Journey**: Marketing → App transition
✅ **Cost Effective**: One Supabase project
✅ **Rich Analytics**: Combined marketing + app insights
✅ **Easy Management**: Single database to maintain
✅ **Scalable**: Can handle both marketing and production load

---

## Security Best Practices

1. **Separate API Keys**: Use different service role keys for different environments
2. **RLS Policies**: Strict policies for production app data
3. **Anonymous Access**: Limited to marketing tables only
4. **Rate Limiting**: Consider implementing rate limiting for marketing endpoints
5. **Data Validation**: Server-side validation for all inputs

Your ThriveSpace project can now use a single Supabase instance for both marketing website data collection and your mobile app's production database!