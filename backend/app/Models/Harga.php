<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Harga extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'tipe',
        'harga',
        'keterangan',
    ];

    protected $casts = [
        'harga' => 'decimal:2',
    ];

    // Harga memiliki banyak jadwal
    public function jadwals()
    {
        return $this->hasMany(Jadwal::class);
    }
}
