<?php

namespace App\Transformers\Website;

use League\Fractal\TransformerAbstract;
use App\Models\Field;

class ListBookingTransformer extends TransformerAbstract
{
   
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform($booking)
    {
        $field = Field::find($booking['field_id']);
        return [
            'id'            => $booking['id'],
            'user_id'       => $booking['user_id'],
            'name_field'    => $field->name,
            'location'      => $field->location,
            'contact_phone' => $field->contact_phone,
            'total_hours'   => (float) $booking['total_hours'],
            'total_price'   => (float) $booking['total_price'],
            'status'        => (int) $booking['status'],
            'payment_id'    => $booking['payment_id'],
            'payment_status'=> (int) $booking['payment_status'],
            'booking_details' => collect($booking['booking_details'])->map(function ($detail) {
                return [
                    'id_booking_detail' => $detail['id_booking_detail'],
                    'sub_field_id'      => $detail['sub_field_id'],
                    'date'              => $detail['date'],
                    'start_time'        => $detail['start_time'],
                    'end_time'          => $detail['end_time'],
                ];
            })->toArray(),
        ];
    }
}
