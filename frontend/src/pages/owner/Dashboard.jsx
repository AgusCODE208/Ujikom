import React, { useState, useEffect } from 'react';
import { 
  DollarSign, Ticket, Users, Film, ArrowUpRight, Calendar
} from 'lucide-react';
import { getTransaksi } from '../../utils/transaksiStorage';
import { getFilms } from '../../utils/filmStorage';
import { getStudios } from '../../utils/studioStorage';
import { getUsers } from '../../utils/userStorage';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [films, setFilms] = useState([]);
  const [studios, setStudios] = useState([]);
  const [users, setUsers] = useState([]);
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setTransactions(getTransaksi());
    setFilms(getFilms());
    setStudios(getStudios());
    setUsers(getUsers());
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const getAvailableYears = () => {
    if (transactions.length === 0) return [new Date().getFullYear()];
    const years = transactions.map(t => new Date(t.created_at).getFullYear());
    return [...new Set(years)].sort((a, b) => b - a);
  };

  const getFilteredTransactions = () => {
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

  const getPeriodLabel = () => {
    if (filterPeriod === 'today') return 'Hari Ini';
    if (filterPeriod === 'month') return 'Bulan Ini';
    if (filterPeriod === 'custom') return `${months[selectedMonth]} ${selectedYear}`;
    return 'Semua Waktu';
  };

  const filteredTransactions = getFilteredTransactions();

  // Calculate stats
  const totalRevenue = filteredTransactions.reduce((sum, t) => sum + (t.total_harga || 0), 0);
  const todayRevenue = transactions
    .filter(t => new Date(t.created_at).toISOString().split('T')[0] === today)
    .reduce((sum, t) => sum + (t.total_harga || 0), 0);

  const totalTransactions = filteredTransactions.length;
  const todayTransactions = transactions.filter(t => 
    new Date(t.created_at).toISOString().split('T')[0] === today
  ).length;

  const totalUsers = users.length;
  const newUsersThisMonth = users.filter(u => {
    const userDate = new Date(u.created_at || Date.now());
    return userDate.getMonth() === currentMonth && userDate.getFullYear() === currentYear;
  }).length;

  const activeFilms = films.filter(f => f.status === 'now_playing' && f.publishStatus === 'publish').length;

  // Top 5 Films
  const filmStats = films.map(film => {
    const filmTransactions = filteredTransactions.filter(t => t.film_id == film.id);
    const revenue = filmTransactions.reduce((sum, t) => sum + (t.total_harga || 0), 0);
    const tickets = filmTransactions.reduce((sum, t) => sum + (t.jumlah_tiket || 0), 0);
    return { ...film, revenue, tickets };
  }).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

  // Studio Performance
  const studioStats = studios.map(studio => {
    const studioTransactions = filteredTransactions.filter(t => t.studio === studio.nama_studio);
    const revenue = studioTransactions.reduce((sum, t) => sum + (t.total_harga || 0), 0);
    const totalSeats = studioTransactions.reduce((sum, t) => sum + (t.jumlah_tiket || 0), 0);
    const occupancy = studio.kapasitas > 0 ? Math.round((totalSeats / studio.kapasitas) * 100) : 0;
    return { ...studio, revenue, occupancy };
  });

  // Revenue Trend (Last 7 days)
  const revenueTrend = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const dayRevenue = transactions
      .filter(t => new Date(t.created_at).toISOString().split('T')[0] === dateStr)
      .reduce((sum, t) => sum + (t.total_harga || 0), 0);
    revenueTrend.push({
      date: date.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }),
      revenue: dayRevenue
    });
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('id-ID').format(num);
  };

  return (
    <div className="space-y-8">
      {/* Filter Period */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="min-w-0">
          <h2 className="text-base sm:text-lg md:text-xl font-bold truncate">Periode: {getPeriodLabel()}</h2>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <button
            onClick={() => setFilterPeriod('today')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition ${
              filterPeriod === 'today' ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Hari Ini
          </button>
          <button
            onClick={() => setFilterPeriod('month')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition ${
              filterPeriod === 'month' ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Bulan Ini
          </button>
          <button
            onClick={() => setFilterPeriod('custom')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition ${
              filterPeriod === 'custom' ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Pilih Periode
          </button>
          <button
            onClick={() => setFilterPeriod('all')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition ${
              filterPeriod === 'all' ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Semua
          </button>
        </div>
      </div>

      {/* Custom Month/Year Selector */}
      {filterPeriod === 'custom' && (
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Calendar className="w-5 h-5 text-red-500" />
            <h3 className="text-base sm:text-lg font-bold">Pilih Bulan & Tahun</h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 w-full sm:min-w-[200px]">
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
            <div className="flex-1 w-full sm:min-w-[200px]">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Revenue Card */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-600 rounded-lg">
              <DollarSign className="w-6 h-6" />
            </div>
            <div className="flex items-center text-green-500 text-sm">
              <ArrowUpRight className="w-4 h-4" />
              <span>Live</span>
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold mb-1 break-words">{formatCurrency(totalRevenue)}</div>
          <div className="text-gray-400 text-sm">Total Revenue</div>
          <div className="mt-3 text-xs text-gray-500">
            {formatCurrency(todayRevenue)} hari ini
          </div>
        </div>

        {/* Transactions Card */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Ticket className="w-6 h-6" />
            </div>
            <div className="flex items-center text-green-500 text-sm">
              <ArrowUpRight className="w-4 h-4" />
              <span>+{todayTransactions}</span>
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold mb-1">{formatNumber(totalTransactions)}</div>
          <div className="text-gray-400 text-sm">Total Transaksi</div>
          <div className="mt-3 text-xs text-green-500">
            +{todayTransactions} hari ini
          </div>
        </div>

        {/* Users Card */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-600 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex items-center text-green-500 text-sm">
              <ArrowUpRight className="w-4 h-4" />
              <span>+{newUsersThisMonth}</span>
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold mb-1">{formatNumber(totalUsers)}</div>
          <div className="text-gray-400 text-sm">Total Users</div>
          <div className="mt-3 text-xs text-gray-500">
            +{newUsersThisMonth} bulan ini
          </div>
        </div>

        {/* Films Card */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-600 rounded-lg">
              <Film className="w-6 h-6" />
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <span>Stable</span>
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold mb-1">{films.length}</div>
          <div className="text-gray-400 text-sm">Total Film</div>
          <div className="mt-3 text-xs text-gray-500">
            {activeFilms} sedang tayang
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Revenue Trend (7 Hari)</h3>
          <div className="space-y-2">
            {revenueTrend.map((item, index) => {
              const maxRevenue = Math.max(...revenueTrend.map(r => r.revenue), 1);
              const percentage = (item.revenue / maxRevenue) * 100;
              return (
                <div key={`trend-${index}`} className="flex items-center space-x-3">
                  <div className="w-12 sm:w-16 text-xs sm:text-sm text-gray-400">{item.date}</div>
                  <div className="flex-1">
                    <div className="h-8 bg-gray-700 rounded-lg overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-end px-3"
                        style={{ width: `${percentage}%` }}
                      >
                        {item.revenue > 0 && percentage > 30 && (
                          <span className="text-xs font-semibold hidden sm:inline">{formatCurrency(item.revenue)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Studio Performance */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Studio Performance</h3>
          <div className="space-y-4">
            {studioStats.map(studio => (
              <div key={`studio-${studio.id}`} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-semibold text-sm sm:text-base">{studio.nama_studio}</div>
                    <div className="text-xs sm:text-sm text-gray-400 capitalize">{studio.tipe} • {studio.kapasitas} kursi</div>
                  </div>
                  <div className="text-right">
                    <div className="text-base sm:text-lg font-bold text-green-500">{studio.occupancy}%</div>
                    <div className="text-xs text-gray-400">Occupancy</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-gray-400">Revenue</span>
                  <span className="font-semibold break-words">{formatCurrency(studio.revenue)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Films Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-4 sm:p-6 border-b border-gray-700 flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-bold">Top 5 Film Terlaris</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold">Rank</th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold">Film</th>
                <th className="px-3 sm:px-6 py-3 text-right text-xs sm:text-sm font-semibold">Revenue</th>
                <th className="px-3 sm:px-6 py-3 text-right text-xs sm:text-sm font-semibold hidden sm:table-cell">Tiket</th>
                <th className="px-3 sm:px-6 py-3 text-right text-xs sm:text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filmStats.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-3 sm:px-6 py-8 text-center text-gray-400 text-sm">
                    Belum ada data transaksi film
                  </td>
                </tr>
              ) : (
                filmStats.map((film, index) => (
                  <tr key={`film-${film.id}`} className="border-t border-gray-700 hover:bg-gray-750">
                    <td className="px-3 sm:px-6 py-4">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-700 rounded-full flex items-center justify-center font-bold text-xs sm:text-base">
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 font-semibold text-sm sm:text-base">{film.judul}</td>
                    <td className="px-3 sm:px-6 py-4 text-right text-green-500 font-semibold text-xs sm:text-base break-words">
                      {formatCurrency(film.revenue)}
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-right text-sm hidden sm:table-cell">{formatNumber(film.tickets)}</td>
                    <td className="px-3 sm:px-6 py-4 text-right">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                        film.status === 'now_playing' ? 'bg-green-600' :
                        film.status === 'coming_soon' ? 'bg-yellow-600' : 'bg-gray-600'
                      }`}>
                        {film.status === 'now_playing' ? 'Tayang' : 
                         film.status === 'coming_soon' ? 'Segera' : 'Selesai'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
