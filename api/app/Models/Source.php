<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Source extends Model
{
    use HasFactory;

    // -----------------------------------------------------------------------------------------------------------
    // Relations
    // -----------------------------------------------------------------------------------------------------------

    // One-to-Many: Each Source has many SourceCategories
    public function sourceCategories()
    {
        // by default Laravel knows to look for 'source_id' on the 'source_categories' table as a foreign key to reference this Source
        return $this->hasMany(SourceCategory::class);
    }

    // Has-Many-Through: each Source has many Articles through different SourceCategories
    public function articles()
    {
        return $this->hasManyThrough(
            Article::class, // Related to
            SourceCategory::class, // Through (Article has a one-to-many relation with this)
            'source_id', // Key on the SourceCategory that references this Source
            'source_category_id' // Key on the through table (Article) that references the through item (SourceCategory)
        );
    }
}
