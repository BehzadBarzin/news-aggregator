<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SourceController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserPreferencesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Returns the currently logged in user
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Returns a paginated list of articles and accepts query parameters to filter the list
Route::get('/articles', [ArticleController::class, 'index']);

// Returns a list of all authors
Route::get('/authors', [AuthorController::class, 'index']);

// Returns a list of all sources
Route::get('/sources', [SourceController::class, 'index']);

// Returns a list of all categories
Route::get('/categories', [CategoryController::class, 'index']);

// Registers a new users and logs them in
Route::post('/register', [UserController::class, 'register']);

// Creates a new authentication token and returns it
Route::post('/login', [UserController::class, 'login']);

// Removes currently logged in user's authentication token
Route::middleware('auth:sanctum')->post('/logout', [UserController::class, 'logout']);

// Returns current user's preferences (default filter queries to filter the articles)
Route::middleware('auth:sanctum')->get('/preferences', [UserPreferencesController::class, 'show']);

// Adds default user preferences
Route::middleware('auth:sanctum')->post('/preferences', [UserPreferencesController::class, 'store']);
