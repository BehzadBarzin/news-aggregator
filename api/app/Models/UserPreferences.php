<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPreferences extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'authors', 'sources', 'categories', 'keywords'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}