<?php

namespace App\Transformers\Website;

use League\Fractal\TransformerAbstract;

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
            'order_code' => $data->order_code,
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
