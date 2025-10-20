import React from 'react';
import { Film, LogIn, User, LogOut, Ticket } from 'lucide-react';

const Navbar = ({ setCurrentView, isLoggedIn, setIsLoggedIn }) => {
  return (
    <nav className="bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setCurrentView('home')}
          >
            <Film className="w-8 h-8 text-red-500" />
            <span className="text-xl font-bold">MyCinema</span>
          </div>

          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => setCurrentView('login')}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => setCurrentView('register')}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
                >
                  <User className="w-4 h-4" />
                  <span>Register</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setCurrentView('myticket')}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                >
                  <Ticket className="w-4 h-4" />
                  <span>My Tickets</span>
                </button>
                <button
                  onClick={() => setCurrentView('profile')}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setCurrentView('home');
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
