<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Source extends Model
{
    use HasFactory;

    public function sourceCategories()
    {
        return $this->hasMany(SourceCategory::class);
    }

    public function articles()
    {
        return $this->hasManyThrough(Article::class, SourceCategory::class, 'source_id', 'source_category_id');
    }
}
