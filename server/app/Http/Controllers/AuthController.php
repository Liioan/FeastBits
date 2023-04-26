<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class AuthController extends Controller
{
  public function register(Request $request)
  {
    $fields = $request->validate([
      'name' => 'required|string',
      'surname' => 'required|string',
      'email' => 'required|string|unique:users,email',
      'password' => 'required|string|confirmed'
    ]);


    $user = User::create([
      'name' => $fields['name'],
      'surname' => $fields['surname'],
      'email' => $fields['email'],
      'password' => bcrypt($fields['password']),
    ]);

    if ($fields['email'] == env('ADMIN_EMAIL')) {
      $user = User::find($user['id']);
      $user->is_admin = '1';
      $user->save();
    }

    $token = $user->createToken('myapptoken')->plainTextToken;

    $response = [
      'user' => $user,
      'token' => $token
    ];

    return response($response, 201);
  }

  public function login(Request $request)
  {
    $fields = $request->validate([
      'email' => 'required|string',
      'password' => 'required|string'
    ]);

    //check email
    $user = User::where('email', $fields['email'])->first();

    if (!$user || !Hash::check($fields['password'], $user->password)) {
      return response([
        'message' => 'bad creds'
      ], 401);
    }

    $token = $user->createToken('myapptoken')->plainTextToken;
    $response = [
      'user' => $user,
      'token' => $token
    ];

    return response($response, 201);
  }

  public function logout(Request $request)
  {
    auth()->user()->tokens()->delete();

    return [
      'message' => 'logged out'
    ];
  }

  public function showUsers(Request $request){
    return user::all();
  }

  public function changeUserRank($id){
    $user = user::find($id);
    $user->is_admin = (!$user->is_admin);
    $user->update();
    return $user;
  }
}