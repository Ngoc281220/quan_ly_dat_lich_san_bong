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

    public function createField($request) 
    {
        $data = $request->all();
        Log::info('data', $data);
        if ($request->hasFile('images')) {
         $data['images'] = $this->saveFile($request->file('images'), 'fields');
        }

        // Chuyển danh sách file thành JSON để lưu DB
        $data['image'] = json_encode($data['images']);

        $field = Field::create($data);
        return $field;
    }
}
