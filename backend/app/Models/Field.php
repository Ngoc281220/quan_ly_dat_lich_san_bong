<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Field extends Model
{
    use HasFactory;

    protected $table = 'fields'; // Nếu bảng có tên khác, khai báo tại đây

    protected $fillable = [
        'name',
        'category_id',
        'location',
        'price',
        'status',
        'image',
        'description',
        'open_time',
        'close_time',
        'contact_phone',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function listCategory()
    {
        return $this->belongsTo(Category::class);
    }
}
