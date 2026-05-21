import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env['CLOUDINARY_CLOUD_NAME'],
  api_key: process.env['CLOUDINARY_API_KEY'],
  api_secret: process.env['CLOUDINARY_API_SECRET'],
  secure: true,
})

export interface UploadResult {
  url: string
  thumbnailUrl: string
  publicId: string
}

export async function uploadImage(
  file: Buffer | string,
  folder: 'toko' | 'produk',
  filename?: string
): Promise<UploadResult> {
  const uploadOptions = {
    folder: `flowee-survey/${folder}`,
    public_id: filename,
    transformation: [
      { width: 1200, height: 1200, crop: 'limit' as const },
      { quality: 'auto' as const },
      { fetch_format: 'auto' as const },
    ],
    eager: [
      {
        width: 300,
        height: 300,
        crop: 'fill' as const,
        gravity: 'auto' as const,
      },
    ],
    eager_async: false,
  }

  const result = await cloudinary.uploader.upload(
    typeof file === 'string' ? file : `data:image/jpeg;base64,${file.toString('base64')}`,
    uploadOptions
  )

  const thumbnailUrl =
    (result as { eager?: Array<{ secure_url: string }> })['eager']?.[0]?.secure_url ||
    cloudinary.url(result.public_id, {
      width: 300,
      height: 300,
      crop: 'fill',
      gravity: 'auto',
      quality: 'auto',
      fetch_format: 'auto',
    })

  return {
    url: result.secure_url,
    thumbnailUrl,
    publicId: result.public_id,
  }
}

export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId)
}

export { cloudinary }
