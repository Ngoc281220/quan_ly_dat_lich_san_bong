<?php

namespace App\Transformers;

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
        return [
            'id'            => $field->id,
            'name'          => $field->name,
            'category_name' => $field->category_name,
            'location'      => $field->location,
            'price'         => $field->price,
            'status'        => $field->status,
            'image'         => $this->getImages($field->image),
            'open_time'     => $field->open_time,
            'close_time'    => $field->close_time,
            'contact_phone' => $field->contact_phone,
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
}
