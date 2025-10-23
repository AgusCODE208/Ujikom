import React, { useState, useEffect } from 'react';
import { Download, ArrowUpRight, Plus } from 'lucide-react';
import { getTransaksi } from '../../../utils/transaksiStorage';

const LaporanKeuangan = () => {
  const [transactions, setTransactions] = useState([]);
  const [filterPeriod, setFilterPeriod] = useState('month');

  useEffect(() => {
    setTransactions(getTransaksi());
  }, []);

  const getFilteredTransactions = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    if (filterPeriod === 'month') {
      return transactions.filter(t => {
        const trxDate = new Date(t.created_at);
        return trxDate.getMonth() === currentMonth && trxDate.getFullYear() === currentYear;
      });
    }
    return transactions;
  };

  const filteredTransactions = getFilteredTransactions();
  
  const pemasukan = filteredTransactions.reduce((sum, t) => sum + (t.total_harga || 0), 0);
  const pengeluaran = pemasukan * 0.27; // Estimasi 27% untuk operasional
  const laba = pemasukan - pengeluaran;
  const margin = pemasukan > 0 ? ((laba / pemasukan) * 100).toFixed(1) : 0;

  const detailPemasukan = [
    { kategori: 'Penjualan Tiket', jumlah: pemasukan, persentase: 100 }
  ];

  const detailPengeluaran = [
    { kategori: 'Gaji Karyawan', jumlah: pengeluaran * 0.65, persentase: 65 },
    { kategori: 'Operasional', jumlah: pengeluaran * 0.20, persentase: 20 },
    { kategori: 'Maintenance', jumlah: pengeluaran * 0.15, persentase: 15 }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex items-center justify-between">
        <select 
          value={filterPeriod}
          onChange={(e) => setFilterPeriod(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
        >
          <option value="month">Bulan Ini</option>
          <option value="all">Semua Waktu</option>
        </select>
        <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition">
          <Download className="w-4 h-4" />
          <span>Export PDF</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-gray-400 text-sm mb-2">Total Pemasukan</div>
          <div className="text-xl sm:text-2xl font-bold text-green-500 mb-1 break-words">
            {formatCurrency(pemasukan)}
          </div>
          <div className="flex items-center text-green-500 text-sm">
            <ArrowUpRight className="w-4 h-4" />
            <span>Live Data</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-gray-400 text-sm mb-2">Total Pengeluaran</div>
          <div className="text-xl sm:text-2xl font-bold text-red-500 mb-1 break-words">
            {formatCurrency(pengeluaran)}
          </div>
          <div className="flex items-center text-red-500 text-sm">
            <ArrowUpRight className="w-4 h-4" />
            <span>Estimasi</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-gray-400 text-sm mb-2">Laba Bersih</div>
          <div className="text-xl sm:text-2xl font-bold text-blue-500 mb-1 break-words">
            {formatCurrency(laba)}
          </div>
          <div className="flex items-center text-green-500 text-sm">
            <ArrowUpRight className="w-4 h-4" />
            <span>Profit</span>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="text-gray-400 text-sm mb-2">Margin Profit</div>
          <div className="text-xl sm:text-2xl font-bold text-purple-500 mb-1">
            {margin}%
          </div>
          <div className="flex items-center text-green-500 text-sm">
            <ArrowUpRight className="w-4 h-4" />
            <span>Healthy</span>
          </div>
        </div>
      </div>

      {/* Detail Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pemasukan */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-4 sm:p-6 border-b border-gray-700">
            <h3 className="text-lg sm:text-xl font-bold">Detail Pemasukan</h3>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            {detailPemasukan.map((item, index) => (
              <div key={`income-${index}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">{item.kategori}</span>
                  <span className="font-bold text-green-500 text-sm sm:text-base break-words">{formatCurrency(item.jumlah)}</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-600"
                    style={{ width: `${item.persentase}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">{item.persentase}% dari total</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pengeluaran */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-4 sm:p-6 border-b border-gray-700 flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-bold">Detail Pengeluaran</h3>
            <button className="flex items-center space-x-1 text-sm text-blue-500 hover:text-blue-400">
              <Plus className="w-4 h-4" />
              <span>Tambah</span>
            </button>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            {detailPengeluaran.map((item, index) => (
              <div key={`expense-${index}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">{item.kategori}</span>
                  <span className="font-bold text-red-500 text-sm sm:text-base break-words">{formatCurrency(item.jumlah)}</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-600"
                    style={{ width: `${item.persentase}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">{item.persentase}% dari total</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaporanKeuangan;
