'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Camera, Upload, X, Loader2, ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove?: () => void
  type: 'toko' | 'produk'
  label?: string
  disabled?: boolean
  className?: string
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  type,
  label = 'Upload Foto',
  disabled,
  className,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const compressImage = useCallback(
    async (file: File): Promise<File> => {
      if (file.size <= 1024 * 1024) return file // Skip if < 1MB

      return new Promise((resolve) => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const img = document.createElement('img')

        img.onload = () => {
          const maxDim = 1200
          let { width, height } = img

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = (height / width) * maxDim
              width = maxDim
            } else {
              width = (width / height) * maxDim
              height = maxDim
            }
          }

          canvas.width = width
          canvas.height = height
          ctx?.drawImage(img, 0, 0, width, height)

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(new File([blob], file.name, { type: 'image/jpeg' }))
              } else {
                resolve(file)
              }
            },
            'image/jpeg',
            0.85
          )
        }

        img.src = URL.createObjectURL(file)
      })
    },
    []
  )

  const handleUpload = useCallback(
    async (file: File) => {
      if (!file) return

      // Validate type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/heic', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        toast.error('Format file tidak didukung. Gunakan JPG, PNG, atau HEIC.')
        return
      }

      // Validate size
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Ukuran file terlalu besar. Maksimal 5MB.')
        return
      }

      setUploading(true)
      try {
        const compressed = await compressImage(file)
        const formData = new FormData()
        formData.append('file', compressed)
        formData.append('type', type)

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!res.ok) {
          const error = await res.json()
          throw new Error(error.error || 'Upload gagal')
        }

        const { url } = await res.json()
        onChange(url)
        toast.success('Foto berhasil diupload')
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Gagal mengupload foto'
        toast.error(message)
      } finally {
        setUploading(false)
      }
    },
    [type, onChange, compressImage]
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleUpload(file)
    e.target.value = ''
  }

  if (value) {
    return (
      <div className={cn('relative', className)}>
        <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
          <Image
            src={value}
            alt="Foto"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>
        {!disabled && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex aspect-square w-full items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/10">
        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="text-sm">Mengupload...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <ImageIcon className="h-8 w-8" />
            <span className="text-sm">{label}</span>
          </div>
        )}
      </div>

      {!disabled && !uploading && (
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="touch-target"
            onClick={() => cameraInputRef.current?.click()}
          >
            <Camera className="mr-2 h-4 w-4" />
            Kamera
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="touch-target"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            Galeri
          </Button>
        </div>
      )}

      {/* Camera input */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Gallery input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/heic,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}
