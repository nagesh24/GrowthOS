'use client'
import { useState } from 'react'
import type { Goal } from '@/types'

const GOAL_COLORS: Record<string, string> = {
  Revenue: '#3266ad', Growth: '#1D9E75', Product: '#EF9F27', Marketing: '#D4537E', Team: '#534AB7'
}

export default function GoalsTab({ goals, onAdd }: {
  goals: Goal[]
  onAdd: (g: Omit<Goal, 'id' | 'user_id' | 'created_at'>) => void
}) {
  const [name, setName] = useState('')
  const [progress, setProgress] = useState('')
  const [category, setCategory] = useState<Goal['category']>('Revenue')
  const [due, setDue] = useState('')

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!name) return
    onAdd({ name, progress: Math.min(100, Math.max(0, parseInt(progress) || 0)), category, due: due || 'Q2 2026' })
    setName(''); setProgress(''); setDue('')
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="card">
        <div className="text-xs text-gray-400 uppercase tracking-wide mb-4">Add goal</div>
        <form onSubmit={handleAdd} className="space-y-3">
          <div><label className="text-xs text-gray-500 mb-1 block">Goal name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Reach $30K MRR" /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Progress %</label>
            <input type="number" value={progress} onChange={e => setProgress(e.target.value)} placeholder="65" min="0" max="100" /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value as Goal['category'])}>
              {Object.keys(GOAL_COLORS).map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div><label className="text-xs text-gray-500 mb-1 block">Due</label>
            <input value={due} onChange={e => setDue(e.target.value)} placeholder="Q2 2026" /></div>
          <button type="submit" className="btn-primary w-full">Set goal</button>
        </form>
      </div>

      <div className="card md:col-span-2">
        <div className="text-xs text-gray-400 uppercase tracking-wide mb-4">
          Goals <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700">{goals.length}</span>
        </div>
        {goals.length === 0 ? (
          <p className="text-sm text-gray-400">No goals yet. Add your first one.</p>
        ) : (
          <div className="space-y-4">
            {goals.map(g => (
              <div key={g.id}>
                <div className="flex justify-between text-sm mb-1">
                  <div>
                    <span>{g.name}</span>
                    <span className="text-xs text-gray-400 ml-2">{g.category} · {g.due}</span>
                  </div>
                  <span className="font-medium text-sm">{g.progress}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${g.progress}%`, background: GOAL_COLORS[g.category] || '#3266ad' }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
