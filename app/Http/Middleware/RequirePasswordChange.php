<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RequirePasswordChange
{
    /**
     * Keeps the forced password change page exclusive to users that still
     * need to change their temporary password.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user() === null || ! $request->user()->must_change_password) {
            return redirect()->route('dashboard');
        }

        return $next($request);
    }
}
