import React, { useState, useEffect } from 'react';
import { Film, Ticket, DollarSign, Users, TrendingUp, Plus, Calendar, Star } from 'lucide-react';
import { getFilms } from '../../utils/filmStorage';

const STATS = {
  totalFilms: 15,
  nowPlaying: 8,
  comingSoon: 5,
  ended: 2,
  totalRevenue: 45750000,
  todayRevenue: 3250000,
  totalTransactions: 1234,
  todayTransactions: 48
};



const Dashboard = ({ onNavigate }) => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    setFilms(getFilms());
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-600 rounded-lg">
              <Film className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold mb-1">{STATS.totalFilms}</div>
          <div className="text-gray-400 text-sm">Total Film</div>
          <div className="mt-3 text-xs text-gray-500">
            {STATS.nowPlaying} Now Playing • {STATS.comingSoon} Coming Soon
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Ticket className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold mb-1">{STATS.totalTransactions}</div>
          <div className="text-gray-400 text-sm">Total Transaksi</div>
          <div className="mt-3 text-xs text-green-500">
            +{STATS.todayTransactions} hari ini
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-600 rounded-lg">
              <DollarSign className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-2xl font-bold mb-1">{formatCurrency(STATS.totalRevenue)}</div>
          <div className="text-gray-400 text-sm">Total Revenue</div>
          <div className="mt-3 text-xs text-gray-500">
            {formatCurrency(STATS.todayRevenue)} hari ini
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-600 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold mb-1">2,847</div>
          <div className="text-gray-400 text-sm">Total Users</div>
          <div className="mt-3 text-xs text-green-500">
            +127 bulan ini
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('film-tambah')}
              className="w-full flex items-center space-x-3 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition"
            >
              <Plus className="w-5 h-5" />
              <span>Tambah Film Baru</span>
            </button>
            <button
              onClick={() => onNavigate('jadwal-tambah')}
              className="w-full flex items-center space-x-3 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
            >
              <Calendar className="w-5 h-5" />
              <span>Buat Jadwal Baru</span>
            </button>
            <button className="w-full flex items-center space-x-3 px-4 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition">
              <Ticket className="w-5 h-5" />
              <span>Lihat Transaksi Pending</span>
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Film Now Playing</h3>
          <div className="space-y-3">
            {films.filter(f => f.status === 'now_playing').slice(0, 3).map(film => (
              <div key={film.id} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                <img src={film.poster} alt={film.judul} className="w-12 h-16 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold">{film.judul}</div>
                  <div className="text-sm text-gray-400">{film.genre}</div>
                </div>
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm">{film.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
