import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { rekanan, sku, users } from '@/lib/db/schema'
import { validateWhatsAppNumber } from '@/lib/db'
import { auth } from '@/lib/auth/config'
import { logActivity } from '@/lib/db/activity'
import { eq, and, ne } from 'drizzle-orm'
import { headers } from 'next/headers'

const updateRekananSchema = z.object({
  namaToko: z.string().min(1).max(100).optional(),
  namaOwner: z.string().min(1).max(100).optional(),
  noWa: z
    .string()
    .refine(validateWhatsAppNumber, {
      message: 'Format nomor WhatsApp tidak valid. Gunakan format +62xxx',
    })
    .optional(),
  resellerAllowed: z.boolean().optional(),
  fotoTokoUrl: z.string().url().optional(),
  jamLayanan: z.string().optional(),
  alamat: z.string().min(1).optional(),
  provinsi: z.string().min(1).optional(),
  kabKota: z.string().min(1).optional(),
  kecamatan: z.string().min(1).optional(),
  kelurahan: z.string().min(1).optional(),
  latitude: z.number().min(-90).max(90).optional().nullable(),
  longitude: z.number().min(-180).max(180).optional().nullable(),
  gpsAccuracy: z.number().optional().nullable(),
  status: z.enum(['active', 'inactive', 'pending']).optional(),
  ongkirStatus: z.enum(['gratis', 'berbayar', 'negosiasi']).optional(),
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

    const [rekananData] = await db
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
        updatedBy: rekanan.updatedBy,
        surveyorName: users.name,
      })
      .from(rekanan)
      .leftJoin(users, eq(rekanan.surveyedBy, users.id))
      .where(eq(rekanan.id, id))
      .limit(1)

    if (!rekananData) {
      return NextResponse.json({ error: 'Rekanan tidak ditemukan' }, { status: 404 })
    }

    // Get products
    const products = await db
      .select()
      .from(sku)
      .where(and(eq(sku.rekananId, id), eq(sku.isDeleted, false)))

    return NextResponse.json({ data: rekananData, products })
  } catch (error) {
    console.error('GET /api/rekanan/[id] error:', error)
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
    const validation = updateRekananSchema.safeParse(body)

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

    // Check if rekanan exists
    const existing = await db
      .select({ id: rekanan.id })
      .from(rekanan)
      .where(eq(rekanan.id, id))
      .limit(1)

    if (existing.length === 0) {
      return NextResponse.json({ error: 'Rekanan tidak ditemukan' }, { status: 404 })
    }

    // Check duplicate WhatsApp if updating
    if (data.noWa) {
      const duplicateWa = await db
        .select({ id: rekanan.id })
        .from(rekanan)
        .where(and(eq(rekanan.noWa, data.noWa), ne(rekanan.id, id)))
        .limit(1)

      if (duplicateWa.length > 0) {
        return NextResponse.json(
          { error: 'Nomor WhatsApp sudah terdaftar' },
          { status: 409 }
        )
      }
    }

    const updated = await db
      .update(rekanan)
      .set({
        ...data,
        updatedBy: session.user.id,
        updatedAt: new Date(),
      })
      .where(eq(rekanan.id, id))
      .returning()

    await logActivity({
      userId: session.user.id,
      action: 'update',
      entityType: 'rekanan',
      entityId: id,
      details: { changes: Object.keys(data) },
      ipAddress: request.headers.get('x-forwarded-for') || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
    })

    return NextResponse.json({ data: updated[0] })
  } catch (error) {
    console.error('PATCH /api/rekanan/[id] error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
