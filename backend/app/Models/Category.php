<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $table = 'categories'; // Nếu bảng có tên khác, khai báo tại đây

    protected $fillable = [
        'name',
        'description',
    ];
}
