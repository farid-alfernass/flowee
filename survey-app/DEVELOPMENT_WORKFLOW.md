# Development Workflow - Flowee Survey App

## 📋 Implementation Roadmap

### Phase 1: Core MVP (Week 1-2) - 104 hours

#### Epic 1: Project Setup ✅ (Partially Done)

- [x] 1.1 Initialize Next.js Project
- [ ] 1.2 Install Core Dependencies
- [ ] 1.3 Setup Database Schema
- [ ] 1.4 Configure Database Connection
- [ ] 1.5 Setup Environment Configuration

#### Epic 2: Authentication (14 hours)

- [ ] 2.1 Setup Better Auth (3h)
- [ ] 2.2 Create Login Page (4h)
- [ ] 2.3 Implement Authentication Middleware (3h)
- [ ] 2.4 Create User Seed Data (1h)
- [ ] 2.5 Implement Role-Based Access Control (3h) - Optional

#### Epic 3: Rekanan Management (28 hours)

- [ ] 3.1 Create Rekanan List Page (4h)
- [ ] 3.2 Implement Search and Filter (4h)
- [ ] 3.3 Create Add Rekanan Form (5h)
- [ ] 3.4 Implement GPS Location Capture (3h)
- [ ] 3.5 Create Rekanan API Endpoints (5h)
- [ ] 3.6 Create Rekanan Detail Page (4h)
- [ ] 3.7 Create Edit Rekanan Form (3h)

#### Epic 4: Product Management (18 hours)

- [ ] 4.1 Create Add Product Form (5h)
- [ ] 4.2 Create Product API Endpoints (4h)
- [ ] 4.3 Create Product List View (4h)
- [ ] 4.4 Create Edit Product Form (3h)
- [ ] 4.5 Implement Product Delete (2h) - Optional

#### Epic 5: Image Management (14 hours)

- [ ] 5.1 Setup Cloudinary Integration (2h)
- [ ] 5.2 Create Image Upload Component (5h)
- [ ] 5.3 Create Image Upload API (3h)
- [ ] 5.4 Implement Image Display Optimization (4h)

#### Epic 6: Dashboard (19 hours)

- [ ] 6.1 Create Dashboard Layout (4h)
- [ ] 6.2 Create Dashboard Metrics (3h)
- [ ] 6.3 Create Dashboard Charts (4h)
- [ ] 6.4 Create Recent Activity Feed (2h)
- [ ] 6.5 Create Dashboard API (3h)
- [ ] 6.6 Implement Data Export (3h) - Optional

**Checkpoint 1:** Core features working, can add rekanan and products

---

### Phase 2: PWA & Offline (Week 3) - 41 hours

#### Epic 7: PWA & Offline Support (41 hours)

- [ ] 7.1 Configure PWA Manifest (3h)
- [ ] 7.2 Setup Service Worker (4h)
- [ ] 7.3 Setup IndexedDB Schema (4h)
- [ ] 7.4 Implement Offline Data Persistence (6h)
- [ ] 7.5 Implement Background Sync (5h)
- [ ] 7.6 Create Offline Status Indicator (3h)
- [ ] 7.7 Implement Offline-First Form Submission (4h)
- [ ] 7.8 Create PWA Install Prompt (3h)
- [ ] 7.9 Implement Sync Priority Logic (4h)
- [ ] 7.10 Test Offline Functionality (5h)

**Checkpoint 2:** PWA installable, offline mode working

---

### Phase 3: Polish & Launch (Week 4-5) - 62 hours

#### Epic 8: Mobile Optimization (14 hours)

- [ ] 8.1 Implement Mobile-First Responsive Design (4h)
- [ ] 8.2 Implement Camera Integration (3h)
- [ ] 8.3 Optimize Mobile Performance (4h)
- [ ] 8.4 Add Touch Gestures (3h)

#### Epic 9: Admin Panel (12 hours) - Optional

- [ ] 9.1 Create User Management Page (5h)
- [ ] 9.2 Create Activity Log Viewer (4h)
- [ ] 9.3 Create User Management API (3h)

#### Epic 10: Testing & QA (23 hours)

- [ ] 10.1 Write Unit Tests (4h)
- [ ] 10.2 Write Integration Tests (5h)
- [ ] 10.3 Write E2E Tests (5h)
- [ ] 10.4 Manual Testing & Bug Fixes (6h)
- [ ] 10.5 Security Audit (3h)

#### Epic 11: Deployment (13 hours)

- [ ] 11.1 Setup Vercel Deployment (2h)
- [ ] 11.2 Setup Production Database (2h)
- [ ] 11.3 Configure Cloudinary for Production (1h)
- [ ] 11.4 Performance Optimization (3h)
- [ ] 11.5 Create Documentation (3h)
- [ ] 11.6 Launch Preparation (2h)

**Checkpoint 3:** Production ready, team trained

---

## 🔄 Daily Development Workflow

### Morning Routine

```bash
# 1. Pull latest changes
git pull origin main

# 2. Install any new dependencies
npm install

# 3. Run database migrations
npx drizzle-kit migrate

# 4. Start dev server
npm run dev

# 5. Open in browser
open http://localhost:3000
```

### During Development

```bash
# Run type checking (in separate terminal)
npm run type-check -- --watch

# Run linter
npm run lint

# Format code
npm run format
```

### Before Committing

```bash
# 1. Run linter and fix issues
npm run lint:fix

# 2. Format code
npm run format

# 3. Type check
npm run type-check

# 4. Run tests
npm test

# 5. Build to check for errors
npm run build

# 6. Commit
git add .
git commit -m "feat: your feature description"
git push origin your-branch
```

---

## 🎯 Task Execution Strategy

### Option 1: Sequential (Recommended for Solo Developer)

Execute tasks in order, one epic at a time:

1. Complete Epic 1 (Project Setup)
2. Complete Epic 2 (Authentication)
3. Complete Epic 3 (Rekanan Management)
4. ... and so on

**Pros:** Clear progress, easier to debug  
**Cons:** Slower overall

### Option 2: Parallel (For Team of 2+)

Split work by epic:

- **Developer 1:** Epic 2 (Auth) + Epic 3 (Rekanan)
- **Developer 2:** Epic 4 (Products) + Epic 5 (Images)

**Pros:** Faster completion  
**Cons:** Requires coordination, potential merge conflicts

### Option 3: Feature-First (Agile)

Build vertical slices:

1. **Slice 1:** Auth + Basic Rekanan CRUD (no images)
2. **Slice 2:** Add images + GPS
3. **Slice 3:** Products + Dashboard
4. **Slice 4:** PWA + Offline

**Pros:** Working features early, easier to demo  
**Cons:** More refactoring

---

## 📝 Git Workflow

### Branch Strategy

```bash
main                    # Production-ready code
├── develop             # Integration branch
    ├── feature/auth    # Feature branches
    ├── feature/rekanan
    ├── feature/pwa
    └── fix/bug-name    # Bug fix branches
```

### Commit Convention

```bash
# Format: <type>(<scope>): <subject>

# Types:
feat:     # New feature
fix:      # Bug fix
docs:     # Documentation
style:    # Formatting, missing semicolons, etc.
refactor: # Code restructuring
test:     # Adding tests
chore:    # Maintenance

# Examples:
git commit -m "feat(auth): implement login page"
git commit -m "fix(rekanan): resolve GPS permission issue"
git commit -m "docs(setup): add installation guide"
```

---

## 🧪 Testing Strategy

### Unit Tests (80% coverage target)

```bash
# Run all unit tests
npm test

# Run specific test file
npm test -- auth.test.ts

# Run with coverage
npm test -- --coverage
```

**What to test:**

- Validation functions (Zod schemas)
- Utility functions (ID generation, formatting)
- Business logic (price validation, discount calculation)

### Integration Tests

```bash
# Run integration tests
npm test:integration
```

**What to test:**

- API endpoints with mocked database
- Authentication flow
- File upload flow

### E2E Tests

```bash
# Run E2E tests
npm run test:e2e

# Run in UI mode
npm run test:e2e:ui
```

**What to test:**

- Login → Add Rekanan → Add Product → View Dashboard
- Image upload and display
- Search and filter functionality

---

## 🚀 Deployment Checklist

### Pre-Deployment

- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Build successful (`npm run build`)
- [ ] Environment variables configured in Vercel
- [ ] Database migrations run on production
- [ ] Cloudinary configured for production

### Deployment Steps

```bash
# 1. Push to main branch
git push origin main

# 2. Vercel auto-deploys

# 3. Verify deployment
open https://flowee-survey.vercel.app

# 4. Run smoke tests
# - Login works
# - Can add rekanan
# - Can add product
# - Images upload
# - PWA installs
```

### Post-Deployment

- [ ] Monitor error logs (Vercel dashboard)
- [ ] Check performance metrics
- [ ] Test on real mobile devices
- [ ] Train field team
- [ ] Collect feedback

---

## 📊 Progress Tracking

### Current Status

```
Phase 1: Core MVP
├── Epic 1: Project Setup        [▓▓▓▓▓░░░░░] 50% (Paused - Node.js upgrade)
├── Epic 2: Authentication       [░░░░░░░░░░]  0%
├── Epic 3: Rekanan Management   [░░░░░░░░░░]  0%
├── Epic 4: Product Management   [░░░░░░░░░░]  0%
├── Epic 5: Image Management     [░░░░░░░░░░]  0%
└── Epic 6: Dashboard            [░░░░░░░░░░]  0%

Phase 2: PWA & Offline
└── Epic 7: PWA & Offline        [░░░░░░░░░░]  0%

Phase 3: Polish & Launch
├── Epic 8: Mobile Optimization  [░░░░░░░░░░]  0%
├── Epic 9: Admin Panel          [░░░░░░░░░░]  0%
├── Epic 10: Testing & QA        [░░░░░░░░░░]  0%
└── Epic 11: Deployment          [░░░░░░░░░░]  0%

Overall Progress: [▓░░░░░░░░░] 5%
```

### Update Progress

After completing each task, update this file:

```bash
# Mark task as done
- [x] 2.1 Setup Better Auth (3h)

# Update progress bar
Epic 2: Authentication [▓▓░░░░░░░░] 20%
```

---

## 🆘 Common Issues & Solutions

### Issue: "Cannot find module"

```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue: Database locked

```bash
# Solution: Close all connections
pkill -f "node"
rm dev.db-journal
```

### Issue: Port already in use

```bash
# Solution: Kill process or use different port
lsof -ti:3000 | xargs kill -9
# or
npm run dev -- -p 3001
```

### Issue: TypeScript errors after update

```bash
# Solution: Regenerate types
rm -rf .next
npm run build
```

---

## 📚 Resources

### Documentation

- Next.js: https://nextjs.org/docs
- Drizzle ORM: https://orm.drizzle.team/docs
- Better Auth: https://better-auth.com/docs
- Dexie.js: https://dexie.org/docs
- shadcn/ui: https://ui.shadcn.com/docs

### Tools

- Drizzle Studio: `npx drizzle-kit studio`
- Vercel Dashboard: https://vercel.com/dashboard
- Cloudinary Console: https://cloudinary.com/console

---

**Next Action:** Upgrade Node.js to v20+, then resume with Task 1.2
