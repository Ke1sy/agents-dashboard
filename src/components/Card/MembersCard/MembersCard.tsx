import styles from './MembersCard.module.css'
import { Pencil } from 'lucide-react'

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
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.title}>{`${title} | ${members.length}`}</h2>
        <EditButton />
      </div>
      <div className={styles.avatarRow}>
        {visible.map((src, i) => (
          <img key={`${i}-${src}`} src={src} alt="Member" className={styles.avatar} />
        ))}
        {hidden > 0 && <div className={styles.overflow}>+{hidden}</div>}
      </div>
    </div>
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

export default MembersCard
