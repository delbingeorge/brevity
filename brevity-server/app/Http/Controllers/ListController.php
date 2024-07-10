<?php

namespace App\Http\Controllers;

use App\Models\Lists;
use App\Models\User;
use Illuminate\Http\Request;

class ListController extends Controller
{
    public function joinList(Request $request)
    {

        $validatedData = $request->validate([
            'list_id' => 'required|integer|exists:lists,id',
            'user_id' => 'required|integer|exists:users,id',
        ]);

        $listId = $validatedData['list_id'];
        $userId = $validatedData['user_id'];


        $user = User::find($userId);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $list = Lists::find($listId);
        if (!$list) {
            return response()->json(['error' => 'List not found'], 404);
        }

        $user->lists()->attach($listId);

        return response()->json(['success' => true, 'list_id' => $listId, 'user_id' => $userId]);
    }

    public function leaveList(Request $request)
    {
        $validatedData = $request->validate([
            'list_id' => 'required|integer|exists:lists,id',
            'user_id' => 'required|integer|exists:users,id',
        ]);

        $listId = $validatedData['list_id'];
        $userId = $validatedData['user_id'];

        $user = User::find($userId);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $list = Lists::find($listId);
        if (!$list) {
            return response()->json(['error' => 'List not found'], 404);
        }

        $user->lists()->detach($listId);

        return response()->json(['success' => true, 'list_id' => $listId, 'user_id' => $userId]);
    }

    public function getMyLists(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
        ]);

        $userId = $validatedData['user_id'];

        $user = User::find($userId);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $lists = $user->lists()->get();

        return response()->json($lists);
    }
}
