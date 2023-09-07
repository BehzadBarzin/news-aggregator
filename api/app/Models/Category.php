<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    // -----------------------------------------------------------------------------------------------------------
    // Relations
    // -----------------------------------------------------------------------------------------------------------

    // One-to-Many: Each Category has many SourceCategories
    public function sourceCategories()
    {
        // by default Laravel knows to look for 'category_id' on the 'source_categories' table as a foreign key to reference this Category
        return $this->hasMany(SourceCategory::class);
    }


    // Has-Many-Through: each Category has many Articles through different SourceCategories
    public function articles()
    {
        return $this->hasManyThrough(
            Article::class, // Related to
            SourceCategory::class, // Through (Article has a one-to-many relation with this)
            'category_id', // Key on the SourceCategory that references this Category
            'source_category_id' // Key on the through table (Article) that references the through item (SourceCategory)
        );
    }
}
