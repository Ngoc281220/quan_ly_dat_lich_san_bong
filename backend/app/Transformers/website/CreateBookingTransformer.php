<?php

namespace App\Transformers\Website;

use League\Fractal\TransformerAbstract;
use App\Models\Field;

class CreateBookingTransformer extends TransformerAbstract
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
            'user_id' => $data->user_id,
            'total_hours' => $data->total_hours,
            'total_price' => $data->total_price,
            'name_user_booking_field' => $data->name_user_booking_field,
            'phone' => $data->phone,
            'status' => $data->status,
        ];
    }
}
