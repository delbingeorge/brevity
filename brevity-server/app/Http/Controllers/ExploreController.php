<?php

namespace App\Http\Controllers;

use App\Models\Lists;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExploreController extends Controller
{
    public function exploreSearch(Request $request)
    {

        $validation = [
            'query' => 'required|string|max:255',
        ];

        $validator = Validator::make($request->all(), $validation);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors(), 400]);
        }

        $searchReq = $request->input('query');
        if ($searchReq) {
            $searchRes = Lists::where('list_name', 'LIKE', "%$searchReq%")->get();
        } else {
            return response()->json(['error' => 'No search query provided']);
        }
        return response()->json(['searchResponse' => $searchRes, 'searchRequest' => $searchReq]);
    }
}
