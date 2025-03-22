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
        Schema::table('bookings', function (Blueprint $table) {
            $table->id(); // ID đặt sân
            $table->unsignedBigInteger('sub_field_id'); // ID sân con
            $table->unsignedBigInteger('user_id'); // ID người dùng
            $table->date('date'); // Ngày đặt sân
            $table->time('start_time'); // Giờ bắt đầu
            $table->time('end_time'); // Giờ kết thúc
            $table->unsignedBigInteger('status')->default(0); // Trạng thái
            $table->timestamps(); // created_at, updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
