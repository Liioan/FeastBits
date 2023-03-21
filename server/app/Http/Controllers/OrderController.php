<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Order;
use Illuminate\Http\Request;

//return $user->orders()->first()->offer()->get();
// ^ shows offer related with first order, might be usefull

class OrderController extends Controller
{

    public function index(Request $request){
        $user = $request->user();
        return $user->orders()->get();        
    }

    public function store(Request $request){
        $request->validate([
            'offer_id' => 'integer',
        ]);
        
        $order = order::create([
            'user_id' => $request->user()['id'],
            'offer_id' => $request['offer_id'],
        ]);

        return $order;

        
    }

    public function destroy($id){
        return Order::destroy($id);
    }
}
