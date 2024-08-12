<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

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
            'password' => ['required', 'min:8', 'max:255', 'confirmed', 'string'],
            'password_confirmation' => ['required', 'max:255', 'string']
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
        if ($users === 0)
            $user->is_admin = true;

        $user->save();

        Auth::login($user);

        return to_route('dashboard');
    }
}
