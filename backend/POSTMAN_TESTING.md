# API Testing Guide untuk Postman

## Base URL
```
http://localhost:8000/api
```

## 1. Register User Baru
**POST** `/register`

**Body (JSON):**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "phone": "081234567890",
    "alamat": "Jl. Contoh No. 123"
}
```

## 2. Login
**POST** `/login`

**Body (JSON):**
```json
{
    "email": "user@bioskop.com",
    "password": "password"
}
```

**Response akan memberikan token yang perlu disimpan untuk request selanjutnya.**

## 3. Get User Profile
**GET** `/profile`

**Headers:**
```
Authorization: Bearer {your_token_here}
```

## 4. Update Profile
**PUT** `/profile` atau **PATCH** `/profile`

**Headers:**
```
Authorization: Bearer {your_token_here}
```

**Body (JSON):**
```json
{
    "name": "John Doe Updated",
    "phone": "081234567891",
    "alamat": "Jl. Baru No. 456"
}
```

**Untuk upload foto (form-data):**
- name: John Doe
- phone: 081234567890
- alamat: Jl. Contoh
- photo: [pilih file gambar]

## 5. Change Password
**POST** `/change-password`

**Headers:**
```
Authorization: Bearer {your_token_here}
```

**Body (JSON):**
```json
{
    "current_password": "password",
    "password": "newpassword123",
    "password_confirmation": "newpassword123"
}
```

## 6. Logout
**POST** `/logout`

**Headers:**
```
Authorization: Bearer {your_token_here}
```

## 7. Test Role-based Access

### Customer Tickets (Role: user)
**GET** `/customer/tickets`

**Headers:**
```
Authorization: Bearer {user_token}
```

### Kasir Transactions (Role: kasir)
**GET** `/kasir/transactions`

**Headers:**
```
Authorization: Bearer {kasir_token}
```

### Admin Dashboard (Role: admin)
**GET** `/admin/dashboard`

**Headers:**
```
Authorization: Bearer {admin_token}
```

### Owner Reports (Role: owner)
**GET** `/owner/reports`

**Headers:**
```
Authorization: Bearer {owner_token}
```

## Default Users untuk Testing

| Role  | Deskripsi | Email              | Password |
|-------|-----------|-------------------|----------|
| user  | Customer yang sudah login | user@bioskop.com  | password |
| kasir | Kasir bioskop | kasir@bioskop.com | password |
| admin | Administrator | admin@bioskop.com | password |
| owner | Pemilik bioskop | owner@bioskop.com | password |

**Catatan:** 
- Role `user` = customer yang sudah login/register
- Kalau belum login = guest (tidak ada role)

## Cara Setup

1. Jalankan migration dan seeder:
```bash
php artisan migrate:fresh --seed
```

2. Start server:
```bash
php artisan serve
```

3. Test di Postman dengan endpoint di atas.

## Tips Testing di Postman

1. **Buat Environment** dengan variable:
   - `base_url`: http://localhost:8000/api
   - `token`: (akan diisi otomatis dari response login)

2. **Set Authorization** di tab Authorization:
   - Type: Bearer Token
   - Token: {{token}}

3. **Auto-save token** dari response login dengan script di tab Tests:
```javascript
if (pm.response.code === 200) {
    const response = pm.response.json();
    if (response.data && response.data.token) {
        pm.environment.set("token", response.data.token);
    }
}
```