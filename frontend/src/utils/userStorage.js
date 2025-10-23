// Utility untuk manage user data di localStorage

const STORAGE_KEY = 'cinema_users';
const DELETED_KEY = 'cinema_users_deleted';

// Initial dummy data
const INITIAL_USERS = [
  {
    id: '1',
    nama: 'Admin User',
    email: 'admin@cinema.com',
    telepon: '081234567890',
    alamat: 'Jakarta, Indonesia',
    role: 'admin',
    foto: '',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    nama: 'Owner Cinema',
    email: 'owner@cinema.com',
    telepon: '081234567891',
    alamat: 'Jakarta, Indonesia',
    role: 'owner',
    foto: '',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    nama: 'Kasir Cinema',
    email: 'kasir@cinema.com',
    telepon: '081234567892',
    alamat: 'Jakarta, Indonesia',
    role: 'kasir',
    foto: '',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    nama: 'John Doe',
    email: 'john@example.com',
    telepon: '081234567893',
    alamat: 'Bandung, Indonesia',
    role: 'user',
    foto: '',
    created_at: new Date().toISOString()
  }
];

export const getUsers = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_USERS));
      return INITIAL_USERS;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading users:', error);
    return INITIAL_USERS;
  }
};

export const addUser = (userData) => {
  try {
    if (!userData.nama || !userData.email) {
      throw new Error('Nama dan email wajib diisi');
    }
    const users = getUsers();
    const newUser = {
      ...userData,
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      created_at: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    return newUser;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

export const updateUser = (id, userData) => {
  try {
    const users = getUsers();
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users[index] = {
        ...users[index],
        ...userData,
        id
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
      return users[index];
    }
    return null;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = (id) => {
  try {
    const users = getUsers();
    const user = users.find(u => u.id === id);
    if (user) {
      // Save to deleted storage
      const deleted = getDeletedUsers();
      deleted.push({ ...user, deletedAt: new Date().toISOString() });
      localStorage.setItem(DELETED_KEY, JSON.stringify(deleted));
    }
    const filtered = users.filter(u => u.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const getUserById = (id) => {
  try {
    const users = getUsers();
    return users.find(u => u.id === id);
  } catch (error) {
    console.error('Error getting user by id:', error);
    return null;
  }
};

export const getDeletedUsers = () => {
  try {
    const stored = localStorage.getItem(DELETED_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading deleted users:', error);
    return [];
  }
};

export const restoreUser = (id) => {
  try {
    const deleted = getDeletedUsers();
    const user = deleted.find(u => u.id === id);
    if (user) {
      const users = getUsers();
      const { deletedAt, ...userData } = user;
      users.push(userData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
      
      const filtered = deleted.filter(u => u.id !== id);
      localStorage.setItem(DELETED_KEY, JSON.stringify(filtered));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error restoring user:', error);
    throw error;
  }
};
