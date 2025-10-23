<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    use HasFactory;

    protected $fillable = [
        'judul',
        'poster',
        'trailer',
        'deskripsi',
        'genre',
        'durasi',
        'Rating_Usia',
        'Rating_Film',
        'Director',
        'cast',
        'status',
        'is_publish',
    ];

    protected $casts = [
        'durasi' => 'integer',
    ];

    // Film memiliki banyak jadwal
    public function jadwals()
    {
        return $this->hasMany(Jadwal::class);
    }
}
