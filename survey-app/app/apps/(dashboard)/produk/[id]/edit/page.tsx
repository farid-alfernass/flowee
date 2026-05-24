'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { SKUForm } from '@/components/forms/sku-form'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ChevronLeft, Trash2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface SKUData {
  rekananId: string
  namaBarang: string
  kategori: 'buket_wisuda' | 'hand_bouquet' | 'papan_bunga' | 'standing_flower' | 'sympathy_flower' | 'custom_arrangement'
  type?: 'fresh' | 'artificial' | 'mixed'
  deskripsi?: string
  harga: number
  hargaReseller: number
  diskon?: number
  ukuran?: 'small' | 'medium' | 'large' | 'extra_large'
  foto1Url: string
  foto2Url?: string
  foto3Url?: string
  foto4Url?: string
}

export default function EditProdukPage() {
  const params = useParams()
  const router = useRouter()
  const id = params['id'] as string
  const [initialData, setInitialData] = useState<SKUData | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/sku/${id}`)
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

  const handleDelete = async () => {
    setDeleting(true)
    try {
      const res = await fetch(`/api/sku/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('Produk berhasil dihapus')
        router.push(`/apps/rekanan/${initialData?.rekananId}`)
        router.refresh()
      } else {
        const data = await res.json()
        toast.error(data.error || 'Gagal menghapus produk')
      }
    } catch {
      toast.error('Terjadi kesalahan')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="sticky top-14 z-10 flex items-center justify-between border-b bg-background px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href={initialData ? `/apps/rekanan/${initialData.rekananId}` : '/apps/rekanan'}>
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="font-semibold">Edit Produk</h1>
            <p className="text-xs text-muted-foreground">Perbarui informasi produk</p>
          </div>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" className="text-destructive">
              <Trash2 className="h-5 w-5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Produk?</AlertDialogTitle>
              <AlertDialogDescription>
                Produk akan dihapus secara permanen. Tindakan ini tidak dapat
                dibatalkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={deleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleting ? 'Menghapus...' : 'Hapus'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
        <SKUForm
          rekananId={initialData.rekananId}
          skuId={id}
          mode="edit"
          initialData={initialData}
        />
      ) : (
        <div className="p-4 text-center">
          <p className="text-muted-foreground">Data tidak ditemukan</p>
        </div>
      )}
    </div>
  )
}
