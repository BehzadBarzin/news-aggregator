<?php

namespace App\Aggregators;

enum Sources {
    case THE_GUARDIAN;
    case NY_TIMES;
    case NEWS_API;

    public function value(): string
    {
        return match($this)
        {
            Sources::THE_GUARDIAN => 'The Guardian',
            Sources::NY_TIMES => 'New York Times',
            Sources::NEWS_API => 'News API'
        };
    }
}

abstract class Aggregator {
    abstract public static function run();
}
