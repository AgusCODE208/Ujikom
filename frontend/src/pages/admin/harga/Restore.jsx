import React, { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw, DollarSign, Tag } from 'lucide-react';
import { getDeletedHargaTikets, restoreHargaTiket } from '../../../utils/hargaStorage';

const HargaRestore = ({ onNavigate }) => {
  const [deletedHargas, setDeletedHargas] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setDeletedHargas(getDeletedHargaTikets());
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka);
  };

  const getTipeLabel = (tipe) => {
    const labels = {
      'weekday_reguler': 'Weekday Reguler',
      'weekend_reguler': 'Weekend Reguler',
      'weekday_vip': 'Weekday VIP',
      'weekend_vip': 'Weekend VIP',
      'weekday_imax': 'Weekday IMAX',
      'weekend_imax': 'Weekend IMAX',
      'holiday_reguler': 'Holiday Reguler',
      'holiday_vip': 'Holiday VIP',
      'holiday_imax': 'Holiday IMAX'
    };
    return labels[tipe] || tipe;
  };

  const getTipeColor = (tipe) => {
    if (tipe.includes('reguler')) return 'bg-blue-600';
    if (tipe.includes('vip')) return 'bg-purple-600';
    if (tipe.includes('imax')) return 'bg-red-600';
    return 'bg-gray-600';
  };

  const handleRestore = (harga) => {
    if (window.confirm(`Restore harga tiket "${harga.keterangan}"?`)) {
      restoreHargaTiket(harga.id);
      loadData();
      alert('Harga tiket berhasil direstore!');
    }
  };

  return (
    <div className="space-y-6">
      <button onClick={() => onNavigate('harga-list')} className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition">
        <ArrowLeft className="w-5 h-5" />
        <span>Kembali</span>
      </button>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Restore Harga Tiket</h2>

        {deletedHargas.length === 0 ? (
          <div className="text-center py-12">
            <DollarSign className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Tidak ada harga tiket yang dihapus</p>
          </div>
        ) : (
          <>
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left">Tipe</th>
                    <th className="px-6 py-4 text-left">Keterangan</th>
                    <th className="px-6 py-4 text-left">Harga</th>
                    <th className="px-6 py-4 text-left">Dihapus</th>
                    <th className="px-6 py-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {deletedHargas.map((harga) => (
                    <tr key={harga.id} className="border-t border-gray-700">
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTipeColor(harga.tipe)}`}>
                          {getTipeLabel(harga.tipe)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">{harga.keterangan}</td>
                      <td className="px-6 py-4 font-bold text-green-400">{formatRupiah(harga.harga)}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {new Date(harga.deletedAt).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => handleRestore(harga)} className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition">
                          <RotateCcw className="w-4 h-4" />
                          <span>Restore</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden space-y-4">
              {deletedHargas.map((harga) => (
                <div key={harga.id} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTipeColor(harga.tipe)}`}>
                      {getTipeLabel(harga.tipe)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{harga.keterangan}</p>
                  <p className="text-2xl font-bold text-green-400 mb-2">{formatRupiah(harga.harga)}</p>
                  <p className="text-xs text-gray-500 mb-3">Dihapus: {new Date(harga.deletedAt).toLocaleDateString('id-ID')}</p>
                  <button onClick={() => handleRestore(harga)} className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition">
                    <RotateCcw className="w-4 h-4" />
                    <span>Restore Harga</span>
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HargaRestore;
