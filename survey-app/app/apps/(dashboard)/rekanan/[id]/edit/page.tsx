'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { RekananForm } from '@/components/forms/rekanan-form'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ChevronLeft } from 'lucide-react'

interface RekananData {
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
  status: 'active' | 'inactive' | 'pending'
  ongkirStatus: 'gratis' | 'berbayar' | 'negosiasi'
}

export default function EditRekananPage() {
  const params = useParams()
  const id = params['id'] as string
  const [initialData, setInitialData] = useState<Partial<RekananData> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/rekanan/${id}`)
        if (res.ok) {
          const data = await res.json()
          setInitialData(data.data)
        }
      } catch {
        // Silently fail
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  return (
    <div>
      {/* Header */}
      <div className="sticky top-14 z-10 flex items-center gap-3 border-b bg-background px-4 py-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/apps/rekanan/${id}`}>
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="font-semibold">Edit Toko Rekanan</h1>
          <p className="text-xs text-muted-foreground">Perbarui informasi toko</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4 p-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      ) : initialData ? (
        <RekananForm
          mode="edit"
          rekananId={id}
          initialData={{
            ...initialData,
            latitude: initialData.latitude ?? undefined,
            longitude: initialData.longitude ?? undefined,
            gpsAccuracy: initialData.gpsAccuracy ?? undefined,
            jamLayanan: initialData.jamLayanan ?? undefined,
          }}
        />
      ) : (
        <div className="p-4 text-center">
          <p className="text-muted-foreground">Data tidak ditemukan</p>
        </div>
      )}
    </div>
  )
}
