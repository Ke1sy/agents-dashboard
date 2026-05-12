import { useState } from 'react'
import { Briefcase } from 'lucide-react'
import AgentConfigWidget from '../components/dashboard/AgentConfigWidget'
import GreetingHeader from '../components/dashboard/GreetingHeader'
import { OrganizationsCard, MembersCard } from '../components/dashboard/Card'
import QuickActions from '../components/ui/QuickActions'
import Toast from '../components/ui/Toast'
import { mockQuickActions } from '../data/mockData'
import styles from './DashboardPage.module.css'

import userAvatar from '../assets/7efe25a65f83013adea963dda4d70468e160590b.7efe25a6.png'
import counterBg from '../assets/2dfe8bb6707d05e707a1b2c3de1545211f7e94c1.2dfe8bb6.png'
import counterRing from '../assets/a628f159f9fbf64cf9bf11f4d66e6b79eddddf56.a628f159.png'

import admin1 from '../assets/c1ef06829d71aa86d4a6ea2753f8b02ab623cbb7.c1ef0682.png'
import admin2 from '../assets/dc8c14d8cb799ae7e251e726273aa2939e47481f.dc8c14d8.png'
import ps2 from '../assets/d20435522aacdaf5c766ffc7b438ca94cdb10460.d2043552.png'
import ps3 from '../assets/d085c881cd9d7cd336c2db1a2839fb2627f3348e.d085c881.png'
import ps4 from '../assets/bb818c99b4f8ce0823be1a9b27804871f306cda3.bb818c99.png'
import ps5 from '../assets/5cf2db2dd8769460c7c093ebf26b37c486a86192.5cf2db2d.png'
import ps6 from '../assets/170105b5541581e4d1d75fef1ee9709769906bc1.170105b5.png'
import ps7 from '../assets/4da2282af40f6eda90441845744f096e5ed51937.4da2282a.png'
import ps1 from '../assets/3f1de209656ba21d608d9c3d9919f69be3aece72.3f1de209.png'

export default function DashboardPage() {
  const [toast, setToast] = useState<string | null>(null)

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <GreetingHeader name="Samuel" avatarUrl={userAvatar} />

        <div className={styles.topGrid}>
          <AgentConfigWidget onToast={setToast} />
          <OrganizationsCard />
          <div className={styles.rightStack}>
            <MembersCard title="Admin access" members={[admin1, admin2]} />
            <MembersCard
              title="Professional services"
              members={[ps1, ps2, ps3, ps4, ps5, ps6, ps7, ps1, ps2, ps3, ps4, ps5]}
            />
          </div>
        </div>

        <div className={styles.campaignsCard}>
          <div className={styles.campaignsHeader}>
            <h2 className={styles.campaignsTitle}>Active campaigns</h2>
            <button className={styles.viewAll}>View all</button>
          </div>
          <div className={styles.campaignsBody}>
            <div className={styles.counter}>
              <img src={counterBg} alt="" className={styles.counterBg} />
              <img src={counterRing} alt="" className={styles.counterRing} />
              <div className={styles.counterText}>
                <span className={styles.counterNumber}>8</span>
                <span className={styles.counterLabel}>Active campaigns</span>
              </div>
            </div>
            <ul className={styles.campaignList}>
              {[
                {
                  name: 'Bosch / WorkVoice campaign / 12 role interviews',
                  date: 'October 31, 2025',
                },
                { name: 'IBM / WorkVoice campaign / 8 role interviews', date: 'October 31, 2025' },
                {
                  name: 'Nike / WorkVoice campaign / 10 role interviews',
                  date: 'October 31, 2025',
                },
              ].map((c) => (
                <li key={c.name} className={styles.campaignRow}>
                  <Briefcase
                    size={18}
                    color="var(--color-text-secondary)"
                    className={styles.campaignIcon}
                  />
                  <span className={styles.campaignName}>{c.name}</span>
                  <span className={styles.campaignDate}>Last answer: {c.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.quickActionsWrapper}>
          <QuickActions actions={mockQuickActions} onToast={setToast} />
        </div>
      </div>

      <div aria-live="polite" aria-atomic="true">
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </div>
    </main>
  )
}
