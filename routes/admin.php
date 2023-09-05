<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Admin\Auth\AuthController;
use App\Http\Controllers\Admin\user\UserController;
use App\Http\Controllers\Admin\Auth\ResetPasswordController;
use App\Http\Controllers\Admin\Auth\ForgotPasswordController;


/*
|--------------------------------------------------------------------------
| admin Routes
|--------------------------------------------------------------------------
|
| Here is where you can register admin routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "admin" middleware group. Now create something great!
|
*/

Route::group(['prefix' => 'admin'], function () {

    Route::get('/', [AuthController::class, 'showLoginForm']);
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('admin.login');
    Route::post('/login/check', [AuthController::class, 'login'])->name('admin.login.check');
    Route::get('/forgot/password', [ForgotPasswordController::class, 'showForgotPasswordForm'])->name('admin.forgotpassword');
    Route::post('/password/email', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('admin.password.eamil');
    Route::get('/password/reset/{token}/{email}', [ResetPasswordController::class, 'showResetPasswordForm'])->name('admin.password.token');
    Route::post('/password/reset', [ResetPasswordController::class, 'reset'])->name('admin.password.reset');

    Route::group(['middleware' => ['admin']], function () {

        Route::post('/logout', [AuthController::class, 'logout'])->name('admin.logout');
        /* Super Admin Module Routes */
        Route::any('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

        /* Users Route */
        Route::post('/user/list/data', [UserController::class, 'listdata'])->name('admin.user.listdata');
        Route::post('/user/status/change/{id}', [UserController::class, 'statusChange'])->name('admin.user.status.change');
        Route::get('/user/address-book/{id}', [UserController::class, 'addressBook'])->name('admin.user.address.book');
        Route::get('/user/booking/list/{user_id}', [UserController::class, 'bookingList'])->name('admin.user.booking.list');
        Route::post('/user/booking/list/data', [UserController::class, 'fetchBookingList'])->name('admin.user.booking.listdata');
        Route::get('/user/favorite/fixr/{id}', [UserController::class, 'favoriteList'])->name('admin.user.favorite.fixr.list');
        Route::get('/user/rating-review/{id}', [UserController::class, 'ratingReview'])->name('admin.user.ratingreview.details');
        Route::post('/user/rating-review/listdata/{id}', [UserController::class, 'ratingReviewListdata'])->name('admin.user.ratingreview.listdata');
        Route::delete('/user/rating-review/destroy/{id}', [UserController::class, 'ratingReviewDestroy'])->name('admin.user.ratingreview.destroy');
        Route::resource('users', UserController::class)->names([
            'index' => 'admin.user.list',
            'edit' => 'admin.user.edit',
            'update' => 'admin.user.update',
            'show' => 'admin.user.show',
            'destroy' => 'admin.user.destroy',
        ]);
    });
});
