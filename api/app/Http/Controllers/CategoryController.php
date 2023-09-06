<?php

namespace App\Http\Controllers;

use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * Return a list of Categories
     *
     * GET /api/categories
     */
    public function index()
    {
        return Category::all();
    }
}
