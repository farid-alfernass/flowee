# Library / Utilities

This folder contains utility functions, configurations, and shared logic.

## Structure

- `auth/` - Authentication utilities
  - `client.ts` - Client-side auth helpers
  - `config.ts` - Better Auth configuration
- `db/` - Database utilities
  - `index.ts` - Database connection and client
  - `schema.ts` - Drizzle ORM schema definitions
- `storage/` - Storage utilities
  - Image upload helpers
  - Cloudinary integration
- `sync/` - Offline sync utilities
  - IndexedDB management (Dexie.js)
  - Background sync logic
  - Queue management
- `utils.ts` - General utility functions

## Guidelines

- Keep utilities pure and testable
- Export functions with clear TypeScript types
- Document complex logic with comments
- Avoid side effects in utility functions
