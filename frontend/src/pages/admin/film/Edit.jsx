import React, { useState } from 'react';
import { Save, Upload } from 'lucide-react';
import { updateFilm } from '../../../utils/filmStorage';

const FilmEdit = ({ onNavigate, selectedFilm }) => {
  const [formData, setFormData] = useState(selectedFilm || {
    judul: '',
    deskripsi: '',
    genre: '',
    durasi: '',
    rating_usia: 'SU',
    poster: '',
    trailer_url: '',
    director: '',
    cast: '',
    status: 'now_playing',
    rating: 0
  });
  const [posterType, setPosterType] = useState('url');
  const [posterPreview, setPosterPreview] = useState(selectedFilm?.poster || '');

  const handlePosterUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPosterPreview(reader.result);
        setFormData({...formData, poster: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFilm(selectedFilm.id, formData);
    alert('Film berhasil diupdate!');
    onNavigate('film-list');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Judul Film</label>
            <input
              type="text"
              value={formData.judul}
              onChange={(e) => setFormData({...formData, judul: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Deskripsi</label>
            <textarea
              value={formData.deskripsi}
              onChange={(e) => setFormData({...formData, deskripsi: e.target.value})}
              rows="3"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Genre</label>
              <input
                type="text"
                value={formData.genre}
                onChange={(e) => setFormData({...formData, genre: e.target.value})}
                placeholder="Action, Drama"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Durasi (menit)</label>
              <input
                type="number"
                min="1"
                value={formData.durasi}
                onChange={(e) => setFormData({...formData, durasi: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Rating Usia</label>
              <select
                value={formData.rating_usia}
                onChange={(e) => setFormData({...formData, rating_usia: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none"
              >
                <option value="SU">SU</option>
                <option value="13+">13+</option>
                <option value="17+">17+</option>
                <option value="21+">21+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={formData.rating}
                onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none"
              >
                <option value="now_playing">Now Playing</option>
                <option value="coming_soon">Coming Soon</option>
                <option value="ended">Ended</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Director</label>
              <input
                type="text"
                value={formData.director || ''}
                onChange={(e) => setFormData({...formData, director: e.target.value})}
                placeholder="Director name"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Trailer URL (YouTube)</label>
              <input
                type="url"
                value={formData.trailer_url || ''}
                onChange={(e) => setFormData({...formData, trailer_url: e.target.value})}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Cast</label>
            <input
              type="text"
              value={formData.cast || ''}
              onChange={(e) => setFormData({...formData, cast: e.target.value})}
              placeholder="Actor 1, Actor 2, Actor 3"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Poster Film</label>
            <div className="flex space-x-2 mb-3">
              <button
                type="button"
                onClick={() => setPosterType('url')}
                className={`px-4 py-2 rounded-lg transition ${
                  posterType === 'url' ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                URL
              </button>
              <button
                type="button"
                onClick={() => setPosterType('upload')}
                className={`px-4 py-2 rounded-lg transition ${
                  posterType === 'upload' ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                Upload File
              </button>
            </div>

            {posterType === 'url' ? (
              <input
                type="url"
                value={formData.poster}
                onChange={(e) => {
                  setFormData({...formData, poster: e.target.value});
                  setPosterPreview(e.target.value);
                }}
                placeholder="https://example.com/poster.jpg"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none"
                required
              />
            ) : (
              <div>
                <label className="flex items-center justify-center w-full px-4 py-8 bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:bg-gray-600 transition">
                  <div className="text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <span className="text-sm text-gray-400">Klik untuk upload poster baru</span>
                    <span className="block text-xs text-gray-500 mt-1">PNG, JPG, JPEG (Max 5MB)</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePosterUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}

            {posterPreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">Preview:</p>
                <img src={posterPreview} alt="Preview" className="w-32 h-48 object-cover rounded-lg" />
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
            >
              <Save className="w-5 h-5" />
              <span>Update Film</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('film-list')}
              className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilmEdit;
