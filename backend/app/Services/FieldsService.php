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

    public function getListField($request) 
    {

    }
}
