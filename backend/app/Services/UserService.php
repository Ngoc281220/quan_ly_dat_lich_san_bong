<?php
namespace App\Services;
use App\Models\User;

class UserService extends BaseService
{
    public function __construct() {}

    public function getAllUser($request)
    {
        $search = $request->search ?? '';
        $perPage = 10;

        // Khởi tạo query builder
        $query = User::query();

        if (!empty($search)) {
            $query->where('users.name', 'like', "%{$search}%");
        }

        return $query->paginate($perPage);
    }
}
