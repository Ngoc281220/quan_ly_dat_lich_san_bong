<?php

namespace App\Services;

use Carbon\Carbon;
use App\Models\SubField;


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
}
