<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;

class CommentController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'post_id' => ['required', 'integer'],
            'content' => ['required', 'max:1000', 'string']
        ]);

        $comment = new Comment();
        $comment->user_id = auth()->id();
        $comment->post_id = $request->post_id;
        $comment->content = $request->content;
        $comment->save();

        return to_route('view-post', ['id' => $request->post_id]);
    }

    public function showMore(Request $request)
    {
        $comments = Comment::with('user')
                        ->withCount('replies')
                        ->where('post_id', $request->post_id)
                        ->latest()
                        ->skip($request->offset)
                        ->take(5)
                        ->get();

        return $comments;
    }
}
