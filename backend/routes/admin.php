<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\admin\FieldsController;
use App\Http\Controllers\admin\UserController;
use App\Http\Controllers\admin\PostController;
use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\admin\CategoriesController;
use App\Http\Controllers\admin\BookingController;

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
    Route::post('/change-password', [AuthController::class, 'changePass']);
});

Route::prefix('admin')->group(function () {
    Route::prefix('fields')->group(function () {
        Route::get('/', [FieldsController::class, 'getListField'])->name('admin.fields');
        Route::get('/list-category', [FieldsController::class, 'getListCategory'])->name('admin.fields.category');
        Route::post('/create', [FieldsController::class, 'createField'])->name('admin.fields.createField');
        Route::get('/{id}', [FieldsController::class, 'getFieldByID'])->name('admin.fields.ID');
        Route::post('/delete/{id}', [FieldsController::class, 'deleteField'])->name('admin.fields.delete');
        Route::get('/detail/{id}', [FieldsController::class, 'detailField'])->name('admin.fields.detail');
        Route::post('/update/{id}', [FieldsController::class, 'updateField'])->name('admin.fields.update');
    });

    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'listUser'])->name('admin.users');
        Route::post('/delete/{id}', [UserController::class, 'delete'])->name('admin.users.delete');
        Route::get('/{id}', [UserController::class, 'getUserById'])->name('admin.users.delete');
        Route::post('/update/{id}', [UserController::class, 'updateUserById'])->name('admin.users.update');
        Route::get('/detail/{id}', [UserController::class, 'detail'])->name('admin.users.detail');
    });

    Route::prefix('posts')->group(function () {
        Route::post('/create', [PostController::class, 'create'])->name('admin.posts.create');
        Route::get('/', [PostController::class, 'getListPost'])->name('admin.posts.list');
        Route::get('/delete/{id}', [PostController::class, 'delete'])->name('admin.posts.delete');
        Route::get('/{id}', [PostController::class, 'getPostByID'])->name('admin.posts.id');
        Route::post('/update/{id}', [PostController::class, 'updatePostByID'])->name('admin.posts.update');
    });

    Route::prefix('dashboard')->group(function () {
        Route::get('/', [DashboardController::class, 'dashboard']);
        Route::get('/revenue', [DashboardController::class, 'getRevenueByMonth']);
    });

    Route::prefix('categories')->group(function () {
        Route::get('/', [CategoriesController::class, 'loadCategory']);
        Route::post('/create', [CategoriesController::class, 'create']);
        Route::get('/find/{id}', [CategoriesController::class, 'find']);
        Route::post('/update/{id}', [CategoriesController::class, 'update'])->name('admin.categories.update');
    });

    Route::prefix('booking')->group(function () {
        Route::get('/', [BookingController::class, 'listAllBooking']);
        Route::get('/{id}', [BookingController::class, 'updatePaymentById']);
    });
});
