import { useState } from 'react'
import TopBar from './components/TopBar/TopBar'
import Sidebar from './components/SideBar/Sidebar'
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
        <main className={styles.page}>
          <div className={styles.content}>
            {/* Router could be here ...*/}
            <DashboardPage />
          </div>
        </main>
      </div>
    </div>
  )
}
