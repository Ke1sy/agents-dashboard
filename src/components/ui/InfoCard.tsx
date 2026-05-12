import styles from './InfoCard.module.css'

interface InfoCardProps {
  title: string
  illustration: React.ReactNode
  description: string
  ctaLabel: string
  onCta: () => void
}

export default function InfoCard({
  title,
  illustration,
  description,
  ctaLabel,
  onCta,
}: InfoCardProps) {
  return (
    <article className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.illustration}>{illustration}</div>
      <p className={styles.description}>{description}</p>
      <button className={styles.ctaBtn} onClick={onCta}>
        {ctaLabel}
      </button>
    </article>
  )
}
