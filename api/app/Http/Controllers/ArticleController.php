<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Return a list of Articles based on the filters passed as query string
     *
     * GET /api/articles?sources=[2]&authors=[395]&categories=[7,3]&keywords=["hello","world"]&page=1
     */
    public function index(Request $request)
    {

        // First decode the query parameter strings to normal arrays
        $author_ids = json_decode($request->query('authors') ?? '[]');
        $source_ids = json_decode($request->query('sources') ?? '[]');
        $category_ids = json_decode($request->query('categories') ?? '[]');
        $keywords = json_decode($request->query('keywords') ?? '[]');

        // Get a list of articles ordered by date
        $query = Article::orderBy('published_at', 'desc');

        // If a list of authors is passed, only return articles of those authors
        if (!empty($author_ids)) {
            // Using this syntax because Article and Author have a many-to-many relationship through a pivot table
            $query->whereHas('authors', fn ($q) => $q->whereIn('id', $author_ids));
        }

        // If a list of sources is passed, only return articles of those sources
        if (!empty($source_ids)) {
            // Using this syntax because Article and Source don't have a direct relationship
            // Each Article has a SourceCategory which itself has a Source
            $query->whereHas('sourceCategory', fn ($q) => $q->whereIn('source_id', $source_ids));
        }

        // If a list of categories is passed, only return articles of those categories
        if (!empty($category_ids)) {
            // Using this syntax because Article and Category don't have a direct relationship
            // Each Article has a SourceCategory which itself has a Category
            $query->whereHas('sourceCategory', fn ($q) => $q->whereIn('category_id', $category_ids));
        }


        // If a list of keywords is provided, filter the articles that contain either of those keywords in their title
        if (!empty($keywords)) {
            for ($i = 0; $i < count($keywords); $i++) {
                // First keyword must be used with 'where' (not 'orWhere') to force the query to return results that have at least one of the keywords
                if ($i == 0) {
                    $query->where('title', 'like', "%{$keywords[$i]}%");
                    continue;
                }
                $query->orWhere('title', 'like', "%{$keywords[$i]}%");
            }
        }

        // Return a paginated list of articles
        return $query->paginate(20);
    }
}
