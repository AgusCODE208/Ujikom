# PENJELASAN LENGKAP KODE APLIKASI TICKET BIOSKOP

## DAFTAR ISI
1. [Pengenalan React](#pengenalan-react)
2. [Struktur Project](#struktur-project)
3. [File Utama](#file-utama)
4. [Komponen-Komponen](#komponen-komponen)
5. [Konsep Penting](#konsep-penting)

---

## PENGENALAN REACT

### Apa itu React?
React adalah library JavaScript untuk membuat tampilan website (UI). Bayangkan React seperti LEGO - Anda membuat komponen kecil-kecil, lalu menyusunnya jadi aplikasi besar.

### Kenapa Pakai React?
- **Component-Based**: Buat sekali, pakai berkali-kali
- **Reactive**: Otomatis update tampilan saat data berubah
- **Popular**: Banyak tutorial dan komunitas

---

## STRUKTUR PROJECT

```
frontend/
├── src/
│   ├── main.jsx          # Pintu masuk aplikasi
│   ├── App.jsx           # Komponen utama
│   ├── components/       # Komponen reusable
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   └── pages/            # Halaman-halaman
│       ├── public/
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   └── FilmDetail.jsx
│       └── user/
│           ├── PilihKursi.jsx
│           └── Checkout.jsx
├── index.html            # File HTML utama
└── package.json          # Daftar library yang dipakai
```

---

## FILE UTAMA

### 1. index.html
```html
<div id="root"></div>
```
**Penjelasan:**
- Ini adalah "wadah" kosong
- React akan mengisi wadah ini dengan komponen
- Seperti kanvas kosong untuk melukis

---

### 2. main.jsx - Pintu Masuk Aplikasi

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AOS from 'aos'
```

**Penjelasan Import:**
- `StrictMode`: Mode ketat React untuk deteksi error
- `createRoot`: Fungsi untuk membuat aplikasi React
- `./index.css`: File CSS untuk styling
- `App`: Komponen utama aplikasi
- `AOS`: Library untuk animasi scroll

```javascript
AOS.init({
  duration: 800,
  once: true,
  easing: 'ease-in-out'
});
```

**Penjelasan AOS:**
- `duration: 800`: Animasi berlangsung 0.8 detik
- `once: true`: Animasi hanya jalan sekali
- `easing: 'ease-in-out'`: Animasi mulai lambat, cepat, lalu lambat lagi

```javascript
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

**Penjelasan Render:**
- `document.getElementById('root')`: Cari elemen dengan id "root"
- `createRoot()`: Buat aplikasi React di elemen tersebut
- `.render()`: Tampilkan komponen App

---

### 3. App.jsx - Otak Aplikasi

#### Import Statement
```javascript
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/public/Home';
```

**Penjelasan:**
- `React`: Library utama
- `useState`: Hook untuk menyimpan data yang bisa berubah
- `useEffect`: Hook untuk efek samping (fetch data, dll)
- Import komponen lain yang akan dipakai

#### State Management
```javascript
const [currentView, setCurrentView] = useState('home');
```

**Penjelasan useState:**
- `currentView`: Variabel untuk menyimpan halaman aktif
- `setCurrentView`: Fungsi untuk mengubah currentView
- `'home'`: Nilai awal (default)

**Analogi:**
Bayangkan seperti remote TV:
- `currentView` = channel yang sedang ditonton
- `setCurrentView` = tombol untuk ganti channel

```javascript
const [isLoggedIn, setIsLoggedIn] = useState(false);
```
- Menyimpan status login user
- `false` = belum login
- `true` = sudah login

```javascript
const [bookingData, setBookingData] = useState(null);
```
- Menyimpan data booking (film, jadwal, kursi)
- `null` = belum ada data

```javascript
const [bookedSeats, setBookedSeats] = useState([]);
```
- Menyimpan daftar kursi yang sudah dibooking
- `[]` = array kosong

#### Conditional Rendering
```javascript
{currentView === 'home' && <Home setCurrentView={setCurrentView} />}
```

**Penjelasan:**
- `===`: Operator perbandingan (sama dengan)
- `&&`: Operator AND (dan)
- Artinya: "Jika currentView adalah 'home', tampilkan komponen Home"

**Analogi:**
Seperti saklar lampu:
- Jika saklar ON (currentView === 'home'), lampu nyala (tampilkan Home)
- Jika saklar OFF, lampu mati (tidak tampilkan apa-apa)

```javascript
{currentView === 'pilihkursi' && bookingData && isLoggedIn && (
  <PilihKursi ... />
)}
```

**Penjelasan:**
Tampilkan PilihKursi HANYA jika:
1. currentView adalah 'pilihkursi' DAN
2. bookingData ada (tidak null) DAN
3. user sudah login

---

## KOMPONEN-KOMPONEN

### 1. Navbar.jsx - Menu Navigasi

```javascript
const Navbar = ({ setCurrentView, isLoggedIn, setIsLoggedIn }) => {
```

**Penjelasan Props:**
- Props = data yang dikirim dari parent ke child
- Seperti parameter fungsi
- Navbar menerima 3 props dari App.jsx

```javascript
{!isLoggedIn ? (
  <>
    <button onClick={() => setCurrentView('login')}>Login</button>
    <button onClick={() => setCurrentView('register')}>Register</button>
  </>
) : (
  <>
    <button onClick={() => setCurrentView('myticket')}>My Tickets</button>
    <button onClick={() => setCurrentView('profile')}>Profile</button>
  </>
)}
```

**Penjelasan Ternary Operator:**
- `? :` = if-else singkat
- `!isLoggedIn` = NOT isLoggedIn (belum login)
- Jika belum login: tampilkan Login & Register
- Jika sudah login: tampilkan My Tickets & Profile

**Analogi:**
Seperti pintu masuk:
- Jika belum punya kartu member: tampilkan "Daftar" & "Login"
- Jika sudah punya kartu member: tampilkan "Profil" & "Tiket Saya"

---

### 2. Home.jsx - Halaman Utama

#### State untuk Filter
```javascript
const [selectedTab, setSelectedTab] = useState('now_playing');
const [searchQuery, setSearchQuery] = useState('');
const [films, setFilms] = useState([]);
```

**Penjelasan:**
- `selectedTab`: Tab mana yang aktif (now_playing, coming_soon, ended)
- `searchQuery`: Teks yang diketik user di search box
- `films`: Daftar semua film

#### useEffect - Efek Samping
```javascript
useEffect(() => {
  setFilms(getFilms());
}, []);
```

**Penjelasan:**
- `useEffect`: Hook untuk menjalankan kode saat komponen dimuat
- `[]`: Dependency array kosong = hanya jalan sekali
- Mengambil data film dan simpan ke state

**Analogi:**
Seperti saat buka aplikasi:
- Pertama kali buka: load data dari server
- Setelah itu: data sudah ada, tidak perlu load lagi

```javascript
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  }, 3000);
  return () => clearInterval(interval);
}, [heroImages.length]);
```

**Penjelasan Carousel:**
- `setInterval`: Jalankan fungsi setiap 3000ms (3 detik)
- `(prev) => (prev + 1)`: Slide berikutnya
- `% heroImages.length`: Kembali ke slide pertama jika sudah di akhir
- `return () => clearInterval()`: Cleanup, hentikan interval saat komponen di-unmount

**Analogi:**
Seperti slideshow foto:
- Setiap 3 detik ganti foto
- Jika sudah foto terakhir, kembali ke foto pertama

#### Filter Film
```javascript
const filteredFilms = films.filter(film => {
  const matchStatus = film.status === selectedTab;
  const matchSearch = film.judul.toLowerCase().includes(searchQuery.toLowerCase());
  return matchStatus && matchSearch;
});
```

**Penjelasan:**
- `.filter()`: Method array untuk menyaring data
- `matchStatus`: Cek apakah status film sesuai tab
- `matchSearch`: Cek apakah judul mengandung kata yang dicari
- `.toLowerCase()`: Ubah ke huruf kecil (case-insensitive)
- `.includes()`: Cek apakah string mengandung substring
- Return film yang memenuhi KEDUA kondisi

**Analogi:**
Seperti filter di toko online:
- Filter kategori: "Sepatu"
- Filter pencarian: "Nike"
- Hasil: Sepatu Nike saja

#### Map untuk Render List
```javascript
{filteredFilms.map((film, index) => (
  <div key={film.id}>
    <img src={film.poster} alt={film.judul} />
    <h3>{film.judul}</h3>
  </div>
))}
```

**Penjelasan:**
- `.map()`: Method array untuk transform setiap item
- `film`: Item saat ini
- `index`: Urutan item (0, 1, 2, ...)
- `key={film.id}`: Identifier unik (WAJIB di React)

**Analogi:**
Seperti cetak foto:
- Punya 10 file foto
- Cetak semua foto dengan format yang sama
- Setiap foto punya nomor unik

---

### 3. FilmDetail.jsx - Detail Film

#### Data Dummy
```javascript
const FILM_DETAIL = {
  id: 1,
  judul: "Guardians of the Galaxy Vol. 3",
  deskripsi: "...",
  genre: "Action, Adventure, Sci-Fi",
  durasi: 150,
  rating_usia: "13+",
  poster: "https://...",
  rating: 8.5,
};
```

**Penjelasan:**
- **Object**: Kumpulan data dengan key-value pairs
- Ini data sementara untuk testing
- Nanti diganti dengan data dari API

#### Fungsi Helper
```javascript
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};
```

**Penjelasan:**
- `Intl.NumberFormat`: API JavaScript untuk format angka
- `'id-ID'`: Format Indonesia
- `currency: 'IDR'`: Mata uang Rupiah
- Input: 35000
- Output: "Rp 35.000"

#### Event Handler
```javascript
const handleBooking = (jadwal) => {
  if (!isLoggedIn) {
    alert('Please login first to book tickets');
    setCurrentView('login');
    return;
  }
  setBookingData({
    selectedJadwal: jadwal,
    selectedDate: selectedDate,
    filmDetail: FILM_DETAIL
  });
  setCurrentView('pilihkursi');
};
```

**Penjelasan:**
- Fungsi yang dipanggil saat tombol booking diklik
- Cek dulu apakah user sudah login
- Jika belum: tampilkan alert dan arahkan ke login
- Jika sudah: simpan data booking dan pindah ke pilih kursi
- `return`: Hentikan eksekusi fungsi

**Analogi:**
Seperti masuk bioskop:
- Cek tiket dulu
- Jika belum punya tiket: beli dulu
- Jika sudah punya: masuk ke studio

---

### 4. PilihKursi.jsx - Pemilihan Kursi

#### Generate Kursi
```javascript
const generateSeats = (bookedSeats) => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seats = [];
  
  rows.forEach(row => {
    for (let i = 1; i <= 10; i++) {
      const seatNumber = `${row}${i}`;
      const isBooked = bookedSeats.includes(seatNumber);
      seats.push({
        id: seatNumber,
        row: row,
        number: i,
        status: isBooked ? 'booked' : 'available'
      });
    }
  });
  
  return seats;
};
```

**Penjelasan:**
- `forEach`: Loop untuk setiap baris (A-H)
- `for loop`: Loop untuk setiap nomor (1-10)
- Template literal: `` `${row}${i}` `` = gabung string (A1, A2, B1)
- `.includes()`: Cek apakah array mengandung nilai
- `.push()`: Tambahkan item ke array

**Analogi:**
Seperti membuat denah kursi bioskop:
- 8 baris (A-H)
- Setiap baris 10 kursi (1-10)
- Total: 80 kursi

#### Handle Klik Kursi
```javascript
const handleSeatClick = (seatId) => {
  const seat = seats.find(s => s.id === seatId);
  if (seat && seat.status !== 'booked') {
    if (seat.status === 'available') {
      setSelectedSeats(prev => [...prev, seatId]);
      setSeats(prevSeats => prevSeats.map(s => 
        s.id === seatId ? { ...s, status: 'selected' } : s
      ));
    } else {
      setSelectedSeats(prev => prev.filter(id => id !== seatId));
      setSeats(prevSeats => prevSeats.map(s => 
        s.id === seatId ? { ...s, status: 'available' } : s
      ));
    }
  }
};
```

**Penjelasan:**
- `.find()`: Cari kursi berdasarkan id
- Jika kursi available: ubah jadi selected
- Jika kursi selected: ubah jadi available
- Spread operator `...prev`: Copy array lama
- `.filter()`: Hapus item dari array
- `.map()`: Ubah status kursi tertentu

**Analogi:**
Seperti pilih kursi di bioskop:
- Klik kursi kosong: jadi dipilih (kuning)
- Klik kursi yang sudah dipilih: jadi kosong lagi
- Kursi yang sudah dibooking: tidak bisa diklik

---

### 5. Checkout.jsx - Pembayaran

#### State untuk Form
```javascript
const [formData, setFormData] = useState({
  nama: '',
  email: '',
  no_hp: ''
});
```

**Penjelasan:**
- Object untuk menyimpan data form
- Semua field dimulai dengan string kosong

#### Handle Input Change
```javascript
const handleInputChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};
```

**Penjelasan:**
- `e`: Event object
- `e.target`: Elemen yang memicu event (input field)
- `e.target.name`: Atribut name dari input
- `e.target.value`: Nilai yang diketik user
- Computed property `[e.target.name]`: Gunakan nilai variabel sebagai key

**Analogi:**
Seperti isi formulir:
- Ketik nama di kolom nama
- Ketik email di kolom email
- Data tersimpan otomatis

#### Submit Booking
```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  
  if (!paymentMethod) {
    alert('Please select a payment method');
    return;
  }

  setIsProcessing(true);

  setTimeout(() => {
    setIsProcessing(false);
    const newTicket = {
      id: Date.now(),
      kode_booking: checkoutData.kode_booking,
      status: 'paid',
    };
    setUserTickets(prev => [newTicket, ...prev]);
    setShowSuccessModal(true);
  }, 2000);
};
```

**Penjelasan:**
- `e.preventDefault()`: Cegah form reload halaman
- Validasi: cek metode pembayaran
- `setIsProcessing(true)`: Tampilkan loading
- `setTimeout`: Simulasi proses (2 detik)
- `Date.now()`: Timestamp sebagai id unik
- Tambahkan tiket baru ke daftar
- Tampilkan modal sukses

---

## KONSEP PENTING

### 1. Component
**Definisi:** Potongan kode reusable yang menghasilkan UI

**Analogi:** Seperti LEGO blocks
- Buat sekali
- Pakai berkali-kali
- Susun jadi aplikasi besar

**Contoh:**
```javascript
const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>
}

// Pakai berkali-kali
<Button text="Login" onClick={handleLogin} />
<Button text="Register" onClick={handleRegister} />
```

---

### 2. Props
**Definisi:** Data yang dikirim dari parent ke child

**Analogi:** Seperti parameter fungsi
```javascript
// Parent
<Navbar isLoggedIn={true} />

// Child
const Navbar = ({ isLoggedIn }) => {
  return <div>{isLoggedIn ? 'Logout' : 'Login'}</div>
}
```

---

### 3. State
**Definisi:** Data yang bisa berubah dalam component

**Karakteristik:**
- Saat state berubah, component re-render
- Gunakan `useState` hook

**Contoh:**
```javascript
const [count, setCount] = useState(0);

<button onClick={() => setCount(count + 1)}>
  Clicked {count} times
</button>
```

---

### 4. Event Handler
**Definisi:** Fungsi yang dipanggil saat event terjadi

**Jenis Event:**
- `onClick`: Saat diklik
- `onChange`: Saat input berubah
- `onSubmit`: Saat form disubmit

**Contoh:**
```javascript
const handleClick = () => {
  alert('Button clicked!');
}

<button onClick={handleClick}>Click Me</button>
```

---

### 5. Conditional Rendering
**Definisi:** Tampilkan component berdasarkan kondisi

**Cara 1: && Operator**
```javascript
{isLoggedIn && <Profile />}
```

**Cara 2: Ternary Operator**
```javascript
{isLoggedIn ? <Profile /> : <Login />}
```

**Cara 3: If-Else**
```javascript
if (isLoggedIn) {
  return <Profile />
} else {
  return <Login />
}
```

---

### 6. List Rendering
**Definisi:** Tampilkan array data sebagai list

**Aturan:**
- Gunakan `.map()`
- Wajib pakai `key` prop

**Contoh:**
```javascript
const fruits = ['Apple', 'Banana', 'Orange'];

{fruits.map((fruit, index) => (
  <li key={index}>{fruit}</li>
))}
```

---

### 7. useEffect
**Definisi:** Hook untuk efek samping

**Kapan Pakai:**
- Fetch data dari API
- Subscribe event
- Update document title

**Contoh:**
```javascript
// Jalan sekali saat mount
useEffect(() => {
  fetchData();
}, []);

// Jalan setiap count berubah
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

---

## ALUR APLIKASI

### Flow User Booking Tiket:

1. **Home** 
   - User lihat daftar film
   - Bisa filter: Now Playing, Coming Soon, Ended
   - Bisa search film

2. **Film Detail**
   - User klik film
   - Lihat detail: sinopsis, rating, durasi
   - Lihat jadwal tayang
   - Pilih jadwal

3. **Login** (jika belum login)
   - User harus login dulu
   - Isi email & password
   - Klik Login

4. **Pilih Kursi**
   - User lihat denah kursi
   - Pilih kursi yang tersedia
   - Kursi yang sudah dibooking tidak bisa dipilih
   - Lihat total harga

5. **Checkout**
   - User isi data: nama, email, no HP
   - Pilih metode pembayaran
   - Upload bukti pembayaran (opsional)
   - Klik Confirm & Pay

6. **Success**
   - Booking berhasil
   - Dapat kode booking
   - Bisa lihat tiket di My Tickets

7. **My Tickets**
   - User lihat semua tiket yang sudah dibeli
   - Bisa lihat detail tiket
   - Bisa scan QR code

---

## TIPS BELAJAR REACT

### 1. Pahami JavaScript Dulu
- Array methods: map, filter, find
- Arrow function
- Destructuring
- Spread operator
- Template literal

### 2. Mulai dari Component Sederhana
- Buat button
- Buat card
- Buat form

### 3. Pahami State & Props
- State: data internal component
- Props: data dari parent

### 4. Latihan Conditional Rendering
- Tampilkan/sembunyikan element
- Tampilkan data berdasarkan kondisi

### 5. Latihan List Rendering
- Tampilkan array sebagai list
- Jangan lupa key prop

### 6. Pahami useEffect
- Kapan pakai
- Dependency array
- Cleanup function

---

## KESIMPULAN

Aplikasi ini adalah **Single Page Application (SPA)** untuk booking tiket bioskop dengan fitur:

✅ Lihat daftar film
✅ Filter & search film
✅ Lihat detail film & jadwal
✅ Login/Register
✅ Pilih kursi
✅ Checkout & pembayaran
✅ Lihat tiket yang sudah dibeli

**Teknologi yang Dipakai:**
- React 19
- Vite (build tool)
- Tailwind CSS (styling)
- Lucide React (icons)
- AOS (animasi)
- Zustand (state management - belum dipakai)

**Arsitektur:**
- State management sederhana dengan useState di App.jsx
- Props drilling untuk kirim data ke child component
- Conditional rendering untuk navigasi antar halaman
- Dummy data untuk testing (belum connect ke backend)

---

Semoga penjelasan ini membantu Anda memahami kode React! 🚀
