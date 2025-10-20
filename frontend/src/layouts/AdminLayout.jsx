import React, { useState } from 'react';
import { Film, Users, Calendar, DollarSign, Ticket, LayoutDashboard, Armchair, LogOut, Menu, ChevronLeft } from 'lucide-react';
import Dashboard from '../pages/admin/Dashboard';
import FilmList from '../pages/admin/film/List';
import FilmTambah from '../pages/admin/film/Tambah';
import FilmEdit from '../pages/admin/film/Edit';
import FilmDetail from '../pages/admin/film/Detail';
import FilmRestore from '../pages/admin/film/Restore';
import UserList from '../pages/admin/user/List';
import UserTambah from '../pages/admin/user/Tambah';
import UserEdit from '../pages/admin/user/Edit';
import UserDetail from '../pages/admin/user/Detail';
import UserRestore from '../pages/admin/user/Restore';
import StudioList from '../pages/admin/studio/List';
import StudioTambah from '../pages/admin/studio/Tambah';
import StudioEdit from '../pages/admin/studio/Edit';
import StudioDetail from '../pages/admin/studio/Detail';
import StudioRestore from '../pages/admin/studio/Restore';

const AdminLayout = ({ onLogout }) => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedFilm, setSelectedFilm] = useState(null);

  const handleNavigate = (page, data = null) => {
    setCurrentPage(page);
    if (data) setSelectedFilm(data);
  };

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin logout?')) {
      onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`bg-gray-800 transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-20'
      } flex flex-col fixed lg:relative h-full z-50 ${!sidebarOpen ? 'hidden lg:flex' : ''}`}>
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {sidebarOpen && (
            <div className="flex items-center space-x-2">
              <Film className="w-8 h-8 text-red-500" />
              <span className="text-xl font-bold">Admin Panel</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-700 rounded-lg transition"
          >
            {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setCurrentPage('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              currentPage === 'dashboard' ? 'bg-red-600' : 'hover:bg-gray-700'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            {sidebarOpen && <span>Dashboard</span>}
          </button>

          <button
            onClick={() => handleNavigate('film-list')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              currentPage.startsWith('film') ? 'bg-red-600' : 'hover:bg-gray-700'
            }`}
          >
            <Film className="w-5 h-5" />
            {sidebarOpen && <span>Manajemen Film</span>}
          </button>

          <button
            onClick={() => handleNavigate('studio-list')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              currentPage.startsWith('studio') ? 'bg-red-600' : 'hover:bg-gray-700'
            }`}
          >
            <Armchair className="w-5 h-5" />
            {sidebarOpen && <span>Manajemen Studio</span>}
          </button>

          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition">
            <Calendar className="w-5 h-5" />
            {sidebarOpen && <span>Jadwal Film</span>}
          </button>

          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition">
            <DollarSign className="w-5 h-5" />
            {sidebarOpen && <span>Harga Tiket</span>}
          </button>

          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition">
            <Ticket className="w-5 h-5" />
            {sidebarOpen && <span>Transaksi</span>}
          </button>

          <button
            onClick={() => handleNavigate('user-list')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              currentPage.startsWith('user') ? 'bg-red-600' : 'hover:bg-gray-700'
            }`}
          >
            <Users className="w-5 h-5" />
            {sidebarOpen && <span>Manajemen User</span>}
          </button>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-600 transition"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto w-full">
        <header className="bg-gray-800 px-4 sm:px-8 py-4 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-700 rounded-lg transition"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">
              {currentPage === 'dashboard' && 'Dashboard'}
              {currentPage === 'film-list' && 'Manajemen Film'}
              {currentPage === 'film-tambah' && 'Tambah Film Baru'}
              {currentPage === 'film-edit' && 'Edit Film'}
              {currentPage === 'film-detail' && 'Detail Film'}
              {currentPage === 'film-restore' && 'Restore Film'}
              {currentPage === 'user-list' && 'Manajemen User'}
              {currentPage === 'user-tambah' && 'Tambah User Baru'}
              {currentPage === 'user-edit' && 'Edit User'}
              {currentPage === 'user-detail' && 'Detail User'}
              {currentPage === 'user-restore' && 'Restore User'}
              {currentPage === 'studio-list' && 'Manajemen Studio'}
              {currentPage === 'studio-tambah' && 'Tambah Studio Baru'}
              {currentPage === 'studio-edit' && 'Edit Studio'}
              {currentPage === 'studio-detail' && 'Detail Studio'}
              {currentPage === 'studio-restore' && 'Restore Studio'}
              </h1>
              <p className="text-gray-400 text-xs sm:text-sm">Welcome back, Admin!</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="text-right hidden sm:block">
              <div className="font-semibold text-sm">Admin User</div>
              <div className="text-xs text-gray-400">admin@cinema.com</div>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-full flex items-center justify-center font-bold text-sm sm:text-base">
              A
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
          {currentPage === 'film-list' && <FilmList onNavigate={handleNavigate} />}
          {currentPage === 'film-tambah' && <FilmTambah onNavigate={handleNavigate} />}
          {currentPage === 'film-edit' && <FilmEdit onNavigate={handleNavigate} selectedFilm={selectedFilm} />}
          {currentPage === 'film-detail' && <FilmDetail onNavigate={handleNavigate} selectedFilm={selectedFilm} />}
          {currentPage === 'film-restore' && <FilmRestore onNavigate={handleNavigate} />}
          {currentPage === 'user-list' && <UserList onNavigate={handleNavigate} />}
          {currentPage === 'user-tambah' && <UserTambah onNavigate={handleNavigate} />}
          {currentPage === 'user-edit' && <UserEdit onNavigate={handleNavigate} selectedUser={selectedFilm} />}
          {currentPage === 'user-detail' && <UserDetail onNavigate={handleNavigate} selectedUser={selectedFilm} />}
          {currentPage === 'user-restore' && <UserRestore onNavigate={handleNavigate} />}
          {currentPage === 'studio-list' && <StudioList onNavigate={handleNavigate} />}
          {currentPage === 'studio-tambah' && <StudioTambah onNavigate={handleNavigate} />}
          {currentPage === 'studio-edit' && <StudioEdit onNavigate={handleNavigate} selectedStudio={selectedFilm} />}
          {currentPage === 'studio-detail' && <StudioDetail onNavigate={handleNavigate} selectedStudio={selectedFilm} />}
          {currentPage === 'studio-restore' && <StudioRestore onNavigate={handleNavigate} />}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
