<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectClientsToLanding
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
{
    /** @var \App\Models\User $user */
    $user = $request->user();

    // Si el usuario está autenticado y tiene el rol de cliente
    if ($user && $user->hasRole('client')) {
        return redirect()->route('landing');
    }

    return $next($request);
}
}
