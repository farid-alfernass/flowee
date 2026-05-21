import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import path from 'path'

const dbPath = process.env['DATABASE_URL'] || 'dev.db'
const sqlite = new Database(dbPath)
const db = drizzle(sqlite)

console.log(`Running migrations on: ${dbPath}`)

migrate(db, { migrationsFolder: path.join(process.cwd(), 'drizzle') })

console.log('✅ Migrations complete')
sqlite.close()
