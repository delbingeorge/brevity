<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    public function editProfile(Request $request)
    {
        $validation = [
            'username' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'name' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'linkFirst' => 'nullable|string|max:255',
            'linkSecond' => 'nullable|string|max:255',
            'linkThird' => 'nullable|string|max:255',
            'linkForth' => 'nullable|string|max:255',
        ];

        $validator = Validator::make($request->all(), $validation);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $user = User::where('email', $request->input('email'))
            ->where('username', $request->input('username'))
            ->first();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $photo = $request->input('photo');

        $user->name = $request->input('name');
        $user->username = $request->input('username');
        $user->email = $request->input('email');
        $user->bio = $request->input('bio');
        $user->linkFirst = $request->input('linkFirst');
        $user->linkSecond = $request->input('linkSecond');
        $user->linkThird = $request->input('linkThird');
        $user->linkForth = $request->input('linkForth');

        $user->save();

        return response()->json(['user' => $photo, 'message' => 'Profile updated successfully']);
    }
}
