import React, { useState, useEffect } from 'react';
import { getTransaksi } from '../../../utils/transaksiStorage';
import { getFilms } from '../../../utils/filmStorage';
import { getStudios } from '../../../utils/studioStorage';

const LaporanPenjualan = () => {
  const [transactions, setTransactions] = useState([]);
  const [films, setFilms] = useState([]);
  const [studios, setStudios] = useState([]);

  useEffect(() => {
    setTransactions(getTransaksi());
    setFilms(getFilms());
    setStudios(getStudios());
  }, []);

  // Penjualan by Film
  const filmSales = films.map(film => {
    const filmTrx = transactions.filter(t => t.film_id == film.id);
    const tiket = filmTrx.reduce((sum, t) => sum + (t.jumlah_tiket || 0), 0);
    const revenue = filmTrx.reduce((sum, t) => sum + (t.total_harga || 0), 0);
    return { film: film.judul, tiket, revenue };
  }).filter(f => f.tiket > 0).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

  const totalRevenue = filmSales.reduce((sum, f) => sum + f.revenue, 0);
  filmSales.forEach(f => {
    f.persentase = totalRevenue > 0 ? Math.round((f.revenue / totalRevenue) * 100) : 0;
  });

  // Penjualan by Studio
  const studioSales = studios.map(studio => {
    const studioTrx = transactions.filter(t => t.studio === studio.nama_studio);
    const revenue = studioTrx.reduce((sum, t) => sum + (t.total_harga || 0), 0);
    const totalSeats = studioTrx.reduce((sum, t) => sum + (t.jumlah_tiket || 0), 0);
    const occupancy = studio.kapasitas > 0 ? Math.round((totalSeats / studio.kapasitas) * 100) : 0;
    return { studio: studio.nama_studio, occupancy, revenue };
  });

  // Penjualan by Payment
  const paymentMethods = ['cash', 'debit', 'credit', 'ewallet'];
  const paymentSales = paymentMethods.map(method => {
    const methodTrx = transactions.filter(t => t.metode_pembayaran === method);
    const jumlah = methodTrx.length;
    const revenue = methodTrx.reduce((sum, t) => sum + (t.total_harga || 0), 0);
    const labels = { cash: 'Tunai', debit: 'Kartu Debit', credit: 'Kartu Kredit', ewallet: 'E-Wallet' };
    return { metode: labels[method], jumlah, revenue };
  }).filter(p => p.jumlah > 0);

  const totalPaymentRevenue = paymentSales.reduce((sum, p) => sum + p.revenue, 0);
  paymentSales.forEach(p => {
    p.persentase = totalPaymentRevenue > 0 ? Math.round((p.revenue / totalPaymentRevenue) * 100) : 0;
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
      {/* Penjualan by Film */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-4 sm:p-6 border-b border-gray-700">
          <h3 className="text-lg sm:text-xl font-bold">Penjualan Per Film</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm">Film</th>
                <th className="px-3 sm:px-6 py-3 text-right text-xs sm:text-sm hidden sm:table-cell">Tiket</th>
                <th className="px-3 sm:px-6 py-3 text-right text-xs sm:text-sm">Revenue</th>
                <th className="px-3 sm:px-6 py-3 text-right text-xs sm:text-sm">%</th>
              </tr>
            </thead>
            <tbody>
              {filmSales.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-3 sm:px-6 py-8 text-center text-gray-400 text-sm">
                    Belum ada data penjualan
                  </td>
                </tr>
              ) : (
                filmSales.map((item, index) => (
                  <tr key={`film-sale-${index}`} className="border-t border-gray-700">
                    <td className="px-3 sm:px-6 py-4 font-semibold text-sm sm:text-base">{item.film}</td>
                    <td className="px-3 sm:px-6 py-4 text-right text-sm hidden sm:table-cell">{formatNumber(item.tiket)}</td>
                    <td className="px-3 sm:px-6 py-4 text-right text-green-500 font-bold text-xs sm:text-base break-words">
                      {formatCurrency(item.revenue)}
                    </td>
                    <td className="px-3 sm:px-6 py-4 text-right text-sm">{item.persentase}%</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Penjualan by Studio & Payment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-4 sm:p-6 border-b border-gray-700">
            <h3 className="text-lg sm:text-xl font-bold">Penjualan Per Studio</h3>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            {studioSales.map((item, index) => (
              <div key={`studio-sale-${index}`} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <div className="font-semibold">{item.studio}</div>
                  <div className="text-sm text-gray-400">Occupancy: {item.occupancy}%</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-500 text-sm sm:text-base break-words">{formatCurrency(item.revenue)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-4 sm:p-6 border-b border-gray-700">
            <h3 className="text-lg sm:text-xl font-bold">Metode Pembayaran</h3>
          </div>
          <div className="p-4 sm:p-6 space-y-4">
            {paymentSales.map((item, index) => (
              <div key={`payment-${index}`}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-semibold">{item.metode}</div>
                    <div className="text-sm text-gray-400">{formatNumber(item.jumlah)} transaksi</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm sm:text-base break-words">{formatCurrency(item.revenue)}</div>
                    <div className="text-xs text-gray-400">{item.persentase}%</div>
                  </div>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600"
                    style={{ width: `${item.persentase}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaporanPenjualan;
