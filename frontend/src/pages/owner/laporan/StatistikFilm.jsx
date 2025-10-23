import React, { useState, useEffect } from 'react';
import { Star, Eye } from 'lucide-react';
import { getFilms } from '../../../utils/filmStorage';
import { getTransaksi } from '../../../utils/transaksiStorage';

const StatistikFilm = () => {
  const [films, setFilms] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setFilms(getFilms());
    setTransactions(getTransaksi());
  }, []);

  const filmStats = films.map(film => {
    const filmTrx = transactions.filter(t => t.film_id == film.id);
    const totalTransaksi = filmTrx.length;
    const totalTiket = filmTrx.reduce((sum, t) => sum + (t.jumlah_tiket || 0), 0);
    const revenue = filmTrx.reduce((sum, t) => sum + (t.total_harga || 0), 0);
    const avgOccupancy = totalTiket > 0 ? Math.round((totalTiket / (totalTransaksi * 10)) * 100) : 0;
    
    return {
      ...film,
      totalTransaksi,
      totalTiket,
      revenue,
      avgOccupancy
    };
  }).filter(f => f.totalTransaksi > 0);

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
    <div className="space-y-6">
      {filmStats.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-12 text-center border border-gray-700">
          <p className="text-gray-400">Belum ada data statistik film</p>
        </div>
      ) : (
        filmStats.map(film => (
          <div key={`film-stat-${film.id}`} className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6">
              <img src={film.poster} alt={film.judul} className="w-full sm:w-32 h-48 object-cover rounded-lg" />
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{film.judul}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>{film.genre}</span>
                      <span>•</span>
                      <span>{film.durasi} min</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span>{film.rating || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="text-gray-400 text-sm mb-1">Total Transaksi</div>
                    <div className="text-lg sm:text-xl md:text-2xl font-bold">{formatNumber(film.totalTransaksi)}</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="text-gray-400 text-sm mb-1">Tiket Terjual</div>
                    <div className="text-lg sm:text-xl md:text-2xl font-bold">{formatNumber(film.totalTiket)}</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="text-gray-400 text-sm mb-1">Revenue</div>
                    <div className="text-base sm:text-lg md:text-xl font-bold text-green-500 break-words">{formatCurrency(film.revenue)}</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="text-gray-400 text-sm mb-1">Avg Occupancy</div>
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-500">{film.avgOccupancy}%</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-400">Status: <strong className="capitalize">{film.status.replace('_', ' ')}</strong></span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default StatistikFilm;
