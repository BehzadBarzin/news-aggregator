<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name'];

    protected $hidden = [
        'created_at', 'updated_at', 'pivot'
    ];


    public function articles()
    {
        return $this->belongsToMany(Article::class, 'articles_authors', 'author_id', 'article_id');
    }
}
