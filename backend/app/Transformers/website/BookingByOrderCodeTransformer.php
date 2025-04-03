<?php

namespace App\Transformers\Website;

use League\Fractal\TransformerAbstract;

class BookingByOrderCodeTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform($data): array
    {
        return [
            'id' => $data['id'],
            'order_code' => $data['order_code'],
            'field_id' => $data['field_id'],
            'user_id' => $data['user_id'],
            'total_hours' => $data['total_hours'],
            'deposit_price' => (float) $data['total_price'] / 2,
            'total_price' => (int) $data['total_price'],
            'name_user_booking_field' => $data['name_user_booking_field'],
            'phone' => $data['phone'],
            'comment' => $data['comment'],
            'status' => $data['status'],
            'booking_details' => $this->listBookingDetails($data['booking_details']->toArray()) // Chuyển Collection sang mảng
        ];
    }

    /**
     * Chuyển đổi danh sách chi tiết booking.
     */
    public function listBookingDetails(array $booking_details): array
    {
        $list = [];
        foreach ($booking_details as $item) {
            $list[] = [ // Thêm vào danh sách thay vì ghi đè
                'id_booking_detail' => $item['id_booking_detail'], // Sửa lỗi biến sai
                'sub_field_id' => $item['sub_field_id'],
                'date' => $item['date'],
                'start_time' => $this->getTime($item['start_time']),
                'end_time' => $this->getTime($item['end_time']),
            ];
        }
        return $list;
    }

    /**
     * Định dạng lại giờ.
     */
    public function getTime(string $time): string
    {
        return date("H:i", strtotime($time));
    }
}
