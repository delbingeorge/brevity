<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class IssueController extends Controller
{
    public function upvoteIssue($issueId)
    {
        $issue = DB::table('issues')->where('id', $issueId)->first();

        if (!$issue) {
            return response()->json(['error' => 'Issue not found'], 404);
        }

        $newUpvoteCount = $issue->upvote ? $issue->upvote - 1 : $issue->upvote + 1;

        DB::table('issues')
            ->where('id', $issueId)
            ->update(['upvote' => $newUpvoteCount]);

        return response()->json(['issueId' => $issueId, 'newUpvoteCount' => $newUpvoteCount]);
    }
}
