<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'full_name' => 'required|string|max:30',
            'email' => 'required|string|unique:users',
            'phone' => 'required|string|max:10|unique:users',
            'password' => 'required|string',
            'confirm_password' => 'required|string|same:password',
        ];
    }

    public function messages(): array
    {
        return [
            'full_name.required' => 'Vui lòng nhập họ và tên',
            'email.required' => 'Vui lòng nhập email',
            'email.unique' => 'Email đã tồn tại trong hệ thống',
            'phone.required' => 'Vui lòng nhập số điện thoại',
            'phone.unique' => 'Số điện thoại đã tồn tại trong hệ thống',
            'phone.max' => 'Trường số điện thoại không được dài quá 10 ký tự.',
            'password.required' => 'Vui lòng nhập mật khẩu',
            'confirm_password.required' => 'Vui lòng nhập lại mật khẩu',
            'confirm_password.same' => 'Mật khẩu xác nhận không khớp',
        ];
    }
}
