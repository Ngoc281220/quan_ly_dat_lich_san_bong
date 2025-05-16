<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Support\Facades\Validator;

class CategoriesService extends BaseService
{

    public function __construct() {}

    public function loadCategory($request)
    {
        $search = $request->search ?? '';
        $perPage = 10;

        // Khởi tạo query builder
        $query = Category::query();

        if (!empty($search)) {
            $query->where('users.name', 'like', "%{$search}%");
        }

        return $query->paginate($perPage);
    }

    public function create($request)
    {
        $request->validate([
            'name' => 'required|string|unique:categories,name',
            'description' => 'nullable|string',
        ], [
            'name.required' => 'Tên danh mục là bắt buộc.',
            'name.string' => 'Tên danh mục phải là chuỗi.',
            'name.unique' => 'Tên danh mục đã tồn tại.',
            'description.string' => 'Mô tả phải là chuỗi.',
        ]);

        return Category::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);
    }

    public function find($id)
    {
        return Category::find($id);
    }

    public function update($request, $id)
    {
        $request->validate([
            'name' => 'required|string|unique:categories,name',
            'description' => 'nullable|string',
        ], [
            'name.required' => 'Tên danh mục là bắt buộc.',
            'name.string' => 'Tên danh mục phải là chuỗi.',
            'name.unique' => 'Tên danh mục đã tồn tại.',
            'description.string' => 'Mô tả phải là chuỗi.',
        ]);

        $category = Category::find($id);

        $category->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);
        return $category;
    }
}
