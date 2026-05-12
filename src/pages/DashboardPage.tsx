import { useState, useCallback } from 'react'
import { AgentConfigCard, CampaignsCard } from '../components/Card'
import GreetingHeader from '../components/GreetingHeader/GreetingHeader'
import { OrganizationsCard, MembersCard } from '../components/Card'
import QuickActions from '../components/QuickActions/QuickActions'
import Toast from '../components/Toast/Toast'
import { mockQuickActions } from '../data/mockData'
import styles from './DashboardPage.module.css'
import { useAsyncFetch } from '../hooks/useAsyncFetch'
import { fetchOrganizations, fetchCampaigns, fetchAgentConfig } from '../data/mockData'
import type { Campaign, AgentConfig } from '../types'

import userAvatar from '../assets/7efe25a65f83013adea963dda4d70468e160590b.7efe25a6.png'
// counter assets moved into CampaignsCard

import admin1 from '../assets/c1ef06829d71aa86d4a6ea2753f8b02ab623cbb7.c1ef0682.png'
import admin2 from '../assets/dc8c14d8cb799ae7e251e726273aa2939e47481f.dc8c14d8.png'
import ps2 from '../assets/d20435522aacdaf5c766ffc7b438ca94cdb10460.d2043552.png'
import ps3 from '../assets/d085c881cd9d7cd336c2db1a2839fb2627f3348e.d085c881.png'
import ps4 from '../assets/bb818c99b4f8ce0823be1a9b27804871f306cda3.bb818c99.png'
import ps5 from '../assets/5cf2db2dd8769460c7c093ebf26b37c486a86192.5cf2db2d.png'
import ps6 from '../assets/170105b5541581e4d1d75fef1ee9709769906bc1.170105b5.png'
import ps7 from '../assets/4da2282af40f6eda90441845744f096e5ed51937.4da2282a.png'
import ps1 from '../assets/3f1de209656ba21d608d9c3d9919f69be3aece72.3f1de209.png'

const mockedProfessionals = [ps1, ps2, ps3, ps4, ps5, ps6, ps7, ps1, ps2, ps3, ps4, ps5]
const mockedAdmins = [admin1, admin2]

export default function DashboardPage() {
  const [toast, setToast] = useState<string | null>(null)
  const closeToast = useCallback(() => setToast(null), [])

  const {
    data: orgData,
    status: orgStatus,
    errorMsg: orgError,
    retry: orgRetry,
  } = useAsyncFetch(fetchOrganizations)

  const {
    data: campaignsData,
    status: campaignsStatus,
    errorMsg: campaignsError,
    retry: campaignsRetry,
  } = useAsyncFetch<Campaign[]>(fetchCampaigns)

  const {
    data: agentConfigData,
    status: agentStatus,
    errorMsg: agentError,
    retry: agentRetry,
  } = useAsyncFetch<AgentConfig>(fetchAgentConfig)

  return (
    <>
      <GreetingHeader name="Samuel" avatarUrl={userAvatar} />

      <div className={styles.topGrid}>
        <AgentConfigCard
          onToast={setToast}
          data={agentConfigData}
          status={agentStatus}
          errorMsg={agentError}
          onRetry={agentRetry}
        />
        <OrganizationsCard
          data={orgData}
          status={orgStatus}
          errorMsg={orgError}
          onRetry={orgRetry}
        />
        <div className={styles.rightStack}>
          <MembersCard title="Admin access" members={mockedAdmins} />
          <MembersCard title="Professional services" members={mockedProfessionals} />
        </div>
      </div>

      <CampaignsCard
        campaigns={campaignsData}
        status={campaignsStatus}
        errorMsg={campaignsError}
        onRetry={campaignsRetry}
      />

      <div className={styles.quickActionsWrapper}>
        <QuickActions actions={mockQuickActions} onToast={setToast} />
      </div>

      <div aria-live="polite" aria-atomic="true">
        {toast && <Toast message={toast} onClose={closeToast} />}
      </div>
    </>
  )
}
