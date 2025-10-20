import React, { useState } from 'react';
import { Save, Upload } from 'lucide-react';
import { addUser } from '../../../utils/userStorage';

const UserTambah = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    alamat: '',
    role: 'user',
    foto: ''
  });
  const [fotoType, setFotoType] = useState('url');
  const [fotoPreview, setFotoPreview] = useState('');

  const handleFotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result);
        setFormData({...formData, foto: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(formData);
    alert('User berhasil ditambahkan!');
    onNavigate('user-list');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-800 rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nama Lengkap</label>
            <input
              type="text"
              value={formData.nama}
              onChange={(e) => setFormData({...formData, nama: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">No. Telepon</label>
              <input
                type="tel"
                value={formData.telepon}
                onChange={(e) => setFormData({...formData, telepon: e.target.value})}
                placeholder="08123456789"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none"
              >
                <option value="user">User</option>
                <option value="kasir">Kasir</option>
                <option value="admin">Admin</option>
                <option value="owner">Owner</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Alamat</label>
            <textarea
              value={formData.alamat}
              onChange={(e) => setFormData({...formData, alamat: e.target.value})}
              rows="3"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Foto Profil</label>
            <div className="flex space-x-2 mb-3">
              <button
                type="button"
                onClick={() => setFotoType('url')}
                className={`px-4 py-2 rounded-lg transition ${
                  fotoType === 'url' ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                URL
              </button>
              <button
                type="button"
                onClick={() => setFotoType('upload')}
                className={`px-4 py-2 rounded-lg transition ${
                  fotoType === 'upload' ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                Upload File
              </button>
            </div>

            {fotoType === 'url' ? (
              <input
                type="url"
                value={formData.foto}
                onChange={(e) => {
                  setFormData({...formData, foto: e.target.value});
                  setFotoPreview(e.target.value);
                }}
                placeholder="https://example.com/foto.jpg"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-red-500 focus:outline-none"
              />
            ) : (
              <div>
                <label className="flex items-center justify-center w-full px-4 py-8 bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:bg-gray-600 transition">
                  <div className="text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <span className="text-sm text-gray-400">Klik untuk upload foto</span>
                    <span className="block text-xs text-gray-500 mt-1">PNG, JPG, JPEG (Max 5MB)</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFotoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}

            {fotoPreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">Preview:</p>
                <img src={fotoPreview} alt="Preview" className="w-32 h-32 object-cover rounded-full" />
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
            >
              <Save className="w-5 h-5" />
              <span>Tambah User</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('user-list')}
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

export default UserTambah;
