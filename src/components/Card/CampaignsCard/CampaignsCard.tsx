import { Briefcase } from 'lucide-react'
import styles from './CampaignsCard.module.css'
import counterBg from '../../../assets/2dfe8bb6707d05e707a1b2c3de1545211f7e94c1.2dfe8bb6.png'
import counterRing from '../../../assets/a628f159f9fbf64cf9bf11f4d66e6b79eddddf56.a628f159.png'

import type { Campaign, LoadingState } from '../../../types'

export interface CampaignsCardProps {
  campaigns?: Campaign[] | null
  status?: LoadingState
  errorMsg?: string
  onRetry?: () => void
}

export function CampaignsCard({
  campaigns = [],
  status = 'success',
  errorMsg,
  onRetry,
}: CampaignsCardProps) {
  if (status === 'loading') {
    return (
      <div className={styles.campaignsCard}>
        <div className={styles.campaignsHeader}>
          <h2 className={styles.campaignsTitle}>Active campaigns</h2>
        </div>
        <div className={styles.campaignsBody} aria-busy="true" aria-label="Loading…">
          <div className={styles.skeletonList} />
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className={styles.campaignsCard}>
        <div className={styles.campaignsHeader}>
          <h2 className={styles.campaignsTitle}>Active campaigns</h2>
        </div>
        <div className={styles.campaignsBody} role="alert">
          <p className={styles.errorText}>{errorMsg ?? 'Failed to load campaigns.'}</p>
          <button className={styles.retryBtn} onClick={onRetry}>
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.campaignsCard}>
      <div className={styles.campaignsHeader}>
        <h2 className={styles.campaignsTitle}>Active campaigns</h2>
        <button className={styles.viewAll}>View all</button>
      </div>
      <div className={styles.campaignsBody}>
        <div className={styles.counter}>
          <img src={counterBg} alt="" className={styles.counterBg} />
          <img src={counterRing} alt="" className={styles.counterRing} />
          <div className={styles.counterText}>
            <span className={styles.counterNumber}>{campaigns?.length ?? 0}</span>
            <span className={styles.counterLabel}>Active campaigns</span>
          </div>
        </div>
        <ul className={styles.campaignList}>
          {campaigns?.length ? (
            campaigns.map((c) => (
              <li key={c.name} className={styles.campaignRow}>
                <Briefcase
                  size={18}
                  color="var(--color-text-secondary)"
                  className={styles.campaignIcon}
                />
                <span className={styles.campaignName}>{c.name}</span>
                <span className={styles.campaignDate}>Last answer: {c.date}</span>
              </li>
            ))
          ) : (
            <li className={styles.campaignRow}>No active campaigns</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default CampaignsCard
