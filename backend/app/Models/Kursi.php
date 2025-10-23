<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kursi extends Model
{
    use HasFactory;

    protected $fillable = [
        'studio_id',
        'kode_kursi',
        'row_number',
        'col_number',
        'status',
    ];

    protected $casts = [
        'row_number' => 'integer',
        'col_number' => 'integer',
    ];

    // Kursi milik studio
    public function studio()
    {
        return $this->belongsTo(Studio::class);
    }

    // Kursi memiliki banyak detail transaksi
    public function detailTransaksis()
    {
        return $this->hasMany(DetailTransaksi::class);
    }

}
