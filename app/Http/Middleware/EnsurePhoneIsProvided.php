<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsurePhoneIsProvided
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Si no está autenticado, dejar pasar
        if (!$user) {
            return $next($request);
        }

        // Si ya tiene teléfono, dejar pasar
        if (!empty($user->phone)) {
            return $next($request);
        }

        // Permitir acceso a las rutas para guardar el teléfono o cerrar sesión
        if ($request->routeIs('phone.prompt', 'phone.store', 'logout')) {
            return $next($request);
        }

        // Redirigir a la vista de completar teléfono
        return redirect()->route('phone.prompt');
    }
}
