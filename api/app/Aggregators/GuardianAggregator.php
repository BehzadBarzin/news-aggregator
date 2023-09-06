<?php

namespace App\Aggregators;

use App\Models\Article;
use App\Models\Author;
use App\Models\Source;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GuardianAggregator extends Aggregator {

    protected static Sources $source_name = Sources::THE_GUARDIAN;
    protected static String $endpoint = 'https://content.guardianapis.com/search';

    private static Author $author;

    public static function run() {
        Log::debug('Guardian: run');


        $source = Source::where('name', self::$source_name->value())->first();

        $api_key = env('GUARDIAN_KEY');

        // Guardian doesn't provide the names of the authors, so we'll create a default one
        self::$author = Author::firstOrCreate([
            'name' => 'Unknown'
        ]);

        // For each source-category get the articles
        foreach ($source->sourceCategories as $sc) {
            Log::debug("Guardian: Source Category: $sc->name");

            // Get the first page
            $response = Http::get(self::$endpoint, [
                'api-key' => $api_key,
                'section' => $sc->name,
                'page-size' => 200
            ]);
            $json = $response->json()['response'];

            $total_pages = $json['pages'];

            $current_page = $json['currentPage'];

            Log::debug("Guardian: Saving Articles of Page: ($current_page) of ($total_pages)");


            // For each article, add to db, until we reach a duplicate, this means that all subsequent articles have been imported
            foreach ($json['results'] as $item) {
                if (Article::where('url', $item['webUrl'])->where('source_category_id', $sc->id)->count() > 0) {
                    Log::debug("Guardian: Reached duplicate article in page: ($current_page) of ($total_pages) → Going to next source-category");
                    continue 2; // Go to next topic
                }
                self::save_article($item, $sc);
            }

            // Go through next pages
            for ($p = ++$current_page; $p <= $total_pages; $p++) {
                Log::debug("Guardian: Saving Articles of Page: ($p) of ($total_pages)");

                $response = Http::get(self::$endpoint, [
                    'api-key' => $api_key,
                    'section' => $sc->name,
                    'page-size' => 200,
                    'page' => $p
                ]);

                // If we receive a bad request, this means that we have exceeded the maximum number of available pages
                if ($response->badRequest()) {
                    Log::debug("Guardian: cannot get pages >= $p → Going to next source-category");
                    break;
                }

                // For each article, add to db, until we reach a duplicate, this means that all subsequent articles have been imported
                foreach ($json['results'] as $item) {
                    if (Article::where('url', $item['webUrl'])->where('source_category_id', $sc->id)->count() > 0) {
                        Log::debug("Guardian: Reached duplicate article in page: ($p) of ($total_pages) → Going to next source-category");
                        continue 3; // Go to next topic
                    }
                    self::save_article($item, $sc);
                }

            }

        }
    }

    private static function save_article($item, $source_category) {
        $article = new Article();
        $article->title = $item['webTitle'];
        $article->url = $item['webUrl'];
        $article->published_at = Carbon::parse($item['webPublicationDate'])->toDateTimeString();
        $article->sourceCategory()->associate($source_category);
        $article->save();
        $article->authors()->save(self::$author);
    }
}
