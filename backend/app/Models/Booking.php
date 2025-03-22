<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;
    protected $table = 'bookings';
    protected $fillable = ['sub_field_id', 'user_id', 'date', 'start_time', 'end_time', 'status'];

    // Mối quan hệ với sân con
    public function subField() {
        return $this->belongsTo(SubField::class, 'sub_field_id');
    }

    // Mối quan hệ với User
    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
}
