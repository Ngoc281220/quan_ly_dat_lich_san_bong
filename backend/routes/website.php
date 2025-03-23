<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Website\FieldsController;

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
Route::prefix('web')->group(function(){
    Route::get('/home', [FieldsController::class, 'loadListField']);
});