export interface OrganizationsData {
  count: number
  description: string
  ctaLabel: string
}

export interface AgentConfig {
  title: string
  description: string
  ctaLabel: string
  illustrationUrl?: string
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface QuickAction {
  id: string
  label: string
  icon: string
  type: 'link' | 'toast' | 'console'
  payload?: string
}

export interface Campaign {
  name: string
  date: string
}
