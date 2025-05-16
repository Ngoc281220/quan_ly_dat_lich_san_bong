<?php

namespace App\Http\Controllers\Website;

use App\Services\PaymentService;
use Illuminate\Http\Request;

class PaymentController
{
    protected $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    public function paymentMomo(Request $request)
    {
        $data = $this->paymentService->paymentMomo($request);
        return response()->json(['data' => $data]);
    }

    public function saveInfoPaymentMo(Request $request)
    {
        $data = $this->paymentService->saveInfoPaymentMo($request);
        return response()->json($data);
    }

    public function paymentCard(Request $request) 
    {
        $data = $this->paymentService->paymentCard($request);
        return response()->json($data);
    }
}
