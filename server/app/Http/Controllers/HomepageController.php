<?php

namespace App\Http\Controllers;

use App\Models\blog;
use Illuminate\Http\Request;

class HomepageController extends Controller
{
    //- get blogs for home page

    public function showBlog()
    {
        return blog::orderByDesc('created_at')->take(3)->get();
    }
}