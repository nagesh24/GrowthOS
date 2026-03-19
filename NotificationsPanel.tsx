'use client'
import type { Notification } from '@/types'
import { X } from 'lucide-react'

const TYPE_STYLES: Record<string, { bg: string; dot: string; icon: string }> = {
  success: { bg: 'bg-green-50', dot: 'bg-green-500', icon: '✅' },
  warning: { bg: 'bg-amber-50', dot: 'bg-amber-500', icon: '⚠️' },
  info:    { bg: 'bg-blue-50',  dot: 'bg-blue-500',  icon: 'ℹ️' },
  danger:  { bg: 'bg-red-50',   dot: 'bg-red-500',   icon: '🚨' },
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  if (mins < 1440) return `${Math.floor(mins / 60)}h ago`
  return `${Math.floor(mins / 1440)}d ago`
}

export default function NotificationsPanel({ notifications, onMarkAllRead, onClose }: {
  notifications: Notification[]
  onMarkAllRead: () => void
  onClose: () => void
}) {
  const unread = notifications.filter(n => !n.read).length

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm mb-4 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <span className="text-sm font-medium">
            Notifications {unread > 0 && <span className="text-xs text-gray-400 ml-1">{unread} unread</span>}
          </span>
          <div className="flex items-center gap-2">
            {unread > 0 && (
              <button onClick={onMarkAllRead} className="text-xs text-brand hover:underline">
                Mark all read
              </button>
            )}
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={14} />
            </button>
          </div>
        </div>
        {notifications.length === 0 ? (
          <div className="px-4 py-6 text-sm text-gray-400 text-center">All caught up!</div>
        ) : (
          <div>
            {notifications.slice(0, 8).map(n => {
              const style = TYPE_STYLES[n.type] || TYPE_STYLES.info
              return (
                <div key={n.id} className={`flex items-start gap-3 px-4 py-3 border-b border-gray-50 last:border-0 ${n.read ? '' : style.bg}`}>
                  <div className={`w-7 h-7 rounded-lg ${style.bg} flex items-center justify-center text-sm flex-shrink-0`}>
                    {style.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{n.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{timeAgo(n.created_at)}</p>
                  </div>
                  {!n.read && <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${style.dot}`} />}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
