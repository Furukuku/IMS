<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function store(Request $request) 
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $user = auth()->user();

            $jwt_key = config('app.jwt_key');
            $payload = [
                'user_id' => $user->id,
                'admin' => $user->is_admin,
                'iat' => now()->timestamp,
                'exp' => now()->addDay()->timestamp
            ];
            $jwt = JWT::encode($payload, $jwt_key, 'HS256');

            return to_route('dashboard')->with([
                'message' => "Welcome back {$user->first_name}!",
                'token' => $jwt
            ]);
        }

        return to_route('login')->with('message', 'The email or password is incorrect.');
    }
}
