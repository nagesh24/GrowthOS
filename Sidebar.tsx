'use client'
import type { Tab } from '@/app/dashboard/page'

const tabs: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'leads', label: 'Leads & CRM' },
  { id: 'goals', label: 'Goals & KPIs' },
]

export default function Sidebar({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      {tabs.map(t => (
        <button key={t.id} onClick={() => setTab(t.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === t.id
              ? 'bg-brand text-white'
              : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'
          }`}>
          {t.label}
        </button>
      ))}
    </div>
  )
}
