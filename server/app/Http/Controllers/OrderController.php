<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Order;
use Illuminate\Http\Request;
use DB;

//return $user->orders()->first()->offer()->get();
// ^ shows offer related with first order, might be usefull

class OrderController extends Controller
{

    public function index(){
        return order::all();        
    }

    public function showSingle(Request $request)
    {
        $result = DB::table('orders as o')
        ->select('o.*')
        ->join('users as u', 'u.id', '=', 'o.user_id')
        ->whereIn('o.offer_id', function($query) {
            $query->select('id')
                ->from('offers')
                ->where('type', 'single');
        })
        ->where('u.id', '=', 1)
        ->get();
        return $result;    
    }

    public function showSubs(Request $request)
    {
        $result = DB::table('orders as o')
        ->select('o.*')
        ->join('users as u', 'u.id', '=', 'o.user_id')
        ->whereIn('o.offer_id', function($query) {
            $query->select('id')
                ->from('offers')
                ->where('type', 'subscribtion');
        })
        ->where('u.id', '=', 1)
        ->get();
        return $result;
    }

    public function store(Request $request){
        $request->validate([
            'offer_id' => 'required|integer',
            'city' => 'required|string',
            'street' => 'required|string',
            'house_number' => 'required|integer'
        ]);
        
        
        $order = order::create([
            'user_id' => $request->user()['id'],
            'offer_id' => $request['offer_id'],
            'city' => $request['city'],
            'street' => $request['street'],
            'house_number' => $request['house_number'],
        ]);

        return $order;
    }

    public function destroy($id){
        return Order::destroy($id);
    }
}
