<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

use App\Models\Category;
use App\Models\Field;
use App\Models\SubField;
use App\Exceptions\HttpApiException;


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

        $data['image'] = json_encode($data['images'] ?? []);
        $data['open_time'] = "6:00";
        $data['close_time'] = "22:00";

        DB::beginTransaction();
        try {
            // Tạo sân
            $field = Field::create($data);

            // Tạo sân con nếu có số lượng
            if (!empty($data['quantity'])) {
                for ($i = 0; $i < $data['quantity']; $i++) {
                    SubField::create([
                        'field_id' => $field->id,
                        'name' => 'Sân-' . ($i + 1),
                        'status' => 0
                    ]);
                }
            }

            DB::commit();
            return $field;
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Lỗi khi tạo sân: ' . $e->getMessage()], 500);
        }
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

    // Hiển danh sách sân thể thao bên website
    public function loadListField()
    {
        return Field::with('category')->get();
    }

    public function loadCategory()
    {
        return Category::all(['id', 'name']);
    }

    public function deleteField($id)
    {
        $field = Field::find($id);
        if (!$field) {
            throw new HttpApiException('Sân không tồn tại', 'field');
        }

        return Field::destroy($id);
    }

    public function searchField($request)
    {
        $search = $request->query('search') ?? '';
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
        return $query->get();
    }

    public function detailField($id)
    {
        return Field::find($id);
    }

    public function updateField($request, $id)
    {
        $field = Field::find($id);

        $field->update([
            'name' => $request->name ?? '',
            'category_id' => $request->category_id ?? '',
            'location' => $request->location ?? '',
            'price' => $request->price ?? '',
            'contact_phone' => $request->contact_phone ?? ''
        ]);

        return $field;
    }

    public function searchCategory($request)
    {
        $search = $request->query('search') ?? '';

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
            $query->where(function ($q) use ($search) {
                $q->where('categories.name', 'like', "%{$search}%")
                    ->orWhere('categories.description', 'like', "%{$search}%");
            });
        }

        return $query->get();
    }
}
