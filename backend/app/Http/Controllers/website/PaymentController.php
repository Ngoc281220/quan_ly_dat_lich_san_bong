<?php
namespace App\Http\Controllers\Website;
use App\Services\PaymentService;
use Illuminate\Http\Request;

class PaymentController {
    protected $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    public function paymentMomo(Request $request) 
    {
        $data = $this->paymentService->paymentMomo($request);
        return response()->json( ['data' => $data]);
    }
}