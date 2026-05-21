'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Package } from 'lucide-react'

interface SKU {
  id: string
  namaBarang: string
  kategori: string
  harga: number
  hargaReseller: number
  foto1Url: string
  diskon: number | null
}

interface SKUGridProps {
  products: SKU[]
  rekananId?: string
}

const kategoriLabels: Record<string, string> = {
  buket_wisuda: 'Buket Wisuda',
  hand_bouquet: 'Hand Bouquet',
  papan_bunga: 'Papan Bunga',
  standing_flower: 'Standing Flower',
  sympathy_flower: 'Sympathy Flower',
  custom_arrangement: 'Custom',
}

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function SKUGrid({ products }: SKUGridProps) {
  const [filter, setFilter] = useState<string>('all')

  const categories = ['all', ...new Set(products.map((p) => p.kategori))]

  const filtered =
    filter === 'all' ? products : products.filter((p) => p.kategori === filter)

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <Package className="h-10 w-10 text-muted-foreground/50 mb-3" />
        <p className="text-sm text-muted-foreground">Belum ada produk</p>
        <p className="text-xs text-muted-foreground">
          Tambahkan produk untuk toko ini
        </p>
      </div>
    )
  }

  // Calculate margin
  const getMargin = (harga: number, hargaReseller: number) => {
    return Math.round(((harga - hargaReseller) / harga) * 100)
  }

  const maxMargin = Math.max(
    ...products.map((p) => getMargin(p.harga, p.hargaReseller))
  )

  return (
    <div className="space-y-3">
      {/* Category filter */}
      {categories.length > 2 && (
        <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                filter === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {cat === 'all' ? 'Semua' : kategoriLabels[cat] || cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((product) => {
          const margin = getMargin(product.harga, product.hargaReseller)
          const isHighMargin = margin === maxMargin && margin > 0

          return (
            <Link key={product.id} href={`/produk/${product.id}/edit`}>
              <Card
                className={`overflow-hidden hover:bg-muted/50 transition-colors ${
                  isHighMargin ? 'ring-1 ring-primary/30' : ''
                }`}
              >
                <div className="relative aspect-square bg-muted">
                  {product.foto1Url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.foto1Url}
                      alt={product.namaBarang}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Package className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  {isHighMargin && (
                    <div className="absolute top-1 right-1">
                      <Badge className="text-xs py-0 bg-primary">
                        Margin Tinggi
                      </Badge>
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
                  <p className="text-xs font-medium truncate">{product.namaBarang}</p>
                  <p className="text-xs text-muted-foreground">
                    {kategoriLabels[product.kategori] || product.kategori}
                  </p>
                  <p className="text-xs font-semibold mt-1">
                    {formatRupiah(product.harga)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Reseller: {formatRupiah(product.hargaReseller)}
                  </p>
                  <p className="text-xs text-green-600 font-medium">
                    Margin: {margin}%
                  </p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
