import styles from './AgentConfigCard.module.css'
import InfoCard from '../InfoCard/InfoCard'
import type { AgentConfig, LoadingState } from '../../../types'
import agentImg from '../../../assets/5DE91812-3B52-469F-8712-5F9C6FE215BF_4_5005_c.jpeg'

interface AgentConfigCardProps {
  onToast: (message: string) => void
  data?: AgentConfig | null
  status?: LoadingState
  errorMsg?: string
  onRetry?: () => void
}

export function AgentConfigCard({
  onToast,
  data,
  status = 'success',
  errorMsg,
  onRetry,
}: AgentConfigCardProps) {
  return (
    <InfoCard
      title={data?.title ?? 'Agent configuration'}
      status={status}
      errorMsg={errorMsg}
      onRetry={onRetry}
      skeletonTop={<div className={styles.skeletonIllustration} />}
      illustration={
        <img src={agentImg} alt="Agent illustration" className={styles.illustrationImg} />
      }
      description={data?.description}
      ctaLabel={data?.ctaLabel}
      onCta={() => onToast('Redirecting to organization setup…')}
    />
  )
}

export default AgentConfigCard
