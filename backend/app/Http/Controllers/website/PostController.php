<?php

namespace App\Http\Controllers\website;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\PostService;
use App\Transformers\Website\PostTransformer;
use App\Utils\ApiResponder;
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
}
