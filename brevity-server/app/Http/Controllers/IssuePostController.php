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
        $issue->user_id = $user->id;
        $issue->list_id = $listID;

        if ($issue->save()) {
            return response()->json(['message' => 'Issue created successfully'], 201);
        } else {
            return response()->json(['message' => 'Issue creation failed'], 500);
        }
    }


    public function getUserIssues(Request $request, $profileId)
    {
        $postedIssues = DB::table('issues')
            ->join('users', 'users.id', '=', 'issues.user_id')
            ->join('lists', 'lists.id', '=', 'issues.list_id')
            ->where('users.id', $profileId)
            ->select('users.name', 'users.photo', 'lists.list_name', 'issues.title', 'issues.body', 'issues.created_at')
            ->get();
        return response()->json(['content' => $postedIssues], 200);
    }
}
