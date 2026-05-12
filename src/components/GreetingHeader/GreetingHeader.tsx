import styles from './GreetingHeader.module.css'

interface GreetingHeaderProps {
  name: string
  avatarUrl: string
}

export default function GreetingHeader({ name, avatarUrl }: GreetingHeaderProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatarWrap}>
        <img src={avatarUrl} alt={`${name}'s avatar`} className={styles.avatar} />
      </div>
      <p className={styles.heading}>
        Hello, <span className={styles.name}>{name}</span>
      </p>
    </div>
  )
}
