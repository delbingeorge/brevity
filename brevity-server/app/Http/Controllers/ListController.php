<?php

namespace App\Http\Controllers;

use App\Models\Lists;
use App\Models\User;
use Illuminate\Http\Request;

class ListController extends Controller
{
    public function joinList(Request $request)
    {

        $listId = $request->input('list_id');
        $userId = $request->input('user_id');

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
        $listId = $request->input('list_id');
        $userId = $request->input('user_id');

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
        $userId = $request->input('user_id');

        $user = User::find($userId);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $lists = $user->lists()->get();

        $listNames = $lists->pluck('list_name')->toArray();

        return response()->json(['success' => true, 'list_names' => $listNames]);
    }
    public function getJoinedLists(Request $request)
    {
        $userId = $request->input('user_id');

        $user = User::find($userId);
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $lists = $user->lists()->get();

        $listNames = $lists->pluck('id')->toArray();

        return  $listNames;
    }
}
