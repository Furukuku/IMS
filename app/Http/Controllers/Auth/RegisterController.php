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
            'first_name' => ['required', 'max:50'],
            'last_name' => ['required', 'max:50'],
            'company_name' => ['required', 'max:100'],
            'company_address' => ['required', 'max:100'],
            'student_no' => ['required', 'max:10'],
            'email' => ['required', 'email', 'max:100', 'unique:users'],
            'password' => ['required', 'min:8', 'max:255', 'confirmed'],
            'password_confirmation' => ['required', 'max:255']
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
