'use client'

import { useEffect, useState, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronLeft, ChevronRight, Download } from 'lucide-react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

interface ActivityLog {
  id: string
  userId: string
  action: string
  entityType: string | null
  entityId: string | null
  createdAt: string
  userName: string | null
}

const actionColors = {
  create: 'bg-green-100 text-green-800',
  update: 'bg-blue-100 text-blue-800',
  delete: 'bg-red-100 text-red-800',
  login: 'bg-purple-100 text-purple-800',
  logout: 'bg-gray-100 text-gray-800',
}

const actionLabels = {
  create: 'Tambah',
  update: 'Ubah',
  delete: 'Hapus',
  login: 'Login',
  logout: 'Logout',
}

const entityLabels = {
  rekanan: 'Rekanan',
  sku: 'Produk',
  user: 'Pengguna',
}

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [actionFilter, setActionFilter] = useState('')
  const [dateFrom, setDateFrom] = useState('')

  const fetchLogs = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set('page', String(page))
      params.set('limit', '20')
      if (actionFilter) params.set('action', actionFilter)
      if (dateFrom) params.set('dateFrom', dateFrom)

      const res = await fetch(`/api/admin/logs?${params}`)
      if (res.ok) {
        const data = await res.json()
        setLogs(data.data)
        setTotal(data.total)
        setTotalPages(Math.ceil(data.total / 20))
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false)
    }
  }, [page, actionFilter, dateFrom])

  useEffect(() => {
    fetchLogs()
  }, [fetchLogs])

  const handleExportCSV = () => {
    const headers = ['Waktu', 'Pengguna', 'Aksi', 'Entitas', 'ID Entitas']
    const rows = logs.map((log) => [
      format(new Date(log.createdAt), 'dd/MM/yyyy HH:mm', { locale: id }),
      log.userName || log.userId,
      actionLabels[log.action as keyof typeof actionLabels] || log.action,
      log.entityType
        ? entityLabels[log.entityType as keyof typeof entityLabels] || log.entityType
        : '-',
      log.entityId || '-',
    ])

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `activity-logs-${format(new Date(), 'yyyyMMdd')}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Log Aktivitas</h1>
          <p className="text-sm text-muted-foreground">{total} aktivitas tercatat</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleExportCSV}>
          <Download className="mr-1 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <Select
          value={actionFilter || 'all'}
          onValueChange={(val) => {
            setActionFilter(val === 'all' ? '' : val)
            setPage(1)
          }}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Aksi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Aksi</SelectItem>
            <SelectItem value="create">Tambah</SelectItem>
            <SelectItem value="update">Ubah</SelectItem>
            <SelectItem value="delete">Hapus</SelectItem>
            <SelectItem value="login">Login</SelectItem>
            <SelectItem value="logout">Logout</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={dateFrom}
          onChange={(e) => {
            setDateFrom(e.target.value)
            setPage(1)
          }}
          className="flex-1"
        />
      </div>

      {/* Logs */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-3">
                <div className="flex gap-3">
                  <Skeleton className="h-6 w-16 rounded" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : logs.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          Tidak ada log aktivitas
        </div>
      ) : (
        <div className="space-y-2">
          {logs.map((log) => (
            <Card key={log.id}>
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <Badge
                    className={`shrink-0 text-xs ${actionColors[log.action as keyof typeof actionColors] || ''}`}
                    variant="outline"
                  >
                    {actionLabels[log.action as keyof typeof actionLabels] || log.action}
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">
                        {log.userName || 'Pengguna'}
                      </span>
                      {log.entityType && (
                        <span className="text-muted-foreground">
                          {' '}
                          →{' '}
                          {entityLabels[
                            log.entityType as keyof typeof entityLabels
                          ] || log.entityType}
                          {log.entityId && (
                            <span className="text-xs"> ({log.entityId})</span>
                          )}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(log.createdAt), 'dd MMM yyyy, HH:mm', {
                        locale: id,
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
            Sebelumnya
          </Button>
          <span className="text-sm text-muted-foreground">
            {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            Berikutnya
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
