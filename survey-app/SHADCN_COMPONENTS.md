# shadcn/ui Components - Flowee Survey App

## Installation Complete ✅

shadcn/ui has been successfully installed and configured for the Flowee Survey App.

## Configuration

- **Style**: Radix Nova
- **Base Color**: Neutral
- **CSS Variables**: Enabled
- **Icon Library**: Lucide React
- **Theme**: Flowee brand colors (Green #173901, Gold #885202, Cream #fdf9f3)

## Installed Components

### Form Components
- ✅ **Input** - Text input fields
- ✅ **Label** - Form labels
- ✅ **Textarea** - Multi-line text input
- ✅ **Select** - Dropdown select
- ✅ **Checkbox** - Checkbox input
- ✅ **Radio Group** - Radio button groups
- ✅ **Switch** - Toggle switch

### Layout Components
- ✅ **Card** - Content containers
- ✅ **Separator** - Visual dividers
- ✅ **Table** - Data tables
- ✅ **Pagination** - Page navigation

### Feedback Components
- ✅ **Alert** - Alert messages
- ✅ **Alert Dialog** - Confirmation dialogs
- ✅ **Dialog** - Modal dialogs
- ✅ **Sonner** - Toast notifications (replaces deprecated toast)
- ✅ **Skeleton** - Loading placeholders

### Navigation Components
- ✅ **Dropdown Menu** - Dropdown menus
- ✅ **Button** - Action buttons

### Display Components
- ✅ **Badge** - Status badges
- ✅ **Avatar** - User avatars

## Usage Examples

### Basic Button
```tsx
import { Button } from "@/components/ui/button"

<Button>Click me</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
```

### Form with Input
```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

<div className="space-y-2">
  <Label htmlFor="nama">Nama Toko</Label>
  <Input id="nama" placeholder="Masukkan nama toko" />
</div>
```

### Card Component
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Toko Bunga Mawar</CardTitle>
    <CardDescription>Jakarta Selatan</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Detail toko...</p>
  </CardContent>
</Card>
```

### Toast Notifications (Sonner)
```tsx
import { toast } from "sonner"

// Success
toast.success("Toko berhasil disimpan!")

// Error
toast.error("Gagal menyimpan data")

// Loading
toast.loading("Mengupload foto...")

// Custom
toast("Data sedang diproses", {
  description: "Mohon tunggu sebentar"
})
```

### Alert Dialog
```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Hapus</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
      <AlertDialogDescription>
        Apakah Anda yakin ingin menghapus data ini?
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Batal</AlertDialogCancel>
      <AlertDialogAction>Hapus</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Select Dropdown
```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Pilih provinsi" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="jakarta">DKI Jakarta</SelectItem>
    <SelectItem value="jabar">Jawa Barat</SelectItem>
    <SelectItem value="jateng">Jawa Tengah</SelectItem>
  </SelectContent>
</Select>
```

### Table
```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Nama Toko</TableHead>
      <TableHead>Kota</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Toko Bunga Mawar</TableCell>
      <TableCell>Jakarta</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Mobile-First Considerations

All components are mobile-optimized with:
- Touch-friendly sizing (min 44px height for buttons)
- Responsive breakpoints
- Safe area insets for mobile devices
- Smooth scrolling and animations

## Theme Customization

The components use Flowee brand colors defined in `app/globals.css`:
- **Primary**: Flowee Green (#173901)
- **Secondary**: Flowee Gold (#885202)
- **Background**: Flowee Cream (#fdf9f3)

## Next Steps

1. Use these components to build forms for Rekanan and SKU
2. Implement the dashboard with Card and Table components
3. Add toast notifications for user feedback
4. Create dialogs for confirmations and modals

## Documentation

For full component documentation, visit: https://ui.shadcn.com/docs/components
