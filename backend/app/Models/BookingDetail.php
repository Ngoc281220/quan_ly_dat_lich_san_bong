<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingDetail extends Model
{
    use HasFactory;
    protected $table = 'booking_details';
    protected $fillable = ['booking_id', 'sub_field_id', 'date', 'start_time', 'end_time', 'status'];
}
