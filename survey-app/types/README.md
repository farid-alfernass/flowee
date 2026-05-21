# TypeScript Types

This folder contains shared TypeScript type definitions and interfaces.

## Structure

Types should be organized by domain:

- `rekanan.ts` - Partner store types
- `sku.ts` - Product (SKU) types
- `user.ts` - User and authentication types
- `api.ts` - API request/response types
- `database.ts` - Database schema types (inferred from Drizzle)
- `forms.ts` - Form validation types (Zod schemas)
- `offline.ts` - Offline sync and IndexedDB types

## Guidelines

- Use interfaces for object shapes
- Use types for unions, intersections, and utilities
- Export all types for reuse across the app
- Keep types close to their usage when possible
- Use Zod for runtime validation and type inference
