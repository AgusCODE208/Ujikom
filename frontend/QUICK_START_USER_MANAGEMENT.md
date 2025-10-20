# 🚀 Quick Start - User Management

## Cara Menggunakan User Management System

### 1️⃣ Akses Admin Panel
```
1. Buka aplikasi di browser
2. Navigasi ke /admin atau klik tombol admin
3. Anda akan masuk ke Admin Dashboard
```

### 2️⃣ Buka User Management
```
1. Lihat sidebar di sebelah kiri
2. Klik menu "Manajemen User" (icon Users)
3. Anda akan melihat daftar user
```

### 3️⃣ Fitur-Fitur yang Tersedia

#### 📋 **Melihat Daftar User**
- Semua user ditampilkan dalam tabel
- Informasi: Foto, Nama, Email, Role, Status
- Gunakan search box untuk mencari user

#### ➕ **Menambah User Baru**
```
1. Klik tombol "Tambah User" (merah)
2. Isi form:
   - Nama Lengkap (required)
   - Email (required)
   - No. Telepon
   - Role (User/Staff/Admin)
   - Alamat
   - Bio
   - Status (Active/Inactive)
   - Foto Profil (URL atau Upload)
3. Klik "Tambah User"
4. User baru akan muncul di list
```

#### ✏️ **Edit User**
```
1. Klik icon pensil (Edit) pada user yang ingin diedit
2. Ubah informasi yang diperlukan
3. Klik "Update User"
4. Perubahan akan tersimpan
```

#### 👁️ **Lihat Detail User**
```
1. Klik icon mata (Eye) pada user
2. Lihat informasi lengkap user
3. Klik "Edit User" jika ingin mengubah
4. Klik "Kembali" untuk kembali ke list
```

#### 🗑️ **Hapus User**
```
1. Klik icon tempat sampah (Trash) pada user
2. Konfirmasi penghapusan
3. User akan dipindahkan ke "Deleted Users"
4. User tidak hilang permanen, bisa di-restore
```

#### 🔄 **Restore User yang Dihapus**
```
1. Klik tombol "Restore" (abu-abu) di User List
2. Lihat daftar user yang sudah dihapus
3. Klik "Restore" untuk mengembalikan user
4. Atau klik icon Trash untuk hapus permanen
```

### 4️⃣ Tips Penggunaan

#### Upload Foto:
- **Metode URL**: Paste link gambar dari internet
- **Metode Upload**: Pilih file dari komputer
- Preview akan muncul setelah upload
- Format: PNG, JPG, JPEG

#### Role User:
- **Admin** (Purple): Akses penuh ke semua fitur
- **Staff** (Blue): Akses terbatas untuk operasional
- **User** (Gray): User biasa/customer

#### Status User:
- **Active** (Green): User aktif, bisa login
- **Inactive** (Red): User non-aktif, tidak bisa login

### 5️⃣ Contoh Skenario

#### Skenario 1: Menambah Admin Baru
```
1. Klik "Tambah User"
2. Isi:
   - Nama: "Jane Smith"
   - Email: "jane@cinema.com"
   - Telepon: "081234567892"
   - Role: "Admin"
   - Status: "Active"
3. Upload foto atau paste URL
4. Klik "Tambah User"
✅ Admin baru berhasil ditambahkan!
```

#### Skenario 2: Menonaktifkan User
```
1. Cari user yang ingin dinonaktifkan
2. Klik icon Edit (pensil)
3. Ubah Status dari "Active" ke "Inactive"
4. Klik "Update User"
✅ User berhasil dinonaktifkan!
```

#### Skenario 3: Mengembalikan User yang Terhapus
```
1. Klik tombol "Restore"
2. Cari user yang ingin dikembalikan
3. Klik "Restore" pada user tersebut
4. Konfirmasi restore
✅ User berhasil dikembalikan ke list aktif!
```

### 6️⃣ Keyboard Shortcuts (Future)
```
Ctrl + F  : Focus search box
Ctrl + N  : New user
Esc       : Close modal/form
```

### 7️⃣ Troubleshooting

#### ❌ User tidak muncul setelah ditambah?
- Refresh halaman (F5)
- Cek console browser untuk error
- Pastikan localStorage tidak penuh

#### ❌ Foto tidak muncul?
- Cek URL foto valid
- Cek ukuran file tidak terlalu besar
- Coba gunakan metode upload yang berbeda

#### ❌ Data hilang setelah refresh?
- Data disimpan di localStorage browser
- Jangan clear browser data
- Gunakan browser yang sama

### 8️⃣ Data Dummy

Aplikasi sudah include 2 user dummy:
```javascript
1. Admin User
   - Email: admin@cinema.com
   - Role: Admin
   - Status: Active

2. John Doe
   - Email: john@example.com
   - Role: User
   - Status: Active
```

### 9️⃣ Best Practices

✅ **DO:**
- Gunakan email yang valid
- Upload foto dengan ukuran wajar
- Isi bio untuk informasi tambahan
- Set role sesuai kebutuhan
- Gunakan soft delete (bisa restore)

❌ **DON'T:**
- Jangan hapus permanen tanpa backup
- Jangan gunakan email duplikat
- Jangan upload foto terlalu besar
- Jangan biarkan field penting kosong

### 🔟 Next Steps

Setelah familiar dengan User Management:
1. Explore fitur Film Management
2. Coba Studio Management (coming soon)
3. Test Jadwal Management (coming soon)
4. Lihat Transaction Management (coming soon)

---

## 📞 Need Help?

Jika ada pertanyaan atau masalah:
1. Cek dokumentasi lengkap di `USER_MANAGEMENT_README.md`
2. Lihat implementation details di `IMPLEMENTATION_SUMMARY.md`
3. Cek console browser untuk error messages

---

**Happy Managing! 🎉**
