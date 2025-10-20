import React from 'react';
import { ArrowLeft, Edit, Users, Maximize, Film, Check } from 'lucide-react';
import { getKursiByStudio } from '../../../utils/studioStorage';

const StudioDetail = ({ onNavigate, selectedStudio }) => {
  if (!selectedStudio) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Studio tidak ditemukan</p>
        <button
          onClick={() => onNavigate('studio-list')}
          className="mt-4 px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
        >
          Kembali ke List
        </button>
      </div>
    );
  }

  const kursis = getKursiByStudio(selectedStudio.id);

  const getTipeColor = (tipe) => {
    switch(tipe) {
      case 'reguler': return 'bg-blue-600';
      case 'vip': return 'bg-purple-600';
      case 'imax': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-600';
      case 'maintenance': return 'bg-yellow-600';
      case 'inactive': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const renderSeatLayout = () => {
    const { rows, cols } = selectedStudio.layout;
    const seats = [];
    
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const kursi = kursis.find(k => k.row === i && k.col === j);
        const seatColor = kursi && kursi.status === 'tidak_tersedia' ? 'bg-gray-600' : 'bg-green-600';
        
        row.push(
          <div
            key={`${i}-${j}`}
            className={`w-4 h-4 sm:w-6 sm:h-6 ${seatColor} rounded-t-lg border border-green-700`}
            title={kursi ? `${kursi.kode_kursi} - ${kursi.status}` : 'Tidak ada'}
          />
        );
      }
      seats.push(
        <div key={i} className="flex space-x-1 mb-1">
          {row}
        </div>
      );
    }
    
    return seats;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('studio-list')}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali</span>
        </button>
        <button
          onClick={() => onNavigate('studio-edit', selectedStudio)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
        >
          <Edit className="w-5 h-5" />
          <span>Edit Studio</span>
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 sm:p-6 space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{selectedStudio.nama_studio}</h2>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getTipeColor(selectedStudio.tipe)}`}>
              {selectedStudio.tipe}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(selectedStudio.status)}`}>
              {selectedStudio.status === 'active' ? 'Aktif' : 
               selectedStudio.status === 'maintenance' ? 'Maintenance' : 'Nonaktif'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold text-sm">Kapasitas</h3>
            </div>
            <p className="text-xl sm:text-2xl font-bold">{selectedStudio.kapasitas}</p>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Maximize className="w-5 h-5 text-purple-500" />
              <h3 className="font-semibold text-sm">Layout</h3>
            </div>
            <p className="text-xl sm:text-2xl font-bold">{selectedStudio.layout.rows}x{selectedStudio.layout.cols}</p>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Film className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-sm">Tipe</h3>
            </div>
            <p className="text-xl sm:text-2xl font-bold capitalize">{selectedStudio.tipe}</p>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Check className="w-5 h-5 text-green-500" />
              <h3 className="font-semibold text-sm">Kursi</h3>
            </div>
            <p className="text-xl sm:text-2xl font-bold">{kursis.length}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Preview Layout Kursi</h3>
          <div className="bg-gray-700 rounded-lg p-4 sm:p-6">
            <div className="mb-4 text-center">
              <div className="inline-block bg-gray-600 px-6 sm:px-8 py-2 rounded text-sm font-semibold">
                LAYAR
              </div>
            </div>
            <div className="flex justify-center overflow-x-auto">
              <div className="inline-block">
                {renderSeatLayout()}
              </div>
            </div>
            <div className="mt-6 flex items-center justify-center space-x-4 sm:space-x-6 text-xs sm:text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-600 rounded-t-lg"></div>
                <span>Tersedia</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-600 rounded-t-lg"></div>
                <span>Tidak Tersedia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudioDetail;
