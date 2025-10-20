// Utility untuk manage studio dan kursi data di localStorage

const STUDIO_KEY = 'cinema_studios';
const KURSI_KEY = 'cinema_kursi';
const DELETED_STUDIO_KEY = 'cinema_studios_deleted';

// Initial dummy data
const INITIAL_STUDIOS = [
  {
    id: '1',
    nama_studio: 'Studio 1',
    tipe: 'reguler',
    kapasitas: 100,
    layout: { rows: 10, cols: 10 },
    status: 'active',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    nama_studio: 'Studio VIP 1',
    tipe: 'vip',
    kapasitas: 50,
    layout: { rows: 5, cols: 10 },
    status: 'active',
    created_at: new Date().toISOString()
  }
];

// Studios
export const getStudios = () => {
  try {
    const stored = localStorage.getItem(STUDIO_KEY);
    if (!stored) {
      localStorage.setItem(STUDIO_KEY, JSON.stringify(INITIAL_STUDIOS));
      return INITIAL_STUDIOS;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading studios:', error);
    return INITIAL_STUDIOS;
  }
};

export const addStudio = (studioData) => {
  try {
    const studios = getStudios();
    const newStudio = {
      ...studioData,
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      created_at: new Date().toISOString()
    };
    studios.push(newStudio);
    localStorage.setItem(STUDIO_KEY, JSON.stringify(studios));
    return newStudio;
  } catch (error) {
    console.error('Error adding studio:', error);
    throw error;
  }
};

export const updateStudio = (id, studioData) => {
  try {
    const studios = getStudios();
    const index = studios.findIndex(s => s.id === id);
    if (index !== -1) {
      studios[index] = {
        ...studios[index],
        ...studioData,
        id,
        updated_at: new Date().toISOString()
      };
      localStorage.setItem(STUDIO_KEY, JSON.stringify(studios));
      return studios[index];
    }
    return null;
  } catch (error) {
    console.error('Error updating studio:', error);
    throw error;
  }
};

export const deleteStudio = (id) => {
  try {
    const studios = getStudios();
    const studio = studios.find(s => s.id === id);
    if (studio) {
      const deleted = getDeletedStudios();
      deleted.push({ ...studio, deletedAt: new Date().toISOString() });
      localStorage.setItem(DELETED_STUDIO_KEY, JSON.stringify(deleted));
      
      // Delete kursi juga
      const kursis = getKursis();
      const filteredKursi = kursis.filter(k => k.studio_id !== id);
      localStorage.setItem(KURSI_KEY, JSON.stringify(filteredKursi));
    }
    const filtered = studios.filter(s => s.id !== id);
    localStorage.setItem(STUDIO_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting studio:', error);
    throw error;
  }
};

export const getStudioById = (id) => {
  try {
    const studios = getStudios();
    return studios.find(s => s.id === id);
  } catch (error) {
    console.error('Error getting studio by id:', error);
    return null;
  }
};

export const getDeletedStudios = () => {
  try {
    const stored = localStorage.getItem(DELETED_STUDIO_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading deleted studios:', error);
    return [];
  }
};

export const restoreStudio = (id) => {
  try {
    const deleted = getDeletedStudios();
    const studio = deleted.find(s => s.id === id);
    if (studio) {
      const studios = getStudios();
      const { deletedAt, ...studioData } = studio;
      studios.push(studioData);
      localStorage.setItem(STUDIO_KEY, JSON.stringify(studios));
      
      const filtered = deleted.filter(s => s.id !== id);
      localStorage.setItem(DELETED_STUDIO_KEY, JSON.stringify(filtered));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error restoring studio:', error);
    throw error;
  }
};

// Kursi Management
export const getKursis = () => {
  try {
    const stored = localStorage.getItem(KURSI_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading kursis:', error);
    return [];
  }
};

export const getKursiByStudio = (studioId) => {
  try {
    const kursis = getKursis();
    return kursis.filter(k => k.studio_id === studioId);
  } catch (error) {
    console.error('Error getting kursi by studio:', error);
    return [];
  }
};

export const generateKursiForStudio = (studioId, rows, cols) => {
  try {
    const newKursis = [];
    for (let i = 0; i < rows; i++) {
      const rowLetter = String.fromCharCode(65 + i);
      for (let j = 0; j < cols; j++) {
        const seatNumber = j + 1;
        const kodeKursi = `${rowLetter}${seatNumber}`;
        newKursis.push({
          id: `${studioId}-${kodeKursi}`,
          studio_id: studioId,
          kode_kursi: kodeKursi,
          status: 'tersedia',
          row: i,
          col: j,
          created_at: new Date().toISOString()
        });
      }
    }
    
    let kursis = getKursis();
    kursis = kursis.filter(k => k.studio_id !== studioId);
    kursis.push(...newKursis);
    localStorage.setItem(KURSI_KEY, JSON.stringify(kursis));
    return newKursis;
  } catch (error) {
    console.error('Error generating kursi:', error);
    throw error;
  }
};

export const updateKursiStatus = (kursiIds, status) => {
  try {
    const kursis = getKursis();
    const updated = kursis.map(k => {
      if (kursiIds.includes(k.id)) {
        return { ...k, status };
      }
      return k;
    });
    localStorage.setItem(KURSI_KEY, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Error updating kursi status:', error);
    throw error;
  }
};

export const deleteKursis = (kursiIds) => {
  try {
    const kursis = getKursis();
    const filtered = kursis.filter(k => !kursiIds.includes(k.id));
    localStorage.setItem(KURSI_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting kursis:', error);
    throw error;
  }
};
