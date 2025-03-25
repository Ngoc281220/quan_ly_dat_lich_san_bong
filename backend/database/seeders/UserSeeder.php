<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 20; $i++) {
            DB::table('users')->insert([
                'full_name' => 'Nguyễn Văn A ' . $i,
                'email' => 'user' . $i . '@gmail.com', // Để tránh trùng email
                'phone' => '0' . rand(100000000, 999999999),
                'password' => Hash::make('123'),
                'role' => $i == 0 ? 1 : 0,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
