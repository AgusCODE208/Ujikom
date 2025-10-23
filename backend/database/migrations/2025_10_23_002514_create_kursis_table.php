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
        Schema::create('kursis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('studio_id')->constrained('studios')->cascadeOnDelete();
            $table->string('kode_kursi', 10);
            $table->integer('row_number');
            $table->integer('col_number');
            $table->enum('status', ['tersedia', 'rusak', 'maintenance'])->default('tersedia');
            $table->timestamps();
            $table->unique(['studio_id', 'kode_kursi']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kursis');
    }
};
