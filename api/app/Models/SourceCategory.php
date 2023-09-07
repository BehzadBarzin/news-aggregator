<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SourceCategory extends Model
{
    use HasFactory;

    // When returning a SourceCategory, populate these relations (get their records and place them in the sourceCategory)
    protected $with = ['source', 'category'];

    // When returning a SourceCategory, hide these fields
    protected $hidden = [
        'id', 'name', 'source_id', 'category_id'
    ];

    // -----------------------------------------------------------------------------------------------------------
    // Relations
    // -----------------------------------------------------------------------------------------------------------

    // One-to-many: each SourceCategory has many Articles
    public function articles() {
        // by default Laravel knows to look for 'source_category_id' on the 'articles' table as a foreign key to reference this SourceCategory
        return $this->hasMany(Article::class);
    }

    // Each SourceCategory belongs to one Source
    public function source()
    {
        return $this->belongsTo(
            Source::class,
            'source_id' // The foreign key on this 'source_category' table to reference the Source
        );
    }

    // Each SourceCategory belongs to one Category
    public function category()
    {
        return $this->belongsTo(
            Category::class,
            'category_id'// The foreign key on this 'source_category' table to reference the Category
        );
    }
}
