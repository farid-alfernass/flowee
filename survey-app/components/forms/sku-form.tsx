'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ImageUpload } from '@/components/forms/image-upload'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

const skuSchema = z.object({
  rekananId: z.string().min(1),
  namaBarang: z.string().min(1, 'Nama barang wajib diisi').max(200),
  kategori: z.enum([
    'buket_wisuda',
    'hand_bouquet',
    'papan_bunga',
    'standing_flower',
    'sympathy_flower',
    'custom_arrangement',
  ]),
  type: z.enum(['fresh', 'artificial', 'mixed']).optional(),
  deskripsi: z.string().max(500).optional(),
  harga: z.number().positive('Harga harus lebih dari 0'),
  hargaReseller: z.number().positive('Harga reseller harus lebih dari 0'),
  diskon: z.number().min(0).max(50).default(0),
  ukuran: z.enum(['small', 'medium', 'large', 'extra_large']).optional(),
  foto1Url: z.string().min(1, 'Minimal 1 foto wajib diupload'),
  foto2Url: z.string().optional(),
  foto3Url: z.string().optional(),
  foto4Url: z.string().optional(),
})

type SKUFormData = z.infer<typeof skuSchema>

interface SKUFormProps {
  rekananId: string
  skuId?: string
  initialData?: Partial<SKUFormData>
  mode: 'create' | 'edit'
}

const kategoriOptions = [
  { value: 'buket_wisuda', label: 'Buket Wisuda' },
  { value: 'hand_bouquet', label: 'Hand Bouquet' },
  { value: 'papan_bunga', label: 'Papan Bunga' },
  { value: 'standing_flower', label: 'Standing Flower' },
  { value: 'sympathy_flower', label: 'Sympathy Flower' },
  { value: 'custom_arrangement', label: 'Custom Arrangement' },
]

const typeOptions = [
  { value: 'fresh', label: 'Segar (Fresh)' },
  { value: 'artificial', label: 'Artificial' },
  { value: 'mixed', label: 'Campuran (Mixed)' },
]

const ukuranOptions = [
  { value: 'small', label: 'Kecil (Small)' },
  { value: 'medium', label: 'Sedang (Medium)' },
  { value: 'large', label: 'Besar (Large)' },
  { value: 'extra_large', label: 'Ekstra Besar (XL)' },
]

function formatRupiahInput(value: string): string {
  const num = value.replace(/\D/g, '')
  return num ? parseInt(num).toLocaleString('id-ID') : ''
}

export function SKUForm({ rekananId, skuId, initialData, mode }: SKUFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [hargaDisplay, setHargaDisplay] = useState(
    initialData?.harga ? initialData.harga.toLocaleString('id-ID') : ''
  )
  const [hargaResellerDisplay, setHargaResellerDisplay] = useState(
    initialData?.hargaReseller
      ? initialData.hargaReseller.toLocaleString('id-ID')
      : ''
  )

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<SKUFormData>({
    resolver: zodResolver(skuSchema) as any,
    defaultValues: {
      rekananId,
      ...initialData,
    },
  })

  const foto1Url = watch('foto1Url')
  const foto2Url = watch('foto2Url')
  const foto3Url = watch('foto3Url')
  const foto4Url = watch('foto4Url')

  const onSubmit = async (data: SKUFormData) => {
    setIsLoading(true)
    try {
      const url = mode === 'create' ? '/api/sku' : `/api/sku/${skuId}`
      const method = mode === 'create' ? 'POST' : 'PATCH'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) {
        if (result.details) {
          const firstError = Object.values(result.details)[0]
          toast.error(
            Array.isArray(firstError) ? firstError[0] : String(firstError)
          )
        } else {
          toast.error(result.error || 'Terjadi kesalahan')
        }
        return
      }

      toast.success(
        mode === 'create' ? 'Produk berhasil ditambahkan!' : 'Produk berhasil diperbarui!'
      )
      router.push(`/apps/rekanan/${rekananId}`)
      router.refresh()
    } catch {
      toast.error('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
      {/* Foto Produk */}
      <div className="space-y-3">
        <Label>
          Foto Produk <span className="text-destructive">*</span>
          <span className="text-xs text-muted-foreground ml-1">(min 1, max 4)</span>
        </Label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Foto 1 *</p>
            <ImageUpload
              value={foto1Url}
              onChange={(url) => setValue('foto1Url', url)}
              onRemove={() => setValue('foto1Url', '')}
              type="produk"
              label="Foto Utama"
              disabled={isLoading}
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Foto 2</p>
            <ImageUpload
              value={foto2Url}
              onChange={(url) => setValue('foto2Url', url)}
              onRemove={() => setValue('foto2Url', '')}
              type="produk"
              label="Foto 2"
              disabled={isLoading}
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Foto 3</p>
            <ImageUpload
              value={foto3Url}
              onChange={(url) => setValue('foto3Url', url)}
              onRemove={() => setValue('foto3Url', '')}
              type="produk"
              label="Foto 3"
              disabled={isLoading}
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Foto 4</p>
            <ImageUpload
              value={foto4Url}
              onChange={(url) => setValue('foto4Url', url)}
              onRemove={() => setValue('foto4Url', '')}
              type="produk"
              label="Foto 4"
              disabled={isLoading}
            />
          </div>
        </div>
        {errors.foto1Url && (
          <p className="text-sm text-destructive">{errors.foto1Url.message}</p>
        )}
      </div>

      {/* Nama Barang */}
      <div className="space-y-2">
        <Label htmlFor="namaBarang">
          Nama Barang <span className="text-destructive">*</span>
        </Label>
        <Input
          id="namaBarang"
          placeholder="Contoh: Buket Wisuda Premium"
          disabled={isLoading}
          {...register('namaBarang')}
          className={errors.namaBarang ? 'border-destructive' : ''}
        />
        {errors.namaBarang && (
          <p className="text-sm text-destructive">{errors.namaBarang.message}</p>
        )}
      </div>

      {/* Kategori */}
      <div className="space-y-2">
        <Label>
          Kategori <span className="text-destructive">*</span>
        </Label>
        <Select
          value={watch('kategori')}
          onValueChange={(val) => setValue('kategori', val as SKUFormData['kategori'])}
          disabled={isLoading}
        >
          <SelectTrigger className={errors.kategori ? 'border-destructive' : ''}>
            <SelectValue placeholder="Pilih kategori" />
          </SelectTrigger>
          <SelectContent>
            {kategoriOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.kategori && (
          <p className="text-sm text-destructive">{errors.kategori.message}</p>
        )}
      </div>

      {/* Type */}
      <div className="space-y-2">
        <Label>Tipe Bunga</Label>
        <Select
          value={watch('type') || ''}
          onValueChange={(val) =>
            setValue('type', val as SKUFormData['type'] || undefined)
          }
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih tipe (opsional)" />
          </SelectTrigger>
          <SelectContent>
            {typeOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Ukuran */}
      <div className="space-y-2">
        <Label>Ukuran</Label>
        <Select
          value={watch('ukuran') || ''}
          onValueChange={(val) =>
            setValue('ukuran', val as SKUFormData['ukuran'] || undefined)
          }
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih ukuran (opsional)" />
          </SelectTrigger>
          <SelectContent>
            {ukuranOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Harga */}
      <div className="space-y-2">
        <Label htmlFor="harga">
          Harga Jual <span className="text-destructive">*</span>
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            Rp
          </span>
          <Input
            id="harga"
            type="text"
            inputMode="numeric"
            placeholder="0"
            className={`pl-9 ${errors.harga ? 'border-destructive' : ''}`}
            value={hargaDisplay}
            onChange={(e) => {
              const formatted = formatRupiahInput(e.target.value)
              setHargaDisplay(formatted)
              const num = parseInt(formatted.replace(/\./g, '')) || 0
              setValue('harga', num)
            }}
            disabled={isLoading}
          />
        </div>
        {errors.harga && (
          <p className="text-sm text-destructive">{errors.harga.message}</p>
        )}
      </div>

      {/* Harga Reseller */}
      <div className="space-y-2">
        <Label htmlFor="hargaReseller">
          Harga Reseller <span className="text-destructive">*</span>
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            Rp
          </span>
          <Input
            id="hargaReseller"
            type="text"
            inputMode="numeric"
            placeholder="0"
            className={`pl-9 ${errors.hargaReseller ? 'border-destructive' : ''}`}
            value={hargaResellerDisplay}
            onChange={(e) => {
              const formatted = formatRupiahInput(e.target.value)
              setHargaResellerDisplay(formatted)
              const num = parseInt(formatted.replace(/\./g, '')) || 0
              setValue('hargaReseller', num)
            }}
            disabled={isLoading}
          />
        </div>
        {errors.hargaReseller && (
          <p className="text-sm text-destructive">
            {errors.hargaReseller.message}
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          Harus lebih rendah dari harga jual
        </p>
      </div>

      {/* Diskon */}
      <div className="space-y-2">
        <Label htmlFor="diskon">Diskon (%)</Label>
        <Input
          id="diskon"
          type="number"
          inputMode="numeric"
          placeholder="0"
          min="0"
          max="50"
          disabled={isLoading}
          {...register('diskon', {
            valueAsNumber: true,
            setValueAs: (v: string) => (v === '' || isNaN(Number(v)) ? 0 : Number(v)),
          })}
          className={errors.diskon ? 'border-destructive' : ''}
        />
        {errors.diskon && (
          <p className="text-sm text-destructive">{errors.diskon.message}</p>
        )}
        <p className="text-xs text-muted-foreground">Maksimal 50%</p>
      </div>

      {/* Deskripsi */}
      <div className="space-y-2">
        <Label htmlFor="deskripsi">Deskripsi</Label>
        <Textarea
          id="deskripsi"
          placeholder="Deskripsi produk (opsional, max 500 karakter)"
          rows={3}
          disabled={isLoading}
          {...register('deskripsi')}
        />
        {errors.deskripsi && (
          <p className="text-sm text-destructive">{errors.deskripsi.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="touch-target w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {mode === 'create' ? 'Menyimpan...' : 'Memperbarui...'}
          </>
        ) : mode === 'create' ? (
          'Simpan Produk'
        ) : (
          'Perbarui Produk'
        )}
      </Button>
    </form>
  )
}
