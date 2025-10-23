<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Studio extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'nama_studio',
        'tipe',
        'kapasitas',
        'layout_rows',
        'layout_cols',
        'status',
    ];

    protected $casts = [
        'kapasitas' => 'integer',
        'layout_rows' => 'integer',
        'layout_cols' => 'integer',
    ];

    // Studio memiliki banyak kursi
    public function kursis()
    {
        return $this->hasMany(Kursi::class);
    }

    // Studio memiliki banyak jadwal
    public function jadwals()
    {
        return $this->hasMany(Jadwal::class);
    }
}
