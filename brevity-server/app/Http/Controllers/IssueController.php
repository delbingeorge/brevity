<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class IssueController extends Controller
{
    // Updated upvoteIssue method in IssueController
    public function upvoteIssue(Request $request, $issueId)
    {
        $userId = $request->user()->id;

        // Check if the user has already upvoted this issue
        $existingUpvote = DB::table('issue_upvotes')
            ->where('issue_id', $issueId)
            ->where('user_id', $userId)
            ->first();

        if ($existingUpvote) {
            // Remove the upvote
            DB::table('issue_upvotes')
                ->where('issue_id', $issueId)
                ->where('user_id', $userId)
                ->delete();

            // Decrement the upvote count in the issues table
            DB::table('issues')
                ->where('id', $issueId)
                ->decrement('upvote');
        } else {
            // Add the upvote
            DB::table('issue_upvotes')->insert([
                'issue_id' => $issueId,
                'user_id' => $userId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Increment the upvote count in the issues table
            DB::table('issues')
                ->where('id', $issueId)
                ->increment('upvote');
        }

        // Fetch the updated upvote count for response
        $newUpvoteCount = DB::table('issues')
            ->where('id', $issueId)
            ->value('upvote');

        return response()->json(['issueId' => $issueId, 'newUpvoteCount' => $newUpvoteCount]);
    }
}
