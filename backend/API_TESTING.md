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
    "name": "Test User",
    "email": "testuser@example.com",
    "password": "password123",
    "password_confirmation": "password123"
}
```

## 2. Login
**POST** `/login`

**Body (JSON):**
```json
{
    "email": "admin@bioskop.com",
    "password": "password"
}
```

**Response akan memberikan token yang perlu disimpan untuk request selanjutnya.**

## 3. Get User Profile
**GET** `/me`

**Headers:**
```
Authorization: Bearer {your_token_here}
```

## 4. Logout
**POST** `/logout`

**Headers:**
```
Authorization: Bearer {your_token_here}
```

## 5. Test Role-based Access

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