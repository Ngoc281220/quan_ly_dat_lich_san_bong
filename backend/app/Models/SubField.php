<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Field;

class SubField extends Model
{
    use HasFactory;
    protected $table = 'sub_fields';
    protected $fillable = ['field_id', 'name', 'status'];

    public function Field() {
        return $this->belongsTo(Field::class, 'field_id');
    }
}
