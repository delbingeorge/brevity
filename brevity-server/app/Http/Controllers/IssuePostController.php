<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IssuePostController extends Controller
{
    public function postIssue(Request $request)
    {
        $issueTitle = $request->input('issueTitle');
        $issueBody = $request->input('issueBody');
        $issuerUserID = $request->input("issuerID");
        $issuerMail = $request->input("issuerMail");
        $listID = $request->input("listID");

        $user = User::where('email', $issuerMail)->first();

        $issue = new Issue();
        $issue->title = $issueTitle;
        $issue->body = $issueBody;
        $issue->status = false;
        $issue->upvote = 1;
        $issue->user_id = $user->id;
        $issue->list_id = $listID;

        if ($issue->save()) {
            return response()->json(['message' => 'Issue created successfully'], 201);
        } else {
            return response()->json(['message' => 'Issue creation failed'], 500);
        }
    }


    public function getUserIssues($profileId)
    {
        $postedIssues = DB::table('issues')
            ->join('users', 'users.id', '=', 'issues.user_id')
            ->join('lists', 'lists.id', '=', 'issues.list_id')
            ->where('users.id', $profileId)
            ->select('users.name', 'users.photo', 'issues.id as issueId', 'users.id as userId', 'lists.list_name', 'issues.title', 'issues.body', 'issues.created_at')
            ->orderByDesc('lists.id')
            ->get();
        return response()->json(['content' => $postedIssues], 200);
    }

    public function deleteIssue($delParams)
    {
        $response = DB::table('issues')
            ->where('id', $delParams)
            ->delete();
        return response()->json($response);
    }
}
