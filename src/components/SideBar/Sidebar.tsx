import styles from './Sidebar.module.css'

const Logo = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient
        id="sidebarLogoGrad"
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
    <rect fill="url(#sidebarLogoGrad)" height="34" rx="17" width="34" x="4" y="4" />
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

const HomeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10.55 2.533a2 2 0 0 1 2.9 0l7 7.467A2 2 0 0 1 21 11.467V20a1 1 0 0 1-1 1h-5v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5H4a1 1 0 0 1-1-1v-8.533a2 2 0 0 1 .55-1.387l7-7.467Z"
      fill="currentColor"
    />
  </svg>
)

const OrgsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 1a1 1 0 0 1 1 1v.764a7.04 7.04 0 0 1 2.065.856l.54-.541a1 1 0 1 1 1.414 1.414l-.54.54A7.04 7.04 0 0 1 17.336 7H18a1 1 0 1 1 0 2h-.664a7.04 7.04 0 0 1-.857 2.065l.54.54a1 1 0 1 1-1.414 1.414l-.54-.54A7.04 7.04 0 0 1 13 13.236V14a1 1 0 1 1-2 0v-.764a7.04 7.04 0 0 1-2.065-.857l-.54.54a1 1 0 1 1-1.414-1.414l.54-.54A7.04 7.04 0 0 1 6.664 9H6a1 1 0 0 1 0-2h.664a7.04 7.04 0 0 1 .857-2.065l-.54-.54a1 1 0 1 1 1.414-1.414l.54.54A7.04 7.04 0 0 1 11 2.764V2a1 1 0 0 1 1-1Zm0 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
      fill="currentColor"
    />
  </svg>
)

interface NavItem {
  icon: React.ReactNode
  label: string
  active?: boolean
}

const navItems: NavItem[] = [
  { icon: <HomeIcon />, label: 'Home', active: true },
  { icon: <OrgsIcon />, label: 'Orgs' },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  return (
    <nav className={`${styles.sidebar} ${isOpen ? styles.open : ''}`} aria-label="Main navigation">
      <div className={styles.mobileLogo} aria-label="WorkVoice logo">
        <Logo />
      </div>
      {navItems.map((item) => (
        <button
          key={item.label}
          className={`${styles.navItem} ${item.active ? styles.active : ''}`}
          aria-current={item.active ? 'page' : undefined}
          onClick={onClose}
        >
          <span className={styles.icon}>{item.icon}</span>
          <span className={styles.label}>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}
