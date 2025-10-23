<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'kasir_id',
        'jadwal_id',
        'kode_booking',
        'total_harga',
        'jumlah_kursi',
        'metode_pembayaran',
        'bukti_pembayaran',
        'status',
        'expired_at',
        'paid_at',
        'verified_by',
    ];

    protected $casts = [
        'total_harga' => 'decimal:2',
        'jumlah_kursi' => 'integer',
        'expired_at' => 'datetime',
        'paid_at' => 'datetime',
    ];

    // Transaksi milik user (pembeli)
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Transaksi dilayani kasir
    public function kasir()
    {
        return $this->belongsTo(User::class, 'kasir_id');
    }

    // Transaksi diverifikasi oleh
    public function verifier()
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    // Transaksi untuk jadwal
    public function jadwal()
    {
        return $this->belongsTo(Jadwal::class);
    }

    // Transaksi memiliki banyak detail (kursi)
    public function detailTransaksis()
    {
        return $this->hasMany(DetailTransaksi::class);
    }

    // Transaksi memiliki banyak pembayaran
    public function pembayarans()
    {
        return $this->hasMany(Pembayaran::class);
    }

    // Transaksi memiliki laporan keuangan
    public function laporanKeuangans()
    {
        return $this->hasMany(LaporanKeuangan::class);
    }
}
