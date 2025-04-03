<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;
    protected $table = 'bookings';
    protected $fillable = ['order_code','field_id', 'user_id', 'total_hours', 'total_price', 'name_user_booking_field', 'phone', 'comment', 'status'];
    
    // Mối quan hệ với sân con
    public function subField() {
        return $this->belongsTo(SubField::class, 'sub_field_id');
    }

    // Mối quan hệ với User
    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
}
