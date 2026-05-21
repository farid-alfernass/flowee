'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { StatsCard } from '@/components/dashboard/stats-card'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Plus, Store, Package, TrendingUp, MapPin } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

interface DashboardStats {
  totalRekanan: number
  totalSKU: number
  rekananToday: number
  skuToday: number
  surveyPerDay: Array<{ date: string; count: number }>
  rekananPerKota: Array<{ kota: string; count: number }>
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/dashboard/stats')
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [fetchStats])

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'dd/MM', { locale: id })
    } catch {
      return dateStr
    }
  }

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Ringkasan survey tim lapangan
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/apps/rekanan/new">
            <Plus className="mr-1 h-4 w-4" />
            Tambah Toko
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <StatsCard
          title="Total Rekanan"
          value={stats?.totalRekanan ?? 0}
          description="Toko yang disurvei"
          icon={Store}
          loading={loading}
        />
        <StatsCard
          title="Total Produk"
          value={stats?.totalSKU ?? 0}
          description="SKU terdata"
          icon={Package}
          loading={loading}
        />
        <StatsCard
          title="Rekanan Hari Ini"
          value={stats?.rekananToday ?? 0}
          description="Disurvei hari ini"
          icon={TrendingUp}
          loading={loading}
        />
        <StatsCard
          title="Produk Hari Ini"
          value={stats?.skuToday ?? 0}
          description="Ditambahkan hari ini"
          icon={MapPin}
          loading={loading}
        />
      </div>

      {/* Survey per Day Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Survey 7 Hari Terakhir</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-48 w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={stats?.surveyPerDay || []}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  tick={{ fontSize: 11 }}
                />
                <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip
                  labelFormatter={(label) => formatDate(label as string)}
                  formatter={(value) => [value, 'Toko']}
                />
                <Bar
                  dataKey="count"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Top Cities Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Top 5 Kota</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-48 w-full" />
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart
                data={stats?.rekananPerKota || []}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
                <YAxis
                  type="category"
                  dataKey="kota"
                  tick={{ fontSize: 10 }}
                  width={80}
                />
                <Tooltip formatter={(value) => [value, 'Toko']} />
                <Bar
                  dataKey="count"
                  fill="hsl(var(--secondary))"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <RecentActivity />

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button asChild variant="outline" className="touch-target h-auto py-4">
          <Link href="/apps/rekanan" className="flex flex-col items-center gap-2">
            <Store className="h-6 w-6" />
            <span className="text-sm">Lihat Semua Rekanan</span>
          </Link>
        </Button>
        <Button asChild variant="outline" className="touch-target h-auto py-4">
          <Link href="/apps/rekanan/new" className="flex flex-col items-center gap-2">
            <Plus className="h-6 w-6" />
            <span className="text-sm">Tambah Toko Baru</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
