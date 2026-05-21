import * as schema from './schema'

// Support both local SQLite (dev) and Turso/libsql (production)
// DATABASE_URL=file:./dev.db  → local SQLite via better-sqlite3
// DATABASE_URL=libsql://...   → Turso via @libsql/client

function createDb() {
  const url = process.env['DATABASE_URL'] || 'file:./dev.db'

  if (url.startsWith('libsql://') || url.startsWith('https://')) {
    // Production: Turso
    const { drizzle } = require('drizzle-orm/libsql')
    const { createClient } = require('@libsql/client')
    const client = createClient({
      url,
      authToken: process.env['DATABASE_AUTH_TOKEN'],
    })
    return drizzle(client, { schema })
  } else {
    // Development: local SQLite
    const { drizzle } = require('drizzle-orm/better-sqlite3')
    const Database = require('better-sqlite3')
    // Strip "file:" prefix if present
    const filePath = url.replace(/^file:/, '')
    const sqlite = new Database(filePath)
    return drizzle(sqlite, { schema })
  }
}

export const db = createDb()

// Helper function to generate unique IDs
export function generateRekananId(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0')
  return `RKN-${year}${month}${day}-${random}`
}

export function generateSKUId(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0')
  return `SKU-${year}${month}${day}-${random}`
}

// Validation helpers
export function validateWhatsAppNumber(number: string): boolean {
  const regex = /^\+62[0-9]{9,12}$/
  return regex.test(number)
}

export function validatePrices(harga: number, hargaReseller: number): boolean {
  return hargaReseller < harga && harga > 0 && hargaReseller > 0
}

export function validateDiscount(diskon: number): boolean {
  return diskon >= 0 && diskon <= 50
}
