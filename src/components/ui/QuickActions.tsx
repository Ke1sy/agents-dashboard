import type { QuickAction } from '../../types'
import styles from './QuickActions.module.css'

interface QuickActionsProps {
  actions: QuickAction[]
  onToast: (message: string) => void
}

export default function QuickActions({ actions, onToast }: QuickActionsProps) {
  function handleAction(action: QuickAction) {
    switch (action.type) {
      case 'link':
        window.open(action.payload, '_blank', 'noopener,noreferrer')
        break
      case 'toast':
        onToast(action.payload ?? 'Done!')
        break
      case 'console':
        console.log(action.payload)
        onToast('Diagnostics logged to console ✓')
        break
    }
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.heading}>Quick actions</p>
      <div className={styles.actions}>
        {actions.map((action) => (
          <button
            key={action.id}
            className={styles.btn}
            onClick={() => handleAction(action)}
            title={action.label}
          >
            <span className={styles.icon}>{action.icon}</span>
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
