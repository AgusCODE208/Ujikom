import React, { useState } from 'react';
import { Film, ChevronLeft, Ticket, Calendar, Clock, MapPin, Armchair, QrCode, Download, Share2, AlertCircle, CheckCircle, XCircle, Eye } from 'lucide-react';
import TicketDetail from './TicketDetail';

const MyTicket = ({ setCurrentView, userTickets = [] }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);

  const getStatusBadge = (status) => {
    const statusConfig = {
      paid: { 
        text: 'Paid', 
        icon: <CheckCircle className="w-4 h-4" />,
        className: 'bg-green-900/30 text-green-500 border border-green-500/50'
      },
      pending: { 
        text: 'Pending Payment', 
        icon: <Clock className="w-4 h-4" />,
        className: 'bg-yellow-900/30 text-yellow-500 border border-yellow-500/50'
      }
    };
    return statusConfig[status] || statusConfig.paid;
  };

  const getPaymentMethodText = (method) => {
    const methods = {
      qris: 'QRIS',
      transfer: 'Bank Transfer',
      ewallet: 'E-Wallet'
    };
    return methods[method] || method;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredTickets = userTickets.filter(ticket => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') {
      const showDate = new Date(ticket.jadwal.tanggal);
      return showDate >= new Date() && ticket.status === 'paid';
    }
    if (activeTab === 'past') {
      const showDate = new Date(ticket.jadwal.tanggal);
      return showDate < new Date();
    }
    return true;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
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
              <span className="text-xl font-bold">CinemaTicket</span>
            </div>
            <div className="w-32"></div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-red-900 to-pink-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Ticket className="w-10 h-10 text-red-500" />
            <h1 className="text-4xl font-bold">My Tickets</h1>
          </div>
          <p className="text-gray-300 text-lg">View and manage your movie bookings</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Tabs */}
        <div className="flex space-x-8 mb-8 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-4 border-b-2 transition font-medium ${
              activeTab === 'all'
                ? 'border-red-500 text-red-500'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            All Tickets ({userTickets.length})
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-4 border-b-2 transition font-medium ${
              activeTab === 'upcoming'
                ? 'border-red-500 text-red-500'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-4 py-4 border-b-2 transition font-medium ${
              activeTab === 'past'
                ? 'border-red-500 text-red-500'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Past
          </button>
        </div>

        {/* Tickets List */}
        {filteredTickets.length === 0 ? (
          <div className="text-center py-20">
            <Ticket className="w-20 h-20 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No tickets found</h3>
            <p className="text-gray-500 mb-6">You haven't made any bookings yet</p>
            <button
              onClick={() => setCurrentView('home')}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition"
            >
              Browse Movies
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredTickets.map((ticket) => {
              const statusBadge = getStatusBadge(ticket.status);
              
              return (
                <div 
                  key={`ticket-${ticket.id}`}
                  className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Poster */}
                      <div className="flex-shrink-0">
                        <img 
                          src={ticket.filmDetail.poster}
                          alt={ticket.filmDetail.judul}
                          className="w-32 h-48 object-cover rounded-lg"
                        />
                      </div>

                      {/* Ticket Info */}
                      <div className="flex-1 space-y-4">
                        {/* Header */}
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <h3 className="text-2xl font-bold mb-2">{ticket.filmDetail.judul}</h3>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                              <span className="bg-red-600 px-2 py-1 rounded text-white text-xs">
                                {ticket.filmDetail.rating_usia}
                              </span>
                              <span>{ticket.filmDetail.genre}</span>
                            </div>
                          </div>
                          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${statusBadge.className}`}>
                            {statusBadge.icon}
                            <span className="font-semibold text-sm">{statusBadge.text}</span>
                          </div>
                        </div>

                        {/* Booking Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4 border-t border-b border-gray-700">
                          <div className="flex items-start gap-2">
                            <Calendar className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="text-xs text-gray-400">Date</div>
                              <div className="font-semibold">{ticket.jadwal.hari}</div>
                              <div className="text-sm text-gray-400">{ticket.jadwal.tanggal}</div>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <Clock className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="text-xs text-gray-400">Time</div>
                              <div className="font-semibold text-lg">{ticket.jadwal.jam}</div>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="text-xs text-gray-400">Studio</div>
                              <div className="font-semibold">{ticket.jadwal.studio}</div>
                              <div className="text-xs text-gray-400">{ticket.jadwal.tipe}</div>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <Armchair className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <div className="text-xs text-gray-400">Seats</div>
                              <div className="font-semibold">{ticket.seats.join(', ')}</div>
                              <div className="text-xs text-gray-400">{ticket.seats.length} seat(s)</div>
                            </div>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <div className="text-sm text-gray-400 mb-1">Booking Code</div>
                            <div className="font-mono font-bold text-lg tracking-wider">{ticket.kode_booking}</div>
                            <div className="text-xs text-gray-400 mt-1">
                              Booked on {formatDate(ticket.tanggal_transaksi)}
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-sm text-gray-400 mb-1">Total Payment</div>
                            <div className="text-2xl font-bold text-red-500">
                              {formatCurrency(ticket.total_harga)}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              via {getPaymentMethodText(ticket.metode_pembayaran)}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3 pt-4">
                          <button
                            onClick={() => setSelectedTicket(ticket)}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition"
                          >
                            <QrCode className="w-4 h-4" />
                            View E-Ticket
                          </button>
                          <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-semibold transition">
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                          <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-semibold transition">
                            <Share2 className="w-4 h-4" />
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <TicketDetail ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
    </div>
  );
};

export default MyTicket;
