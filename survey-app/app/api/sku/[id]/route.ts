import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { sku, users } from '@/lib/db/schema'
import { validatePrices, validateDiscount } from '@/lib/db'
import { auth } from '@/lib/auth/config'
import { logActivity } from '@/lib/db/activity'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'

const updateSKUSchema = z.object({
  namaBarang: z.string().min(1).max(200).optional(),
  kategori: z
    .enum([
      'buket_wisuda',
      'hand_bouquet',
      'papan_bunga',
      'standing_flower',
      'sympathy_flower',
      'custom_arrangement',
    ])
    .optional(),
  type: z.enum(['fresh', 'artificial', 'mixed']).optional().nullable(),
  deskripsi: z.string().max(500).optional().nullable(),
  harga: z.number().positive().optional(),
  hargaReseller: z.number().positive().optional(),
  diskon: z.number().min(0).max(50).optional().nullable(),
  ukuran: z.enum(['small', 'medium', 'large', 'extra_large']).optional().nullable(),
  foto1Url: z.string().url().optional(),
  foto2Url: z.string().url().optional().nullable(),
  foto3Url: z.string().url().optional().nullable(),
  foto4Url: z.string().url().optional().nullable(),
})

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }

    const { id } = await params

    const [skuData] = await db
      .select({
        id: sku.id,
        rekananId: sku.rekananId,
        namaBarang: sku.namaBarang,
        kategori: sku.kategori,
        type: sku.type,
        deskripsi: sku.deskripsi,
        harga: sku.harga,
        hargaReseller: sku.hargaReseller,
        diskon: sku.diskon,
        ukuran: sku.ukuran,
        foto1Url: sku.foto1Url,
        foto2Url: sku.foto2Url,
        foto3Url: sku.foto3Url,
        foto4Url: sku.foto4Url,
        isDeleted: sku.isDeleted,
        createdBy: sku.createdBy,
        createdAt: sku.createdAt,
        updatedAt: sku.updatedAt,
        updatedBy: sku.updatedBy,
        creatorName: users.name,
      })
      .from(sku)
      .leftJoin(users, eq(sku.createdBy, users.id))
      .where(eq(sku.id, id))
      .limit(1)

    if (!skuData || skuData.isDeleted) {
      return NextResponse.json({ error: 'Produk tidak ditemukan' }, { status: 404 })
    }

    return NextResponse.json({ data: skuData })
  } catch (error) {
    console.error('GET /api/sku/[id] error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const validation = updateSKUSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Data tidak valid',
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const data = validation.data

    // Check if SKU exists
    const existing = await db
      .select({ id: sku.id, harga: sku.harga, hargaReseller: sku.hargaReseller })
      .from(sku)
      .where(eq(sku.id, id))
      .limit(1)

    if (existing.length === 0 || existing[0] === undefined) {
      return NextResponse.json({ error: 'Produk tidak ditemukan' }, { status: 404 })
    }

    // Validate prices if updating
    const newHarga = data.harga ?? existing[0].harga
    const newHargaReseller = data.hargaReseller ?? existing[0].hargaReseller

    if (!validatePrices(newHarga, newHargaReseller)) {
      return NextResponse.json(
        { error: 'Harga reseller harus lebih rendah dari harga jual' },
        { status: 400 }
      )
    }

    if (data.diskon !== undefined && data.diskon !== null && !validateDiscount(data.diskon)) {
      return NextResponse.json(
        { error: 'Diskon tidak boleh lebih dari 50%' },
        { status: 400 }
      )
    }

    const updated = await db
      .update(sku)
      .set({
        ...data,
        updatedBy: session.user.id,
        updatedAt: new Date(),
      })
      .where(eq(sku.id, id))
      .returning()

    await logActivity({
      userId: session.user.id,
      action: 'update',
      entityType: 'sku',
      entityId: id,
      details: { changes: Object.keys(data) },
      ipAddress: request.headers.get('x-forwarded-for') || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
    })

    return NextResponse.json({ data: updated[0] })
  } catch (error) {
    console.error('PATCH /api/sku/[id] error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }

    // Only admin can delete
    const userRecord = await db
      .select({ role: users.role })
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1)

    if (!userRecord[0] || userRecord[0].role !== 'admin') {
      return NextResponse.json(
        { error: 'Hanya admin yang dapat menghapus produk' },
        { status: 403 }
      )
    }

    const { id } = await params

    // Soft delete
    await db
      .update(sku)
      .set({ isDeleted: true, updatedBy: session.user.id, updatedAt: new Date() })
      .where(eq(sku.id, id))

    await logActivity({
      userId: session.user.id,
      action: 'delete',
      entityType: 'sku',
      entityId: id,
      ipAddress: request.headers.get('x-forwarded-for') || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/sku/[id] error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
