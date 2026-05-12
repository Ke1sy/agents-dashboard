import { HelpCircle, ChevronDown, LayoutGrid, Menu } from 'lucide-react'
import avatarImg from '../../assets/7af8326ba436e6c0b8fef23c12f356f80f5ff140.7af8326b.png'
import styles from './TopBar.module.css'

const Logo = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient
        id="topbarLogoGrad"
        gradientUnits="userSpaceOnUse"
        x1="21"
        x2="21"
        y1="4"
        y2="38"
      >
        <stop stopColor="#6945C0" />
        <stop offset="1" stopColor="#341783" />
      </linearGradient>
    </defs>
    <rect fill="url(#topbarLogoGrad)" height="34" rx="17" width="34" x="4" y="4" />
    <path
      d="M23.2631 10.6581V10.6619C23.2631 10.6619 23.7483 14.3618 23.7483 20.6768C23.7483 26.9919 23.2631 30.6956 23.2631 30.6916V30.6956C25.7413 28.0725 27.2601 24.5526 27.2601 20.6768V20.6729C27.2601 16.8009 25.7411 13.2772 23.2629 10.6581"
      fill="white"
    />
    <path
      d="M23.3491 17.2901C22.8323 15.3327 21.8575 13.4847 20.5107 11.809C19.3555 10.5171 17.9542 9.38551 16.3648 8.46948C17.9029 10.9007 18.9404 15.4461 18.9404 20.6533C18.9404 25.8604 17.9071 30.394 16.3686 32.8292L16.3333 32.9114C17.2062 32.4112 18.0341 31.8361 18.8076 31.1928C21.4308 28.7026 23.1573 25.7115 23.6428 22.4619C23.7132 21.8826 23.7485 21.2914 23.7485 20.6963C23.7485 19.5219 23.6115 18.3826 23.3491 17.2901Z"
      fill="white"
    />
  </svg>
)

interface TopBarProps {
  onMenuToggle: () => void
}

export default function TopBar({ onMenuToggle }: TopBarProps) {
  return (
    <header className={styles.topbar}>
      <div className={styles.logo} aria-label="WorkVoice logo">
        <Logo />
      </div>
      <div className={styles.inner}>
        <div className={styles.container}>
          <div className={styles.left}>
            <button className={styles.menuBtn} onClick={onMenuToggle} aria-label="Toggle menu">
              <Menu size={22} color="var(--color-text-secondary)" />
            </button>
            <span className={styles.title}>Professional services dashboard</span>
          </div>
          <div className={styles.right}>
            <button className={styles.iconBtn} aria-label="Help">
              <HelpCircle size={20} color="var(--color-text-secondary)" />
            </button>
            <button className={styles.avatarBtn} aria-label="User menu">
              <img src={avatarImg} alt="User avatar" className={styles.avatar} />
              <ChevronDown size={16} color="var(--color-text-secondary)" />
            </button>
            <button className={styles.iconBtn} aria-label="App grid">
              <LayoutGrid size={20} color="var(--color-text-secondary)" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
