<?php

namespace App\Http\Controllers;

use App\Models\UserPreferences;
use Illuminate\Http\Request;

class UserPreferencesController extends Controller
{
    public function store(Request $request)
    {
        $update_data = [];
        // if ($request->input('authors') != null) $update_data['authors'] = json_encode($request->input('authors'));
        // if ($request->input('sources') != null) $update_data['sources'] = json_encode($request->input('sources'));
        // if ($request->input('categories') != null) $update_data['categories'] = json_encode($request->input('categories'));
        // if ($request->input('keywords') != null) $update_data['keywords'] = json_encode($request->input('keywords'));

        // Because the front-end always sends all of the below properties, and we don't need partial update, we can overwrite all
        $update_data['authors'] = json_encode($request->input('authors'));
        $update_data['sources'] = json_encode($request->input('sources'));
        $update_data['categories'] = json_encode($request->input('categories'));
        $update_data['keywords'] = json_encode($request->input('keywords'));

        $prefs = UserPreferences::updateOrCreate(
            ['user_id' => auth()->user()->id],
            $update_data
        );

        return response($prefs, 201);
    }

    public function show()
    {
        return auth()->user()->preferences;
    }
}
