<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run()
    {
        DB::table('categories')->insert([
            ['name' => 'Sân bóng đá', 'description' => 'Sân dành cho bóng đá mini và chuyên nghiệp'],
            ['name' => 'Sân tennis', 'description' => 'Sân đạt tiêu chuẩn thi đấu tennis'],
            ['name' => 'Sân cầu lông', 'description' => 'Sân cầu lông trong nhà và ngoài trời'],
            ['name' => 'Sân bóng rổ', 'description' => 'Sân tiêu chuẩn dành cho bóng rổ'],
            ['name' => 'Sân bóng chuyền', 'description' => 'Sân bóng chuyền chuyên nghiệp'],
        ]);
    }
}
