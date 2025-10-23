import React, { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw, Calendar, Clock } from 'lucide-react';
import { getDeletedJadwals, restoreJadwal } from '../../../utils/jadwalStorage';
import { getFilms } from '../../../utils/filmStorage';
import { getStudios } from '../../../utils/studioStorage';
import { getHargaTikets } from '../../../utils/hargaStorage';

const JadwalRestore = ({ onNavigate }) => {
  const [deletedJadwals, setDeletedJadwals] = useState([]);
  const [films, setFilms] = useState([]);
  const [studios, setStudios] = useState([]);
  const [hargas, setHargas] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setDeletedJadwals(getDeletedJadwals());
    setFilms(getFilms());
    setStudios(getStudios());
    setHargas(getHargaTikets());
  };

  const getFilmById = (id) => films.find(f => f.id == id);
  const getStudioById = (id) => studios.find(s => s.id == id);
  const getHargaById = (id) => hargas.find(h => h.id == id);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka);
  };

  const handleRestore = (jadwal) => {
    const film = getFilmById(jadwal.film_id);
    if (window.confirm(`Restore jadwal "${film?.judul}"?`)) {
      restoreJadwal(jadwal.id);
      loadData();
      alert('Jadwal berhasil direstore!');
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => onNavigate('jadwal-list')}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Kembali</span>
      </button>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Restore Jadwal</h2>

        {deletedJadwals.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Tidak ada jadwal yang dihapus</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left">Film</th>
                    <th className="px-6 py-4 text-left">Studio</th>
                    <th className="px-6 py-4 text-left">Tanggal</th>
                    <th className="px-6 py-4 text-left">Jam</th>
                    <th className="px-6 py-4 text-left">Harga</th>
                    <th className="px-6 py-4 text-left">Dihapus</th>
                    <th className="px-6 py-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {deletedJadwals.map((jadwal) => {
                    const film = getFilmById(jadwal.film_id);
                    const studio = getStudioById(jadwal.studio_id);
                    const harga = getHargaById(jadwal.harga_id);
                    
                    return (
                      <tr key={jadwal.id} className="border-t border-gray-700">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <img src={film?.poster} alt={film?.judul} className="w-12 h-16 object-cover rounded" />
                            <div>
                              <div className="font-semibold">{film?.judul}</div>
                              <div className="text-xs text-gray-400">{film?.durasi} menit</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium">{studio?.nama_studio}</div>
                            <div className="text-xs text-gray-400 capitalize">{studio?.tipe}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {new Date(jadwal.tanggal).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1 text-sm">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{jadwal.jam_mulai} - {jadwal.jam_selesai}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-green-400">
                            {formatRupiah(harga?.harga)}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">
                          {new Date(jadwal.deletedAt).toLocaleDateString('id-ID')}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleRestore(jadwal)}
                            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition"
                          >
                            <RotateCcw className="w-4 h-4" />
                            <span>Restore</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
              {deletedJadwals.map((jadwal) => {
                const film = getFilmById(jadwal.film_id);
                const studio = getStudioById(jadwal.studio_id);
                const harga = getHargaById(jadwal.harga_id);
                
                return (
                  <div key={jadwal.id} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex gap-4 mb-3">
                      <img src={film?.poster} alt={film?.judul} className="w-20 h-28 object-cover rounded flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-1">{film?.judul}</h3>
                        <p className="text-sm text-gray-400 mb-2">{studio?.nama_studio} ({studio?.tipe})</p>
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(jadwal.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                          <Clock className="w-4 h-4" />
                          <span>{jadwal.jam_mulai} - {jadwal.jam_selesai}</span>
                        </div>
                        <div className="font-semibold text-green-400 mb-2">{formatRupiah(harga?.harga)}</div>
                        <p className="text-xs text-gray-500">Dihapus: {new Date(jadwal.deletedAt).toLocaleDateString('id-ID')}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRestore(jadwal)}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Restore Jadwal</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default JadwalRestore;
