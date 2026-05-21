import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { auth } from '@/lib/auth/config'
import { eq, count } from 'drizzle-orm'
import { headers } from 'next/headers'

const createUserSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
  name: z.string().min(1, 'Nama wajib diisi'),
  role: z.enum(['admin', 'field_team', 'viewer']).default('field_team'),
})

async function checkAdmin(session: { user: { id: string } } | null) {
  if (!session) return false
  const [user] = await db
    .select({ role: users.role })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1)
  return user?.role === 'admin'
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!(await checkAdmin(session))) {
      return NextResponse.json(
        { error: 'Hanya admin yang dapat mengakses halaman ini' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    const totalResult = await db.select({ total: count() }).from(users)
    const total = totalResult[0]?.total ?? 0

    const data = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
        isActive: users.isActive,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .limit(limit)
      .offset(offset)

    return NextResponse.json({ data, total, page, limit })
  } catch (error) {
    console.error('GET /api/admin/users error:', error)
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

    if (!(await checkAdmin(session))) {
      return NextResponse.json(
        { error: 'Hanya admin yang dapat menambah pengguna' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const validation = createUserSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Data tidak valid',
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const { email, password, name, role } = validation.data

    // Create user via Better Auth
    const result = await auth.api.signUpEmail({
      body: { email, password, name },
    })

    if (!result.user) {
      return NextResponse.json(
        { error: 'Gagal membuat pengguna' },
        { status: 500 }
      )
    }

    // Update role if not field_team
    if (role !== 'field_team') {
      await db
        .update(users)
        .set({ role })
        .where(eq(users.id, result.user.id))
    }

    const [newUser] = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
        isActive: users.isActive,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, result.user.id))
      .limit(1)

    return NextResponse.json({ data: newUser }, { status: 201 })
  } catch (error: unknown) {
    const err = error as { message?: string }
    if (err.message?.includes('already exists') || err.message?.includes('UNIQUE')) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 409 }
      )
    }
    console.error('POST /api/admin/users error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
