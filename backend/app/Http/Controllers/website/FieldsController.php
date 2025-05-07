<?php

namespace App\Http\Controllers\Website;

use App\Http\Controllers\Controller;
use App\Services\FieldsService;
use App\Utils\ApiResponder;
use App\Transformers\Website\FieldTransformer;
use Illuminate\Http\Request;

class FieldsController extends Controller
{
    protected $fieldService;
    public function __construct(FieldsService $fieldService)
    {
        $this->fieldService = $fieldService;
    }

    public function loadListField()
    {
        $data = $this->fieldService->loadListField();
        return (new ApiResponder($data, new FieldTransformer()))->collection();
    }

    // load tên category
    public function loadCategory()
    {
        $data = $this->fieldService->loadCategory();
        return response()->json($data);
    }

    public function searchField(Request $request)
    {
        $data = $this->fieldService->searchField($request);
        return (new ApiResponder($data, new FieldTransformer()))->collection();
    }
}
