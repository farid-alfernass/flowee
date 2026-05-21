import Link from 'next/link'
import { RekananForm } from '@/components/forms/rekanan-form'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

export default function NewRekananPage() {
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
          <h1 className="font-semibold">Tambah Toko Rekanan</h1>
          <p className="text-xs text-muted-foreground">
            Isi data toko yang akan disurvei
          </p>
        </div>
      </div>

      <RekananForm mode="create" />
    </div>
  )
}
