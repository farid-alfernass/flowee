# ✅ Pre-Launch Checklist - Flowee MVP

## 🔴 CRITICAL (Must Do Before Launch)

### Contact Information
- [ ] **Update nomor WhatsApp** dari `+62 812-XXXX-XXXX` ke nomor bisnis real
  - Lokasi: 9 tempat di `index.html`
  - Format: `628123456789` (tanpa +, -, spasi)
  - Test link: `https://wa.me/628123456789`

- [ ] **Update email** dari `hello@flowee.id` ke email aktif
  - Atau setup email forwarding untuk hello@flowee.id

- [ ] **Update alamat** dari placeholder ke alamat studio real
  - Current: "Jl. Bunga Mawar No. 12, Jakarta Selatan"

### Testing
- [ ] Test di **Chrome** (desktop & mobile)
- [ ] Test di **Safari** (desktop & mobile)
- [ ] Test di **Firefox**
- [ ] Test semua **WhatsApp links** di mobile device
- [ ] Test **FAQ accordion** berfungsi
- [ ] Test **mobile hamburger menu**
- [ ] Test **smooth scroll** navigation
- [ ] Test **floating WhatsApp button**

### Content Review
- [ ] Review semua **typo** dan grammar
- [ ] Pastikan **pricing** sudah sesuai
- [ ] Review **product names** dan descriptions
- [ ] Review **testimonials** (gunakan real atau anonymize)

## 🟡 IMPORTANT (Should Do)

### SEO & Meta Tags
- [ ] Add meta description
  ```html
  <meta name="description" content="Flowee - Toko bunga artisan dengan rangkaian segar dan elegan untuk setiap momen spesial. Pesan sekarang, kirim hari ini!">
  ```

- [ ] Add Open Graph tags untuk social sharing
  ```html
  <meta property="og:title" content="Flowee - Karangan Bunga Artisan">
  <meta property="og:description" content="Setiap Bunga, Cerita yang Mengalir">
  <meta property="og:image" content="https://flowee.id/og-image.jpg">
  <meta property="og:url" content="https://flowee.id">
  ```

- [ ] Add favicon
  ```html
  <link rel="icon" type="image/png" href="/favicon.png">
  ```

### Analytics
- [ ] Setup **Google Analytics 4**
- [ ] Setup **Meta Pixel** (jika akan running Facebook/Instagram ads)
- [ ] Enable **Vercel Analytics** (otomatis di dashboard)

### Domain
- [ ] Beli domain **flowee.id**
- [ ] Setup DNS records di Vercel
- [ ] Test domain sudah pointing dengan benar
- [ ] Setup SSL certificate (otomatis di Vercel)

### WhatsApp Business
- [ ] Setup **WhatsApp Business account**
- [ ] Create business profile dengan:
  - Logo Flowee
  - Deskripsi bisnis
  - Jam operasional
  - Alamat
  - Website link
- [ ] Setup **auto-reply messages**
- [ ] Setup **quick replies** untuk pertanyaan umum

## 🟢 NICE TO HAVE (Optional)

### Content Enhancement
- [ ] Replace emoji placeholders dengan **foto produk real**
- [ ] Add **logo Flowee** (replace 🌸 emoji)
- [ ] Create **hero image** atau illustration
- [ ] Add **video testimonial** (jika ada)

### Features
- [ ] Add **Instagram feed** integration
- [ ] Add **live chat widget** (Tawk.to, Crisp, dll)
- [ ] Add **loading animation**
- [ ] Add **cookie consent banner** (jika diperlukan)

### Marketing
- [ ] Create **Instagram account** @flowee.id
- [ ] Create **Facebook page**
- [ ] Prepare **launch post** untuk social media
- [ ] Create **Google My Business** listing
- [ ] Setup **email marketing** (Mailchimp, dll)

### Performance
- [ ] Optimize images (jika ada foto real)
- [ ] Add **lazy loading** untuk images
- [ ] Test **Lighthouse score** (aim for 90+)
- [ ] Test **page speed** di PageSpeed Insights

## 📋 Deployment Checklist

- [ ] Run `vercel login`
- [ ] Run `vercel --prod`
- [ ] Verify deployment URL works
- [ ] Test all features di production URL
- [ ] Setup custom domain flowee.id
- [ ] Test custom domain works
- [ ] Check SSL certificate active (https://)

## 🎯 Post-Launch Checklist

### Week 1
- [ ] Monitor **Vercel Analytics** untuk traffic
- [ ] Check **WhatsApp messages** dan response time
- [ ] Collect **customer feedback**
- [ ] Fix any **bugs** yang ditemukan
- [ ] Update **product photos** jika belum

### Week 2-4
- [ ] Analyze **conversion rate** (visitors → orders)
- [ ] A/B test **CTA buttons** wording
- [ ] Add **new testimonials** dari customer real
- [ ] Update **FAQ** berdasarkan pertanyaan yang sering muncul
- [ ] Consider adding **blog section** untuk SEO

## 🚨 Emergency Contacts

- **Vercel Support**: https://vercel.com/support
- **Domain Provider**: (catat contact support)
- **WhatsApp Business Support**: https://business.whatsapp.com/support

## 📊 Success Metrics to Track

- **Traffic**: Unique visitors per day/week
- **Conversion**: % visitors yang klik WhatsApp
- **Response Time**: Berapa cepat reply WhatsApp
- **Order Rate**: Berapa order per week
- **Customer Satisfaction**: Rating dari customers

---

## ✅ Ready to Launch?

Pastikan semua item **CRITICAL** sudah di-check!

**Deploy command:**
```bash
vercel login
vercel --prod
```

**Good luck! 🌸🚀**
