import { db } from './db'

const RETRY_DELAYS = [1000, 5000, 15000] // 1s, 5s, 15s

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Upload base64 image to server
async function uploadBase64Image(
  base64: string,
  type: 'toko' | 'produk'
): Promise<string> {
  // Convert base64 to blob
  const response = await fetch(base64)
  const blob = await response.blob()
  const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' })

  const formData = new FormData()
  formData.append('file', file)
  formData.append('type', type)

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    throw new Error('Upload gagal')
  }

  const data = await res.json()
  return data.url
}

// Sync pending rekanan
async function syncPendingRekanan(): Promise<void> {
  const pendingItems = await db.pendingRekanan
    .where('status')
    .anyOf(['pending', 'failed'])
    .and((item) => item.retryCount < 3)
    .toArray()

  for (const item of pendingItems) {
    try {
      // Update status to syncing
      await db.pendingRekanan.update(item.id, {
        status: 'syncing',
        lastAttempt: Date.now(),
      })

      // Upload photo if base64
      let fotoTokoUrl = item.data.fotoTokoUrl
      if (item.photos.fotoToko && item.photos.fotoToko.startsWith('data:')) {
        fotoTokoUrl = await uploadBase64Image(item.photos.fotoToko, 'toko')
      }

      // Create rekanan
      const res = await fetch('/api/rekanan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...item.data, fotoTokoUrl }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Sync gagal')
      }

      const result = await res.json()

      // Update any pending SKU that reference this temp ID
      await db.pendingSKU
        .where('rekananId')
        .equals(item.id)
        .modify({ rekananId: result.data.id })

      // Mark as synced
      await db.pendingRekanan.update(item.id, { status: 'synced' })

      // Log success
      await db.syncLogs.add({
        id: `${Date.now()}-${Math.random()}`,
        type: 'rekanan',
        action: 'create',
        entityId: result.data.id,
        status: 'success',
        timestamp: Date.now(),
      })
    } catch (error) {
      const retryCount = item.retryCount + 1
      await db.pendingRekanan.update(item.id, {
        status: 'failed',
        retryCount,
        error: error instanceof Error ? error.message : 'Unknown error',
      })

      // Exponential backoff
      if (retryCount < 3) {
        await sleep(RETRY_DELAYS[retryCount - 1] || 15000)
      }
    }
  }
}

// Sync pending SKU
async function syncPendingSKU(): Promise<void> {
  const pendingItems = await db.pendingSKU
    .where('status')
    .anyOf(['pending', 'failed'])
    .and((item) => item.retryCount < 3)
    .toArray()

  for (const item of pendingItems) {
    try {
      // Check if rekananId is still a temp ID (not yet synced)
      if (item.rekananId.startsWith('offline-')) {
        continue // Skip, wait for rekanan to sync first
      }

      await db.pendingSKU.update(item.id, {
        status: 'syncing',
        lastAttempt: Date.now(),
      })

      // Upload photos if base64
      const data = { ...item.data }

      if (item.photos.foto1?.startsWith('data:')) {
        data.foto1Url = await uploadBase64Image(item.photos.foto1, 'produk')
      }
      if (item.photos.foto2?.startsWith('data:')) {
        data.foto2Url = await uploadBase64Image(item.photos.foto2, 'produk')
      }
      if (item.photos.foto3?.startsWith('data:')) {
        data.foto3Url = await uploadBase64Image(item.photos.foto3, 'produk')
      }
      if (item.photos.foto4?.startsWith('data:')) {
        data.foto4Url = await uploadBase64Image(item.photos.foto4, 'produk')
      }

      const res = await fetch('/api/sku', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, rekananId: item.rekananId }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Sync gagal')
      }

      const result = await res.json()

      await db.pendingSKU.update(item.id, { status: 'synced' })

      await db.syncLogs.add({
        id: `${Date.now()}-${Math.random()}`,
        type: 'sku',
        action: 'create',
        entityId: result.data.id,
        status: 'success',
        timestamp: Date.now(),
      })
    } catch (error) {
      const retryCount = item.retryCount + 1
      await db.pendingSKU.update(item.id, {
        status: 'failed',
        retryCount,
        error: error instanceof Error ? error.message : 'Unknown error',
      })

      if (retryCount < 3) {
        await sleep(RETRY_DELAYS[retryCount - 1] || 15000)
      }
    }
  }
}

// Main sync function
export async function syncPendingData(): Promise<void> {
  if (!navigator.onLine) return

  // Priority: rekanan first, then SKU
  await syncPendingRekanan()
  await syncPendingSKU()
}

// Register background sync
export async function registerBackgroundSync(): Promise<void> {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    try {
      const registration = await navigator.serviceWorker.ready
      await (registration as ServiceWorkerRegistration & { sync: { register: (tag: string) => Promise<void> } }).sync.register('sync-pending-data')
    } catch {
      // Background sync not supported, fall back to manual sync
      await syncPendingData()
    }
  } else {
    await syncPendingData()
  }
}

// Listen for online event
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    syncPendingData().catch(console.error)
  })
}
