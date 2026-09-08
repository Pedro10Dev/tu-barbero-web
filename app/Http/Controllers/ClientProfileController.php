<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClientProfileController extends Controller
{
    public function edit(Request $request): RedirectResponse|Response
    {
        /** @var User $user */
        $user = $request->user();

        // Usamos Spatie en lugar de la propiedad antigua
        if (! $user->hasRole('client')) {
            return redirect()->route('landing');
        }

        return Inertia::render('client/profile/edit', [
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone ?? '',
            ],
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();

        // Usamos Spatie aquí también
        if (! $user->hasRole('client')) {
            return redirect('/');
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
        ]);

        $user->update([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
        ]);

        return redirect()->back()->with('success', 'Perfil actualizado correctamente.');
    }
}
