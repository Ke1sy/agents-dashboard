import { useState } from 'react'
import TopBar from './components/layout/TopBar'
import Sidebar from './components/layout/Sidebar'
import DashboardPage from './pages/DashboardPage'
import styles from './App.module.css'

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className={styles.app}>
      <TopBar onMenuToggle={() => setMobileMenuOpen((v) => !v)} />
      <div className={styles.body}>
        <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        {mobileMenuOpen && (
          <div
            role="button"
            className={styles.overlay}
            onClick={() => setMobileMenuOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setMobileMenuOpen(false)
              }
            }}
            tabIndex={0}
          />
        )}
        <DashboardPage />
      </div>
    </div>
  )
}
