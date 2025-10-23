import React, { useState, useEffect } from 'react';
import { getStudios } from '../../../utils/studioStorage';
import { getTransaksi } from '../../../utils/transaksiStorage';

const StatistikStudio = () => {
  const [studios, setStudios] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setStudios(getStudios());
    setTransactions(getTransaksi());
  }, []);

  const studioStats = studios.map(studio => {
    const studioTrx = transactions.filter(t => t.studio === studio.nama_studio);
    const totalShowtime = studioTrx.length;
    const totalTiket = studioTrx.reduce((sum, t) => sum + (t.jumlah_tiket || 0), 0);
    const revenue = studioTrx.reduce((sum, t) => sum + (t.total_harga || 0), 0);
    const occupancyRate = studio.kapasitas > 0 ? Math.round((totalTiket / (totalShowtime * studio.kapasitas)) * 100) : 0;
    
    return {
      ...studio,
      totalShowtime,
      totalTiket,
      revenue,
      occupancyRate
    };
  });

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
      {studioStats.map(studio => (
        <div key={`studio-stat-${studio.id}`} className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-4 sm:p-6 border-b border-gray-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold">{studio.nama_studio}</h3>
              <div className="text-sm text-gray-400 mt-1 capitalize">
                {studio.tipe} • Kapasitas: {studio.kapasitas} kursi
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl sm:text-3xl font-bold text-green-500">{studio.occupancyRate}%</div>
              <div className="text-sm text-gray-400">Occupancy Rate</div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">Total Showtime</div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold">{studio.totalShowtime}</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">Total Tiket</div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold">{formatNumber(studio.totalTiket)}</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">Revenue</div>
                <div className="text-base sm:text-lg md:text-xl font-bold text-green-500 break-words">{formatCurrency(studio.revenue)}</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-gray-400 text-sm mb-1">Avg per Show</div>
                <div className="text-base sm:text-lg md:text-xl font-bold break-words">
                  {studio.totalShowtime > 0 ? formatCurrency(studio.revenue / studio.totalShowtime) : 'Rp 0'}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatistikStudio;
