'use client'

import { useRouter } from 'next/navigation'
import { useSession, signOut } from '@/lib/auth/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  LogOut,
  User,
  Mail,
  Shield,
  FileText,
  Users,
} from 'lucide-react'
import Link from 'next/link'

const roleLabels = {
  admin: 'Admin',
  field_team: 'Tim Lapangan',
  viewer: 'Viewer',
}

export default function ProfilePage() {
  const router = useRouter()
  const { data: session } = useSession()

  const handleSignOut = async () => {
    await signOut()
    router.push('/apps/login')
    router.refresh()
  }

  const initials = session?.user?.name
    ? session.user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U'

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-xl font-bold">Profil</h1>

      {/* User Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">{session?.user?.name}</h2>
              <p className="text-sm text-muted-foreground">
                {session?.user?.email}
              </p>
              <Badge variant="outline" className="mt-1 text-xs">
                {roleLabels[(session?.user as { role?: string })?.role as keyof typeof roleLabels] || 'Tim Lapangan'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Detail Akun</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Nama</p>
              <p className="text-sm font-medium">{session?.user?.name}</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium">{session?.user?.email}</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center gap-3">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Role</p>
              <p className="text-sm font-medium">
                {roleLabels[(session?.user as { role?: string })?.role as keyof typeof roleLabels] || 'Tim Lapangan'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admin Links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Admin Panel</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/apps/admin/users">
              <Users className="mr-3 h-4 w-4" />
              Manajemen Pengguna
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/apps/admin/logs">
              <FileText className="mr-3 h-4 w-4" />
              Log Aktivitas
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Sign Out */}
      <Button
        variant="destructive"
        className="touch-target w-full"
        onClick={handleSignOut}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Keluar dari Akun
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Flowee Survey App v0.1.0
      </p>
    </div>
  )
}
