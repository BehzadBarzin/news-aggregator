<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{

    private $categories = [
        'Business',
        'Science',
        'Sports',
        'Technology',
        'Health',
        'Entertainment',
        'General'
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->categories as $category) {
            DB::table('categories')->insert([
                'name' => $category
            ]);
        }
    }
}
