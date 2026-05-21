import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/config'
import { uploadImage } from '@/lib/storage/cloudinary'
import { headers } from 'next/headers'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/heic', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const type = formData.get('type') as 'toko' | 'produk' | null

    if (!file) {
      return NextResponse.json({ error: 'File tidak ditemukan' }, { status: 400 })
    }

    if (!type || !['toko', 'produk'].includes(type)) {
      return NextResponse.json({ error: 'Tipe upload tidak valid' }, { status: 400 })
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Format file tidak didukung. Gunakan JPG, PNG, atau HEIC.' },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'Ukuran file terlalu besar. Maksimal 5MB.' },
        { status: 400 }
      )
    }

    // Convert to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Cloudinary
    const result = await uploadImage(buffer, type)

    return NextResponse.json({
      url: result.url,
      thumbnailUrl: result.thumbnailUrl,
      publicId: result.publicId,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Gagal mengupload foto. Silakan coba lagi.' },
      { status: 500 }
    )
  }
}
