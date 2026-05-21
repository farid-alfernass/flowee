import { Navbar } from '@/components/layout/navbar'
import { BottomNav } from '@/components/layout/bottom-nav'
import { OfflineIndicator } from '@/components/layout/offline-indicator'
import { PWAInstallPrompt } from '@/components/layout/pwa-install-prompt'
import { Toaster } from '@/components/ui/sonner'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <OfflineIndicator />
      <main className="flex-1 pb-20">{children}</main>
      <BottomNav />
      <PWAInstallPrompt />
      <Toaster position="top-center" richColors />
    </div>
  )
}
