<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Website\FieldsController;
use App\Http\Controllers\Website\BookingController;
use App\Http\Controllers\website\PostController;
use App\Http\Controllers\Website\PaymentController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route bên website
Route::get('load-category',  [FieldsController::class, 'loadCategory']);
Route::prefix('web')->group(function(){
    Route::get('/home', [FieldsController::class, 'loadListField']);
    Route::prefix('bookings')->group(function() {
        Route::get('/get-all', [BookingController::class, 'listBookingByIDUser']);
        Route::get('/get-schedule', [BookingController::class, 'getSchedule']);
        Route::post('/field', [BookingController::class, 'bookingsField']);
        Route::get('/{order_code}', [BookingController::class, 'getBookingByOrderCode']);
    });

    Route::prefix('posts')->group(function() {{
        Route::get('/', [PostController::class, 'listPost']);
    }});

    Route::prefix('payment')->group(function(){
        Route::post('/momo', [PaymentController::class, 'paymentMomo']);
        Route::post('/save-momo',[PaymentController::class, 'saveInfoPaymentMo']);
        Route::post('/card',[PaymentController::class, 'paymentCard']);
    });
   
    Route::get('search', [FieldsController::class, 'searchField']);
    Route::get('search-category', [FieldsController::class, 'searchCategory']);
});
