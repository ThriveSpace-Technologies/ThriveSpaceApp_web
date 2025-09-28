// Common TypeScript types for the application

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export type UserRole =
  | 'individual'
  | 'coach'
  | 'team-lead'
  | 'healthcare'
  | 'other'

export interface WaitlistEntry {
  id: string
  email: string
  name: string
  role: UserRole
  source: string
  createdAt: Date
}

export interface SurveyResponse {
  id: string
  userId?: string
  responses: Record<string, string | string[]>
  createdAt: Date
  ipAddress?: string
}

export interface FeatureRequest {
  id: string
  title: string
  description: string
  category: string
  votes: number
  status: 'proposed' | 'under-review' | 'planned' | 'in-progress' | 'completed' | 'rejected'
  createdBy?: string
  createdAt: Date
  updatedAt: Date
}

export interface FeatureVote {
  id: string
  featureId: string
  userId?: string
  ipAddress?: string
  createdAt: Date
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// Form validation types
export interface ValidationError {
  field: string
  message: string
}

export interface FormState<T = any> {
  data: T
  errors: Record<string, string>
  isSubmitting: boolean
  isSubmitted: boolean
}

// Animation and motion types
export interface AnimationConfig {
  duration: number
  delay?: number
  ease?: number[] | string
  repeatDelay?: number
  repeat?: number
}

export interface MotionVariant {
  initial?: any
  animate?: any
  exit?: any
  transition?: AnimationConfig
}

// Theme and styling types
export type ThemeMode = 'light' | 'dark'

export type ComponentSize = 'sm' | 'md' | 'lg'

export type ComponentVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}