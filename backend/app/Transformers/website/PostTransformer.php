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
            'image' => $this->getImage($data->image)[0]['path'],
            'excerpt' => $data->excerpt,
            'content' => $data->content,
            'date' => $data->date,
            'comments' => $data->comments,
        ];
    }

    public function getImage($image)
    {
        if (!$image) {
            return null;
        }
        return  collect(json_decode($image))->map(function ($image) {
            return [
                'name' => is_object($image) && !empty($image) ? $image->name : null,
                'path' => is_object($image) && !empty($image) ? asset($image->path) : null
            ];
        });
    }
}
