# Implementation Tasks: Flowee Survey App

## Overview

**Flowee Survey App** adalah aplikasi web internal untuk tim lapangan Flowee dalam merekrut dan mendata toko bunga rekanan. Aplikasi ini menggantikan proses manual berbasis kertas dengan sistem digital yang mobile-first, cepat, dan terstruktur.

### Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** SQLite with Drizzle ORM (Turso for production)
- **Authentication:** Better Auth
- **Storage:** Cloudinary
- **Styling:** Tailwind CSS + shadcn/ui
- **Deployment:** Vercel

### Project Goals

- Mempercepat proses pendataan toko bunga rekanan di lapangan
- Menghilangkan risiko kehilangan data dari pencatatan manual
- Membangun database terstruktur untuk partner florist
- Target: 50+ toko dalam 1 bulan pertama

### Timeline

- **Phase 1 (MVP):** Week 1-2 (Core features)
- **Phase 2 (Enhancement):** Week 3-4 (Admin & advanced features)
- **Total Effort:** ~160-200 hours (2-4 weeks with 1-2 developers)

---

## Epic 1: Project Setup & Infrastructure

### 1.1 Initialize Next.js Project
- [x] Create Next.js 14 project with TypeScript and App Router
- [x] Configure Tailwind CSS
- [x] Set up project folder structure (app, components, lib, types)
- [x] Configure TypeScript strict mode
- [x] Set up ESLint and Prettier

_Requirements: Foundation for all development_  
**Effort:** 2 hours

---

### 1.2 Install Core Dependencies
- [x] Install shadcn/ui and configure components
- [x] Install Drizzle ORM and SQLite driver
- [x] Install Better Auth
- [x] Install Cloudinary SDK
- [x] Install form libraries (react-hook-form, zod)
- [x] Install date utilities (date-fns)
- [x] Install next-pwa for PWA support
- [x] Install Dexie.js for IndexedDB management

_Requirements: REQ-7.1, REQ-10.1, REQ-10.2_  
**Effort:** 2 hours

---

### 1.3 Setup Database Schema
- [x] Create Drizzle schema for `users` table
- [x] Create Drizzle schema for `rekanan` table
- [x] Create Drizzle schema for `sku` table
- [x] Create Drizzle schema for `activity_logs` table
- [x] Define relationships and foreign keys
- [x] Create database indexes for performance
- [x] Generate migration files

_Requirements: REQ-7.2_  
**Effort:** 4 hours

---

### 1.4 Configure Database Connection
- [x] Set up local SQLite database for development
- [x] Configure Drizzle client
- [x] Create database connection utility
- [x] Test database connection
- [ ] Set up Turso for production (optional for MVP)

_Requirements: REQ-7.1_  
**Effort:** 2 hours

---

### 1.5 Setup Environment Configuration
- [x] Create `.env.local` template
- [x] Configure environment variables (database, auth, cloudinary)
- [x] Set up environment validation with Zod
- [x] Document required environment variables in README
- [ ] Configure Vercel environment variables

_Requirements: REQ-8.1_  
**Effort:** 1 hour

---

**Checkpoint 1:** ✅ Project initialized, database schema created, environment configured

---

## Epic 2: Authentication System

### 2.1 Setup Better Auth
- [x] Configure Better Auth with email/password provider
- [x] Set up JWT token generation
- [x] Configure session management (7-day expiry)
- [x] Set up HTTP-only cookies
- [x] Create auth configuration file

_Requirements: REQ-1.1, REQ-8.1_  
**Effort:** 3 hours

---

### 2.2 Create Login Page
- [x] Design login page UI (mobile-first)
- [x] Create login form with email and password fields
- [x] Implement form validation (Zod schema)
- [x] Add "Remember Me" checkbox
- [x] Implement login API endpoint
- [x] Handle authentication errors with user-friendly messages
- [x] Add loading states

_Requirements: REQ-1.1_  
**Effort:** 4 hours

---

### 2.3 Implement Authentication Middleware
- [x] Create middleware to protect routes
- [x] Redirect unauthenticated users to login
- [x] Verify JWT tokens
- [x] Handle token expiry and refresh
- [x] Implement logout functionality

_Requirements: REQ-1.1, REQ-8.1_  
**Effort:** 3 hours

---

### 2.4 Create User Seed Data
- [x] Create database seed script
- [x] Add initial admin user
- [x] Add sample field team users
- [x] Hash passwords with bcrypt
- [x] Document default credentials

_Requirements: REQ-1.1_  
**Effort:** 1 hour

---

### *2.5 Implement Role-Based Access Control
- [x] Add role field to user schema (admin, field_team, viewer)
- [x] Create authorization utility functions
- [x] Implement role checks in middleware
- [x] Create role-based UI component wrapper
- [ ] Test different role permissions

_Requirements: REQ-1.2_  
**Effort:** 3 hours

---

**Checkpoint 2:** ✅ Authentication working, users can login/logout, routes protected

---

## Epic 3: Partner Store (Rekanan) Management

### 3.1 Create Rekanan List Page
- [x] Design rekanan list page layout (mobile-first)
- [x] Create rekanan card component
- [x] Implement data fetching with Server Components
- [x] Display: nama toko, nama owner, kota, status, jumlah produk
- [x] Add pagination (20 items per page)
- [x] Show empty state when no data
- [x] Add "Tambah Toko" button

_Requirements: REQ-2.2_  
**Effort:** 4 hours

---

### 3.2 Implement Search and Filter
- [x] Add search bar (search by nama toko or nama owner)
- [x] Create filter dropdown for kota/provinsi
- [x] Create filter for status reseller
- [x] Implement sort by tanggal survey (newest first)
- [x] Add "Clear Filters" button
- [x] Show active filter badges
- [x] Persist filters in URL params

_Requirements: REQ-2.2, REQ-6.3_  
**Effort:** 4 hours

---

### 3.3 Create Add Rekanan Form
- [x] Design add rekanan form (mobile-optimized)
- [x] Create form fields: nama toko, nama owner, no WA, alamat
- [x] Add provinsi dropdown (static data)
- [x] Add kabupaten/kota dropdown (dynamic based on provinsi)
- [x] Add kecamatan and kelurahan text inputs
- [x] Add jam layanan, status reseller, status ongkir fields
- [x] Implement form validation with Zod
- [x] Add foto toko upload field
- [x] Show validation errors inline

_Requirements: REQ-2.1_  
**Effort:** 5 hours

---

### 3.4 Implement GPS Location Capture
- [x] Request geolocation permission
- [x] Auto-fill koordinat field from GPS
- [ ] Show mini map preview (optional)
- [x] Add "Use Current Location" button
- [x] Handle permission denied gracefully
- [x] Store GPS accuracy level
- [x] Make GPS optional (not blocking)

_Requirements: REQ-4.3_  
**Effort:** 3 hours

---

### 3.5 Create Rekanan API Endpoints
- [x] POST /api/rekanan - Create new rekanan
- [x] GET /api/rekanan - List with search/filter/pagination
- [x] GET /api/rekanan/[id] - Get single rekanan with products
- [x] PATCH /api/rekanan/[id] - Update rekanan
- [x] Implement server-side validation
- [x] Auto-generate ID_REKANAN (RKN-YYYYMMDD-XXX)
- [x] Check for duplicate WhatsApp numbers
- [x] Log activity to activity_logs table

_Requirements: REQ-2.1, REQ-2.2, REQ-7.2_  
**Effort:** 5 hours

---

### 3.6 Create Rekanan Detail Page
- [x] Design detail page layout
- [x] Display all rekanan information
- [x] Show foto toko (zoomable with lightbox)
- [x] Embed Google Maps if coordinates available
- [x] Add "WhatsApp Owner" button (deep link)
- [x] Show list of products from this toko
- [x] Add "Tambah Produk Baru" button
- [x] Add "Edit Toko" button
- [x] Implement breadcrumb navigation

_Requirements: REQ-2.4_  
**Effort:** 4 hours

---

### 3.7 Create Edit Rekanan Form
- [x] Reuse add rekanan form component
- [x] Pre-fill form with existing data
- [x] Allow updating all fields except ID_REKANAN
- [x] Allow replacing foto toko
- [x] Show "Last updated by" and timestamp
- [x] Add confirmation dialog before save
- [x] Validate unique WhatsApp on update
- [x] Log changes to activity_logs

_Requirements: REQ-2.3_  
**Effort:** 3 hours

---

**Checkpoint 3:** ✅ Rekanan CRUD complete, search/filter working, GPS integration done

---

## Epic 4: Product (SKU) Management

### 4.1 Create Add Product Form
- [x] Design add product form (mobile-optimized)
- [x] Create form fields: nama barang, kategori, type, deskripsi
- [x] Add harga jual and harga reseller fields (Rupiah format)
- [x] Add diskon and ukuran fields
- [x] Implement validation: harga reseller < harga jual
- [x] Implement validation: diskon max 50%
- [x] Add foto produk upload (min 1, max 4 photos)
- [x] Show photo preview before upload
- [x] Link form to rekanan_id from URL params

_Requirements: REQ-3.1_  
**Effort:** 5 hours

---

### 4.2 Create Product API Endpoints
- [x] POST /api/sku - Create new product
- [x] GET /api/sku - List products with filters
- [x] GET /api/sku/[id] - Get single product
- [x] PATCH /api/sku/[id] - Update product
- [x] DELETE /api/sku/[id] - Soft delete (admin only)
- [x] Auto-generate ID_SKU (SKU-YYYYMMDD-XXX)
- [x] Validate business rules (prices, discount)
- [x] Log activity to activity_logs

_Requirements: REQ-3.1, REQ-3.3, REQ-3.4_  
**Effort:** 4 hours

---

### 4.3 Create Product List View
- [x] Design product grid (2 columns on mobile)
- [x] Create product card component
- [x] Display: thumbnail, nama, kategori, harga jual, harga reseller
- [x] Implement filter by kategori
- [x] Implement sort by harga (low to high, high to low)
- [x] Add quick view modal for product details
- [x] Highlight products with highest margin
- [x] Show empty state

_Requirements: REQ-3.2_  
**Effort:** 4 hours

---

### 4.4 Create Edit Product Form
- [x] Reuse add product form component
- [x] Pre-fill form with existing data
- [x] Allow updating all fields except ID_SKU
- [x] Allow replacing or adding photos (max 4 total)
- [x] Allow deleting individual photos (min 1 must remain)
- [x] Add confirmation dialog before save
- [x] Log price changes to activity_logs

_Requirements: REQ-3.3_  
**Effort:** 3 hours

---

### *4.5 Implement Product Delete (Admin Only)
- [x] Add delete button (visible only for admin role)
- [x] Create confirmation dialog with warning
- [x] Implement soft delete (set is_deleted = true)
- [x] Hide deleted products from list
- [x] Create restore functionality in admin panel
- [x] Log deletion to activity_logs

_Requirements: REQ-3.4_  
**Effort:** 2 hours

---

**Checkpoint 4:** ✅ Product CRUD complete, photo upload working, validation enforced

---

## Epic 5: Image Upload & Management

### 5.1 Setup Cloudinary Integration
- [ ] Create Cloudinary account and get credentials
- [x] Configure Cloudinary SDK
- [x] Set up upload preset with transformations
- [x] Configure folder structure (flowee-survey/toko, flowee-survey/produk)
- [x] Set up eager transformations for thumbnails (300x300)
- [ ] Test upload functionality

_Requirements: REQ-5.1_  
**Effort:** 2 hours

---

### 5.2 Create Image Upload Component
- [x] Design upload UI with drag-and-drop
- [x] Add "Choose from Camera" and "Choose from Gallery" options
- [x] Implement file validation (format: JPG, PNG, HEIC; size: max 5MB)
- [x] Show image preview before upload
- [x] Implement client-side compression (if > 1MB)
- [x] Show upload progress indicator
- [x] Handle upload errors gracefully
- [x] Support multiple file upload

_Requirements: REQ-4.2, REQ-5.1_  
**Effort:** 5 hours

---

### 5.3 Create Image Upload API
- [x] POST /api/upload/image endpoint
- [x] Accept FormData with file and type (toko/produk)
- [x] Validate file type and size on server
- [x] Upload to Cloudinary
- [x] Return public URL and thumbnail URL
- [x] Handle upload failures with retry logic
- [ ] Implement virus scanning (optional)

_Requirements: REQ-5.1, REQ-8.2_  
**Effort:** 3 hours

---

### 5.4 Implement Image Display Optimization
- [x] Use Next.js Image component for optimization
- [x] Implement lazy loading for list views
- [x] Add progressive loading (blur-up effect)
- [x] Create lightbox component for full view
- [x] Implement pinch-to-zoom on mobile
- [x] Use responsive images (srcset)
- [x] Optimize thumbnail display

_Requirements: REQ-5.2_  
**Effort:** 4 hours

---

**Checkpoint 5:** ✅ Image upload working, Cloudinary integrated, images optimized

---

## Epic 6: Dashboard & Reporting

### 6.1 Create Dashboard Layout
- [x] Design dashboard layout (mobile-first)
- [x] Create top navigation bar with logo and user menu
- [x] Create bottom navigation for mobile (Home, Rekanan, Produk, Profile)
- [ ] Create sidebar for desktop (optional)
- [x] Implement responsive navigation
- [x] Add logout functionality

_Requirements: REQ-6.1_  
**Effort:** 4 hours

---

### 6.2 Create Dashboard Metrics
- [x] Create stats card component
- [x] Display: Total toko tersurvey
- [x] Display: Total produk terdata
- [x] Display: Toko hari ini
- [x] Display: Produk hari ini
- [x] Fetch data from database with aggregations
- [x] Add loading skeletons
- [x] Auto-refresh every 5 minutes

_Requirements: REQ-6.1_  
**Effort:** 3 hours

---

### 6.3 Create Dashboard Charts
- [x] Install chart library (recharts or chart.js)
- [x] Create "Survey per hari" chart (last 7 days)
- [x] Create "Toko per kota" chart (top 5)
- [x] Fetch aggregated data from database
- [x] Make charts responsive
- [x] Add empty state for no data

_Requirements: REQ-6.1_  
**Effort:** 4 hours

---

### 6.4 Create Recent Activity Feed
- [x] Design activity feed component
- [x] Fetch recent activities from activity_logs
- [x] Display: user, action, entity, timestamp
- [x] Format timestamps (relative time)
- [x] Add pagination or "Load More"
- [x] Add icons for different action types

_Requirements: REQ-6.1_  
**Effort:** 2 hours

---

### 6.5 Create Dashboard API
- [x] GET /api/dashboard/stats endpoint
- [x] Aggregate total rekanan and sku counts
- [x] Aggregate today's counts
- [x] Calculate survey per day (last 7 days)
- [x] Calculate rekanan per kota (top 5)
- [x] Optimize queries with indexes
- [ ] Cache results (optional)

_Requirements: REQ-6.1_  
**Effort:** 3 hours

---

### *6.6 Implement Data Export
- [x] Create export button (admin only)
- [x] Generate CSV for rekanan data
- [x] Generate CSV for sku data
- [x] Include all fields except photos (URL only)
- [x] Apply active filters to export
- [x] Limit to 1000 rows per export
- [x] Add loading state during export
- [x] Trigger download automatically

_Requirements: REQ-6.2_  
**Effort:** 3 hours

---

**Checkpoint 6:** ✅ Dashboard complete with metrics, charts, and activity feed

---

## Epic 7: PWA & Offline Support

### 7.1 Configure PWA Manifest
- [x] Create web app manifest (manifest.json)
- [x] Generate app icons (72x72 to 512x512)
- [x] Configure theme colors and display mode
- [x] Add manifest link to app layout
- [ ] Create splash screen assets
- [ ] Test manifest on iOS and Android

_Requirements: REQ-10.1_  
**Effort:** 3 hours

---

### 7.2 Setup Service Worker
- [x] Install and configure next-pwa
- [x] Configure runtime caching strategies
- [x] Cache static assets (fonts, images)
- [x] Cache API responses (NetworkFirst strategy)
- [x] Configure cache expiration policies
- [ ] Test service worker registration

_Requirements: REQ-10.1, REQ-4.4_  
**Effort:** 4 hours

---

### 7.3 Setup IndexedDB Schema
- [x] Install Dexie.js
- [x] Create IndexedDB schema (pendingRekanan, pendingSKU, cachedData, syncLogs)
- [x] Define indexes for queries
- [x] Create database utility functions
- [x] Implement versioning and migrations
- [ ] Test database operations

_Requirements: REQ-10.2_  
**Effort:** 4 hours

---

### 7.4 Implement Offline Data Persistence
- [x] Create offline storage service
- [x] Implement save rekanan to IndexedDB
- [x] Implement save SKU to IndexedDB
- [x] Convert photos to base64 for offline storage
- [x] Implement pending queue management
- [x] Add storage quota monitoring
- [x] Implement cleanup for old data (30 days)

_Requirements: REQ-10.2, REQ-4.4_  
**Effort:** 6 hours

---

### 7.5 Implement Background Sync
- [x] Register Background Sync API
- [x] Create sync service worker handler
- [x] Implement sync on network restore
- [x] Implement exponential backoff retry (1s, 5s, 15s)
- [x] Handle sync failures (max 3 retries)
- [x] Log sync results to syncLogs table
- [ ] Test background sync on mobile devices

_Requirements: REQ-10.3_  
**Effort:** 5 hours

---

### 7.6 Create Offline Status Indicator
- [x] Create connection status component
- [x] Show online/offline/syncing status
- [x] Display pending items count
- [x] Add manual "Sync Now" button
- [x] Show sync progress indicator
- [x] Display sync errors with retry option
- [x] Add toast notifications for sync events

_Requirements: REQ-10.3, REQ-4.4_  
**Effort:** 3 hours

---

### 7.7 Implement Offline-First Form Submission
- [x] Modify rekanan form to save offline
- [x] Modify SKU form to save offline
- [x] Show immediate success feedback
- [x] Queue items for sync
- [x] Trigger sync if online
- [x] Handle form validation offline
- [ ] Test offline form submission

_Requirements: REQ-4.4, REQ-10.2_  
**Effort:** 4 hours

---

### 7.8 Create PWA Install Prompt
- [x] Listen for beforeinstallprompt event
- [x] Create install prompt UI
- [x] Show prompt after first login
- [x] Handle install acceptance/rejection
- [ ] Track install analytics
- [ ] Test on iOS (Add to Home Screen)
- [ ] Test on Android (Install App)

_Requirements: REQ-10.1_  
**Effort:** 3 hours

---

### 7.9 Implement Sync Priority Logic
- [x] Sync rekanan before SKU
- [x] Sync photos after data
- [x] Handle dependencies (SKU needs rekanan ID)
- [x] Update temp IDs after sync
- [x] Implement sync queue ordering
- [ ] Test sync with multiple pending items

_Requirements: REQ-10.3_  
**Effort:** 4 hours

---

### 7.10 Test Offline Functionality
- [ ] Test offline form submission
- [ ] Test background sync
- [ ] Test storage quota limits
- [ ] Test sync retry mechanism
- [ ] Test PWA install on devices
- [ ] Test offline → online transition
- [ ] Test with slow/unstable network
- [ ] Document offline limitations

_Requirements: REQ-4.4, REQ-10.1, REQ-10.2, REQ-10.3_  
**Effort:** 5 hours

---

**Checkpoint 7:** ✅ PWA installed, offline mode working, background sync functional

---

## Epic 8: Mobile Optimization

### 8.1 Implement Mobile-First Responsive Design
- [x] Define responsive breakpoints (360px-428px primary)
- [ ] Test all pages on mobile viewport
- [x] Ensure touch-friendly buttons (min 44px height)
- [x] Optimize form inputs for mobile keyboard
- [ ] Test on iOS Safari and Android Chrome
- [ ] Fix any layout issues on small screens

_Requirements: REQ-4.1_  
**Effort:** 4 hours

---

### 8.2 Implement Camera Integration
- [x] Request camera permission on first use
- [x] Open camera directly when "Camera" option selected
- [x] Capture photo from camera
- [x] Show preview before upload
- [x] Fallback to gallery if permission denied
- [ ] Test on iOS and Android devices

_Requirements: REQ-4.2_  
**Effort:** 3 hours

---

### 8.3 Optimize Mobile Performance
- [x] Implement code splitting for routes
- [x] Lazy load images and heavy components
- [x] Optimize bundle size
- [ ] Test on 3G connection (Chrome DevTools)
- [ ] Ensure initial load < 3 seconds
- [ ] Optimize form submission < 2 seconds
- [ ] Run Lighthouse audit and fix issues

_Requirements: REQ-7.1_  
**Effort:** 4 hours

---

### 8.4 Add Touch Gestures
- [ ] Implement swipe-to-go-back gesture
- [ ] Add pull-to-refresh on list pages
- [ ] Implement long-press for context menu (optional)
- [ ] Test gestures on touch devices
- [ ] Ensure no conflicts with native gestures

_Requirements: REQ-4.1_  
**Effort:** 3 hours

---

### *7.5 Implement Offline Capability
- [x] Set up service worker for offline support
- [x] Store form data in localStorage
- [x] Create upload queue for offline submissions
- [x] Show online/offline/syncing indicator
- [x] Implement auto-retry on connection restore
- [x] Limit queue to 10 pending submissions
- [x] Clear queue after 7 days

_Requirements: REQ-4.4_  
**Effort:** 5 hours

---

**Checkpoint 8:** ✅ Mobile experience optimized, camera working, performance targets met

---

## Epic 9: Admin Panel

### *8.1 Create User Management Page
- [x] Design user management UI (admin only)
- [x] List all users with role and status
- [x] Create "Add User" form (email, password, role)
- [x] Implement edit user role functionality
- [x] Implement deactivate user (soft delete)
- [x] Implement reset password functionality
- [x] Validate: email must be unique
- [x] Ensure at least 1 admin always active

_Requirements: REQ-9.1_  
**Effort:** 5 hours

---

### *8.2 Create Activity Log Viewer
- [x] Design activity log page (admin only)
- [x] Display: user, action, timestamp, details
- [x] Implement filter by user
- [x] Implement filter by date range
- [x] Implement filter by action type
- [x] Add pagination
- [x] Create export to CSV functionality
- [ ] Set log retention to 90 days

_Requirements: REQ-9.2_  
**Effort:** 4 hours

---

### *8.3 Create User Management API
- [x] POST /api/admin/users - Create user
- [x] GET /api/admin/users - List users
- [x] PATCH /api/admin/users/[id] - Update user
- [x] DELETE /api/admin/users/[id] - Deactivate user
- [x] POST /api/admin/users/[id]/reset-password
- [x] Implement admin-only authorization
- [x] Hash passwords with bcrypt

_Requirements: REQ-9.1_  
**Effort:** 3 hours

---

**Checkpoint 9:** ✅ Admin panel complete with user management and activity logs

---

## Epic 10: Testing & Quality Assurance

### 10.1 Write Unit Tests
- [ ] Set up Vitest testing framework
- [ ] Write tests for validation functions
- [ ] Write tests for utility functions
- [ ] Write tests for ID generation logic
- [ ] Write tests for business logic (price validation, etc.)
- [ ] Achieve 80% code coverage for utilities

_Requirements: REQ-7.2, REQ-7.3_  
**Effort:** 4 hours

---

### 10.2 Write Integration Tests
- [ ] Write tests for authentication flow
- [ ] Write tests for rekanan API endpoints
- [ ] Write tests for sku API endpoints
- [ ] Write tests for upload API
- [ ] Write tests for dashboard API
- [ ] Mock database and external services

_Requirements: REQ-7.3_  
**Effort:** 5 hours

---

### 10.3 Write E2E Tests
- [ ] Set up Playwright for E2E testing
- [ ] Write test: User login flow
- [ ] Write test: Add rekanan flow
- [ ] Write test: Add product flow
- [ ] Write test: Image upload flow
- [ ] Run tests in CI/CD pipeline

_Requirements: REQ-7.3_  
**Effort:** 5 hours

---

### 10.4 Manual Testing & Bug Fixes
- [ ] Test all features on mobile devices (iOS and Android)
- [ ] Test on different browsers (Chrome, Safari, Firefox)
- [ ] Test with slow 3G connection
- [ ] Test edge cases and error scenarios
- [ ] Fix identified bugs
- [ ] Document known issues

_Requirements: REQ-7.1, REQ-7.3_  
**Effort:** 6 hours

---

### 10.5 Security Audit
- [ ] Review authentication implementation
- [ ] Test authorization for all roles
- [ ] Check for SQL injection vulnerabilities
- [ ] Check for XSS vulnerabilities
- [ ] Validate file upload security
- [ ] Review error handling (no sensitive data exposed)
- [ ] Test HTTPS enforcement
- [ ] Review security headers

_Requirements: REQ-8.1, REQ-8.2_  
**Effort:** 3 hours

---

**Checkpoint 10:** ✅ Tests written and passing, bugs fixed, security validated

---

## Epic 11: Deployment & Launch

### 11.1 Setup Vercel Deployment
- [ ] Connect GitHub repository to Vercel
- [ ] Configure build settings
- [ ] Set up environment variables in Vercel
- [ ] Configure custom domain (optional)
- [ ] Test deployment on staging environment
- [ ] Enable automatic deployments on push

_Requirements: REQ-7.1_  
**Effort:** 2 hours

---

### 11.2 Setup Production Database
- [ ] Create Turso database for production
- [ ] Run migrations on production database
- [ ] Seed initial admin user
- [ ] Test database connection from Vercel
- [ ] Set up database backups
- [ ] Document database access

_Requirements: REQ-7.1_  
**Effort:** 2 hours

---

### 11.3 Configure Cloudinary for Production
- [ ] Verify Cloudinary account limits
- [ ] Set up production upload preset
- [ ] Configure folder structure
- [ ] Test image upload in production
- [ ] Set up CDN caching
- [ ] Monitor usage

_Requirements: REQ-5.1_  
**Effort:** 1 hour

---

### 11.4 Performance Optimization
- [ ] Run Lighthouse audit on production
- [ ] Optimize images and assets
- [ ] Enable compression and caching
- [ ] Minimize bundle size
- [ ] Test load time on 3G connection
- [ ] Fix performance issues

_Requirements: REQ-7.1_  
**Effort:** 3 hours

---

### 11.5 Create Documentation
- [x] Write README with project overview
- [x] Document environment setup
- [ ] Document deployment process
- [ ] Create user guide for field team
- [ ] Document API endpoints
- [ ] Create troubleshooting guide

_Requirements: Foundation_  
**Effort:** 3 hours

---

### 11.6 Launch Preparation
- [ ] Create initial admin accounts for team
- [ ] Train field team on app usage
- [ ] Set up monitoring and error tracking
- [ ] Prepare rollback plan
- [ ] Announce launch to team
- [ ] Monitor first day usage

_Requirements: Foundation_  
**Effort:** 2 hours

---

**Checkpoint 11:** ✅ App deployed to production, PWA working, team trained, monitoring active

---

## Task Dependency Graph

```json
{
  "waves": [
    {
      "wave": 1,
      "description": "Project Foundation",
      "tasks": ["1.1", "1.2", "1.5"],
      "parallelizable": true
    },
    {
      "wave": 2,
      "description": "Database Setup",
      "tasks": ["1.3", "1.4"],
      "parallelizable": false,
      "depends_on": [1]
    },
    {
      "wave": 3,
      "description": "Authentication Core",
      "tasks": ["2.1", "2.2", "2.3", "2.4"],
      "parallelizable": false,
      "depends_on": [2]
    },
    {
      "wave": 4,
      "description": "Image Infrastructure",
      "tasks": ["5.1", "5.2", "5.3"],
      "parallelizable": true,
      "depends_on": [3]
    },
    {
      "wave": 5,
      "description": "Rekanan CRUD",
      "tasks": ["3.1", "3.2", "3.3", "3.5"],
      "parallelizable": true,
      "depends_on": [4]
    },
    {
      "wave": 6,
      "description": "Rekanan Details & GPS",
      "tasks": ["3.4", "3.6", "3.7"],
      "parallelizable": true,
      "depends_on": [5]
    },
    {
      "wave": 7,
      "description": "Product CRUD",
      "tasks": ["4.1", "4.2", "4.3", "4.4"],
      "parallelizable": true,
      "depends_on": [6]
    },
    {
      "wave": 8,
      "description": "Dashboard & Reporting",
      "tasks": ["6.1", "6.2", "6.3", "6.4", "6.5"],
      "parallelizable": true,
      "depends_on": [7]
    },
    {
      "wave": 9,
      "description": "Phase 1 Complete - Core MVP Ready",
      "tasks": [],
      "milestone": true,
      "depends_on": [8]
    },
    {
      "wave": 10,
      "description": "PWA Setup",
      "tasks": ["7.1", "7.2", "7.3"],
      "parallelizable": true,
      "depends_on": [9]
    },
    {
      "wave": 11,
      "description": "Offline Data & Sync",
      "tasks": ["7.4", "7.5", "7.6", "7.7"],
      "parallelizable": true,
      "depends_on": [10]
    },
    {
      "wave": 12,
      "description": "PWA Polish",
      "tasks": ["7.8", "7.9", "7.10"],
      "parallelizable": true,
      "depends_on": [11]
    },
    {
      "wave": 13,
      "description": "Phase 2 Complete - PWA & Offline Ready",
      "tasks": [],
      "milestone": true,
      "depends_on": [12]
    },
    {
      "wave": 14,
      "description": "Mobile Optimization",
      "tasks": ["5.4", "8.1", "8.2", "8.3", "8.4"],
      "parallelizable": true,
      "depends_on": [13]
    },
    {
      "wave": 15,
      "description": "Phase 2 Enhanced Features",
      "tasks": ["2.5", "4.5", "6.6"],
      "parallelizable": true,
      "depends_on": [14]
    },
    {
      "wave": 16,
      "description": "Admin Panel",
      "tasks": ["9.1", "9.2", "9.3"],
      "parallelizable": true,
      "depends_on": [15]
    },
    {
      "wave": 17,
      "description": "Testing & QA",
      "tasks": ["10.1", "10.2", "10.3", "10.4", "10.5"],
      "parallelizable": true,
      "depends_on": [16]
    },
    {
      "wave": 18,
      "description": "Deployment",
      "tasks": ["11.1", "11.2", "11.3", "11.4", "11.5", "11.6"],
      "parallelizable": false,
      "depends_on": [17]
    }
  ],
  "critical_path": [
    "1.1", "1.3", "1.4", "2.1", "2.2", "2.3", 
    "5.1", "5.2", "3.3", "3.5", "3.6", 
    "4.1", "4.2", "6.1", "6.5",
    "7.1", "7.2", "7.3", "7.4", "7.5", "7.7",
    "8.1", "8.3", "10.4", "11.1", "11.2", "11.6"
  ]
}
```

---

## Notes

### Testing Strategy

**Unit Tests (80% coverage target):**
- Validation functions (Zod schemas)
- Utility functions (ID generation, formatting)
- Business logic (price validation, discount calculation)

**Integration Tests:**
- API endpoints with mocked database
- Authentication flow
- File upload flow

**E2E Tests (Critical paths):**
- Login → Add Rekanan → Add Product → View Dashboard
- Image upload and display
- Search and filter functionality

**Manual Testing:**
- Mobile device testing (iOS Safari, Android Chrome)
- Different screen sizes (360px to 428px)
- Slow network conditions (3G)
- Camera and GPS permissions

---

### Deployment Strategy

**Development:**
- Local SQLite database
- Local Cloudinary test account
- Hot reload with Next.js dev server

**Staging (Vercel Preview):**
- Turso database (staging instance)
- Cloudinary production account (test folder)
- Automatic deployment on PR

**Production (Vercel):**
- Turso database (production instance)
- Cloudinary production account
- Automatic deployment on main branch merge
- Environment variables configured in Vercel

**Rollback Plan:**
- Vercel instant rollback to previous deployment
- Database migrations are reversible
- Cloudinary images are never deleted (archive only)

---

### Effort Estimates Summary

| Epic | Tasks | Total Hours | Priority |
|------|-------|-------------|----------|
| Epic 1: Project Setup | 5 | 11h | Must Have |
| Epic 2: Authentication | 5 | 14h | Must Have |
| Epic 3: Rekanan Management | 7 | 28h | Must Have |
| Epic 4: Product Management | 5 | 18h | Must Have |
| Epic 5: Image Management | 4 | 14h | Must Have |
| Epic 6: Dashboard | 6 | 19h | Must Have |
| Epic 7: PWA & Offline | 10 | 41h | Must Have |
| Epic 8: Mobile Optimization | 4 | 14h | Must Have |
| Epic 9: Admin Panel | 3 | 12h | Should Have |
| Epic 10: Testing & QA | 5 | 23h | Must Have |
| Epic 11: Deployment | 6 | 13h | Must Have |
| **Total** | **60** | **207h** | |

**Phase Breakdown:**
- **Phase 1 (MVP Core):** Epics 1-6 = ~104 hours (2 weeks)
- **Phase 2 (PWA & Offline):** Epic 7 = ~41 hours (1 week)
- **Phase 3 (Polish & Launch):** Epics 8-11 = ~62 hours (1-2 weeks)

**Team Scenarios:**
- **1 Developer:** 5-6 weeks (full-time)
- **2 Developers:** 3-4 weeks (full-time, parallel work)

---

### Success Criteria

**Technical:**
- ✅ All Must Have requirements implemented
- ✅ PWA installable on iOS and Android
- ✅ Offline mode fully functional
- ✅ Background sync working
- ✅ Initial page load < 3 seconds on 3G
- ✅ Form submission < 2 seconds
- ✅ Image upload < 5 seconds per photo
- ✅ Mobile-responsive (360px-428px)
- ✅ Authentication secure (JWT, bcrypt)
- ✅ Zero data loss (online and offline)

**Business:**
- ✅ Tim dapat survey 5-10 toko per hari
- ✅ Data entry time < 5 menit per toko
- ✅ 100% foto terupload dengan sukses
- ✅ Database 50+ toko dalam 1 bulan pertama
- ✅ Field team adoption rate > 90%
- ✅ 90%+ tim install PWA ke home screen
- ✅ Offline mode digunakan di area dengan koneksi buruk

---

### Risk Mitigation

**Risk: Slow mobile network**
- Mitigation: PWA with offline-first, aggressive caching, background sync

**Risk: Offline data loss**
- Mitigation: IndexedDB persistence, sync queue with retry, storage monitoring

**Risk: Storage quota exceeded**
- Mitigation: Cleanup old data (30 days), warn at 80%, compress photos

**Risk: GPS not available**
- Mitigation: Make GPS optional, allow manual coordinate input

**Risk: Camera permission denied**
- Mitigation: Fallback to gallery upload, clear permission instructions

**Risk: Database performance issues**
- Mitigation: Proper indexing, pagination, query optimization

**Risk: Cloudinary free tier limits**
- Mitigation: Monitor usage, upgrade plan if needed, image compression

**Risk: Team adoption resistance**
- Mitigation: Simple UX, training session, responsive support

---

**End of Tasks Document**
