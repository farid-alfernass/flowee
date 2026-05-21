import { db } from '@/lib/db'
import { activityLogs } from '@/lib/db/schema'

interface LogActivityParams {
  userId: string
  action: 'create' | 'update' | 'delete' | 'login' | 'logout'
  entityType?: 'rekanan' | 'sku' | 'user'
  entityId?: string
  details?: Record<string, unknown>
  ipAddress?: string
  userAgent?: string
}

export async function logActivity(params: LogActivityParams): Promise<void> {
  try {
    await db.insert(activityLogs).values({
      userId: params.userId,
      action: params.action,
      entityType: params.entityType,
      entityId: params.entityId,
      details: params.details as Record<string, unknown>,
      ipAddress: params.ipAddress,
      userAgent: params.userAgent,
    })
  } catch (error) {
    // Don't throw - logging failures shouldn't break the main flow
    console.error('Failed to log activity:', error)
  }
}
