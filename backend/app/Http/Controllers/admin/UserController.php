<?php
namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\UserService;
use App\Utils\ApiResponder;
use App\Transformers\admin\UserTransformer;

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
}
