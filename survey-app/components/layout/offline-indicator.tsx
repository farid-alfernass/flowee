'use client'

import { useEffect, useState } from 'react'
import { Wifi, WifiOff, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [pendingCount, setPendingCount] = useState(0)
  const [show, setShow] = useState(false)

  useEffect(() => {
    setIsOnline(navigator.onLine)

    const handleOnline = () => {
      setIsOnline(true)
      setShow(true)
      setTimeout(() => setShow(false), 3000)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShow(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Check pending items from IndexedDB
  useEffect(() => {
    const checkPending = async () => {
      try {
        const { db: idb } = await import('@/lib/sync/db')
        const pendingRekanan = await idb.pendingRekanan.count()
        const pendingSKU = await idb.pendingSKU.count()
        setPendingCount(pendingRekanan + pendingSKU)
      } catch {
        // IndexedDB not available
      }
    }

    checkPending()
    const interval = setInterval(checkPending, 10000)
    return () => clearInterval(interval)
  }, [])

  const handleManualSync = async () => {
    if (!isOnline) return
    setIsSyncing(true)
    try {
      const { syncPendingData } = await import('@/lib/sync/sync-service')
      await syncPendingData()
      setPendingCount(0)
    } catch (error) {
      console.error('Sync failed:', error)
    } finally {
      setIsSyncing(false)
    }
  }

  if (!show && isOnline && pendingCount === 0) return null

  return (
    <div
      className={cn(
        'fixed top-14 left-0 right-0 z-40 flex items-center justify-between px-4 py-2 text-sm transition-all',
        isOnline
          ? 'bg-green-500 text-white'
          : 'bg-destructive text-destructive-foreground'
      )}
    >
      <div className="flex items-center gap-2">
        {isOnline ? (
          <Wifi className="h-4 w-4" />
        ) : (
          <WifiOff className="h-4 w-4" />
        )}
        <span>
          {isOnline
            ? pendingCount > 0
              ? `Online - ${pendingCount} data menunggu sinkronisasi`
              : 'Kembali online'
            : 'Offline - Data akan disimpan lokal'}
        </span>
      </div>

      {isOnline && pendingCount > 0 && (
        <button
          onClick={handleManualSync}
          disabled={isSyncing}
          className="flex items-center gap-1 rounded px-2 py-1 text-xs font-medium hover:bg-white/20"
        >
          <RefreshCw className={cn('h-3 w-3', isSyncing && 'animate-spin')} />
          {isSyncing ? 'Sinkronisasi...' : 'Sinkronkan'}
        </button>
      )}
    </div>
  )
}
