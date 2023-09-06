<?php

namespace App\Http\Controllers;

use App\Models\Source;

class SourceController extends Controller
{
    /**
     * Return a list of Sources
     *
     * GET /api/sources
     */
    public function index()
    {
        return Source::all();
    }
}
