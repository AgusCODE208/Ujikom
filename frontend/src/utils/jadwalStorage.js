const JADWAL_KEY = 'cinema_jadwal';
const DELETED_JADWAL_KEY = 'cinema_jadwal_deleted';

const INITIAL_JADWAL = [
  {
    id: '1',
    film_id: 1,
    studio_id: '1',
    tanggal: '2025-02-15',
    jam_mulai: '13:00',
    jam_selesai: '15:30',
    harga_id: '1',
    status: 'available',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    film_id: 1,
    studio_id: '1',
    tanggal: '2025-02-15',
    jam_mulai: '16:00',
    jam_selesai: '18:30',
    harga_id: '1',
    status: 'available',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    film_id: 2,
    studio_id: '2',
    tanggal: '2025-02-16',
    jam_mulai: '14:00',
    jam_selesai: '16:00',
    harga_id: '3',
    status: 'available',
    created_at: new Date().toISOString()
  }
];

export const getJadwals = () => {
  try {
    const stored = localStorage.getItem(JADWAL_KEY);
    if (!stored) {
      localStorage.setItem(JADWAL_KEY, JSON.stringify(INITIAL_JADWAL));
      return INITIAL_JADWAL;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading jadwals:', error);
    return INITIAL_JADWAL;
  }
};

// Alias untuk konsistensi
export const getJadwal = getJadwals;

export const addJadwal = (jadwalData) => {
  try {
    const jadwals = getJadwals();
    const newJadwal = {
      ...jadwalData,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    jadwals.push(newJadwal);
    localStorage.setItem(JADWAL_KEY, JSON.stringify(jadwals));
    return newJadwal;
  } catch (error) {
    console.error('Error adding jadwal:', error);
    throw error;
  }
};

export const updateJadwal = (id, jadwalData) => {
  try {
    const jadwals = getJadwals();
    const index = jadwals.findIndex(j => j.id === id);
    if (index !== -1) {
      jadwals[index] = {
        ...jadwals[index],
        ...jadwalData,
        updated_at: new Date().toISOString()
      };
      localStorage.setItem(JADWAL_KEY, JSON.stringify(jadwals));
      return jadwals[index];
    }
    return null;
  } catch (error) {
    console.error('Error updating jadwal:', error);
    throw error;
  }
};

export const deleteJadwal = (id) => {
  try {
    const jadwals = getJadwals();
    const jadwal = jadwals.find(j => j.id === id);
    if (jadwal) {
      const deleted = getDeletedJadwals();
      deleted.push({ ...jadwal, deletedAt: new Date().toISOString() });
      localStorage.setItem(DELETED_JADWAL_KEY, JSON.stringify(deleted));
    }
    const filtered = jadwals.filter(j => j.id !== id);
    localStorage.setItem(JADWAL_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting jadwal:', error);
    throw error;
  }
};

export const getDeletedJadwals = () => {
  try {
    const stored = localStorage.getItem(DELETED_JADWAL_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading deleted jadwals:', error);
    return [];
  }
};

export const restoreJadwal = (id) => {
  try {
    const deleted = getDeletedJadwals();
    const jadwal = deleted.find(j => j.id === id);
    if (jadwal) {
      const jadwals = getJadwals();
      const { deletedAt, ...jadwalData } = jadwal;
      jadwals.push(jadwalData);
      localStorage.setItem(JADWAL_KEY, JSON.stringify(jadwals));
      
      const filtered = deleted.filter(j => j.id !== id);
      localStorage.setItem(DELETED_JADWAL_KEY, JSON.stringify(filtered));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error restoring jadwal:', error);
    throw error;
  }
};

export const calculateJamSelesai = (jamMulai, durasi) => {
  const [hours, minutes] = jamMulai.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + durasi;
  const endHours = Math.floor(totalMinutes / 60);
  const endMinutes = totalMinutes % 60;
  return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
};

export const checkJadwalConflict = (studioId, tanggal, jamMulai, jamSelesai, excludeId = null) => {
  const jadwals = getJadwals();
  return jadwals.find(j => 
    j.id != excludeId &&
    j.studio_id == studioId &&
    j.tanggal === tanggal &&
    ((jamMulai >= j.jam_mulai && jamMulai < j.jam_selesai) ||
     (jamSelesai > j.jam_mulai && jamSelesai <= j.jam_selesai) ||
     (jamMulai <= j.jam_mulai && jamSelesai >= j.jam_selesai))
  );
};
