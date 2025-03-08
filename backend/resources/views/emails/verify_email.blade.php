<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <title>Xác nhận Email</title>
</head>

<body>
    <h2>Chào {{ $user->name }}</h2>
    <p>Vui lòng nhấp vào link dưới đây để xác nhận email:</p>
    <a href="{{ $verificationUrl }}" style="padding: 10px 20px; background: green; color: white; text-decoration: none; border-radius: 5px;">
        Xác nhận Email
    </a>
    <p>Nếu bạn không đăng ký, vui lòng bỏ qua email này.</p>
</body>

</html>