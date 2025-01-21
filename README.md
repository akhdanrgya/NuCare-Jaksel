# NuCare-Jaksel

**NuCare-Jaksel** adalah platform donasi berbasis web yang dibangun menggunakan [Next.js](https://nextjs.org/). Platform
ini bertujuan untuk memudahkan pengguna dalam memberikan donasi dan mendukung berbagai program sosial di wilayah Jakarta
Selatan.

## Fitur

- **Halaman Donasi**: Menampilkan daftar program donasi yang tersedia.
- **Detail Program**: Informasi lengkap mengenai setiap program donasi.
- **Proses Pembayaran**: Integrasi dengan metode pembayaran untuk memudahkan donasi.
- **Dashboard Admin**: Mengelola program donasi, kategori, dan laporan donasi.

## Teknologi yang Digunakan

- **Framework**: [Next.js](https://nextjs.org/)
- **Bahasa Pemrograman**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Autentikasi**: [SupabaseAuth](https://supabase.com/docs/guides/auth)
- **Database**: [Supabase](https://supabase.io/)
- **Deployment**: [Vercel](https://vercel.com/)

## Prasyarat

Pastikan Anda telah menginstal perangkat berikut:

- [Node.js](https://nodejs.org/) versi 14 atau lebih baru
- [npm](https://www.npmjs.com/) atau [Yarn](https://yarnpkg.com/)

## Instalasi

1. **Kloning repositori ini**:

   ```bash
   git clone https://github.com/akhdanrgya/NuCare-Jaksel.git
   ```

2. **Masuk ke direktori proyek**:

   ```bash
   cd NuCare-Jaksel
   ```

3. **Instal dependensi**:

   Menggunakan npm:

   ```bash
   npm install
   ```

   Atau menggunakan Yarn:

   ```bash
   yarn install
   ```

4. **Konfigurasi Environment Variables**:

   Buat file `.env.local` di root proyek dan tambahkan variabel lingkungan yang diperlukan:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   NEXT_PUBLIC_MIDTRANS_MERCHAND_ID=your_mercband_id
   NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_client_key
   NEXT_PUBLIC_MIDTRANS_SERVER_KEY=your_server_key
   ```

   Pastikan untuk mengganti `your_supabase_url` dan `your_supabase_anon_key` dengan kredensial Supabase Anda.

## Menjalankan Proyek

Untuk memulai server pengembangan:

Menggunakan npm:

```bash
npm run dev
```

Menggunakan Yarn:

```bash
yarn dev
```

Buka localhost anda di browser untuk melihat aplikasi.

## Deployment

Proyek ini dikonfigurasi untuk deployment di [Vercel](https://vercel.com/). Untuk melakukan deployment:

1. **Buat akun Vercel** dan hubungkan dengan repositori GitHub Anda.
2. **Impor proyek** dan atur variabel lingkungan di dashboard Vercel sesuai dengan `.env.local`.
3. **Deploy** proyek melalui dashboard Vercel.

## Kontribusi

Kontribusi sangat diterima! Silakan fork repositori ini dan buat pull request dengan perubahan yang Anda usulkan.

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).
