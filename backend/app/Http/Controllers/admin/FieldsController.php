<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\FieldsService;
use App\Http\Requests\CreateFieldRequest;
use App\Utils\ApiResponder;
use App\Transformers\FieldTransformer;
use App\Transformers\admin\FieldDetailTransformer;

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
        return (new ApiResponder($data, new FieldTransformer()))->pagination();
    }

    public function getFieldByID($id)
    {
        $data = $this->fieldsService->getFiledByID($id);
        return (new ApiResponder($data, new FieldTransformer()))->data();
    }

    // Xóa sân thể thao
    public function deleteField($id)
    {
        $data = $this->fieldsService->deleteField($id);
        return response()->json([
            'message' => 'Xóa sân thành công',
            'status' => 200,
            'data' => $data
        ]);
    }

    public function detailField($id)
    {
        $data = $this->fieldsService->detailField($id);
        return (new ApiResponder($data, new FieldDetailTransformer()))->data();
    }

    public function updateField(Request $request, $id) 
    {
        $data = $this->fieldsService->updateField($request, $id);
        return (new ApiResponder($data, new FieldDetailTransformer()))->data();
    }
}
