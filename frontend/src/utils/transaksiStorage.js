// Utility untuk manage transaksi kasir di localStorage

const STORAGE_KEY = 'cinema_transaksi_kasir';

export const getTransaksi = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading transaksi:', error);
    return [];
  }
};

export const addTransaksi = (transaksiData) => {
  try {
    const transaksi = getTransaksi();
    const newTransaksi = {
      ...transaksiData,
      id: `TRX${Date.now()}`
    };
    transaksi.push(newTransaksi);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transaksi));
    return newTransaksi;
  } catch (error) {
    console.error('Error adding transaksi:', error);
    throw error;
  }
};

export const generateKodeBooking = () => {
  const timestamp = Date.now().toString().slice(-6);
  return `KSR${timestamp}`;
};

export const getTransaksiById = (id) => {
  const transaksi = getTransaksi();
  return transaksi.find(t => t.id === id);
};

export const updateTransaksi = (id, data) => {
  try {
    const transaksi = getTransaksi();
    const index = transaksi.findIndex(t => t.id === id);
    if (index !== -1) {
      transaksi[index] = { ...transaksi[index], ...data };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transaksi));
      return transaksi[index];
    }
    return null;
  } catch (error) {
    console.error('Error updating transaksi:', error);
    throw error;
  }
};
