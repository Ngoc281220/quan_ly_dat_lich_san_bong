<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\SubField;
use App\Models\Booking;
use App\Models\BookingDetail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Payment;



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
                'sub_fields.field_id',
                'booking_details.start_time',
                'booking_details.end_time',
                'booking_details.status as booking_status',
                'bookings.id as booking_id',
                'bookings.status as booking_overall_status'
            )
            ->orderBy('sub_fields.id')
            ->get()
            ->groupBy('sub_field_id')
            ->map(function ($group) {
                return [
                    'sub_field_id' => $group->first()->sub_field_id,
                    'sub_field_name' => $group->first()->sub_field_name,
                    'field_id' => $group->first()->field_id,
                    'time_slots' => $group->map(function ($item) {
                        return [
                            'start_time' => $item->start_time,
                            'end_time' => $item->end_time,
                            'booking_status' => $item->booking_status,
                            'booking_id' => $item->booking_id,
                            'booking_overall_status' => $item->booking_overall_status
                        ];
                    })->toArray()
                ];
            })->values();
    }

    public function bookingsField($request)
    {
        try {
            DB::beginTransaction(); // Bắt đầu transaction
            $order_code = Str::uuid();

            // Lưu thông tin vào bảng bookings
            $bookings = Booking::create([
                'order_code' => $order_code->toString(),
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

            Payment::create([
                'booking_id' => $bookings->id,
                'order_code' => $bookings->order_code,
                'total_price' => $request->totalPrice,
                'payment_method' => 0,
                'image_payment' =>  null,
                'date_payment' => Carbon::now()->toDateString(),
                'status' => 0
            ]);

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

    public function getBookingByOrderCode($order_code)
    {

        $query = Booking::where('bookings.order_code', $order_code)
            ->leftJoin('booking_details', 'booking_details.booking_id', '=', 'bookings.id')
            ->select('bookings.*', 'booking_details.id as id_booking_detail', 'booking_details.sub_field_id', 'booking_details.date', 'booking_details.start_time', 'booking_details.end_time')
            ->get()
            ->groupBy('id') // Nhóm theo ID booking
            ->map(function ($bookings) {
                $booking = $bookings->first(); // Lấy thông tin chính của booking
                return [
                    'id' => $booking->id,
                    'order_code' => $booking->order_code,
                    'field_id' => $booking->field_id,
                    'user_id' => $booking->user_id,
                    'total_hours' => $booking->total_hours,
                    'total_price' => $booking->total_price,
                    'name_user_booking_field' => $booking->name_user_booking_field,
                    'phone' => $booking->phone,
                    'comment' => $booking->comment,
                    'status' => $booking->status,
                    'created_at' => $booking->created_at,
                    'updated_at' => $booking->updated_at,
                    'booking_details' => $bookings->map(function ($detail) {
                        return [
                            'id_booking_detail' => $detail->id_booking_detail,
                            'sub_field_id' => $detail->sub_field_id,
                            'date' => $detail->date,
                            'start_time' => $detail->start_time,
                            'end_time' => $detail->end_time,
                        ];
                    })->values()
                ];
            })
            ->values()
            ->first();
        return $query;
    }

    public function listBookingByIDUSER()
    {
        $IDUSER = Auth::id();
        $query = Booking::where('bookings.user_id', $IDUSER)
            ->leftJoin('booking_details', 'booking_details.booking_id', '=', 'bookings.id')
            ->leftJoin('payments', 'payments.booking_id', '=', 'bookings.id')
            ->select(
                'bookings.*',
                'booking_details.id as id_booking_detail',
                'booking_details.sub_field_id',
                'booking_details.date',
                'booking_details.start_time',
                'booking_details.end_time',
                'payments.id as payment_id',
                'payments.status as payment_status',
                'payments.image_payment'
            )
            ->get() // ✅ Đây là điểm kết thúc query
            ->groupBy('id')
            ->map(function ($bookings) {
                $booking = $bookings->first();
                return [
                    'id' => $booking->id,
                    'user_id' => $booking->user_id,
                    'field_id' => $booking->field_id,
                    'total_hours' => $booking->total_hours,
                    'total_price' => $booking->total_price,
                    'status' => $booking->status,
                    'payment_id' => $booking->payment_id,
                    'payment_status' => $booking->payment_status,
                    'image_payment' => $booking->image_payment,
                    'booking_details' => $bookings->map(function ($detail) {
                        return [
                            'id_booking_detail' => $detail->id_booking_detail,
                            'sub_field_id' => $detail->sub_field_id,
                            'date' => $detail->date,
                            'start_time' => $detail->start_time,
                            'end_time' => $detail->end_time,
                        ];
                    })->values()
                ];
            })
            ->values(); // ✅ Trả về Collection gọn gàng
        return $query;
    }

    public function listAllBooking($request)
    {
        $rawBookings = Booking::join('booking_details', 'booking_details.booking_id', '=', 'bookings.id')
            ->leftJoin('payments', 'payments.booking_id', '=', 'bookings.id')
            ->select(
                'bookings.*',
                'booking_details.id as id_booking_detail',
                'booking_details.sub_field_id',
                'booking_details.date',
                'booking_details.start_time',
                'booking_details.end_time',
                'payments.id as payment_id',
                'payments.status as payment_status',
                'payments.date_payment as payment_date',
                'payments.image_payment'
            )
            ->orderByDesc('payments.date_payment')  // Ưu tiên order ngay trong query
            ->paginate(10);

        // Group theo booking id
        $grouped = $rawBookings->getCollection()->groupBy('id');

        // Chuyển đổi lại collection
        $formatted = $grouped->map(function ($items, $bookingId) {
            $first = $items->first(); // Lấy thông tin chung từ bản ghi đầu tiên

            return [
                'id' => $first->id,
                'user_id' => $first->user_id,
                'field_id' => $first->field_id,
                'total_hours' => $first->total_hours,
                'total_price' => $first->total_price,
                'status' => $first->status,
                'payment_id' => $first->payment_id,
                'payment_status' => $first->payment_status,
                'payment_date' => $first->payment_date,
                'image_payment' => $first->image_payment,
                'booking_details' => $items->map(function ($item) {
                    return [
                        'id_booking_detail' => $item->id_booking_detail,
                        'sub_field_id' => $item->sub_field_id,
                        'date' => $item->date,
                        'start_time' => $item->start_time,
                        'end_time' => $item->end_time,
                    ];
                })->values()
            ];
        })->values(); // Đảm bảo trả về danh sách, không phải associative array

        // Gán lại collection vào paginator
        $rawBookings->setCollection($formatted);

        return $rawBookings;
    }

    public function updatePayment($id)
    {
        $payment = Payment::find($id);
        $payment->update([
            'status' => 3 // Xác nhận thanh toán thành công
        ]);
        return $payment;
    }

    public function cancelPaymentById($id)
    {
        $payment = Payment::find($id);

        $payment->update([
            'status' => 4 // Xác nhận hủy đặt sân 
        ]);

        return $payment;
    }
}
