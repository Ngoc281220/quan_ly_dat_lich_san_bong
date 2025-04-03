<?php

namespace App\Services;

use App\Models\User;
use App\Models\ProfineUser;
use App\Exceptions\HttpApiException;

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

    public function delete($id)
    {
        // Tìm user
        $user = User::find($id);

        if (!$user) {
            throw new HttpApiException('Người dùng không tồn tại', 'user');
        }

        $profileUser = ProfineUser::where('user_id', $id)->first();

        if ($profileUser) {
            $profileUser->delete();
        }

        if (User::destroy($id) > 0) {
            return [
                'success' => true,
                'message' => 'Đã xóa người dùng và thông tin profile thành công'
            ];
        }
        throw new HttpApiException('Xóa người dùng thất bại', 'user');
    }
}
