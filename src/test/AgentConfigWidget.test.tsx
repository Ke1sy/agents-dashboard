import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { AgentConfigCard } from '../components/Card'
import { useAsyncFetch } from '../hooks/useAsyncFetch'
import { fetchAgentConfig } from '../data/mockData'

// Wrapper to simulate page-level fetching and pass results as props
function AgentConfigWidget({
  onToast,
  simulateError,
}: {
  onToast: (m: string) => void
  simulateError?: boolean
}) {
  const { data, status, errorMsg, retry } = useAsyncFetch(
    () => fetchAgentConfig(Boolean(simulateError)),
    [simulateError]
  )
  return (
    // pass fetched data to the props-only AgentConfigCard
    <AgentConfigCard
      onToast={onToast}
      data={data}
      status={status}
      errorMsg={errorMsg}
      onRetry={retry}
    />
  )
}
import QuickActions from '../components/QuickActions/QuickActions'
import { mockQuickActions } from '../data/mockData'

// ── AgentConfigWidget ──────────────────────────────────────────────────────

describe('AgentConfigWidget', () => {
  it('shows skeleton / loading state on initial render', () => {
    render(<AgentConfigWidget onToast={vi.fn()} />)
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
  })

  it('renders widget content after data loads', async () => {
    render(<AgentConfigWidget onToast={vi.fn()} />)
    await waitFor(() => screen.getByText('WorkVoice agent is not yet generated'), { timeout: 3000 })
    expect(screen.getByRole('button', { name: /add organizations/i })).toBeInTheDocument()
  })

  it('shows error state when simulateError is true', async () => {
    render(<AgentConfigWidget onToast={vi.fn()} simulateError />)
    await waitFor(() => screen.getByRole('alert'), { timeout: 3000 })
    expect(screen.getByText(/failed to load/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument()
  })

  it('calls onToast when CTA button is clicked', async () => {
    const onToast = vi.fn()
    render(<AgentConfigWidget onToast={onToast} />)
    await waitFor(() => screen.getByRole('button', { name: /add organizations/i }), {
      timeout: 3000,
    })
    fireEvent.click(screen.getByRole('button', { name: /add organizations/i }))
    expect(onToast).toHaveBeenCalledWith(expect.stringContaining('organization'))
  })
})

// ── QuickActions ───────────────────────────────────────────────────────────

describe('QuickActions', () => {
  const onToast = vi.fn()
  const openSpy = vi.fn()

  beforeEach(() => {
    vi.stubGlobal('open', openSpy)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    onToast.mockClear()
    openSpy.mockClear()
  })

  it('renders all quick action buttons', () => {
    render(<QuickActions actions={mockQuickActions} onToast={onToast} />)
    expect(screen.getByText('View docs')).toBeInTheDocument()
    expect(screen.getByText('Notify team')).toBeInTheDocument()
    expect(screen.getByText('Run diagnostics')).toBeInTheDocument()
  })

  it('opens external link for "link" type action', () => {
    render(<QuickActions actions={mockQuickActions} onToast={onToast} />)
    fireEvent.click(screen.getByText('View docs'))
    expect(openSpy).toHaveBeenCalledWith(
      'https://workvoice.ai/docs',
      '_blank',
      'noopener,noreferrer'
    )
  })

  it('calls onToast for "toast" type action', () => {
    render(<QuickActions actions={mockQuickActions} onToast={onToast} />)
    fireEvent.click(screen.getByText('Notify team'))
    expect(onToast).toHaveBeenCalledWith('Team has been notified!')
  })

  it('logs to console and calls onToast for "console" type action', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)
    render(<QuickActions actions={mockQuickActions} onToast={onToast} />)
    fireEvent.click(screen.getByText('Run diagnostics'))
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('[WorkVoice]'))
    expect(onToast).toHaveBeenCalledWith(expect.stringContaining('console'))
  })
})
