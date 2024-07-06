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
          $username = $request->input('username');
          $email = $request->input('email');
          $bio = $request->input('bio');
          $photo = $request->input('photo');
          $linkFirst = $request->input('linkFirst');
          $linkSecond = $request->input('linkSecond');
          $linkThird = $request->input('linkThird');
          $linkForth = $request->input('linkForth');

          $user = User::where('email', $email)->first();

          $newUser = false;
          $authValue = true;

          if (!$user) {
               $user = User::create([
                    'name' => $name,
                    'username' => $username,
                    'email' => $email,
                    'bio' => $bio,
                    'photo' => $photo,
                    'linkFirst' => $linkFirst,
                    'linkSecond' => $linkSecond,
                    'linkThird' => $linkThird,
                    'linkForth' => $linkForth
               ]);

               $newUser = true;
               $authValue = true;
          }

          Auth::login($user);

          return response()->json(['user' => $user, 'newUser' => $newUser, 'authValue' => $authValue, 'token' => $user->createToken('authToken')->plainTextToken]);
     }
}
