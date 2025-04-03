<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfineUser extends Model
{
    use HasFactory;

    protected $table = 'profile_users';
    protected $fillable = ['user_id', 'date_of_birth', 'address', 'gender', 'avatar'];
}