<?php

namespace App\Transformers\Website;

use League\Fractal\TransformerAbstract;

class LoginTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform($data): array
    {
        return [
            'access_token' => $data['access_token'],
            'expires_in' => $data['expires_in'],
            'token_type' => $data['token_type'],
            'user' => $data['user'],
        ];
    }
}
