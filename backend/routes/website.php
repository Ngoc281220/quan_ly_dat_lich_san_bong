<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Website\FieldsController;
use App\Http\Controllers\Website\BookingController;

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
    Route::prefix('booking')->group(function() {
        Route::get('/get-schedule', [BookingController::class, 'getSchedule']);
    });
});
