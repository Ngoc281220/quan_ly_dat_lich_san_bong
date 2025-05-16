<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\CategoriesService;
use App\Transformers\admin\CategoriesTranformer;
use App\Utils\ApiResponder;

class CategoriesController extends Controller
{
    protected $categoriesService;

    public function __construct(CategoriesService $categoriesService)
    {
        $this->categoriesService = $categoriesService;
    }

    public function loadCategory(Request $request)
    {
        $data = $this->categoriesService->loadCategory($request);
        return (new ApiResponder($data, new CategoriesTranformer()))->pagination();
    }

    public function create(Request $request) {
        $data = $this->categoriesService->create($request);
        return (new ApiResponder($data, new CategoriesTranformer()))->data();
    }

    public function find($id) {
        $data = $this->categoriesService->find($id);
        return (new ApiResponder($data, new CategoriesTranformer()))->data();
    }

     public function update(Request $request, $id) {
        $data = $this->categoriesService->update($request, $id);
        return (new ApiResponder($data, new CategoriesTranformer()))->data();
    }
}
