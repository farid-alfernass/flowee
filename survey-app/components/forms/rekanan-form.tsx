'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { ImageUpload } from '@/components/forms/image-upload'
import { JamLayananPicker, jamLayananToString, parseJamLayanan, type JamLayananValue } from '@/components/forms/jam-layanan-picker'
import { PROVINCES, getCitiesByProvince, getDistrictsByCity } from '@/lib/data/indonesia'
import { Loader2, MapPin } from 'lucide-react'
import { toast } from 'sonner'
import { validateWhatsAppNumber } from '@/lib/validators'

const rekananSchema = z.object({
  namaToko: z.string().min(1, 'Nama toko wajib diisi').max(100),
  namaOwner: z.string().min(1, 'Nama pemilik wajib diisi').max(100),
  noWa: z
    .string()
    .min(1, 'Nomor WhatsApp wajib diisi')
    .refine(validateWhatsAppNumber, {
      message: 'Format: 08xxx (contoh: 081234567890)',
    }),
  resellerAllowed: z.boolean().default(false),
  fotoTokoUrl: z.string().min(1, 'Foto toko wajib diupload'),
  jamLayanan: z.string().optional(),
  alamat: z.string().min(1, 'Alamat wajib diisi'),
  provinsi: z.string().min(1, 'Provinsi wajib dipilih'),
  kabKota: z.string().min(1, 'Kabupaten/Kota wajib dipilih'),
  kecamatan: z.string().min(1, 'Kecamatan wajib diisi'),
  kelurahan: z.string().min(1, 'Kelurahan wajib diisi'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  gpsAccuracy: z.number().optional(),
  status: z.enum(['active', 'inactive', 'pending']).default('active'),
  ongkirStatus: z.enum(['gratis', 'berbayar', 'negosiasi']).default('negosiasi'),
})

type RekananFormData = z.infer<typeof rekananSchema>

interface RekananFormProps {
  initialData?: Partial<RekananFormData>
  rekananId?: string
  mode: 'create' | 'edit'
}

export function RekananForm({ initialData, rekananId, mode }: RekananFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [cities, setCities] = useState<string[]>([])
  const [districts, setDistricts] = useState<string[]>([])
  const [jamLayananValue, setJamLayananValue] = useState<JamLayananValue | undefined>(
    () => parseJamLayanan(initialData?.jamLayanan)
  )

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<RekananFormData>({
    resolver: zodResolver(rekananSchema) as any,
    defaultValues: {
      status: 'active',
      ongkirStatus: 'negosiasi',
      resellerAllowed: false,
      provinsi: 'DKI Jakarta',
      ...initialData,
    },
  })

  const selectedProvinsi = watch('provinsi')
  const selectedKabKota = watch('kabKota')
  const resellerAllowed = watch('resellerAllowed')
  const fotoTokoUrl = watch('fotoTokoUrl')
  const latitude = watch('latitude')
  const longitude = watch('longitude')

  useEffect(() => {
    if (selectedProvinsi) {
      const citiesList = getCitiesByProvince(selectedProvinsi)
      setCities(citiesList)
      if (!initialData?.kabKota) {
        setValue('kabKota', '')
      }
    }
  }, [selectedProvinsi, setValue, initialData?.kabKota])

  useEffect(() => {
    if (selectedKabKota) {
      const districtsList = getDistrictsByCity(selectedKabKota)
      setDistricts(districtsList)
      if (!initialData?.kecamatan) {
        setValue('kecamatan', '')
      }
    }
  }, [selectedKabKota, setValue, initialData?.kecamatan])

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error('GPS tidak tersedia di perangkat ini')
      return
    }

    setIsGettingLocation(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setValue('latitude', position.coords.latitude)
        setValue('longitude', position.coords.longitude)
        setValue('gpsAccuracy', Math.round(position.coords.accuracy))
        toast.success(
          `Lokasi berhasil didapat (akurasi: ${Math.round(position.coords.accuracy)}m)`
        )
        setIsGettingLocation(false)
      },
      (error) => {
        let message = 'Gagal mendapatkan lokasi'
        if (error.code === error.PERMISSION_DENIED) {
          message = 'Izin lokasi ditolak. Aktifkan GPS di pengaturan.'
        } else if (error.code === error.TIMEOUT) {
          message = 'Waktu habis. Coba lagi.'
        }
        toast.error(message)
        setIsGettingLocation(false)
      },
      { timeout: 10000, enableHighAccuracy: true }
    )
  }

  const onSubmit = async (data: RekananFormData) => {
    setIsLoading(true)
    try {
      const url =
        mode === 'create' ? '/api/rekanan' : `/api/rekanan/${rekananId}`
      const method = mode === 'create' ? 'POST' : 'PATCH'

      const payload = {
        ...data,
        jamLayanan: jamLayananToString(jamLayananValue) || undefined,
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
        mode === 'create'
          ? 'Toko berhasil ditambahkan!'
          : 'Toko berhasil diperbarui!'
      )

      const id = result.data?.id || rekananId
      router.push(`/apps/rekanan/${id}`)
      router.refresh()
    } catch {
      toast.error('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
      {/* Foto Toko */}
      <div className="space-y-2">
        <Label>
          Foto Toko <span className="text-destructive">*</span>
        </Label>
        <ImageUpload
          value={fotoTokoUrl}
          onChange={(url) => setValue('fotoTokoUrl', url)}
          onRemove={() => setValue('fotoTokoUrl', '')}
          type="toko"
          label="Upload Foto Toko"
          disabled={isLoading}
        />
        {errors.fotoTokoUrl && (
          <p className="text-sm text-destructive">{errors.fotoTokoUrl.message}</p>
        )}
      </div>

      {/* Nama Toko */}
      <div className="space-y-2">
        <Label htmlFor="namaToko">
          Nama Toko <span className="text-destructive">*</span>
        </Label>
        <Input
          id="namaToko"
          placeholder="Contoh: Toko Bunga Indah"
          disabled={isLoading}
          {...register('namaToko')}
          className={errors.namaToko ? 'border-destructive' : ''}
        />
        {errors.namaToko && (
          <p className="text-sm text-destructive">{errors.namaToko.message}</p>
        )}
      </div>

      {/* Nama Owner */}
      <div className="space-y-2">
        <Label htmlFor="namaOwner">
          Nama Pemilik <span className="text-destructive">*</span>
        </Label>
        <Input
          id="namaOwner"
          placeholder="Nama pemilik toko"
          disabled={isLoading}
          {...register('namaOwner')}
          className={errors.namaOwner ? 'border-destructive' : ''}
        />
        {errors.namaOwner && (
          <p className="text-sm text-destructive">{errors.namaOwner.message}</p>
        )}
      </div>

      {/* Nomor WhatsApp */}
      <div className="space-y-2">
        <Label htmlFor="noWa">
          Nomor WhatsApp <span className="text-destructive">*</span>
        </Label>
        <Input
          id="noWa"
          type="tel"
          placeholder="081234567890"
          inputMode="tel"
          disabled={isLoading}
          {...register('noWa')}
          className={errors.noWa ? 'border-destructive' : ''}
        />
        {errors.noWa && (
          <p className="text-sm text-destructive">{errors.noWa.message}</p>
        )}
      </div>

      {/* Jam Layanan */}
      <div className="space-y-2">
        <Label>Jam Layanan</Label>
        <JamLayananPicker
          value={jamLayananValue}
          onChange={setJamLayananValue}
          disabled={isLoading}
        />
      </div>

      {/* Alamat */}
      <div className="space-y-2">
        <Label htmlFor="alamat">
          Alamat Lengkap <span className="text-destructive">*</span>
        </Label>
        <Input
          id="alamat"
          placeholder="Jl. Contoh No. 123"
          disabled={isLoading}
          {...register('alamat')}
          className={errors.alamat ? 'border-destructive' : ''}
        />
        {errors.alamat && (
          <p className="text-sm text-destructive">{errors.alamat.message}</p>
        )}
      </div>

      {/* Provinsi */}
      <div className="space-y-2">
        <Label>
          Provinsi <span className="text-destructive">*</span>
        </Label>
        <Select
          value={selectedProvinsi}
          onValueChange={(val) => setValue('provinsi', val)}
          disabled={isLoading}
        >
          <SelectTrigger className={errors.provinsi ? 'border-destructive' : ''}>
            <SelectValue placeholder="Pilih provinsi" />
          </SelectTrigger>
          <SelectContent>
            {PROVINCES.map((prov) => (
              <SelectItem key={prov} value={prov}>
                {prov}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.provinsi && (
          <p className="text-sm text-destructive">{errors.provinsi.message}</p>
        )}
      </div>

      {/* Kabupaten/Kota */}
      <div className="space-y-2">
        <Label>
          Kabupaten/Kota <span className="text-destructive">*</span>
        </Label>
        <Select
          value={watch('kabKota')}
          onValueChange={(val) => setValue('kabKota', val)}
          disabled={isLoading || !selectedProvinsi}
        >
          <SelectTrigger className={errors.kabKota ? 'border-destructive' : ''}>
            <SelectValue
              placeholder={
                selectedProvinsi ? 'Pilih kabupaten/kota' : 'Pilih provinsi dulu'
              }
            />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.kabKota && (
          <p className="text-sm text-destructive">{errors.kabKota.message}</p>
        )}
      </div>

      {/* Kecamatan */}
      <div className="space-y-2">
        <Label htmlFor="kecamatan">
          Kecamatan <span className="text-destructive">*</span>
        </Label>
        {districts.length > 0 ? (
          <Select
            value={watch('kecamatan')}
            onValueChange={(val) => setValue('kecamatan', val)}
            disabled={isLoading || !selectedKabKota}
          >
            <SelectTrigger className={errors.kecamatan ? 'border-destructive' : ''}>
              <SelectValue
                placeholder={
                  selectedKabKota ? 'Pilih kecamatan' : 'Pilih kabupaten/kota dulu'
                }
              />
            </SelectTrigger>
            <SelectContent>
              {districts.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            id="kecamatan"
            placeholder="Nama kecamatan"
            disabled={isLoading}
            {...register('kecamatan')}
            className={errors.kecamatan ? 'border-destructive' : ''}
          />
        )}
        {errors.kecamatan && (
          <p className="text-sm text-destructive">{errors.kecamatan.message}</p>
        )}
      </div>

      {/* Kelurahan */}
      <div className="space-y-2">
        <Label htmlFor="kelurahan">
          Kelurahan <span className="text-destructive">*</span>
        </Label>
        <Input
          id="kelurahan"
          placeholder="Nama kelurahan"
          disabled={isLoading}
          {...register('kelurahan')}
          className={errors.kelurahan ? 'border-destructive' : ''}
        />
        {errors.kelurahan && (
          <p className="text-sm text-destructive">{errors.kelurahan.message}</p>
        )}
      </div>

      {/* GPS Location */}
      <div className="space-y-2">
        <Label>Koordinat GPS (Opsional)</Label>
        <Button
          type="button"
          variant="outline"
          className="touch-target w-full"
          onClick={handleGetLocation}
          disabled={isLoading || isGettingLocation}
        >
          {isGettingLocation ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Mendapatkan lokasi...
            </>
          ) : (
            <>
              <MapPin className="mr-2 h-4 w-4" />
              {latitude && longitude
                ? `Lokasi: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
                : 'Gunakan Lokasi Saat Ini'}
            </>
          )}
        </Button>
      </div>

      {/* Status Ongkir */}
      <div className="space-y-2">
        <Label>Status Ongkir</Label>
        <Select
          value={watch('ongkirStatus')}
          onValueChange={(val) =>
            setValue('ongkirStatus', val as 'gratis' | 'berbayar' | 'negosiasi')
          }
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gratis">Gratis</SelectItem>
            <SelectItem value="berbayar">Berbayar</SelectItem>
            <SelectItem value="negosiasi">Negosiasi</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label>Status Toko</Label>
        <Select
          value={watch('status')}
          onValueChange={(val) =>
            setValue('status', val as 'active' | 'inactive' | 'pending')
          }
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Aktif</SelectItem>
            <SelectItem value="inactive">Tidak Aktif</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reseller */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="resellerAllowed"
          checked={resellerAllowed}
          onCheckedChange={(checked) =>
            setValue('resellerAllowed', checked === true)
          }
          disabled={isLoading}
        />
        <Label htmlFor="resellerAllowed" className="cursor-pointer font-normal">
          Menerima reseller
        </Label>
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
          'Simpan Toko'
        ) : (
          'Perbarui Toko'
        )}
      </Button>
    </form>
  )
}
