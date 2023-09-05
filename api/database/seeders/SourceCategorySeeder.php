<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Source;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SourceCategorySeeder extends Seeder
{
    private $sourceCategories = [
        'The Guardian' => [
            'Business' => [ 'business', 'better-business', 'small-business-network', 'money'],
            'Science' => [ 'science' ],
            'Sports' => [ 'sport' ],
            'Technology' => [ 'technology' ],
            'Health' => [ 'healthcare-network' ],
            'Entertainment' => [ 'fashion', 'tv-and-radio', 'stage', 'music', 'media'],
            'General' => [ 'world', 'politics', 'news', 'law', 'women-in-leadership', 'weather', 'us-news', 'travel', 'social-care-network', 'public-leaders-network', 'info']
        ],
        'New York Times' => [
            'Business' => [ 'business', 'realestate' ],
            'Science' => [ 'science' ],
            'Sports' => [ 'sports' ],
            'Technology' => [ 'technology' ],
            'Health' => [ 'health' ],
            'Entertainment' => [ 'movies', 'theater', 'fashion'],
            'General' => [ 'world', 'politics', 'us', 'automobiles', 'arts']
        ],
        'News API' => [
            'Business' => [ 'business' ],
            'Science' => [ 'science' ],
            'Sports' => [ 'sports' ],
            'Technology' => [ 'technology' ],
            'Health' => [ 'health' ],
            'Entertainment' => [ 'entertainment' ],
            'General' => [ 'general' ]
        ],
    ];
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach ($this->sourceCategories as $source => $categories) {
            $source_id = Source::where('name', $source)->first()->id;

            foreach ($categories as $category => $list) {
                $category_id = Category::where('name', $category)->first()->id;

                foreach ($list as $item) {
                    DB::table('source_categories')->insert([
                        'source_id' => $source_id,
                        'category_id' => $category_id,
                        'name' => $item
                    ]);
                }
            }
        }
    }
}
