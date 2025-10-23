<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pembayaran extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaksi_id',
        'metode',
        'jumlah',
        'bukti_pembayaran',
        'status',
        'provider',
        'reference_id',
        'paid_at',
    ];

    protected $casts = [
        'jumlah' => 'decimal:2',
        'paid_at' => 'datetime',
    ];

    // Pembayaran milik transaksi
    public function transaksi()
    {
        return $this->belongsTo(Transaksi::class);
    }

    // Pembayaran memiliki laporan keuangan
    public function laporanKeuangans()
    {
        return $this->hasMany(LaporanKeuangan::class);
    }
}
