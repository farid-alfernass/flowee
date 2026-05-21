'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'
import { Plus, Edit, Trash2, LogIn, LogOut } from 'lucide-react'

interface ActivityLog {
  id: string
  userId: string
  action: string
  entityType: string | null
  entityId: string | null
  createdAt: string
  userName?: string
}

const actionIcons = {
  create: Plus,
  update: Edit,
  delete: Trash2,
  login: LogIn,
  logout: LogOut,
}

const actionLabels = {
  create: 'Menambahkan',
  update: 'Mengubah',
  delete: 'Menghapus',
  login: 'Login',
  logout: 'Logout',
}

const entityLabels = {
  rekanan: 'toko rekanan',
  sku: 'produk',
  user: 'pengguna',
}

export function RecentActivity() {
  const [activities, setActivities] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch('/api/admin/logs?limit=10')
        if (res.ok) {
          const data = await res.json()
          setActivities(data.data || [])
        }
      } catch {
        // Silently fail
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Aktivitas Terbaru</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-3 w-48" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : activities.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Belum ada aktivitas
          </p>
        ) : (
          <div className="space-y-3">
            {activities.map((activity) => {
              const Icon =
                actionIcons[activity.action as keyof typeof actionIcons] || Edit
              const actionLabel =
                actionLabels[activity.action as keyof typeof actionLabels] ||
                activity.action
              const entityLabel = activity.entityType
                ? entityLabels[
                    activity.entityType as keyof typeof entityLabels
                  ] || activity.entityType
                : ''

              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">
                        {activity.userName || 'Pengguna'}
                      </span>{' '}
                      {actionLabel} {entityLabel}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(activity.createdAt), {
                        addSuffix: true,
                        locale: id,
                      })}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
