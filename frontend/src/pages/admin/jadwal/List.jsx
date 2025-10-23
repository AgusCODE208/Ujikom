import React, { useState, useEffect } from 'react';
import { Search, Plus, Eye, Edit, Trash2, Clock, RotateCcw, Calendar } from 'lucide-react';
import { getJadwals, deleteJadwal } from '../../../utils/jadwalStorage';
import { getFilms } from '../../../utils/filmStorage';
import { getStudios } from '../../../utils/studioStorage';
import { getHargaTikets } from '../../../utils/hargaStorage';

const JadwalList = ({ onNavigate }) => {
  const [jadwals, setJadwals] = useState([]);
  const [films, setFilms] = useState([]);
  const [studios, setStudios] = useState([]);
  const [hargas, setHargas] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTanggal, setFilterTanggal] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setJadwals(getJadwals());
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

  const filteredJadwals = jadwals.filter(jadwal => {
    const film = getFilmById(jadwal.film_id);
    const studio = getStudioById(jadwal.studio_id);
    
    const matchSearch = film?.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       studio?.nama_studio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTanggal = !filterTanggal || jadwal.tanggal === filterTanggal;
    
    return matchSearch && matchTanggal;
  });

  const handleDelete = (jadwal) => {
    const film = getFilmById(jadwal.film_id);
    if (window.confirm(`Apakah Anda yakin ingin menghapus jadwal "${film?.judul}" pada ${new Date(jadwal.tanggal).toLocaleDateString('id-ID')} ${jadwal.jam_mulai}?`)) {
      deleteJadwal(jadwal.id);
      loadData();
      alert('Jadwal berhasil dihapus!');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'available': return 'bg-green-600';
      case 'full': return 'bg-red-600';
      case 'cancelled': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari film atau studio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none"
            />
          </div>
          <input
            type="date"
            value={filterTanggal}
            onChange={(e) => setFilterTanggal(e.target.value)}
            className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('jadwal-restore')}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition"
          >
            <RotateCcw className="w-5 h-5" />
            <span className="hidden sm:inline">Restore</span>
          </button>
          <button
            onClick={() => onNavigate('jadwal-tambah')}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
          >
            <Plus className="w-5 h-5" />
            <span>Tambah</span>
          </button>
        </div>
      </div>

      {filteredJadwals.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Tidak ada jadwal ditemukan</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block bg-gray-800 rounded-lg overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left">Film</th>
                  <th className="px-6 py-4 text-left">Studio</th>
                  <th className="px-6 py-4 text-left">Tanggal</th>
                  <th className="px-6 py-4 text-left">Jam</th>
                  <th className="px-6 py-4 text-left">Harga</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJadwals.map((jadwal) => {
                  const film = getFilmById(jadwal.film_id);
                  const studio = getStudioById(jadwal.studio_id);
                  const harga = getHargaById(jadwal.harga_id);
                  
                  return (
                    <tr key={jadwal.id} className="border-t border-gray-700 hover:bg-gray-750">
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
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          {new Date(jadwal.tanggal).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
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
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(jadwal.status)}`}>
                          {jadwal.status === 'available' ? 'Tersedia' :
                           jadwal.status === 'full' ? 'Penuh' : 'Dibatalkan'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onNavigate('jadwal-detail', jadwal)}
                            className="p-2 hover:bg-gray-700 rounded-lg transition"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onNavigate('jadwal-edit', jadwal)}
                            className="p-2 hover:bg-blue-600 rounded-lg transition"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(jadwal)}
                            className="p-2 hover:bg-red-600 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {filteredJadwals.map((jadwal) => {
              const film = getFilmById(jadwal.film_id);
              const studio = getStudioById(jadwal.studio_id);
              const harga = getHargaById(jadwal.harga_id);
              
              return (
                <div key={jadwal.id} className="bg-gray-800 rounded-lg p-4">
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
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-green-400">{formatRupiah(harga?.harga)}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(jadwal.status)}`}>
                          {jadwal.status === 'available' ? 'Tersedia' : jadwal.status === 'full' ? 'Penuh' : 'Dibatalkan'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onNavigate('jadwal-detail', jadwal)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Detail</span>
                    </button>
                    <button
                      onClick={() => onNavigate('jadwal-edit', jadwal)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition text-sm"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(jadwal)}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default JadwalList;
