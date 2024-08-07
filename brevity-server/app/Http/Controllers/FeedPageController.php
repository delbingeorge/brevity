<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FeedPageController extends Controller
{
    public function getFeed($getValue)
    {

        if ($getValue !== 'false') {
            $getIssues = DB::table('issues')
                ->join('lists', 'lists.id', '=', 'issues.list_id')
                ->join('users', 'users.id', '=', 'issues.user_id')
                ->join('user_lists', 'user_lists.list_id', '=', 'lists.id')
                ->leftJoin('issue_responses', 'issue_responses.issue_id', '=', 'issues.id') // Join issue_responses table
                ->where('user_lists.user_id', $getValue)
                ->where('issues.user_id', '!=', $getValue)
                ->select(
                    'issues.id as issueId',
                    'lists.id as listId',
                    'issues.upvote',
                    'issues.title',
                    'issues.body',
                    'lists.list_name',
                    'lists.description',
                    'issues.created_at',
                    'users.name',
                    'users.photo',
                    'users.id as userId',
                    DB::raw('COUNT(issue_responses.id) as responseCount') // Count responses
                )
                ->groupBy(
                    'issues.id',
                    'lists.id',
                    'issues.upvote',
                    'issues.title',
                    'issues.body',
                    'lists.list_name',
                    'lists.description',
                    'issues.created_at',
                    'users.name',
                    'users.photo',
                    'users.id'
                )
                ->orderBy('issues.created_at', 'desc')
                ->get();
            return response()->json(['content' => $getIssues, $getValue], 200);
        }

        $limit = 15;
        $getIssues = DB::table('issues')
            ->join('lists', 'lists.id', '=', 'issues.list_id')
            ->join('users', 'users.id', '=', 'issues.user_id')
            ->leftJoin('issue_responses', 'issue_responses.issue_id', '=', 'issues.id') // Join issue_responses table
            ->select(
                'issues.id as issueId',
                'lists.id as listId',
                'issues.title',
                'issues.body',
                'lists.list_name',
                'lists.description',
                'issues.created_at',
                'users.name',
                'users.photo',
                'users.id as userId',
                DB::raw('COUNT(issue_responses.id) as responseCount') // Count responses
            )
            ->groupBy(
                'issues.id',
                'lists.id',
                'issues.title',
                'issues.body',
                'lists.list_name',
                'lists.description',
                'issues.created_at',
                'users.name',
                'users.photo',
                'users.id'
            )
            ->orderBy('issues.id', 'desc')
            ->limit($limit)
            ->get();
        return response()->json(['content' => $getIssues, $getValue], 200);
    }
}
