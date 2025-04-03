<?php

namespace App\Services;

use App\momo\PaymentMomo;
use App\Models\Payment;
use App\Models\Booking;
use Carbon\Carbon;
use App\Exceptions\HttpApiException;

class PaymentService extends BaseService
{
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

    public function saveInfoPaymentMo($request)
    {
        $payment = Payment::where('order_code', $request->order_code)->first();
        if ($payment) {
            throw new HttpApiException('Bản ghi đã tồn tại', $request->order_code);
        }
        $booking = Booking::where('order_code', $request->order_code)->first();
      
        if (! $booking ) {
            throw new HttpApiException('booking_id không tồn tại', $ $booking);
        }
        return Payment::create([
            'booking_id' => $booking->id,
            'order_code' => $request->order_code,
            'total_price' => $request->amount,
            'payment_method' => 2, // Thanh toán kiểu momo,
            'image_payment' => null,
            'date_payment' => Carbon::now()->toDateString(),
            'status' => 1
        ]);
    }
}
