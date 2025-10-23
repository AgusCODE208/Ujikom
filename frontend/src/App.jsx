import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import FilmDetail from './pages/public/FilmDetail';
import PilihKursi from './pages/user/PilihKursi';
import Checkout from './pages/user/Checkout';
import MyTicket from './pages/user/MyTicket';
import Profile from './pages/user/Profile';
import AdminLayout from './layouts/AdminLayout';
import KasirLayout from './layouts/KasirLayout';
import OwnerLayout from './layouts/OwnerLayout';
import useAuthStore from './stores/useAuthStore';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [previousView, setPreviousView] = useState('home');
  const [selectedFilmId, setSelectedFilmId] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [checkoutData, setCheckoutData] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [userTickets, setUserTickets] = useState([]);
  const { isAuthenticated, getRole } = useAuthStore();

  const handleViewChange = (view) => {
    setPreviousView(currentView);
    setCurrentView(view);
  };



  useEffect(() => {
    const path = window.location.pathname;
    const role = getRole();
    
    if (path === '/admin') {
      if (role === 'admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('home');
        window.history.pushState({}, '', '/');
      }
    } else if (path === '/kasir') {
      if (role === 'kasir') {
        setCurrentView('kasir');
      } else {
        setCurrentView('home');
        window.history.pushState({}, '', '/');
      }
    } else if (path === '/owner') {
      if (role === 'owner') {
        setCurrentView('owner');
      } else {
        setCurrentView('home');
        window.history.pushState({}, '', '/');
      }
    }
  }, []);

  const handleAdminLogout = () => {
    setCurrentView('home');
    window.history.pushState({}, '', '/');
  };

  const handleKasirLogout = () => {
    setCurrentView('home');
    window.history.pushState({}, '', '/');
  };

  const handleOwnerLogout = () => {
    setCurrentView('home');
    window.history.pushState({}, '', '/');
  };

  // Proteksi akses berdasarkan role
  if (currentView === 'admin') {
    const role = getRole();
    if (role !== 'admin') {
      setCurrentView('home');
      return null;
    }
    return <AdminLayout onLogout={handleAdminLogout} />;
  }

  if (currentView === 'kasir') {
    const role = getRole();
    if (role !== 'kasir') {
      setCurrentView('home');
      return null;
    }
    return <KasirLayout onLogout={handleKasirLogout} />;
  }

  if (currentView === 'owner') {
    const role = getRole();
    if (role !== 'owner') {
      setCurrentView('home');
      return null;
    }
    return <OwnerLayout onLogout={handleOwnerLogout} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {currentView !== 'filmdetail' && currentView !== 'pilihkursi' && currentView !== 'checkout' && currentView !== 'myticket' && currentView !== 'profile' && (
        <Navbar key={isAuthenticated ? 'auth' : 'guest'} setCurrentView={handleViewChange} />
      )}
      
      {currentView === 'home' && <Home setCurrentView={handleViewChange} setSelectedFilmId={setSelectedFilmId} />}
      {currentView === 'login' && <Login setCurrentView={handleViewChange} previousView={previousView} />}
      {currentView === 'register' && <Register setCurrentView={handleViewChange} />}
      {currentView === 'filmdetail' && <FilmDetail setCurrentView={handleViewChange} setBookingData={setBookingData} isLoggedIn={isAuthenticated} filmId={selectedFilmId} />}
      {currentView === 'pilihkursi' && bookingData && (
        <PilihKursi 
          setCurrentView={handleViewChange} 
          selectedJadwal={bookingData.selectedJadwal}
          selectedDate={bookingData.selectedDate}
          filmDetail={bookingData.filmDetail}
          setCheckoutData={setCheckoutData}
          bookedSeats={bookingData.bookedSeats || []}
        />
      )}
      {currentView === 'checkout' && checkoutData && isAuthenticated && (
        <Checkout 
          setCurrentView={handleViewChange}
          checkoutData={checkoutData}
          setBookedSeats={setBookedSeats}
          setUserTickets={setUserTickets}
        />
      )}
      {currentView === 'myticket' && isAuthenticated && (
        <MyTicket 
          setCurrentView={handleViewChange}
          userTickets={userTickets}
        />
      )}
      {currentView === 'profile' && isAuthenticated && (
        <Profile 
          setCurrentView={handleViewChange}
        />
      )}
    </div>
  );
}

export default App;
