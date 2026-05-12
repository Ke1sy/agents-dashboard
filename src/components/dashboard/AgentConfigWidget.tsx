import { useState, useEffect } from 'react'
import type { AgentConfig, LoadingState } from '../../types'
import { fetchAgentConfig } from '../../data/mockData'
import agentImg from '../../assets/5DE91812-3B52-469F-8712-5F9C6FE215BF_4_5005_c.jpeg'
import InfoCard from '../ui/InfoCard'
import styles from './AgentConfigWidget.module.css'

interface AgentConfigWidgetProps {
  onToast: (message: string) => void
  simulateError?: boolean
}

export default function AgentConfigWidget({
  onToast,
  simulateError = false,
}: AgentConfigWidgetProps) {
  const [config, setConfig] = useState<AgentConfig | null>(null)
  const [status, setStatus] = useState<LoadingState>('loading')
  const [errorMsg, setErrorMsg] = useState('')
  const [fetchKey, setFetchKey] = useState(0)

  useEffect(() => {
    let cancelled = false
    fetchAgentConfig(simulateError)
      .then((data) => {
        if (!cancelled) {
          setConfig(data)
          setStatus('success')
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setErrorMsg(err.message)
          setStatus('error')
        }
      })
    return () => {
      cancelled = true
    }
  }, [simulateError, fetchKey])

  const handleRetry = () => {
    setStatus('loading')
    setErrorMsg('')
    setFetchKey((k) => k + 1)
  }

  if (status === 'success' && config) {
    return (
      <InfoCard
        title={config.title}
        illustration={
          <img src={agentImg} alt="Agent illustration" className={styles.illustrationImg} />
        }
        description={config.description}
        ctaLabel={config.ctaLabel}
        onCta={() => onToast('Redirecting to organization setup…')}
      />
    )
  }

  return (
    <article className={styles.card} aria-label="Agent configuration widget">
      <h2 className={styles.title}>Agent configuration</h2>

      {status === 'loading' && (
        <div className={styles.skeleton} aria-busy="true" aria-label="Loading…">
          <div className={styles.skeletonIllustration} />
          <div className={styles.skeletonLine} style={{ width: '70%' }} />
          <div className={styles.skeletonLine} style={{ width: '50%' }} />
          <div className={styles.skeletonBtn} />
        </div>
      )}

      {status === 'error' && (
        <div className={styles.errorState} role="alert">
          <span className={styles.errorIcon}>⚠️</span>
          <p className={styles.errorText}>{errorMsg}</p>
          <button className={styles.retryBtn} onClick={handleRetry}>
            Retry
          </button>
        </div>
      )}
    </article>
  )
}
