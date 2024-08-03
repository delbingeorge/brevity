<?php

namespace App\Http\Controllers;

use App\Models\Lists;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

    public function getListsDetails(Request $request, $list_id)
    {
        // $list_id = $request->input('list_id');
        $res = DB::select('SELECT count(list_id) as userCount from user_lists WHERE list_id = ?', [$list_id]);

        return response()->json($res);
    }

    public function getListIssues($listId)
    {
        $listIssues = DB::table('issues')
            ->join('lists', 'lists.id', '=', 'issues.list_id')
            ->join('users', 'users.id', '=', 'issues.user_id')
            ->where('issues.list_id', $listId)
            ->select('issues.id as issueId', 'issues.title', 'issues.body', 'issues.created_at', 'users.name', 'users.photo', 'users.id')
            ->orderBy('issues.id', 'desc')
            ->get();

        return response()->json($listIssues, 200);
    }
}
