'use client'
import { useState } from 'react'
import type { Lead } from '@/types'

export default function LeadsTab({ leads, onAdd, onWon }: {
  leads: Lead[]
  onAdd: (l: Omit<Lead, 'id' | 'user_id' | 'created_at'>) => void
  onWon: (id: string, company: string, acv: number) => void
}) {
  const [company, setCompany] = useState('')
  const [contact, setContact] = useState('')
  const [acv, setAcv] = useState('')
  const [stage, setStage] = useState<Lead['stage']>('cold')

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!company) return
    onAdd({ company, contact, acv: parseInt(acv) || 0, stage })
    setCompany(''); setContact(''); setAcv(''); setStage('cold')
  }

  const avatarColors = ['bg-blue-50 text-blue-700', 'bg-green-50 text-green-700', 'bg-amber-50 text-amber-700', 'bg-red-50 text-red-700', 'bg-purple-50 text-purple-700']

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Add form */}
      <div className="card">
        <div className="text-xs text-gray-400 uppercase tracking-wide mb-4">Add lead</div>
        <form onSubmit={handleAdd} className="space-y-3">
          <div><label className="text-xs text-gray-500 mb-1 block">Company</label>
            <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Acme Inc" /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Contact</label>
            <input value={contact} onChange={e => setContact(e.target.value)} placeholder="Jane Smith" /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">ACV ($)</label>
            <input type="number" value={acv} onChange={e => setAcv(e.target.value)} placeholder="5000" /></div>
          <div><label className="text-xs text-gray-500 mb-1 block">Stage</label>
            <select value={stage} onChange={e => setStage(e.target.value as Lead['stage'])}>
              <option value="cold">Cold</option>
              <option value="warm">Warm</option>
              <option value="hot">Hot</option>
            </select>
          </div>
          <button type="submit" className="btn-primary w-full">Add to pipeline</button>
        </form>
      </div>

      {/* Pipeline table */}
      <div className="card md:col-span-2">
        <div className="text-xs text-gray-400 uppercase tracking-wide mb-4">
          Pipeline <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700">{leads.length} deals</span>
        </div>
        {leads.length === 0 ? (
          <p className="text-sm text-gray-400">No leads yet. Add your first deal.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-xs text-gray-400 border-b border-gray-100">
                <th className="text-left pb-2 font-normal">Company</th>
                <th className="text-left pb-2 font-normal">Contact</th>
                <th className="text-left pb-2 font-normal">ACV</th>
                <th className="text-left pb-2 font-normal">Stage</th>
                <th className="text-left pb-2 font-normal"></th>
              </tr></thead>
              <tbody>
                {leads.map((l, i) => (
                  <tr key={l.id} className="border-b border-gray-50 last:border-0">
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full text-[10px] font-semibold flex items-center justify-center flex-shrink-0 ${avatarColors[i % 5]}`}>
                          {l.company.slice(0, 2).toUpperCase()}
                        </div>
                        {l.company}
                      </div>
                    </td>
                    <td className="py-2.5 text-gray-500">{l.contact}</td>
                    <td className="py-2.5">${l.acv.toLocaleString()}</td>
                    <td className="py-2.5"><span className={`badge-${l.stage}`}>{l.stage.toUpperCase()}</span></td>
                    <td className="py-2.5">
                      {l.stage !== 'won' && (
                        <button onClick={() => onWon(l.id, l.company, l.acv)}
                          className="text-xs text-green-600 hover:text-green-700 font-medium">✓ Won</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
