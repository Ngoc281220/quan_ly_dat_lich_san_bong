<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'image' => 'nullable|mimes:jpg,png,jpeg|max:2048',
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'date' => 'required|date',
            'comments' => 'nullable|integer|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Vui lòng nhập tiêu đề.',
            'title.string' => 'Tiêu đề phải là một chuỗi ký tự.',
            'title.max' => 'Tiêu đề không được vượt quá 255 ký tự.',


            'excerpt.required' => 'Vui lòng nhập mô tả ngắn.',
            'excerpt.string' => 'Mô tả ngắn phải là một chuỗi ký tự.',

            'content.required' => 'Vui lòng nhập nội dung.',
            'content.string' => 'Nội dung phải là một chuỗi ký tự.',

            'date.required' => 'Vui lòng chọn ngày.',
            'date.date' => 'Định dạng ngày không hợp lệ.',

            'comments.integer' => 'Số bình luận phải là một số nguyên.',
            'comments.min' => 'Số bình luận không thể nhỏ hơn 0.',
        ];
    }
}
