import React, { useState } from 'react';
import { ChevronLeft, CreditCard, Wallet, Banknote, CheckCircle, Printer } from 'lucide-react';
import { addTransaksi, generateKodeBooking } from '../../utils/transaksiStorage';

const KonfirmasiPembayaran = ({ customerInfo, filmDetail, selectedJadwal, selectedDate, selectedSeats, onComplete, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [transactionData, setTransactionData] = useState(null);

  const totalPrice = selectedSeats.length * (selectedJadwal?.harga?.harga || 0);
  const change = paymentAmount ? parseInt(paymentAmount) - totalPrice : 0;

  const paymentMethods = [
    { id: 'cash', name: 'Tunai', icon: Banknote },
    { id: 'debit', name: 'Kartu Debit', icon: CreditCard },
    { id: 'credit', name: 'Kartu Kredit', icon: CreditCard },
    { id: 'ewallet', name: 'E-Wallet', icon: Wallet }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Pilih metode pembayaran');
      return;
    }

    if (paymentMethod === 'cash' && (!paymentAmount || parseInt(paymentAmount) < totalPrice)) {
      alert('Jumlah pembayaran tidak cukup');
      return;
    }

    const kodeBooking = generateKodeBooking();
    const transaksi = {
      kode_booking: kodeBooking,
      film_id: filmDetail.id,
      film_judul: filmDetail.judul,
      jadwal_id: selectedJadwal.id,
      tanggal: selectedDate.tanggal,
      jam_mulai: selectedJadwal.jam_mulai,
      studio: selectedJadwal.studio?.nama_studio,
      kursi: selectedSeats,
      jumlah_tiket: selectedSeats.length,
      harga_satuan: selectedJadwal.harga?.harga,
      total_harga: totalPrice,
      metode_pembayaran: paymentMethod,
      customer_nama: customerInfo.nama,
      customer_email: customerInfo.email,
      customer_telepon: customerInfo.telepon,
      kasir: 'Kasir',
      status: 'success',
      created_at: new Date().toISOString()
    };

    addTransaksi(transaksi);
    setTransactionData(transaksi);
    setShowSuccess(true);
  };

  const handlePrint = () => {
    window.print();
  };

  if (showSuccess) {
    return (
      <div className="bg-gray-800 rounded-lg p-8">
        <div className="text-center mb-8">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Pembayaran Berhasil!</h2>
          <p className="text-gray-400">Transaksi telah berhasil diproses</p>
        </div>

        <div className="bg-gray-700 rounded-lg p-6 mb-6 max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <div className="text-sm text-gray-400 mb-1">Kode Booking</div>
            <div className="text-3xl font-bold text-red-500">{transactionData.kode_booking}</div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-400">Customer</div>
              <div className="font-semibold">{transactionData.customer_nama}</div>
            </div>
            <div>
              <div className="text-gray-400">Telepon</div>
              <div className="font-semibold">{transactionData.customer_telepon}</div>
            </div>
            <div>
              <div className="text-gray-400">Film</div>
              <div className="font-semibold">{transactionData.film_judul}</div>
            </div>
            <div>
              <div className="text-gray-400">Tanggal</div>
              <div className="font-semibold">{selectedDate.hari}, {selectedDate.display}</div>
            </div>
            <div>
              <div className="text-gray-400">Jam</div>
              <div className="font-semibold">{transactionData.jam_mulai}</div>
            </div>
            <div>
              <div className="text-gray-400">Studio</div>
              <div className="font-semibold">{transactionData.studio}</div>
            </div>
            <div>
              <div className="text-gray-400">Kursi</div>
              <div className="font-semibold">{transactionData.kursi.join(', ')}</div>
            </div>
            <div>
              <div className="text-gray-400">Total</div>
              <div className="font-semibold text-red-500">{formatCurrency(transactionData.total_harga)}</div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition"
          >
            <Printer className="w-5 h-5" />
            Cetak Tiket
          </button>
          <button
            onClick={onComplete}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
          >
            Transaksi Baru
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Kembali</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ringkasan Pesanan */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Ringkasan Pesanan</h2>
          
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-400 mb-1">Customer</div>
              <div className="font-semibold">{customerInfo.nama}</div>
              <div className="text-sm text-gray-400">{customerInfo.email}</div>
              <div className="text-sm text-gray-400">{customerInfo.telepon}</div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="text-sm text-gray-400 mb-1">Film</div>
              <div className="font-semibold">{filmDetail.judul}</div>
            </div>

            <div>
              <div className="text-sm text-gray-400 mb-1">Jadwal</div>
              <div className="font-semibold">{selectedDate.hari}, {selectedDate.display}</div>
              <div className="text-sm">{selectedJadwal.jam_mulai} - Studio {selectedJadwal.studio?.nama_studio}</div>
            </div>

            <div>
              <div className="text-sm text-gray-400 mb-1">Kursi</div>
              <div className="font-semibold">{selectedSeats.join(', ')}</div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Harga Tiket</span>
                <span>{formatCurrency(selectedJadwal.harga?.harga)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Jumlah Tiket</span>
                <span>{selectedSeats.length} tiket</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-2 border-t border-gray-700">
                <span>Total</span>
                <span className="text-red-500">{formatCurrency(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Metode Pembayaran */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Metode Pembayaran</h2>
          
          <div className="space-y-3 mb-6">
            {paymentMethods.map(method => {
              const Icon = method.icon;
              return (
                <button
                  key={`payment-${method.id}`}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`w-full flex items-center gap-3 p-4 rounded-lg transition ${
                    paymentMethod === method.id ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="font-semibold">{method.name}</span>
                </button>
              );
            })}
          </div>

          {paymentMethod === 'cash' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Jumlah Uang Diterima</label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-lg"
                  placeholder="0"
                />
              </div>
              {paymentAmount && (
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Total Bayar</span>
                    <span className="font-semibold">{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Uang Diterima</span>
                    <span className="font-semibold">{formatCurrency(parseInt(paymentAmount))}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-600">
                    <span>Kembalian</span>
                    <span className={change >= 0 ? 'text-green-500' : 'text-red-500'}>
                      {formatCurrency(change)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={!paymentMethod || (paymentMethod === 'cash' && change < 0)}
            className={`w-full py-4 rounded-lg font-bold text-lg mt-6 transition ${
              !paymentMethod || (paymentMethod === 'cash' && change < 0)
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            Proses Pembayaran
          </button>
        </div>
      </div>
    </div>
  );
};

export default KonfirmasiPembayaran;
