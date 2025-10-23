<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Jadwal extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'film_id',
        'studio_id',
        'harga_id',
        'tanggal',
        'jam_mulai',
        'jam_selesai',
        'status',
    ];

    protected $casts = [
        'tanggal' => 'date',
    ];

    // Jadwal milik film
    public function film()
    {
        return $this->belongsTo(Film::class);
    }

    // Jadwal milik studio
    public function studio()
    {
        return $this->belongsTo(Studio::class);
    }

    // Jadwal milik harga
    public function harga()
    {
        return $this->belongsTo(Harga::class);
    }

    // Jadwal memiliki banyak transaksi
    public function transaksis()
    {
        return $this->hasMany(Transaksi::class);
    }
}
