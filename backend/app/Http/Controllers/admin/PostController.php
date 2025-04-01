<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Services\PostService;
use App\Http\Requests\PostRequest;
use App\Utils\ApiResponder;
use App\Transformers\admin\PostTransformer;

class PostController extends Controller
{
    protected $postService;

    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }

    /**
     * Admin tạo bài viết
     */
    public function create(PostRequest $request)
    {
        $data = $this->postService->create($request);
        return (new ApiResponder($data, new PostTransformer()))->created();
    }
}
