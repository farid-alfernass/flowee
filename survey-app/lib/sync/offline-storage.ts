import { db, PendingRekanan, PendingSKU } from './db'

// Generate a simple UUID
function generateId(): string {
  return `offline-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Convert File to base64
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// Save rekanan to IndexedDB for offline sync
export async function saveRekananOffline(
  data: PendingRekanan['data'],
  fotoFile?: File
): Promise<string> {
  const id = generateId()
  const photos: PendingRekanan['photos'] = {}

  if (fotoFile) {
    photos.fotoToko = await fileToBase64(fotoFile)
  }

  await db.pendingRekanan.add({
    id,
    data,
    photos,
    status: 'pending',
    retryCount: 0,
    createdAt: Date.now(),
  })

  return id
}

// Save SKU to IndexedDB for offline sync
export async function saveSKUOffline(
  data: PendingSKU['data'],
  rekananId: string,
  photos?: {
    foto1?: File
    foto2?: File
    foto3?: File
    foto4?: File
  }
): Promise<string> {
  const id = generateId()
  const photoData: PendingSKU['photos'] = {}

  if (photos?.foto1) photoData.foto1 = await fileToBase64(photos.foto1)
  if (photos?.foto2) photoData.foto2 = await fileToBase64(photos.foto2)
  if (photos?.foto3) photoData.foto3 = await fileToBase64(photos.foto3)
  if (photos?.foto4) photoData.foto4 = await fileToBase64(photos.foto4)

  await db.pendingSKU.add({
    id,
    rekananId,
    data,
    photos: photoData,
    status: 'pending',
    retryCount: 0,
    createdAt: Date.now(),
  })

  return id
}

// Get pending count
export async function getPendingCount(): Promise<number> {
  const rekananCount = await db.pendingRekanan
    .where('status')
    .anyOf(['pending', 'failed'])
    .count()

  const skuCount = await db.pendingSKU
    .where('status')
    .anyOf(['pending', 'failed'])
    .count()

  return rekananCount + skuCount
}

// Cache API response
export async function cacheData(
  key: string,
  data: unknown,
  ttlMinutes = 5
): Promise<void> {
  const now = Date.now()
  await db.cachedData.put({
    key,
    data,
    timestamp: now,
    expiresAt: now + ttlMinutes * 60 * 1000,
  })
}

// Get cached data
export async function getCachedData<T>(key: string): Promise<T | null> {
  const cached = await db.cachedData.get(key)
  if (!cached) return null
  if (cached.expiresAt < Date.now()) {
    await db.cachedData.delete(key)
    return null
  }
  return cached.data as T
}
