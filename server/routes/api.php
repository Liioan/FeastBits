<?php

use App\http\Controllers\BlogsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/blog', [BlogsController::class, 'index']);
Route::post('/blog', [BlogsController::class, 'store']);
//^ this is for testing only, will be protected later

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});