<?php

namespace App\Services;

use App\Models\Post;

class PostService extends BaseService
{
    public function __construct() {}

    public function listPost()
    {
        return Post::all();
    }
}
