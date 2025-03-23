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

        $query = SubField::where('field_id', $fieldId)
            ->leftJoin('bookings', function ($join) use ($date) {
                $join->on('bookings.sub_field_id', '=', 'sub_fields.id')
                    ->whereDate('bookings.date', '=', $date);
            })
            ->select(
                'sub_fields.id as sub_field_id',
                'sub_fields.name as sub_field_name',
                'sub_fields.field_id',
                'bookings.start_time',
                'bookings.end_time',
                'bookings.status'
            )
            ->get();
        return $query;
    }
}
