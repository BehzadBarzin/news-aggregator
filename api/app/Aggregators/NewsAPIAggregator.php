<?php

namespace App\Aggregators;

use App\Models\Article;
use App\Models\Author;
use App\Models\Source;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NewsAPIAggregator extends Aggregator {

    protected static Sources $source_name = Sources::NEWS_API;
    protected static String $endpoint = 'https://newsapi.org/v2/top-headlines';

    public static function run() {
        Log::debug('NewsAPI: run');


        $source = Source::where('name', self::$source_name->value())->first();

        $api_key = env('NEWS_API_KEY');

        // For each source-category get the articles
        foreach ($source->sourceCategories as $sc) {
            Log::debug("NewsAPI: Source Category: $sc->name");

            // Get the first page
            $response = Http::get(self::$endpoint, [
                'apiKey' => $api_key,
                'category' => $sc->name,
                'country' => 'us', // To get US news (only English)
                'pageSize' => 100 // We are limited to only 100 results
            ]);

            $items = $response->json()['articles'];
            Log::debug("NewsAPI: Saving Articles: " . count($items) . " items");

            // For each article, add to db, until we reach a duplicate, this means that all subsequent articles have been imported
            foreach ($items as $item) {
                if (Article::where('url', $item['url'])->where('source_category_id', $sc->id)->count() > 0) {
                    Log::debug("NewsAPI: Reached duplicate article → Going to next source-category");
                    continue 2; // Go to next topic
                }

                self::save_article($item, $sc);
            }
        }
    }

    private static function save_article($item, $source_category) {
        if ($item['title'] == '[Removed]') return;

        $author = null;
        if (isset($item['author']) && !empty($item['author'])) {
            $author = Author::firstOrCreate([
                'name' => $item['author']
            ]);
        } else {
            $author = Author::firstOrCreate([
                'name' => 'Unknown'
            ]);
        }

        $article = new Article();
        $article->title = $item['title'];
        $article->url = $item['url'];
        $article->published_at = Carbon::parse($item['publishedAt'])->toDateTimeString();
        $article->sourceCategory()->associate($source_category);
        $article->save();
        $article->authors()->save($author);
    }
}
