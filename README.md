# Next.js & Fomantic-UI Frontend

## 🚀 Overview
Frontend aplikasi ini dikembangkan menggunakan **Next.js** dan **Fomantic-UI** sebagai framework UI. Aplikasi ini terintegrasi dengan backend .NET Core untuk fitur autentikasi dan manajemen pengguna.

## 🛠️ Fitur
- **Autentikasi dengan JWT** (Login & Logout)
- **Menampilkan data pengguna dari backend**
- **Navbar dengan informasi pengguna yang login**
- **Proteksi halaman dashboard** (hanya bisa diakses jika login)
- **Manajemen user claims dari JWT token**

## 📌 Prasyarat
Sebelum menjalankan aplikasi ini, pastikan Anda sudah menginstal:
- **Node.js** (disarankan versi terbaru)
- **npm** atau **yarn**
- **Backend .NET Core** sudah berjalan di `http://localhost:5150`

## 🔧 Cara Menjalankan
1. **Clone Repository**
   ```sh
   git clone https://github.com/adipras/user-auth-app.git
   cd user-auth-app
   ```

2. **Instal Dependensi**
   ```sh
   npm install
   ```

3. **Konfigurasi Variabel Lingkungan**
   Buat file `.env.local` dan isi dengan:
   ```sh
   NEXT_PUBLIC_API_URL=http://localhost:5150/api
   ```

4. **Jalankan Aplikasi**
   ```sh
   npm run dev
   ```
   Aplikasi akan berjalan di: `http://localhost:3000`

## 🔑 Akun Testing
Gunakan akun yang telah didaftarkan melalui halaman **Register** atau seed data dari backend.

## 📂 Struktur Folder
```
repo-frontend/
├── src/
│   ├── app/
│   │   ├── login/
│   │   │   ├── page.tsx
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── ProtectedRoute.tsx
│   ├── types/
│   │   ├── User.ts
├── .env.local
├── package.json
├── README.md
```

## ⚙️ Teknologi yang Digunakan
- **Next.js** (React Framework)
- **Fomantic-UI** (UI Framework)
- **Axios** (HTTP Client)
- **JWT Decode** (Parsing JWT Token)
- **Cookies.js** (Manajemen Token)

## 📌 Catatan Penting
- Pastikan **backend sudah berjalan** sebelum menjalankan frontend.


