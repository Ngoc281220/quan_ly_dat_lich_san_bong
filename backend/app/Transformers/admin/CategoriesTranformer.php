<?php

namespace App\Transformers\admin;

use League\Fractal\TransformerAbstract;

class CategoriesTranformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform($data)
    {
        return [
           'id' => $data->id,
           'name' => $data->name,
           'description' => $data->description,
        ];
    }
}
