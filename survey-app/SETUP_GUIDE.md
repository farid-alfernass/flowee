# Flowee Survey App - Setup Guide

## ⚠️ Prerequisites

### 1. Upgrade Node.js (REQUIRED)

**Current Version:** v16.20.2  
**Required Version:** >= v20.9.0

#### Option A: Using NVM (Recommended)

```bash
# Install nvm if not installed
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal, then:
nvm install 20
nvm use 20
nvm alias default 20

# Verify
node -v  # Should show v20.x.x
npm -v   # Should show v10.x.x
```

#### Option B: Direct Download

1. Download Node.js v20 LTS from: https://nodejs.org/
2. Install the package
3. Restart terminal
4. Verify: `node -v`

---

## 🚀 Quick Start (After Node.js Upgrade)

### 1. Navigate to Project

```bash
cd /Users/faridtriwicaksono/Documents/Self-Employeee/flower/survey-app
```

### 2. Verify Installation

```bash
# Check if dependencies installed
ls node_modules

# If empty or missing, reinstall:
rm -rf node_modules package-lock.json
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

## 📦 Next Steps: Install Additional Dependencies

After verifying the basic setup works, install the required dependencies for the Survey App:

### Core Dependencies

```bash
# PWA Support
npm install next-pwa

# IndexedDB (Offline Storage)
npm install dexie

# Form Management
npm install react-hook-form zod @hookform/resolvers

# UI Components (shadcn/ui)
npx shadcn@latest init

# Database (Drizzle ORM + SQLite)
npm install drizzle-orm better-sqlite3
npm install -D drizzle-kit @types/better-sqlite3

# Authentication (Better Auth)
npm install better-auth

# Image Upload (Cloudinary)
npm install cloudinary

# Date Utilities
npm install date-fns

# Icons
npm install lucide-react
```

### Development Dependencies

```bash
# Prettier (Code Formatting)
npm install -D prettier prettier-plugin-tailwindcss

# Additional TypeScript Types
npm install -D @types/node
```

---

## 🏗️ Project Structure Setup

After installing dependencies, create the following folder structure:

```
survey-app/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── rekanan/
│   │   ├── produk/
│   │   └── admin/
│   ├── api/
│   │   ├── auth/
│   │   ├── rekanan/
│   │   ├── sku/
│   │   ├── upload/
│   │   └── dashboard/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── forms/
│   ├── layout/
│   ├── dashboard/
│   ├── rekanan/
│   └── sku/
├── lib/
│   ├── db/              # Database schema & client
│   ├── auth/            # Authentication config
│   ├── storage/         # IndexedDB & offline storage
│   ├── sync/            # Background sync logic
│   └── utils.ts
├── types/
│   └── index.ts
├── public/
│   ├── icons/           # PWA icons
│   ├── manifest.json
│   └── sw.js            # Service Worker
├── drizzle/
│   └── migrations/
├── .env.local
├── drizzle.config.ts
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🔧 Configuration Files

### 1. Environment Variables

Create `.env.local`:

```env
# Database
DATABASE_URL=file:./dev.db

# Authentication
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Next.js Config (next.config.js)

```javascript
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
}

module.exports = withPWA(nextConfig)
```

### 3. Drizzle Config (drizzle.config.ts)

```typescript
import type { Config } from 'drizzle-kit'

export default {
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'file:./dev.db',
  },
} satisfies Config
```

### 4. Prettier Config (.prettierrc)

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

---

## ✅ Verification Checklist

After Node.js upgrade and setup:

- [ ] Node.js version >= 20.9.0 (`node -v`)
- [ ] npm version >= 10.x (`npm -v`)
- [ ] Dependencies installed (`npm install` successful)
- [ ] Dev server runs (`npm run dev` works)
- [ ] No console errors in browser
- [ ] Can access http://localhost:3000

---

## 🐛 Troubleshooting

### Issue: "Module not found" errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json .next
npm install
```

### Issue: Port 3000 already in use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Issue: TypeScript errors

```bash
# Regenerate types
npm run build
```

### Issue: ESLint errors

```bash
# Fix auto-fixable issues
npm run lint -- --fix
```

---

## 📚 Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues

# Database
npx drizzle-kit generate # Generate migrations
npx drizzle-kit migrate  # Run migrations
npx drizzle-kit studio   # Open Drizzle Studio

# Type checking
npm run type-check       # Check TypeScript types
```

---

## 🎯 Next Steps After Setup

Once everything is working:

1. ✅ **Task 1.1-1.5:** Project setup (DONE)
2. 🔄 **Task 2.1-2.4:** Authentication system
3. 🔄 **Task 3.1-3.7:** Rekanan management
4. 🔄 **Task 4.1-4.5:** Product management
5. 🔄 **Task 5.1-5.4:** Image upload
6. 🔄 **Task 6.1-6.6:** Dashboard
7. 🔄 **Task 7.1-7.10:** PWA & Offline
8. 🔄 **Task 8.1-8.4:** Mobile optimization
9. 🔄 **Task 9.1-9.3:** Admin panel
10. 🔄 **Task 10.1-10.5:** Testing
11. 🔄 **Task 11.1-11.6:** Deployment

---

## 📞 Support

If you encounter issues:

1. Check Node.js version: `node -v`
2. Check npm version: `npm -v`
3. Clear cache: `rm -rf node_modules .next`
4. Reinstall: `npm install`
5. Check logs in terminal

---

**Status:** ⏸️ Paused - Waiting for Node.js upgrade

**Resume:** After upgrading Node.js, run `npm run dev` and continue with Task 2.1 (Authentication)
