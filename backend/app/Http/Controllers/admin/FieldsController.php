<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\FieldsService;
use App\Http\Requests\CreateFieldRequest;
use App\Http\Resources\ApiResourceCollection;

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

    public function createField(CreateFieldRequest $request)
    {
        $data = $this->fieldsService->createField($request);
        return response()->json($data);
    }

    public function getListField(Request $request)
    {
        $data = $this->fieldsService->getListField($request);
        // return new ApiResourceCollection($data, 'Danh sách sân thể thao', 200);
    }
}
