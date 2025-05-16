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
            'status'        => (int) $booking['status'] == 0 ? "Hủy do quá giờ thanh toán" : "Đặt sân thành công",
            'payment_id'    => $booking['payment_id'],
            'payment_status' => (int) $booking['payment_status'],
            'image' => $this->getImage($booking['image_payment'])[0]['path'] ?? null,
            'booking_details' => collect($booking['booking_details'])->map(function ($detail) {
                return [
                    'id_booking_detail' => $detail['id_booking_detail'],
                    'sub_field_id'      => $detail['sub_field_id'],
                    'date'              => $detail['date'],
                    'time'        => $this->getTime($detail['start_time']) . "-" . $this->getTime($detail['end_time']),
                ];
            })->toArray(),
        ];
    }

    public function getTime(?string $time): string
    {
        if ($time === null) {
            return "";
        }

        return date("H:i", strtotime($time));
    }

    public function getImage($image)
    {
        if (!$image) {
            return [];
        }

        return collect(json_decode($image))->map(function ($image) {
            return [
                'name' => is_object($image) && !empty($image) ? $image->name : null,
                'path' => is_object($image) && !empty($image) ? asset($image->path) : null
            ];
        })->toArray(); // convert collection về mảng
    }
}
