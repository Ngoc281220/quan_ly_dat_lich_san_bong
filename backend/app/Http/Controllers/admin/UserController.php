<?php
namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\UserService;
use App\Utils\ApiResponder;
use App\Transformers\admin\UserTransformer;
use App\Transformers\admin\UserByIdTransformer;
use App\Transformers\admin\DetailUserTransformer;


class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    // Get danh sách người  dùng
    public function listUser(Request $request)
    {
        $data = $this->userService->getAllUser($request);
        return(new ApiResponder($data, new UserTransformer()))->pagination();
    }

    public function delete($id) 
    {
        $data = $this->userService->delete($id);
        return response()->json($data);
    }

    public function getUserById($id) 
    {
        $data = $this->userService->getUserById($id);
        return(new ApiResponder($data, new UserByIdTransformer()))->data();
    }

    public function updateUserById(Request $request, $id)
    {
        $data = $this->userService->updateUserById($request, $id);
        return(new ApiResponder($data, new UserTransformer()))->data();
    }

    public function detail($id)
    {
        $data = $this->userService->detail($id);
         return(new ApiResponder($data, new DetailUserTransformer()))->data();
    }
}
