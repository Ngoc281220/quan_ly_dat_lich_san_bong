<?php

namespace App\Services;
use App\momo\PaymentMomo;

class PaymentService extends BaseService {
    protected $paymentMomo;

    public function __construct(PaymentMomo $paymentMomo) 
    {
        $this->paymentMomo = $paymentMomo;
    }

    public function paymentMomo($request)
    {
        $orderInfo = 'Thanh toán qua Momo';
        $amount = $request->total_price;
        $orderId = $request->order_code;
        $this->paymentMomo->setData($orderInfo, $amount, $orderId);
        $data = $this->paymentMomo->paymentMomo();
        return $data;
    }
}