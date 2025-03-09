<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FormLoginRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Cho phép request này chạy
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => 'required|email|exists:users,email',
            'password' => 'required|min:6',
        ];
    }
    public function messages(): array
    {
        return [
            'email.required' => 'Vui lòng nhập email',
            'email.email' => 'Email không đúng định dang',
            'email.exists' => 'Email không tồn tại',
            'password.required' => 'Vui lòng nhập mật khẩu',
            'password.min' => 'Mật khẩu ít nhất 6 ký tự',
        ];
    }
}
