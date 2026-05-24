'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import {
  ChevronLeft,
  Edit,
  Phone,
  MapPin,
  Clock,
  Package,
  Plus,
  ExternalLink,
  Store,
} from 'lucide-react'
import { formatDistanceToNow, format } from 'date-fns'
import { id } from 'date-fns/locale'
import { SKUGrid } from '@/components/sku/sku-grid'

interface RekananDetail {
  id: string
  namaToko: string
  namaOwner: string
  noWa: string
  resellerAllowed: boolean
  fotoTokoUrl: string
  jamLayanan: string | null
  alamat: string
  provinsi: string
  kabKota: string
  kecamatan: string
  kelurahan: string
  latitude: number | null
  longitude: number | null
  gpsAccuracy: number | null
  status: string
  ongkirStatus: string
  surveyedAt: string
  surveyorName: string | null
  updatedAt: string
  updatedBy: string | null
}

interface SKU {
  id: string
  namaBarang: string
  kategori: string
  harga: number
  hargaReseller: number
  foto1Url: string
  diskon: number | null
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

const ongkirLabels = {
  gratis: 'Gratis',
  berbayar: 'Berbayar',
  negosiasi: 'Negosiasi',
}

export default function RekananDetailPage() {
  const params = useParams()
  const id_param = params['id'] as string
  const [rekanan, setRekanan] = useState<RekananDetail | null>(null)
  const [products, setProducts] = useState<SKU[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/rekanan/${id_param}`)
        if (res.ok) {
          const data = await res.json()
          setRekanan(data.data)
          setProducts(data.products || [])
        }
      } catch {
        // Silently fail
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id_param])

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-9 rounded" />
          <Skeleton className="h-6 w-40" />
        </div>
        <Skeleton className="aspect-video w-full rounded-lg" />
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (!rekanan) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center p-4">
        <Store className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="font-medium">Rekanan tidak ditemukan</h3>
        <Button asChild className="mt-4">
          <Link href="/apps/rekanan">Kembali ke Daftar</Link>
        </Button>
      </div>
    )
  }

  const mapsUrl = rekanan.latitude && rekanan.longitude
    ? `https://www.google.com/maps?q=${rekanan.latitude},${rekanan.longitude}`
    : `https://www.google.com/maps/search/${encodeURIComponent(rekanan.alamat + ', ' + rekanan.kabKota)}`

  const waUrl = `https://wa.me/${rekanan.noWa.replace('+', '')}`

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="sticky top-14 z-10 flex items-center justify-between border-b bg-background px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/apps/rekanan">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="min-w-0">
            <h1 className="font-semibold truncate">{rekanan.namaToko}</h1>
            <p className="text-xs text-muted-foreground">{rekanan.id}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/apps/rekanan/${id_param}/edit`}>
            <Edit className="mr-1 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </div>

      <div className="px-4 space-y-4">
        {/* Foto */}
        {rekanan.fotoTokoUrl && (
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={rekanan.fotoTokoUrl}
              alt={rekanan.namaToko}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Status badges */}
        <div className="flex flex-wrap gap-2">
          <Badge
            className={statusColors[rekanan.status as keyof typeof statusColors] || ''}
            variant="outline"
          >
            {statusLabels[rekanan.status as keyof typeof statusLabels] || rekanan.status}
          </Badge>
          {rekanan.resellerAllowed && (
            <Badge variant="outline">Menerima Reseller</Badge>
          )}
          <Badge variant="outline">
            Ongkir: {ongkirLabels[rekanan.ongkirStatus as keyof typeof ongkirLabels] || rekanan.ongkirStatus}
          </Badge>
        </div>

        {/* Info Card */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">Nama Toko</p>
              <p className="font-medium">{rekanan.namaToko}</p>
            </div>
            <Separator />
            <div>
              <p className="text-xs text-muted-foreground">Nama Pemilik</p>
              <p className="font-medium">{rekanan.namaOwner}</p>
            </div>
            <Separator />
            <div>
              <p className="text-xs text-muted-foreground">Nomor WhatsApp</p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-medium text-primary"
              >
                <Phone className="h-4 w-4" />
                {rekanan.noWa}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            {rekanan.jamLayanan && (
              <>
                <Separator />
                <div>
                  <p className="text-xs text-muted-foreground">Jam Layanan</p>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{rekanan.jamLayanan}</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Alamat Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Lokasi
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-2">
            <p className="text-sm">{rekanan.alamat}</p>
            <p className="text-sm text-muted-foreground">
              {rekanan.kelurahan}, {rekanan.kecamatan}
            </p>
            <p className="text-sm text-muted-foreground">
              {rekanan.kabKota}, {rekanan.provinsi}
            </p>
            {rekanan.latitude && rekanan.longitude && (
              <p className="text-xs text-muted-foreground">
                GPS: {rekanan.latitude.toFixed(6)}, {rekanan.longitude.toFixed(6)}
                {rekanan.gpsAccuracy && ` (±${rekanan.gpsAccuracy}m)`}
              </p>
            )}
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2"
              asChild
            >
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                <MapPin className="mr-2 h-4 w-4" />
                Buka di Google Maps
                <ExternalLink className="ml-2 h-3 w-3" />
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Survey Info */}
        <Card>
          <CardContent className="p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Disurvei oleh</span>
              <span className="font-medium">{rekanan.surveyorName || '-'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Waktu survey</span>
              <span className="font-medium">
                {format(new Date(rekanan.surveyedAt), 'dd MMM yyyy', { locale: id })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Terakhir diperbarui</span>
              <span className="font-medium">
                {formatDistanceToNow(new Date(rekanan.updatedAt), {
                  addSuffix: true,
                  locale: id,
                })}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Products Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              <h2 className="font-semibold">Produk ({products.length})</h2>
            </div>
            <Button asChild size="sm">
              <Link href={`/apps/produk/new?rekananId=${id_param}`}>
                <Plus className="mr-1 h-4 w-4" />
                Tambah
              </Link>
            </Button>
          </div>

          <SKUGrid products={products} rekananId={id_param} />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pb-4">
          <Button variant="outline" className="touch-target" asChild>
            <a href={waUrl} target="_blank" rel="noopener noreferrer">
              <Phone className="mr-2 h-4 w-4" />
              WhatsApp Owner
            </a>
          </Button>
          <Button variant="outline" className="touch-target" asChild>
            <Link href={`/apps/rekanan/${id_param}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Toko
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
