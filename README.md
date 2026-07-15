# Flavor Dash

Flavor Dash merupakan aplikasi mobile pemesanan makanan berbasis React Native (Expo) yang dikembangkan sebagai tugas UTS Pemrograman Mobile. Aplikasi ini menyediakan fitur katalog makanan, autentikasi pengguna, keranjang belanja, detail pesanan, kamera sebagai bukti penerimaan pesanan, dan integrasi maps untuk menampilkan lokasi restoran.

---

# Fitur Utama

## 1. Authentication

- Login dan Register
- Simulasi JWT Authentication
- Route Protection menggunakan Expo Router Middleware
- Halaman tertentu hanya dapat diakses setelah login.

## 2. Katalog Makanan

- Menampilkan daftar makanan dan minuman.
- Data diambil dari Mock API.
- Katalog dibagi berdasarkan kategori:
  - Makanan
  - Minuman

## 3. Keranjang

- Menambahkan menu ke keranjang.
- Mengubah jumlah pesanan.
- Menambahkan catatan pesanan.
- Menghitung total harga.

## 4. Detail Pesanan

- Menampilkan daftar pesanan pengguna.
- Menampilkan status pesanan.
- Menampilkan total pembayaran.
- Menampilkan catatan pesanan.

## 5. Camera

- Mengambil foto sebagai bukti penerimaan pesanan.
- Menampilkan preview hasil foto.
- Setelah foto dikonfirmasi, status pesanan berubah menjadi **Selesai**.

## 6. Maps

- Menampilkan lokasi restoran.
- Menampilkan marker lokasi menggunakan Google Maps.

---

# Teknologi yang Digunakan

- React Native
- Expo
- Expo Router
- TypeScript
- Context API
- Expo Secure Store
- Expo Camera
- React Native Maps
- MockAPI

---

# Struktur Project

```text
app
├── (auth)
│   ├── login.tsx
│   └── register.tsx
│
├── (tabs)
│   ├── home.tsx
│   ├── cart.tsx
│   ├── orders.tsx
│   ├── maps.tsx
│   └── food-detail.tsx
│
├── camera.tsx
├── profile.tsx
└── _layout.tsx

src
├── components
├── context
├── services
└── data
```

---

# Instalasi

## Clone Repository

```bash
git clone https://github.com/USERNAME/flavordash.git
```

---

## Install Dependency

```bash
npm install
```

---

## Menjalankan Project

```bash
npx expo start
```

---

# Library Tambahan

```bash
npx expo install expo-router
npx expo install expo-camera
npx expo install react-native-maps
npx expo install expo-secure-store
```

---

# API

Aplikasi menggunakan Mock API untuk menyimpan data makanan dan minuman.

Contoh data:

```json
{
  "name": "Burger Deluxe",
  "description": "Burger daging premium",
  "price": "Rp 45.000",
  "image": "URL_IMAGE",
  "category": "Makanan"
}
```

---

# Authentication

Aplikasi menggunakan simulasi JSON Web Token (JWT).

Token disimpan menggunakan:

```text
Expo Secure Store
```

Halaman yang diproteksi:

- Detail Menu
- Pesanan
- Profile
- Camera

---

# Analisis

## 1. Penggunaan Flexbox dan Ukuran Proporsional

Flexbox digunakan karena mampu mengatur tata letak antarmuka secara fleksibel dan responsif pada berbagai ukuran layar Android. Dengan properti seperti `flex`, `flexDirection`, `justifyContent`, dan `alignItems`, elemen dapat menyesuaikan ruang yang tersedia tanpa harus menggunakan ukuran tetap.

Selain itu, penggunaan ukuran proporsional seperti `flex` dan persentase memungkinkan tampilan aplikasi tetap konsisten pada berbagai perangkat, mulai dari smartphone berukuran kecil hingga layar yang lebih besar.

### Keuntungan Flexbox:

- Layout lebih responsif.
- Mudah menyesuaikan ukuran layar.
- Mengurangi penggunaan ukuran tetap (fixed size).
- Tampilan lebih konsisten pada berbagai perangkat.

---

## 2. Stateful Authentication vs Stateless Authentication (JWT)

### Stateful Authentication

Pada metode Stateful Authentication, data sesi pengguna disimpan di server.

#### Kelebihan:

- Kontrol sesi lebih mudah.
- Token dapat langsung dibatalkan dari server.

#### Kekurangan:

- Membutuhkan penyimpanan session di server.
- Kurang efisien untuk aplikasi mobile dan API.

---

### Stateless Authentication (JWT)

Pada metode Stateless Authentication, informasi autentikasi disimpan di dalam token (JWT) dan tidak memerlukan penyimpanan sesi di server.

#### Kelebihan:

- Lebih ringan.
- Cocok untuk aplikasi mobile.
- Mudah digunakan pada arsitektur client-server dan REST API.

#### Kekurangan:

- Token harus disimpan dengan aman.
- Jika token bocor, pengguna lain dapat mengakses akun.

---

## Alasan Menggunakan JWT pada Aplikasi Mobile

JWT dipilih karena aplikasi mobile umumnya berkomunikasi dengan REST API. JWT bersifat stateless sehingga tidak memerlukan session server, lebih ringan, dan mudah diimplementasikan pada aplikasi React Native.

---

# Hasil Implementasi

Fitur yang berhasil diimplementasikan:

- [x] Authentication
- [x] JWT Simulation
- [x] Middleware Protection
- [x] Katalog Makanan
- [x] Mock API
- [x] Responsive Layout
- [x] Cart
- [x] Detail Pesanan
- [x] Camera
- [x] Maps
- [x] Analisis

---
