<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailTransaksi extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaksi_id',
        'kursi_id',
        'harga',
    ];

    protected $casts = [
        'harga' => 'decimal:2',
    ];

    // Detail transaksi milik transaksi
    public function transaksi()
    {
        return $this->belongsTo(Transaksi::class);
    }

    // Detail transaksi untuk kursi
    public function kursi()
    {
        return $this->belongsTo(Kursi::class);
    }
}
