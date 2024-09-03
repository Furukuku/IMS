<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function showMore(Request $request) 
    {
        $messages = Message::where('conversation_id', $request->input('conversation_id'))
            ->latest()
            ->skip($request->input('skip'))
            ->take($request->input('limit'))
            ->get();

        return $messages->reverse()->values();
    }
}
