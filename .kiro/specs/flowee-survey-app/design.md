# Design Document: Flowee Survey App

## 1. System Overview

**Flowee Survey App** adalah aplikasi web internal berbasis Next.js untuk tim lapangan dalam merekrut dan mendata partner florist. Aplikasi ini menggantikan proses manual berbasis kertas dengan sistem digital yang mobile-first, cepat, dan terstruktur.

### 1.1 Architecture Style

**Monolithic Web Application** dengan arsitektur modern:
- **Frontend:** Next.js 14 App Router (React Server Components + Client Components)
- **Backend:** Next.js API Routes & Server Actions
- **Database:** SQLite dengan Drizzle ORM
- **Storage:** Cloudinary untuk foto
- **Auth:** Better Auth
- **Deployment:** Vercel

### 1.2 Key Design Principles

1. **Mobile-First:** Optimized untuk smartphone (primary device)
2. **Offline-First:** App berfungsi tanpa internet, sync saat online
3. **Speed:** Fast load time meskipun di 3G/4G
4. **Simplicity:** Intuitive UX untuk non-technical field team
5. **Reliability:** Data tidak boleh hilang (zero data loss)
6. **Security:** Internal-only access dengan authentication
7. **Progressive:** PWA untuk native-like experience

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Field Team (Mobile)                   │
│                  Browser (Chrome/Safari)                 │
│  ┌────────────────────────────────────────────────┐     │
│  │  Service Worker (Offline Support)              │     │
│  │  - Cache static assets                         │     │
│  │  - Background sync queue                       │     │
│  │  - Push notifications                          │     │
│  └────────────────────────────────────────────────┘     │
│  ┌────────────────────────────────────────────────┐     │
│  │  IndexedDB (Local Storage)                     │     │
│  │  - Pending submissions                         │     │
│  │  - Cached data                                 │     │
│  │  - Offline photos (base64)                     │     │
│  └────────────────────────────────────────────────┘     │
└────────────────────┬────────────────────────────────────┘
                     │ HTTPS (when online)
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Next.js Application (Vercel)                │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Frontend (React Server + Client Components)     │   │
│  └──────────────────┬───────────────────────────────┘   │
│                     │                                    │
│  ┌──────────────────▼───────────────────────────────┐   │
│  │  Backend (API Routes + Server Actions)           │   │
│  │  - Authentication (Better Auth)                  │   │
│  │  - Business Logic                                │   │
│  │  - Data Validation                               │   │
│  │  - Sync Handler (process offline queue)         │   │
│  └──────────┬────────────────────┬──────────────────┘   │
└─────────────┼────────────────────┼─────────────────────┘
              │                    │
              ▼                    ▼
    ┌──────────────────┐  ┌──────────────────┐
    │  SQLite Database │  │    Cloudinary    │
    │  (Turso/Local)   │  │  (Image Storage) │
    └──────────────────┘  └──────────────────┘
```

### 2.2 Technology Stack Rationale

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| **Framework** | Next.js 14 | Full-stack framework, excellent performance, easy deployment |
| **Language** | TypeScript | Type safety, better DX, fewer runtime errors |
| **Database** | SQLite (Turso) | Lightweight, fast, perfect for structured data, easy to backup |
| **ORM** | Drizzle | Type-safe, lightweight, excellent SQLite support |
| **Auth** | Better Auth | Modern, secure, easy to setup for internal apps |
| **Storage** | Cloudinary | Free tier generous, automatic optimization, CDN included |
| **Styling** | Tailwind CSS | Fast development, mobile-first, consistent design |
| **UI Components** | shadcn/ui | High-quality, accessible, customizable components |
| **Deployment** | Vercel | Zero-config, automatic HTTPS, excellent Next.js support |
| **PWA** | next-pwa | Service Worker, offline support, installable |
| **Offline Storage** | IndexedDB (Dexie.js) | Robust client-side database for offline data |
| **Sync** | Background Sync API | Auto-sync when connection restored |

---

## 3. Data Model

### 3.1 Database Schema

#### Table: `users`
```typescript
{
  id: string (UUID, PK)
  email: string (unique, not null)
  password_hash: string (not null)
  name: string (not null)
  role: enum ('admin', 'field_team', 'viewer')
  is_active: boolean (default true)
  created_at: timestamp
  updated_at: timestamp
}
```

#### Table: `rekanan` (Partner Stores)
```typescript
{
  id: string (PK, format: RKN-YYYYMMDD-XXX)
  nama_toko: string (not null)
  nama_owner: string (not null)
  no_wa: string (unique, not null, format: +62xxx)
  reseller_allowed: boolean (default false)
  foto_toko_url: string (not null)
  jam_layanan: string (nullable)
  alamat: string (not null)
  provinsi: string (not null)
  kab_kota: string (not null)
  kecamatan: string (not null)
  kelurahan: string (not null)
  latitude: decimal (nullable)
  longitude: decimal (nullable)
  gps_accuracy: integer (nullable, in meters)
  status: enum ('active', 'inactive', 'pending')
  ongkir_status: enum ('gratis', 'berbayar', 'negosiasi')
  surveyed_by: string (FK to users.id)
  surveyed_at: timestamp
  created_at: timestamp
  updated_at: timestamp
  updated_by: string (FK to users.id, nullable)
}
```

#### Table: `sku` (Products)
```typescript
{
  id: string (PK, format: SKU-YYYYMMDD-XXX)
  rekanan_id: string (FK to rekanan.id, not null)
  nama_barang: string (not null)
  kategori: enum ('buket_wisuda', 'hand_bouquet', 'papan_bunga', 'standing_flower', 'sympathy_flower', 'custom_arrangement')
  type: enum ('fresh', 'artificial', 'mixed', nullable)
  deskripsi: text (nullable, max 500 char)
  harga: decimal (not null, > 0)
  harga_reseller: decimal (not null, > 0)
  diskon: decimal (nullable, 0-50)
  ukuran: enum ('small', 'medium', 'large', 'extra_large', nullable)
  foto_1_url: string (not null)
  foto_2_url: string (nullable)
  foto_3_url: string (nullable)
  foto_4_url: string (nullable)
  is_deleted: boolean (default false)
  created_by: string (FK to users.id)
  created_at: timestamp
  updated_at: timestamp
  updated_by: string (FK to users.id, nullable)
}
```

#### Table: `activity_logs`
```typescript
{
  id: string (UUID, PK)
  user_id: string (FK to users.id)
  action: enum ('create', 'update', 'delete', 'login', 'logout')
  entity_type: enum ('rekanan', 'sku', 'user')
  entity_id: string (nullable)
  details: json (nullable)
  ip_address: string (nullable)
  user_agent: string (nullable)
  created_at: timestamp
}
```

### 3.2 Indexes

```sql
-- Performance indexes
CREATE INDEX idx_rekanan_kab_kota ON rekanan(kab_kota);
CREATE INDEX idx_rekanan_surveyed_at ON rekanan(surveyed_at DESC);
CREATE INDEX idx_rekanan_no_wa ON rekanan(no_wa);
CREATE INDEX idx_sku_rekanan_id ON sku(rekanan_id);
CREATE INDEX idx_sku_kategori ON sku(kategori);
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at DESC);
```

### 3.3 Data Validation Rules

| Field | Validation |
|-------|-----------|
| `no_wa` | Regex: `^\\+62[0-9]{9,12}$` |
| `email` | Valid email format |
| `harga` | Positive decimal, max 2 decimal places |
| `harga_reseller` | Must be < `harga` |
| `diskon` | 0-50 range |
| `foto_*_url` | Valid URL, HTTPS only |
| `latitude` | -90 to 90 |
| `longitude` | -180 to 180 |

---

## 4. API Design

### 4.1 Authentication Endpoints

```typescript
POST /api/auth/login
Body: { email: string, password: string }
Response: { user: User, token: string }

POST /api/auth/logout
Response: { success: boolean }

GET /api/auth/me
Response: { user: User }
```

### 4.2 Rekanan (Partner Store) Endpoints

```typescript
GET /api/rekanan
Query: { search?, kota?, status?, page?, limit? }
Response: { data: Rekanan[], total: number, page: number }

GET /api/rekanan/:id
Response: { data: Rekanan, products: SKU[] }

POST /api/rekanan
Body: RekananCreateInput
Response: { data: Rekanan }

PATCH /api/rekanan/:id
Body: RekananUpdateInput
Response: { data: Rekanan }

DELETE /api/rekanan/:id (Admin only)
Response: { success: boolean }
```

### 4.3 SKU (Product) Endpoints

```typescript
GET /api/sku
Query: { rekanan_id?, kategori?, search?, page?, limit? }
Response: { data: SKU[], total: number }

GET /api/sku/:id
Response: { data: SKU }

POST /api/sku
Body: SKUCreateInput
Response: { data: SKU }

PATCH /api/sku/:id
Body: SKUUpdateInput
Response: { data: SKU }

DELETE /api/sku/:id (Admin only, soft delete)
Response: { success: boolean }
```

### 4.4 Upload Endpoints

```typescript
POST /api/upload/image
Body: FormData { file: File, type: 'toko' | 'produk' }
Response: { url: string, thumbnail_url: string }
```

### 4.5 Dashboard Endpoints

```typescript
GET /api/dashboard/stats
Response: {
  total_rekanan: number
  total_sku: number
  rekanan_today: number
  sku_today: number
  survey_per_day: Array<{ date: string, count: number }>
  rekanan_per_kota: Array<{ kota: string, count: number }>
}
```

---

## 5. Frontend Architecture

### 5.1 Page Structure

```
app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx          # Login page
│   └── layout.tsx             # Auth layout (no nav)
│
├── (dashboard)/
│   ├── layout.tsx             # Dashboard layout (with nav)
│   ├── page.tsx               # Dashboard home
│   ├── rekanan/
│   │   ├── page.tsx           # List rekanan
│   │   ├── [id]/
│   │   │   └── page.tsx       # Detail rekanan
│   │   ├── new/
│   │   │   └── page.tsx       # Add rekanan
│   │   └── [id]/edit/
│   │       └── page.tsx       # Edit rekanan
│   ├── produk/
│   │   ├── new/
│   │   │   └── page.tsx       # Add produk (with rekanan_id)
│   │   └── [id]/edit/
│   │       └── page.tsx       # Edit produk
│   └── admin/
│       ├── users/
│       │   └── page.tsx       # User management
│       └── logs/
│           └── page.tsx       # Activity logs
│
└── api/
    ├── auth/
    ├── rekanan/
    ├── sku/
    ├── upload/
    └── dashboard/
```

### 5.2 Component Architecture

```
components/
├── ui/                        # shadcn/ui components
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   └── ...
│
├── forms/
│   ├── rekanan-form.tsx       # Reusable form for add/edit rekanan
│   ├── sku-form.tsx           # Reusable form for add/edit SKU
│   └── image-upload.tsx       # Image upload with preview
│
├── layout/
│   ├── navbar.tsx             # Top navigation
│   ├── bottom-nav.tsx         # Mobile bottom navigation
│   └── sidebar.tsx            # Desktop sidebar (optional)
│
├── dashboard/
│   ├── stats-card.tsx         # Metric card component
│   ├── chart-survey.tsx       # Survey per day chart
│   └── recent-activity.tsx    # Activity feed
│
├── rekanan/
│   ├── rekanan-card.tsx       # Card for list view
│   ├── rekanan-detail.tsx     # Detail view component
│   └── rekanan-filters.tsx    # Filter controls
│
└── sku/
    ├── sku-card.tsx           # Product card
    ├── sku-grid.tsx           # Product grid
    └── sku-lightbox.tsx       # Image lightbox
```

### 5.3 State Management

**Approach:** Server State + Client State

- **Server State:** React Server Components + Server Actions (default)
- **Client State:** React useState + useContext for UI state
- **Form State:** React Hook Form
- **No global state library needed** (keep it simple)

### 5.4 Data Fetching Strategy

```typescript
// Server Component (default)
async function RekananListPage() {
  const rekanan = await db.query.rekanan.findMany()
  return <RekananList data={rekanan} />
}

// Client Component (for interactive features)
'use client'
function RekananFilters() {
  const [filters, setFilters] = useState({})
  // Client-side filtering logic
}

// Server Action (for mutations)
'use server'
async function createRekanan(data: RekananInput) {
  // Validation
  // Database insert
  // Revalidate cache
  revalidatePath('/rekanan')
}
```

---

## 6. Image Management

### 6.1 Upload Flow

```
User selects image
    ↓
Client-side validation (size, format)
    ↓
Compress image (if > 1MB)
    ↓
Upload to /api/upload/image
    ↓
Server validates file
    ↓
Upload to Cloudinary
    ↓
Cloudinary returns URLs (original + thumbnail)
    ↓
Save URLs to database
    ↓
Return success to client
```

### 6.2 Cloudinary Configuration

```typescript
// Upload preset
{
  folder: 'flowee-survey',
  transformation: [
    { width: 1200, height: 1200, crop: 'limit', quality: 'auto' },
    { fetch_format: 'auto' }
  ],
  eager: [
    { width: 300, height: 300, crop: 'fill', gravity: 'auto' } // thumbnail
  ]
}
```

### 6.3 Image Display Strategy

- **List View:** Thumbnail (300x300) with lazy loading
- **Detail View:** Optimized full image (1200x1200)
- **Lightbox:** Original quality
- **Format:** Auto (WebP for modern browsers, JPG fallback)

---

## 7. Authentication & Authorization

### 7.1 Authentication Flow

```
User enters email + password
    ↓
POST /api/auth/login
    ↓
Verify credentials (bcrypt)
    ↓
Generate JWT token
    ↓
Set HTTP-only cookie
    ↓
Return user data
    ↓
Redirect to dashboard
```

### 7.2 Authorization Matrix

| Feature | Admin | Field Team | Viewer |
|---------|-------|------------|--------|
| View Dashboard | ✅ | ✅ | ✅ |
| View Rekanan | ✅ | ✅ | ✅ |
| Add Rekanan | ✅ | ✅ | ❌ |
| Edit Rekanan | ✅ | ✅ | ❌ |
| Delete Rekanan | ✅ | ❌ | ❌ |
| View SKU | ✅ | ✅ | ✅ |
| Add SKU | ✅ | ✅ | ❌ |
| Edit SKU | ✅ | ✅ | ❌ |
| Delete SKU | ✅ | ❌ | ❌ |
| User Management | ✅ | ❌ | ❌ |
| View Logs | ✅ | ❌ | ❌ |
| Export Data | ✅ | ❌ | ❌ |

### 7.3 Session Management

- **Token Type:** JWT
- **Storage:** HTTP-only cookie
- **Expiry:** 7 days
- **Refresh:** Auto-refresh on activity
- **Logout:** Clear cookie + invalidate token

---

## 8. Mobile Optimization

### 8.1 Responsive Breakpoints

```css
/* Mobile First */
/* xs: 0-374px (small phones) */
/* sm: 375-767px (phones) - PRIMARY TARGET */
/* md: 768-1023px (tablets) */
/* lg: 1024px+ (desktop) */
```

### 8.2 Mobile-Specific Features

1. **Bottom Navigation**
   - Home, Rekanan, Produk, Profile
   - Fixed position, always visible
   - Active state indicator

2. **Touch Gestures**
   - Swipe to go back
   - Pull to refresh
   - Long press for context menu

3. **Camera Integration**
   - Direct camera access
   - Preview before upload
   - Retake option

4. **GPS Integration**
   - Auto-detect location
   - Show accuracy indicator
   - Manual override option

### 8.3 Performance Optimizations

- **Code Splitting:** Route-based automatic splitting
- **Image Optimization:** Next.js Image component
- **Lazy Loading:** Images and heavy components
- **Prefetching:** Next.js automatic prefetching
- **Caching:** Aggressive caching for static assets

---

## 9. Security Design

### 9.1 Security Layers

1. **Transport Security**
   - HTTPS only (enforced by Vercel)
   - Secure cookies (httpOnly, secure, sameSite)

2. **Authentication Security**
   - Password hashing (bcrypt, cost factor 12)
   - JWT with expiry
   - No password in logs or responses

3. **Authorization Security**
   - Role-based access control
   - Server-side permission checks
   - No client-side only protection

4. **Input Security**
   - Server-side validation (Zod schemas)
   - SQL injection prevention (ORM parameterized queries)
   - XSS prevention (React auto-escaping)
   - File upload validation (type, size, content)

5. **Data Security**
   - No sensitive data in URLs
   - Audit logs for all mutations
   - Soft delete (no permanent data loss)

### 9.2 Security Headers

```typescript
// next.config.js
{
  headers: [
    {
      key: 'X-Frame-Options',
      value: 'DENY'
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff'
    },
    {
      key: 'Referrer-Policy',
      value: 'strict-origin-when-cross-origin'
    }
  ]
}
```

---

## 10. Error Handling

### 10.1 Error Types

```typescript
type AppError = {
  code: string
  message: string
  details?: any
}

// Error codes
const ErrorCodes = {
  AUTH_INVALID_CREDENTIALS: 'auth/invalid-credentials',
  AUTH_UNAUTHORIZED: 'auth/unauthorized',
  VALIDATION_FAILED: 'validation/failed',
  DUPLICATE_ENTRY: 'database/duplicate',
  NOT_FOUND: 'resource/not-found',
  UPLOAD_FAILED: 'upload/failed',
  NETWORK_ERROR: 'network/error'
}
```

### 10.2 Error Handling Strategy

**Client-Side:**
- Toast notifications for user feedback
- Form field errors inline
- Retry button for network errors
- Fallback UI for component errors

**Server-Side:**
- Structured error responses
- Error logging (console + file)
- No sensitive data in error messages
- Proper HTTP status codes

### 10.3 User-Friendly Error Messages

```typescript
const errorMessages = {
  'auth/invalid-credentials': 'Email atau password salah',
  'auth/unauthorized': 'Anda tidak memiliki akses',
  'validation/failed': 'Data tidak valid, periksa kembali',
  'database/duplicate': 'Nomor WhatsApp sudah terdaftar',
  'upload/failed': 'Gagal upload foto, coba lagi',
  'network/error': 'Koneksi bermasalah, coba lagi'
}
```

---

## 11. Performance Targets

### 11.1 Load Time Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| First Contentful Paint (FCP) | < 1.5s | Lighthouse |
| Largest Contentful Paint (LCP) | < 2.5s | Lighthouse |
| Time to Interactive (TTI) | < 3.0s | Lighthouse |
| Cumulative Layout Shift (CLS) | < 0.1 | Lighthouse |
| First Input Delay (FID) | < 100ms | Lighthouse |

### 11.2 Runtime Performance

- **Form submission:** < 2s response time
- **Image upload:** < 5s per image
- **Page navigation:** < 500ms
- **Search/filter:** < 300ms

### 11.3 Optimization Techniques

1. **Server-Side Rendering:** Fast initial load
2. **Static Generation:** For public pages
3. **Image Optimization:** WebP, lazy loading, responsive
4. **Code Splitting:** Route-based automatic
5. **Database Indexing:** Fast queries
6. **Caching:** CDN + browser cache

---

## 12. Deployment Architecture

### 12.1 Vercel Deployment

```
GitHub Repository
    ↓ (git push)
Vercel Auto-Deploy
    ↓
Build Next.js App
    ↓
Deploy to Edge Network
    ↓
Production URL: flowee-survey.vercel.app
```

### 12.2 Environment Configuration

```bash
# .env.local (development)
DATABASE_URL=file:./dev.db
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
BETTER_AUTH_SECRET=xxx
BETTER_AUTH_URL=http://localhost:3000

# .env.production (Vercel)
DATABASE_URL=libsql://xxx.turso.io
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
BETTER_AUTH_SECRET=xxx
BETTER_AUTH_URL=https://flowee-survey.vercel.app
```

### 12.3 Database Hosting

**Option 1: Turso (Recommended)**
- SQLite in the cloud
- Edge replication
- Free tier: 500 databases, 1GB storage
- Excellent for this use case

**Option 2: Local SQLite + Backup**
- File-based SQLite
- Manual backup to S3/Google Drive
- Cheaper but less reliable

---

## 13. Testing Strategy

### 13.1 Testing Pyramid

```
        /\
       /  \  E2E Tests (5%)
      /____\
     /      \  Integration Tests (15%)
    /________\
   /          \  Unit Tests (80%)
  /____________\
```

### 13.2 Test Coverage

**Unit Tests:**
- Validation functions
- Utility functions
- Business logic

**Integration Tests:**
- API endpoints
- Database operations
- Authentication flow

**E2E Tests:**
- Critical user flows:
  - Login
  - Add rekanan
  - Add produk
  - Upload image

### 13.3 Testing Tools

- **Unit:** Vitest
- **Integration:** Vitest + MSW
- **E2E:** Playwright
- **Coverage:** Vitest coverage

---

## 14. Monitoring & Logging

### 14.1 Application Monitoring

**Vercel Analytics:**
- Page views
- Performance metrics
- Error tracking

**Custom Logging:**
- Activity logs (database)
- Error logs (console + file)
- Performance logs

### 14.2 Key Metrics to Track

1. **Usage Metrics:**
   - Daily active users
   - Rekanan added per day
   - SKU added per day
   - Upload success rate

2. **Performance Metrics:**
   - Page load time
   - API response time
   - Image upload time

3. **Error Metrics:**
   - Error rate
   - Failed uploads
   - Failed submissions

---

## 15. Future Scalability

### 15.1 Current Limitations

- **Database:** SQLite (single file, limited concurrency)
- **Storage:** Cloudinary free tier (25GB, 25k transformations/month)
- **Deployment:** Single region (Vercel default)

### 15.2 Migration Path (When Needed)

**Phase 1 → Phase 2 (100+ users, 1000+ rekanan):**
- Migrate SQLite → PostgreSQL (Supabase/Neon)
- Upgrade Cloudinary plan
- Add Redis for caching

**Phase 2 → Phase 3 (Marketplace launch):**
- Separate apps: Survey App + Marketplace
- Shared database or API integration
- Microservices architecture

---

## 17. PWA & Offline Architecture

### 17.1 Progressive Web App (PWA) Configuration

**Web App Manifest** (`public/manifest.json`):
```json
{
  "name": "Flowee Survey App",
  "short_name": "Flowee Survey",
  "description": "Internal survey tool for florist partner recruitment",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#173901",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "screenshots": [
    {
      "src": "/screenshots/mobile-1.png",
      "sizes": "540x720",
      "type": "image/png"
    }
  ]
}
```

**Next.js PWA Configuration** (`next.config.js`):
```javascript
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:gstatic|googleapis)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60 // 1 year
        }
      }
    },
    {
      urlPattern: /^https:\/\/res\.cloudinary\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'cloudinary-images',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
        }
      }
    },
    {
      urlPattern: /^\/api\/rekanan/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-rekanan',
        networkTimeoutSeconds: 10,
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 5 * 60 // 5 minutes
        }
      }
    },
    {
      urlPattern: /^\/api\/sku/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-sku',
        networkTimeoutSeconds: 10,
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 5 * 60 // 5 minutes
        }
      }
    }
  ]
})

module.exports = withPWA({
  // ... other Next.js config
})
```

### 17.2 Offline Data Storage Architecture

**IndexedDB Schema** (using Dexie.js):

```typescript
import Dexie, { Table } from 'dexie'

export interface PendingRekanan {
  id: string // client-generated UUID
  data: {
    nama_toko: string
    nama_owner: string
    no_wa: string
    // ... all rekanan fields
  }
  photos: {
    foto_toko: string // base64 encoded
  }
  status: 'pending' | 'syncing' | 'failed'
  retryCount: number
  createdAt: number
  lastAttempt?: number
  error?: string
}

export interface PendingSKU {
  id: string
  rekanan_id: string // reference to online or pending rekanan
  data: {
    nama_barang: string
    kategori: string
    // ... all SKU fields
  }
  photos: {
    foto_1?: string // base64
    foto_2?: string
    foto_3?: string
    foto_4?: string
  }
  status: 'pending' | 'syncing' | 'failed'
  retryCount: number
  createdAt: number
  lastAttempt?: number
  error?: string
}

export interface CachedData {
  key: string
  data: any
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
      pendingSKU: 'id, rekanan_id, status, createdAt',
      cachedData: 'key, expiresAt',
      syncLogs: 'id, timestamp, type, status'
    })
  }
}

export const db = new FloweeDB()
```

### 17.3 Offline-First Data Flow

**Create Rekanan (Offline-First):**

```typescript
async function createRekanan(data: RekananInput, photo: File) {
  // 1. Generate client-side ID
  const tempId = `temp-${uuidv4()}`
  
  // 2. Convert photo to base64
  const photoBase64 = await fileToBase64(photo)
  
  // 3. Save to IndexedDB
  await db.pendingRekanan.add({
    id: tempId,
    data: data,
    photos: { foto_toko: photoBase64 },
    status: 'pending',
    retryCount: 0,
    createdAt: Date.now()
  })
  
  // 4. Show success to user immediately
  toast.success('Toko berhasil disimpan (akan diupload saat online)')
  
  // 5. Trigger sync if online
  if (navigator.onLine) {
    await syncPendingData()
  }
  
  return tempId
}
```

**Sync Process:**

```typescript
async function syncPendingData() {
  // Get all pending items
  const pendingRekanan = await db.pendingRekanan
    .where('status').equals('pending')
    .or('status').equals('failed')
    .toArray()
  
  const pendingSKU = await db.pendingSKU
    .where('status').equals('pending')
    .or('status').equals('failed')
    .toArray()
  
  // Sync rekanan first (priority)
  for (const item of pendingRekanan) {
    if (item.retryCount >= 3) {
      // Max retries reached, skip
      continue
    }
    
    try {
      // Update status to syncing
      await db.pendingRekanan.update(item.id, { 
        status: 'syncing',
        lastAttempt: Date.now()
      })
      
      // 1. Upload photo to Cloudinary
      const photoBlob = base64ToBlob(item.photos.foto_toko)
      const photoUrl = await uploadToCloudinary(photoBlob)
      
      // 2. Create rekanan in database
      const response = await fetch('/api/rekanan', {
        method: 'POST',
        body: JSON.stringify({
          ...item.data,
          foto_toko_url: photoUrl
        })
      })
      
      if (!response.ok) throw new Error('Sync failed')
      
      const result = await response.json()
      
      // 3. Remove from pending queue
      await db.pendingRekanan.delete(item.id)
      
      // 4. Log success
      await db.syncLogs.add({
        id: uuidv4(),
        type: 'rekanan',
        action: 'create',
        entityId: result.data.id,
        status: 'success',
        timestamp: Date.now()
      })
      
      // 5. Update any pending SKU that reference this temp ID
      await db.pendingSKU
        .where('rekanan_id').equals(item.id)
        .modify({ rekanan_id: result.data.id })
      
    } catch (error) {
      // Increment retry count
      await db.pendingRekanan.update(item.id, {
        status: 'failed',
        retryCount: item.retryCount + 1,
        error: error.message
      })
      
      // Log failure
      await db.syncLogs.add({
        id: uuidv4(),
        type: 'rekanan',
        action: 'create',
        entityId: item.id,
        status: 'failed',
        timestamp: Date.now(),
        error: error.message
      })
    }
  }
  
  // Sync SKU after rekanan
  for (const item of pendingSKU) {
    // Similar process...
  }
}
```

### 17.4 Background Sync Implementation

**Service Worker Background Sync:**

```typescript
// In service worker (sw.js)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-pending-data') {
    event.waitUntil(syncPendingData())
  }
})

// Register background sync from client
async function registerBackgroundSync() {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    const registration = await navigator.serviceWorker.ready
    await registration.sync.register('sync-pending-data')
  }
}

// Trigger on network status change
window.addEventListener('online', () => {
  registerBackgroundSync()
})
```

### 17.5 Offline Status Indicator

**Connection Status Component:**

```typescript
'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/db'

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [pendingCount, setPendingCount] = useState(0)
  
  useEffect(() => {
    // Monitor online status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    // Count pending items
    const updatePendingCount = async () => {
      const rekananCount = await db.pendingRekanan.count()
      const skuCount = await db.pendingSKU.count()
      setPendingCount(rekananCount + skuCount)
    }
    
    updatePendingCount()
    const interval = setInterval(updatePendingCount, 5000)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      clearInterval(interval)
    }
  }, [])
  
  if (!isOnline) {
    return (
      <div className="bg-yellow-500 text-white px-4 py-2 text-sm">
        ⚠️ Offline Mode - Data akan disimpan lokal
      </div>
    )
  }
  
  if (isSyncing) {
    return (
      <div className="bg-blue-500 text-white px-4 py-2 text-sm">
        🔄 Syncing {pendingCount} items...
      </div>
    )
  }
  
  if (pendingCount > 0) {
    return (
      <div className="bg-orange-500 text-white px-4 py-2 text-sm">
        📤 {pendingCount} items menunggu upload
        <button onClick={syncPendingData} className="ml-2 underline">
          Sync Now
        </button>
      </div>
    )
  }
  
  return null
}
```

### 17.6 Retry Strategy

**Exponential Backoff:**

```typescript
async function syncWithRetry(item: PendingRekanan | PendingSKU) {
  const delays = [1000, 5000, 15000] // 1s, 5s, 15s
  const maxRetries = 3
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      await syncItem(item)
      return { success: true }
    } catch (error) {
      if (attempt < maxRetries - 1) {
        // Wait before retry
        await new Promise(resolve => 
          setTimeout(resolve, delays[attempt])
        )
      } else {
        // Max retries reached
        return { 
          success: false, 
          error: 'Max retries reached' 
        }
      }
    }
  }
}
```

### 17.7 Storage Management

**Storage Quota Monitoring:**

```typescript
async function checkStorageQuota() {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    const estimate = await navigator.storage.estimate()
    const usage = estimate.usage || 0
    const quota = estimate.quota || 0
    const percentUsed = (usage / quota) * 100
    
    if (percentUsed > 80) {
      // Warn user
      toast.warning('Storage hampir penuh. Sync data segera!')
    }
    
    if (percentUsed > 95) {
      // Critical: cleanup old data
      await cleanupOldData()
    }
    
    return { usage, quota, percentUsed }
  }
}

async function cleanupOldData() {
  const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000)
  
  // Delete old sync logs
  await db.syncLogs
    .where('timestamp').below(thirtyDaysAgo)
    .delete()
  
  // Delete expired cache
  await db.cachedData
    .where('expiresAt').below(Date.now())
    .delete()
  
  // Warn about old pending items
  const oldPending = await db.pendingRekanan
    .where('createdAt').below(thirtyDaysAgo)
    .toArray()
  
  if (oldPending.length > 0) {
    toast.error(`${oldPending.length} data lama gagal sync. Hubungi admin!`)
  }
}
```

### 17.8 Install Prompt

**PWA Install Prompt:**

```typescript
'use client'

import { useEffect, useState } from 'react'

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      
      // Show prompt after user logged in
      const hasLoggedIn = localStorage.getItem('hasLoggedIn')
      if (hasLoggedIn) {
        setShowPrompt(true)
      }
    }
    
    window.addEventListener('beforeinstallprompt', handler)
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])
  
  const handleInstall = async () => {
    if (!deferredPrompt) return
    
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      console.log('PWA installed')
    }
    
    setDeferredPrompt(null)
    setShowPrompt(false)
  }
  
  if (!showPrompt) return null
  
  return (
    <div className="fixed bottom-20 left-4 right-4 bg-white shadow-lg rounded-lg p-4 border">
      <h3 className="font-semibold mb-2">Install Flowee Survey</h3>
      <p className="text-sm text-gray-600 mb-3">
        Install app untuk akses lebih cepat dan bisa digunakan offline
      </p>
      <div className="flex gap-2">
        <button 
          onClick={handleInstall}
          className="flex-1 bg-green-600 text-white px-4 py-2 rounded"
        >
          Install
        </button>
        <button 
          onClick={() => setShowPrompt(false)}
          className="px-4 py-2 border rounded"
        >
          Nanti
        </button>
      </div>
    </div>
  )
}
```

---

## 16. Open Design Questions

### 16.1 Decisions Needed

1. **Database Hosting:**
   - Turso (cloud SQLite) vs Local SQLite?
   - **Recommendation:** Turso for reliability

2. **Image Storage:**
   - Cloudinary vs AWS S3?
   - **Recommendation:** Cloudinary for simplicity

3. **Offline Storage Limit:**
   - Max pending items: 50 or 100?
   - **Recommendation:** 50 (balance between functionality and storage)

4. **Sync Strategy:**
   - Auto-sync on connection or manual trigger?
   - **Recommendation:** Auto-sync with manual trigger option

5. **PWA Install Timing:**
   - Prompt immediately or after first login?
   - **Recommendation:** After first login (less intrusive)

---

## Summary

This design document provides a comprehensive technical blueprint for building the Flowee Survey App with **offline-first PWA capabilities**. The architecture is optimized for:

✅ **Speed:** Mobile-first, optimized for 3G/4G  
✅ **Offline-First:** Full functionality without internet, auto-sync when online  
✅ **PWA:** Installable, native-like experience  
✅ **Simplicity:** Monolithic Next.js app, minimal dependencies  
✅ **Security:** Authentication, authorization, input validation  
✅ **Reliability:** Zero data loss with IndexedDB persistence  
✅ **Scalability:** Clear migration path when needed  
✅ **Developer Experience:** TypeScript, modern tooling, clear structure  

**Key Offline Features:**
- Service Worker for offline support
- IndexedDB for robust local storage
- Background Sync API for auto-upload
- Exponential backoff retry strategy
- Storage quota management
- Sync status indicators

**Next Step:** Create implementation tasks based on this design.
