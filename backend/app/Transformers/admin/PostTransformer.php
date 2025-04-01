<?php

namespace App\Transformers\admin;

use League\Fractal\TransformerAbstract;

class PostTransformer extends TransformerAbstract
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
            'title' => $data->title,
            'image' => $data->image_url,
            'excerpt' => $data->excerpt,
            'content' => $data->content,
            'date' => $data->date,
            'comments' => $data->comments,
        ];
    }
}
