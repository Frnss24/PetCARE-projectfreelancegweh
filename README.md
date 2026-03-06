# PetWash

Website modern untuk layanan pencucian dan grooming hewan peliharaan berbasis Next.js App Router, Tailwind CSS, TypeScript, Prisma ORM, dan PostgreSQL.

## Fitur

- Landing page modern dengan hero, layanan, testimonial, gallery sebelum-sesudah, dan footer kontak
- Halaman services dengan daftar layanan lengkap dan harga
- Form booking tervalidasi menggunakan React Hook Form + Zod
- API routes Next.js untuk create, list, update status, dan delete booking
- Dashboard admin untuk memantau booking
- Prisma schema untuk User, Service, dan Booking
- Animasi ringan menggunakan Framer Motion
- SEO metadata untuk halaman utama
- Responsive design dengan pendekatan mobile-first

## Menjalankan Project

1. Install dependency:

```bash
npm install
```

2. Siapkan PostgreSQL lalu isi `DATABASE_URL` pada file `.env`.

3. Generate Prisma Client dan sinkronkan schema:

```bash
npm run prisma:generate
npm run db:push
```

4. Jalankan development server:

```bash
npm run dev
```

## Endpoint API

- `GET /api/services`
- `GET /api/bookings`
- `POST /api/bookings`
- `PATCH /api/bookings/:id`
- `DELETE /api/bookings/:id`

## Catatan

Dashboard admin pada implementasi ini belum memiliki autentikasi. Untuk production, tambahkan auth admin sebelum deployment.
