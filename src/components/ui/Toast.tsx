import { useEffect } from 'react'
import styles from './Toast.module.css'

interface ToastProps {
  message: string
  onClose: () => void
}

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={styles.toast} role="status">
      <span className={styles.icon} aria-hidden="true">
        ✓
      </span>
      <span className={styles.message}>{message}</span>
      <button className={styles.close} onClick={onClose} aria-label="Dismiss">
        ×
      </button>
    </div>
  )
}
