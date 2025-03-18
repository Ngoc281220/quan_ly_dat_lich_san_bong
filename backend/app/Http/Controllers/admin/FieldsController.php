<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Services\FieldsService;
use App\Http\Requests\CreateFieldRequest;

class FieldsController extends Controller
{
    protected $fieldsService;
    public function __construct(FieldsService $fieldsService)
    {
        $this->fieldsService = $fieldsService;
    }

    // Lấy danh sách loại sân bóng
    public function getListCategory()
    {
        $categories = $this->fieldsService->getListCategory();
        return response()->json($categories);
    }

    public function createField(CreateFieldRequest $request)  {
        $data = $this->fieldsService->createField($request);
        return $data;
    }
}
