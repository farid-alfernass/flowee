'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { SKUForm } from '@/components/forms/sku-form'
import { Button } from '@/components/ui/button'

export function NewProdukContent() {
  const searchParams = useSearchParams()
  const rekananId = searchParams.get('rekananId') || ''

  if (!rekananId) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center p-4">
        <p className="text-muted-foreground">ID Rekanan tidak ditemukan</p>
        <Button asChild className="mt-4">
          <Link href="/apps/rekanan">Kembali ke Daftar Rekanan</Link>
        </Button>
      </div>
    )
  }

  return <SKUForm rekananId={rekananId} mode="create" />
}
