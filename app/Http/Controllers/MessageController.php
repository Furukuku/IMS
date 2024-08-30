<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        $conversations = User::find(auth()->id())->conversations()->latest('updated_at')->with('latestMessage')->get();
        return Inertia::render('Messages', ['conversations' => $conversations]);
    }
}
