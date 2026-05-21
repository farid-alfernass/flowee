# 🚀 Deployment Guide - Flowee MVP

## Status Persiapan

✅ **File sudah siap:**
- `index.html` - Landing page lengkap dengan branding Flowee
- `vercel.json` - Konfigurasi deployment
- `package.json` - Metadata project
- `README.md` - Dokumentasi
- `.gitignore` - File yang diabaikan

✅ **Vercel CLI sudah terinstall** (v54.1.0)

## Langkah Deployment ke Vercel

### Opsi 1: Deploy via CLI (Recommended)

1. **Login ke Vercel**
   ```bash
   vercel login
   ```
   - Pilih metode login (email, GitHub, GitLab, atau Bitbucket)
   - Ikuti instruksi di browser untuk autentikasi

2. **Deploy ke Production**
   ```bash
   vercel --prod
   ```
   - Tekan Enter untuk konfirmasi project name: `flowee`
   - Tekan Enter untuk konfirmasi directory: `./`
   - Tunggu proses deployment selesai
   - URL production akan muncul di terminal

### Opsi 2: Deploy via Vercel Dashboard (Alternatif)

1. Buka [vercel.com](https://vercel.com)
2. Login atau buat akun baru
3. Klik "Add New Project"
4. Import repository atau upload folder ini
5. Vercel akan otomatis detect static site
6. Klik "Deploy"

## Setelah Deployment

### Custom Domain Setup (flowee.id)

1. Di Vercel Dashboard, buka project "flowee"
2. Pergi ke **Settings** → **Domains**
3. Tambahkan domain: `flowee.id` dan `www.flowee.id`
4. Vercel akan memberikan DNS records:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
5. Tambahkan records tersebut di DNS provider domain Anda
6. Tunggu propagasi DNS (5-30 menit)

### Environment Variables (Opsional)

Jika nanti perlu menambahkan environment variables:
1. Pergi ke **Settings** → **Environment Variables**
2. Tambahkan variabel yang diperlukan

## Testing

Setelah deploy, test fitur-fitur berikut:

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth scroll navigation
- ✅ FAQ accordion
- ✅ WhatsApp links berfungsi
- ✅ Mobile hamburger menu
- ✅ Fade-in animations
- ✅ Floating WhatsApp button

## Update Nomor WhatsApp

**PENTING:** Sebelum go-live, ganti nomor WhatsApp placeholder:

Cari dan ganti di `index.html`:
```
+62 812-XXXX-XXXX
```

Dengan nomor WhatsApp bisnis yang sebenarnya.

## Monitoring & Analytics

Untuk tracking performa dan visitor:

1. **Vercel Analytics** (Built-in)
   - Otomatis aktif di dashboard Vercel
   - Lihat page views, performance metrics

2. **Google Analytics** (Opsional)
   - Tambahkan GA4 tracking code di `<head>` section

3. **Meta Pixel** (Opsional untuk Facebook Ads)
   - Tambahkan pixel code jika akan running ads

## Troubleshooting

### Deployment gagal
- Pastikan `index.html` valid (no syntax errors)
- Check `vercel.json` configuration
- Lihat build logs di Vercel dashboard

### Domain tidak connect
- Verify DNS records sudah benar
- Tunggu propagasi DNS (bisa sampai 48 jam)
- Check di [dnschecker.org](https://dnschecker.org)

### WhatsApp link tidak berfungsi
- Pastikan format nomor: `6281200000000` (tanpa +, -, atau spasi)
- Test di mobile device

## Next Steps

Setelah MVP live:

1. ✅ Update nomor WhatsApp dengan nomor bisnis real
2. ✅ Setup custom domain flowee.id
3. ✅ Test semua fitur di berbagai device
4. ✅ Setup Google Analytics untuk tracking
5. ✅ Prepare konten media sosial untuk promosi
6. ✅ Setup WhatsApp Business account
7. ✅ Prepare katalog produk dengan foto real

## Support

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Project GitHub: (jika ada)

---

**Ready to deploy!** 🚀

Jalankan: `vercel login` kemudian `vercel --prod`
