# Flowee Survey App

**Internal web application for field team to survey and onboard florist partners**

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![PWA](https://img.shields.io/badge/PWA-Enabled-purple)](https://web.dev/progressive-web-apps/)
[![Offline](https://img.shields.io/badge/Offline-First-green)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_work_offline)

---

## 📋 Overview

Flowee Survey App adalah aplikasi web internal untuk tim lapangan Flowee dalam merekrut dan mendata toko bunga rekanan. Aplikasi ini menggantikan proses manual berbasis kertas dengan sistem digital yang mobile-first, cepat, dan terstruktur.

### Key Features

✅ **Mobile-First Design** - Optimized untuk smartphone  
✅ **PWA (Progressive Web App)** - Install seperti native app  
✅ **Offline-First** - Berfungsi tanpa internet, sync otomatis  
✅ **Camera Integration** - Foto langsung dari kamera HP  
✅ **GPS Location** - Auto-capture koordinat lokasi toko  
✅ **Background Sync** - Upload otomatis saat online  
✅ **Zero Data Loss** - Data tidak hilang meskipun offline

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 20.9.0 ([Download](https://nodejs.org/))
- **npm** >= 10.x
- **Git**

### Installation

```bash
# 1. Navigate to project
cd survey-app

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# 4. Run database migrations
npx drizzle-kit migrate

# 5. Seed initial data
npm run db:seed

# 6. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**⚠️ Important:** If you see Node.js version errors, please read [SETUP_GUIDE.md](./SETUP_GUIDE.md) first.

---

## 🏗️ Tech Stack

### Core

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** SQLite (Turso for production)
- **ORM:** Drizzle ORM

### Features

- **Authentication:** Better Auth
- **PWA:** next-pwa
- **Offline Storage:** IndexedDB (Dexie.js)
- **Image Storage:** Cloudinary
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React

### Deployment

- **Hosting:** Vercel
- **Database:** Turso (SQLite in the cloud)
- **CDN:** Cloudinary

---

## 📁 Project Structure

```
survey-app/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Main app pages
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── lib/                   # Utilities & configs
│   ├── db/               # Database schema
│   ├── auth/             # Auth config
│   ├── storage/          # IndexedDB
│   └── sync/             # Background sync
├── types/                 # TypeScript types
├── public/               # Static assets
│   ├── icons/           # PWA icons
│   └── manifest.json    # PWA manifest
└── drizzle/              # Database migrations
```

---

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Check TypeScript types
npm test             # Run tests
npm run db:generate  # Generate database migrations
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Drizzle Studio
```

### Environment Variables

Create `.env.local` file:

```env
# Database
DATABASE_URL=file:./dev.db

# Authentication
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 📱 PWA Features

### Install to Home Screen

**iOS:**

1. Open in Safari
2. Tap Share button
3. Tap "Add to Home Screen"

**Android:**

1. Open in Chrome
2. Tap menu (⋮)
3. Tap "Install app"

### Offline Mode

- ✅ Form submission works offline
- ✅ Photos stored temporarily (base64)
- ✅ Auto-sync when connection restored
- ✅ Background sync (even if app closed)
- ✅ Retry with exponential backoff

---

## 🧪 Testing

### Unit Tests

```bash
npm test                    # Run all tests
npm test -- auth.test.ts   # Run specific test
npm test -- --coverage     # With coverage
```

### Integration Tests

```bash
npm run test:integration
```

### E2E Tests

```bash
npm run test:e2e           # Run E2E tests
npm run test:e2e:ui        # Run in UI mode
```

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Deploy to production
vercel --prod
```

### Environment Variables (Production)

Configure in Vercel dashboard:

- `DATABASE_URL` - Turso database URL
- `BETTER_AUTH_SECRET` - Production secret
- `BETTER_AUTH_URL` - Production URL
- `CLOUDINARY_*` - Cloudinary credentials

---

## 📊 Implementation Progress

**Current Status:** 🟡 In Development

- [x] Project Setup (50%)
- [ ] Authentication (0%)
- [ ] Rekanan Management (0%)
- [ ] Product Management (0%)
- [ ] Image Upload (0%)
- [ ] Dashboard (0%)
- [ ] PWA & Offline (0%)
- [ ] Mobile Optimization (0%)
- [ ] Testing (0%)
- [ ] Deployment (0%)

**Overall:** 5% Complete

See [DEVELOPMENT_WORKFLOW.md](./DEVELOPMENT_WORKFLOW.md) for detailed roadmap.

---

## 📚 Documentation

- [Setup Guide](./SETUP_GUIDE.md) - Installation & configuration
- [Development Workflow](./DEVELOPMENT_WORKFLOW.md) - Development process
- [Requirements](../.kiro/specs/flowee-survey-app/requirements.md) - Feature requirements
- [Design Document](../.kiro/specs/flowee-survey-app/design.md) - Technical design
- [Tasks](../.kiro/specs/flowee-survey-app/tasks.md) - Implementation tasks

---

## 🤝 Contributing

This is an internal project for Flowee team. For questions or issues:

1. Check [SETUP_GUIDE.md](./SETUP_GUIDE.md)
2. Check [DEVELOPMENT_WORKFLOW.md](./DEVELOPMENT_WORKFLOW.md)
3. Contact tech lead

---

## 📄 License

Internal use only - Flowee.id © 2026

---

## 🆘 Support

### Common Issues

**Node.js version error:**

- Upgrade to Node.js >= 20.9.0
- See [SETUP_GUIDE.md](./SETUP_GUIDE.md)

**Port 3000 in use:**

```bash
lsof -ti:3000 | xargs kill -9
```

**Module not found:**

```bash
rm -rf node_modules package-lock.json
npm install
```

**Database locked:**

```bash
rm dev.db-journal
```

### Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team/docs)
- [Better Auth Docs](https://better-auth.com/docs)
- [Dexie.js Docs](https://dexie.org/docs)

---

**Status:** ⏸️ Paused - Waiting for Node.js upgrade to v20+

**Next Step:** Upgrade Node.js, then run `npm run dev`
