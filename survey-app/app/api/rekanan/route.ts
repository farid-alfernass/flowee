import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { rekanan, users } from '@/lib/db/schema'
import { generateRekananId, validateWhatsAppNumber } from '@/lib/db'
import { auth } from '@/lib/auth/config'
import { logActivity } from '@/lib/db/activity'
import { eq, like, or, desc, and, count } from 'drizzle-orm'
import { headers } from 'next/headers'

const createRekananSchema = z.object({
  namaToko: z.string().min(1, 'Nama toko wajib diisi').max(100),
  namaOwner: z.string().min(1, 'Nama pemilik wajib diisi').max(100),
  noWa: z
    .string()
    .min(1, 'Nomor WhatsApp wajib diisi')
    .refine(validateWhatsAppNumber, {
      message: 'Format nomor WhatsApp tidak valid. Gunakan format 08xxx',
    }),
  resellerAllowed: z.boolean().default(false),
  fotoTokoUrl: z.string().url('URL foto tidak valid'),
  jamLayanan: z.string().optional(),
  alamat: z.string().min(1, 'Alamat wajib diisi'),
  provinsi: z.string().min(1, 'Provinsi wajib diisi'),
  kabKota: z.string().min(1, 'Kabupaten/Kota wajib diisi'),
  kecamatan: z.string().min(1, 'Kecamatan wajib diisi'),
  kelurahan: z.string().min(1, 'Kelurahan wajib diisi'),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  gpsAccuracy: z.number().optional(),
  status: z.enum(['active', 'inactive', 'pending']).default('active'),
  ongkirStatus: z.enum(['gratis', 'berbayar', 'negosiasi']).default('negosiasi'),
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
    const search = searchParams.get('q') || ''
    const provinsi = searchParams.get('provinsi') || ''
    const reseller = searchParams.get('reseller') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    // Build conditions
    const conditions = []

    if (search) {
      conditions.push(
        or(
          like(rekanan.namaToko, `%${search}%`),
          like(rekanan.namaOwner, `%${search}%`)
        )
      )
    }

    if (provinsi) {
      conditions.push(eq(rekanan.provinsi, provinsi))
    }

    if (reseller === 'true') {
      conditions.push(eq(rekanan.resellerAllowed, true))
    } else if (reseller === 'false') {
      conditions.push(eq(rekanan.resellerAllowed, false))
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    // Get total count
    const totalResult = await db
      .select({ total: count() })
      .from(rekanan)
      .where(whereClause)
    const total = totalResult[0]?.total ?? 0

    // Get data with surveyor info
    const data = await db
      .select({
        id: rekanan.id,
        namaToko: rekanan.namaToko,
        namaOwner: rekanan.namaOwner,
        noWa: rekanan.noWa,
        resellerAllowed: rekanan.resellerAllowed,
        fotoTokoUrl: rekanan.fotoTokoUrl,
        jamLayanan: rekanan.jamLayanan,
        alamat: rekanan.alamat,
        provinsi: rekanan.provinsi,
        kabKota: rekanan.kabKota,
        kecamatan: rekanan.kecamatan,
        kelurahan: rekanan.kelurahan,
        latitude: rekanan.latitude,
        longitude: rekanan.longitude,
        gpsAccuracy: rekanan.gpsAccuracy,
        status: rekanan.status,
        ongkirStatus: rekanan.ongkirStatus,
        surveyedBy: rekanan.surveyedBy,
        surveyedAt: rekanan.surveyedAt,
        createdAt: rekanan.createdAt,
        updatedAt: rekanan.updatedAt,
        surveyorName: users.name,
      })
      .from(rekanan)
      .leftJoin(users, eq(rekanan.surveyedBy, users.id))
      .where(whereClause)
      .orderBy(desc(rekanan.surveyedAt))
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
    console.error('GET /api/rekanan error:', error)
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
    const validation = createRekananSchema.safeParse(body)

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

    // Check duplicate WhatsApp
    const existing = await db
      .select({ id: rekanan.id })
      .from(rekanan)
      .where(eq(rekanan.noWa, data.noWa))
      .limit(1)

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Nomor WhatsApp sudah terdaftar' },
        { status: 409 }
      )
    }

    // Generate ID with retry logic
    let id = generateRekananId()
    let attempts = 0
    while (attempts < 10) {
      const existingId = await db
        .select({ id: rekanan.id })
        .from(rekanan)
        .where(eq(rekanan.id, id))
        .limit(1)
      if (existingId.length === 0) break
      id = generateRekananId()
      attempts++
    }

    const newRekanan = await db
      .insert(rekanan)
      .values({
        id,
        ...data,
        surveyedBy: session.user.id,
      })
      .returning()

    // Log activity
    await logActivity({
      userId: session.user.id,
      action: 'create',
      entityType: 'rekanan',
      entityId: id,
      details: { namaToko: data.namaToko },
      ipAddress: request.headers.get('x-forwarded-for') || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
    })

    return NextResponse.json({ data: newRekanan[0] }, { status: 201 })
  } catch (error) {
    console.error('POST /api/rekanan error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
