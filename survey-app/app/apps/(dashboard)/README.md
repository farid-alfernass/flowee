# Dashboard Routes

This folder contains all authenticated dashboard pages using Next.js route groups.

## Structure

- `page.tsx` - Dashboard home with metrics and charts
- `layout.tsx` - Dashboard layout with navigation
- `rekanan/` - Partner store management pages
  - `page.tsx` - List all rekanan
  - `[id]/page.tsx` - View rekanan detail
  - `new/page.tsx` - Add new rekanan
  - `[id]/edit/page.tsx` - Edit rekanan
- `produk/` - Product (SKU) management pages
  - `new/page.tsx` - Add new product
  - `[id]/edit/page.tsx` - Edit product
- `admin/` - Admin panel pages
  - `users/page.tsx` - User management
  - `logs/page.tsx` - Activity logs

## Route Group

The `(dashboard)` folder is a route group that shares the dashboard layout with navigation.
