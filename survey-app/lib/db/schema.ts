import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'

// Users table (Better Auth compatible)
export const users = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text('email').notNull().unique(),
  emailVerified: integer('email_verified', { mode: 'boolean' })
    .notNull()
    .default(false),
  name: text('name').notNull(),
  image: text('image'),
  role: text('role', { enum: ['admin', 'field_team', 'viewer'] })
    .notNull()
    .default('field_team'),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
})

// Sessions table (required by Better Auth)
export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  token: text('token').notNull().unique(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
})

// Accounts table (required by Better Auth for password storage)
export const accounts = sqliteTable('accounts', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  expiresAt: integer('expires_at', { mode: 'timestamp' }),
  password: text('password'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
})

// Verifications table (required by Better Auth)
export const verifications = sqliteTable('verifications', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
})

// Rekanan (Partner Stores) table
export const rekanan = sqliteTable('rekanan', {
  id: text('id').primaryKey(), // Format: RKN-YYYYMMDD-XXX
  namaToko: text('nama_toko').notNull(),
  namaOwner: text('nama_owner').notNull(),
  noWa: text('no_wa').notNull().unique(),
  resellerAllowed: integer('reseller_allowed', { mode: 'boolean' })
    .notNull()
    .default(false),
  fotoTokoUrl: text('foto_toko_url').notNull(),
  jamLayanan: text('jam_layanan'),
  alamat: text('alamat').notNull(),
  provinsi: text('provinsi').notNull(),
  kabKota: text('kab_kota').notNull(),
  kecamatan: text('kecamatan').notNull(),
  kelurahan: text('kelurahan').notNull(),
  latitude: real('latitude'),
  longitude: real('longitude'),
  gpsAccuracy: integer('gps_accuracy'), // in meters
  status: text('status', { enum: ['active', 'inactive', 'pending'] })
    .notNull()
    .default('active'),
  ongkirStatus: text('ongkir_status', {
    enum: ['gratis', 'berbayar', 'negosiasi'],
  })
    .notNull()
    .default('negosiasi'),
  surveyedBy: text('surveyed_by')
    .notNull()
    .references(() => users.id),
  surveyedAt: integer('surveyed_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedBy: text('updated_by').references(() => users.id),
})

// SKU (Products) table
export const sku = sqliteTable('sku', {
  id: text('id').primaryKey(), // Format: SKU-YYYYMMDD-XXX
  rekananId: text('rekanan_id')
    .notNull()
    .references(() => rekanan.id),
  namaBarang: text('nama_barang').notNull(),
  kategori: text('kategori', {
    enum: [
      'buket_wisuda',
      'hand_bouquet',
      'papan_bunga',
      'standing_flower',
      'sympathy_flower',
      'custom_arrangement',
    ],
  }).notNull(),
  type: text('type', { enum: ['fresh', 'artificial', 'mixed'] }),
  deskripsi: text('deskripsi'),
  harga: real('harga').notNull(),
  hargaReseller: real('harga_reseller').notNull(),
  diskon: real('diskon'), // 0-50
  ukuran: text('ukuran', {
    enum: ['small', 'medium', 'large', 'extra_large'],
  }),
  foto1Url: text('foto_1_url').notNull(),
  foto2Url: text('foto_2_url'),
  foto3Url: text('foto_3_url'),
  foto4Url: text('foto_4_url'),
  isDeleted: integer('is_deleted', { mode: 'boolean' })
    .notNull()
    .default(false),
  createdBy: text('created_by')
    .notNull()
    .references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedBy: text('updated_by').references(() => users.id),
})

// Activity Logs table
export const activityLogs = sqliteTable('activity_logs', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  action: text('action', {
    enum: ['create', 'update', 'delete', 'login', 'logout'],
  }).notNull(),
  entityType: text('entity_type', { enum: ['rekanan', 'sku', 'user'] }),
  entityId: text('entity_id'),
  details: text('details', { mode: 'json' }),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date()),
})

// Type exports for TypeScript
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export type Session = typeof sessions.$inferSelect
export type NewSession = typeof sessions.$inferInsert

export type Account = typeof accounts.$inferSelect
export type NewAccount = typeof accounts.$inferInsert

export type Verification = typeof verifications.$inferSelect
export type NewVerification = typeof verifications.$inferInsert

export type Rekanan = typeof rekanan.$inferSelect
export type NewRekanan = typeof rekanan.$inferInsert

export type SKU = typeof sku.$inferSelect
export type NewSKU = typeof sku.$inferInsert

export type ActivityLog = typeof activityLogs.$inferSelect
export type NewActivityLog = typeof activityLogs.$inferInsert
