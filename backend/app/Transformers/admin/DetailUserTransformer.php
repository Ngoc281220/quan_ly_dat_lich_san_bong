<?php

namespace App\Transformers\admin;

use League\Fractal\TransformerAbstract;


class DetailUserTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform($user)
    {
        return [
           'id' => $user->id,
           'name' => $user->full_name,
           'phone' => $user->phone,
           'email' => $user->email,
           'date_of_birth' => $user->profile?->date_of_birth,
           'address' => $user->profile?->address,
        ];
    }
}
