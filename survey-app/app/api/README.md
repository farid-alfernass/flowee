# API Routes

This folder contains all API endpoints for the Flowee Survey App.

## Structure

- `auth/` - Authentication endpoints (login, logout, session)
- `rekanan/` - Partner store CRUD endpoints
- `sku/` - Product (SKU) CRUD endpoints
- `upload/` - Image upload endpoints (Cloudinary integration)
- `dashboard/` - Dashboard metrics and statistics endpoints

## API Design

All endpoints follow RESTful conventions:

- GET - Retrieve data
- POST - Create new resource
- PATCH - Update existing resource
- DELETE - Delete resource (soft delete)

## Authentication

All API routes (except auth endpoints) require authentication via JWT token in HTTP-only cookies.
