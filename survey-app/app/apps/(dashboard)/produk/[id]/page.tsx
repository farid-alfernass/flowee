'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { ChevronLeft, Edit, Package } from 'lucide-react'
import { ImageCarousel } from '@/components/ui/image-carousel'

interface SKUData {
  id: string
  rekananId: string
  namaBarang: string
  kategori: string
  type?: string
  deskripsi?: string
  harga: number
  hargaReseller: number
  diskon?: number | null
  ukuran?: string
  foto1Url: string
  foto2Url?: string
  foto3Url?: string
  foto4Url?: string
}

const kategoriLabels: Record<string, string> = {
  buket_wisuda: 'Buket Wisuda',
  hand_bouquet: 'Hand Bouquet',
  papan_bunga: 'Papan Bunga',
  standing_flower: 'Standing Flower',
  sympathy_flower: 'Sympathy Flower',
  custom_arrangement: 'Custom Arrangement',
}

const typeLabels: Record<string, string> = {
  fresh: 'Segar (Fresh)',
  artificial: 'Artificial',
  mixed: 'Campuran (Mixed)',
}

const ukuranLabels: Record<string, string> = {
  small: 'Kecil (S)',
  medium: 'Sedang (M)',
  large: 'Besar (L)',
  extra_large: 'Ekstra Besar (XL)',
}

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function ProdukDetailPage() {
  const params = useParams()
  const id = params['id'] as string
  const [data, setData] = useState<SKUData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/sku/${id}`)
        if (res.ok) {
          const result = await res.json()
          setData(result.data)
        }
      } catch {
        // Silently fail
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  if (loading) {
    return (
      <div>
        <div className="sticky top-14 z-10 flex items-center gap-3 border-b bg-background px-4 py-3">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-5 w-32" />
        </div>
        <Skeleton className="aspect-square w-full" />
        <div className="space-y-3 p-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-8 w-1/3" />
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Package className="h-12 w-12 text-muted-foreground/50 mb-3" />
        <p className="text-muted-foreground">Produk tidak ditemukan</p>
        <Button asChild className="mt-4">
          <Link href="/apps/rekanan">Kembali</Link>
        </Button>
      </div>
    )
  }

  const images = [data.foto1Url, data.foto2Url, data.foto3Url, data.foto4Url].filter(
    Boolean
  ) as string[]

  const margin = Math.round(((data.harga - data.hargaReseller) / data.harga) * 100)

  return (
    <div>
      {/* Header */}
      <div className="sticky top-14 z-10 flex items-center justify-between border-b bg-background px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/apps/rekanan/${data.rekananId}`}>
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="font-semibold">Detail Produk</h1>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/apps/produk/${id}/edit`}>
            <Edit className="mr-1 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </div>

      {/* Image Carousel */}
      <ImageCarousel images={images} alt={data.namaBarang} />

      {/* Product Info */}
      <div className="space-y-4 p-4">
        {/* Name & Category */}
        <div>
          <h2 className="text-lg font-semibold">{data.namaBarang}</h2>
          <div className="mt-1 flex flex-wrap gap-2">
            <Badge variant="secondary">
              {kategoriLabels[data.kategori] || data.kategori}
            </Badge>
            {data.type && (
              <Badge variant="outline">{typeLabels[data.type] || data.type}</Badge>
            )}
            {data.ukuran && (
              <Badge variant="outline">
                {ukuranLabels[data.ukuran] || data.ukuran}
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing */}
        <div className="rounded-lg border p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Harga Jual</span>
            <span className="font-semibold">{formatRupiah(data.harga)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Harga Reseller</span>
            <span className="font-medium">{formatRupiah(data.hargaReseller)}</span>
          </div>
          <div className="flex items-center justify-between border-t pt-2">
            <span className="text-sm text-muted-foreground">Margin</span>
            <span className="font-medium text-green-600">{margin}%</span>
          </div>
          {data.diskon && data.diskon > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Diskon</span>
              <Badge variant="destructive">-{data.diskon}%</Badge>
            </div>
          )}
        </div>

        {/* Description */}
        {data.deskripsi && (
          <div>
            <h3 className="text-sm font-medium mb-1">Deskripsi</h3>
            <p className="text-sm text-muted-foreground">{data.deskripsi}</p>
          </div>
        )}
      </div>
    </div>
  )
}
