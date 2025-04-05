<?php

namespace App\Services;

use App\Models\Post;
use App\Exceptions\HttpApiException;

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

    public function getListPost($request)
    {
        $search = $request->input('search', '');
        $perPage = 10;

        $query = Post::query();

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%")
                    ->orWhere('comments', 'like', "%{$search}%");
            });
        }
        return $query->paginate($perPage);
    }

    public function delete($id)
    {
        $post = Post::find($id);

        if (!$post) {
            throw new HttpApiException("Bài viết không tồn tại!", "post");
        }

        return $post->delete();
    }

    public function getPostByID($id)
    {
        $post = Post::find($id);

        if (!$post) {
            throw new HttpApiException("Bài viết không tồn tại!", "post");
        }
        return $post;
    }

    public function updatePostByID($request, $id)
    {
        $post = Post::find($id);

        if (!$post) {
            throw new HttpApiException("Bài viết không tồn tại!", "post");
        }

        return $post->update([
            'title' => $request->title,
            'excerpt' => $request->excerpt,
            'content' => $request->content,
            'date' => $request->date,
            'comments' => $request->$request
        ]);
    }
}
