<?php

namespace App\Services;

use App\Models\User;
use App\Models\ProfineUser;
use App\Exceptions\HttpApiException;
use Illuminate\Support\Facades\Validator;


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

    public function getUserById($id)
    {
        $user = User::find($id);

        if (!$user) {
            throw new HttpApiException('Người dùng không tồn tại', 'user');
        }
        return $user;
    }

    public function updateUserById($request, $id)
    {
        Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'phone' => [
                'nullable',
                'regex:/^0\d{9}$/',
            ],
            'date_of_birth' => 'nullable|date',
            'address' => 'nullable|string|max:255',
        ], [
            'name.required' => 'Họ tên không được để trống.',
            'name.string' => 'Họ tên phải là chuỗi.',
            'name.max' => 'Họ tên tối đa 255 ký tự.',
        
            'phone.regex' => 'Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số.',
        
            'date_of_birth.date' => 'Ngày sinh không đúng định dạng ngày.',
            'address.string' => 'Địa chỉ phải là chuỗi.',
            'address.max' => 'Địa chỉ tối đa 255 ký tự.',
        ]);

        
        $user = User::find($id);

        if (!$user) {
            throw new HttpApiException("Người dùng không tồn tại!", "user");
        }

        $user->update([
            'full_name' => $request->name,
            'phone' => $request->phone,
        ]);

        $profileUser = ProfineUser::where('user_id', $id)->first();

        if ($profileUser) {
            $profileUser->update([
                'date_of_birth' => $request->date_of_birth,
                'address' => $request->date_of_birth,
            ]);
        }

        return $user;
    }
}
