<?php

use App\Aggregators\GuardianAggregator;
use App\Aggregators\NewsAPIAggregator;
use App\Aggregators\NYTimesAggregator;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    NewsAPIAggregator::run();
    // return view('welcome');
});
