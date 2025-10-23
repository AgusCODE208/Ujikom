import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { updateJadwal, calculateJamSelesai, checkJadwalConflict } from '../../../utils/jadwalStorage';
import { getFilms } from '../../../utils/filmStorage';
import { getStudios } from '../../../utils/studioStorage';
import { getHargaTikets } from '../../../utils/hargaStorage';

const JadwalEdit = ({ onNavigate, selectedJadwal }) => {
  const [films, setFilms] = useState([]);
  const [studios, setStudios] = useState([]);
  const [hargas, setHargas] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [formData, setFormData] = useState({
    film_id: selectedJadwal?.film_id || '',
    studio_id: selectedJadwal?.studio_id || '',
    tanggal: selectedJadwal?.tanggal || '',
    jam_mulai: selectedJadwal?.jam_mulai || '',
    harga_id: selectedJadwal?.harga_id || '',
    status: selectedJadwal?.status || 'available'
  });

  useEffect(() => {
    const loadedFilms = getFilms();
    const loadedStudios = getStudios();
    const loadedHargas = getHargaTikets();
    
    setFilms(loadedFilms);
    setStudios(loadedStudios);
    setHargas(loadedHargas);
    
    if (selectedJadwal?.film_id) {
      setSelectedFilm(loadedFilms.find(f => f.id == selectedJadwal.film_id));
    }
  }, [selectedJadwal]);

  const handleFilmChange = (filmId) => {
    setFormData({...formData, film_id: filmId});
    setSelectedFilm(films.find(f => f.id == filmId));
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(angka);
  };

  const handleSubmit = () => {
    if (!formData.film_id || !formData.studio_id || !formData.tanggal || !formData.jam_mulai || !formData.harga_id) {
      alert('Semua field harus diisi!');
      return;
    }

    const film = films.find(f => f.id == formData.film_id);
    if (!film) {
      alert('Film tidak ditemukan!');
      return;
    }
    const jam_selesai = calculateJamSelesai(formData.jam_mulai, film.durasi);

    const conflict = checkJadwalConflict(formData.studio_id, formData.tanggal, formData.jam_mulai, jam_selesai, selectedJadwal.id);
    if (conflict) {
      alert('Jadwal bentrok dengan jadwal lain di studio yang sama!');
      return;
    }

    updateJadwal(selectedJadwal.id, { ...formData, jam_selesai });
    alert('Jadwal berhasil diupdate!');
    onNavigate('jadwal-list');
  };

  if (!selectedJadwal) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Jadwal tidak ditemukan</p>
      </div>
    );
  }

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
        <h2 className="text-2xl font-bold mb-6">Edit Jadwal Film</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Pilih Film</label>
            <select
              value={formData.film_id}
              onChange={(e) => handleFilmChange(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none"
              required
            >
              <option value="">-- Pilih Film --</option>
              {films.map(film => (
                <option key={film.id} value={film.id}>
                  {film.judul} ({film.durasi} menit)
                </option>
              ))}
            </select>
            {selectedFilm && (
              <div className="mt-2 p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img src={selectedFilm.poster} alt={selectedFilm.judul} className="w-12 h-16 object-cover rounded" />
                  <div className="text-sm">
                    <p className="font-semibold">{selectedFilm.judul}</p>
                    <p className="text-gray-400">{selectedFilm.genre}</p>
                    <p className="text-gray-400">Durasi: {selectedFilm.durasi} menit</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Pilih Studio</label>
            <select
              value={formData.studio_id}
              onChange={(e) => setFormData({...formData, studio_id: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none"
              required
            >
              <option value="">-- Pilih Studio --</option>
              {studios.map(studio => (
                <option key={studio.id} value={studio.id}>
                  {studio.nama_studio} - {studio.tipe} (Kapasitas: {studio.kapasitas})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tanggal</label>
              <input
                type="date"
                value={formData.tanggal}
                onChange={(e) => setFormData({...formData, tanggal: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Jam Mulai</label>
              <input
                type="time"
                value={formData.jam_mulai}
                onChange={(e) => setFormData({...formData, jam_mulai: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none"
                required
              />
              {formData.jam_mulai && selectedFilm && (
                <p className="text-xs text-gray-400 mt-1">
                  Selesai: {calculateJamSelesai(formData.jam_mulai, selectedFilm.durasi)}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Harga Tiket</label>
            <select
              value={formData.harga_id}
              onChange={(e) => setFormData({...formData, harga_id: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none"
              required
            >
              <option value="">-- Pilih Harga --</option>
              {hargas.map(harga => (
                <option key={harga.id} value={harga.id}>
                  {harga.keterangan} - {formatRupiah(harga.harga)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none"
            >
              <option value="available">Tersedia</option>
              <option value="full">Penuh</option>
              <option value="cancelled">Dibatalkan</option>
            </select>
          </div>

          <div className="bg-yellow-900 border border-yellow-700 rounded-lg p-4">
            <p className="text-sm text-yellow-200">
              ⚠️ Perubahan jadwal akan mempengaruhi transaksi yang sudah ada.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
            >
              <Save className="w-5 h-5" />
              <span>Update Jadwal</span>
            </button>
            <button
              onClick={() => onNavigate('jadwal-list')}
              className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JadwalEdit;
