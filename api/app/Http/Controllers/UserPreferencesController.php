<?php

namespace App\Http\Controllers;

use App\Models\UserPreferences;
use Illuminate\Http\Request;

class UserPreferencesController extends Controller
{
    /**
     * Store default filters for the current user
     *
     * POST: /api/preferences
     */
    public function store(Request $request)
    {
        $update_data = [];
        // Below code is used for partial updating which currently doesn't work with the front-end
        // if ($request->input('authors') != null) $update_data['authors'] = json_encode($request->input('authors'));
        // if ($request->input('sources') != null) $update_data['sources'] = json_encode($request->input('sources'));
        // if ($request->input('categories') != null) $update_data['categories'] = json_encode($request->input('categories'));
        // if ($request->input('keywords') != null) $update_data['keywords'] = json_encode($request->input('keywords'));

        // Because the front-end always sends all of the below properties, and we don't need partial update, we can overwrite all
        // Also, we had to do this because Axios (on the front-end) ignores parameters that have a value of: '', [], or null
        // So, when we wanted to remove all items from a filter, it ignored it
        $update_data['authors'] = json_encode($request->input('authors'));
        $update_data['sources'] = json_encode($request->input('sources'));
        $update_data['categories'] = json_encode($request->input('categories'));
        $update_data['keywords'] = json_encode($request->input('keywords'));

        // First try to find an existing record for the user, if found, update it, if not create it
        $prefs = UserPreferences::updateOrCreate(
            ['user_id' => auth()->user()->id],
            $update_data
        );

        return response($prefs, 201);
    }

    /**
     * Returns all the default filters used by the user
     *
     * GET: /api/preferences
     */
    public function show()
    {
        return auth()->user()->preferences;
    }
}
