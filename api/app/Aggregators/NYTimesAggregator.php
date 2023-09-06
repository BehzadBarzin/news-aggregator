<?php

namespace App\Aggregators;

use App\Models\Article;
use App\Models\Author;
use App\Models\Source;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NYTimesAggregator extends Aggregator {

    protected static Sources $source_name = Sources::NY_TIMES;
    protected static String $endpoint = 'https://api.nytimes.com/svc/topstories/v2/';

    public static function run() {
        Log::debug('NYT: run');


        $source = Source::where('name', self::$source_name->value())->first();

        $api_key = env('NY_TIMES_KEY');

        // For each source-category get the articles
        foreach ($source->sourceCategories as $sc) {
            Log::debug("NYT: Waiting 13 seconds before making new request to avoid hitting quota");
            sleep(13);
            Log::debug("NYT: Source Category: $sc->name");

            // Get the first page
            $response = Http::get(self::$endpoint . "{$sc->name}.json", [
                'api-key' => $api_key,
            ]);

            $items = $response->json()['results'];
            Log::debug("NYT: Saving Articles: " . count($items) . " items");

            // For each article, add to db, until we reach a duplicate, this means that all subsequent articles have been imported
            foreach ($items as $item) {
                if (Article::where('url', $item['url'])->where('source_category_id', $sc->id)->count() > 0) {
                    Log::debug("NYT: Reached duplicate article → Going to next source-category");
                    continue 2; // Go to next topic
                }

                self::save_article($item, $sc);
            }
        }
    }

    private static function save_article($item, $source_category) {
        if ($item['title'] == '') return;

        $by_line = $item['byline'];
        $by_line = str_replace('By ', '', $by_line);
        $by_line = str_replace(', ', '|', $by_line);
        $by_line = str_replace(' and ', '|', $by_line);
        $author_names = explode('|', $by_line);

        $authors = [];
        foreach ($author_names as $an) {
            $authors[] = Author::firstOrCreate([
                'name' => $an
            ]);
        }



        $article = new Article();
        $article->title = $item['title'];
        $article->url = $item['url'];
        $article->published_at = Carbon::parse($item['published_date'])->toDateTimeString();
        $article->sourceCategory()->associate($source_category);
        $article->save();
        $article->authors()->saveMany($authors);
    }
}
