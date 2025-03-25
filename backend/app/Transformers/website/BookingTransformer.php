<?php

namespace App\Transformers\Website;

use League\Fractal\TransformerAbstract;

class BookingTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform($data): array
    {
        return [
            'field_id' => $data->field_id,
            'sub_field_id' => $data->sub_field_id,
            'sub_field_name' => $data->sub_field_name,
            'start_time' => $data->start_time,
            'end_time' => $data->end_time,
            'name_field' => $data->Field->name,
            'price' => (int)$data->Field->price,
            'location' => $data->Field->location
        ];
    }
}
