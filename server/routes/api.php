<?php

use App\Http\Controllers\AuthController;
use App\http\Controllers\BlogsController;
use App\Http\Controllers\HomepageController;
use App\Http\Controllers\OfferController;
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

Route::get('/homepageBlog', [HomepageController::class, 'showBlog']);
Route::get('/homepageSingle', [HomepageController::class, 'showSingle']);
Route::get('/homepageSubs', [HomepageController::class, 'showSubs']);
//^ home page routes 

Route::get('/blog', [BlogsController::class, 'index']);
Route::get('/blog/{id}', [BlogsController::class, 'show']);


//^ this is for testing only, will be protected later

Route::get('/offer/subs', [OfferController::class, 'showSubs']);
Route::get('/offer/single', [OfferController::class, 'showSingle']);
Route::get('/offer/{id}', [OfferController::class, 'show']);


//^ this is for testing only, will be protected later

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::group(
        ['middleware' => ['isAdmin']],
        function () {
            // Admin routes
            // code for middleware and routes in courtesy of https://github.com/matibox
            Route::post('/offer', [OfferController::class, 'store']);
            Route::delete('/offer/{id}', [OfferController::class, 'destroy']);
            Route::put('/offer/{id}', [OfferController::class, 'update']);

            Route::post('/blog', [BlogsController::class, 'store']);
            Route::post('/blog/{id}', [BlogsController::class, 'destroy']);
            Route::put('/blog/{id}', [BlogsController::class, 'update']);
        }
    );
});