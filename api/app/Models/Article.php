<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'abstract', 'url', 'published_at'];

    public function authors()
    {
        return $this->belongsToMany(Author::class, 'articles_authors', 'article_id', 'author_id');
    }

    public function sourceCategory()
    {
        return $this->belongsTo(SourceCategory::class, 'source_category_id');
    }

    public function category()
    {
        return $this->sourceCategory->category();
    }

    public function source()
    {
        return $this->sourceCategory->source();
    }
}
