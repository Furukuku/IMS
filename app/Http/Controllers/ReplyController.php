<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reply;

class ReplyController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'comment_id' => ['required', 'integer'],
            'content' => ['required', 'max:1000', 'string']
        ]);

        $reply = new Reply();
        $reply->user_id = auth()->id();
        $reply->comment_id = $request->comment_id;
        $reply->content = $request->content;
        $reply->save();

        return to_route('view-post', ['id' => $request->post_id]);
    }

    public function show(Request $request)
    {
        $replies = Reply::with('user')
            ->where('comment_id', $request->comment_id)
            ->oldest()
            ->skip($request->offset)
            ->take(5)
            ->get();
        return $replies;
    }
}
