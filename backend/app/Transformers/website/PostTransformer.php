<?php

namespace App\Transformers\Website;

use League\Fractal\TransformerAbstract;

class PostTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform($data): array
    {
        return [
            'id' => $data->id,
            'title' => $data->title,
            'image_url' => $data->image_url,
            'excerpt' => $data->excerpt,
            'content' => $data->content,
            'date' => $data->date,
            'comments' => $data->comments,
        ];
    }
}
