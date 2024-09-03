<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConversationController extends Controller
{
    public function index()
    {
        $conversations = User::find(auth()->id())->conversations()->latest('updated_at')->with('latestMessage')->get();
        return Inertia::render('Messages', ['conversations' => $conversations]);
    }

    public function show($id)
    {
        $conversation = Conversation::with([
            'messages' => fn($query) => $query->with('user')->latest()->take(10),
            'conversationUser'
        ])->find($id);

        $conversation->setRelation('messages', $conversation->messages->sortBy('created_at')->values());

        $conversations = User::find(auth()->id())->conversations()->latest('updated_at')->with('latestMessage')->get();
        
        return Inertia::render('Messages', [
            'conversations' => $conversations,
            'conversation' => $conversation
        ]);
    }

    // public function index(Request $request)
    // {
        // $conversation = new Conversation();
        // $conversation->save();

        // $user = User::find(auth()->id());

        // $user2 = User::find(4);

        // $conversation->users()->attach([
        //     $user->id => ['name' => "{$user2->first_name} {$user2->last_name}"], 
        //     $user2->id => ['name' => "{$user->first_name} {$user->last_name}"]
        // ]);

        // $message = new Message();
        // $message->user_id = auth()->id();
        // $message->conversation_id = $conversation->id;
        // $message->content = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores maxime distinctio quia beatae perferendis doloribus laudantium ut unde. Asperiores accusamus esse quasi blanditiis praesentium necessitatibus ipsa neque, odit non consequuntur labore accusantium debitis aliquam a quibusdam facilis numquam repudiandae provident quidem.';
        // $message->save();

        // $message = new Message();
        // $message->user_id = 4;
        // $message->conversation_id = $conversation->id;
        // $message->content = 'Velit a id veritatis consectetur quibusdam quas sunt autem veniam qui maiores, excepturi repellendus totam tempore molestiae facilis sit corporis rerum eius expedita dicta assumenda! Vel nam neque perspiciatis! Enim quasi tenetur possimus rem sint molestias eum dolores vitae at aliquid dicta neque distinctio, nostrum eligendi perspiciatis veniam cumque mollitia quaerat dolor animi, voluptates nam corrupti non. Porro, eos!';
        // $message->save();

        // dd($conversation);
    // }
}
