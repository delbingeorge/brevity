<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ListController extends Controller
{
    public function joinList(Request $request)
    {
        $listId = $request->get("list_id");
        return response()->json(['res' => true, 'list-id' => $listId]);
    }
}
