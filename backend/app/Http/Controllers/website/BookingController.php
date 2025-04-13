<?php

namespace App\Http\Controllers\Website;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\BookingService;
use App\Utils\ApiResponder;
use App\Transformers\Website\BookingTransformer;
use App\Transformers\Website\CreateBookingTransformer;
use App\Transformers\Website\BookingByOrderCodeTransformer;
use App\Transformers\Website\ListBookingTransformer;


class BookingController extends Controller
{
    protected $bookingService;

    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }

    public function getSchedule(Request $request)
    {
        $data = $this->bookingService->getSchedule($request);
        return (new ApiResponder($data, new BookingTransformer()))->collection();
    }

    public function bookingsField(Request $request)
    {
        $data = $this->bookingService->bookingsField($request);
        return (new ApiResponder($data, new CreateBookingTransformer()))->created();
    }

    public function getBookingByOrderCode($order_code)
    {
        $data = $this->bookingService->getBookingByOrderCode($order_code);
        return (new ApiResponder($data, new BookingByOrderCodeTransformer()))->data();
    }

    public function listBookingByIDUser()
    {
        $data = $this->bookingService->listBookingByIDUSER();
        return(new ApiResponder($data, new ListBookingTransformer()))->collection();
    }
}
