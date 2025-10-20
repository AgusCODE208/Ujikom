import React from 'react';
import { Film, Ticket, User, TrendingUp, Clock } from 'lucide-react';

const Dashboard = ({ setCurrentView }) => {
  const stats = [
    { icon: <Ticket className="w-8 h-8" />, label: 'Total Bookings', value: '12', color: 'bg-blue-600' },
    { icon: <Film className="w-8 h-8" />, label: 'Movies Watched', value: '8', color: 'bg-purple-600' },
    { icon: <Clock className="w-8 h-8" />, label: 'Upcoming', value: '2', color: 'bg-green-600' },
    { icon: <TrendingUp className="w-8 h-8" />, label: 'Points', value: '450', color: 'bg-red-600' }
  ];

  const recentBookings = [
    { id: 1, film: 'Guardians of the Galaxy Vol. 3', date: '2024-10-20', time: '19:00', status: 'Upcoming' },
    { id: 2, film: 'The Little Mermaid', date: '2024-10-15', time: '13:00', status: 'Completed' },
    { id: 3, film: 'Fast X', date: '2024-10-10', time: '16:00', status: 'Completed' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6">
              <div className={`${stat.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
          <div className="space-y-4">
            {recentBookings.map(booking => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center gap-4">
                  <Film className="w-10 h-10 text-red-500" />
                  <div>
                    <div className="font-semibold">{booking.film}</div>
                    <div className="text-sm text-gray-400">{booking.date} • {booking.time}</div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded text-sm ${
                  booking.status === 'Upcoming' ? 'bg-green-600' : 'bg-gray-600'
                }`}>
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
