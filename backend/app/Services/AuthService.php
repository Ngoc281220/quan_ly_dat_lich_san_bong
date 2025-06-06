<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Enums\UserEnum;
use App\Mail\VerifyEmail;
use App\Exceptions\HttpApiException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthService extends BaseService
{
    public function __construct() {}

    // Đăng ký tài khoản người dùng
    public function register($request)
    {
        try {
            $user = User::create([
                'full_name' => $request->full_name,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => Hash::make($request->password),
                'role' => UserEnum::ROLE_USER,
                'email_verification_token' => Str::random(32),
            ]);

            $verificationUrl = config('app.frontend_url') . '/verify-email?token=' . urlencode($user->email_verification_token);

            Mail::to($user->email)->send(new VerifyEmail($user, $verificationUrl));

            return response()->json(['message' => 'Vui lòng kiểm tra email để xác nhận tài khoản'], 201);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    // Xác thực tài khoản người dùng khi đăng ký
    public function verify($request)
    {
        $token = $request->query('token');
        Log::info('Token nhận được: ' . $token);

        if (!$token) {
            return response()->json(['message' => 'Token không hợp lệ'], 400);
        }

        $user = User::where('email_verification_token', $token)->first();
        Log::info('User tìm được:', [$user]);

        if (!$user) {
            return response()->json(['message' => 'Token không hợp lệ hoặc đã được sử dụng'], 400);
        }

        $user->email_verified_at = now();
        $user->email_verification_token = null;
        $user->save();

        Log::info('User đã xác thực email:', [$user]);

        return response()->json(['message' => 'Xác thực email thành công'], 200);
    }

    public function login($request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            throw new HttpApiException('Email không tồn tại!', 'email', 400);
        }

        // Kiểm tra mật khẩu có tồn tại không
        if (!Hash::check($request->password, $user->password)) {
            throw new HttpApiException('Mật khẩu không đúng!', 'password', 400);
        }

        if (empty($user->email_verified_at)) {
            throw new HttpApiException('Tài khoản chưa được xác nhận!. Xin vui lòng vào gmail để xác nhận', 'email_verified_at', 400);
        }

        $credentials = $request->only(['email', 'password']);
        if (!($token = auth()->attempt($credentials))) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->createNewToken($token);
    }
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->createNewToken(auth()->refresh());
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile()
    {
        return response()->json(auth()->user());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return array
     */
    protected function createNewToken($token)
    {
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user(),
        ];
    }

    public function changePass($request)
    {
        $idUser = Auth::id();

        $user = User::where('id', $idUser)->update([
            'password' => Hash::make($request->newPassword),
        ]);

        return $user;
    }
}
