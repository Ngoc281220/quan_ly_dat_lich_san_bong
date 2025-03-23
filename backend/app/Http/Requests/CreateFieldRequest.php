<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateFieldRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'category_id' => 'required|integer',
            'location' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'contact_phone' => 'required|string|regex:/^0[0-9]{9}$/',
            'description' => 'nullable|string',
            'images' => 'nullable|array', // Chấp nhận mảng ảnh
            'quantity' => 'required|integer'
            // 'images.*' => 'image|mimes:jpg,png,jpeg,gif|max:2048'
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Vui lòng nhập tên sân.',
            'name.string' => 'Tên sân phải là chuỗi ký tự.',
            'name.max' => 'Tên sân không được vượt quá 255 ký tự.',

            'category_id.required' => 'Vui lòng chọn loại sân.',
            'category_id.integer' => 'Loại sân không hợp lệ.',

            'location.required' => 'Vui lòng nhập địa chỉ sân.',
            'location.string' => 'Địa chỉ phải là chuỗi ký tự.',
            'location.max' => 'Địa chỉ không được vượt quá 255 ký tự.',

            'price.required' => 'Vui lòng nhập giá thuê.',
            'price.numeric' => 'Giá thuê phải là số.',
            'price.min' => 'Giá thuê không thể âm.',

            'contact_phone.required' => 'Vui lòng nhập số điện thoại liên hệ.',
            'contact_phone.string' => 'Số điện thoại phải là chuỗi ký tự.',
            'contact_phone.regex' => 'Số điện thoại không hợp lệ. Vui lòng nhập số bắt đầu bằng 0 và có 10 chữ số.',

            'description.string' => 'Mô tả phải là chuỗi ký tự.',

            'images.array' => 'Hình ảnh phải là một danh sách file.',
            'images.*.image' => 'Tất cả các file phải là hình ảnh.',
            'images.*.mimes' => 'Hình ảnh chỉ được có định dạng jpg, png, jpeg, gif.',
            'images.*.max' => 'Mỗi hình ảnh không được vượt quá 2MB.',
            'quantity.required' => 'Vui lòng nhập số lượng sân cho thuê',
            'quantity.integer' => 'Số lượng sân không hợp lệ'
        ];
    }
}
