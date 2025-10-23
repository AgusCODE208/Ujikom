<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('laporan_keuangans', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal'); // tanggal transaksi masuk keuangan
            $table->enum('jenis', ['pemasukan', 'pengeluaran'])->default('pemasukan');
            $table->decimal('jumlah', 12, 2);
            $table->string('keterangan')->nullable();
            // Relasi opsional ke transaksi / pembayaran
            $table->foreignId('transaksi_id')->nullable()->constrained('transaksis')->nullOnDelete();
            $table->foreignId('pembayaran_id')->nullable()->constrained('pembayarans')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laporan_keuangans');
    }
};
