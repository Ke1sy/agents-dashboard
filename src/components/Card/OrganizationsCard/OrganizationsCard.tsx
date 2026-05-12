import styles from './OrganizationsCard.module.css'
import InfoCard from '../InfoCard/InfoCard'
import type { OrganizationsData, LoadingState } from '../../../types'

interface OrganizationsCardProps {
  data?: OrganizationsData | null
  status?: LoadingState
  errorMsg?: string
  onRetry?: () => void
}

export function OrganizationsCard({
  data,
  status = 'success',
  errorMsg,
  onRetry,
}: OrganizationsCardProps) {
  return (
    <InfoCard
      title="Organizations"
      status={status}
      errorMsg={errorMsg}
      onRetry={onRetry}
      skeletonTop={<div className={styles.skeletonNumber} />}
      illustration={<span className={styles.bigNumber}>{data?.count}</span>}
      description={data?.description}
      ctaLabel={data?.ctaLabel}
      onCta={() => {}}
    />
  )
}

export default OrganizationsCard
