import React, { useState, useEffect } from 'react';
import { ChevronLeft, Calendar, Clock } from 'lucide-react';
import { getPublishedFilms } from '../../utils/filmStorage';
import { getJadwals } from '../../utils/jadwalStorage';
import { getStudios } from '../../utils/studioStorage';
import { getHargaTikets } from '../../utils/hargaStorage';

const PilihFilmJadwal = ({ onSelect, onBack }) => {
  const [films, setFilms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [jadwalList, setJadwalList] = useState([]);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setFilms(getPublishedFilms());
    generateDates();
  }, []);

  useEffect(() => {
    if (selectedFilm && selectedDate) {
      const allJadwal = getJadwals();
      const studios = getStudios();
      const hargas = getHargaTikets();
      
      const filtered = allJadwal
        .filter(j => 
          j.film_id == selectedFilm.id && 
          j.tanggal === selectedDate.tanggal &&
          !j.deleted
        )
        .map(j => ({
          ...j,
          studio: studios.find(s => s.id === j.studio_id),
          harga: hargas.find(h => h.id === j.harga_id)
        }));
      setJadwalList(filtered);
    }
  }, [selectedFilm, selectedDate]);

  const generateDates = () => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const dateList = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dateList.push({
        hari: days[date.getDay()],
        tanggal: date.toISOString().split('T')[0],
        display: `${date.getDate()} ${months[date.getMonth()]}`
      });
    }
    setDates(dateList);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Kembali</span>
        </button>
      </div>

      {/* Pilih Film */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Pilih Film</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {films.map(film => (
            <button
              key={`film-${film.id}`}
              onClick={() => setSelectedFilm(film)}
              className={`rounded-lg overflow-hidden transition ${
                selectedFilm?.id === film.id ? 'ring-4 ring-red-500' : 'hover:ring-2 hover:ring-gray-600'
              }`}
            >
              <img src={film.poster} alt={film.judul} className="w-full h-64 object-cover" />
              <div className="p-2 bg-gray-700">
                <p className="text-sm font-semibold truncate">{film.judul}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Pilih Tanggal */}
      {selectedFilm && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Pilih Tanggal</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {dates.map((date, idx) => (
              <button
                key={`date-${idx}`}
                onClick={() => setSelectedDate(date)}
                className={`flex-shrink-0 px-6 py-3 rounded-lg transition ${
                  selectedDate?.tanggal === date.tanggal ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <div className="text-sm font-medium">{date.hari}</div>
                <div className="text-lg font-bold">{date.display}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Pilih Jadwal */}
      {selectedFilm && selectedDate && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Pilih Jadwal</h2>
          {jadwalList.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Tidak ada jadwal tersedia</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jadwalList.map(jadwal => (
                <button
                  key={`jadwal-${jadwal.id}`}
                  onClick={() => onSelect(selectedFilm, jadwal, selectedDate)}
                  className="bg-gray-700 hover:bg-gray-600 rounded-lg p-4 text-left transition"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-red-500" />
                    <span className="font-bold text-lg">{jadwal.jam_mulai}</span>
                  </div>
                  <div className="text-sm text-gray-400 space-y-1">
                    <div>Studio: {jadwal.studio?.nama_studio} ({jadwal.studio?.tipe})</div>
                    <div className="text-red-500 font-semibold">{formatCurrency(jadwal.harga?.harga)}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PilihFilmJadwal;
