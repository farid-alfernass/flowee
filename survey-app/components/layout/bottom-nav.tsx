'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Store, Package, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/apps', label: 'Beranda', icon: Home },
  { href: '/apps/rekanan', label: 'Rekanan', icon: Store },
  { href: '/apps/produk', label: 'Produk', icon: Package },
  { href: '/apps/profile', label: 'Profil', icon: User },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background safe-area-inset-bottom">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive =
            item.href === '/apps'
              ? pathname === '/apps' || pathname === '/apps/'
              : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 touch-target px-4 no-select',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
