<?php

namespace App\Services;

use App\Models\Category;
use App\Models\Field;
use Illuminate\Support\Facades\Log;

class FieldsService extends BaseService
{
    public function __construct() {}

    // Lấy danh sách loại sân
    public function getListCategory()
    {
        return Category::all(["id", "name", "description"]);
    }

    // Tạo sân thể thao
    public function createField($request)
    {
        $data = $request->all();
        if ($request->hasFile('images')) {
            $data['images'] = $this->saveFile($request->file('images'), 'fields');
        }
        $data['image'] = json_encode($data['images']);
        $data['open_time'] = "6:00";
        $data['close_time'] = "22:00";
        return Field::create($data);
    }

    // Get danh sách sân
    public function getListField($request)
    {
        $search = $request->search ?? '';
        $perPage = 10;
        
        $query = Field::select(
            'fields.id',
            'fields.name',
            'fields.category_id',
            'fields.location',
            'fields.price',
            'fields.status',
            'fields.image',
            'fields.open_time',
            'fields.close_time',
            'fields.contact_phone',
            'categories.name as category_name'
        )
        ->join('categories', 'categories.id', '=', 'fields.category_id');

        if (!empty($search)) {
            $query->where('fields.name', 'like', "%{$search}%")
                ->orWhere('fields.location', 'like', "%{$search}%");
        }

        return $query->paginate($perPage);
    }

    public function getFiledByID($id) 
    {
        return Field::find($id);
    }
}
