<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Services\BookingService;
use App\Utils\ApiResponder;
use Illuminate\Http\Request;
use App\Transformers\Website\ListBookingTransformer;


class BookingController extends Controller
{
    protected $bookingService;

    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }

    public function listAllBooking(Request $request)
    {
        $data = $this->bookingService->listAllBooking($request);
        return (new ApiResponder($data, new ListBookingTransformer()))->collection();
    }

    public function updatePaymentById($id)
    {
        $data = $this->bookingService->updatePayment($id);

        if ($data) {
            return response()->json([
                'status' => true,
                'message' => 'Cập nhật thanh toán thành công',
                'data' => $data
            ], 200);
        }

        // Trường hợp không tìm thấy hoặc cập nhật thất bại
        return response()->json([
            'status' => false,
            'message' => 'Cập nhật thanh toán thất bại hoặc không tìm thấy bản ghi'
        ], 404);
    }

    public function cancelPaymentById($id) {
       $data = $this->bookingService->cancelPaymentById($id);
       if ($data) {
            return response()->json([
                'status' => true,
                'message' => 'Hủy đặt sân thành công!',
                'data' => $data
            ], 200);
        }
        else {
            return response()->json([
            'status' => false,
            'message' => 'Hủy đặt sân thất bại!'
        ], 404);
        }
    }
}
