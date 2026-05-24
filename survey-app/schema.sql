CREATE TABLE IF NOT EXISTS `users` (
  `id` text PRIMARY KEY NOT NULL,
  `email` text NOT NULL,
  `email_verified` integer NOT NULL DEFAULT 0,
  `name` text NOT NULL,
  `image` text,
  `role` text NOT NULL DEFAULT 'field_team',
  `is_active` integer NOT NULL DEFAULT 1,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS `users_email_unique` ON `users` (`email`);

CREATE TABLE IF NOT EXISTS `sessions` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
  `token` text NOT NULL,
  `expires_at` integer NOT NULL,
  `ip_address` text,
  `user_agent` text,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS `sessions_token_unique` ON `sessions` (`token`);

CREATE TABLE IF NOT EXISTS `accounts` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL REFERENCES `users`(`id`) ON DELETE CASCADE,
  `account_id` text NOT NULL,
  `provider_id` text NOT NULL,
  `access_token` text,
  `refresh_token` text,
  `id_token` text,
  `expires_at` integer,
  `password` text,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL
);

CREATE TABLE IF NOT EXISTS `verifications` (
  `id` text PRIMARY KEY NOT NULL,
  `identifier` text NOT NULL,
  `value` text NOT NULL,
  `expires_at` integer NOT NULL,
  `created_at` integer NOT NULL
);

CREATE TABLE IF NOT EXISTS `rekanan` (
  `id` text PRIMARY KEY NOT NULL,
  `nama_toko` text NOT NULL,
  `nama_owner` text NOT NULL,
  `no_wa` text NOT NULL,
  `reseller_allowed` integer NOT NULL DEFAULT 0,
  `foto_toko_url` text NOT NULL,
  `jam_layanan` text,
  `alamat` text NOT NULL,
  `provinsi` text NOT NULL,
  `kab_kota` text NOT NULL,
  `kecamatan` text NOT NULL,
  `kelurahan` text NOT NULL,
  `latitude` real,
  `longitude` real,
  `gps_accuracy` integer,
  `status` text NOT NULL DEFAULT 'active',
  `ongkir_status` text NOT NULL DEFAULT 'negosiasi',
  `surveyed_by` text NOT NULL REFERENCES `users`(`id`),
  `surveyed_at` integer NOT NULL,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL,
  `updated_by` text REFERENCES `users`(`id`)
);

CREATE UNIQUE INDEX IF NOT EXISTS `rekanan_no_wa_unique` ON `rekanan` (`no_wa`);

CREATE TABLE IF NOT EXISTS `sku` (
  `id` text PRIMARY KEY NOT NULL,
  `rekanan_id` text NOT NULL REFERENCES `rekanan`(`id`),
  `nama_barang` text NOT NULL,
  `kategori` text NOT NULL,
  `type` text,
  `deskripsi` text,
  `harga` real NOT NULL,
  `harga_reseller` real NOT NULL,
  `diskon` real,
  `ukuran` text,
  `foto_1_url` text NOT NULL,
  `foto_2_url` text,
  `foto_3_url` text,
  `foto_4_url` text,
  `is_deleted` integer NOT NULL DEFAULT 0,
  `created_by` text NOT NULL REFERENCES `users`(`id`),
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL,
  `updated_by` text REFERENCES `users`(`id`)
);

CREATE TABLE IF NOT EXISTS `activity_logs` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL REFERENCES `users`(`id`),
  `action` text NOT NULL,
  `entity_type` text,
  `entity_id` text,
  `details` text,
  `ip_address` text,
  `user_agent` text,
  `created_at` integer NOT NULL
);
