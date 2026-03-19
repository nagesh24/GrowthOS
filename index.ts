export type Lead = {
  id: string
  user_id: string
  company: string
  contact: string
  acv: number
  stage: 'cold' | 'warm' | 'hot' | 'won'
  created_at: string
}

export type Goal = {
  id: string
  user_id: string
  name: string
  progress: number
  category: 'Revenue' | 'Growth' | 'Product' | 'Marketing' | 'Team'
  due: string
  created_at: string
}

export type Notification = {
  id: string
  user_id: string
  title: string
  type: 'success' | 'warning' | 'info' | 'danger'
  read: boolean
  created_at: string
}
