import React from 'react';
import { ArrowLeft, Edit, User, Mail, Phone, MapPin, Shield, Calendar } from 'lucide-react';

const UserDetail = ({ onNavigate, selectedUser }) => {
  if (!selectedUser) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">User tidak ditemukan</p>
        <button
          onClick={() => onNavigate('user-list')}
          className="mt-4 px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
        >
          Kembali ke List
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('user-list')}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Kembali</span>
        </button>
        <button
          onClick={() => onNavigate('user-edit', selectedUser)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
        >
          <Edit className="w-5 h-5" />
          <span>Edit User</span>
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 sm:p-6">
          <div className="flex justify-center">
            {selectedUser.foto ? (
              <img src={selectedUser.foto} alt={selectedUser.nama} className="w-48 h-48 rounded-full object-cover" />
            ) : (
              <div className="w-48 h-48 bg-gray-600 rounded-full flex items-center justify-center">
                <User className="w-24 h-24 text-gray-400" />
              </div>
            )}
          </div>
          
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">{selectedUser.nama}</h2>
              <div className="flex items-center space-x-1 text-gray-400">
                <Mail className="w-5 h-5" />
                <span>{selectedUser.email}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-500" />
                  Role
                </h3>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  selectedUser.role === 'admin' ? 'bg-purple-600' :
                  selectedUser.role === 'owner' ? 'bg-yellow-600' :
                  selectedUser.role === 'kasir' ? 'bg-blue-600' : 'bg-gray-600'
                }`}>
                  {selectedUser.role === 'admin' ? 'Admin' :
                   selectedUser.role === 'owner' ? 'Owner' :
                   selectedUser.role === 'kasir' ? 'Kasir' : 'User'}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-green-500" />
                  No. Telepon
                </h3>
                <p className="text-gray-400">{selectedUser.telepon || '-'}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-500" />
                Alamat
              </h3>
              <p className="text-gray-400">{selectedUser.alamat || '-'}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                Tanggal Bergabung
              </h3>
              <p className="text-gray-400">
                {new Date(selectedUser.createdAt).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
