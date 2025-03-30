<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\SubField;
use App\Models\Booking;
use App\Models\BookingDetail;
use App\Models\Payment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class BookingService extends BaseService
{

    public function getSchedule($request)
    {
        $fieldId = $request->field_id;
        $date = $request->date ?? Carbon::today()->toDateString();

        return SubField::where('sub_fields.field_id', $fieldId)
            ->leftJoin('booking_details', function ($join) use ($date) {
                $join->on('booking_details.sub_field_id', '=', 'sub_fields.id')
                    ->whereDate('booking_details.date', '=', $date);
            })
            ->leftJoin('bookings', function ($join) {
                $join->on('bookings.id', '=', 'booking_details.booking_id');
            })
            ->select(
                'sub_fields.id as sub_field_id',
                'sub_fields.name as sub_field_name',
                'booking_details.start_time',
                'booking_details.end_time',
                'booking_details.status as booking_status',
                'bookings.id as booking_id',
                'bookings.status as booking_overall_status',
                'sub_fields.field_id'
            )
            ->orderBy('sub_fields.id')
            ->get();
    }

    public function bookingsField($request)
    {
        try {
            DB::beginTransaction(); // Bắt đầu transaction
           
            // Lưu thông tin vào bảng bookings
            $bookings = Booking::create([
                'field_id' => $request->idField,
                'user_id' => Auth::id(),
                'total_hours' => $request->totalHours,
                'total_price' => $request->totalPrice,
                'name_user_booking_field' => $request->userIn['name'],
                'phone' => $request->userIn['phone'],
                'comment' => $request->userIn['note'],
                'status' => 0
            ]);
            // Lưu thông tin vào bảng booking_details
            $listBooking = $request->listBooking;
            foreach ($listBooking as $item) {
                BookingDetail::create([
                    'booking_id' => $bookings->id,
                    'sub_field_id' => $item['sub_field_id'],
                    'date' => $item['date'],
                    'start_time' => $item['start_time'],
                    'end_time' => $item['end_time'],
                    'status' => 0
                ]);
            }

            DB::commit(); // Xác nhận transaction

            return $bookings;
        } catch (\Exception $e) {
            DB::rollBack(); // Hoàn tác nếu có lỗi

            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra khi đặt sân',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
