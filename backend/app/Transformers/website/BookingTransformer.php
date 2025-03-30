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
        $field = $this->getField($data->field_id);
        return [
            'field_id' => $data->field_id,
            'sub_field_id' => $data->sub_field_id,
            'sub_field_name' => $data->sub_field_name,
            'start_time' => $data->start_time,
            'end_time' => $data->end_time,
            'name_field' => $field->name,
            'price' => (int)$field->price,
            'location' => $field->location
        ];
    }

    public function getField($id) 
    {
        return Field::find($id);
    }
}
