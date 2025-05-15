- 1 run project
- composer install
- 
// jwt
- composer require tymon/jwt-auth
- php artisan jwt:secret
//
- composer dump-autoload
copy .env.example .env

php artisan key:generate

- php artisan migrate
- php artisan migrate --seed
- php artisan migrate --seed
- php artisan migrate:refresh
- php artisan migrate:refresh --seed
- php artisan migrate:reset
- php artisan migrate:fresh
- php artisan migrate --path=database/migrations/2024_02_11_123456_create_users_table.php
- php artisan serve
- php artisan config:clear
- php artisan cache:clear
- php artisan route:cache

- php artisan route:clear
- php artisan cache:clear
- php artisan config:clear
- composer dump-autoload
 php artisan storage:link

- Chạy command:
- php artisan make:controller Auth\AuthController
- php artisan make:model ModelName
- php artisan make:middleware VerifyJWTToken
- php artisan make:request RegisterRequest
php artisan make:request LoignRequesthp 
php artisan make:model User
php artisan make:request LoginPostRequest

composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate


// thanh toán
payment
id madon date_payment total_price, total_hour , hình ảnh_chuyển khoản status


