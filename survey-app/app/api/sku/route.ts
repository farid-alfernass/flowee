import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { sku, rekanan } from '@/lib/db/schema'
import { generateSKUId, validatePrices, validateDiscount } from '@/lib/db'
import { auth } from '@/lib/auth/config'
import { logActivity } from '@/lib/db/activity'
import { eq, and, desc, count } from 'drizzle-orm'
import { headers } from 'next/headers'

const createSKUSchema = z.object({
  rekananId: z.string().min(1, 'ID rekanan wajib diisi'),
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
  diskon: z.number().min(0).max(50, 'Diskon maksimal 50%').optional(),
  ukuran: z.enum(['small', 'medium', 'large', 'extra_large']).optional(),
  foto1Url: z.string().url('URL foto 1 tidak valid'),
  foto2Url: z.string().url().optional(),
  foto3Url: z.string().url().optional(),
  foto4Url: z.string().url().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const rekananId = searchParams.get('rekanan_id') || ''
    const kategori = searchParams.get('kategori') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    const conditions = [eq(sku.isDeleted, false)]

    if (rekananId) {
      conditions.push(eq(sku.rekananId, rekananId))
    }

    if (kategori) {
      conditions.push(
        eq(
          sku.kategori,
          kategori as
            | 'buket_wisuda'
            | 'hand_bouquet'
            | 'papan_bunga'
            | 'standing_flower'
            | 'sympathy_flower'
            | 'custom_arrangement'
        )
      )
    }

    const whereClause = and(...conditions)

    const totalResult = await db
      .select({ total: count() })
      .from(sku)
      .where(whereClause)
    const total = totalResult[0]?.total ?? 0

    const data = await db
      .select()
      .from(sku)
      .where(whereClause)
      .orderBy(desc(sku.createdAt))
      .limit(limit)
      .offset(offset)

    return NextResponse.json({
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('GET /api/sku error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }

    const body = await request.json()
    const validation = createSKUSchema.safeParse(body)

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

    // Validate prices
    if (!validatePrices(data.harga, data.hargaReseller)) {
      return NextResponse.json(
        {
          error: 'Harga reseller harus lebih rendah dari harga jual',
        },
        { status: 400 }
      )
    }

    // Validate discount
    if (data.diskon !== undefined && !validateDiscount(data.diskon)) {
      return NextResponse.json(
        { error: 'Diskon tidak boleh lebih dari 50%' },
        { status: 400 }
      )
    }

    // Check rekanan exists
    const rekananExists = await db
      .select({ id: rekanan.id })
      .from(rekanan)
      .where(eq(rekanan.id, data.rekananId))
      .limit(1)

    if (rekananExists.length === 0) {
      return NextResponse.json(
        { error: 'Rekanan tidak ditemukan' },
        { status: 404 }
      )
    }

    // Generate ID
    let id = generateSKUId()
    let attempts = 0
    while (attempts < 10) {
      const existingId = await db
        .select({ id: sku.id })
        .from(sku)
        .where(eq(sku.id, id))
        .limit(1)
      if (existingId.length === 0) break
      id = generateSKUId()
      attempts++
    }

    const newSKU = await db
      .insert(sku)
      .values({
        id,
        ...data,
        createdBy: session.user.id,
      })
      .returning()

    await logActivity({
      userId: session.user.id,
      action: 'create',
      entityType: 'sku',
      entityId: id,
      details: { namaBarang: data.namaBarang, rekananId: data.rekananId },
      ipAddress: request.headers.get('x-forwarded-for') || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
    })

    return NextResponse.json({ data: newSKU[0] }, { status: 201 })
  } catch (error) {
    console.error('POST /api/sku error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
