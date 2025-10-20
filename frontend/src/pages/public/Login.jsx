import React from 'react';
import { Film } from 'lucide-react';

const Login = ({ setCurrentView, setIsLoggedIn }) => {
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <Film className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="text-gray-400 mt-2">Login to book your tickets</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-red-500 focus:outline-none"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-red-500 focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition">
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{' '}
          <button
            onClick={() => setCurrentView('register')}
            className="text-red-500 hover:text-red-400 font-semibold"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
