<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\AuthServices;
use App\Http\Requests\RegisterFormRequest;
use App\Http\Requests\FormLoginRequest;


class AuthController extends Controller
{
    protected $authServices;
    public function __construct(AuthServices $authServices)
    {
        // $this->middleware('auth:api', ['except' => ['login', 'register']]);
        $this->authServices = $authServices;
    }

    // Đăng nhập tài khoản người dùng
    public function login(FormLoginRequest $request)
    {
        $data = $this->authServices->login($request);
        return response()->json($data);
    }

    public function logout(Request $request) {}

    // Đăng ký tài khoản người dùng
    public function register(RegisterFormRequest $request)
    {
        return $this->authServices->register($request);
    }

    // Xác thực tài khoản người dùng sau khi đăng ký
    public function verify(Request $request)
    {
        return $this->authServices->verify($request);
    }

    public function refreshToken()
    {
        return $this->authServices->refresh();
    }
}
