<?php

namespace App\Http\Controllers;

use App\Models\IssueResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PostSolutionController extends Controller
{
    public function postSolution(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'userId' => 'required|integer|exists:users,id',
            'issueId' => 'required|integer|exists:issues,id',
        ]);

        $issueResponse = IssueResponse::create([
            'body' => $validated['content'],
            'user_id' => $validated['userId'],
            'issue_id' => $validated['issueId'],
        ]);

        if ($issueResponse) {
            return response()->json(200);
        }
        return response()->json(500);
    }
}