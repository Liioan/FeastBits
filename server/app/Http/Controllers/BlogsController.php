<?php

namespace App\Http\Controllers;

use App\Models\blog;
use Illuminate\Http\Request;

class BlogsController extends Controller
{
    //- get blog posts

    public function index()
    {
        return blog::all();
    }

    //- create blog post
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'img_url' => 'required'
        ]);
        return blog::create($request->all());
    }

    //- get specific blog post
    public function show($id)
    {
        return blog::find($id);
    }

    //- delete blog post
    public function destroy($id)
    {
        return blog::destroy($id);
    }
}