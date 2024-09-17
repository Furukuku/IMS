<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class RegisterController extends Controller
{
    public function store(Request $request) 
    {
        $request->validate([
            'first_name' => ['required', 'max:50', 'string'],
            'last_name' => ['required', 'max:50', 'string'],
            'company_name' => ['required', 'max:100', 'string'],
            'company_address' => ['required', 'max:100', 'string'],
            'student_no' => ['required', 'max:10', 'string'],
            'email' => ['required', 'email', 'max:100', 'unique:users', 'string'],
            'password' => ['required', 'min:8', 'max:100', 'confirmed', 'string'],
            'password_confirmation' => ['required', 'max:100', 'string']
        ]);
        
        $user = new User();
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->student_no = $request->student_no;
        $user->company_name = $request->company_name;
        $user->company_address = $request->company_address;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);

        $users = User::count();
        if ($users === 0) {
            $user->status = 'Active';
            $user->is_admin = true;
        }

        $user->save();

        if (!$user->is_admin) {
            return to_route('login');
        }

        Auth::login($user);

        $jwt_key = config('app.jwt_key');
        $payload = [
            'user_id' => $user->id,
            'admin' => $user->is_admin,
            'iat' => now()->timestamp,
            'exp' => now()->addDay()->timestamp
        ];
        $jwt = JWT::encode($payload, $jwt_key, 'HS256');

        return to_route('dashboard', ['token', $jwt]);
    }
}
