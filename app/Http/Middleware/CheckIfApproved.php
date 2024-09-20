<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckIfApproved
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()->status == 'Approval') {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            return to_route('login')->with('message', 'Your account has not been approved yet. Please wait for the admin to review and approve your account.');
        }

        return $next($request);
    }
}
