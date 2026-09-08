<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfPasswordNotChanged
{
    /**
     * Redirects users that were created with a temporary password to the
     * forced password change page.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user() !== null && $request->user()->must_change_password) {
            return redirect()->route('password.force');
        }

        return $next($request);
    }
}
