<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $table = 'payments';
    protected $fillable = ['booking_id', 'order_code', 'total_price', 'payment_method', 'image_payment', 'date_payment', 'status'];
}
