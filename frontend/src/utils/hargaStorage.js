const HARGA_KEY = 'cinema_harga_tiket';
const DELETED_HARGA_KEY = 'cinema_harga_tiket_deleted';

const INITIAL_HARGA = [
  {
    id: '1',
    tipe: 'weekday_reguler',
    harga: 35000,
    keterangan: 'Weekday - Studio Reguler',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    tipe: 'weekend_reguler',
    harga: 50000,
    keterangan: 'Weekend - Studio Reguler',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    tipe: 'weekday_vip',
    harga: 75000,
    keterangan: 'Weekday - Studio VIP',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    tipe: 'weekend_vip',
    harga: 100000,
    keterangan: 'Weekend - Studio VIP',
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    tipe: 'weekday_imax',
    harga: 85000,
    keterangan: 'Weekday - Studio IMAX',
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    tipe: 'weekend_imax',
    harga: 120000,
    keterangan: 'Weekend - Studio IMAX',
    created_at: new Date().toISOString()
  }
];

export const getHargaTikets = () => {
  try {
    const stored = localStorage.getItem(HARGA_KEY);
    if (!stored) {
      localStorage.setItem(HARGA_KEY, JSON.stringify(INITIAL_HARGA));
      return INITIAL_HARGA;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading harga tiket:', error);
    return INITIAL_HARGA;
  }
};

export const addHargaTiket = (hargaData) => {
  try {
    const hargas = getHargaTikets();
    const newHarga = {
      ...hargaData,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    hargas.push(newHarga);
    localStorage.setItem(HARGA_KEY, JSON.stringify(hargas));
    return newHarga;
  } catch (error) {
    console.error('Error adding harga tiket:', error);
    throw error;
  }
};

export const updateHargaTiket = (id, hargaData) => {
  try {
    const hargas = getHargaTikets();
    const index = hargas.findIndex(h => h.id === id);
    if (index !== -1) {
      hargas[index] = {
        ...hargas[index],
        ...hargaData,
        updated_at: new Date().toISOString()
      };
      localStorage.setItem(HARGA_KEY, JSON.stringify(hargas));
      return hargas[index];
    }
    return null;
  } catch (error) {
    console.error('Error updating harga tiket:', error);
    throw error;
  }
};

export const deleteHargaTiket = (id) => {
  try {
    const hargas = getHargaTikets();
    const harga = hargas.find(h => h.id === id);
    if (harga) {
      const deleted = getDeletedHargaTikets();
      deleted.push({ ...harga, deletedAt: new Date().toISOString() });
      localStorage.setItem(DELETED_HARGA_KEY, JSON.stringify(deleted));
    }
    const filtered = hargas.filter(h => h.id !== id);
    localStorage.setItem(HARGA_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting harga tiket:', error);
    throw error;
  }
};

export const getDeletedHargaTikets = () => {
  try {
    const stored = localStorage.getItem(DELETED_HARGA_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading deleted harga tiket:', error);
    return [];
  }
};

export const restoreHargaTiket = (id) => {
  try {
    const deleted = getDeletedHargaTikets();
    const harga = deleted.find(h => h.id === id);
    if (harga) {
      const hargas = getHargaTikets();
      const { deletedAt, ...hargaData } = harga;
      hargas.push(hargaData);
      localStorage.setItem(HARGA_KEY, JSON.stringify(hargas));
      
      const filtered = deleted.filter(h => h.id !== id);
      localStorage.setItem(DELETED_HARGA_KEY, JSON.stringify(filtered));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error restoring harga tiket:', error);
    throw error;
  }
};
