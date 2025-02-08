<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\IBaseRepository;
use App\Repositories\BaseRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $singletons = [
            IBaseRepository::class => BaseRepository::class
        ];

        foreach ($singletons as $interface => $repository) {
            $this->app->singleton($interface, $repository);
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
