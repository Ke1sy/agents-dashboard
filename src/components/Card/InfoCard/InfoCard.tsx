import styles from './InfoCard.module.css'
import type { LoadingState } from '../../../types'

interface InfoCardProps {
  title: string
  // Async state
  status?: LoadingState
  errorMsg?: string
  onRetry?: () => void
  skeletonTop?: React.ReactNode
  // Success content
  illustration?: React.ReactNode
  description?: string
  ctaLabel?: string
  onCta?: () => void
}

export default function InfoCard({
  title,
  status = 'success',
  errorMsg,
  onRetry,
  skeletonTop,
  illustration,
  description,
  ctaLabel,
  onCta,
}: InfoCardProps) {
  return (
    <article className={styles.card}>
      <h2 className={styles.title}>{title}</h2>

      {status === 'loading' && (
        <div className={styles.skeleton} aria-busy="true" aria-label="Loading…">
          {skeletonTop}
          <div className={styles.skeletonLine} style={{ width: '80%' }} />
          <div className={styles.skeletonLine} style={{ width: '60%' }} />
          <div className={styles.skeletonBtn} />
        </div>
      )}

      {status === 'error' && (
        <div className={styles.errorState} role="alert">
          <span className={styles.errorIcon}>⚠️</span>
          <p className={styles.errorText}>{errorMsg}</p>
          <button className={styles.retryBtn} onClick={onRetry}>
            Retry
          </button>
        </div>
      )}

      {status === 'success' && (
        <>
          <div className={styles.illustration}>{illustration}</div>
          <p className={styles.description}>{description}</p>
          {ctaLabel && (
            <button className={styles.ctaBtn} onClick={onCta}>
              {ctaLabel}
            </button>
          )}
        </>
      )}
    </article>
  )
}
