import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { activityLogs, users } from '@/lib/db/schema'
import { auth } from '@/lib/auth/config'
import { eq, desc, count, gte, and } from 'drizzle-orm'
import { headers } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit
    const userId = searchParams.get('userId') || ''
    const action = searchParams.get('action') || ''
    const dateFrom = searchParams.get('dateFrom') || ''

    const conditions = []

    if (userId) {
      conditions.push(eq(activityLogs.userId, userId))
    }

    if (action) {
      conditions.push(
        eq(
          activityLogs.action,
          action as 'create' | 'update' | 'delete' | 'login' | 'logout'
        )
      )
    }

    if (dateFrom) {
      conditions.push(gte(activityLogs.createdAt, new Date(dateFrom)))
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const totalResult = await db
      .select({ total: count() })
      .from(activityLogs)
      .where(whereClause)
    const total = totalResult[0]?.total ?? 0

    const data = await db
      .select({
        id: activityLogs.id,
        userId: activityLogs.userId,
        action: activityLogs.action,
        entityType: activityLogs.entityType,
        entityId: activityLogs.entityId,
        details: activityLogs.details,
        createdAt: activityLogs.createdAt,
        userName: users.name,
      })
      .from(activityLogs)
      .leftJoin(users, eq(activityLogs.userId, users.id))
      .where(whereClause)
      .orderBy(desc(activityLogs.createdAt))
      .limit(limit)
      .offset(offset)

    return NextResponse.json({ data, total, page, limit })
  } catch (error) {
    console.error('GET /api/admin/logs error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
