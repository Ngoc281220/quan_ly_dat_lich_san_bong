<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\admin\FieldsController;
use App\Http\Controllers\admin\UserController;
use App\Http\Controllers\admin\PostController;
use App\Http\Controllers\admin\DashboardController;

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

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::get('/verify', [AuthController::class, 'verify'])->name('verify');
    Route::post('/refresh-token', [AuthController::class, 'refreshToken'])->name('refreshToken');
});

Route::prefix('admin')->group(function () {
    Route::prefix('fields')->group(function () {
        Route::get('/', [FieldsController::class, 'getListField'])->name('admin.fields');
        Route::get('/list-category', [FieldsController::class, 'getListCategory'])->name('admin.fields.category');
        Route::post('/create', [FieldsController::class, 'createField'])->name('admin.fields.createField');
        Route::get('/{id}', [FieldsController::class, 'getFieldByID'])->name('admin.fields.ID');
    });

    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'listUser'])->name('admin.users');
    });

    Route::prefix('posts')->group(function () {
        Route::post('/create', [PostController::class, 'create'])->name('admin.posts.create');
        Route::get('/', [PostController::class, 'getListPost'])->name('admin.posts.list');
    });

    Route::prefix('dashboard')->group(function () {
        Route::get('/', [DashboardController::class, 'dashboard']);
        Route::get('/revenue', [DashboardController::class, 'getRevenueByMonth']);
    });
});
