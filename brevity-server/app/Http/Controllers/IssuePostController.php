<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use App\Models\User;
use Illuminate\Http\Request;

class IssuePostController extends Controller
{
    public function postIssue(Request $request)
    {
        $issuerUsername = $request->input("issuerUsername");
        $issuerMail = $request->input('issuerMail');
        $issueTitle = $request->input('issueTitle');
        $issueBody = $request->input('issueBody');

        $user = User::where('email', $issuerMail)->first();


        return response()->json(['content' => $request->input()]);
    }
}
