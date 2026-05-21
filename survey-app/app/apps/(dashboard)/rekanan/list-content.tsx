'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Plus,
  Search,
  Store,
  MapPin,
  Phone,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { PROVINCES } from '@/lib/data/indonesia'
import { formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'

interface Rekanan {
  id: string
  namaToko: string
  namaOwner: string
  noWa: string
  kabKota: string
  provinsi: string
  status: string
  resellerAllowed: boolean
  surveyedAt: string
  fotoTokoUrl: string
  surveyorName?: string
}

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  pending: 'bg-yellow-100 text-yellow-800',
}

const statusLabels = {
  active: 'Aktif',
  inactive: 'Tidak Aktif',
  pending: 'Pending',
}

export function RekananListContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [rekananList, setRekananList] = useState<Rekanan[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const q = searchParams.get('q') || ''
  const provinsi = searchParams.get('provinsi') || ''
  const reseller = searchParams.get('reseller') || ''
  const page = parseInt(searchParams.get('page') || '1')

  const fetchRekanan = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (q) params.set('q', q)
      if (provinsi) params.set('provinsi', provinsi)
      if (reseller) params.set('reseller', reseller)
      params.set('page', String(page))
      params.set('limit', '20')

      const res = await fetch(`/api/rekanan?${params}`)
      if (res.ok) {
        const data = await res.json()
        setRekananList(data.data)
        setTotal(data.total)
        setTotalPages(data.totalPages)
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false)
    }
  }, [q, provinsi, reseller, page])

  useEffect(() => {
    fetchRekanan()
  }, [fetchRekanan])

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page')
    router.push(`/apps/rekanan?${params}`)
  }

  const clearFilters = () => {
    router.push('/apps/rekanan')
  }

  const hasFilters = q || provinsi || reseller

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Rekanan</h1>
          <p className="text-sm text-muted-foreground">
            {total} toko terdaftar
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/apps/rekanan/new">
            <Plus className="mr-1 h-4 w-4" />
            Tambah
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari nama toko atau pemilik..."
          className="pl-9"
          defaultValue={q}
          onChange={(e) => {
            const val = e.target.value
            if (val.length === 0 || val.length >= 3) {
              updateFilter('q', val)
            }
          }}
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
        <Select
          value={provinsi || 'all'}
          onValueChange={(val) => updateFilter('provinsi', val === 'all' ? '' : val)}
        >
          <SelectTrigger className="w-40 shrink-0">
            <SelectValue placeholder="Provinsi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Provinsi</SelectItem>
            {PROVINCES.map((prov) => (
              <SelectItem key={prov} value={prov}>
                {prov}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={reseller || 'all'}
          onValueChange={(val) => updateFilter('reseller', val === 'all' ? '' : val)}
        >
          <SelectTrigger className="w-36 shrink-0">
            <SelectValue placeholder="Reseller" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua</SelectItem>
            <SelectItem value="true">Menerima Reseller</SelectItem>
            <SelectItem value="false">Tidak Reseller</SelectItem>
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="shrink-0"
          >
            <X className="mr-1 h-4 w-4" />
            Hapus Filter
          </Button>
        )}
      </div>

      {/* Active filter badges */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2">
          {q && (
            <Badge variant="secondary" className="gap-1">
              Cari: {q}
              <button onClick={() => updateFilter('q', '')}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {provinsi && (
            <Badge variant="secondary" className="gap-1">
              {provinsi}
              <button onClick={() => updateFilter('provinsi', '')}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {reseller && (
            <Badge variant="secondary" className="gap-1">
              {reseller === 'true' ? 'Menerima Reseller' : 'Tidak Reseller'}
              <button onClick={() => updateFilter('reseller', '')}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Skeleton className="h-16 w-16 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : rekananList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Store className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="font-medium">Belum ada rekanan</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {hasFilters
              ? 'Tidak ada hasil untuk filter ini'
              : 'Mulai tambahkan toko rekanan pertama'}
          </p>
          {!hasFilters && (
            <Button asChild className="mt-4">
              <Link href="/apps/rekanan/new">
                <Plus className="mr-2 h-4 w-4" />
                Tambah Toko
              </Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {rekananList.map((rekanan) => (
            <Link key={rekanan.id} href={`/rekanan/${rekanan.id}`}>
              <Card className="hover:bg-muted/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    {/* Thumbnail */}
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                      {rekanan.fotoTokoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={rekanan.fotoTokoUrl}
                          alt={rekanan.namaToko}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Store className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium truncate">{rekanan.namaToko}</h3>
                        <Badge
                          className={`shrink-0 text-xs ${statusColors[rekanan.status as keyof typeof statusColors] || ''}`}
                          variant="outline"
                        >
                          {statusLabels[rekanan.status as keyof typeof statusLabels] || rekanan.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {rekanan.namaOwner}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3 text-muted-foreground shrink-0" />
                        <span className="text-xs text-muted-foreground truncate">
                          {rekanan.kabKota}, {rekanan.provinsi}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {rekanan.noWa}
                          </span>
                        </div>
                        {rekanan.resellerAllowed && (
                          <Badge variant="outline" className="text-xs py-0">
                            Reseller
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(rekanan.surveyedAt), {
                          addSuffix: true,
                          locale: id,
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
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
            onClick={() => updateFilter('page', String(page - 1))}
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
            onClick={() => updateFilter('page', String(page + 1))}
          >
            Berikutnya
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
