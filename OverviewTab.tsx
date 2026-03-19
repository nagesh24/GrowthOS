'use client'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import type { Lead, Goal } from '@/types'

const mrrData = [
  { mo: 'Oct', mrr: 16200 }, { mo: 'Nov', mrr: 17800 }, { mo: 'Dec', mrr: 19400 },
  { mo: 'Jan', mrr: 21000 }, { mo: 'Feb', mrr: 22300 }, { mo: 'Mar', mrr: 24800 },
]
const mixData = [
  { name: 'Starter', value: 28 }, { name: 'Pro', value: 45 }, { name: 'Enterprise', value: 22 },
]
const MIX_COLORS = ['#B5D4F4', '#3266ad', '#0C447C']

export default function OverviewTab({ leads, goals }: { leads: Lead[]; goals: Goal[] }) {
  const hotLeads = leads.filter(l => l.stage === 'hot').length
  const wonLeads = leads.filter(l => l.stage === 'won').length
  const avgGoal = goals.length ? Math.round(goals.reduce((s, g) => s + g.progress, 0) / goals.length) : 0

  return (
    <div>
      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'MRR', value: '$24,800', sub: '↑ 11.2% MoM', green: true },
          { label: 'ARR', value: '$297.6K', sub: 'On track for $300K', green: true },
          { label: 'Churn rate', value: '2.4%', sub: '↓ 0.3% vs last mo', green: true },
          { label: 'Active leads', value: String(leads.length), sub: `${hotLeads} hot · ${wonLeads} won`, green: hotLeads > 0 },
        ].map(k => (
          <div key={k.label} className="kpi-card">
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">{k.label}</div>
            <div className="text-xl font-semibold">{k.value}</div>
            <div className={`text-xs mt-1 ${k.green ? 'text-green-600' : 'text-red-500'}`}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="card">
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-3">MRR growth</div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={mrrData}>
              <defs>
                <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3266ad" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3266ad" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="mo" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `$${v / 1000}K`} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'MRR']} />
              <Area type="monotone" dataKey="mrr" stroke="#3266ad" strokeWidth={2} fill="url(#mrrGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-3">Revenue mix</div>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie data={mixData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" paddingAngle={2}>
                  {mixData.map((_, i) => <Cell key={i} fill={MIX_COLORS[i]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {mixData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 rounded-sm" style={{ background: MIX_COLORS[i] }} />
                  <span className="text-gray-500">{d.name}</span>
                  <span className="font-medium">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Goal progress */}
      {goals.length > 0 && (
        <div className="card">
          <div className="text-xs text-gray-400 uppercase tracking-wide mb-3">Goals — avg {avgGoal}%</div>
          <div className="space-y-3">
            {goals.slice(0, 4).map(g => (
              <div key={g.id}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{g.name}</span><span className="font-medium">{g.progress}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${g.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
