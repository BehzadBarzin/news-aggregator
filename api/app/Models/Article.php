<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    // When returning an article, populate these relations (get their records and place them in the article)
    protected $with = ['sourceCategory', 'authors'];

    // When returning an article, hide these fields
    protected $hidden = [
        'created_at', 'updated_at', 'source_category_id'
    ];

    // The attributes that are mass assignable.
    protected $fillable = ['title', 'url', 'published_at'];

    // -----------------------------------------------------------------------------------------------------------
    // Relations
    // -----------------------------------------------------------------------------------------------------------

    // Many-to-many (pivot table): Each article belongs to many authors
    public function authors()
    {
        return $this->belongsToMany(
            Author::class, // Related to
            'articles_authors', // Name of the pivot table
            'article_id', // Foreign key on the pivot table that references this article
            'author_id' // Foreign key on the pivot table that references an author that this article belongs to
        );
    }

    // Each article belongs to a SourceCategory (Category specific to an individual Source)
    public function sourceCategory()
    {
        return $this->belongsTo(
            SourceCategory::class, // Related to
            'source_category_id' // The foreign key on this article that references a SourceCategory
        );
    }

    // Each article has one Category through one SourceCategory
    // This is not a conventional relation in Laravel,
    // so first, we access the SourceCategory object whose relation has been established above,
    // and then through that we get its relation to Category
    // (notice we're calling 'category()' relation as a function because we want to use it in the query builder)
    public function category()
    {
        return $this->sourceCategory->category();
    }

    // Each article has one Source through one SourceCategory
    // This is not a conventional relation in Laravel,
    // so first, we access the SourceCategory object whose relation has been established above,
    // and then through that we get its relation to Source
    // (notice we're calling 'source()' relation as a function because we want to use it in the query builder)
    public function source()
    {
        return $this->sourceCategory->source();
    }
}
