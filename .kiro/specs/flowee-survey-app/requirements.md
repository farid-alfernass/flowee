# Requirements: Flowee Survey App

## Executive Summary

**Flowee Survey App** adalah aplikasi web internal untuk tim lapangan Flowee dalam merekrut dan mendata toko bunga rekanan. Aplikasi ini menggantikan proses manual berbasis kertas dengan sistem digital yang cepat, mobile-friendly, dan terstruktur.

**Tujuan Bisnis:**
- Mempercepat proses pendataan toko bunga rekanan di lapangan
- Menghilangkan risiko kehilangan data dari pencatatan manual
- Membangun database terstruktur untuk partner florist (nama, kontak, lokasi, produk, harga)
- Mempermudah ekspansi jaringan partner untuk persiapan marketplace

**Target Pengguna:** Tim internal Flowee (field team, operations team)

**Scope:** MVP web app untuk survey dan pendataan partner florist

---

## 1. User Authentication & Access Control

### REQ-1.1: Internal Team Authentication
**Priority:** Must Have  
**Description:** Hanya tim Flowee yang terdaftar dapat mengakses aplikasi.

**Acceptance Criteria:**
- [ ] Tim dapat login menggunakan email dan password
- [ ] Session tetap aktif selama 7 hari (remember me)
- [ ] Logout functionality tersedia
- [ ] Password minimal 8 karakter
- [ ] Redirect ke login page jika belum authenticated

**Business Rules:**
- Tidak ada public registration - admin yang menambahkan user
- Satu akun per anggota tim

---

### REQ-1.2: Role-Based Access
**Priority:** Should Have  
**Description:** Sistem mendukung role berbeda untuk kontrol akses.

**Acceptance Criteria:**
- [ ] Role: Admin (full access)
- [ ] Role: Field Team (create/edit toko dan produk)
- [ ] Role: Viewer (read-only access)
- [ ] Admin dapat mengelola user accounts

**Business Rules:**
- Field team tidak bisa delete data (hanya admin)
- Viewer hanya bisa lihat dashboard dan data

---

## 2. Partner Store Management (Rekanan)

### REQ-2.1: Add New Partner Store
**Priority:** Must Have  
**Description:** Tim lapangan dapat menambahkan data toko bunga baru.

**Acceptance Criteria:**
- [ ] Form input dengan fields:
  - Nama Toko (required)
  - Nama Pemilik (required) - "first win"
  - Nomor WhatsApp (required, format +62)
  - Alamat Lengkap (required)
  - Provinsi (dropdown, required)
  - Kabupaten/Kota (dropdown, required)
  - Kecamatan (text input, required)
  - Kelurahan (text input, required)
  - Koordinat Lokasi (optional, auto-detect dari GPS)
  - Jam Layanan (text input, optional)
  - Status Reseller (checkbox: "Menerima reseller?")
  - Status Ongkir (dropdown: "Gratis/Berbayar/Negosiasi")
  - Foto Toko (upload, required, max 5MB)
- [ ] Form validation untuk required fields
- [ ] Success message setelah save
- [ ] Auto-generate ID_REKANAN (format: RKN-YYYYMMDD-XXX)

**Business Rules:**
- Nomor WhatsApp harus unique (tidak boleh duplikat)
- Foto toko wajib diupload untuk verifikasi
- Koordinat lokasi auto-detect dari GPS HP jika permission granted

---

### REQ-2.2: View Partner Store List
**Priority:** Must Have  
**Description:** Tim dapat melihat daftar semua toko yang sudah disurvei.

**Acceptance Criteria:**
- [ ] Dashboard menampilkan list toko dengan info:
  - Nama Toko
  - Nama Pemilik
  - Kota
  - Status (Active/Inactive)
  - Jumlah produk yang sudah didata
  - Tanggal survey
- [ ] Search by nama toko atau nama pemilik
- [ ] Filter by kota/provinsi
- [ ] Filter by status reseller
- [ ] Sort by tanggal survey (newest first default)
- [ ] Pagination (20 items per page)

**Business Rules:**
- Default view: toko yang disurvei hari ini
- Highlight toko yang belum punya produk (warning badge)

---

### REQ-2.3: Edit Partner Store Information
**Priority:** Must Have  
**Description:** Tim dapat mengedit informasi toko yang sudah didata.

**Acceptance Criteria:**
- [ ] Button "Edit" pada detail toko
- [ ] Form pre-filled dengan data existing
- [ ] Dapat update semua fields kecuali ID_REKANAN
- [ ] Dapat replace foto toko
- [ ] Tampilkan "Last updated by" dan timestamp
- [ ] Confirmation sebelum save changes

**Business Rules:**
- Perubahan nomor WhatsApp harus tetap unique
- Log history perubahan (siapa, kapan, field apa)

---

### REQ-2.4: View Partner Store Detail
**Priority:** Must Have  
**Description:** Tim dapat melihat detail lengkap toko dan produknya.

**Acceptance Criteria:**
- [ ] Detail page menampilkan:
  - Semua informasi toko
  - Foto toko (zoomable)
  - Lokasi di Google Maps (jika ada koordinat)
  - List produk dari toko ini
  - Button "Tambah Produk Baru"
  - Button "Edit Toko"
  - Button "WhatsApp Owner" (deep link ke WA)
- [ ] Breadcrumb navigation
- [ ] Back to list button

**Business Rules:**
- Klik koordinat membuka Google Maps
- Klik nomor WA membuka WhatsApp

---

## 3. Product Catalog Management (SKU)

### REQ-3.1: Add Product to Store
**Priority:** Must Have  
**Description:** Tim dapat menambahkan produk bunga ke toko rekanan.

**Acceptance Criteria:**
- [ ] Form input dengan fields:
  - Nama Barang (required)
  - Kategori (dropdown, required): Buket Wisuda, Hand Bouquet, Papan Bunga, Standing Flower, Sympathy Flower, Custom Arrangement
  - Type (dropdown, optional): Fresh, Artificial, Mixed
  - Deskripsi (textarea, optional, max 500 char)
  - Harga Jual (required, format Rupiah)
  - Harga Reseller (required, format Rupiah)
  - Diskon (optional, percentage)
  - Ukuran (dropdown, optional): Small, Medium, Large, Extra Large
  - Foto Produk (upload, min 1 max 4 foto, each max 5MB)
- [ ] Form validation
- [ ] Preview foto sebelum upload
- [ ] Success message dan redirect ke detail toko
- [ ] Auto-generate ID_SKU (format: SKU-YYYYMMDD-XXX)

**Business Rules:**
- Harga Reseller harus lebih rendah dari Harga Jual
- Minimal 1 foto produk wajib diupload
- Diskon tidak boleh > 50%

---

### REQ-3.2: View Product List by Store
**Priority:** Must Have  
**Description:** Tim dapat melihat semua produk dari satu toko.

**Acceptance Criteria:**
- [ ] Product grid view dengan thumbnail
- [ ] Tampilkan: nama, kategori, harga jual, harga reseller
- [ ] Filter by kategori
- [ ] Sort by harga (low to high, high to low)
- [ ] Quick view modal untuk detail produk

**Business Rules:**
- Produk ditampilkan dalam grid 2 kolom (mobile)
- Highlight produk dengan margin tertinggi

---

### REQ-3.3: Edit Product Information
**Priority:** Must Have  
**Description:** Tim dapat mengedit informasi produk.

**Acceptance Criteria:**
- [ ] Button "Edit" pada detail produk
- [ ] Form pre-filled dengan data existing
- [ ] Dapat update semua fields kecuali ID_SKU
- [ ] Dapat replace atau tambah foto (max 4 total)
- [ ] Dapat delete foto individual
- [ ] Confirmation sebelum save

**Business Rules:**
- Minimal 1 foto harus tetap ada
- Log history perubahan harga

---

### REQ-3.4: Delete Product
**Priority:** Should Have  
**Description:** Admin dapat menghapus produk yang salah input.

**Acceptance Criteria:**
- [ ] Button "Delete" hanya visible untuk Admin role
- [ ] Confirmation dialog dengan warning
- [ ] Soft delete (status = "deleted", tidak benar-benar dihapus)
- [ ] Dapat restore dari admin panel

**Business Rules:**
- Field team tidak bisa delete
- Deleted products tidak muncul di list

---

## 4. Mobile Experience

### REQ-4.1: Mobile-First Design
**Priority:** Must Have  
**Description:** Aplikasi dioptimalkan untuk penggunaan di smartphone.

**Acceptance Criteria:**
- [ ] Responsive design untuk layar 360px - 428px
- [ ] Touch-friendly buttons (min 44px height)
- [ ] Form fields mudah diisi di mobile keyboard
- [ ] Bottom navigation untuk quick access
- [ ] Swipe gestures untuk navigation

**Business Rules:**
- Mobile adalah primary device
- Desktop view adalah bonus

---

### REQ-4.2: Camera Integration
**Priority:** Must Have  
**Description:** Tim dapat langsung foto dari kamera HP.

**Acceptance Criteria:**
- [ ] Upload button membuka pilihan: Camera atau Gallery
- [ ] Akses kamera langsung jika pilih Camera
- [ ] Preview foto sebelum upload
- [ ] Compress foto otomatis (max 1MB per foto)
- [ ] Tampilkan loading indicator saat upload

**Business Rules:**
- Request camera permission saat pertama kali
- Fallback ke gallery jika camera permission denied

---

### REQ-4.3: GPS Location Capture
**Priority:** Should Have  
**Description:** Auto-capture koordinat lokasi toko dari GPS.

**Acceptance Criteria:**
- [ ] Request location permission saat add toko
- [ ] Auto-fill koordinat field jika permission granted
- [ ] Tampilkan lokasi di mini map preview
- [ ] Button "Use Current Location"
- [ ] Manual input jika GPS tidak tersedia

**Business Rules:**
- GPS optional - tidak blocking jika denied
- Simpan accuracy level untuk validasi

---

### REQ-4.4: Offline Capability & PWA Support
**Priority:** Must Have  
**Description:** Tim dapat input data meskipun koneksi internet buruk dan install app seperti native app.

**Acceptance Criteria:**
- [ ] PWA manifest untuk install to home screen
- [ ] Service Worker untuk offline functionality
- [ ] Form data tersimpan di IndexedDB (lebih robust dari localStorage)
- [ ] Queue upload saat koneksi kembali
- [ ] Indicator status: Online/Offline/Syncing
- [ ] Retry otomatis jika upload gagal
- [ ] Background sync untuk upload queue
- [ ] Cache static assets untuk offline access
- [ ] Cache API responses untuk read operations

**Business Rules:**
- Max 50 pending submissions di queue (increased for offline scenarios)
- Clear queue setelah 30 hari (increased retention)
- Foto disimpan sebagai base64 di IndexedDB sementara
- Sync prioritas: Rekanan dulu, baru SKU, baru foto

---

## 5. Image Management

### REQ-5.1: Image Upload & Storage
**Priority:** Must Have  
**Description:** Sistem dapat menerima dan menyimpan foto dari tim.

**Acceptance Criteria:**
- [ ] Support format: JPG, PNG, HEIC
- [ ] Max file size: 5MB per foto
- [ ] Auto-compress jika > 1MB
- [ ] Generate thumbnail (300x300px)
- [ ] Store di cloud storage (Cloudinary atau S3)
- [ ] Return public URL untuk disimpan di database

**Business Rules:**
- Foto tidak disimpan di database (hanya URL)
- Foto tidak bisa dihapus permanent (archive)

---

### REQ-5.2: Image Display & Optimization
**Priority:** Must Have  
**Description:** Foto ditampilkan dengan optimal di berbagai device.

**Acceptance Criteria:**
- [ ] Lazy loading untuk list view
- [ ] Progressive loading (blur-up effect)
- [ ] Responsive images (srcset)
- [ ] Lightbox untuk full view
- [ ] Pinch to zoom di mobile

**Business Rules:**
- Thumbnail untuk list view
- Full resolution untuk detail view

---

## 6. Dashboard & Reporting

### REQ-6.1: Survey Progress Dashboard
**Priority:** Must Have  
**Description:** Dashboard menampilkan progress survey tim.

**Acceptance Criteria:**
- [ ] Metrics cards:
  - Total toko tersurvey
  - Total produk terdata
  - Toko hari ini
  - Produk hari ini
- [ ] Chart: Survey per hari (last 7 days)
- [ ] Chart: Toko per kota (top 5)
- [ ] Recent activity feed
- [ ] Quick actions: "Tambah Toko", "Lihat Semua"

**Business Rules:**
- Dashboard adalah landing page setelah login
- Refresh otomatis setiap 5 menit

---

### REQ-6.2: Export Data
**Priority:** Should Have  
**Description:** Admin dapat export data untuk analisis.

**Acceptance Criteria:**
- [ ] Export toko ke CSV/Excel
- [ ] Export produk ke CSV/Excel
- [ ] Include semua fields kecuali foto (URL only)
- [ ] Filter data sebelum export
- [ ] Download button dengan loading state

**Business Rules:**
- Hanya Admin yang bisa export
- Max 1000 rows per export

---

### REQ-6.3: Search & Filter
**Priority:** Must Have  
**Description:** Tim dapat mencari dan filter data dengan mudah.

**Acceptance Criteria:**
- [ ] Global search bar (search toko dan produk)
- [ ] Filter toko by: kota, status reseller, tanggal survey
- [ ] Filter produk by: kategori, range harga
- [ ] Clear all filters button
- [ ] Show active filter badges

**Business Rules:**
- Search minimal 3 karakter
- Filter tersimpan di session

---

## 7. Performance & Technical

### REQ-7.1: Fast Load Time
**Priority:** Must Have  
**Description:** Aplikasi harus cepat meskipun di koneksi mobile.

**Acceptance Criteria:**
- [ ] Initial page load < 3 detik (3G connection)
- [ ] Form submission response < 2 detik
- [ ] Image upload < 5 detik per foto
- [ ] Smooth scrolling (60fps)

**Business Rules:**
- Optimize untuk 3G/4G Indonesia
- Lazy load images dan components

---

### REQ-7.2: Data Validation
**Priority:** Must Have  
**Description:** Semua input data divalidasi untuk konsistensi.

**Acceptance Criteria:**
- [ ] Client-side validation (instant feedback)
- [ ] Server-side validation (security)
- [ ] Error messages dalam Bahasa Indonesia
- [ ] Highlight invalid fields
- [ ] Prevent duplicate submission

**Business Rules:**
- Nomor WA format: +62xxx (10-13 digit)
- Harga: positive number only
- Required fields tidak boleh kosong

---

### REQ-7.3: Error Handling
**Priority:** Must Have  
**Description:** Aplikasi handle error dengan graceful.

**Acceptance Criteria:**
- [ ] User-friendly error messages
- [ ] Retry button untuk failed operations
- [ ] Log errors untuk debugging
- [ ] Fallback UI jika component error
- [ ] Toast notifications untuk feedback

**Business Rules:**
- Jangan expose technical error ke user
- Auto-retry untuk network errors (max 3x)

---

## 8. Security & Privacy

### REQ-8.1: Secure Authentication
**Priority:** Must Have  
**Description:** Sistem autentikasi aman dari unauthorized access.

**Acceptance Criteria:**
- [ ] Password hashing (bcrypt)
- [ ] JWT token untuk session
- [ ] Token expiry (7 days)
- [ ] Secure HTTP-only cookies
- [ ] HTTPS only (no HTTP)

**Business Rules:**
- Password tidak disimpan plain text
- Token refresh otomatis

---

### REQ-8.2: Data Privacy
**Priority:** Must Have  
**Description:** Data partner dijaga kerahasiaannya.

**Acceptance Criteria:**
- [ ] Data hanya accessible oleh authenticated users
- [ ] No public API endpoints
- [ ] Audit log untuk data access
- [ ] Secure file upload (virus scan)

**Business Rules:**
- Data partner adalah confidential
- Tidak boleh di-share ke pihak ketiga

---

## 9. Admin Panel

### REQ-9.1: User Management
**Priority:** Should Have  
**Description:** Admin dapat mengelola user accounts.

**Acceptance Criteria:**
- [ ] List semua users dengan role
- [ ] Add new user (email, password, role)
- [ ] Edit user role
- [ ] Deactivate user (soft delete)
- [ ] Reset user password

**Business Rules:**
- Minimal 1 Admin harus selalu aktif
- Email harus unique

---

### REQ-9.2: Activity Log
**Priority:** Should Have  
**Description:** Admin dapat melihat activity log tim.

**Acceptance Criteria:**
- [ ] Log semua actions: create, edit, delete
- [ ] Tampilkan: user, action, timestamp, details
- [ ] Filter by user, date range, action type
- [ ] Export log to CSV

**Business Rules:**
- Log retention: 90 hari
- Tidak bisa edit atau delete log

---

## 10. PWA Features

### REQ-10.1: Install to Home Screen
**Priority:** Must Have  
**Description:** User dapat install app ke home screen seperti native app.

**Acceptance Criteria:**
- [ ] Web app manifest dengan icons dan metadata
- [ ] Install prompt muncul otomatis (iOS dan Android)
- [ ] App berjalan fullscreen tanpa browser UI
- [ ] Splash screen saat app launch
- [ ] App icon di home screen

**Business Rules:**
- Prompt install setelah user login pertama kali
- Support iOS (Add to Home Screen) dan Android (Install App)

---

### REQ-10.2: Offline Data Persistence
**Priority:** Must Have  
**Description:** Data yang diinput offline tersimpan aman dan tidak hilang.

**Acceptance Criteria:**
- [ ] IndexedDB untuk menyimpan pending submissions
- [ ] Versioning untuk handle schema changes
- [ ] Data migration jika struktur berubah
- [ ] Export/import data untuk backup
- [ ] Clear indication of offline data count

**Business Rules:**
- Data offline max 30 hari
- Warning jika storage hampir penuh (> 80%)
- Auto-cleanup data yang sudah berhasil sync

---

### REQ-10.3: Background Sync
**Priority:** Must Have  
**Description:** Upload otomatis saat koneksi kembali, bahkan jika app ditutup.

**Acceptance Criteria:**
- [ ] Background Sync API untuk auto-upload
- [ ] Retry dengan exponential backoff
- [ ] Notification saat sync berhasil/gagal
- [ ] Sync queue dengan prioritas
- [ ] Manual sync trigger button

**Business Rules:**
- Max 3 retry attempts per item
- Exponential backoff: 1s, 5s, 15s
- Prioritas sync: Rekanan → SKU → Foto

---

## 11. Future Enhancements (Won't Have Yet)

### REQ-11.1: Partner Mobile App
**Priority:** Won't Have  
**Description:** Aplikasi terpisah untuk partner florist (bukan tim internal).

**Rationale:** Fokus dulu ke internal tool. Partner app untuk fase marketplace nanti.

---

### REQ-11.2: Real-time Collaboration
**Priority:** Won't Have  
**Description:** Multiple users edit data bersamaan dengan real-time sync.

**Rationale:** Tidak critical untuk MVP. Tim biasanya survey sendiri-sendiri.

---

### REQ-11.3: Advanced Analytics
**Priority:** Won't Have  
**Description:** Dashboard analytics dengan chart kompleks dan insights.

**Rationale:** Basic reporting cukup untuk MVP. Advanced analytics untuk fase growth.

---

## Summary

**Total Requirements:** 33
- Must Have: 25 (including PWA features)
- Should Have: 6
- Could Have: 0
- Won't Have: 3

**Priority Breakdown:**
- **Phase 1 (MVP - Week 1-2):** REQ-1.1, REQ-2.1, REQ-2.2, REQ-2.4, REQ-3.1, REQ-3.2, REQ-4.1, REQ-4.2, REQ-5.1, REQ-5.2, REQ-6.1, REQ-7.1, REQ-7.2, REQ-7.3, REQ-8.1, REQ-8.2, REQ-10.1
- **Phase 2 (PWA & Offline - Week 2-3):** REQ-4.4, REQ-10.2, REQ-10.3
- **Phase 3 (Enhancement - Week 3-4):** REQ-1.2, REQ-2.3, REQ-3.3, REQ-3.4, REQ-4.3, REQ-6.2, REQ-6.3, REQ-9.1, REQ-9.2

**Success Metrics:**
- Tim dapat survey 5-10 toko per hari
- Data entry time < 5 menit per toko
- Zero data loss dari pencatatan manual (termasuk offline)
- 100% foto terupload dengan sukses (dengan retry mechanism)
- Database 50+ toko dalam 1 bulan pertama
- 90%+ tim install PWA ke home screen
- Offline mode berfungsi 100% untuk input data
