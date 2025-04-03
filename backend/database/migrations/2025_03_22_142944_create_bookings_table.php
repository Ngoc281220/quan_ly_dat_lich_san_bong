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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id(); // ID đặt sân
            $table->uuid('order_code');
            $table->unsignedBigInteger('field_id'); // ID sân
            $table->unsignedBigInteger('user_id'); //ID người dùng
            $table->decimal('total_hours', 5, 2)->default(0); // tổng giời đặt
            $table->decimal('total_price', 10, 2)->default(0);// tổng tiền  đặt
            $table->string('name_user_booking_field')->nullable();
            $table->string('phone')->nullable();
            $table->text('comment')->nullable();
            $table->integer('status', )->default(0)->comment('pending, confirmed, canceled');
            $table->timestamps();
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
