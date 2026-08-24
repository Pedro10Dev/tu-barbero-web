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
        // Si el usuario está autenticado y su rol es 'client'
        if ($request->user() && $request->user()->role === 'client') {
            // Lo redirigimos a la ruta de la landing (asegúrate de que tu ruta se llame 'landing' o cámbiala por la URL correcta)
            return redirect()->route('landing');
        }

        return $next($request);
    }
}
