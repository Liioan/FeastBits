<?php

namespace App\Http\Controllers;

use App\Models\offer;
use Illuminate\Http\Request;

class OfferController extends Controller
{
    //- get blog posts

    public function showSingle()
    {
        return offer::where('type', 'single')->get();
    }
    public function showSubs()
    {
        return offer::where('type', 'subscribtion')->get();
    }

    public function index()
    {
        return offer::all();
    }

    //- create offer post
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required',
            'discount_price' => 'nullable',
            'type' => 'required',
            'is_special' => 'required',
            'img_url' => 'required'
        ]);
        return offer::create($request->all());
    }

    //- get specific offer post
    public function show($id)
    {
        return offer::find($id);
    }

    //- delete offer post
    public function destroy($id)
    {
        return offer::destroy($id);
    }

    public function search($name)
    {
        return offer::where('name', 'like', '%' . $name . '%')->get();
    }
}