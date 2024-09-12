<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\ConversationUser;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ConversationController extends Controller
{
    public function index()
    {
        $conversations = User::find(auth()->id())->conversations()->latest('updated_at')->with('latestMessage')->get();
        return Inertia::render('Messages', ['conversations' => $conversations]);
    }

    // public function store(Request $request)
    // {
    //     $conversation_user = ConversationUser::where('user_id', auth()->id())->where('client_id', $request->receiver_id)->first();
        
    //     if (is_null($conversation_user)) {
    //         $conversation = new Conversation();
    //         $conversation->save();
    
    //         $sender = User::find(auth()->id());
    //         $receiver = User::find($request->receiver_id);
    
    //         $conversation->users()->attach([
    //             $sender->id => [
    //                 'client_name' => "{$receiver->first_name} {$receiver->last_name}",
    //                 'client_id' => $receiver->id
    //             ],
    //             $receiver->id => [
    //                 'client_name' => "{$sender->first_name} {$sender->last_name}",
    //                 'client_id' => $sender->id
    //             ]
    //         ]);

    //         return to_route('conversation.view', ['id' => $conversation->id]);
    //     }

    //     return to_route('conversation.view', ['id' => $conversation_user->conversation_id]);
    // }

    public function show($id)
    {
        $conversations = User::find(auth()->id())->conversations()->latest('updated_at')->with('latestMessage')->get();

        $conversation = Conversation::with([
            'messages' => fn($query) => $query->with('user')->latest()->take(10),
            'conversationUser'
        ])->find($id);

        $conversation->setRelation('messages', $conversation->messages->sortBy('created_at')->values());
        
        return Inertia::render('Messages', [
            'conversations' => $conversations,
            'conversation' => $conversation
        ]);
    }

    public function newMessage(Request $request) 
    {
        $conversation_user = ConversationUser::where('user_id', auth()->id())->where('client_id', $request->user)->first();
        
        if (!is_null($conversation_user)) {
            return to_route('conversation.view', ['id' => $conversation_user->conversation_id]);
        }

        $conversations = User::find(auth()->id())->conversations()->latest('updated_at')->with('latestMessage')->get();
        $client = User::find($request->user);

        return Inertia::render('Messages', [
            'conversations' => $conversations,
            'client' => $client
        ]);
    }

    public function search(Request $request)
    {
        $keyword = $request->input('keyword');
        $users = User::whereNot('id', auth()->id())
        ->where(function($query) use ($keyword) {
            $query->whereLike('first_name', "%{$keyword}%")
                ->orWhereLike('last_name', "%{$keyword}%")
                ->orWhereLike('student_no', "%{$keyword}%")
                ->orWhereLike(DB::raw("CONCAT(first_name, ' ', last_name)"), "%{$keyword}%");
        })
        ->take(10)
        ->get();

        return ['users' => $users];
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
