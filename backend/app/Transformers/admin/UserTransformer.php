<?php

namespace App\Transformers\admin;

use League\Fractal\TransformerAbstract;

class UserTransformer extends TransformerAbstract
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
           'email' => $user->email,
           'phone' => $user->phone,
           'role' => $user->role
        ];
    }
}
