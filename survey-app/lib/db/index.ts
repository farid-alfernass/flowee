import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import * as schema from './schema'

const sqlite = new Database(process.env['DATABASE_URL'] || 'dev.db')
export const db = drizzle(sqlite, { schema })

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
  // Format: +62xxx (10-13 digits)
  const regex = /^\+62[0-9]{9,12}$/
  return regex.test(number)
}

export function validatePrices(harga: number, hargaReseller: number): boolean {
  return hargaReseller < harga && harga > 0 && hargaReseller > 0
}

export function validateDiscount(diskon: number): boolean {
  return diskon >= 0 && diskon <= 50
}
