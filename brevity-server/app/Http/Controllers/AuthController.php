<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Google_Client;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

     private function verifyGoogleToken($idToken)
     {
          $client = new Google_Client(['client_id' => env('GOOGLE_CLIENT_ID')]);
          $payload = $client->verifyIdToken($idToken);
          if ($payload) {
               return $payload;
          }
          return null;
     }
     public function SignIn(Request $request)
     {

          $idToken = $request->input('idToken');
          $payload = $this->verifyGoogleToken($idToken);

          if (!$payload) {
               return response()->json(['error' => 'Invalid ID token'], 401);
          }

          $email = $payload['email'];
          $name = $payload['name'];
          $photo = $payload['picture'];
          $username = $request->input('username');

          $user = User::where('email', $email)->first();

          $newUser = false;
          $authValue = true;

          if (!$user) {
               $user = User::create([
                    'name' => $name,
                    'username' => $username,
                    'email' => $email,
                    'bio' => "",
                    'photo' => $photo,
                    'linkFirst' => '',
                    'linkSecond' => '',
                    'linkThird' => '',
                    'linkForth' => ''
               ]);

               $newUser = true;
               $authValue = true;
          }

          Auth::login($user);

          return response()->json(['user' => $user, 'newUser' => $newUser, 'authValue' => $authValue, 'token' => $user->createToken('authToken')->plainTextToken]);
     }

     public function SignOut()
     {
          Auth::logout();
          return response()->json(['message' => 'Logged out successfully'], 200);
     }
}
