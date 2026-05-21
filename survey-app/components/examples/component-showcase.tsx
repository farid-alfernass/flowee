'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { CheckCircle2, AlertCircle } from 'lucide-react'

/**
 * Component Showcase - Example usage of shadcn/ui components
 * This file demonstrates the installed components for the Flowee Survey App
 */
export function ComponentShowcase() {
  return (
    <div className="container mx-auto space-y-8 p-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">shadcn/ui Components</h1>
        <p className="text-muted-foreground">
          Installed and configured for Flowee Survey App
        </p>
      </div>

      <Separator />

      {/* Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
          <CardDescription>Various button styles and variants</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </CardContent>
      </Card>

      {/* Form Components */}
      <Card>
        <CardHeader>
          <CardTitle>Form Components</CardTitle>
          <CardDescription>Input fields and form elements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nama-toko">Nama Toko</Label>
            <Input id="nama-toko" placeholder="Masukkan nama toko" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="alamat">Alamat</Label>
            <Input id="alamat" placeholder="Masukkan alamat lengkap" />
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Badges</CardTitle>
          <CardDescription>Status indicators and labels</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
          <CardDescription>Feedback and notification messages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Data toko berhasil disimpan ke database.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Gagal mengupload foto. Silakan coba lagi.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Toast Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Toast Notifications</CardTitle>
          <CardDescription>
            Click buttons to see toast notifications (Sonner)
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button onClick={() => toast.success('Berhasil menyimpan data!')}>
            Success Toast
          </Button>
          <Button
            variant="destructive"
            onClick={() => toast.error('Terjadi kesalahan!')}
          >
            Error Toast
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast('Info', {
                description: 'Data sedang diproses...',
              })
            }
          >
            Info Toast
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast.loading('Mengupload foto...')}
          >
            Loading Toast
          </Button>
        </CardContent>
      </Card>

      {/* Mobile-First Features */}
      <Card>
        <CardHeader>
          <CardTitle>Mobile-First Design</CardTitle>
          <CardDescription>
            All components are optimized for mobile devices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span>Touch-friendly sizing (min 44px)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span>Responsive breakpoints</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span>Safe area insets</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span>Flowee brand colors (Green, Gold, Cream)</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
