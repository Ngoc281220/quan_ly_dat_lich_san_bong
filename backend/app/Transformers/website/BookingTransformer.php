<?php

namespace App\Transformers\Website;

use League\Fractal\TransformerAbstract;
use App\Models\Field;

class BookingTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform($data): array
    {
        $data = (object) $data; // Chuyển mảng thành object

        $field = $this->getField($data->field_id ?? null);
     
        return [
            'field_id' => $data->field_id ?? null,
            'sub_field_id' => $data->sub_field_id ?? null,
            'sub_field_name' => $data->sub_field_name ?? null,
            'time_slots' => $this->listTime($data->time_slots),
            'name_field' => optional($field)->name,
            'price' => optional($field)->price ?? 0,
            'location' => optional($field)->location
        ];
    }


    public function getField($id)
    {
        return Field::find($id);
    }

    /**
     * Chuyển đổi danh sách chi tiết booking.
     */
    public function listTime(array $time_slots): array
    {
        $list = [];
        foreach ($time_slots as $item) {
            $list[] = [ // Thêm vào danh sách thay vì ghi đè
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
