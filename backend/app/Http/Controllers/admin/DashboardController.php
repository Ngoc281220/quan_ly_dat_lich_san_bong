<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Field;
use App\Models\Post;
use App\Models\Category;
use App\Services\PaymentService;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    protected $paymentService;

    public function __construct(PaymentService $paymentService) 
    {
        $this->paymentService = $paymentService;
    }

    // Get danh sách người  dùng
    public function dashboard()
    {
        $countUser = User::count();
        $countField = Field::count();
        $countPost = Post::count();
        $countCategory = Category::count();

        return response()->json([
            'countUser' => $countUser,
            'countField' => $countField,
            'countPost' => $countPost,
            'countCategory' => $countCategory
        ]);
    }

    public function getRevenueByMonth(Request $request) 
    {
        $data = $this->paymentService->getRevenueByMonth($request);
        return response()->json($data);
    }
}
