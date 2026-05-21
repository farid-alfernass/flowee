# ⚡ Quick Start - Flowee MVP

## 🎯 Project Overview

**Flowee** - Landing page untuk toko bunga artisan dengan tagline "Setiap Bunga, Cerita yang Mengalir"

- **Domain**: flowee.id
- **Tech**: Pure HTML/CSS/JS (no framework)
- **Deployment**: Vercel
- **Status**: ✅ Ready to deploy

## 📁 File Structure

```
flower/
├── index.html          # Landing page lengkap (830 lines)
├── vercel.json         # Vercel config
├── package.json        # Project metadata
├── README.md           # Full documentation
├── DEPLOYMENT.md       # Deployment guide
└── .gitignore          # Git ignore rules
```

## 🚀 Deploy Now (3 Steps)

```bash
# 1. Login ke Vercel
vercel login

# 2. Deploy ke production
vercel --prod

# 3. Done! URL akan muncul di terminal
```

## 📱 Features

✅ Fully responsive (mobile-first)
✅ 6 kategori produk bunga
✅ WhatsApp integration
✅ FAQ accordion
✅ Smooth animations
✅ Fast loading (no dependencies)

## 🎨 Design System

- **Colors**: Forest Green (#173901), Terracotta (#885202), Cream (#fdf9f3)
- **Fonts**: Playfair Display, DM Sans, Cormorant Garamond
- **Style**: Tropical Luxury Editorial

## 📞 Contact Integration

**WhatsApp**: +62 812-XXXX-XXXX (⚠️ Update dengan nomor real!)

Semua tombol CTA sudah terintegrasi dengan WhatsApp:
- Hero section: 2 CTA buttons
- Product cards: 6 "Tanya & Pesan" buttons
- Footer: WhatsApp CTA
- Floating button: Bottom-right corner

## 🔧 Local Development

```bash
# Serve locally
python3 -m http.server 8000

# Open browser
open http://localhost:8000
```

## ✏️ Quick Edits

### Update WhatsApp Number
Cari dan ganti di `index.html`:
```
6281200000000  →  628123456789 (nomor real)
```

### Update Pricing
Edit di section Products (line ~500-600):
```html
<p class="product-price">Mulai dari Rp 250.000</p>
```

### Update Contact Info
Edit di Footer section (line ~750-800):
```html
<span>+62 812-XXXX-XXXX</span>
<span>hello@flowee.id</span>
<span>Jl. Bunga Mawar No. 12, Jakarta Selatan</span>
```

## 📊 Sections Overview

1. **Navbar** - Sticky header dengan mobile menu
2. **Hero** - Headline + 2 CTA + decorative SVG
3. **Pills** - 4 feature badges
4. **Products** - 6 cards (3 columns)
5. **How to Order** - 3 steps
6. **Testimonials** - 5 reviews (3 columns)
7. **FAQ** - 7 questions
8. **Footer** - Brand + contact + CTA

## 🎯 Next Actions

### Before Go-Live:
- [ ] Update nomor WhatsApp dengan nomor bisnis real
- [ ] Update alamat dengan alamat studio real
- [ ] Test semua WhatsApp links di mobile
- [ ] Test responsive di berbagai device

### After Deploy:
- [ ] Setup custom domain flowee.id
- [ ] Add Google Analytics
- [ ] Prepare foto produk real
- [ ] Setup WhatsApp Business account
- [ ] Create social media content

## 📖 Full Documentation

- **README.md** - Complete project documentation
- **DEPLOYMENT.md** - Detailed deployment guide
- **Steering files** - AI assistant context (`.kiro/steering/`)

## 🆘 Need Help?

- Vercel Docs: https://vercel.com/docs
- Check DEPLOYMENT.md untuk troubleshooting
- Test locally first: `python3 -m http.server 8000`

---

**Ready to launch!** 🌸

Run: `vercel login` → `vercel --prod`
