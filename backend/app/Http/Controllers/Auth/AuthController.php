<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\AuthService;
use App\Http\Requests\RegisterFormRequest;
use App\Http\Requests\FormLoginRequest;


class AuthController extends Controller
{
    protected $authService;
    public function __construct(AuthService $authService)
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
        $this->authService = $authService;
    }

    // Đăng nhập tài khoản người dùng
    public function login(FormLoginRequest $request)
    {
        $data = $this->authService->login($request);
        return response()->json($data);
    }

    public function logout(Request $request) {}

    // Đăng ký tài khoản người dùng
    public function register(RegisterFormRequest $request)
    {
        return $this->authService->register($request);
    }

    // Xác thực tài khoản người dùng sau khi đăng ký
    public function verify(Request $request)
    {
        return $this->authService->verify($request);
    }

    public function refreshToken()
    {
        return $this->authService->refresh();
    }
}
