import React, { useState } from 'react';
import { Film, ChevronLeft, CreditCard, Wallet, Building2, CheckCircle, Clock, MapPin, Calendar, Armchair, User, Mail, Phone, AlertCircle } from 'lucide-react';
import SuccessModal from '../../components/SuccessModal';
import { addTransaksi } from '../../utils/transaksiStorage';

const Checkout = ({ setCurrentView, checkoutData, setBookedSeats, setUserTickets }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    no_hp: ''
  });
  const [buktiPembayaran, setBuktiPembayaran] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (!checkoutData || !checkoutData.filmDetail || !checkoutData.selectedJadwal) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <CreditCard className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">Data checkout tidak lengkap</p>
          <button
            onClick={() => setCurrentView('home')}
            className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
          >
            Kembali ke Home
          </button>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const totalHarga = checkoutData.selectedSeats.length * (checkoutData.selectedJadwal.harga?.harga || 0);
  const adminFee = 2500;
  const grandTotal = totalHarga + adminFee;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBuktiPembayaran(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    if (!formData.nama || !formData.email || !formData.no_hp) {
      alert('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setBookedSeats(prev => [...prev, ...checkoutData.selectedSeats]);
      
      // Save to transaksiStorage
      const transaksi = {
        kode_booking: checkoutData.kode_booking,
        film_id: checkoutData.filmDetail.id,
        film_judul: checkoutData.filmDetail.judul,
        jadwal_id: checkoutData.selectedJadwal.id,
        tanggal: checkoutData.selectedDate.tanggal,
        jam_mulai: checkoutData.selectedJadwal.jam_mulai,
        studio: checkoutData.selectedJadwal.studio?.nama_studio,
        kursi: checkoutData.selectedSeats,
        jumlah_tiket: checkoutData.selectedSeats.length,
        harga_satuan: checkoutData.selectedJadwal.harga?.harga,
        total_harga: grandTotal,
        metode_pembayaran: paymentMethod,
        customer_nama: formData.nama,
        customer_email: formData.email,
        customer_telepon: formData.no_hp,
        kasir: 'User Online',
        status: 'success',
        created_at: new Date().toISOString()
      };
      addTransaksi(transaksi);
      
      const newTicket = {
        id: Date.now(),
        kode_booking: checkoutData.kode_booking,
        status: 'paid',
        tanggal_transaksi: new Date().toISOString(),
        total_harga: grandTotal,
        metode_pembayaran: paymentMethod,
        filmDetail: checkoutData.filmDetail,
        jadwal: {
          tanggal: checkoutData.selectedDate.tanggal,
          hari: checkoutData.selectedDate.hari,
          jam: checkoutData.selectedJadwal.jam_mulai,
          studio: checkoutData.selectedJadwal.studio?.nama_studio,
          tipe: checkoutData.selectedJadwal.studio?.tipe
        },
        seats: checkoutData.selectedSeats,
        user: formData
      };
      setUserTickets(prev => [newTicket, ...prev]);
      
      setShowSuccessModal(true);
    }, 2000);
  };

  const paymentMethods = [
    {
      id: 'qris',
      name: 'QRIS',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'Scan QR code untuk pembayaran'
    },
    {
      id: 'transfer',
      name: 'Bank Transfer',
      icon: <Building2 className="w-6 h-6" />,
      description: 'Transfer ke rekening bank'
    },
    {
      id: 'ewallet',
      name: 'E-Wallet',
      icon: <Wallet className="w-6 h-6" />,
      description: 'GoPay, OVO, Dana, ShopeePay'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => setCurrentView('pilihkursi')}
              className="flex items-center space-x-2 hover:text-red-500 transition"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Seat Selection</span>
            </button>
            <div className="flex items-center space-x-2">
              <Film className="w-8 h-8 text-red-500" />
              <span className="text-xl font-bold">MyCinema</span>
            </div>
            <div className="w-40"></div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Complete Your Booking</h1>
          <p className="text-gray-400">Review your order and proceed to payment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800 rounded-lg p-6" data-aos="fade-right">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-red-500" />
                Customer Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-red-500 focus:outline-none"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-red-500 focus:outline-none"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="no_hp"
                      value={formData.no_hp}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-red-500 focus:outline-none"
                      placeholder="08123456789"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6" data-aos="fade-right" data-aos-delay="100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-red-500" />
                Payment Method
              </h2>
              
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <button
                    key={`payment-${method.id}`}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`w-full p-4 rounded-lg border-2 transition flex items-center gap-4 ${
                      paymentMethod === method.id
                        ? 'bg-red-900/30 border-red-500'
                        : 'bg-gray-700 border-gray-600 hover:border-red-500'
                    }`}
                  >
                    <div className={`${paymentMethod === method.id ? 'text-red-500' : 'text-gray-400'}`} aria-hidden="true">
                      {method.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold">{method.name}</div>
                      <div className="text-sm text-gray-400">{method.description}</div>
                    </div>
                    {paymentMethod === method.id && (
                      <CheckCircle className="w-6 h-6 text-red-500" />
                    )}
                  </button>
                ))}
              </div>

              {(paymentMethod === 'transfer' || paymentMethod === 'qris') && (
                <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                  <label className="block text-sm font-medium mb-3">
                    Upload Payment Proof (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 file:cursor-pointer"
                  />
                  {buktiPembayaran && (
                    <p className="mt-2 text-sm text-green-500 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      {buktiPembayaran.name}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="bg-yellow-900/20 border border-yellow-600/50 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-yellow-500 mb-1">Important Notice:</p>
                <ul className="text-gray-300 space-y-1">
                  <li>• Please arrive 15 minutes before showtime</li>
                  <li>• Bring your booking code for ticket collection</li>
                  <li>• No refund for cancelled bookings</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1" data-aos="fade-left">
            <div className="bg-gray-800 rounded-lg p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="flex gap-4 mb-6 pb-6 border-b border-gray-700">
                <img 
                  src={checkoutData.filmDetail.poster} 
                  alt={checkoutData.filmDetail.judul}
                  className="w-20 h-28 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-bold mb-2">{checkoutData.filmDetail.judul}</h3>
                  <div className="space-y-1 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <span className="bg-red-600 px-2 py-0.5 rounded text-xs">
                        {checkoutData.filmDetail.rating_usia}
                      </span>
                      <Clock className="w-3 h-3" />
                      <span>{checkoutData.filmDetail.durasi} min</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-700 text-sm">
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-gray-400">Date & Time</div>
                    <div className="font-semibold">
                      {checkoutData.selectedDate.hari}, {checkoutData.selectedDate.tanggal}
                    </div>
                    <div className="font-semibold">{checkoutData.selectedJadwal.jam_mulai || 'N/A'}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-gray-400">Studio</div>
                    <div className="font-semibold">
                      {checkoutData.selectedJadwal.studio?.nama_studio || 'N/A'}
                    </div>
                    <div className="text-xs text-gray-400">
                      {checkoutData.selectedJadwal.studio?.tipe || 'Regular'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Armchair className="w-4 h-4 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-gray-400">Seats</div>
                    <div className="font-semibold">
                      {checkoutData.selectedSeats.join(', ')}
                    </div>
                    <div className="text-xs text-gray-400">
                      {checkoutData.selectedSeats.length} seat(s)
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-700">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">
                    Ticket ({checkoutData.selectedSeats.length}x)
                  </span>
                  <span className="font-semibold">{formatCurrency(totalHarga)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Admin Fee</span>
                  <span className="font-semibold">{formatCurrency(adminFee)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold">Grand Total</span>
                <span className="text-2xl font-bold text-red-500">
                  {formatCurrency(grandTotal)}
                </span>
              </div>

              <div className="bg-gray-700 rounded-lg p-3 mb-6">
                <div className="text-xs text-gray-400 mb-1">Booking Code</div>
                <div className="font-mono font-bold text-lg tracking-wider">
                  {checkoutData.kode_booking}
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isProcessing}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  isProcessing
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  'Confirm & Pay'
                )}
              </button>

              <p className="text-xs text-center text-gray-400 mt-4">
                By continuing, you agree to our Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal 
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          setCurrentView('home');
        }}
        bookingCode={checkoutData.kode_booking}
        totalPrice={formatCurrency(grandTotal)}
        userEmail={formData.email}
        onViewTicket={() => {
          setShowSuccessModal(false);
          setCurrentView('myticket');
        }}
      />
    </div>
  );
};

export default Checkout;
