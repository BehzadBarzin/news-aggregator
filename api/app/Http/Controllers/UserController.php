<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Create a new user in the database and return its access token
     *
     * POST: /api/register
     */
    public function register(Request $request) {

        // First, validate the data posted to this endpoint
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed'
        ]);

        // Using the User model, create a new User entry
        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']) // Remember to encrypt the password and don't store the raw value
        ]);

        // Create a new access token
        $token = $user->createToken('api-token')->plainTextToken;

        // Construct a response
        $response = [
            'user' => $user,
            'token' => $token
        ];

        // Return the response to the user
        return response($response, 201);
    }

    /**
     * Create a new access token for an existing user
     *
     * POST: /api/login
     */
    public function login(Request $request) {

        // First, validate the data posted here
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        // Find the user in the database using the User model
        $user = User::where('email', $fields['email'])->first();

        // Check password
        // 1- If the user wasn't found in the database
        // 2- The provided password didn't match the one stored in the database
        // Then, Return a 401 error
        if(!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Wrong Credentials!'
            ], 401);
        }

        // Create a new access token
        $token = $user->createToken('api-token')->plainTextToken;

        // Construct and return a response with the token
        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }

    /**
     * Remove the current access token of the user
     * NOTE: this is a private route (only accessible for users with an auth token)
     *
     * POST: /api/logout
     */
    public function logout(Request $request) {
        // Get the current user's current access token from the request and delete it
        $request->user()->currentAccessToken()->delete();

        return [
            'message' => 'Logged out'
        ];
    }
}
