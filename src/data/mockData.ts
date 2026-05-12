import type { AgentConfig, OrganizationsData, QuickAction } from '../types'

export const mockAgentConfig: AgentConfig = {
  title: 'Agent configuration',
  description: 'WorkVoice agent is not yet generated',
  ctaLabel: 'Add organizations',
}

export const mockOrganizationsData: OrganizationsData = {
  count: 0,
  description: 'Organizations are not yet added to the list',
  ctaLabel: 'Add organizations',
}

export function fetchOrganizations(shouldFail = false): Promise<OrganizationsData> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Failed to load organizations. Please try again.'))
      } else {
        resolve(mockOrganizationsData)
      }
    }, 900)
  })
}

export const mockQuickActions: QuickAction[] = [
  {
    id: 'docs',
    label: 'View docs',
    icon: '📄',
    type: 'link',
    payload: 'https://workvoice.ai/docs',
  },
  {
    id: 'notify',
    label: 'Notify team',
    icon: '🔔',
    type: 'toast',
    payload: 'Team has been notified!',
  },
  {
    id: 'log',
    label: 'Run diagnostics',
    icon: '🔍',
    type: 'console',
    payload: '[WorkVoice] Agent diagnostics: OK — version 1.0.0, region: eu-west-1',
  },
]

/** Simulates an async API call with optional failure mode */
export function fetchAgentConfig(shouldFail = false): Promise<AgentConfig> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Failed to load agent configuration. Please try again.'))
      } else {
        resolve(mockAgentConfig)
      }
    }, 1200)
  })
}
