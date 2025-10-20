# User Management System - Documentation

## 📁 File Structure

```
src/
├── utils/
│   └── userStorage.js          # User data management utility
└── pages/
    └── admin/
        └── user/
            ├── List.jsx        # User list with search & actions
            ├── Tambah.jsx      # Add new user form
            ├── Edit.jsx        # Edit user form
            ├── Detail.jsx      # View user details
            └── Restore.jsx     # Restore deleted users
```

## 🚀 Features Implemented

### 1. **User List (List.jsx)**
- Display all users in table format
- Search functionality (by name, email, role)
- View, Edit, Delete actions
- Navigate to Add User and Restore pages
- Real-time data loading from localStorage

### 2. **Add User (Tambah.jsx)**
- Form with validation
- Fields: Name, Email, Phone, Address, Bio, Role, Status, Photo
- Photo upload options: URL or File upload
- Preview uploaded photo
- Save to localStorage

### 3. **Edit User (Edit.jsx)**
- Pre-filled form with existing user data
- Same fields as Add User
- Update user information
- Photo update with preview

### 4. **User Detail (Detail.jsx)**
- Display complete user information
- Profile photo display
- Role badge with color coding
- Contact information
- Join date
- Quick edit button

### 5. **Restore User (Restore.jsx)**
- List of deleted users
- Restore deleted users
- Permanent delete option
- Deletion timestamp display

## 💾 Data Storage

### localStorage Keys:
- `cinema_users` - Active users
- `cinema_users_deleted` - Deleted users (for restore)

### User Object Structure:
```javascript
{
  id: "unique-id",
  nama: "John Doe",
  email: "john@example.com",
  telepon: "081234567890",
  alamat: "Jakarta, Indonesia",
  bio: "Software Developer",
  role: "admin" | "staff" | "user",
  foto: "url or base64",
  status: "active" | "inactive",
  createdAt: "2024-01-01T00:00:00.000Z",
  deletedAt: "2024-01-01T00:00:00.000Z" // only in deleted storage
}
```

## 🎨 Role Colors

- **Admin**: Purple badge (`bg-purple-600`)
- **Staff**: Blue badge (`bg-blue-600`)
- **User**: Gray badge (`bg-gray-600`)

## 🔧 Utility Functions (userStorage.js)

### Available Functions:

1. **getUsers()** - Get all active users
2. **addUser(userData)** - Add new user
3. **updateUser(id, userData)** - Update user by ID
4. **deleteUser(id)** - Soft delete user (move to deleted storage)
5. **getUserById(id)** - Get single user by ID
6. **getDeletedUsers()** - Get all deleted users
7. **restoreUser(id)** - Restore deleted user

## 🔄 Navigation Flow

```
AdminLayout
    ↓
User List ←→ Add User
    ↓           ↓
User Detail   (Save)
    ↓
Edit User
    ↓
(Update)
    ↓
User List

User List → Restore → (Restore User) → User List
```

## 📝 Usage Example

### In AdminLayout.jsx:
```javascript
import UserList from '../pages/admin/user/List';
import UserTambah from '../pages/admin/user/Tambah';
import UserEdit from '../pages/admin/user/Edit';
import UserDetail from '../pages/admin/user/Detail';
import UserRestore from '../pages/admin/user/Restore';

// In render:
{currentPage === 'user-list' && <UserList onNavigate={handleNavigate} />}
{currentPage === 'user-tambah' && <UserTambah onNavigate={handleNavigate} />}
{currentPage === 'user-edit' && <UserEdit onNavigate={handleNavigate} selectedUser={selectedUser} />}
{currentPage === 'user-detail' && <UserDetail onNavigate={handleNavigate} selectedUser={selectedUser} />}
{currentPage === 'user-restore' && <UserRestore onNavigate={handleNavigate} />}
```

## 🎯 Key Features

✅ CRUD Operations (Create, Read, Update, Delete)
✅ Soft Delete with Restore functionality
✅ Search & Filter
✅ Photo upload (URL or File)
✅ Role-based badges
✅ Status management (Active/Inactive)
✅ Responsive design
✅ Form validation
✅ Real-time preview

## 🔮 Future Enhancements (When Backend Ready)

- [ ] API integration
- [ ] Pagination
- [ ] Advanced filters
- [ ] Bulk operations
- [ ] Export to CSV/Excel
- [ ] User activity logs
- [ ] Password management
- [ ] Email verification
- [ ] Role permissions

## 🐛 Known Limitations

- Data stored in localStorage (not persistent across devices)
- No authentication/authorization
- No password field (will be added with backend)
- Photo size not validated (should be max 5MB)
- No email validation (format only)

## 📞 Support

For issues or questions, refer to the main project documentation.
