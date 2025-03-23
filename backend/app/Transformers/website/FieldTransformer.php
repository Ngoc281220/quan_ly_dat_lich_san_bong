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
        return  collect(json_decode($images))->map(function ($image) {
            return [
                'name' => is_object($image) && !empty($image) ? $image->name : null,
                'path' => is_object($image) && !empty($image) ? asset($image->path) : null
            ];
        });
    }

    public function getTime(string $time)
    {
        return date("H:i", strtotime($time));
    }
}
