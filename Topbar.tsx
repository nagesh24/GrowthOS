'use client'
import { Bell, LogOut } from 'lucide-react'

export default function Topbar({ user, unreadCount, onNotifClick, onLogout }: {
  user: any; unreadCount: number; onNotifClick: () => void; onLogout: () => void
}) {
  const initials = (user?.user_metadata?.full_name || user?.email || '?')
    .split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand" />
          <span className="font-semibold text-sm">GrowthOS</span>
          {user?.user_metadata?.company && (
            <span className="text-xs text-gray-400 ml-1">{user.user_metadata.company}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onNotifClick} className="relative p-2 rounded-lg hover:bg-gray-50 border border-gray-200 text-sm">
            <Bell size={15} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 text-xs">
            <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-semibold flex items-center justify-center">
              {initials}
            </div>
            <span>{user?.user_metadata?.full_name?.split(' ')[0] || user?.email}</span>
          </div>
          <button onClick={onLogout} className="p-2 rounded-lg hover:bg-gray-50 border border-gray-200 text-gray-400">
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </header>
  )
}
