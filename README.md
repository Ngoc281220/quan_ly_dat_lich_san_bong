B1: Cài Laragon
-- https://laragon.org/download/
B2: Composer
-- https://getcomposer.org/download/
B3: Node js
-- https://nodejs.org/en/download

-- Bỏ folder code vào thư mục www trong Laragon ở thư mục ổ C 

Chạy dự án

-- Backend laravel
cd vào thư mục backend
-- chạy
- composer install => Nếu version php mà không map dự án thì chạy lệnh composer update
-- copy .env.example .env
- php artisan key:generate
- composer require tymon/jwt-auth
- php artisan jwt:secret
- php artisan migrate
- php artisan migrate --seed
- php artisan config:clear
- php artisan cache:clear
- php artisan route:cache
- php artisan route:clear
- php artisan storage:link

-- Chạy serve
- php artisan serve



-- FrontEnd React
cd vào thư mục frontend
-- Chạy npm install
-- Chạy npm start

-- Lưu ý biên REACT_APP_API_URL trong file env bên thư mục frontend đang chạy port 8000 nêu chạy serve bên backend mà khác cổng thì phải cập nhật lại cổng port và chạy lại npm start
REACT_APP_API_URL = http://localhost:8000/api


-- tai khoan test 
- admin@gmail.com
- mk:123456