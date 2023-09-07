<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use HasFactory;

    // The attributes that are mass assignable.
    protected $fillable = ['name'];

    // When returning an article, hide these fields
    protected $hidden = [
        'created_at', 'updated_at', 'pivot'
    ];

    // -----------------------------------------------------------------------------------------------------------
    // Relations
    // -----------------------------------------------------------------------------------------------------------

    // Many-to-many (pivot table): Each author belongs to many article
    public function articles()
    {
        return $this->belongsToMany(
            Article::class, // Related to
            'articles_authors', // Name of the pivot table
            'author_id', // Foreign key on the pivot table that references this author
            'article_id' // Foreign key on the pivot table that references an article that this author belongs to
        );
    }
}
