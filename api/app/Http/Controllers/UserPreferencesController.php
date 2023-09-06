<?php

namespace App\Http\Controllers;

use App\Models\UserPreferences;
use Illuminate\Http\Request;

class UserPreferencesController extends Controller
{
    public function store(Request $request)
    {
        $update_data = [];
        if ($request->input('authors') != null) $update_data['authors'] = json_encode($request->input('authors'));
        if ($request->input('sources') != null) $update_data['sources'] = json_encode($request->input('sources'));
        if ($request->input('categories') != null) $update_data['categories'] = json_encode($request->input('categories'));
        if ($request->input('keywords') != null) $update_data['keywords'] = json_encode($request->input('keywords'));

        $prefs = UserPreferences::updateOrCreate(
            ['user_id' => auth()->user()->id],
            $update_data
        );

        return response($prefs, 201);
    }

    public function show()
    {
        auth()->user()->preferences;
    }
}
