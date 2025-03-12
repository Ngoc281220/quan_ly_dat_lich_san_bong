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
        Schema::create('fields', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('category_id');
            $table->string('location');
            $table->decimal('price', 10, 2);
            $table->integer('status')->default(0)->comment('0:available, 1:booked, 2: maintenance');
            $table->json('image')->nullable()->comment('{ name: , path: }');
            $table->time('open_time')->default('06:00'); // Giờ mở cửa
            $table->time('close_time')->default('22:00'); // Gio đóng
            $table->string('contact_phone', 10)->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fields');
    }
};
