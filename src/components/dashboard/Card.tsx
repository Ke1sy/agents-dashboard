import styles from './Card.module.css'
import { useState, useEffect } from 'react'
import InfoCard from '../ui/InfoCard'
import type { OrganizationsData, LoadingState } from '../../types'
import { fetchOrganizations } from '../../data/mockData'
import { Pencil } from 'lucide-react'

interface PlaceholderCardProps {
  title: string
  children?: React.ReactNode
  headerAction?: React.ReactNode
}

export function PlaceholderCard({ title, children, headerAction }: PlaceholderCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.title}>{title}</h2>
        {headerAction}
      </div>
      {children ?? <div className={styles.empty} />}
    </div>
  )
}

export function OrganizationsCard() {
  const [data, setData] = useState<OrganizationsData | null>(null)
  const [status, setStatus] = useState<LoadingState>('loading')
  const [errorMsg, setErrorMsg] = useState('')
  const [fetchKey, setFetchKey] = useState(0)

  useEffect(() => {
    let cancelled = false
    fetchOrganizations()
      .then((d) => {
        if (!cancelled) {
          setData(d)
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
  }, [fetchKey])

  if (status === 'success' && data) {
    return (
      <InfoCard
        title="Organizations"
        illustration={<span className={styles.bigNumber}>{data.count}</span>}
        description={data.description}
        ctaLabel={data.ctaLabel}
        onCta={() => {}}
      />
    )
  }

  return (
    <article className={styles.card} aria-label="Organizations widget">
      <h2 className={styles.title}>Organizations</h2>
      {status === 'loading' && (
        <div className={styles.skeleton} aria-busy="true" aria-label="Loading…">
          <div className={styles.skeletonNumber} />
          <div className={styles.skeletonLine} style={{ width: '80%' }} />
          <div className={styles.skeletonLine} style={{ width: '60%' }} />
          <div className={styles.skeletonBtn} />
        </div>
      )}
      {status === 'error' && (
        <div className={styles.errorState} role="alert">
          <span className={styles.errorIcon}>⚠️</span>
          <p className={styles.errorText}>{errorMsg}</p>
          <button
            className={styles.retryBtn}
            onClick={() => {
              setStatus('loading')
              setErrorMsg('')
              setFetchKey((k) => k + 1)
            }}
          >
            Retry
          </button>
        </div>
      )}
    </article>
  )
}

const MAX_VISIBLE = 7

interface MembersCardProps {
  title: string
  members: string[]
  maxVisible?: number
}

export function MembersCard({ title, members, maxVisible = MAX_VISIBLE }: MembersCardProps) {
  const visible = members.slice(0, maxVisible)
  const hidden = members.length - visible.length
  return (
    <PlaceholderCard title={`${title} | ${members.length}`} headerAction={<EditButton />}>
      <div className={styles.avatarRow}>
        {visible.map((src, i) => (
          <img key={i} src={src} alt="Member" className={styles.avatar} />
        ))}
        {hidden > 0 && <div className={styles.overflow}>+{hidden}</div>}
      </div>
    </PlaceholderCard>
  )
}

function EditButton() {
  return (
    <button className={styles.editBtn} aria-label="Edit">
      <Pencil size={13} />
      Edit
    </button>
  )
}
