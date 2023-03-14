<?php

namespace App\Http\Controllers;

use App\Models\blog;
use Illuminate\Http\Request;

class BlogsController extends Controller
{
    //- get blog posts

    public function index()
    {
        return blog::orderByDesc('created_at')->get();
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

    public function search($title)
    {
        return blog::where('title', 'like', '%' . $title . '%')->get();
    }

    public function update(Request $request, $id){
        $blog = blog::find($id);
        $blog->title = $request->input('title');
        $blog->description = $request->input('description');
        $blog->img_url = $request->input('img_url');
        $blog->update();
        return $blog;
    }
}