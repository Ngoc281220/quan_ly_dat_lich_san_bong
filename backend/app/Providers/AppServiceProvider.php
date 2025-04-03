<?php

namespace App\Providers;

use Illuminate\Support\Facades\Schema;

use Illuminate\Support\ServiceProvider;
use App\momo\PaymentMomo;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(PaymentMomo::class, function ($app) {
            return new PaymentMomo();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(191);
    }
}
