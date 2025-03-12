<?php

namespace App\Services;

use App\Models\Category;

class FieldsService extends BaseService
{
    public function __construct() {}

    // Lấy danh sách loại sân
    public function getListCategory()
    {
        return Category::all(["id", "name", "description"]);
    }
}
