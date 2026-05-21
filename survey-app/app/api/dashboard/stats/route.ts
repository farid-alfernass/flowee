import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { rekanan, sku } from '@/lib/db/schema'
import { auth } from '@/lib/auth/config'
import { eq, gte, count, sql } from 'drizzle-orm'
import { headers } from 'next/headers'

export async function GET(_request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session) {
      return NextResponse.json({ error: 'Tidak terautentikasi' }, { status: 401 })
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Total rekanan
    const totalRekananResult = await db.select({ totalRekanan: count() }).from(rekanan)
    const totalRekanan = totalRekananResult[0]?.totalRekanan ?? 0

    // Total SKU
    const totalSKUResult = await db.select({ totalSKU: count() }).from(sku).where(eq(sku.isDeleted, false))
    const totalSKU = totalSKUResult[0]?.totalSKU ?? 0

    // Rekanan today
    const rekananTodayResult = await db.select({ rekananToday: count() }).from(rekanan).where(gte(rekanan.surveyedAt, today))
    const rekananToday = rekananTodayResult[0]?.rekananToday ?? 0

    // SKU today
    const skuTodayResult = await db.select({ skuToday: count() }).from(sku).where(eq(sku.isDeleted, false))
    const skuToday = skuTodayResult[0]?.skuToday ?? 0

    // Survey per day (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)
    sevenDaysAgo.setHours(0, 0, 0, 0)

    const surveyPerDay = await db
      .select({
        date: sql<string>`date(${rekanan.surveyedAt})`.as('date'),
        count: count(),
      })
      .from(rekanan)
      .where(gte(rekanan.surveyedAt, sevenDaysAgo))
      .groupBy(sql`date(${rekanan.surveyedAt})`)
      .orderBy(sql`date(${rekanan.surveyedAt})`)

    // Fill in missing days
    const surveyPerDayFilled = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      const found = surveyPerDay.find((d: { date: string; count: number }) => d.date === dateStr)
      surveyPerDayFilled.push({
        date: dateStr,
        count: found ? found.count : 0,
      })
    }

    // Rekanan per kota (top 5)
    const rekananPerKota = await db
      .select({
        kota: rekanan.kabKota,
        count: count(),
      })
      .from(rekanan)
      .groupBy(rekanan.kabKota)
      .orderBy(sql`count(*) desc`)
      .limit(5)

    return NextResponse.json({
      totalRekanan,
      totalSKU,
      rekananToday,
      skuToday,
      surveyPerDay: surveyPerDayFilled,
      rekananPerKota,
    })
  } catch (error) {
    console.error('GET /api/dashboard/stats error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}
