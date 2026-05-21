import Dexie, { Table } from 'dexie'

export interface PendingRekanan {
  id: string // client-generated UUID
  data: {
    namaToko: string
    namaOwner: string
    noWa: string
    resellerAllowed: boolean
    fotoTokoUrl: string
    jamLayanan?: string
    alamat: string
    provinsi: string
    kabKota: string
    kecamatan: string
    kelurahan: string
    latitude?: number
    longitude?: number
    gpsAccuracy?: number
    status: string
    ongkirStatus: string
  }
  photos: {
    fotoToko?: string // base64 encoded
  }
  status: 'pending' | 'syncing' | 'failed' | 'synced'
  retryCount: number
  createdAt: number
  lastAttempt?: number
  error?: string
}

export interface PendingSKU {
  id: string
  rekananId: string
  data: {
    namaBarang: string
    kategori: string
    type?: string
    deskripsi?: string
    harga: number
    hargaReseller: number
    diskon?: number
    ukuran?: string
    foto1Url: string
    foto2Url?: string
    foto3Url?: string
    foto4Url?: string
  }
  photos: {
    foto1?: string // base64
    foto2?: string
    foto3?: string
    foto4?: string
  }
  status: 'pending' | 'syncing' | 'failed' | 'synced'
  retryCount: number
  createdAt: number
  lastAttempt?: number
  error?: string
}

export interface CachedData {
  key: string
  data: unknown
  timestamp: number
  expiresAt: number
}

export interface SyncLog {
  id: string
  type: 'rekanan' | 'sku'
  action: 'create' | 'update'
  entityId: string
  status: 'success' | 'failed'
  timestamp: number
  error?: string
}

class FloweeDB extends Dexie {
  pendingRekanan!: Table<PendingRekanan, string>
  pendingSKU!: Table<PendingSKU, string>
  cachedData!: Table<CachedData, string>
  syncLogs!: Table<SyncLog, string>

  constructor() {
    super('FloweeDB')
    this.version(1).stores({
      pendingRekanan: 'id, status, createdAt',
      pendingSKU: 'id, rekananId, status, createdAt',
      cachedData: 'key, expiresAt',
      syncLogs: 'id, timestamp, type, status',
    })
  }
}

export const db = new FloweeDB()

// Cleanup old data (30 days)
export async function cleanupOldData(): Promise<void> {
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000

  await db.pendingRekanan
    .where('createdAt')
    .below(thirtyDaysAgo)
    .and((item) => item.status === 'synced')
    .delete()

  await db.pendingSKU
    .where('createdAt')
    .below(thirtyDaysAgo)
    .and((item) => item.status === 'synced')
    .delete()

  await db.syncLogs.where('timestamp').below(thirtyDaysAgo).delete()

  // Clean expired cache
  await db.cachedData.where('expiresAt').below(Date.now()).delete()
}

// Check storage quota
export async function checkStorageQuota(): Promise<{
  used: number
  quota: number
  percentage: number
}> {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    const estimate = await navigator.storage.estimate()
    const used = estimate.usage || 0
    const quota = estimate.quota || 0
    return {
      used,
      quota,
      percentage: quota > 0 ? (used / quota) * 100 : 0,
    }
  }
  return { used: 0, quota: 0, percentage: 0 }
}
