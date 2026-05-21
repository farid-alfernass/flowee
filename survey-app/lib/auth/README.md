# Better Auth Setup

This directory contains the Better Auth configuration for the Flowee Survey App.

## Overview

Better Auth is configured with:
- **Email/Password authentication** (no email verification for internal app)
- **7-day session expiry** with automatic refresh
- **SQLite database** via Drizzle ORM adapter
- **HTTP-only cookies** for secure session management

## Files

- `config.ts` - Server-side Better Auth configuration
- `client.ts` - Client-side auth hooks and utilities

## Database Tables

Better Auth uses the following tables:
- `users` - User accounts with email, name, role, and status
- `sessions` - Active user sessions
- `accounts` - Authentication provider data (passwords stored here)
- `verifications` - Email verification tokens (not used in this app)

## Environment Variables

Required environment variables (see `.env.local`):

```bash
BETTER_AUTH_SECRET=your-secret-key-change-this-in-production
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Usage

### Server-side

```typescript
import { auth } from '@/lib/auth/config'

// In API routes or Server Components
const session = await auth.api.getSession({ headers: request.headers })
```

### Client-side

```typescript
'use client'
import { signIn, signOut, useSession } from '@/lib/auth/client'

// In Client Components
const { data: session, isPending } = useSession()

// Sign in
await signIn.email({
  email: 'user@example.com',
  password: 'password123',
})

// Sign out
await signOut()
```

## API Endpoints

Better Auth automatically creates these endpoints:
- `POST /api/auth/sign-in/email` - Email/password sign in
- `POST /api/auth/sign-out` - Sign out
- `GET /api/auth/session` - Get current session
- And more...

## Security Features

- Passwords are hashed using bcrypt
- Sessions use HTTP-only cookies (not accessible via JavaScript)
- CSRF protection enabled
- 7-day session expiry with automatic refresh

## Role-Based Access Control

Users have one of three roles:
- `admin` - Full access to all features
- `field_team` - Can create/edit stores and products
- `viewer` - Read-only access

The role is stored in the `users` table and can be checked in middleware or API routes.

## Next Steps

1. Create login page UI
2. Implement authentication middleware
3. Add role-based authorization checks
4. Create user seed data for testing
