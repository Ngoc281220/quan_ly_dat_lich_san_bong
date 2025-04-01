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

    // Tạo bài viết
    public function create($request)
    {
        $data = $request->all();
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $this->saveFile($request->file('image'), 'posts');
        }
        $data['image'] = $imagePath ? json_encode($imagePath) : null;
        return Post::create($data);
    }
}
