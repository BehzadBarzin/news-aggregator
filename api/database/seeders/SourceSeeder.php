<?php

namespace Database\Seeders;

use App\Models\Source;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SourceSeeder extends Seeder
{

    private $sources = [
        'The Guardian',
        'New York Times',
        'News API'
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->sources as $source) {
            DB::table('sources')->insert([
                'name' => $source
            ]);
        }
    }
}
