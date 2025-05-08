<?php

namespace App\Transformers\admin;

use League\Fractal\TransformerAbstract;
use App\Models\Category;

class FieldDetailTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
   public function transform($field): array
   {
        {
            $categories = Category::select('id', 'name')->get();
        
            return [
                'id'            => $field->id,
                'name'          => $field->name,
                'category_id'   => $field->category_id,
                'location'      => $field->location,
                'price'         => $field->price,
                'contact_phone' => $field->contact_phone,
                'categories'    => $categories, // Trả về toàn bộ danh sách category
            ];
        }
    }
}
