<?php

namespace App\Services;

use App\momo\PaymentMomo;
use App\Models\Payment;
use App\Models\Booking;
use Carbon\Carbon;
use App\Exceptions\HttpApiException;
use Illuminate\Support\Facades\DB;

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

        if (! $booking) {
            throw new HttpApiException('booking_id không tồn tại', $$booking);
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

    public function getRevenueByMonth($request)
    {
        $year = $request->year;
        $month = $request->month;

        $query = Payment::select(
            DB::raw('MONTH(date_payment) as month'),
            DB::raw('YEAR(date_payment) as year'),
            DB::raw('SUM(total_price) as total_revenue')
        )
            ->where('status', '!=', 0);

        // Nếu có lọc theo năm
        if ($year) {
            $query->whereYear('date_payment', $year);
        }

        // Nếu có lọc theo tháng
        if ($month) {
            $query->whereMonth('date_payment', $month);
        }

        $revenues = $query->groupBy(
            DB::raw('MONTH(date_payment)'),
            DB::raw('YEAR(date_payment)')
        )
            ->orderBy(DB::raw('YEAR(date_payment)'), 'asc')
            ->orderBy(DB::raw('MONTH(date_payment)'), 'asc')
            ->get();

        return $revenues;
    }


    public function paymentCard($request)
    {
        $orderCode = $request->order_code;
        $booking = Booking::where('order_code', $orderCode)->first();
        if (!$booking) {
            throw new HttpApiException('booking_id không tồn tại', $orderCode);
        }

        $imagePayment = null;

        if ($request->hasFile('image_payment') && $request->file('image_payment')->isValid()) {
            $imagePayment = $this->saveFile($request->file('image_payment'), 'fields');
        }
        
        $payment = Payment::where('order_code', $orderCode)->first();
        if (!$payment) {
            return Payment::create([
                'booking_id' => $booking->id,
                'order_code' => $request->order_code,
                'total_price' => $request->amount,
                'payment_method' => $imagePayment ? 1 : 0,
                'image_payment' => $imagePayment ? json_encode($imagePayment) : null,
                'date_payment' => Carbon::now()->toDateString(),
                'status' => $imagePayment ? 2 : 0
            ]);
        }

        $payment->update([
            'payment_method' => $imagePayment ? 1 : 0,
            'image_payment' => $imagePayment ? json_encode($imagePayment) : null,
            'date_payment' => Carbon::now()->toDateString(),
            'status' => $imagePayment ? 2 : 0
        ]);

        return $payment;
    }
}
