import React, { useState } from 'react';
import { Film, ChevronLeft, User, Mail, Phone, Calendar, Edit2, Save, X, Ticket, Award } from 'lucide-react';

const Profile = ({ setCurrentView }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nama: 'John Doe',
    email: 'john.doe@email.com',
    no_hp: '08123456789',
    tanggal_lahir: '1990-01-01'
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => setCurrentView('home')}
              className="flex items-center space-x-2 hover:text-red-500 transition"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            <div className="flex items-center space-x-2">
              <Film className="w-8 h-8 text-red-500" />
              <span className="text-xl font-bold">MyCinema</span>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-red-900 to-pink-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <User className="w-10 h-10 text-red-500" />
            <h1 className="text-4xl font-bold">My Profile</h1>
          </div>
          <p className="text-gray-300 text-lg">Manage your account information</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="bg-gray-800 rounded-lg p-6 md:p-8">
          {/* Profile Picture */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center">
              <User className="w-16 h-16 text-gray-400" />
            </div>
          </div>

          {/* Profile Info */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-red-500 focus:outline-none"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-700 rounded-lg">{formData.nama}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-red-500 focus:outline-none"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-700 rounded-lg">{formData.email}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  name="no_hp"
                  value={formData.no_hp}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-red-500 focus:outline-none"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-700 rounded-lg">{formData.no_hp}</div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                Date of Birth
              </label>
              {isEditing ? (
                <input
                  type="date"
                  name="tanggal_lahir"
                  value={formData.tanggal_lahir}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-red-500 focus:outline-none"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-700 rounded-lg">{formData.tanggal_lahir}</div>
              )}
            </div>
          </div>

          {/* Account Stats */}
          <div className="mt-8 pt-8 border-t border-gray-700">
            <h3 className="text-lg font-bold mb-4">Account Statistics</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-500">12</div>
                <div className="text-sm text-gray-400">Total Bookings</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-500">8</div>
                <div className="text-sm text-gray-400">Movies Watched</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-500">450</div>
                <div className="text-sm text-gray-400">Points</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
