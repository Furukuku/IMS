<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class UserController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'profile_picture' => ['nullable', File::types(['png', 'jpg', 'jpeg'])->max('5mb')],
            'first_name' => ['required', 'max:50', 'string'],
            'last_name' => ['required', 'max:50', 'string'],
            'email' => ['required', 'email', 'max:100', Rule::unique('users')->ignore(auth()->id()), 'string']
        ]);

        $user = User::find(auth()->id());

        if (!is_null($request->file('profile_picture'))) {
            $path = $request->file('profile_picture')->store('profiles');
            $to_delete_profile = $user->profile_picture;
            $user->profile_picture = basename($path);

            if (!is_null($to_delete_profile)) {
                Storage::disk('public')->delete("profiles/{$to_delete_profile}");
            }
        }

        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->save();

        return to_route('account')->with('message', 'Updated succesfully!');
    }

    public function changePassword(Request $request) 
    {
        $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'min:8', 'max:100', 'confirmed', 'string'],
            'password_confirmation' => ['required', 'max:100', 'string']
        ]);

        $user = User::find(auth()->id());
        $user->password = Hash::make($request->password);
        $user->save();

        return to_route('account')->with('message', 'Password changed successfully!');
    }
}
