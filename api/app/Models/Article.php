<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $with = ['sourceCategory', 'authors'];

    protected $hidden = [
        'created_at', 'updated_at', 'source_category_id'
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'url', 'published_at'];

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
