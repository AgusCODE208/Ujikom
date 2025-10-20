import React, { useState, useEffect } from 'react';
import { Search, Plus, Eye, Edit, Trash2, User, RotateCcw } from 'lucide-react';
import { getUsers, deleteUser } from '../../../utils/userStorage';

const UserList = ({ onNavigate }) => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    setUsers(getUsers());
  };

  const filteredUsers = users.filter(user =>
    user.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (user) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus user "${user.nama}"?`)) {
      deleteUser(user.id);
      loadUsers();
      alert('User berhasil dihapus!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari user..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('user-restore')}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition"
          >
            <RotateCcw className="w-5 h-5" />
            <span className="hidden sm:inline">Restore</span>
          </button>
          <button
            onClick={() => onNavigate('user-tambah')}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
          >
            <Plus className="w-5 h-5" />
            <span>Tambah</span>
          </button>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-12 text-center">
          <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Tidak ada user ditemukan</p>
          {searchQuery && (
            <p className="text-gray-500 text-sm mt-2">Coba kata kunci lain</p>
          )}
        </div>
      ) : (
        <>
      {/* Desktop Table */}
      <div className="hidden lg:block bg-gray-800 rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-4 text-left">Foto</th>
              <th className="px-6 py-4 text-left">Nama</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Telepon</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t border-gray-700 hover:bg-gray-750">
                <td className="px-6 py-4">
                  {user.foto ? (
                    <img src={user.foto} alt={user.nama} className="w-12 h-12 object-cover rounded-full" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 font-semibold">{user.nama}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{user.email}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{user.telepon || '-'}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.role === 'admin' ? 'bg-purple-600' :
                    user.role === 'owner' ? 'bg-yellow-600' :
                    user.role === 'kasir' ? 'bg-blue-600' : 'bg-gray-600'
                  }`}>
                    {user.role === 'admin' ? 'Admin' :
                     user.role === 'owner' ? 'Owner' :
                     user.role === 'kasir' ? 'Kasir' : 'User'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onNavigate('user-detail', user)}
                      className="p-2 hover:bg-gray-700 rounded-lg transition"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onNavigate('user-edit', user)}
                      className="p-2 hover:bg-blue-600 rounded-lg transition"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(user)}
                      className="p-2 hover:bg-red-600 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Cards */}
      <div className="lg:hidden space-y-4">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-start gap-4">
              {user.foto ? (
                <img src={user.foto} alt={user.nama} className="w-16 h-16 object-cover rounded-full flex-shrink-0" />
              ) : (
                <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg mb-1 truncate">{user.nama}</h3>
                <p className="text-sm text-gray-400 mb-2 truncate">{user.email}</p>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.role === 'admin' ? 'bg-purple-600' :
                    user.role === 'owner' ? 'bg-yellow-600' :
                    user.role === 'kasir' ? 'bg-blue-600' : 'bg-gray-600'
                  }`}>
                    {user.role === 'admin' ? 'Admin' :
                     user.role === 'owner' ? 'Owner' :
                     user.role === 'kasir' ? 'Kasir' : 'User'}
                  </span>
                  <span className="text-xs text-gray-400">{user.telepon || 'No phone'}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onNavigate('user-detail', user)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Detail</span>
                  </button>
                  <button
                    onClick={() => onNavigate('user-edit', user)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(user)}
                    className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
        </>
      )}
    </div>
  );
};

export default UserList;
