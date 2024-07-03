<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
     public function googleSignIn(Request $request)
     {
          $name = $request->input('name');
          $email = $request->input('email');
          $photo = $request->input('photo');

          $user = User::where('email', $email)->first();

          $newUser = false;

          if (!$user) {
               $user = User::create([
                    'name' => $name,
                    'email' => $email,
                    'photo' => $photo,
               ]);

               $newUser = true;
          }

          Auth::login($user);

          return response()->json(['user' => $user, 'newUser' => $newUser, 'token' => $user->createToken('authToken')->plainTextToken]);
     }
}
