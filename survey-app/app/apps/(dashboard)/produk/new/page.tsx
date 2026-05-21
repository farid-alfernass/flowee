import { Suspense } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { NewProdukContent } from './content'

export default function NewProdukPage() {
  return (
    <div>
      {/* Header */}
      <div className="sticky top-14 z-10 flex items-center gap-3 border-b bg-background px-4 py-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/apps/rekanan">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="font-semibold">Tambah Produk</h1>
          <p className="text-xs text-muted-foreground">
            Tambahkan produk ke toko rekanan
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="p-4">Memuat...</div>}>
        <NewProdukContent />
      </Suspense>
    </div>
  )
}
