<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SourceCategory extends Model
{
    use HasFactory;

    public function articles() {
        return $this->hasMany(Article::class);
    }

    public function source()
    {
        return $this->belongsTo(Source::class, 'source_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
