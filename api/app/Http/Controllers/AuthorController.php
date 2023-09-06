<?php

namespace App\Http\Controllers;

use App\Models\Author;

class AuthorController extends Controller
{
    /**
     * Return a list of Authors
     *
     * GET /api/authors
     */
    public function index()
    {
        return Author::all();
    }
}
