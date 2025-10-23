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
        Schema::create('transaksis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('kasir_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('jadwal_id')->constrained('jadwals')->restrictOnDelete();
            $table->string('kode_booking', 20)->unique();
            $table->decimal('total_harga', 10, 2);
            $table->unsignedInteger('jumlah_kursi');
            $table->enum('metode_pembayaran', ['cash', 'debit', 'credit', 'ewallet', 'qris', 'transfer'])->nullable();
            $table->string('bukti_pembayaran')->nullable();
            $table->enum('status', ['pending', 'paid', 'expired', 'cancelled', 'used'])->default('pending');
            $table->timestamp('expired_at')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->foreignId('verified_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            // Indexes
            $table->index(['status', 'created_at']);
            $table->index(['jadwal_id', 'status'], 'idx_schedule_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaksis');
    }
};
