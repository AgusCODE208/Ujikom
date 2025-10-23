import React, { useState, useEffect } from 'react';
import { Search, Calendar, DollarSign, Ticket, Eye, Filter } from 'lucide-react';
import { getTransaksi } from '../../utils/transaksiStorage';

const RiwayatTransaksi = ({ onNavigate }) => {
  const [transaksi, setTransaksi] = useState([]);
  const [filteredTransaksi, setFilteredTransaksi] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [selectedTransaksi, setSelectedTransaksi] = useState(null);

  useEffect(() => {
    loadTransaksi();
  }, []);

  useEffect(() => {
    filterTransaksi();
  }, [searchTerm, filterDate, transaksi]);

  const loadTransaksi = () => {
    const data = getTransaksi();
    const sorted = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setTransaksi(sorted);
  };

  const filterTransaksi = () => {
    let filtered = [...transaksi];

    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.kode_booking?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.customer_nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.film_judul?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterDate) {
      filtered = filtered.filter(t => t.tanggal === filterDate);
    }

    setFilteredTransaksi(filtered);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPaymentMethodLabel = (method) => {
    const labels = {
      cash: 'Tunai',
      debit: 'Kartu Debit',
      credit: 'Kartu Kredit',
      ewallet: 'E-Wallet'
    };
    return labels[method] || method;
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Total Transaksi</p>
              <p className="text-3xl font-bold text-white">{transaksi.length}</p>
            </div>
            <Ticket className="w-12 h-12 text-white opacity-50" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm mb-1">Total Pendapatan</p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(transaksi.reduce((sum, t) => sum + (t.total_harga || 0), 0))}
              </p>
            </div>
            <DollarSign className="w-12 h-12 text-white opacity-50" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-1">Tiket Terjual</p>
              <p className="text-3xl font-bold text-white">
                {transaksi.reduce((sum, t) => sum + (t.jumlah_tiket || 0), 0)}
              </p>
            </div>
            <Ticket className="w-12 h-12 text-white opacity-50" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari kode booking, nama customer, atau film..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="pl-10 pr-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>
          {(searchTerm || filterDate) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterDate('');
              }}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Kode Booking</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Film</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Tanggal</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Kursi</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Total</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Pembayaran</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredTransaksi.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-400">
                    <Filter className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Tidak ada transaksi ditemukan</p>
                  </td>
                </tr>
              ) : (
                filteredTransaksi.map((t) => (
                  <tr key={`trx-${t.id}`} className="hover:bg-gray-750 transition">
                    <td className="px-6 py-4">
                      <div className="font-bold text-red-500">{t.kode_booking}</div>
                      <div className="text-xs text-gray-400">{formatDateTime(t.created_at)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold">{t.customer_nama}</div>
                      <div className="text-xs text-gray-400">{t.customer_telepon}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold">{t.film_judul}</div>
                      <div className="text-xs text-gray-400">{t.studio}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div>{new Date(t.tanggal).toLocaleDateString('id-ID')}</div>
                      <div className="text-xs text-gray-400">{t.jam_mulai}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">{t.kursi?.join(', ')}</div>
                      <div className="text-xs text-gray-400">{t.jumlah_tiket} tiket</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-green-500">{formatCurrency(t.total_harga)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-600 rounded-full text-xs font-semibold">
                        {getPaymentMethodLabel(t.metode_pembayaran)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedTransaksi(t)}
                        className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                        title="Lihat Detail"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedTransaksi && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setSelectedTransaksi(null)}>
          <div className="bg-gray-800 rounded-lg p-8 max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-6">Detail Transaksi</h2>
            
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Kode Booking</div>
                  <div className="font-bold text-red-500 text-xl">{selectedTransaksi.kode_booking}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Waktu Transaksi</div>
                  <div className="font-semibold">{formatDateTime(selectedTransaksi.created_at)}</div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <div className="text-sm text-gray-400 mb-2">Customer</div>
                <div className="font-semibold">{selectedTransaksi.customer_nama}</div>
                <div className="text-sm text-gray-400">{selectedTransaksi.customer_email}</div>
                <div className="text-sm text-gray-400">{selectedTransaksi.customer_telepon}</div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <div className="text-sm text-gray-400 mb-2">Detail Film</div>
                <div className="font-semibold">{selectedTransaksi.film_judul}</div>
                <div className="text-sm text-gray-400">
                  {new Date(selectedTransaksi.tanggal).toLocaleDateString('id-ID')} - {selectedTransaksi.jam_mulai}
                </div>
                <div className="text-sm text-gray-400">Studio: {selectedTransaksi.studio}</div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <div className="text-sm text-gray-400 mb-2">Kursi</div>
                <div className="font-semibold">{selectedTransaksi.kursi?.join(', ')}</div>
                <div className="text-sm text-gray-400">{selectedTransaksi.jumlah_tiket} tiket</div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Harga per Tiket</span>
                  <span>{formatCurrency(selectedTransaksi.harga_satuan)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Jumlah Tiket</span>
                  <span>{selectedTransaksi.jumlah_tiket} tiket</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold pt-2 border-t border-gray-700">
                  <span>Total</span>
                  <span className="text-green-500">{formatCurrency(selectedTransaksi.total_harga)}</span>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <div className="text-sm text-gray-400 mb-2">Metode Pembayaran</div>
                <span className="px-4 py-2 bg-blue-600 rounded-lg font-semibold">
                  {getPaymentMethodLabel(selectedTransaksi.metode_pembayaran)}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedTransaksi(null)}
              className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiwayatTransaksi;
