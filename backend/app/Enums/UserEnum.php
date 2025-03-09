<?php
namespace App\Enums;

enum UserEnum: int {
    case ROLE_USER = 0;
    case ROLE_ADMIN = 1;
}