CREATE TABLE `activity_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`action` text NOT NULL,
	`entity_type` text,
	`entity_id` text,
	`details` text,
	`ip_address` text,
	`user_agent` text,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `rekanan` (
	`id` text PRIMARY KEY NOT NULL,
	`nama_toko` text NOT NULL,
	`nama_owner` text NOT NULL,
	`no_wa` text NOT NULL,
	`reseller_allowed` integer DEFAULT false NOT NULL,
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
	`status` text DEFAULT 'active' NOT NULL,
	`ongkir_status` text DEFAULT 'negosiasi' NOT NULL,
	`surveyed_by` text NOT NULL,
	`surveyed_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text,
	FOREIGN KEY (`surveyed_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `rekanan_no_wa_unique` ON `rekanan` (`no_wa`);--> statement-breakpoint
CREATE TABLE `sku` (
	`id` text PRIMARY KEY NOT NULL,
	`rekanan_id` text NOT NULL,
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
	`is_deleted` integer DEFAULT false NOT NULL,
	`created_by` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text,
	FOREIGN KEY (`rekanan_id`) REFERENCES `rekanan`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`name` text NOT NULL,
	`role` text DEFAULT 'field_team' NOT NULL,
	`is_active` integer DEFAULT true NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);