'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Package, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface SKU {
  id: string
  rekananId: string
  namaBarang: string
  kategori: string
  type: string | null
  harga: number
  hargaReseller: number
  diskon: number | null
  foto1Url: string
  foto2Url: string | null
}

const kategoriLabels: Record<string, string> = {
  buket_wisuda: 'Buket Wisuda',
  hand_bouquet: 'Hand Bouquet',
  papan_bunga: 'Papan Bunga',
  standing_flower: 'Standing Flower',
  sympathy_flower: 'Sympathy Flower',
  custom_arrangement: 'Custom',
}

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}

export default function ProdukListPage() {
  const [products, setProducts] = useState<SKU[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [kategori, setKategori] = useState('')

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (kategori) params.set('kategori', kategori)
        params.set('limit', '50')

        const res = await fetch(`/api/sku?${params.toString()}`)
        if (res.ok) {
          const json = await res.json()
          setProducts(json.data || [])
        }
      } catch {
        // silent
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [kategori])

  const filtered = search
    ? products.filter((p) =>
        p.namaBarang.toLowerCase().includes(search.toLowerCase())
      )
    : products

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Package className="h-5 w-5" />
        <h1 className="text-lg font-semibold">Produk</h1>
        <Badge variant="secondary" className="ml-auto">
          {filtered.length}
        </Badge>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <Badge
          variant={kategori === '' ? 'default' : 'outline'}
          className="cursor-pointer whitespace-nowrap"
          onClick={() => setKategori('')}
        >
          Semua
        </Badge>
        {Object.entries(kategoriLabels).map(([key, label]) => (
          <Badge
            key={key}
            variant={kategori === key ? 'default' : 'outline'}
            className="cursor-pointer whitespace-nowrap"
            onClick={() => setKategori(key)}
          >
            {label}
          </Badge>
        ))}
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Package className="h-10 w-10 text-muted-foreground/50 mb-3" />
          <p className="text-sm text-muted-foreground">Belum ada produk</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((product) => (
            <Link key={product.id} href={`/apps/produk/${product.id}/edit`}>
              <Card className="overflow-hidden hover:bg-muted/50 transition-colors">
                <div className="relative aspect-square bg-muted">
                  {product.foto1Url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.foto1Url}
                      alt={product.namaBarang}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Package className="h-8 w-8 text-muted-foreground/30" />
                    </div>
                  )}
                  {product.diskon && product.diskon > 0 && (
                    <div className="absolute top-1 left-1">
                      <Badge variant="destructive" className="text-xs py-0">
                        -{product.diskon}%
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-2">
                  <p className="text-xs font-medium truncate">
                    {product.namaBarang}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {kategoriLabels[product.kategori] || product.kategori}
                  </p>
                  <p className="text-xs font-semibold mt-1">
                    {formatRupiah(product.harga)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Reseller: {formatRupiah(product.hargaReseller)}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
