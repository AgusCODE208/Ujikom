import React from 'react';
import { X, QrCode, Download, Calendar, Clock, MapPin, Armchair, Film } from 'lucide-react';

const TicketDetail = ({ ticket, onClose }) => {
  if (!ticket) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">E-Ticket</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* QR Code */}
          <div className="bg-white rounded-lg p-8 flex flex-col items-center">
            <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
              <QrCode className="w-32 h-32 text-gray-400" />
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-1">Booking Code</p>
              <p className="font-mono font-bold text-2xl text-gray-900 tracking-wider">
                {ticket.kode_booking}
              </p>
            </div>
          </div>

          {/* Movie Info */}
          <div className="bg-gray-700 rounded-lg p-6">
            <div className="flex gap-4 mb-4">
              <img 
                src={ticket.filmDetail.poster} 
                alt={ticket.filmDetail.judul}
                className="w-24 h-36 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{ticket.filmDetail.judul}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="bg-red-600 px-2 py-1 rounded text-white text-xs">
                    {ticket.filmDetail.rating_usia}
                  </span>
                  <span>{ticket.filmDetail.genre}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-600">
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
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-gray-700 rounded-lg p-6">
            <h4 className="font-bold mb-4">Payment Information</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Payment</span>
                <span className="font-bold text-red-500">{formatCurrency(ticket.total_harga)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Payment Method</span>
                <span className="font-semibold capitalize">{ticket.metode_pembayaran}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Status</span>
                <span className="px-2 py-1 bg-green-600 rounded text-xs font-semibold">Paid</span>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-yellow-900/20 border border-yellow-600/50 rounded-lg p-4">
            <h4 className="font-bold text-yellow-500 mb-2">Important Notes:</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Please arrive 15 minutes before showtime</li>
              <li>• Show this QR code at the entrance</li>
              <li>• This ticket is non-refundable</li>
              <li>• Keep this ticket until the end of the show</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition">
              <Download className="w-5 h-5" />
              Download Ticket
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
