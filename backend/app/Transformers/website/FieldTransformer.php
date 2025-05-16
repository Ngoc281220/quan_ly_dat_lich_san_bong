<?php

namespace App\Transformers\Website;

use League\Fractal\TransformerAbstract;

class FieldTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform($field): array
    {
        $images = $this->getImages($field->image);
        
        
        return [
            'id'            => $field->id,
            'title'          => $field->name,
            'category_name' => $field->category->name,
            'location'      => $field->location,
            'price'         => $field->price,
            'status'        => $field->status,
            'rating'        => 5,
            'image'         =>  !empty($images) ? $images[0]['path'] : null,
            'time'          => $this->getTime($field->open_time) . '-'.  $this->getTime($field->close_time),
            'phone' => $field->contact_phone,
        ];
    }

    public function getImages($images)
    {
        // Nếu $images không tồn tại hoặc không phải JSON hợp lệ, trả ảnh mặc định
        $decoded = json_decode($images, true);

        if (!is_array($decoded) || count($decoded) === 0) {
            return [
                [
                    'name' => 'https://tvmfloors.com/wp-content/uploads/2021/04/1.jpg',
                    'path' => 'https://tvmfloors.com/wp-content/uploads/2021/04/1.jpg'
                ]
            ];
        }

        // Map lại nếu có dữ liệu
        return collect($decoded)->map(function ($image) {
            return [
                'name' => isset($image['name']) ? $image['name'] : null,
                'path' => isset($image['path']) ? asset($image['path']) : null
            ];
        });
    }

    public function getTime(string $time)
    {
        return date("H:i", strtotime($time));
    }
}
