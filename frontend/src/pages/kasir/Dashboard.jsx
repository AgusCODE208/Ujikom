import React, { useState, useEffect } from 'react';
import { ShoppingCart, DollarSign, Ticket, Film, Calendar, Printer, TrendingUp } from 'lucide-react';
import { getFilms } from '../../utils/filmStorage';
import { getJadwals } from '../../utils/jadwalStorage';
import { getTransaksi } from '../../utils/transaksiStorage';

const Dashboard = ({ onNavigate }) => {
  const [films, setFilms] = useState([]);
  const [jadwals, setJadwals] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filterPeriod, setFilterPeriod] = useState('today'); // today, month, custom, all
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setFilms(getFilms());
    setJadwals(getJadwals());
    setTransactions(getTransaksi());
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const todayJadwals = jadwals.filter(j => j.tanggal === today);

  const getFilteredTransactions = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    if (filterPeriod === 'today') {
      return transactions.filter(t => {
        const trxDate = new Date(t.created_at).toISOString().split('T')[0];
        return trxDate === today;
      });
    } else if (filterPeriod === 'month') {
      return transactions.filter(t => {
        const trxDate = new Date(t.created_at);
        return trxDate.getMonth() === currentMonth && trxDate.getFullYear() === currentYear;
      });
    } else if (filterPeriod === 'custom') {
      return transactions.filter(t => {
        const trxDate = new Date(t.created_at);
        return trxDate.getMonth() === selectedMonth && trxDate.getFullYear() === selectedYear;
      });
    }
    return transactions;
  };

  const getAvailableYears = () => {
    if (transactions.length === 0) return [new Date().getFullYear()];
    const years = transactions.map(t => new Date(t.created_at).getFullYear());
    return [...new Set(years)].sort((a, b) => b - a);
  };

  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const filteredTransactions = getFilteredTransactions();

  const stats = {
    transaksi: filteredTransactions.length,
    pendapatan: filteredTransactions.reduce((sum, t) => sum + (t.total_harga || 0), 0),
    tiket_terjual: filteredTransactions.reduce((sum, t) => sum + (t.jumlah_tiket || 0), 0),
    film_tayang: todayJadwals.length
  };

  const getPeriodLabel = () => {
    if (filterPeriod === 'today') return 'Hari Ini';
    if (filterPeriod === 'month') return 'Bulan Ini';
    if (filterPeriod === 'custom') return `${months[selectedMonth]} ${selectedYear}`;
    return 'Semua Waktu';
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard Kasir</h1>
          <p className="text-gray-400">Selamat datang! Berikut ringkasan {getPeriodLabel().toLowerCase()}</p>
        </div>
        
        {/* Filter Period */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterPeriod('today')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filterPeriod === 'today' ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Hari Ini
          </button>
          <button
            onClick={() => setFilterPeriod('month')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filterPeriod === 'month' ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Bulan Ini
          </button>
          <button
            onClick={() => setFilterPeriod('custom')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filterPeriod === 'custom' ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Pilih Bulan
          </button>
          <button
            onClick={() => setFilterPeriod('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filterPeriod === 'all' ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Semua
          </button>
        </div>
      </div>

      {/* Custom Month/Year Selector */}
      {filterPeriod === 'custom' && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Pilih Periode</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium mb-2 text-gray-400">Bulan</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              >
                {months.map((month, index) => (
                  <option key={`month-${index}`} value={index}>{month}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium mb-2 text-gray-400">Tahun</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              >
                {getAvailableYears().map((year) => (
                  <option key={`year-${year}`} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <ShoppingCart className="w-10 h-10 text-white opacity-80" />
            <div className="text-right">
              <p className="text-blue-100 text-sm">Transaksi</p>
              <p className="text-3xl font-bold text-white">{stats.transaksi}</p>
            </div>
          </div>
          <p className="text-blue-100 text-sm">{getPeriodLabel()}</p>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-10 h-10 text-white opacity-80" />
            <div className="text-right">
              <p className="text-green-100 text-sm">Pendapatan</p>
              <p className="text-2xl font-bold text-white">{formatRupiah(stats.pendapatan)}</p>
            </div>
          </div>
          <p className="text-green-100 text-sm">{getPeriodLabel()}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Ticket className="w-10 h-10 text-white opacity-80" />
            <div className="text-right">
              <p className="text-purple-100 text-sm">Tiket Terjual</p>
              <p className="text-3xl font-bold text-white">{stats.tiket_terjual}</p>
            </div>
          </div>
          <p className="text-purple-100 text-sm">{getPeriodLabel()}</p>
        </div>

        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <Film className="w-10 h-10 text-white opacity-80" />
            <div className="text-right">
              <p className="text-red-100 text-sm">Film Tayang</p>
              <p className="text-3xl font-bold text-white">{stats.film_tayang}</p>
            </div>
          </div>
          <p className="text-red-100 text-sm">Jadwal hari ini</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => onNavigate('transaksi')}
            className="flex flex-col items-center justify-center p-6 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
          >
            <ShoppingCart className="w-8 h-8 text-red-500 mb-2" />
            <span className="text-white font-medium">Jual Tiket</span>
          </button>
          <button 
            onClick={() => onNavigate('jadwal')}
            className="flex flex-col items-center justify-center p-6 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
          >
            <Calendar className="w-8 h-8 text-blue-500 mb-2" />
            <span className="text-white font-medium">Lihat Jadwal</span>
          </button>
          <button className="flex flex-col items-center justify-center p-6 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
            <Printer className="w-8 h-8 text-green-500 mb-2" />
            <span className="text-white font-medium">Cetak Ulang</span>
          </button>
          <button 
            onClick={() => onNavigate('laporan')}
            className="flex flex-col items-center justify-center p-6 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
          >
            <TrendingUp className="w-8 h-8 text-yellow-500 mb-2" />
            <span className="text-white font-medium">Laporan</span>
          </button>
        </div>
      </div>

      {/* Jadwal Hari Ini */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Jadwal Hari Ini</h2>
        {todayJadwals.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Tidak ada jadwal untuk hari ini</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todayJadwals.slice(0, 6).map((jadwal) => {
              const film = films.find(f => f.id === jadwal.film_id);
              return (
                <div key={`jadwal-${jadwal.id}`} className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition">
                  <div className="flex items-center space-x-3 mb-3">
                    {film?.poster && (
                      <img src={film.poster} alt={film.judul} className="w-12 h-16 object-cover rounded" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold truncate">{film?.judul || 'Film'}</p>
                      <p className="text-xs text-gray-400">{film?.genre}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-300">
                    <p>🕐 {jadwal.jam_mulai} - {jadwal.jam_selesai}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
