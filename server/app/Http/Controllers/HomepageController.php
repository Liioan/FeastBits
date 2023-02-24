<?php

namespace App\Http\Controllers;

use App\Models\blog;
use App\Models\offer;
use Illuminate\Http\Request;

class HomepageController extends Controller
{
    //- get blogs for home page

    public function showBlog()
    {
        return blog::orderByDesc('created_at')->take(3)->get();
    }
    public function showSingle()
    {
        return offer::where('type', 'single')->take(3)->get();
    }
    public function showSubs()
    {
        return offer::where('type', 'subscribtion')->take(3)->get();
    }
}