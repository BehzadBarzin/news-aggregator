<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Return a list of Articles based on the filters passed as query string
     *
     * GET /api/articles?sources=[2]&authors=[395]&categories=[7,3]&keywords=["hello","world"]
     */
    public function index(Request $request)
    {

        $author_ids = json_decode($request->query('authors') ?? '[]');
        $source_ids = json_decode($request->query('sources') ?? '[]');
        $category_ids = json_decode($request->query('categories') ?? '[]');
        $keywords = json_decode($request->query('keywords') ?? '[]');

        $query = Article::orderBy('published_at', 'desc');
        if (!empty($author_ids)) {
            $query->whereHas('authors', fn ($q) => $q->whereIn('id', $author_ids));
        }

        if (!empty($source_ids)) {
            $query->whereHas('sourceCategory', fn ($q) => $q->whereIn('source_id', $source_ids));
        }

        if (!empty($category_ids)) {
            $query->whereHas('sourceCategory', fn ($q) => $q->whereIn('category_id', $category_ids));
        }

        if (!empty($keywords)) {
            for ($i = 0; $i < count($keywords); $i++) {
                // First keyword must be used with 'where' not 'orWhere' to force the query to return results that have at least one of the keywords
                if ($i == 0) {
                    $query->where('title', 'like', "%{$keywords[$i]}%");
                    continue;
                }
                $query->orWhere('title', 'like', "%{$keywords[$i]}%");
            }
        }

        return $query->paginate(20);
    }
}
