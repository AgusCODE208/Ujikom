<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LaporanKeuangan extends Model
{
    use HasFactory;

    protected $fillable = [
        'tanggal',
        'jenis',
        'jumlah',
        'keterangan',
        'transaksi_id',
        'pembayaran_id',
    ];

    protected $casts = [
        'tanggal' => 'date',
        'jumlah' => 'decimal:2',
    ];

    // Laporan milik transaksi
    public function transaksi()
    {
        return $this->belongsTo(Transaksi::class);
    }

    // Laporan milik pembayaran
    public function pembayaran()
    {
        return $this->belongsTo(Pembayaran::class);
    }
}
