<?php

namespace App\Http\Controllers\website;

use App\Http\Controllers\Controller;
use App\Services\PostService;
use App\Transformers\Website\PostTransformer;
use App\Utils\ApiResponder;
use App\Models\Post;
class PostController extends Controller
{
    protected $postService;

    public function __construct(PostService $postService)
    {
        $this->postService = $postService;
    }

    public function listPost() 
    {
        $data = $this->postService->listPost();
        return(new ApiResponder($data, new PostTransformer()))->collection();
    }

    public function postDetail($id) {
        $data = Post::find($id);
         return(new ApiResponder($data, new PostTransformer()))->data();
    }
}
