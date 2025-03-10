<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix("auth")->group(function () {
    Route::post("/login", [AuthController::class, "login"])->name("login");
    Route::post("/register", [AuthController::class, "register"])->name("register");
    Route::get("/verify", [AuthController::class, "verify"])->name("verify");
    Route::post("/refresh-token", [AuthController::class, "refreshToken"])->name("refreshToken");
});
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
