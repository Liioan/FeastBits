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
        $result = DB::table('orders as orr')
        ->select('orr.*', 'of.type')
        ->join('offers as of', 'orr.offer_id', '=', 'of.id')
        ->orderBy('of.type')
        ->get();
        return $result;        
    }

    public function showSingle(Request $request)
    {
        $userId = $request->user()['id'];
        $result = DB::table('offers as of')
        ->select('of.name', 'of.type', 'of.id as offer_id', 'of.img_url', 'orr.id', 'orr.created_at', 'orr.updated_at', 'orr.is_completed')
        ->join('orders as orr', 'of.id', '=', 'orr.offer_id')
        ->where('orr.user_id', '=', $userId)
        ->where('of.type', '=', 'single')
        ->get();
        return $result;    
    }

    public function showSubs(Request $request)
    {
       $userId = $request->user()['id'];
        $result = DB::table('offers as of')
        ->select('of.name', 'of.type', 'of.id as offer_id', 'of.img_url', 'orr.id', 'orr.created_at', 'orr.updated_at', 'orr.is_completed')
        ->join('orders as orr', 'of.id', '=', 'orr.offer_id')
        ->where('orr.user_id', '=', $userId)
        ->where('of.type', '=', 'subscription')
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
        
        return order::destroy($id);
    }

    public function complete($id){
        $order = order::find($id);
        $order->is_completed = true;
        $order->update();
        return 'completed order';
    }

}
