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

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [bookingData, setBookingData] = useState(null);
  const [checkoutData, setCheckoutData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [bookedSeatsCount, setBookedSeatsCount] = useState({});
  const [userTickets, setUserTickets] = useState([]);

  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/admin') {
      setCurrentView('admin');
    }
  }, []);

  const handleAdminLogout = () => {
    setCurrentView('home');
    window.history.pushState({}, '', '/');
  };

  if (currentView === 'admin') {
    return <AdminLayout onLogout={handleAdminLogout} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {currentView !== 'filmdetail' && currentView !== 'pilihkursi' && currentView !== 'checkout' && currentView !== 'myticket' && currentView !== 'profile' && (
        <Navbar setCurrentView={setCurrentView} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
      
      {currentView === 'home' && <Home setCurrentView={setCurrentView} />}
      {currentView === 'login' && <Login setCurrentView={setCurrentView} setIsLoggedIn={setIsLoggedIn} />}
      {currentView === 'register' && <Register setCurrentView={setCurrentView} />}
      {currentView === 'filmdetail' && <FilmDetail setCurrentView={setCurrentView} setBookingData={setBookingData} isLoggedIn={isLoggedIn} bookedSeatsCount={bookedSeatsCount} />}
      {currentView === 'pilihkursi' && bookingData && isLoggedIn && (
        <PilihKursi 
          setCurrentView={setCurrentView} 
          selectedJadwal={bookingData.selectedJadwal}
          selectedDate={bookingData.selectedDate}
          filmDetail={bookingData.filmDetail}
          setCheckoutData={setCheckoutData}
          bookedSeats={bookedSeats}
        />
      )}
      {currentView === 'checkout' && checkoutData && isLoggedIn && (
        <Checkout 
          setCurrentView={setCurrentView}
          checkoutData={checkoutData}
          setBookedSeats={setBookedSeats}
          setBookedSeatsCount={setBookedSeatsCount}
          setUserTickets={setUserTickets}
        />
      )}
      {currentView === 'myticket' && isLoggedIn && (
        <MyTicket 
          setCurrentView={setCurrentView}
          userTickets={userTickets}
        />
      )}
      {currentView === 'profile' && isLoggedIn && (
        <Profile 
          setCurrentView={setCurrentView}
        />
      )}
    </div>
  );
}

export default App;
