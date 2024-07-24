<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PostSolutionController extends Controller
{
    public function postSolution(Request $request)
    {
        $issueId = $request->input("issueId");
        $solution = $request->input("content");
        return response()->json(['response' => true], 200);
    }
}
