import React, { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw, Trash2, User } from 'lucide-react';
import { getDeletedUsers, restoreUser } from '../../../utils/userStorage';

const UserRestore = ({ onNavigate }) => {
  const [deletedUsers, setDeletedUsers] = useState([]);

  useEffect(() => {
    loadDeletedUsers();
  }, []);

  const loadDeletedUsers = () => {
    setDeletedUsers(getDeletedUsers());
  };

  const handleRestore = (user) => {
    if (window.confirm(`Apakah Anda yakin ingin restore user "${user.nama}"?`)) {
      restoreUser(user.id);
      loadDeletedUsers();
      alert('User berhasil di-restore!');
    }
  };

  const handlePermanentDelete = (user) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus PERMANEN user "${user.nama}"? Tindakan ini tidak dapat dibatalkan!`)) {
      const deleted = getDeletedUsers();
      const filtered = deleted.filter(u => u.id !== user.id);
      localStorage.setItem('cinema_users_deleted', JSON.stringify(filtered));
      loadDeletedUsers();
      alert('User berhasil dihapus permanen!');
    }
  };

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
        <h2 className="text-2xl font-bold">Restore User</h2>
      </div>

      {deletedUsers.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-12 text-center">
          <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Tidak ada user yang dihapus</p>
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
                <th className="px-6 py-4 text-left">Role</th>
                <th className="px-6 py-4 text-left">Dihapus Pada</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deletedUsers.map((user) => (
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
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {new Date(user.deletedAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleRestore(user)}
                        className="flex items-center space-x-1 px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition text-sm"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Restore</span>
                      </button>
                      <button
                        onClick={() => handlePermanentDelete(user)}
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
          {deletedUsers.map((user) => (
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
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'admin' ? 'bg-purple-600' :
                      user.role === 'owner' ? 'bg-yellow-600' :
                      user.role === 'kasir' ? 'bg-blue-600' : 'bg-gray-600'
                    }`}>
                      {user.role === 'admin' ? 'Admin' :
                       user.role === 'owner' ? 'Owner' :
                       user.role === 'kasir' ? 'Kasir' : 'User'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">
                    Deleted: {new Date(user.deletedAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRestore(user)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition text-sm"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Restore</span>
                    </button>
                    <button
                      onClick={() => handlePermanentDelete(user)}
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

export default UserRestore;
